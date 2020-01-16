function getInnerText(html) {

    var con = html.replace("/\s*/g", ""); //去掉空格
    var res = con.replace("/<[^>]+>/g", ""); //去掉所有的html标记
    var res1 = res.replace("/↵/g", ""); //去掉所有的↵符号
    var res2 = res1.replace("/[\r\n]/g", "") //去掉回车换行
    if (res2.length > 30) {
        res2 = res2.substring(0, 30) + "..."
    }

    return res2;
}
window.onload = function () {
    var linkHead = "http://localhost";
    var new_msg = {
        link: "./404.html",
        title: "unknow title",
        text: "unknow text"
    };
    var recommend_msg = {
        link: "./404.html",
        title: "unknow title",
        text: "unknow text"
    };
    var vue_new = new Vue({
        el: '#new',
        data: new_msg,

    });
    var vue_recommend = new Vue({
        el: '#recommend',
        data: recommend_msg,
    });

    function loadNew() {
        $.ajax({
            //请求方式
            type: "POST",
            //请求的媒体类型
            contentType: "json",
            //解决session不同
            xhrFields: {
                withCredentials: true
            },
            url: linkHead + "/blog/latest",
            success: function (msg) {
                if (msg.code == 100) {
                    var content = getInnerText(msg.data.blogContent);
                    new_msg.link = "./blog.html?id=" + msg.data.blogId;
                    new_msg.title = msg.data.blogTitle;
                    new_msg.text = content;
                }
            }
        });
    }

    function loadRecommend() {
        $.ajax({
            //请求方式
            type: "POST",
            //请求的媒体类型
            contentType: "json",
            //数据，json字符串
            url: linkHead + "/blog/recommend",
            success: function (msg) {
                if (msg.code == 100) {
                    msg.data.blogContent = getInnerText(msg.data.blogContent);
                    var content = msg.data.blogContent;
                    recommend_msg.link = "./blog.html?id=" + msg.data.blogId;
                    recommend_msg.title = msg.data.blogTitle;
                    recommend_msg.text = content;
                }
            }
        });

    }
    loadNew();
    loadRecommend();
};