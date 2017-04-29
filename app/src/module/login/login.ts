declare function require(path: string): any;
import './login.scss';
import * as Vue from 'vue';
import * as finger from '../../common';

let plus: any = (<any>window).plus;
let mui: any = (<any>window).mui;
let wilddog: any = (<any>window).wilddog;


let template: string = require('./login.html');

//清空登录信息

finger.wilddogAuth(null, null);
wilddog.auth().signOut().then(() => {
    console.info("user sign out.");
});

interface LoginModel {
    type: string,
    phone: string,
    password: string,
    verify_code: string
}

let LoginForm: any = {
    el: '#login',
    template,
    data(): LoginModel {
        return {
            type: 'login',
            phone: '',
            password: '',
            verify_code: ''
        }
    },
    methods: {
        login(this: LoginModel) {
            if (!(/0?(13|14|15|18|17)[0-9]{9}/.test(this.phone))) {
                return finger.showError('请输入正确的电话号码');
            }
            if (this.password.length < 6) {
                return finger.showError('密码少于6位');
            }
            if (this.type === 'register' && this.verify_code.length < 5) {
                return finger.showError('短信验证码为 5 位数字');
            }
            plus.nativeUI.showWaiting(this.type == 'register' ? "注册中..." : "登录中...");
            var url = 'users/login',
                data = {
                    phone: this.phone,
                    password: this.password
                };
            if (this.type == 'register') {
                data = (<any>Object).assign(data, { verifyCode: this.verify_code });
                url = 'users/reg';
            }
            finger.post(url, data, (data) => {
                if (data.code == 200) {
                    wilddog.auth().signInWithCustomToken(data.token).then((user) => {
                        finger.openPage('index', {});
                    }).catch((error) => {
                        console.log(JSON.stringify(error));
                    });
                }
                mui.toast(data.msg);
            }, (data) => {
                mui.toast(!data ? '服务器错误' : data.msg);
            });

        },
        showPasswotd(ev) {
            let password: any = document.getElementById('password')
            let type = password.getAttribute('type');
            password.setAttribute('type', type == 'text' ? 'password' : 'text');
            ev.target.style.opacity = type == 'text' ? '0.5' : '1'
        },
        navigator(this: LoginModel, ev) {
            if (ev.target.tagName.toLowerCase() == 'li') {
                this.type = ev.target.getAttribute('name');
            }
        }
    }
}

new Vue(LoginForm);

mui.init();

mui.plusReady(function () {
    let ws = plus.webview.currentWebview();
    mui.later(() => {
        plus.webview.all().forEach(view => {
            view.id != ws.id ? view.close('none') : '';
        });
    }, 300);
    finger.back();
});
