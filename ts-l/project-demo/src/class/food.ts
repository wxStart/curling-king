class Food {
  el: HTMLElement;
  constructor() {
    this.el = document.getElementById("food")!; //! !表示不为空null
  }

  //
  get x() {
    return this.el.offsetLeft;
  }

  get y() {
    return this.el.offsetTop;
  }

  change() {
    // left的取值范围 0-290
    // top的取值范围 0-290
    const left = Math.round(Math.random() * 29) * 10;
    const top = Math.round(Math.random() * 29) * 10;

    this.el.style.left = left + "px"; //0 - 290
    this.el.style.top = top + "px"; //0- 290
  }
}

export default Food;
