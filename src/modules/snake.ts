class Snake{
    //蛇的头部元素
    head:HTMLElement;
    //蛇的身体，包括头部
    bodies:HTMLCollection;
    //蛇的容器
    element:HTMLElement;


    constructor(){
        this.element=document.getElementById('snake')!;
        this.head=document.querySelector('#snake>div') as HTMLElement;
        this.bodies=document.getElementById('snake')!.getElementsByTagName('div');

    }

    //获取蛇头的X坐标
    get X(){
        return this.head.offsetLeft;
    }
    //获取蛇头的Y坐标
    get Y(){
        return this.head.offsetTop;
    }
    //设置蛇头的X坐标
    set X(value:number){

        //新值和旧值相同，不做修改
        if(this.X==value){
            return;
        }

        //X的值的合法范围
        if(value<0 || value>290){
            //蛇撞墙了
            throw new Error("You Die");
        }

        //禁止掉头
        if(this.bodies[1]/*判断第二节身体的存在*/&&(this.bodies[1] as HTMLElement).offsetLeft === value/*蛇头与身体重叠*/){
            //如果发生了掉头，让蛇继续反方向移动
            if(value>this.X){
                //修改蛇头的X轴坐标使其不能掉头
                value=this.X-10;
            }else{
                value=this.X+10;
            }
        }

        this.moveBody();
        this.head.style.left=value + 'px';
        //检查蛇头是否撞自己
        this.checkHeadBody();
    }

    set Y(value:number){

         //新值和旧值相同，不做修改
         if(this.Y==value){
            return;
        }

        //Y的值的合法范围
        if(value<0 || value>290){
            //蛇撞墙了
            throw new Error("You Die");
        }

        //禁止掉头
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetTop === value){
            //如果发生了掉头，让蛇继续反方向移动
            if(value>this.Y){
                //
                value=this.Y-10;
            }else{
                value=this.Y+10;
            }
        }
        this.moveBody();
        this.head.style.top=value + 'px';
        //检查有没有撞到自己
        this.checkHeadBody();
    }

    //添加身体的方法
    addBody(){
        //向element中添加一个div
        this.element.insertAdjacentHTML("beforeend","<div></div>");
    }

    //添加一个蛇身体移动的方法
    moveBody(){
        //将后边身体设置为前边身体的位置
        for(let i=this.bodies.length-1;i>0;i--){
            //获取前边身体的位置
            let X=(this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y=(this.bodies[i-1] as HTMLElement).offsetTop;

            //修改当前身体的位置
            (this.bodies[i] as HTMLElement).style.left = X+'px';
            (this.bodies[i] as HTMLElement).style.top = Y+'px';

        }
    }

    //检查蛇头是否撞到自己
    checkHeadBody(){
        //获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for(let i=1;i<this.bodies.length;i++){
            let bd =this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft&&this.Y ===bd.offsetTop/* 蛇头与蛇身坐标重叠*/){
                //进入判断，说明撞到身体，游戏结束
                throw new Error('撞到自己')
            }
        }
    }
    
}

export default Snake;