$(function(){
    //渲染页面
    load();
    //按enter键，添加添加
    $('#title').on('keydown', function(e){
        if(e.keyCode == 13){
            //获取本地存储
            var local = get();
            local.push({title: $(this).val(), done: false});
            //更新本地存储
            save(local);
            //重新渲染页面
            load();
            //保存后清空输入框
            $(this).val('');
        }
    })

    //删除
    $('ul, ol').on('click', 'a', function(){
        var data = get();
        var index = $(this).attr('id');
        data.splice(index, 1);
        save(data);
        load();
    });
    
    //todolist选中移动到donelist
    $('ul, ol').on('click', 'input', function(){
        //获取本地存储
        var data = get();
        var index = $(this).siblings('a').attr('id');
        //console.log(index);
        data[index].done = $(this).prop('checked');
        save(data);
        load();
    })


    //添加到本地存储
    function save(data){
        localStorage.setItem('todolist', JSON.stringify(data));
    }

    //获取本地存储
    function get(){
        var data = localStorage.getItem("todolist");
        if(data !== null){
            return JSON.parse(data);
        }else{
            return [];
        }
    }

    //渲染数据到页面
    function load(){
        $('ul, ol').empty();
        //获取本地存储
        var data = get();
        var todo = 0;
        var done = 0;
        $(data).each(function(i, item){
            if(!item.done){
                //未完成
                todo ++;
                $('#todolist').append("<li><input type='checkbox'/><p>"+ item.title +"</p><a href='#' id="+ i +"></a></li>");
            }else{
                done ++;
                //已完成
                $('#donelist').append("<li><input type='checkbox' checked='checked'/><p>"+ item.title +"</p><a href='#' id="+ i +"></a></li>");
            }    
        });
        $('#todocount').text(todo);
        $('#donecount').text(done);
    }
});