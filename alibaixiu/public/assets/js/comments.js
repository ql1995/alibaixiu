// 评论列表
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(res) {
        console.log(res);
    }
});