$(function() {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    };


    function padZero(n) {
        return n > 9 ? n : '0' + n;
    }
    template.defaults.imports.dateFormat = function(date) {
        const dt = new Date(date);
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());

        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }


    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章列表失败');
                }
                layui.layer.msg('获取文章成功');
                var htmlStr = template('art_list', res);
                $("tbody").html(htmlStr);
                renderPage(res.total);
            }
        })
    }
    initTable();

    // 初始化文章分类
    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章分类失败');
                }
                var htmlStr = template('art_cate', res);
                $("[name=cate_id]").html(htmlStr);
                layui.form.render();
            }
        })
    }
    initCate();

    $("#form-search").on("submit", function(evt) {
        evt.preventDefault();
        q.cate_id = $("[name=cate_id]").val();
        q.state = $("[name=state]").val();
        initTable();
    });

    function renderPage(total) {
        layui.laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            jump: function(obj, first) {
                q.pagenum = obj.curr;

                q.pagesize = obj.limit;
                if (!first) {
                    initTable();
                }
                // console.log(first);
            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10]
        });
    }

    $("tbody").on("click", ".btn-delete", function() {
        var id = $(this).attr("data-id");
        var len = $(".btn-delete").length;
        layer.confirm('是否删除？', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: "GET",
                url: "/my/article/delete/" + id,
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layui.layer.msg('删除失败');
                    }
                    layui.layer.msg('删除成功');

                    if (len == 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1;
                    }
                    initTable();
                }
            });
            layer.close(index);
        });


    });


});