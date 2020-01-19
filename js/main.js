function getInnerText(html) {
    if(html==null){
        html="";
    }
    var dd=html.replace(/<\/?.+?>/g,"");
    var dds=dd.replace(/ /g,"");//dds为得到后的内容
    if (dds.length > 30) {
        dds = dds.substring(0, 30) + "..."
    }
    return dds;
}
window.onload = function () {
    var linkHead = "http://jirath.cn:8081/jirath_blog_2";
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