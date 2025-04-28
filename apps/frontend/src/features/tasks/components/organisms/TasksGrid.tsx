'use client';

import { HotTable } from '@handsontable/react-wrapper';

import { registerAllModules } from 'handsontable/registry';

import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import { useGrid } from '../../hooks/organisms/useTasksGrid.hooks';
import { schemas } from '@pmlite/shared/dist/api-types/apis';
import { zodValidator } from '@pmlite/shared/src/utils/validationUtils';

registerAllModules();

export default function Grid() {
  const [tasks, tasksRef, taskFuncs] = useGrid();
  return (
    <>
      <HotTable
        ref={tasksRef}
        // copied
        data={JSON.parse(JSON.stringify(tasks))}
        themeName="ht-theme-main disable-auto-theme"
        colHeaders={[
          'uuid',
          'TaskId',
          'Team',
          'Epic',
          'Task',
          'Type',
          'TaskType',
          'Status',
          'Priority',
          'PlannedPersonDay',
          'PlannedStartDate',
          'PlannedEndDate',
          'ActualPersonDay',
          'ActualStartDate',
          'ActualEndDate',
          'Assignee',
          'Reporter',
          'Description',
          'BlockedBy',
          'CreatedAt',
          'UpdatedAt',
        ]}
        columns={[
          { data: 'uuid', readOnly: true },
          {
            data: 'taskId',
            validator: zodValidator(schemas.TaskModel.shape.taskId),
          },
          {
            data: 'team',
            validator: zodValidator(schemas.TaskModel.shape.team),
          },
          {
            data: 'epicId',
            validator: zodValidator(schemas.TaskModel.shape.epicId),
          },
          {
            data: 'name',
            validator: zodValidator(schemas.TaskModel.shape.name),
          },
          {
            data: 'type',
            validator: zodValidator(schemas.TaskModel.shape.type),
          },
          {
            data: 'taskType',
            validator: zodValidator(schemas.TaskModel.shape.taskType),
          },
          {
            data: 'status',
            validator: zodValidator(schemas.TaskModel.shape.status),
          },
          {
            data: 'priority',
            validator: zodValidator(schemas.TaskModel.shape.priority),
          },
          {
            data: 'plannedPersonDay',
            type: 'numeric',
          },
          {
            data: 'plannedStartDate',
            type: 'date',
            dateFormat: 'YYYY-MM-DD',
          },
          {
            data: 'plannedEndDate',
            type: 'date',
            dateFormat: 'YYYY-MM-DD',
          },
          {
            data: 'actualPersonDay',
            type: 'numeric',
          },
          {
            data: 'actualStartDate',
            type: 'date',
            dateFormat: 'YYYY-MM-DD',
          },
          {
            data: 'actualEndDate',
            type: 'date',
            dateFormat: 'YYYY-MM-DD',
          },
          {
            data: 'assigneeId',
            validator: zodValidator(schemas.TaskModel.shape.assigneeId),
          },
          {
            data: 'reporterId',
            validator: zodValidator(schemas.TaskModel.shape.reporterId),
          },
          {
            data: 'description',
            validator: zodValidator(schemas.TaskModel.shape.description),
          },
          {
            data: 'blockedBy',
            validator: zodValidator(schemas.TaskModel.shape.blockedBy),
          },
          { data: 'createdAt', readOnly: true },
          { data: 'updatedAt', readOnly: true },
        ]}
        dropdownMenu={[
          'make_read_only',
          'filter_operators',
          'filter_by_condition',
          'filter_by_condition2',
          'filter_by_value',
          'filter_action_bar',
        ]}
        contextMenu={[
          'row_above',
          'row_below',
          '---------',
          'remove_row',
          '---------',
          'undo',
          'redo',
          '---------',
          'commentsAddEdit',
          'commentsRemove',
          'commentsReadOnly',
        ]}
        filters={true}
        rowHeaders={true}
        manualRowMove={true}
        manualColumnMove={true}
        manualColumnResize={true}
        navigableHeaders={true}
        autoWrapRow={true}
        autoWrapCol={true}
        autoRowSize={true}
        autoColumnSize={true}
        dragToScroll={true}
        comments={true}
        search={true}
        licenseKey="non-commercial-and-evaluation"
        hiddenColumns={{
          columns: [0, 19, 20],
          indicators: false,
          copyPasteEnabled: false,
        }}
        beforeCreateRow={taskFuncs.onRowCreate}
        beforeRemoveRow={taskFuncs.onRowDelete}
        beforeChange={taskFuncs.onCellChange}
      />
      <div className="w-12 flex items-center justify-center">
        <button
          onClick={taskFuncs.addTask}
          className="m-1 w-5 h-5 flex items-center justify-center bg-slate-200 text-slate-700 rounded-full"
        >
          +
        </button>
      </div>
    </>
  );
}
