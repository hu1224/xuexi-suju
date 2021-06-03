$(function(){
    huoqu();
    var form = layui.form;
    $('.layui-btn-primary').click(function(){
        huoqu()
    });
    var data ={};
    function huoqu(){
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status == 0){
                    data = res.data
                    form.val('forten',data)
                    
                }
                
            }
        }) 
    }
    form.verify({
        pwy:[
            /^[\u4e00-\u9fa5]{0,}$/,
            '昵称必须是汉字'
        ],
        email:[
           /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ ,
           '请输入正确的邮箱'
        ]
    })
    

    $('#form-czti').on('submit',function(e){
        e.preventDefault();
        data.nickname = $('#xg_nam').val();
        data.email = $('#xg_eml').val();
        
       $.ajax({
           type:'POST',
           url:'/my/userinfo',
           data:data,
           success:function(res){

           }
       }) 
    })
})