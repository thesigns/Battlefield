/**
 *  Cell
 * 
 */

export class Cell {
  constructor() {
    this._automaton = null;
    this._nextTurnAutomaton = null;
    this._alive = false;
    this._nextTurnAlive = false;
    this.model = null;
  }

  set automaton(value) {
    this._automaton = value;
    this.model.style.fill = this._automaton.name;
  }

  get automaton() {
    return this._automaton;
  }

  set alive(value) {
    this._alive = value;
    if (this._alive) {
      this.model.classList.add("alive");
    } else {
      this.model.classList.remove("alive");
    }
  }

  get alive() {
    return this._alive;
  }
  //
  // cell dies
  //
  die() {
    this._nextTurnAlive = false;
  }
  //
  // cell is born
  //
  born() {
    this._nextTurnAlive = true;
  }
  //
  // cell joins enemy side
  //
  join(enemy) {
    this._nextTurnAutomaton = enemy;
  }

  randomizeAlive(probability, setNextTurn) {
    if (Math.random() < probability) {
      this.alive = true;
      if (setNextTurn) {
        this._nextTurnAlive = this._alive;
        this._nextTurnAutomaton = this._automaton;
      }
    }
  }
  //
  // Udate status
  //

  update() {
    if (this._nextTurnAutomaton) {
      this.automaton = this._nextTurnAutomaton;
    }
    this.alive = this._nextTurnAlive;
  }
}
