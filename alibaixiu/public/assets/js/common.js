$("#logout").on('click', function() {
    var flag = confirm('您真的要退出吗？');
    if (flag) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = './login.html';
            },
            error: function() {
                console.log('退出失败');
            }
        })
    }
})