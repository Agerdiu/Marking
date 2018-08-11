fi = -1;
fj = -1;
function drawline(i,start,end,context){
    start = start - 1;
    end = end - 1;
    if(arr[i][start*3+2] != 3 && arr[i][end*3+2] != 3 && arr[i][start*3+2] != 0 && arr[i][end*3+2] != 0)
    {
        context.moveTo(arr[i][start*3]+5,arr[i][start*3+1]+5);
        context.lineTo(arr[i][end*3]+5,arr[i][end*3+1]+5);
    }
}
function settip(context){
    var str = "";
    if(fj == -1)
    {
        context.font="70px Georgia";
        context.fillText("尚未选定节点",0,750);
        return;
    }
    context.font="70px Georgia";
    if(fj == 0) str = "右肩";
    if(fj == 1) str = "右肘";
    if(fj == 2) str = "右腕";
    if(fj == 3) str = "左肩";
    if(fj == 4) str = "左肘";
    if(fj == 5) str = "左腕";
    if(fj == 6) str = "右髋";
    if(fj == 7) str = "右膝";
    if(fj == 8) str = "右脚踝";
    if(fj == 9) str = "左髋";
    if(fj == 10) str = "左膝";
    if(fj == 11) str = "左脚踝";
    if(fj == 12) str = "头顶";
    if(fj == 13) str = "脖子";
    if(fj == 14) str = "面部中心";
    if(fj == 15) str = "右足尖";
    if(fj == 16) str = "左足尖";


    context.fillText("节点：人物"+(fi+1)+"的"+str,0,750);
}
window.onload = function () {
           drawbackground("canvas21");
       }
function setcolor(i,context){
    i = i%5;
     if (i==0)
     {
         context.fillStyle = "#00FF00";
         context.strokeStyle = "#00FF00"
     }
     if (i==1)
     {
         context.fillStyle = "#FF0000";
         context.strokeStyle = "#FF0000";
     }
     if (i==2)
     {
         context.fillStyle = "#0000FF";
         context.strokeStyle ="#0000FF";
     }
     if (i==3)
     {
         context.fillStyle = "#00FFFF";
         context.fillStyle = "#00FFFF";

     }
     if (i==4)
     {
         context.fillStyle = "#40E0D0";
         context.fillStyle = "#40E0D0";

     }
     if (i==5)
     {
         context.fillStyle = "#5F9EA0";
         context.fillStyle = "#5F9EA0";

     }
}
function update(id) {

            var canvas = document.getElementById(id);
            if (canvas == null)
                return false;
            var context = canvas.getContext("2d");

            canvas.width = canvas.width
            settip(context);
            for(var i=0;i<num;i++){
                context.beginPath();
                context.setLineDash([1,0]);
                context.strokeStyle = "pink";  //设置线的颜色状态
                context.lineWidth = 3;
                if(arr[i][14*3+1]==0)  drawline(i,13,14,context);
                else
                {
                    drawline(i,13,15,context);
                    drawline(i,14,15,context);
                }
                drawline(i,1,2,context);
                drawline(i,2,3,context);
                drawline(i,4,5,context);
                drawline(i,5,6,context);
                drawline(i,7,8,context);
                drawline(i,8,9,context);
                drawline(i,10,11,context);
                drawline(i,11,12,context);
                drawline(i,9,16,context);
                drawline(i,12,17,context);
                context.stroke();
                context.beginPath();
                context.strokeStyle = "gray";
                context.setLineDash([10,10]);
                drawline(i,1,14,context);
                drawline(i,4,14,context);
                drawline(i,1,7,context);
                drawline(i,4,10,context);
                drawline(i,7,10,context);
                context.stroke();
            }
            for(var i=0;i<num;i++){//一维长度为人数
                for(var j=0;j<51;j=j+3){
                        setcolor(i,context);
                        if(arr[i][j+2] != 3 && arr[i][j+2] != 0){
                            if(arr[i][j+2] == 1)  context.fillRect(arr[i][j], arr[i][j+1], 10, 10);
                            else context.strokeRect(arr[i][j], arr[i][j+1], 10, 10);
                        }
                        if(fi != -1)
                        {
                            context.fillStyle = 'white';
                            context.strokeStyle = 'white';
                            if(arr[fi][fj*3+2] == 1)
                            context.fillRect(arr[fi][fj*3], arr[fi][fj*3+1], 10, 10);
                            else if(arr[fi][fj*3+2] == 2)
                            context.strokeRect(arr[fi][fj*3], arr[fi][fj*3+1], 10, 10);
                        }

               }
            }
        }
//鼠标按下事件
$("#canvasface").mousedown(function (t){
    var canvas = document.getElementById("canvasface");
            if (canvas == null)
                return false;
            var canvascontainer = document.getElementById("canvascontainer");
            var context = canvas.getContext("2d");
            if(t.button ==2)
            {
                if(fi!=-1)
                {
                    if (arr[fi][fj*3+2] == 1) arr[fi][fj*3+2] = 2;
                    else if (arr[fi][fj*3+2] == 2) arr[fi][fj*3+2] = 1;
                    update("canvasface")
                }
            }
    canvas.onmousemove = function(e){
             var x=e.clientX-canvascontainer.offsetLeft;
             var y=e.clientY-canvascontainer.offsetTop;
            //先清除之前的然后重新绘制
            if(fi!=-1)
            {
                arr[fi][fj*3] = x;
                arr[fi][fj*3+1] =y;
            }
            canvas.width = canvas.width
            update("canvasface")
        };

        canvas.onmouseup = function(){
            canvas.onmousemove = null;
            canvas.onmouseup = null;
        };
});
$("#canvasface").click(function () {

    var canvas = document.getElementById("canvasface");
            if (canvas == null)
                return false;
            var context = canvas.getContext("2d");
    var canvascontainer = document.getElementById("canvascontainer");
    canvas.onclick=function(e){//给canvas添加点击事件
    e=e||event;//获取事件对象
    //获取事件在canvas中发生的位置
    var x=e.clientX-canvascontainer.offsetLeft;
    var y=e.clientY-canvascontainer.offsetTop;
    var hitflag = 0;
        for(var i=0;i<num;i++){
                for(var j=0;j<51;j=j+3){
                    if(arr[i][j+2]!=3){
                        if(x > arr[i][j] - 5 && x <= arr[i][j] + 10 && y > arr[i][j+1] - 5 && y <= arr[i][j+1] + 10)
                        {
                            context.fillStyle = "white"
                            context.strokeStyle="white"
                            if(arr[i][j+2] == 1)
                            context.fillRect(arr[i][j], arr[i][j+1], 10, 10);
                            else if(arr[i][j+2] == 2)
                            context.strokeRect(arr[i][j], arr[i][j+1], 10, 10);
                            fi = i;
                            fj = j/3;
                            hitflag = 1;
                            break;
                        }
                    }

               }
            }
    update("canvasface");
    }
});
$("#submit_btn").click(function () {
 var myform=$('#markform'); //得到form对象
        var data = document.createElement("input");
        var json = [];
        var info = {};
        info.dataname = dataname;
        json.push(info);
        for (var i = 0; i < num; i++) {
            var person = {};
            person.order = i;
            person.values = [];
            for (var j = 0 ; j < 51 ; j++)
                if((j+1)%3!=0)
                    person.values[j] = arr[i][j]/sc;
                else
                    person.values[j] = arr[i][j];
            json.push(person);
        }
        json = JSON.stringify(json);
        alert(json);
        data.name = "data";
        data.value = json;
        myform.append(data);
        myform.submit();
});
