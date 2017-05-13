declare function require(path: string): any;
import Vue from "vue";
import * as finger from "../../common";
import "./userInfo.scss";


const { plus, mui, plusReady, wilddog } = finger;

const template: string = require("./userInfo.html");

// 认证登录
finger.wilddogAuth((user) => {
    console.log(JSON.stringify(user));
    const users = wilddog.sync().ref("users");
    users.child(user.uid).on("value", (info, error) => {
        if (error == null) {
            const obj = info.val();
            Object.keys(userInfo.$data).forEach((i) => {
                obj[i] ? userInfo[i] = obj[i] : "";
            });
        } else {
            console.log(error);
            mui.toast("获取数据失败");
        }
    });
}, null);


plusReady((view) => {
    // do something
});

const userInfo = new Vue({
    el: "#userInfo",
    template,
    data() {
        return {
            nickName: "",
            email: "",
            phone: "",
            signature: "",
            avatar: ""
        };
    },
    mounted() {
        finger.setImmersed(null);
    },
    methods: {
        changeValue(e) {
            const file = e.target.files[0];
            const storeAs = "avatar_img_" + Date.now() + "." + file.type.split("/")[1];
            console.log(file.name + " => " + storeAs);
        },
        userInfoModify(type, value) {
            finger.openPage("userInfoModify", {
                type,
                value
            });
        },
        current(a) {
            console.log(a);
        },
        goLogin() {
            finger.openPage("login", {});
        }
    }
});
