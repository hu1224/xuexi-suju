$(function(){
    // 引入方法
    var layer = layui.layer
    huoqu();
    function huoqu(){
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success:function(res){
                console.log(res);
                if(res.status == 0){
                    genxi(res.data)
                }
                
            },
            complete:function(res){
                console.log(res);
                 if(res.responseJSON.status == 1){
                    location.href = './login.html';
                }
            }
        }) 
    }
    function genxi(nuer){
       if(nuer.nickname !== '') {
        $('#welcome').html('欢迎 '+nuer.nickname)
       }else(
        $('#welcome').html('欢迎 '+nuer.username) 
       );
       if (nuer.user_pic !== null){
           $(".layui-nav-img").prop('src',nuer.user_pic).show();
           $('.text-avatar').hide()
       }else{
            $(".layui-nav-img").hide();
           $('.text-avatar').html(nuer.username[0].toUpperCase()).show()
       }
    }
    

    //退出登录
    $('#lokout').on('click',function(){
        //eg1
    layer.confirm('确认退出吗？', {icon: 3, title:'提示'}, function(index){
        location.href = './login.html';
        localStorage.removeItem('daidl');
        layer.close(index);
    });  
    })

    //设置权限


})