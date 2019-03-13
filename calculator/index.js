"use strict";

var str='',
    flag=0,//数字与符号之间的状态切换
    dst=0;//监视小数点状态。

function strEventButCE() {
    var result = document.getElementById("result_num");
    result.value="";
    flag=0;
    dst=0;
}

//点击按钮获取按钮值
//文字符号类型+ - x /
function strEventBut(str) {
    //如果flag状态为 1 说明已经点击了数字符号
    if (flag == 1) {
    showResult(str);
    if(dst==1){
            dst=0;
        }
    //改变flag状态为 0 说明已经点击一个运算符号
    flag = 0;
    }
}
//小数点点符号
function strEventButDian(str){
    if(flag==1){
      if(dst==0) {
          showResult(str);
          flag = 0;
          dst = 1;
      }
    }
}
//点击等号
function strEventButDen(str){
    if(flag==1){
        showResult(str);
        var result = document.getElementById("result_num");
        if(carryOut()!=0){
            result.value=carryOut();
        }
    }
}
//点击百分号
function strEventButBF(str){
    if(flag==1){
        showResult(str);
        var result = document.getElementById("result_num");
        result.value=parseFloat(result.value)/100;
    }
}
function strEventButAC() {
    alert("暂时没有开通此功能。");
}
function strEventButDE() {
    alert("暂时没有开通此功能。");
}
//点击按钮获取按钮值
//数字类型
function numEventBut(val) {
    showResult(val);
    //重置flag 状态为1说明已经点击了数字
    flag=1;
}

//显示值
function showResult(val){
 if(val!=undefined) {
     var result = document.getElementById("result_num");
     result.value+=val;

 }
}
//运算逻辑执行
function carryOut(){
   var result=0;
   var equation=document.getElementById("result_num");
   var equStr=equation.value;
   //统计运算次数
   var res=symbolLength(equStr);
   if(res<=1){
      //单个运算符‘+’计算
      if(equStr.indexOf("+")!=-1){
        var numQ=Number(equStr.substring(0,equStr.indexOf("+")));
        var numH=Number(equStr.substring(equStr.indexOf("+")+1,equStr.length-1));
        result=compute(numQ,numH,'+');
      }
       //单个运算符‘-’计算
       if(equStr.indexOf("-")!=-1){
           var numQ=Number(equStr.substring(0,equStr.indexOf("-")));
           var numH=Number(equStr.substring(equStr.indexOf("-")+1,equStr.length-1));
           result=compute(numQ,numH,'-');
       }
       //单个运算符‘×’计算
       if(equStr.indexOf("×")!=-1){
           var numQ=Number(equStr.substring(0,equStr.indexOf("×")));
           var numH=Number(equStr.substring(equStr.indexOf("×")+1,equStr.length-1));
           result=compute(numQ,numH,'×');
       }
       //单个运算符‘×’计算
       if(equStr.indexOf("÷")!=-1){
           var numQ=Number(equStr.substring(0,equStr.indexOf("÷")));
           var numH=Number(equStr.substring(equStr.indexOf("÷")+1,equStr.length-1));
           result=compute(numQ,numH,'÷');
       }
      return result;
   }else{
       //混合运算
       result=eval(hybridOperation(equStr));
       return result;
   }

}
//计算函数
function compute(numAgo,numBack,fh){
    switch (fh) {
        case '+':
        return addition(numAgo, numBack);
        break;
        case '-':
        return subtraction(numAgo, numBack);
        break;
        case '×':
        return multiplication(numAgo, numBack);
        break;
        case '÷':
        return division(numAgo, numBack);
        break;
        default:
        console.log('运算异常');
        break;
    }
}

//混合运算的运算符转变
function hybridOperation(equ) {
    var dds=equ.replace("=","");
    return dds.split('×').join('*').split('÷').join('/').split('-').join('-').split('+').join('+');
}

//加法运算
function addition(ago,back){
    return parseFloat(ago)+parseFloat(back);
}
//减法运算
function subtraction(ago,back) {
    return parseFloat(ago)-parseFloat(back);
}
//乘法运算
function multiplication(ago,back) {
    return parseFloat(ago)*parseFloat(back);
}
//除法运算
function division(ago,back) {
    return parseFloat(ago)/parseFloat(back);
}

//+ - x ÷符号个数检测
function symbolLength(eq){
    var count=0;
    for(var i=0;i<eq.length;i++){
        if(eq[i]=='+'||eq[i]=='-'||eq[i]=='×'||eq[i]=='÷'){
           count++;
        }
    }
    return count;
}


