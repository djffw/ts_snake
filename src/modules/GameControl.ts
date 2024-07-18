//引入其他类
import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./scorePanel";

//游戏控制器，控制所有类
class GameControl{
    //定义三个属性
    //蛇
    snake:Snake;
    //食物
    food:Food;
    //计分板
    scorePanel:ScorePanel;

    //保存蛇的移动方向
    direction:string='';
    //创建一个属性来记录游戏是否结束
    isLive = true;

    constructor(){
        this.snake=new Snake();
        this.food=new Food();
        this.scorePanel=new ScorePanel();

        this.init();
    }

    //游戏的初始化方法
    init(){
        //绑定键盘按键按下的事件
        document.addEventListener("keydown",this.keydownHandler.bind(this));
        //bind的作用，把this绑定为当前对象
        //document.addEventListener("keydown",this.keydownHandler); 在ts中此处的this的对象是document，不能修改GameControl对象中的属性
        
        //调用run方法
        this.run();

    }

    //创建键盘按下的响应函数
    keydownHandler(event:KeyboardEvent){
        //需要检查event.key的值是否合法
        //保存direction属性
        this.direction=event.key;

    }
    //蛇头的移动
    run(){
        //根据方向this.direction使蛇的位置改变
        //获取蛇现在的坐标
        let X=this.snake.X;
        let Y=this.snake.Y;

        switch(this.direction){
            case "ArrowUp":
            case "Up":
                //向上移动
                Y-=10;
                break;
            case "ArrowDown":
            case "Down":
                //向下移动
                Y+=10;
                break;
            case "ArrowLeft":
            case "Left":
                //向左移动
                X-=10;
                break;
            case "ArrowRight":
            case "Right":
                //向右移动
                X+=10;
                break;
            
        }

        //检查蛇是否吃到食物
       this.checkEAT(X,Y);
           

        //修改蛇的x，y值
        try{
            this.snake.X=X;
            this.snake.Y=Y;

        }catch(e:any){
            //出现异常，游戏结束
            alert(e.message+' GAME OVER');
            this.isLive=false;
            
        }
        
        //开启定时调用
        this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30);

    }

    //检查蛇吃到食物
    checkEAT(X:number,Y:number){
        if( X === this.food.X && Y ===this.food.Y){
            //食物位置改变
            this.food.change();
            //分数增加
            this.scorePanel.addScore();
            //蛇增加一节
            this.snake.addBody();
        }
            
            
    }

}

export default GameControl;