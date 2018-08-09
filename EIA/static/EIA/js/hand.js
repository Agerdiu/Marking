fi = -1;
fj = -1;
function drawline(i,start,end,context){
    start = start;
    end = end;
    if(arr[i][start*3+2] != 3 && arr[i][end*3+2] != 3 && arr[i][start*3+2] != 0 && arr[i][end*3+2] != 0)
    {
        context.moveTo(arr[i][start*3]+5,arr[i][start*3+1]+5);
        context.lineTo(arr[i][end*3]+5,arr[i][end*3+1]+5);
    }
}
function settip(context){
    var str = "";
    var str2 = "";
    if(fj == -1)
    {
        context.font="50px Georgia";
        context.fillText("尚未选定节点",0,650);
        return;
    }
    context.font="50px Georgia";
    if(fj == -2)
        context.fillText("选定手部区块，拖动以改变位置",0,650);
    if(fj == -3)
        context.fillText("选定手部区块，拖动以改变大小",0,650);
    if(fj == 0)
    {
        str = "手腕";
        str2 = "w";
    }
    if(fj == 1)
    {
        str = "拇指根部";
        str2 = "T0";
    }
    if(fj == 2)
    {
        str = "拇指第一节点";
        str2 = "T1";
    }
    if(fj == 3)
    {
        str = "拇指第二节点";
        str2 = "T2";
    }
    if(fj == 4)
    {
        str = "拇指指尖";
        str2 = "T3";
    }
    if(fj == 5)
    {
        str = "食指根部";
        str2 = "I0";
    }
    if(fj == 6)
    {
        str = "食指第一节点";
        str2 = "I1";
    }
    if(fj == 7)
    {
        str = "食指第二节点";
        str2 = "I2";
    }
    if(fj == 8)
    {
        str = "食指指尖";
        str2 = "I3";
    }
    if(fj == 9)
    {
        str = "中指根部";
        str2 = "M0";
    }
    if(fj == 10)
    {
        str = "中指第一节点";
        str2 = "M1";
    }
    if(fj == 11)
    {
        str = "中指第二节点";
        str2 = "M2";
    }
    if(fj == 12)
    {
        str = "中指指尖";
        str2 = "M3";
    }
    if(fj == 13)
    {
        str = "无名指根部";
        str2 = "R0";
    }
    if(fj == 14)
    {
        str = "无名指第一节点";
        str2 = "R1";
    }
    if(fj == 15)
    {
        str = "无名指第二节点";
        str2 = "R2";
    }
    if(fj == 16)
    {
        str = "无名指指尖";
        str2 = "R3";
    }
    if(fj == 17)
    {
        str = "小指根部";
        str2 = "L0";
    }
    if(fj == 18)
    {
        str = "小指第一节点";
        str2 = "L1";
    }
    if(fj == 19)
    {
        str = "小指第二节点";
        str2 = "L2";
    }
    if(fj == 20)
    {
        str = "小指指尖";
        str2 = "L3";
    }
    context.fillText(str+"，右图的"+str2+"节点",0,650);
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

                drawline(i,0,1,context);
                drawline(i,1,2,context);
                drawline(i,2,3,context);
                drawline(i,3,4,context);

                drawline(i,0,5,context);
                drawline(i,5,6,context);
                drawline(i,6,7,context);
                drawline(i,7,8,context);

                drawline(i,0,9,context);
                drawline(i,9,10,context);
                drawline(i,10,11,context);
                drawline(i,11,12,context);

                drawline(i,0,13,context);
                drawline(i,13,14,context);
                drawline(i,14,15,context);
                drawline(i,15,16,context);

                drawline(i,0,17,context);
                drawline(i,17,18,context);
                drawline(i,18,19,context);
                drawline(i,19,20,context);
                context.stroke();

                context.beginPath();
                context.strokeStyle = "gray";
                context.setLineDash([10,10]);
                context.moveTo(bound[0],bound[1]);
                context.lineTo(bound[2],bound[1]);

                context.moveTo(bound[0],bound[1]);
                context.lineTo(bound[0],bound[3]);

                context.moveTo(bound[2],bound[1]);
                context.lineTo(bound[2],bound[3]);

                context.moveTo(bound[0],bound[3]);
                context.lineTo(bound[2],bound[3]);

                context.stroke();
            }
            for(var i=0;i<num;i++){//一维长度为人数
                for(var j=0;j<63;j=j+3){
                        setcolor(i,context);
                        if(arr[i][j+2] != 3 && arr[i][j+2] != 0){
                            if(arr[i][j+2] == 1)
                                context.fillRect(arr[i][j], arr[i][j+1], 10, 10);
                            else context.strokeRect(arr[i][j], arr[i][j+1], 10, 10);
                        }
               }
               context.fillStyle = "#BBFFFF";
                        context.beginPath();
                        context.arc(bound[0],bound[1],5,0,Math.PI*2,true);
                        context.closePath();
                        context.fill();
                        context.fillRect(bound[2]-5,bound[3]-5,10,10);
                        context.fillStyle = 'white';
                        if(fi == -2)
                            {
                                context.beginPath();
                                context.arc(bound[0],bound[1],5,0,Math.PI*2,true);
                                context.closePath();
                                context.fill();
                            }
                        if(fi == -3)
                                context.fillRect(bound[2]-5,bound[3]-5,10,10);
                        if(fi >= 0)
                        {
                            context.strokeStyle = 'white';
                            if(arr[fi][fj*3+2] == 1)
                            context.fillRect(arr[fi][fj*3], arr[fi][fj*3+1], 10, 10);
                            else if(arr[fi][fj*3+2] == 2)
                            context.strokeRect(arr[fi][fj*3], arr[fi][fj*3+1], 10, 10);
                        }
            }
        }

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
            if(fi>=0)
            {
                arr[fi][fj*3] = x;
                arr[fi][fj*3+1] =y;
            }
            else if(fi == -2)
            {
                bound[0] = x; bound[1] = y;
                bound[2] = x+50; bound[3] = y+50;
            }
            else if(fi == -3)
            {
                bound[2] = bound[0]+(x+y)/2; bound[3] = bound[1]+(x+y)/2;
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
    if(x > bound[0] - 5 && x <= bound[0] + 5 && y > bound[1] - 5 && y <= bound[1] + 5)
    {
        hitflag = 1;
        context.fillStyle = "white";
        context.beginPath();
        context.arc(bound[0],bound[1],5,0,Math.PI*2,true);
        context.closePath();
        context.fill();
        fi = -2;
        return;
    }
    if(x > bound[2] - 5 && x <= bound[2] + 5 && y > bound[3] - 5 && y <= bound[3] + 5)
    {
        hitflag = 1;
        context.fillStyle = "white";
        context.fillRect(bound[2]-5,bound[3]-5,10,10);
        fi = -3;
        return;
    }

        for(var i=0;i<num;i++){          //一维长度为人数
                for(var j=0;j<63;j=j+3){
                    if(arr[i][j+2]!=3){
                        if(x > arr[i][j] - 5 && x <= arr[i][j] + 10 && y > arr[i][j+1] - 5 && y <= arr[i][j+1] + 10)
                        {
                            context.fillStyle = "white";
                            context.strokeStyle="white";
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
$("#lefthand").click(function () {
    for(var i=0;i<num;i++){
        var p = (bound[2]-bound[0])/322;
        alert(bound[2]-bound[0]);
        arr[i][0] = bound[0]+p*134;
        arr[i][1] = bound[1]+p*305;

        arr[i][3] = bound[0]+p*187;
        arr[i][4] = bound[1]+p*275;

        arr[i][6] = bound[0]+p*221;
        arr[i][7] = bound[1]+p*251;

        arr[i][9] = bound[0]+p*250;
        arr[i][10] = bound[1]+p*227;

        arr[i][12] = bound[0]+p*273;
        arr[i][13] = bound[1]+p*195;

        arr[i][15] = bound[0]+p*193;
        arr[i][16] = bound[1]+p*180;

        arr[i][18] = bound[0]+p*213;
        arr[i][19] = bound[1]+p*125;

        arr[i][21] = bound[0]+p*224;
        arr[i][22] = bound[1]+p*88;

        arr[i][24] = bound[0]+p*231;
        arr[i][25] = bound[1]+p*54;

        arr[i][27] = bound[0]+p*136;
        arr[i][28] = bound[1]+p*172;

        arr[i][30] = bound[0]+p*138;
        arr[i][31] = bound[1]+p*110;

        arr[i][33] = bound[0]+p*136;
        arr[i][34] = bound[1]+p*76;

        arr[i][36] = bound[0]+p*136;
        arr[i][37] = bound[1]+p*46;

        arr[i][39] = bound[0]+p*90;
        arr[i][40] = bound[1]+p*182;

        arr[i][42] = bound[0]+p*70;
        arr[i][43] = bound[1]+p*135;

        arr[i][45] = bound[0]+p*58;
        arr[i][46] = bound[1]+p*100;

        arr[i][48] = bound[0]+p*50;
        arr[i][49] = bound[1]+p*65;

        arr[i][51] = bound[0]+p*55;
        arr[i][52] = bound[1]+p*200;

        arr[i][54] = bound[0]+p*35;
        arr[i][55] = bound[1]+p*165;

        arr[i][57] = bound[0]+p*25;
        arr[i][58] = bound[1]+p*141;

        arr[i][60] = bound[0]+p*12;
        arr[i][61] = bound[1]+p*113;
            }
        for(var i=0;i<num;i++)
        for(var j=0;j<63;j=j+3) arr[i][j+2] = 1;
    update("canvasface");
});
$("#righthand").click(function () {
    for(var i=0;i<num;i++){
        var p = (bound[2]-bound[0])/322;
        alert(bound[2]-bound[0]);
        arr[i][0] = bound[0]+p*134;
        arr[i][1] = bound[1]+p*305;

        arr[i][3] = bound[0]+p*187;
        arr[i][4] = bound[1]+p*275;

        arr[i][6] = bound[0]+p*221;
        arr[i][7] = bound[1]+p*251;

        arr[i][9] = bound[0]+p*250;
        arr[i][10] = bound[1]+p*227;

        arr[i][12] = bound[0]+p*273;
        arr[i][13] = bound[1]+p*195;

        arr[i][15] = bound[0]+p*193;
        arr[i][16] = bound[1]+p*180;

        arr[i][18] = bound[0]+p*213;
        arr[i][19] = bound[1]+p*125;

        arr[i][21] = bound[0]+p*224;
        arr[i][22] = bound[1]+p*88;

        arr[i][24] = bound[0]+p*231;
        arr[i][25] = bound[1]+p*54;

        arr[i][27] = bound[0]+p*136;
        arr[i][28] = bound[1]+p*172;

        arr[i][30] = bound[0]+p*138;
        arr[i][31] = bound[1]+p*110;

        arr[i][33] = bound[0]+p*136;
        arr[i][34] = bound[1]+p*76;

        arr[i][36] = bound[0]+p*136;
        arr[i][37] = bound[1]+p*46;

        arr[i][39] = bound[0]+p*90;
        arr[i][40] = bound[1]+p*182;

        arr[i][42] = bound[0]+p*70;
        arr[i][43] = bound[1]+p*135;

        arr[i][45] = bound[0]+p*58;
        arr[i][46] = bound[1]+p*100;

        arr[i][48] = bound[0]+p*50;
        arr[i][49] = bound[1]+p*65;

        arr[i][51] = bound[0]+p*55;
        arr[i][52] = bound[1]+p*200;

        arr[i][54] = bound[0]+p*35;
        arr[i][55] = bound[1]+p*165;

        arr[i][57] = bound[0]+p*25;
        arr[i][58] = bound[1]+p*141;

        arr[i][60] = bound[0]+p*12;
        arr[i][61] = bound[1]+p*113;
            }
        for(var i=0;i<num;i++){
        for(var j=0;j<63;j=j+3){
            arr[i][j+2] = 1;
            if(j%3==0)
             arr[i][j] = bound[0]+bound[2] - arr[i][j];
               }
            }
    update("canvasface");
});
$("#submit_btn").click(function () {
 var myform=$('#markform'); //得到form对象
        var data = document.createElement("input");
        var json = [];
        var info = {};
        info.dataname = dataname;
        json.push(info);
        for (var i = 0; i < num; i++) {
            var hand = {};
            hand.order = i;
            hand.values = [];
            for (var j = 0 ; j < 63 ; j++)
                if((j+1)%3!=0)
                hand.values[j] = arr[i][j]/sc;
                else
                 hand.values[j] = arr[i][j];
            json.push(hand);
        }
        var bounds = {};
        bounds.values = [];
        for (var i =0;i<4;i++)
        bounds.values[i] = bound[i]/sc;
        json.push(bounds);
        json = JSON.stringify(json);
        data.name = "data";
        data.value = json;
        myform.append(data);
        myform.submit();
});
