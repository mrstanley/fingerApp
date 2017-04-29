declare function require(path: string): any;

let plus: any = (<any>window).plus;
let mui: any = (<any>window).mui;
let wilddog: any = (<any>window).wilddog;

export function isImmersed() {
    let immersed = 0;
    let ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
    if (ms && ms.length >= 3) {
        immersed = parseFloat(ms[2]);
    }
    if (!immersed) {
        return false;
    } else {
        return immersed;
    }
};

/**
 *@description 顶部状态栏高度
 * @param {String|null} str 顶部状态栏颜色
 */
export function setImmersed(bg: string | null) {
    let immersed = 0;
    let ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
    if (ms && ms.length >= 3) {
        immersed = parseFloat(ms[2]);
    }
    if (!immersed) {
        return;
    }
    console.log(immersed);
    let t = document.getElementById('header');
    // t && (t.style.paddingTop = immersed + 'px', t.style.background = '-webkit-linear-gradient(top,rgba(215,75,40,1),rgba(215,75,40,0.8))', t.style.height = (t.offsetHeight + immersed) + 'px');
    t && (t.style.paddingTop = immersed + 'px', bg && (t.style.backgroundColor = bg || '#fff'), t.style.height = (t.offsetHeight + immersed) + 'px');
    t = document.getElementById('content');
    t && (t.style.marginTop = immersed + 'px');
    t = document.getElementById('userInfo');
    t && ((t) => {
        let paddingTop: any = getComputedStyle(t).paddingTop;
        let top: number = parseInt(paddingTop);
        t.style.paddingTop = top + immersed + 'px'
    })(t);
    t = document.getElementById('dcontent');
    t && (t.style.marginTop = immersed + 'px');
    t = document.getElementById('map');
    t && (t.style.marginTop = immersed + 'px');
}
/**
 * 请求根路径
 */
export const ROOT = 'http://www.fingerapp.top/';


export function post(url, data, success, error) {
    mui.ajax(ROOT + url, {
        data: data,
        dataType: 'json',//服务器返回json格式数据
        type: 'post',//HTTP请求类型
        timeout: 10000,//超时时间设置为10秒；
        headers: { 'Content-Type': 'application/json' },
        success: function (data) {
            success && data.code == 200 ? success(data) : error(data);
            plus.nativeUI.closeWaiting();
        },
        error: function (xhr, type, errorThrown) {
            //异常处理；
            error ? error() : '';
            console.log(type);
            plus.nativeUI.closeWaiting();
        }
    });
}

// 设置应用本地配置
export let setSettings = (attr, val) => {
    let settings = getSettings(null);
    attr && val.toString() ? settings[attr] = val : '';
    plus.storage.setItem('$settings', JSON.stringify(settings));
};

// 获取应用本地配置
export let getSettings = (attr: string | null) => {
    let settingsText = plus.storage.getItem('$settings') || "{}";
    return (attr && typeof attr == 'string' ? JSON.parse(settingsText)[attr] : JSON.parse(settingsText));
};
// APP显示错误信息，并返回false
export let showError = (err) => {
    if (err) {
        plus.nativeUI.toast(err);
        return false;
    }
};


export function getVerifyCode(phone) {
    if (/0?(13|14|15|18|17)[0-9]{9}/.test(phone)) {
        let verifyCodeBtn: any = document.getElementById('verifyCodeBtn');
        verifyCodeBtn.classList.add('mui-disabled');
        let waitTime = 120;
        let Timer = setInterval(function () {
            waitTime--;
            if (waitTime == 0) {
                clearInterval(Timer);
                verifyCodeBtn.innerText = '重新获取';
                verifyCodeBtn.classList.remove('mui-disabled');
            } else {
                verifyCodeBtn.innerText = '重新获取(' + waitTime + ')';
            }
        }, 1000);
    } else {
        return showError('请输入正确的电话号码');
    }
};

/**
 * @description 认证登录
 * @param success 
 * @param fail 
 */
export function wilddogAuth(success, fail) {
    let config = {
        authDomain: "finger.wilddog.com",
        syncURL: "https://finger.wilddogio.com"
    };
    wilddog.initializeApp(config);
    wilddog.auth().onAuthStateChanged((user) => {
        user ? (success ? success(user) : console.log("user")) : (fail ? fail() : console.log("no user"));
    });
}

/**
 *@description 打开新页面
 * @param {String|Object} 要打开页面的ID
 */
export function openPage(page, param) {
    let tmp = plus.webview.getWebviewById(page);
    if (tmp) {
        tmp.show('slide-in-right', 250);
    } else {
        mui.openWindow({
            url: page + '.html',
            id: page,
            preload: true,
            show: {
                aniShow: 'slide-in-right',
                duration: 250,
                event: 'loaded'
            },
            styles: {
                popGesture: 'close'
            },
            waiting: {
                autoShow: false
            },
            extras: param || {},
        });
    }
};

export function back() {
    var first: number = 0;
    mui.back = function () {
        if (!first) {
            mui.toast('再按一次退出应用');
            first++;
            setTimeout(function () {
                first = 0;
            }, 1500);
        } else {
            plus.runtime.quit();
        }
    };
}