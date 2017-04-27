declare function require(path: string): any;
import './slidBar.scss'
import * as Vue from 'vue'
import { setImmersed, openPage } from '../../common'


let plus: any = (<any>window).plus
let mui: any = (<any>window).mui

let template: string = require('./slidBar.html');

//获得侧滑主窗口webview对象
let main = null,
    menu: object | null = null;

menu = new Vue({
    el: '#slidBar',
    data() {
        return {
            nickName: '您的称呼',
            signature: '您的个性签名或个人简介',
            avatar: 'assets/images/avatar.jpg'
        }
    },
    template,
    mounted() {
        setImmersed(null);
    },
    methods: {
        openUserInfo() {

        },
        openPage
    }
})

// H5 plus事件处理
function plusReady() {
    main = plus.webview.currentWebview().opener();
    mui.init({
        keyEventBind: {
            menubutton: false
        }
    });
}

if (plus) {
    plusReady();
} else {
    document.addEventListener('plusready', plusReady, false);
}

function closeMenu() {
    mui.fire(main, "menu:swipeleft");
}

//优化显示出来的侧滑菜单，只需监听该菜单的左滑事件，然后将其关闭即可；在菜单上右滑，不做任何操作；
window.addEventListener("swipeleft", closeMenu);
let closeBtn: any = document.getElementById("close-btn");
closeBtn && closeBtn.addEventListener('tap', closeMenu);

//长按菜单键和返回键关闭菜单
mui.menu = closeMenu;
mui.back = closeMenu;