$(function() {
    // 切换注册
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    // 切换登录
    $("#link_login").on("click", function() {
        $(".reg-box").hide();
        $(".login-box").show();
    });


    // 自定义表单验证
    var form = layui.form;
    var layer = layui.layer;
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            if ($(".reg-box [name=password]").val() !== value) {
                return "两次密码不一致";
            }
        }
    });

    // 监听注册表单提交事件
    $("#form_reg").on("submit", function(e) {
        e.preventDefault();
        var data = { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() };
        $.post("/api/reguser", data, function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $("#form_reg [name=username]").val("");
            $("#form_reg [name=password]").val("");
            $("#link_login").click();
        });
    });


    // 监听登录表单提交事件
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                console.log(res.token);
                localStorage.setItem('token', res.token);
                location.href = './index.html';
                // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjk5MjgsInVzZXJuYW1lIjoieXd5IiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2MDgxNzc1MTIsImV4cCI6MTYwODIxMzUxMn0.0ja9Oqz0Dge1pLxcA5gsRzDEuCd5E92U2qwWKPJF4w8
            }
        });
    });



});