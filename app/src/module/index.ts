declare function require(path: string): any;
import './index.scss'
import * as Vue from 'vue'
import { setImmersed } from '../common'

let plus: any = (<any>window).plus
let mui: any = (<any>window).mui
let wilddog: any = (<any>window).wilddog

let startTime = Date.now();
let template: string = require('./index.html');

let main, menu, maskView, mask = mui.createMask(_closeMenu);
let showMenu = false,
    mode = 'menu-move';


new Vue({
    el: '#index',
    data: {
        title: '测试页面'
    },
    template: template,
    mounted() {
        let endTime = Date.now();
        console.log('render time:' + (endTime - startTime));
        setImmersed(null);
    }
});

// H5 plus事件处理
function plusReady() {
    // 设置系统状态栏背景为红色
    plus.navigator.setStatusBarBackground('#fff');
    plus.navigator.setStatusBarStyle('dark');
    plus.navigator.isFullscreen() ? plus.navigator.setFullscreen(false) : '';

    let config = {
        authDomain: "finger.wilddog.com"
    };
    wilddog.initializeApp(config);

    // wilddog.auth().signInWithEmailAndPassword("lixiaolin_23@foxmail.com", "lishaolin_23").then(function(user) {
    //     // 获取用户
    //     // console.log(user);
    //     wilddog.auth().currentUser.updatePhone("13028153703").then(function() {
    //         // 更新成功
    //         console.log('success');
    //     }).catch(function(error) {
    //         // 发生错误
    //         console.log(error);
    //     });
    // }).catch(function(error) {
    //     // 错误处理
    //     console.log(error);
    // });

    // wilddog.auth().signInWithPhoneAndPassword("13028153703", "lishaolin_23").then((res) => console.log('success')).catch((error) => console.log(error));


    // wilddog.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         // console.log("user");
    //         // let endTime = Date.now();
    //         // console.log('getUser time:' + (endTime - startTime));
    //         wilddog.auth().currentUser.updateProfile({
    //             displayName: "lixiaolin",
    //             photoURL: " "
    //         }).then(function() {
    //             // 更新成功
    //         }).catch(function(error) {
    //             // 发生错误
    //         });
    //     } else {
    //         console.log("no user");
    //     }
    // });

    main = plus.webview.currentWebview();

    //预加载侧边菜单
    menu = mui.preload({
        id: 'slidBar',
        url: 'slidBar.html',
        styles: {
            left: '-70%',
            width: '70%',
            popGesture: "none",
            render: "always",
            zindex: "9999"
        },
        show: {
            aniShow: 'none'
        },
        waiting: {
            autoShow: false
        }
    });

    let titleView = main.getNavigationbar();
    if (!titleView) {
        titleView = plus.webview.getLaunchWebview().getNavigationbar();
    }

    // 开启回弹
    main.setStyle({
        bounce: "vertical",
        bounceBackground: "#e5e5e5"
    });

    // 绘制左上角menu图标
    let bitmap_menu = new plus.nativeObj.Bitmap("menu", "_www/dist/app_dev/assets/images/user-list.png");
    titleView.drawBitmap(bitmap_menu, {}, {
        top: "10px",
        left: "10px",
        width: "24px",
        height: "24px"
    });
    // 绘制右上角图标
    let search_left = window.innerWidth - 34;
    let bitmap_search = new plus.nativeObj.Bitmap("search", "_www/dist/app_dev/assets/images/search-plus.png");
    titleView.drawBitmap(bitmap_search, {}, {
        top: "10px",
        left: search_left + "px",
        width: "24px",
        height: "24px"
    });
    // 遮罩
    maskView = new plus.nativeObj.View('mask', { top: '0px', right: '0px', height: '44px', width: '100%', backgroundColor: '#000', opacity: '0.1', dock: "top", position: "dock" }, []);
    main.append(maskView);
    maskView.hide();
    titleView.interceptTouchEvent(true);

    titleView.addEventListener("click", function(e) {
        var x = e.clientX;
        if (x < 44) { //触发menu菜单
            openMenu();
        } else if (x > search_left) { //触发关于页面

        }
    }, false);

    maskView.addEventListener("click", function(e) {
        maskView.hide();
        mask.close();
    }, false);

    console.log("是否开启硬件加速：" + main.isHardwareAccelerated());

}
if (plus) {
    plusReady();
} else {
    document.addEventListener('plusready', plusReady, false);
}



mui.init({
    swipeBack: false
});

function back() {
    if (showMenu) {
        //菜单处于显示状态，返回键应该先关闭菜单,阻止主窗口执行mui.back逻辑；
        closeMenu();
        return false;
    } else {
        //菜单处于隐藏状态，执行返回时，要先close菜单页面，然后继续执行mui.back逻辑关闭主窗口；
        menu.close('none');
        return true;
    }
}

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
                duration: 200
            }
        }));
        //显示遮罩
        mask.show();
        maskView.show();
        showMenu = true;
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
                duration: 200
            }
        });
        //等窗体动画结束后，隐藏菜单webview，节省资源；
        setTimeout(() => menu.hide(), 250);
        //改变标志位
        showMenu = false;
    }
    maskView.hide();
}

//点击左上角图标，打开侧滑菜单；
let menuIcon: any = document.querySelector('.icon-user-list');
menuIcon && menuIcon.addEventListener('tap', openMenu);
//在android4.4中的swipe事件，需要preventDefault一下，否则触发不正常
//故，在dragleft，dragright中preventDefault
window.addEventListener('dragright', (e: any) => e.detail.gesture.preventDefault());
window.addEventListener('dragleft', (e: any) => e.detail.gesture.preventDefault());
//主界面向右滑动，若菜单未显示，则显示菜单；否则不做任何操作；
window.addEventListener("swiperight", openMenu);
//主界面向左滑动，若菜单已显示，则关闭菜单；否则，不做任何操作；
window.addEventListener("swipeleft", closeMenu);
//menu页面向左滑动，关闭菜单；
window.addEventListener("menu:swipeleft", closeMenu);

//重写mui.menu方法，Android版本menu按键按下可自动打开、关闭侧滑菜单；
mui.menu = () => showMenu ? closeMenu() : openMenu() 
