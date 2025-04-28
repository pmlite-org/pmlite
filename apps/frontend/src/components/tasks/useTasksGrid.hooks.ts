import { useState, useEffect, useRef } from "react";
import apiClient from "../../repositories/apis";
import { TaskData } from "../../types/taskData";
import { CellChange, ChangeSource } from "handsontable/common";
import { HotTableRef } from "@handsontable/react-wrapper";
import { schemas } from "@pmlite/shared/dist/api-types/apis";
import { z } from "zod";
import { convertDateToDateStr } from "../../utils/dateUtils";

type TaskModel = z.infer<typeof schemas.TaskModel>;

const handleApiError = (error: any) => {
  if (error.response) {
    // サーバーがステータスコード400や500を返した場合
    console.error(`Error: ${error.response.status} - ${error.response.data}`);
  } else if (error.request) {
    // リクエストが送信されたが、応答がない場合
    console.error("No response received:", error.request);
  } else {
    // その他のエラー
    console.error("Error:", error.message);
  }
  return false;
};

export const useGrid = () => {
  const [initialTasks, setTasks] = useState<TaskModel[]>([]);
  const tasksRef = useRef<HotTableRef>(null);

  useEffect(() => {
    const fetchTasks = () => {
      (apiClient.getTasks() as Promise<TaskModel[]>)
        .then((tasksData: TaskModel[]) => {
          const displayTasks = tasksData.map((task: TaskModel) => {
            return {
              ...task,
              plannedStartDate: convertDateToDateStr(task.plannedStartDate),
              plannedEndDate: convertDateToDateStr(task.plannedEndDate),
              actualStartDate: convertDateToDateStr(task.actualStartDate),
              actualEndDate: convertDateToDateStr(task.actualEndDate),
            };
          });
          setTasks(displayTasks);
        })
        .catch((error) => {
          handleApiError(error);
        });
    };
    fetchTasks();
  }, []);

  const addTask = () => {
    if (!tasksRef.current || !tasksRef.current.hotInstance) return;
    const index =
      tasksRef.current.hotInstance.countRows() === 0
        ? 0
        : tasksRef.current.hotInstance.countRows() - 1;
    tasksRef.current.hotInstance.alter("insert_row_below", index, 1, "addTask");
  };

  const onRowCreate = (
    index: number,
    amount: number,
    source?: ChangeSource
  ): boolean => {
    console.log("onRowCreate");
    console.log(index, amount, source);
    const newTasks: TaskModel[] = Array.from({ length: amount }, (_, i) => {
      const rowNumber =
        // 元が0行の場合は0を返す
        tasksRef?.current?.hotInstance?.countRows() === 0 ? 0 : index + i + 1;
      return {
        rank: rowNumber,
      };
    });
    (apiClient.bulkUpsertTasks({ tasks: newTasks }) as Promise<TaskModel[]>)
      .then((createdTasks) => {
        createdTasks.forEach((task: TaskModel) => {
          tasksRef.current?.hotInstance?.setDataAtRowProp(
            task.rank,
            "uuid",
            task.uuid,
            "addTask"
          );
          tasksRef.current?.hotInstance?.setDataAtRowProp(
            task.rank,
            "createdAt",
            task.createdAt,
            "addTask"
          );
          tasksRef.current?.hotInstance?.setDataAtRowProp(
            task.rank,
            "updatedAt",
            task.updatedAt,
            "addTask"
          );
        });
      })
      .catch((error) => {
        handleApiError(error);
      });
    return true;
  };

  const onRowDelete = (
    index: number,
    amount: number,
    physicalRows: Array<number>,
    source?: ChangeSource
  ) => {
    const uuids = Array.from({ length: amount }, (_, i) =>
      tasksRef.current?.hotInstance?.getDataAtCell(index + i, 0)
    ).filter((uuid) => uuid);
    (apiClient.bulkDeleteTasks(uuids as string[]) as Promise<void>).catch(
      (error) => {
        handleApiError(error);
      }
    );
    return true;
  };

  const onCellChange = (
    changes: Array<CellChange | null>,
    source: ChangeSource | "addTask"
  ): boolean => {
    console.log("onCellChange");
    if (source === "addTask") return true;
    if (!changes) return true;

    const updatedTasks: TaskModel[] = changes
      .filter((change): change is CellChange => change !== null)
      .map(([row, prop, oldValue, newValue]) => {
        if (oldValue === newValue || (!oldValue && !newValue)) {
          return null;
        }
        let reqValue = newValue;
        if (prop === "actualPersonDay" || prop === "plannedPersonDay") {
          reqValue = Number(newValue);
        }
        if (
          prop === "plannedStartDate" ||
          prop === "plannedEndDate" ||
          prop === "actualStartDate" ||
          prop === "actualEndDate"
        ) {
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (newValue && dateRegex.test(newValue)) {
            reqValue = new Date(newValue).toISOString();
          } else {
            return null; // Skip update if date format is invalid
          }
        }
        return {
          uuid: tasksRef.current?.hotInstance?.getDataAtCell(row, 0),
          rank: row,
          [prop as string]: reqValue,
        } as TaskModel;
      })
      .filter((task): task is TaskModel => {
        if (task === null) return false;
        const result = schemas.TaskModel.safeParse(task);
        if (!result.success) {
          console.log("Validation error:", result.error);
          return false;
        }
        return true;
      });

    if (updatedTasks.length === 0) return true;

    (
      apiClient.bulkUpsertTasks({ tasks: updatedTasks }) as Promise<TaskModel[]>
    ).catch((error) => {
      handleApiError(error);
    });
    return true;
  };

  return [
    initialTasks,
    tasksRef,
    { addTask, onRowCreate, onRowDelete, onCellChange },
  ] as const;
};
