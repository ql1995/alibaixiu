// 获取文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        console.log(res);
        var html = template('postsTpl', res);
        $("#postsBox").html(html);
        var page = template('pageTpl', res);
        $("#pageBox").html(page);
    }
});
// 日期格式化
function dateFormat(date) {
    var date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

}

function changePage(data) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: data
        },
        success: function(res) {
            // console.log(res);
            var html = template('postsTpl', res);
            $("#postsBox").html(html);
            var page = template('pageTpl', res);
            $("#pageBox").html(page);
        }
    });
};
// 文章筛选
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoryTpl', {
            data: res
        });
        $("#categoryList").html(html);
    }
});
// 筛选所需要滴
$("#formBox").on('submit', function() {
    var formData = $(this).serialize();
    // console.log(formData);
    // alert(1);
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(res) {
            // console.log(res);
            var html = template('postsTpl', res);
            $("#postsBox").html(html);
            var page = template('pageTpl', res);
            $("#pageBox").html(page);
        }
    });
    return false;
});
// 删除文章
$("#postsBox").on('click', ".delete", function() {
    var id = $(this).attr('data-id');
    if (confirm('您确定要删除该文章吗？')) {
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                location.reload();
            }
        });
    }
})