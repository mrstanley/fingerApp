declare function require(path: string): any;
import * as Vue from "vue";
import * as finger from "../../common";
import "./login.scss";

const plus: any = (window as any).plus;
const mui: any = (window as any).mui;
const wilddog: any = (window as any).wilddog;

const template: string = require("./login.html");

// 清空登录信息

finger.wilddogAuth(null, null);
wilddog.auth().signOut().then(() => {
    console.info("user sign out.");
});

interface ILoginModel {
    type: string;
    phone: string;
    password: string;
    verify_code: string;
}

const LoginForm: any = {
    el: "#login",
    template,
    data(): ILoginModel {
        return {
            type: "login",
            phone: "",
            password: "",
            verify_code: ""
        };
    },
    methods: {
        login(this: ILoginModel) {
            if (!(/0?(13|14|15|18|17)[0-9]{9}/.test(this.phone))) {
                return finger.showError("请输入正确的电话号码");
            }
            if (this.password.length < 6) {
                return finger.showError("密码少于6位");
            }
            if (this.type === "register" && this.verify_code.length < 5) {
                return finger.showError("短信验证码为 5 位数字");
            }
            plus.nativeUI.showWaiting(this.type === "register" ? "注册中..." : "登录中...");
            let url = "users/login";
            let data = {
                phone: this.phone,
                password: this.password
            };
            if (this.type === "register") {
                data = (Object as any).assign(data, { verifyCode: this.verify_code });
                url = "users/reg";
            }
            finger.post(url, data, (data) => {
                wilddog.auth().signInWithCustomToken(data.token).then((user) => {
                    finger.openPage("index", {});
                    mui.toast(data.msg);
                    plus.nativeUI.closeWaiting();
                }).catch((error) => {
                    console.log(JSON.stringify(error));
                    plus.nativeUI.closeWaiting();
                });
            }, (data) => {
                mui.toast(!data ? "服务器错误，请重试" : data.msg);
                plus.nativeUI.closeWaiting();
            });
        },
        showPasswotd(ev) {
            const password: any = document.getElementById("password");
            const type = password.getAttribute("type");
            password.setAttribute("type", type === "text" ? "password" : "text");
            ev.target.style.opacity = type === "text" ? "0.5" : "1";
        },
        navigator(this: ILoginModel, ev) {
            if (ev.target.tagName.toLowerCase() === "li") {
                this.type = ev.target.getAttribute("name");
            }
        }
    }
};

new Vue(LoginForm);

mui.init();

mui.plusReady(() => {
    const ws = plus.webview.currentWebview();
    mui.later(() => {
        plus.webview.all().forEach((view) => {
            view.id !== ws.id ? view.close("none") : "";
        });
    }, 300);
    finger.back();
});
