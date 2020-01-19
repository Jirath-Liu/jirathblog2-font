   function getInnerText(html) {
    if(html==null){
        html="";
    }
    var dd=html.replace(/<\/?.+?>/g,"");
    var dds=dd.replace(/ /g,"");//dds为得到后的内容
    if (dds.length > 100) {
        dds = dds.substring(0, 100) + "..."
    }
    return dds;
   }

   window.onload = function () {
        //当前页数
        var onPage = 1;
        //总页数
        var allPage = 1;
        var linkHead = "http://jirath.cn:8081/jirath_blog_2";
        // 定义一个名为 psg 的新组件

        //"./blog.html?id="+id,
        var psgMsg = {
            psgs: {}
        };
        var pageMsg = {
            onPage: 1,
            allPage: 1,
            fri: 1,
            sec: 2,
            thi: 3,
        };

        function loadSpecific(pageId) {
            //校验id位整数
            if (pageId != null && pageId % 1 == 0) {
               
                $.ajax({
                    //请求方式
                    type: "POST",
                    //请求的媒体类型
                    contentType: "json",
                    //数据，json字符串
                    url: linkHead + "/blog/page/" + pageId,
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (msg) {
                       
                        //成功则存储数据，失败贼跳转error页面
                        if (msg.code == 100) {
                            for(var i=0;i<msg.data.blogList.length;i++){
                                msg.data.blogList[i].blogContent=getInnerText(msg.data.blogList[i].blogContent);
                            }
                            vue_psg.psgs = msg.data.blogList;
                            vue_page.allPage = msg.data.pageNum;
                            vue_page.onPage=msg.data.onPage
                           
                        } else {
                            window.location = "./error.html";
                        }
                    }
                });
            }
        }
        function loadDefault() {
            $.ajax({
                //请求方式
                type: "POST",
                //请求的媒体类型
                contentType: "json",
                //数据，json字符串
                url: linkHead + "/blog/defaultPage",
                xhrFields: {
                    withCredentials: true
                },
                success: function (msg) {
                   
                    //成功则存储数据，失败贼跳转error页面
                    if (msg.code == 100) {
                        for(var i=0;i<msg.data.blogList.length;i++){
                            msg.data.blogList[i].blogContent=getInnerText(msg.data.blogList[i].blogContent);
                        }
                        psgMsg.psgs = msg.data.blogList;
                        pageMsg.allPage = msg.data.pageNum;
                        
                    } else {
                        window.location = "./error.html";
                    }
                }
            });
        }
        loadDefault();
        //var converter = new showdown.Converter();
        
        var vue_psg = new Vue({
            el: '#psg',
            data: psgMsg,
        });

        var vue_page = new Vue({
            el: '#page',
            data: pageMsg,
            computed: {
                displayLast: function () {
                    if (this.fri == 1) {
                        return {
                            display: "none"
                        };
                    } else {
                        return {
                            display: ""
                        }
                    }
                },
                displayNext: function () {
                    if (this.onPage == this.allPage) {
                        return {
                            display: "none"
                        };
                    } else {
                        return {
                            display: ""
                        };
                    }
                },
                displayBefore: function () {
                    if (this.allPage > 3 && this.fri > 1) {
                        return {
                            display: ""
                        };
                    } else {
                        return {
                            display: "none"
                        };
                    }
                },
                displayMore: function () {
                    if (this.allPage > 3 && this.thi < this.allPage) {
                        return {
                            display: ""
                        };
                    } else {
                        return {
                            display: "none"
                        };
                    }
                },
                display2: function () {
                    if (this.allPage > 1) {
                        return {
                            display: ""
                        };
                    } else {
                        return {
                            display: "none"
                        };
                    }
                },
                display3: function () {
                    if (this.allPage > 2) {
                        return {
                            display: ""
                        };
                    } else {
                        return {
                            display: "none"
                        };
                    }
                }
            },
            methods: {
                previous: function (event) {
                    if (!(this.displayLast.display == "none") && event) {
                        var p=this.fri-1;
                        loadSpecific(p);
                        if(this.onPage>3){
                            this.fri=p-1;
                            this.sec=p;
                            this.thi=p+1;
                        }
                    }
                },
                before: function (event) {
                    if (!(this.displayBefore.display == "none") && event) {
                        this.fri -= 1;
                        this.sec -= 1;
                        this.thi -= 1;
                    }
                },
                left: function (event) {
                    if (event&&this.onPage!=this.fri) {
                        loadSpecific(this.fri);
                        if(this.fri>1){
                            var p=this.fri;
                            this.fri=p-1;
                            this.sec=p;
                            this.thi=p+1;
                        }
                    }
                },
                mid: function (event) {
                   
                    if (!(this.display2.display == "none") && event && this.onPage!=this.sec) {
                        loadSpecific(this.sec);
                    }
                },
                right: function (event) {
                    if (!(this.display3.display == "none" )&& event) {
                        loadSpecific(this.thi);
                        if(this.thi<this.allPage){
                            var p=this.thi;
                            this.fri=p-1;
                            this.sec=p;
                            this.thi=p+1;
                        }
                    }
                },
                morePage: function (event) {
                    if (!(this.displayMore.display == "none") && event) {
                        this.fri += 1;
                        this.sec += 1;
                        this.thi += 1;
                    }
                },
                next: function (event) {
                    if (!(this.displayNext.display == "none") && event) {
                        var p=this.onPage+1;
                        loadSpecific(p);
                        if(this.thi<this.allPage){
                            this.fri=p-1;
                            this.sec=p;
                            this.thi=p+1;
                        }
                    }
                }
            }
        });
        
        var psgComponent = Vue.component('psg', {
            props: ['psgmsg'],
            /*v-bind:author="item.blogAuthor",
                            v-bind:title="item.blogTitle",
                            v-bind:content="item.blogContent",
                            v-bind:createTime="item.blogCreateTime",
                            v-bind:lastFixTime="item.blogLastFixTime" */
            template: `
        </a><div class="row shadow-lg p-3 mb-5 bg-white rounded hover-change psg-height" >
            <div class="media">
                <div class="media-body">
                    <h5 class="mt-0">{{psgmsg.blogTitle}}</h5>
                    <p class="author">{{psgmsg.blogAuthor}}</p>
                    <hr>
                    <div v-html="psgmsg.blogContent" class="psg-html"></div>
                    <p><span>创作时间</span>{{psgmsg.blogCreateTime}}</p>
                    <a v-bind:href="'#id='+psgmsg.blogId" class="btn btn-primary">Have a look</a>
                </div>
            </div>
        </div>
      `
        });
       //监听触发操作
       function hashChange(){
           var query = window.location.href;
           var vars = query.split("#");
           for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == "id"){
                   window.location="./blog.html?id="+pair[1];
               }
           }
       }

//url变化监听器
       if( ('onhashchange' in window) && ((typeof document.documentMode==='undefined') || document.documentMode==8)) {
           // 浏览器支持onhashchange事件
           window.onhashchange = hashChange;  // TODO，对应新的hash执行的操作函数
       } else {
           // 不支持则用定时器检测的办法
           setInterval(function() {
               // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意
               var ischanged = isHashChanged();
               if(ischanged) {
                   hashChange();  // TODO，对应新的hash执行的操作函数
               }
           }, 150);
       }
    };