import * as Vue from 'vue';

let plus: any = (<any>window).plus;
let mui: any = (<any>window).mui;

// 注册一个全局自定义指令 v-imgcropper
Vue.directive('imgCropper', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el, binding) {
        let cb = binding.value;
        cb && cb('drective');
        el.addEventListener('tap', () => {
            plus.gallery.pick(function (path) {
                console.log(path);
            }, function (e) {
                console.log("取消选择图片");
            }, { filter: "image" });



            // var dtask = plus.downloader.createDownload("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493613217588&di=28b06999fdb859571da88fddd102d8d1&imgtype=0&src=http%3A%2F%2Fimg02.imgcdc.com%2Fgrab%2Fimg%2F20151110%2F30071447163277.jpg", {}, function (d, status) {
            //     // 下载完成
            //     if (status == 200) {
            //         alert("Download success: " + d.filename);
            //     } else {
            //         alert("Download failed: " + status);
            //     }
            // });
            // dtask.start();


        }, false);
    }
})