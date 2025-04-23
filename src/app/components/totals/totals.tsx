import Stretchgoals from "../stretchgoals/stretchgoals"
import Comparison from "./comparison"
import styles from "./totals.module.css"

interface types {
    distanceMeters: number
}

export default function Totals({ distanceMeters } : types) {
    return (<div>
        <div className={`${styles.totalsbox} ${styles.summary}`}>
            <p>HS har gått: {distanceMeters} meter</p>
            <Stretchgoals totalDistance={distanceMeters}></Stretchgoals>
        </div>
        <div className={`${styles.totalsbox} ${styles.comparisons}`}>
            <p>Det tilsvarer:</p>
            <div>
                <Comparison 
                compareFrom={distanceMeters} 
                compareTo={10}
                name="turer mellom OV og Lophtet" />
                <Comparison 
                compareFrom={distanceMeters}
                compareTo={1000}
                name="butikkturer" />
                <Comparison 
                compareFrom={distanceMeters}
                compareTo={1600}
                name="beer miles" />
                <Comparison
                compareFrom={distanceMeters}
                compareTo={42195}
                name="maraton" />
                <Comparison
                compareFrom={distanceMeters}
                compareTo={384399000}
                name="turer til månen"/>
            </div>
        </div>
    </div>)
}