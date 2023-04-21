class Snake {
  ele: HTMLElement;

  // 蛇头
  head: HTMLElement;
  // 蛇
  bodies: HTMLCollection;

  constructor() {
    this.ele = document.getElementById("snake")!;
    this.head = document.querySelector("#snake>div")!;
    this.bodies = document
      .getElementById("snake")
      ?.getElementsByTagName("div")!;
  }

  // 获取蛇头坐标
  get x() {
    return this.head.offsetLeft;
  }

  get y() {
    return this.head.offsetTop;
  }
  set x(val: number) {
    if (this.x === val) {
      return;
    }

    //禁止蛇掉头  左走时候不允许右走
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft == val) {
      console.log("掉头了");
      // 如果发生掉头，直接让蛇往反方向走

      if (val > this.x) {
        // 说明是向右走，让蛇继续像左走
        val = this.x - 10;
      } else {
        val = this.x + 10;
      }
    }
    if (val < 0 || val > 290) {
      throw Error("撞墙了");
    }
    // 先设置身体的位置再改变
    this.moveBody();
    this.head.style.left = val + "px";
    this.checkHeadBody(val, this.y);
  }
  set y(val: number) {
    if (this.y === val) {
      return;
    }
    //禁止蛇掉头  向下走时候不允许向上走
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop == val) {
      // 如果发生掉头，直接让蛇往反方向走
      if (val > this.y) {
        // 说明是向右走，让蛇继续像左走
        val = this.y - 10;
      } else {
        val = this.y + 10;
      }
    }
    if (val < 0 || val > 290) {
      throw Error("撞墙了");
    }
    // 先设置身体的位置再改变
    this.moveBody();
    this.head.style.top = val + "px";
    this.checkHeadBody(this.x, val);
  }

  addBody() {
    this.ele.insertAdjacentHTML("beforeend", "<div></div>");
  }

  moveBody() {
    // 移动 身体，第四节就是第三节的位置， 第三节是第二节的位置
    for (let i = this.bodies.length - 1; i > 0; i--) {
      const item = this.bodies[i] as HTMLElement;
      const pre = this.bodies[i - 1] as HTMLElement;
      const x = pre.offsetLeft;
      const y = pre.offsetTop;
      item.style.left = x + "px";
      item.style.top = y + "px";
    }
  }
  checkHeadBody(cx: number, cy: number) {
    for (let i = 1; i <= this.bodies.length - 1; i++) {
      const item = this.bodies[i] as HTMLElement;
      const x = item.offsetLeft;
      const y = item.offsetTop;
      if (x === cx && y === cy) {
        // 说明撞到身体了
        throw Error("撞到自己了了");
      }
    }
  }
}

export default Snake;
