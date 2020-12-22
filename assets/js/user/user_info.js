$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1 ~ 6 之间';
            }
        }
    });



    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                // $("#userInfo [name=username]").val(res.data.username);
                // $("#userInfo [name=username]").val(123);
                form.val('formUserInfo', res.data);
            }
        })
    }

    $("#btnReset").on("click", function(evt) {
        evt.preventDefault();
        initUserInfo();
    });

    $(".layui-form").submit(function(evt) {
        evt.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            // data: {
            //     username: $(this).find("[name=username]").val(),
            //     nickname: $(this).find("[name=nickname]").val(),
            //     email: $(this).find("[name=email]").val()
            // },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败");
                }
                layer.msg('更新用户信息成功');
                window.parent.getUserInfo();
            }
        });
    });

});