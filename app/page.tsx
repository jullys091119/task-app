import { HeaderApp } from "./components/Header/HeaderApp"
import {DayOverView} from "./components/DayOverView/DayOverView"
import {Members} from "./components/Members/Members"
import {NewTask} from "./components/NewTask/NewTask"

export default function Home() {
  return (
    <div className="container">
      <HeaderApp />
      <main>
        <DayOverView/>
        <div>
          <Members/>
        </div>
        <div>
          <NewTask/>
        </div>
      </main>
    </div>
  );
}

