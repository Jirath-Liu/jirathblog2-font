window.onload = function () {
    var linkHead = "http://localhost";
    var new_msg = {
        link: "./404.html",
        title: "unknow title",
        text: "unknow text"
    };
    var recommend_msg = {
        link: linkHead + "/404.html",
        title: "unknow title",
        text: "unknow text"
    };
    var vue_new = new Vue({
        el: '#new',
        data: new_msg,
        methods: {
            jump: function(clicked){
                if(clicked){
                    window.location=new_msg.link;
                }
            }
        }
    })
    var vue_recommend = new Vue({
        el: '#recommend',
        data: recommend_msg,
        methods: {
            jump: function(clicked){
                if(clicked){
                    window.location=recommend_msg.link;
                }
            }
        }
    })

    function loadNew() {
        $.ajax({
            //请求方式
            type: "POST",
            //请求的媒体类型
            contentType: "json",
            //数据，json字符串
            url: linkHead + "/blog/latest",
            success: function (msg) {
                if (msg.code == 100) {
                    new_msg.link = "./blog.html?id=" + msg.data.blogId;
                    var content = msg.data.blogContent;
                    if (content.length > 30) {
                        content = content.substring(0, 30) + "..."
                    }
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

                    var content = msg.data.blogContent;
                    if (content.length > 30) {
                        content = content.substring(0, 30) + "..."
                    }
                    recommend_msg.link="./blog.html?id=" + msg.data.blogId;
                    recommend_msg.title = msg.data.blogTitle;
                    recommend_msg.text = content;
                }
            }
        });

    }
    loadNew();
    loadRecommend();
};