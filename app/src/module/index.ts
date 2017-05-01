declare function require(path: string): any;
import './index.scss'
import * as Vue from 'vue'
import { setImmersed, wilddogAuth, back } from '../common'

let plus: any = (<any>window).plus;
let mui: any = (<any>window).mui;
let wilddog: any = (<any>window).wilddog;

let startTime = Date.now();
let template: string = require('./index.html');

let main, menu, maskView, mask = mui.createMask(_closeMenu);
let showMenu = false, mode = 'menu-move';

new Vue({
    el: '#index',
    data() {
        return {
            title: '指尖推广',
            banerImg: 'assets/images/yuantiao.jpg'
        }
    },
    template,
    mounted() {
        let endTime = Date.now();
        console.log('render time:' + (endTime - startTime));
        setImmersed(null);
        var gallery = mui('#slider');
        gallery.slider({
            interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
        });
    }
});

//认证登录
wilddogAuth(function (user) {
    console.log(JSON.stringify(user));
}, null);

// H5 plus事件处理
function plusReady() {
    // 设置系统状态栏背景为红色
    plus.navigator.setStatusBarBackground('#fff');
    plus.navigator.setStatusBarStyle('dark');
    plus.navigator.isFullscreen() ? plus.navigator.setFullscreen(false) : '';

    main = plus.webview.currentWebview();
    //预加载侧边菜单
    menu = mui.preload({
        id: 'slidBar',
        url: 'slidBar.html',
        styles: {
            left: '-70%',
            width: '70%',
            popGesture: "none",
            render: "always"
        },
        show: {
            aniShow: 'none'
        },
        waiting: {
            autoShow: false
        }
    });

    mui.later(() => {
        let login = plus.webview.getWebviewById('login');
        login ? login.close('none') : '';
    }, 500);

    back();

}

if (plus) {
    plusReady();
} else {
    document.addEventListener('plusready', plusReady, false);
}

mui.init({
    swipeBack: false
});

/**
 * 显示菜单菜单
 */
function openMenu() {
    if (!showMenu) {
        //侧滑菜单处于隐藏状态，则立即显示出来；
        //显示完毕后，根据不同动画效果移动窗体；
        menu.show('none', 0, () => menu.setStyle({
            left: '0%',
            transition: {
                duration: 250
            }
        }));
        //显示遮罩
        mask.show();
        showMenu = true;
    }
    if (!plus.webview.getWebviewById('userInfo')) {
        mui.preload({
            id: 'userInfo',
            url: 'userInfo.html'
        });
    }
}
/**
 * 关闭侧滑菜单
 */
function closeMenu() {
    _closeMenu();
    //关闭遮罩
    mask.close();
}

/**
 * 关闭侧滑菜单（业务部分）
 */
function _closeMenu() {
    if (showMenu) {
        //主窗体开始侧滑；
        menu.setStyle({
            left: '-70%',
            transition: {
                duration: 250
            }
        });
        //等窗体动画结束后，隐藏菜单webview，节省资源；
        setTimeout(() => menu.hide(), 300);
        //改变标志位
        showMenu = false;
    }
}

//点击左上角图标，打开侧滑菜单；
let menuIcon: any = document.querySelector('.icon-user-list');
menuIcon && menuIcon.addEventListener('tap', openMenu);
//在android4.4中的swipe事件，需要preventDefault一下，否则触发不正常
//故，在dragleft，dragright中preventDefault
window.addEventListener('dragright', (e: any) => e.detail && e.detail.gesture && e.detail.gesture.preventDefault());
window.addEventListener('dragleft', (e: any) => e.detail && e.detail.gesture && e.detail.gesture.preventDefault());
//主界面向右滑动，若菜单未显示，则显示菜单；否则不做任何操作；
window.addEventListener("swiperight", openMenu);
let timer;
//主界面向左滑动，若菜单已显示，则关闭菜单；否则，不做任何操作；
window.addEventListener("swipeleft", closeMenu);
window.addEventListener("scroll", () => {
    clearTimeout(timer);
    window.removeEventListener("swiperight", openMenu);
    timer = setTimeout(() => window.addEventListener("swiperight", openMenu), 500);
});



//menu页面向左滑动，关闭菜单；
window.addEventListener("menu:swipeleft", closeMenu);

//重写mui.menu方法，Android版本menu按键按下可自动打开、关闭侧滑菜单；
mui.menu = () => showMenu ? closeMenu() : openMenu();
