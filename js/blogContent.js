window.onload=function () {
    var linkHead="http://localhost";
    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return false;
    }
    var psgId;
    var psgMsg={
        author: "unknow",
        title: "unknow",
        content: "unknow"
    };
    psgId=getQueryVariable("id");
    function loadPsg() {
        $.ajax({
            //请求方式
            type: "POST",
            //请求的媒体类型
            contentType: "json",
            //数据，json字符串
            url: linkHead + "/blog/"+psgId,
            xhrFields: {
                withCredentials: true
            },
            success: function (msg) {
                //成功则存储数据，失败贼跳转error页面
                if (msg.code == 100) {
                    psgMsg.author=msg.data.blogAuthor;
                    psgMsg.title=msg.data.blogTitle;
                    //psgMsg.content=converter.makeHtml(msg.data.blogContent);
                    psgMsg.content=msg.data.blogContent;
                    psgMsg.commentQuantity=msg.data.blogCommentQuantity;
                    psgMsg.createTime=msg.data.blogCreateTime;
                    psgMsg.lastFixTime=msg.data.blogLastFixTime;
                }else {
                    window.location="./error.html";
                }
            }
        });
    }
    loadPsg();
    //var converter = new showdown.Converter();
    
    var vue_psg = new Vue({
        el: '#root',
        data: psgMsg,
    });
};