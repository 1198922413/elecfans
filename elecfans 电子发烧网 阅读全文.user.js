// ==UserScript==
// @name         elecfans 电子发烧网 阅读全文
// @namespace    http://tampermonkey.net/
// @version      0.18
// @description  自动点击分页的全文按钮，并展开全文。去除部分广告。
// @author       萱萱的饭
// @match        http://www.elecfans.com/*
// @match        http://m.elecfans.com/*
// @grant        none
// @note         20-07-11 0.16 新增 m.elecfans/* 的阅读全文、去除部分广告
// @note         20-07-12 0.17 新增 http://www.elecfans.com/yuanqijian/* 的阅读全文,去除d/*的部分广告
// @note         20-07-12 0.18 优化代码结构，优化 m.elecfans/* , 新增对/analog/* /rengongzhineng/* /news/* 展开全文，去除广告的支持
// ==/UserScript==

(function() {
    /*
    个人制作，用爱发电。如有不满，请多包含。 去除广告请配合 adblock plus 扩展插件使用（广告实在是太多了懒得写了）
    */

    'use strict';
    /* 该网站使用的是ajax判断用户是否登陆
    如果未登录则缩起文章并添加上阅读全文按钮
    */
    $(document).ready(function(){

        //      去掉广告
        $('.sub-adbt').remove();
        $('.footer_banner_content').remove();
        $('.footer_bannerAd').remove();

        //一级域名
        var TLD= window.location.host;

        //二级域名
        var SLD=window.location.pathname;
        var href_str=SLD.split('/');

        //配置检测项 检测css属性变动和子节点变动
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;//浏览器兼容
        var config = { attributes: true, childList: true}//配置对象

        if("www.elecfans.com"==TLD){
            //      这里判断 ajax后 未登录则缩起文章 改变css样式 若改变则还原
            //      电子说  http://www.elecfans.com/d/* 展开全文 去除广告
            //              http://www.elecfans.com/analog/* 展开全文 去除广告
            //              http://www.elecfans.com/rengongzhineng/* 展开全文 去除广告
            //              http://www.elecfans.com/news/* 展开全文 去除广告
            if('d'==href_str[1] || 'analog'==href_str[1] || 'rengongzhineng'==href_str[1] || 'news'==href_str[1] ){
                //去除多余内容
                $("#fix-tdkad").remove();
                $("#AD-background").remove();
                $('.aside').remove();
                $('html body section.section div.clearfix')[0].remove();
                $('.main-wrap').css('margin-right','0px');
                $('.footer_bannerAd').remove();
                $('html body section.section article.amain div.main-wrap iframe').remove();
                $('#new-middle-berry').remove();
                $("div.simditor-body").each(function(){
                    var _this = $(this);
                    var observer = new MutationObserver(function(mutations) {//构造函数回调
                        mutations.forEach(function(record) {
                            if(record.type == "attributes"){//监听属性
                                //console.log("html的属性发生了变化");
                                //展开全文
                                $('div.simditor-body').css('height','100%');
                                $('.seeHide').remove();

                            }
                            if(record.type == 'childList'){//监听结构发生变化
                                //console.log("html的结构发生了变化")
                            }
                        });
                    });
                    observer.observe(_this[0], config);
                });
            }

            //      电子常识 http://www.elecfans.com/dianzichangshi/*
            //      点击阅读全文并展开  去广告
            if(href_str[1]=='dianzichangshi'){
                $('a.page-next').each(function(i){if($(this).text()=='全文'){
                    $(this)[0].click();
                }});
                //展开全文
                $('.article-content').css('height','100%');
                //去除广告
                $('html body.article-page div#header div.advertising.clearfix').remove();
                $('#AdArticleDetailTitle').remove();
                $('.seeHide').remove();
                $('.company-ad').remove();
                $('.col-sub').remove();
                $('.main-wrap').css('margin-right','0px');
                $('.main-wrap').css('padding-right','0px');
                $('.main-wrap').css('border-right','0px');
            }

            //      电子常识 http://www.elecfans.com/yuanqijian/*
            //      展开阅读全文
            if(href_str[1]=='yuanqijian'){
                //去掉多余
                $('.elecTop-mainBox').remove();
                $("#sidebar").remove();
                $("#jf-arcMain-1").remove();
                //调整布局
                $("#mainContent").css('width','100%');
                $("#arcInfo-bd").css('width','100%');
                $("#arcInfo-bd").css('padding','0px');
                $("#arcInfo-hd").css('width','100%');
                $("#arcTag").css('width','580px');
                $("div.max-wImg").each(function(){
                    var _this = $(this);
                    var observer = new MutationObserver(function(mutations) {//构造函数回调
                        mutations.forEach(function(record) {
                            if(record.type == "attributes"){//监听属性
                                //console.log("html的属性发生了变化");
                                //展开
                                $('div.max-wImg').css('height','100%');
                                //去掉多余
                                $('.seeHide').remove();

                            }
                            if(record.type == 'childList'){//监听结构发生变化
                                //console.log("html的结构发生了变化")
                            }
                        });
                    });
                    observer.observe(_this[0], config);
                });
            }
        }


        // m.elecfans.com 展开全文

        if("m.elecfans.com"==TLD){
            //去掉多余
            $(".open_app").remove();
            $(".bottom_open_app").remove();
            $('.see_more').remove();
            $('.top_app_ad').remove();
            //展开全文
            $(".author_des").each(function(){
                var _this = $(this);
                var observer = new MutationObserver(function(mutations) {//构造函数回调
                    mutations.forEach(function(record) {
                        if(record.type == "attributes"){//监听属性
                            //console.log("html的属性发生了变化");
                            $("div.limit_height").removeClass("limit_height");
                        }
                        if(record.type == 'childList'){//监听结构发生变化
                            //console.log("html的结构发生了变化")
                        }
                    });
                });
                observer.observe(_this[0], config);
            });
        }
    });
})();