/**
 *  Battlefield
 */

import { Automaton } from "./Automaton.js";
import { Cell } from "./Cell.js";

export class Battlefield {
  constructor(svg, cellsNumY, cellsNumX) {
    this.cellsNumX = cellsNumX;
    this.cellsNumY = cellsNumY;
    this.cellSizeX = svg.viewBox.baseVal.width / this.cellsNumX;
    this.cellSizeY = svg.viewBox.baseVal.height / this.cellsNumY;
    this.turn = 0;
    let running = null;
    let battle = this;

    // No automatons at the beginning
    //
    this.automatons = [];

    // Create 2-dimensional array and fill it with Cell objects
    //
    this.cells = new Array(cellsNumY)
      .fill(0)
      .map(() => new Array(cellsNumX).fill(0).map(() => new Cell()));

    // Create models (rectangles) and apply them to cells
    //
    for (let y = 0; y < this.cellsNumX; y++) {
      for (let x = 0; x < this.cellsNumY; x++) {
        let model = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        model.setAttribute("x", this.cellSizeX * x);
        model.setAttribute("y", this.cellSizeY * y);
        model.setAttribute("class", "model");
        model.setAttribute("width", this.cellSizeX);
        model.setAttribute("height", this.cellSizeY);
        model.style.animationDelay = Math.random() + "s";
        model.style.stroke = "none";
        model.style.fill = "none";
        svg.appendChild(model);
        this.cells[x][y].model = model;
      }
    }

    function mainLoop() {
      battle.run();
    }


    // Button behavior
    //
    let buttonFight = document.querySelector("button.fight");
    buttonFight.addEventListener("click", (e) => {
      if (!this.running) {
        this.running = setInterval(mainLoop, 0);
        buttonFight.innerHTML = "Cease fire";
      } else {
        clearInterval(this.running);
        this.running = null;
        buttonFight.innerHTML = "Fight";
      }
    });




  }

  addAutomaton(name, settings) {
    let automaton = new Automaton(name, settings);
    this.automatons.push(automaton);
  }

  // Prepare the battlefield - initial settings of cells.
  // Works only for two automatons in the moment.
  //
  prepare() {
    this.turn = 0;
    let xmax = this.cellsNumX - 1;
    for (let y = 0; y < this.cellsNumY; y++) {
      for (let x = 0; x < this.cellsNumX; x++) {
        if (x < xmax) {
          this.cells[x][y].automaton = this.automatons[0];
        } else {
          this.cells[x][y].automaton = this.automatons[1];
        }
        let battleLine = Math.abs(xmax - x);
        if (battleLine < 2) {
          this.cells[x][y].automaton =
            this.automatons[Math.round(Math.random())];
        }
        this.cells[x][y].randomizeAlive(0.4, true);
      }
      xmax -= 1;
    }
  }

  run() {
    for (let y = 0; y < this.cellsNumY; y++) {
      for (let x = 0; x < this.cellsNumX; x++) {
        let self = this.cells[x][y];
        let neighbours = 0;
        let enemies = 0;
        let allies = 0;
        let enemyAutomaton = null;
        //
        // Check neighbours
        //
        for (let ny = -1; ny < 2; ny++) {
          for (let nx = -1; nx < 2; nx++) {
            if (nx != 0 || ny != 0) {
              let computeX = x + nx;
              let computeY = y + ny;
              //
              // Wrap on the edges
              //
              computeX = computeX < 0 ? this.cellsNumX - 1 : computeX;
              computeX = computeX > this.cellsNumX - 1 ? 0 : computeX;
              computeY = computeY < 0 ? this.cellsNumY - 1 : computeY;
              computeY = computeY > this.cellsNumY - 1 ? 0 : computeY;
              //
              // Count neighbours, allies and enemies
              //
              let neighbour = this.cells[computeX][computeY];
              if (neighbour.alive) {
                neighbours += 1;
                if (neighbour.automaton === self.automaton) {
                  allies += 1;
                } else {
                  enemyAutomaton = neighbour.automaton;
                  enemies += 1;
                }
              }
            }
          }
        }
        //
        // Apply automaton rules
        //
        if (self.alive) {
          //
          // Survive rules
          //

          
          if (neighbours == 2 || neighbours == 3) {
            if (enemies > allies + 1) {
              self.join(enemyAutomaton);
            }
          } else {
            self.die();
          }
        } else {
          //
          // Born rules
          //
          if (neighbours === 3) {
            self.born();
            if (enemies > allies) {
              self.join(enemyAutomaton);
            }
          }
        }
      }
    }

    for (let y = 0; y < this.cellsNumY; y++) {
      for (let x = 0; x < this.cellsNumX; x++) {
        this.cells[x][y].update();
      }
    }

    this.turn += 1;
  }
}
