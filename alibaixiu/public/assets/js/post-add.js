// 文章所属分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        // console.log(res);
        var html = template('postAddTpl', { data: res });
        $("#category").html(html);
    }
});
// 文章的封面上传功能
$('#feature').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    // 二进制文件上传
    formData.append('avatar', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
            // 将返回的数据渲染给隐藏域
            // console.log(res);
            $("#thumbnail").val(res[0].avatar);
        }
    });
});
// 添加文章
$("#addForm").on('submit', function() {
    var formData = $(this).serialize();

    // 必须为登录状态才能发表文章
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(res) {
            location.href = "/admin/posts.html";
        }
    });
    return false;
});
var id = getUrlParams('id');
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(res) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(categories) {
                    res.categories = categories;
                    console.log(res);
                    var html = template("modifyTpl", res);
                    $("#parentBox").html(html);
                }
            });

        }
    });
}
// 文章修改提交
$("#parentBox").on("submit", "#modifyForm", function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function() {
            location.href = '/admin/posts.html';
        }
    });
    return false;
});
// 获取修改的id函数
function getUrlParams(name) {

    var parmsArry = location.search.substr(1).split("&");
    for (var i = 0; i < parmsArry.length; i++) {

        var temp = parmsArry[i].split('=');
        if (temp[0] == name) {
            return temp[1];
        }
    }
    return -1;
}