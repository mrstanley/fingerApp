declare function require(path: string): any;
import Vue from "vue";
import * as finger from "../../../common";
import "./userInfoModify.scss";

const { plus, mui, plusReady, wilddog } = finger;
const template: string = require("./userInfoModify.html");
let userId: any = "";
// 认证登录
finger.wilddogAuth((user) => {
    console.log(JSON.stringify(user));
    userId = user.uid;
}, null);

const title = {
    nickName: "昵称",
    email: "邮箱",
    signature: "签名"
};

interface ILoginModel {
    type: string;
    value: string;
    change: boolean;
}

const ws = plus.webview.currentWebview();
const userInfo: any = {
    el: "#userInfoModify",
    template,
    data(): ILoginModel {
        return {
            type: ws.type || "nickName",
            value: ws.value,
            change: false
        };
    },
    mounted() {
        finger.setImmersed(null);
    },
    watch: {
        value(this: ILoginModel) {
            this.change = true;
        }
    },
    computed: {
        title(this: ILoginModel) {
            return title[this.type] || "昵称";
        }
    },
    methods: {
        back() {
            plus.nativeUI.closeWaiting();
            ws.close();
        },
        save(this: ILoginModel) {
            plus.nativeUI.showWaiting("保存中...");
            if (this.change) {
                const obj = {};
                obj[this.type] = this.value;
                const users = wilddog.sync().ref("users");
                users.child(userId).update(obj).then(() => {
                    console.info("update data success.");
                    plus.nativeUI.closeWaiting();
                    ws.close();
                }).catch((err) => {
                    console.info("update data failed", err.code, err);
                    mui.toast("更新失败，请稍后重试");
                    plus.nativeUI.closeWaiting();
                });
            } else {
                plus.nativeUI.closeWaiting();
                ws.close();
            }
        }
    }
};

new Vue(userInfo);

mui.back = () => {
    plus.nativeUI.closeWaiting();
    ws.close();
};
