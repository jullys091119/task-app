import { HeaderApp } from "./components/Header/HeaderApp"
import {DayOverView} from "./components/DayOverView/DayOverView"
import {Members} from "./components/Members/Members"
import {NewTask} from "./components/NewTask/NewTask";
import {NavigationMenuBar} from "./components/NavigationMenuBar/NavigationMenuBar"

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
        <div className="container-navigation">
        <NavigationMenuBar/>
        </div>
        </div>
      </main>
    </div>
  );
}

