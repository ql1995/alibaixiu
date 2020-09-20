// 添加新用户
$("#userForm").on('submit', function() {
    var formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            location.reload();
        },
        error: function() {
            alert('添加用户失败')
        }
    });
    return false;
});
// 事件委托的形式头像上传功能
$("#modifyBox").on('change', "#avatar", function() {
    var formData = new FormData();
    // console.log(this.files[0]);
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 让ajax方法不要解析请求参数
        processData: false,
        contentType: false,
        success: function(res) {
            //添加在预览上
            $("#preview").attr('src', res[0].avatar);
            // 添加在表单数据中
            $("#hiddenAvatar").val(res[0].avatar);
        }
    });
});
// 用户列表展示功能
$.ajax({
    type: 'get',
    url: '/users',
    success: function(res) {
        // console.log(res);
        // 获取tbody
        var html = template("userTpl", { data: res })
        $('#userBox').html(html);
    }
});
// 事件委托编辑用户
$("#userBox").on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(res) {
            var html = template('modifyTpl', res);
            // html方法覆盖之前的内容
            $("#modifyBox").html(html);
        }
    });
});
$("#modifyBox").on('submit', '#modifyForm', function() {

    var formdata = $(this).serialize();
    // console.log(formdata);
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formdata,
        success: function(res) {
            location.reload();
        }
    });
    return false;
});
// 删除功能
$('#userBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    // console.log(id);
    // 发送请求删除该项 需要事先确认一下
    if (confirm("先生您确定要删除吗")) {
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload();
            }
        });
    }

})