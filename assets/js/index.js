$(function() {
    getUserInfo();
    var layer = layui.layer;
    $("#btnLogout").on("click", function() {
        // console.log('ok');
        layer.confirm('是否退出?', { icon: 3, title: '提示' }, function(index) {
            console.log('ok');
            localStorage.removeItem('token');
            location.href = './login.html';
            layer.close(index);
        });
    })
});

function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败1')
            }
            renderAvatar(res.data);
        }

        // complete: function(res) {
        //     // console.log('complate');
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         localStorage.removeItem('token');
        //         location.href = './login.html';
        //     }
        // }
    })
}

function renderAvatar(user) {
    // 获取用户名 
    var name = user.nickname || user.username;
    // 将用户名设置到页面中
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    // 判断用户头象
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}