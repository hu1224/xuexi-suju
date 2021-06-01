$(function () {
    $('#link_dl').on('click',function(){
        $(".login_dl").hide();
        $(".login_zc").show();
    });
    $('#link_zc').on('click',function(){
        $(".login_zc").hide();
        $(".login_dl").show();
    });
    
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwy :[
        /^[\S]{6,12}$/
        ,'用户名必须6到12位，且不能出现空格'],
        mia:[
        /^[\S]{6,12}$/  
        ,'密码必须6到12位，且不能出现空格'],
        reim : function(value){
            var pph = $('.usepass_zc').val();
            if(value !== pph){
                return "两次密码不一致"
            }
        }
      
    })

    //监听注册表单接口
    $('#form_zc').submit(function(e){
        e.preventDefault();  
        $.ajax({
            type:'POST',
            url:'api/reguser',
            data:{
                username:$('#form_zc [name = usename_zc]').val(),
                password:$('#form_zc [name = usepass_zc]').val(), 
            },
            success:function(res){
                if(res.stayus !== 0){
                    layer.msg(res.message);
                    $('#link_zc').click()
                }else{
                    layer.msg(res.message);
                    
                }
            }
        });
    })

    //登录页面
    $('#form_dl').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/api/login',
            data:{
                username:$("#form_dl [name = usename]").val(),
                password: $("#form_dl [name = usepass]").val() 
            },
            success:function(res){
                    layer.msg(res.message);
                    if(res.status !==1){
                        localStorage.setItem('daidl',res.token)
                        location.href = './index.html';
                    }
            }
        })
    })

})