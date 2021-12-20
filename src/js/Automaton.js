/**
 *  Automaton
 * 
 **/

export class Automaton {
  constructor(name, settings) {
    this.name = name;
    this.rule = {};
    this.rule.born = new Array(8).fill(false);
    this.rule.survives = new Array(8).fill(false);

    // Create UI
    //
    const settingsEl = document.querySelector("div.settings");

    // Create header
    //
    let h3 = document.createElement("h3");
    h3.innerHTML = name + " automaton";
    settingsEl.appendChild(h3);

    // Create setting checkboxes
    //
    let p = document.createElement("p");
    p.innerHTML = "A cell is born if it has <br />";
    for (let i = 1; i <= 8; i++) {
      let input = document.createElement("input");
      input.type = "checkbox";
      input.id = this.name + "-born-" + i;
      p.innerHTML += " " + i;
      p.appendChild(input);
    }
    p.innerHTML += "neighbours";
    settingsEl.appendChild(p);

    p = document.createElement("p");
    p.innerHTML = " A cell survives if it has<br />";
    for (let i = 1; i <= 8; i++) {
      let input = document.createElement("input");
      input.type = "checkbox";
      input.id = this.name + "-survives-" + i;
      p.innerHTML += " " + i;
      p.appendChild(input);
    }
    p.innerHTML += "neighbours";
    settingsEl.appendChild(p);

    // Add events to settings checkboxes
    //
    for (let i = 1; i <= 8; i++) {
      document
        .querySelector("input#" + this.name + "-born-" + i)
        .addEventListener("change", (e) => {
          this.setRule("born", i, e.target.checked);
        });

      document
        .querySelector("input#" + this.name + "-survives-" + i)
        .addEventListener("change", (e) => {
          this.setRule("survives", i, e.target.checked);
        });
    }

    // Set initial rules
    //
    let tempRule = "born";
    for (let i = 0; i < settings.length; i++) {
      if (settings[i] === "B") {
        tempRule = "born";
      } else if (settings[i] === "S" || settings[i] === "/") {
        tempRule = "survives";
      } else {
        this.setRule(tempRule, parseInt(settings[i]), true);
      }
    }
  }

  setRule(name, num, value) {
    this.rule[name][num - 1] = value;
    document.querySelector(`input#${this.name}-${name}-${num}`).checked = value;
  }
}
