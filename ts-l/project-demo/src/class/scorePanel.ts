/**
 * 记分牌
 */
class ScorePanel {
  scrore = 0;
  level = 1;

  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  maxLevel: number;

  // 升级的分数
  levelScore: number;

  constructor(maxLevel: number = 10, levelScore: number = 2) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.levelScore = levelScore;
  }

  //加分的方法

  addScore() {
    this.scrore++;
    this.scoreEle.innerHTML = this.scrore + "";
    if (this.scrore % this.levelScore === 0) {
      this.levelUp();
    }
  }

  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + "";
    }
  }
}

export default ScorePanel;
