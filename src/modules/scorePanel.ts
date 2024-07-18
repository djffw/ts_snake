//定义记分牌的类
class ScorePanel{
    //score和level记录分数和等级
    score=0;
    level=1;
    //分数和等级所在的元素
    scoreEle:HTMLElement;
    levelEle:HTMLElement;

    //设置等级限制变量
    maxlevel:number;
    //设置升级所需的分数
    upScore:number;

    constructor(maxlevel:number=10,upScore:number=10){
        this.scoreEle=document.getElementById("score")!;
        this.levelEle=document.getElementById("level")!;
        this.maxlevel=maxlevel;
        this.upScore=upScore;
    }

    //加分方法
    addScore(){
        //分数自增
        this.scoreEle.innerHTML=++this.score+"";
        //提升等级
        if(this.score%this.upScore === 0){
            this.levelup();
        }
    }

    //提升等级的方法
    levelup(){
        if(this.level<this.maxlevel){
            this.levelEle.innerHTML=++this.level+"";
        }
       
    }

}
export default ScorePanel;

// const scorePanel = new ScorePanel(100,10);
// scorePanel.addScore();
// scorePanel.addScore();