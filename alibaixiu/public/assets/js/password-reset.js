// 修改密码
$("#modifyForm").on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function(res) {
            console.log(res);
            location.href = "/admin/login.html";
        }
    });
    return false;
})