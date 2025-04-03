import Image from "next/image";
import styles from "./page.module.css";
import Totals from "./components/totals/totals";
import Background from "./components/background/background";

export default function Home() {
  return (
    <>
      <Background />
      <Background />
      <Background />
      <Background />
      <Background />
      <Background />
      <Background />
      <Background />
      <Background />
      <Background />
      <div className={styles.page}>
        <h1>HS må gå?</h1>
        <Totals distanceMeters={100} />
      </div>
    </>
  );
}
