
var fun = null;

//页面加载完成后
window.onload = function(){
    //抽奖初始化
   fun = new LotteryInit({
        index: 0,
        dom: document.getElementsByClassName('container')
    });
};

/**
 * @description 抽奖构造函数
 * @param opt => index 默认初始亮起的下标
 * @param opt => dom 抽奖的奖品小块
 * @constructor
 */
function LotteryInit(opt){
    //初始化小块儿默认亮起
    this.index = opt.index;
    //获取dom容器
    this.dom = opt.dom;
    //获取所有的小块
    this.domList = null;
    //计时器
    this.timer = null;
    //统计小块行走个数
    this.count = 0;
    //初始化抽奖数据状态
    this.initData();

}

/**
 * @description 抽奖初始化
 * @return void
 */
LotteryInit.prototype.initData = function(){
    this.dom[0].innerHTML = "";

    var html = '<ul class="con_warp">'+
        '<li class="item_box">1</li>'+
        '<li class="item_box">2</li>'+
        '<li class="item_box">3</li>'+
        '<li class="item_box">4</li>'+
        '<li class="item_box">12</li>'+
        '<li class="item_box item_border_right_bottom"></li>'+
        '<li class="item_box item_border_left_bottom"></li>'+
        '<li class="item_box">5</li>'+
        '<li class="item_box">11</li>'+
        '<li class="item_box item_border_right_top"></li>'+
        '<li class="item_box item_border_left_top"></li>'+
        '<li class="item_box">6</li>'+
        '<li class="item_box">10</li>'+
        '<li class="item_box">9</li>'+
        '<li class="item_box">8</li>'+
        '<li class="item_box">7</li>'+
        '</ul>'+
        '<div class="center_button" onclick="startEvent()">开始</div>';

    var domItem =null,key = 0;

    this.dom[0].innerHTML = html;

    this.domList = document.getElementsByClassName("con_warp")[0].getElementsByClassName("item_box");

    domItem = this.domList;

    for(var i = 0; i < domItem.length; i++){
        if(domItem[i].innerText == "" || domItem[i].innerText == null){
           //console.log(domItem[i]);

        }else{
            //console.log(domItem[i]);
            if(i==7){
                key = 5;
            }else if(i==0){
                key = 1;
            }else if(i==1){
                key = 2;
            }else if(i==2){
                key = 3;
            }else if(i==3){
                key = 4;
            }else if(i==4){
                key = 12;
            }else if(i==8){
                key = 11;
            }else if(i==11){
                key = 6;
            }else if(i==12){
                key = 10;
            }else if(i==13){
                key = 9;
            }else if(i==14){
                key = 8;
            }else if(i==15){
                key = 7;
            }else{
                key = i;
            }
            domItem[i].setAttribute("val",key);
            domItem[i].setAttribute("flag","false");
            if(this.index == i){
                domItem[i].style.backgroundColor="#6494ed";
            }
        }
    }
};

/**
 * @description 抽奖开始方法
 * @return void
 */
LotteryInit.prototype.lotteryAction = function(maxIen){
   var self = this, index = 0, domItem = this.domList;
   clearInterval(this.timer);
   var button = document.getElementsByClassName("center_button")[0];
   if(button.hasAttribute("onclick")){
       button.removeAttribute("onclick");
       button.innerText = "抽奖正在进行，请稍后...!";
       button.style.fontSize = '18px';
   }
   this.timer = setInterval(function(){
   //每轮执行数值自增
   index++;
   //每轮执行数值达到12自动重置为0
   if(index>12){index = 0;}
   //统计执行多少个小块,每走一个自加1
   self.count++;
   //
   for(var i = 0; i < domItem.length; i++){

   if(domItem[i].innerText != "" || domItem[i].innerText != null){
           //console.log(domItem[index]);
           domItem[i].style.backgroundColor = "#FFC837";
           domItem[i].setAttribute("flag","false");
           var value = domItem[i].getAttribute("val");

           if(index==value){
              domItem[i].style.backgroundColor = "#6494ed";
               domItem[i].setAttribute("flag","true");
           }
           //如果统计小块的次数大于最大次数将停止行动,统计数count重置为0;
           if(self.count >= maxIen) {
               self.lotteryStop(function(){
                   self.winningNumber();
               });
           }
       }
    }
  },200);
};

/**
 * @description 抽奖停止方法
 * @return void
 */
LotteryInit.prototype.lotteryStop = function(callback) {
    this.count = 0;
    clearInterval(this.timer);
    if(typeof callback == "function"){
       setTimeout(function(){
           callback();
       },500)
    }
};

/**
 * @description 获取当前抽中的号码
 * @return void
 */
LotteryInit.prototype.winningNumber = function () {
    var self = this, domItem = this.domList;
    for(var i = 0; i < domItem.length; i++){
        var flag = domItem[i].getAttribute("flag");
        //console.log(flag);
        if(flag == true || flag == 'true'){
            alert('恭喜您，您的中奖号码为：'+domItem[i].innerText);
            this.initData();
        }
    }
}

/**
 * @description 获取当前抽中的号码
 * @param Number upper 最大数
 * @param Number lower 最小数
 * @return Number 随机数
 */
function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

//点击触发
function startEvent(){
    var num = random(5, 50);
    fun.lotteryAction(num);
}
