import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./scorePanel";

class GameContrl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  // 存储用户的按键

  direction = "";

  // 判断游戏是否存活
  isLive: boolean = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init();
  }

  init() {
    document.addEventListener("keydown", this.keydownHandler);
    this.run();
  }
  /**
   *  ArrowDown
      ArrowRight
      ArrowLeft
      ArrowUp

      ie
      Down
      Right
      Left
      Up
   *  
   */
  keydownHandler = (event: KeyboardEvent) => {
    if (
      [
        "ArrowDown",
        "ArrowRight",
        "ArrowLeft",
        "ArrowUp",
        "Down",
        "Right",
        "Left",
        "Up",
      ].includes(event.key)
    )
      this.direction = event.key;
  };

  run() {
    let x = this.snake.x;
    let y = this.snake.y;
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        x -= 10;
        break;
      case "ArrowRight":
      case "Right":
        x += 10;
        break;
      default:
        break;
    }

    this.checkEat(x, y);

    try {
      this.snake.x = x;
      this.snake.y = y;
    } catch (error) {
      console.log("error: ", error);
      alert(`${(error as Error).message}游戏结束了`);
      this.isLive = false;
    }

    this.isLive &&
      setTimeout(() => this.run(), 300 - (this.scorePanel.level - 1) * 30);
  }

  // 检测是否吃到食物
  checkEat(x: number, y: number) {
    if (this.food.x === x && this.food.y === y) {
      // 食物变化位置
      this.food.change();
      // 分数增加
      this.scorePanel.addScore();
      // 增加蛇的长度
      this.snake.addBody();
    }
  }
}

export default GameContrl;
