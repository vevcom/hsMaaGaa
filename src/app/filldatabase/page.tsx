import {createCalls, createUsers} from "./generateRows"
import style from "./page.module.scss"


export default function Filldatabase() {

    return <div>
        <div className={style.button} onClick={createUsers}>Generer brukere</div>
        <div className={style.button} onClick={createCalls}>Generer calls</div>
    </div>
}