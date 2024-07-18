//食物类
class Food{
    //定义一个属性表示食物对于的元素
    element:HTMLElement;
    constructor(){
        //获取页面中的food元素并赋值给element
        this.element = document.getElementById("food")!;
    }


    //获取食物x轴坐标的方法
    get X(){
        return this.element.offsetLeft;
    }

    //获取食物y轴坐标的方法
    get Y(){
        return this.element.offsetTop;
    }

    //修改食物位置
    change(){
        //生成一个随机位置
        let top = Math.round(Math.random()*29)*10;
        let left = Math.round(Math.random()*29)*10


        this.element.style.left=left+'px';
        this.element.style.top=top+'px';
    }
}

//test
/* const food = new Food();
console.log(food.X,food.Y);
food.change();
console.log(food.X,food.Y);
 */
export default Food;