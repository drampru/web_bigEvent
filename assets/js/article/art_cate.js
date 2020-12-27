$(function() {
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取文章列表失败");
                }
                var htmlStr = template('tpl-table', res);
                $("tbody").html(htmlStr);
            }
        })
    }


    var indexAdd = null;
    $("#btnAddCate").on("click", function() {
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: "添加文章分类",
            content: $("#dialog-add").html()
        })
    });

    $("body").on("submit", "#form-add", function(evt) {
        evt.preventDefault();
        // console.log(123);
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(response) {
                if (response.status !== 0) {
                    return layui.layer.msg('添加分类失败');
                }
                initArtCateList();
                layui.layer.msg('添加分类成功');
                layui.layer.close(indexAdd);
            }
        });
    });

    var indexEdit = null;
    $("tbody").on("click", ".btn-edit", function() {
        indexEdit = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章类别',
            content: $("#tpl-edit").html()
        });
        var id = $(this).attr("data-id");
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取失败');
                }
                layui.layer.msg('获取成功');
                layui.form.val('form-edit', res.data);
            }
        });
    });

    $("body").on("submit", "#form-edit", function(evt) {
        evt.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改失败');
                }
                initArtCateList();
                layui.layer.msg('修改成功');
                layui.layer.close(indexEdit);
            }
        });
    });

    $("tbody").on("click", ".btn-del", function() {
        var id = $(this).attr("data-id");

        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除失败');
                    }
                    layui.layer.msg('删除成功');
                    initArtCateList();
                }
            })
            layui.layer.close(index);
        });

    })
});