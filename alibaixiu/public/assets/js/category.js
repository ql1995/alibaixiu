// 添加分类
$("#addCategory").on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function(res) {
            console.log(res);
            location.reload();
        }
    });
    return false;
});
// 模板渲染后台分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('catgoryListTpl', { data: res });
        $("#categoryBox").html(html);
    }
});
// 修改分类信息
$("#categoryBox").on("click", ".edit", function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(res) {
            // console.log(res); 将返回来的对象渲染到左侧修改栏中
            var html = template('editCategory', res);
            $("#formBox").html(html);
        }
    });
});
// 修改分类信息
$("#formBox").on("submit", "#editCategory", function() {
    var formData = $(this).serialize();
    var id = $(this).attr("data-id");
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function() {
            location.reload();
        }
    });
    return false;
});
// 根据id删除分类
$("#categoryBox").on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    if (confirm("您真的要执行删除操作码？")) {
        $.ajax({
            type: "delete",
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        });
    }
});