import { sum } from "@pmlite/shared/src/sum";

export default function Home() {
  return (
    <main>
      <div>libs: {sum(1, 2)}</div>
    </main>
  );
}
