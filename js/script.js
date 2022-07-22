$(function () {
    var list = [
        { id: "示例规则_账号爆破防护", condition:['基础','URI','等于'], action: "阻断", port: "1", priority: "4" },
        { id: "示例规则_API防护", condition:['基础','URI','不等于'], action: "阻断", port: "2", priority: "5" },
        { id: "示例规则_网络爬虫放行", condition:['基础','HTTP-Method','等于'], action: "放行", port: "3", priority: "6" },
    ];
    //生成表格数据
    $.each(list, function (index, item) {
        $('<tr id="' + item.id + '"><td><input class="deletecheck" id="deletecheckbox" type="checkbox" /></td><td>' + item.id + '</td><td>' + item.condition[0]+ item.condition[1]+ item.condition[2] + '</td><td>' + item.action + '</td><td>' + item.port + '</td><td>' + item.priority + '</td><td><input type="checkbox" /></td><td><input class="update" type="button" id="btnUpdate" value="修改"/><input class="delete" type="button" id="btnDelete" value="删除" /></td></tr>').appendTo($("#list"));
    });
    //为复选框checkAll设置点击事件，完成全选、全消的功能
    $("#checkAll").click(function () {
        //根据当前复选框的状态设置其它行复选框的状态
        $("#deletecheckbox.deletecheck").attr("checked", this.checked);
    });
    //删除选中行
    $("#DeleteAll").click(function () {
        //$("#list :checked").parent().parent().remove();
        $("#list :checked").parents("tr").remove();
    });
    //删除单行
    $("#btnDelete.delete").click(function () {
        var msg = `提示\n\n您确定要删除该策略吗？`;
        if (confirm(msg)==true){
        $("#btnDelete").parents("tr").remove();
    }else{
    return false;
    }
    });
    //取消
    $("#btnCancel").click(function () {
        $("#bgDiv").css("display", "none");
        $("#windowsDiv").css("display", "none");
    });
    //添加
    $("#btnAdd").click(function () {
        //显示添加界面
        $(".modistr").text('添加策略')
        $("#bgDiv").css("display", "block").css("width", window.innerWidth + "px").height(window.innerHeight + "px");
        $("#windowsDiv").css("display", "block").css("left", (window.innerWidth - 250) / 2 + "px").css("top", (window.innerHeight - 100) / 2 + "px");

        //打开的清除文本框中的数据
        //$("#windowsDiv input[type=text]").val('');
        $("#windowsDiv :text,:hidden").val('');
    });
    //保存
    $("#btnSave").click(function () {
        var res1=$("#textId").val();
        var res2=$("#textAction").val();
        var res3=$("#textPriority").val();
        if(res1.length== 0||res2.length== 0||res3.length== 0){
            alert('请填写策略名称，匹配动作和优先级！')
            return false;
        }
        else
            $("#bgDiv").css("display", "none");
            $("#windowsDiv").css("display", "none");
        var id = $("#hidId").val();
        var rows = $("#list")[0].childElementCount;
        if (rows > 20) return alert("请注意最多可添加20条策略！");
        if (id == '') {//添加
            $('<tr id="' + $("#textId").val() + '"><td><input type="checkbox"/></td><td>' + $("#textId").val() + '</td><td>' + $("#textCondition").val() + '</td><td>' + $("#textAction").val() + '</td><td>' + $("#textPort").val() + '</td><td>' + $("#textPriority").val() + '</td><td><input type="checkbox" /></td><td><input class="update" type="button" id="btnUpdate" value="修改"/><input class="delete" type="button" id="btnDelete" value="删除" /></td></tr>').appendTo($("#list")).find(":button").click(function () {
                //显示添加界面
                $("#bgDiv").css("display", "block").css("width", window.innerWidth + "px").height(window.innerHeight + "px");
                $("#windowsDiv").css("display", "block").css("left", (window.innerWidth - 250) / 2 + "px").css("top", (window.innerHeight - 100) / 2 + "px");
                //找到当前按钮所在td之前的所有td
                var tds = $(this).parent().prevAll();
                                
                //设置文本框的值
                $("#hidId").val(tds.eq(5).text());//隐藏域存放修改之前的行的ID编号值
                $("#textId").val(tds.eq(5).text());
                $("#textCondition").val(tds.eq(4).text());
                $("#textAction").val(tds.eq(3).text());
                $("#textPort").val(tds.eq(2).text());
                $("#textPriority").val(tds.eq(1).text());
            });
            //为最新添加的一行数据的修改按钮绑定事件
            $("#btnUpdate.update:last").click(function () {
               //显示添加界面
               $("#bgDiv").css("display", "block").css("width", window.innerWidth + "px").height(window.innerHeight + "px");
               $("#windowsDiv").css("display", "block").css("left", (window.innerWidth - 250) / 2 + "px").css("top", (window.innerHeight - 100) / 2 + "px");
               //找到当前按钮所在td之前的所有td
               var tds = $(this).parent().prevAll();
               //设置文本框的值
               $("#hidId").val(tds.eq(5).text());//隐藏域存放修改之前的行的ID编号值
               $("#textId").val(tds.eq(5).text());
               $("#textCondition").val(tds.eq(4).text());
               $("#textAction").val(tds.eq(3).text());
               $("#textPort").val(tds.eq(2).text());
               $("#textPriority").val(tds.eq(1).text());  
            });
            $("#btnDelete.delete:last").click(function () {
                var msg = `提示\n\n您确定要删除该策略吗？`;
                if (confirm(msg)==true){
                    $("#btnDelete.delete:last").parents("tr").remove();
                    $("#bgDiv").css("display", "none");
                    $("#windowsDiv").css("display", "none");
                }else{
                    return false;
                }
            });
        } else {//修改
            var trds = $("#" + id + ">td");
            var res1=$("#textId").val();
            var res2=$("#textAction").val();
            var res3=$("#textPriority").val();
            if(res1.length== 0||res2.length== 0||res3.length== 0){
                alert('请填写策略名称，匹配动作和优先级！')
                //隐藏界面
                $("#bgDiv").css("display", "none");
                $("#windowsDiv").css("display", "none");
                return false;
            } 
            else
                $("#bgDiv").css("display", "none");
                $("#windowsDiv").css("display", "none");
                trds.eq(1).text($("#textId").val());
                trds.eq(2).text($("#textCondition").val());
                trds.eq(3).text($("#textAction").val());
                trds.eq(4).text($("#textPort").val());
                trds.eq(5).text($("#textPriority").val());
                //修改tr的id属性，保持数据一致
                $("#" + id).attr("id", $("#textId").val());
        }
    });
    //修改
    $("#btnUpdate.update").click(function () {
        $(".modistr").text('修改策略')
        //显示添加界面
        $("#bgDiv").css("display", "block").css("width", window.innerWidth + "px").height(window.innerHeight + "px");
        $("#windowsDiv").css("display", "block").css("left", (window.innerWidth - 250) / 2 + "px").css("top", (window.innerHeight - 100) / 2 + "px");
        //找到当前按钮所在td之前的所有td
        var tds = $(this).parent().prevAll();
        //设置文本框的值
        $("#hidId").val(tds.eq(5).text());//隐藏域存放修改之前的行的ID编号值
        $("#textId").val(tds.eq(5).text());
        // var textCondition= $("#type").val()+$("#field").val()+$("#symbol").val()+$("#content").val()(不会)
        $("#textCondition").val(tds.eq(4).text());
        $("#textCondition").val(tds.eq(4).text());
        $("#textAction").val(tds.eq(3).text());
        $("#textPort").val(tds.eq(2).text());
        $("#textPriority").val(tds.eq(1).text());
    })
});