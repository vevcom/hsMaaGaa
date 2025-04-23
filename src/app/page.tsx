import Image from "next/image";
import styles from "./page.module.css";
import Totals from "./components/totals/totals";
import Background from "./components/background/background";
import BarGraph from "./components/graphs/graph";
import { getRunningData } from "./components/graphs/loadData";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const {data,totalDistance} = await getRunningData();

  return (
    <>
      <Background /><Background /><Background /><Background />
      <Background /><Background /><Background /><Background />
      <Background /><Background /><Background /><Background />
      <Background /><Background /><Background /><Background />
      <Background /><Background /><Background /><Background />
      <Background /><Background /><Background /><Background />
      <Background /><Background /><Background /><Background />
      <Background /><Background /><Background /><Background />
      <Background /><Background /><Background /><Background />
      <Background /><Background /><Background /><Background />
      <div className={styles.page}>
        <h1>HS må gå!</h1>
        <Totals distanceMeters={totalDistance} />
        <BarGraph Data={data}></BarGraph>
      </div>
    </>
  );
}
