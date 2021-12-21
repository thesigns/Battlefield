import { Battlefield } from "./Battlefield.js";
import { UISelectBoard } from "./UISelectBoard.js";

let svg = document.querySelector("svg");
let battle = new Battlefield(svg, 50, 50);

battle.addAutomaton("gold", "B3/S23");
battle.addAutomaton("black", "B3/S23");

let uiSelectBoard = new UISelectBoard(document.querySelector(".settings"), [
  "10x10",
  "30x30",
  "50x50",
  "70x70",
  "90x90"
], battle);

uiSelectBoard.choose(2);

battle.prepare();
