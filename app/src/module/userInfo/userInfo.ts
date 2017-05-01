declare function require(path: string): any;
import './userInfo.scss';
import * as Vue from 'vue';
import * as Router from 'vue-router';
import * as finger from '../../common';


let plus: any = (<any>window).plus;
let mui: any = (<any>window).mui;
let wilddog: any = (<any>window).wilddog;
let template: string = require('./userInfo.html');

//认证登录
finger.wilddogAuth(function (user) {
    console.log(JSON.stringify(user));
    let users = wilddog.sync().ref("users");
    users.child(user.uid).on('value', function (info, error) {
        if (error == null) {
            var obj = info.val();
            Object.keys(userInfo.$data).forEach(i => {
                obj[i] ? userInfo[i] = obj[i] : '';
            });
        } else {
            console.log(error);
            mui.toast('获取数据失败');
        }
    });
}, null);

let userInfo = new Vue({
    el: '#userInfo',
    template,
    data() {
        return {
            nickName: '',
            email: '',
            phone: '',
            signature: '',
            avatar: ''
        }
    },
    mounted() {
        finger.setImmersed(null);
    },
    methods: {
        changeValue(e) {
            let file = e.target.files[0];
            let storeAs = 'avatar_img_' + Date.now() + '.' + file.type.split('/')[1];
            console.log(file.name + ' => ' + storeAs);
        },
        userInfoModify(type, value) {
            finger.openPage('userInfoModify', {
                type: type,
                value: value
            });
        },
        current(a) {
            console.log(a);
        },
        goLogin() {
            finger.openPage('login', {});
        }
    }
});
