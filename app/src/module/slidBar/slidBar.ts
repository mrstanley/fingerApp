declare function require(path: string): any;
import Vue from "vue";
import * as finger from "../../common";
import "./slidBar.scss";


const { plus, mui, plusReady, wilddog } = finger;


const template: string = require("./slidBar.html");

// 获得侧滑主窗口webview对象
let main = null;

// 认证登录
finger.wilddogAuth((user) => {
    console.log(JSON.stringify(user));
    const users = wilddog.sync().ref("users");
    users.child(user.uid).on("value", (info, error) => {
        if (error == null) {
            const obj = info.val();
            Object.keys(menu.$data).forEach((i) => {
                obj[i] ? menu[i] = obj[i] : "";
            });
        } else {
            console.log(error);
            mui.toast("获取数据失败");
        }
    });
}, null);

const menu = new Vue({
    el: "#slidBar",
    data() {
        return {
            nickName: "",
            signature: "",
            avatar: ""
        };
    },
    template,
    mounted() {
        finger.setImmersed(null);
    },
    methods: {
        openUserInfo() {
            finger.openPage("userInfo", {});
        }
    }
});

// H5 plus事件处理

plusReady((view) => {
    main = view.opener();
    mui.init({
        keyEventBind: {
            menubutton: false
        }
    });
});

function closeMenu() {
    mui.fire(main, "menu:swipeleft");
}

// 优化显示出来的侧滑菜单，只需监听该菜单的左滑事件，然后将其关闭即可；在菜单上右滑，不做任何操作；
window.addEventListener("swipeleft", closeMenu);
const closeBtn: any = document.getElementById("close-btn");
closeBtn && closeBtn.addEventListener("tap", closeMenu);

// 长按菜单键和返回键关闭菜单
mui.menu = closeMenu;
mui.back = closeMenu;
