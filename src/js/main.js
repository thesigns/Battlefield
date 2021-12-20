import { Battlefield } from "./Battlefield.js";


let svg = document.querySelector("svg");
let battle = new Battlefield(svg, 80, 80);

battle.addAutomaton("gold", "B3/S23");
battle.addAutomaton("black", "B3/S23");

battle.prepare();

















