import { Battlefield } from "./Battlefield.js";

export class UISelectBoard {
  //
  constructor(parentElement, sizes, battlefield) {
    //
    this.select = document.createElement("select");
    this.option = [];
    this.battlefield = battlefield;

    sizes.forEach((value, index) => {
      this.option.push(document.createElement("option"));
      this.option.at(-1).innerHTML = value;
      this.option.at(-1).value = index;
      this.select.appendChild(this.option.at(-1));
    });

    let label = document.createTextNode("Board size ");

    parentElement.appendChild(label);
    parentElement.appendChild(this.select);

    this.select.addEventListener("change", (e) => {
      this.choose(e.target.value);
    });
  }

  choose(index) {
    this.option[index].selected = true;
    let size = parseInt(this.option[index].text);
    this.battlefield.setSize(size, size);
  }
}
