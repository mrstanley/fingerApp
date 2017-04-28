declare function require(path: string): any;
import './userInfoModify.scss';
import * as Vue from 'vue';
import * as Router from 'vue-router';
import * as finger from '../../../common';

let plus: any = (<any>window).plus;
let mui: any = (<any>window).mui;
let wilddog: any = (<any>window).wilddog;
let template: string = require('./userInfoModify.html');
let userId: any = ''
//认证登录
finger.wilddogAuth(function (user) {
    console.log(JSON.stringify(user));
    userId = user.uid;
}, null);

let title = {
    nickName: '昵称',
    email: '邮箱',
    signature: '签名'
}

interface LoginModel {
    type: string,
    value: string,
    change: boolean
}

let ws = plus.webview.currentWebview();
let userInfo: any = {
    el: '#userInfoModify',
    template,
    data(): LoginModel {
        return {
            type: ws.type || 'nickName',
            value: ws.value,
            change: false
        }
    },
    mounted() {
        finger.setImmersed(null);
    },
    watch: {
        value(this: LoginModel) {
            this.change = true;
        }
    },
    computed: {
        title(this: LoginModel) {
            return title[this.type] || '昵称'
        }
    },
    methods: {
        back() {
            plus.nativeUI.closeWaiting();
            ws.close();
        },
        save(this: LoginModel) {
            plus.nativeUI.showWaiting("保存中...");
            if (this.change) {
                let obj = {};
                obj[this.type] = this.value;
                let users = wilddog.sync().ref("users");
                users.child(userId).update(obj).then(function () {
                    console.info('update data success.');
                    plus.nativeUI.closeWaiting();
                    ws.close();
                }).catch(function (err) {
                    console.info('update data failed', err.code, err);
                    mui.toast('更新失败，请稍后重试');
                    plus.nativeUI.closeWaiting();                    
                });
            } else {
                plus.nativeUI.closeWaiting();
                ws.close();
            }
        }
    }
}

new Vue(userInfo);

mui.back = () => {
    plus.nativeUI.closeWaiting();
    ws.close();
}