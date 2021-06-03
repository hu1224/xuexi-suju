$(function(){
    huoqu();
    var form = layui.form;
    var layer = layui.layer;
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
        ],
        puss:[
            /^[a-zA-Z]\w{5,17}$/,
            '密码必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
        ],
        yizi:function(value){
            var pint =$('#mima_xin').val();
            if(value !== pint){
                return "两次密码不一致"
            }
        }
    })
    
//修改用户名和
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
    });

    //提交修改密码
    $('#form-mima').on('submit',function(e){
        e.preventDefault();
        var datamim = form.val('form-mima');
        console.log(datamim);
        $.ajax({
            type:'POST',
            url:'/my/updatepwd',
            data:datamim,
            success:function(res){
                console.log(res);
               layer.msg(res.message)  
            }
        })

    })
    
    //图片裁剪
      
        // 1.1 获取裁剪区域的 DOM 元素
        var $image = $('#image')
        // 1.2 配置选项
        const options = {
          // 纵横比
          aspectRatio: 1,
          // 指定预览区域
          preview: '.img-preview'
        }
      
        // 1.3 创建裁剪区域
        $image.cropper(options)
      
      
        //更换图片
        $(".imgshang").on('click',function(){
           $("#imgUp").click();
        });
        $("#imgUp").on('change',function(e){
            console.log(e);
            var ferlir = e.target.files;
            console.log(ferlir);
            if(ferlir.length == 0){
                return layer.msg('请选择要上传的头像')
            }

            //转化为url地址
            var newImgURL = URL.createObjectURL(ferlir[0])
            $('#image').attr('src',newImgURL);
            $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

            
        
        });
        $('#imgfuqi').on('click',function(){
        var dataURL= $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            type:'POST',
            url:'/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success:function(res){
                layer.msg(res.message); 
                window.parent.location.reload()
            }
        });
        
    })
        
   
  

})