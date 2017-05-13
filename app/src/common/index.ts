declare function require(path: string): any;

import "./directives";

export const plus: any = (window as any).plus;
export const mui: any = (window as any).mui;
export const wilddog: any = (window as any).wilddog;

// 判断是否全屏，返回状态栏高度
export function getImmersed() {
    if (plus.navigator.isImmersedStatusbar()) {
        return plus.navigator.getStatusbarHeight();
    } else {
        return 0;
    }
}

/**
 * @description 顶部状态栏高度
 * @param {String|null} str 顶部状态栏颜色
 */
export function setImmersed(bg: string | null) {
    let immersed = 0;
    const ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
    if (ms && ms.length >= 3) {
        immersed = parseFloat(ms[2]);
    }
    if (!immersed) {
        return;
    }
    let t = document.getElementById("header");
    // t && (t.style.paddingTop = immersed + 'px', t.style.background = '-webkit-linear-gradient(top,rgba(215,75,40,1),rgba(215,75,40,0.8))', t.style.height = (t.offsetHeight + immersed) + 'px');
    t && (t.style.paddingTop = immersed + "px", bg && (t.style.backgroundColor = bg || "#fff"), t.style.height = (t.offsetHeight + immersed) + "px");
    t = document.getElementById("content");
    t && (t.style.marginTop = immersed + "px");
    t = document.getElementById("userInfo");
    t && ((t) => {
        const paddingTop: any = getComputedStyle(t).paddingTop;
        const top: number = parseInt(paddingTop, 0);
        t.style.paddingTop = top + immersed + "px";
    })(t);
    t = document.getElementById("dcontent");
    t && (t.style.marginTop = immersed + "px");
    t = document.getElementById("map");
    t && (t.style.marginTop = immersed + "px");
}
/**
 * 请求根路径
 */
// export const ROOT = "http://127.0.0.1:3000/";
export const ROOT = "http://www.fingerapp.top/";
export const ASSETSIMG = "_www/dist/app_dev/assets/images/";

// 设置 cookie
export function setCookie(key: string, value: any, time?: number): void {
    const expires: any = new Date(Date.now() + (time || 21600) * 1000);
    key && value && plus.navigator.setCookie(ROOT, key + "=" + value + "; expires=" + expires.toGMTString().replace(" ", "") + "; path=/");
}

// 获取 cookie
export function getCookie(key: string): string {
    const cookieStr = plus.navigator.getCookie(ROOT);
    const cookieArray = cookieStr && cookieStr.split("; ");
    const cookieValue = cookieArray && cookieArray.find((i) => i.indexOf(key) >= 0);
    if (cookieValue) {
        return cookieValue.split("=")[1];
    } else {
        return key ? "" : plus.navigator.getCookie(ROOT);
    }
}

export function post(url, data, success, error) {
    mui.ajax(ROOT + url, {
        data,
        dataType: "json", // 服务器返回json格式数据
        type: "post", // HTTP请求类型
        timeout: 10000, // 超时时间设置为10秒；
        headers: { "Content-Type": "application/json" },
        success(data) {
            success && data.code === 200 ? success(data) : error(data);
        },
        error(xhr, type, errorThrown) {
            error ? error() : showError(xhr.status === 401 ? "登录过期，请重新登录" : "服务器错误，请重试");
        }
    });
}

// 设置应用本地配置
export let setSettings = (attr, val) => {
    const settings = getSettings(null);
    attr && val.toString() ? settings[attr] = val : "";
    plus.storage.setItem("$settings", JSON.stringify(settings));
};

// 获取应用本地配置
export let getSettings = (attr: string | null) => {
    const settingsText = plus.storage.getItem("$settings") || "{}";
    return (attr && typeof attr === "string" ? JSON.parse(settingsText)[attr] : JSON.parse(settingsText));
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
        const verifyCodeBtn: any = document.getElementById("verifyCodeBtn");
        verifyCodeBtn.classList.add("mui-disabled");
        let waitTime = 120;
        const Timer = setInterval(() => {
            waitTime--;
            if (waitTime === 0) {
                clearInterval(Timer);
                verifyCodeBtn.innerText = "重新获取";
                verifyCodeBtn.classList.remove("mui-disabled");
            } else {
                verifyCodeBtn.innerText = "重新获取(" + waitTime + ")";
            }
        }, 1000);
    } else {
        return showError("请输入正确的电话号码");
    }
}

/**
 * @description 认证登录
 * @param success
 * @param fail
 */
export function wilddogAuth(success, fail) {
    const config = {
        authDomain: "finger.wilddog.com",
        syncURL: "https://finger.wilddogio.com"
    };
    wilddog.initializeApp(config);
    wilddog.auth().onAuthStateChanged((user) => {
        user ? (success ? success(user) : console.log("user")) : (fail ? fail() : console.log("no user"));
    });
}

/**
 * @description 打开新页面
 * @param {String|Object} 要打开页面的ID
 */
export function openPage(page, param) {
    const tmp = plus.webview.getWebviewById(page);
    if (tmp) {
        tmp.show("slide-in-right", 250);
    } else {
        mui.openWindow({
            url: page + ".html",
            id: page,
            preload: true,
            show: {
                aniShow: "slide-in-right",
                duration: 250,
                event: "loaded"
            },
            styles: {
                popGesture: "close"
            },
            waiting: {
                autoShow: false
            },
            extras: param || {}
        });
    }
}

export function back() {
    let first: number = 0;
    mui.back = () => {
        if (!first) {
            mui.toast("再按一次退出应用");
            first++;
            setTimeout(() => {
                first = 0;
            }, 1500);
        } else {
            plus.runtime.quit();
        }
    };
}


export function createTitle(title, leftBtn?, rightBtn?) {
    const topoffset = getImmersed();
    const currentView = plus.webview.currentWebview();
    // 开启回弹
    currentView.setStyle({
        bounce: "vertical",
        bounceBackground: "#eee"
    });
    const childNode: object[] = [
        { tag: "rect", id: "rect", color: "#eee", position: { top: (topoffset + 44) + "px", left: "0px", width: "100%", height: "1px" } },
        { tag: "font", id: "font", text: title, position: { top: topoffset + "px", left: "0px", width: "100%", height: "44px" }, textStyles: { size: "17px", color: "#444" } }
    ];
    leftBtn ? childNode.push({ tag: "img", id: "leftBtn", src: ASSETSIMG + leftBtn.icon, position: { top: (topoffset + 10) + "px", left: "10px", width: "24px", height: "24px" } }) : "";
    rightBtn ? childNode.push({ tag: "img", id: "rightBtn", src: ASSETSIMG + rightBtn.icon, position: { top: (topoffset + 10) + "px", left: (window.innerWidth - 34) + "px", width: "24px", height: "24px" } }) : "";
    const titleView = new plus.nativeObj.View("titleView", { top: "0px", left: "0px", height: (topoffset + 45) + "px", width: "100%", backgroundColor: "#fff", dock: "top", position: "dock" }, childNode);
    titleView.addEventListener("click", (e) => {
        const x = e.clientX;
        if (x < 44 && leftBtn && leftBtn.click) {
            leftBtn.click();
        } else if (x > window.innerWidth - 34 && rightBtn && rightBtn.click) {
            rightBtn.click();
        }
    }, false);
    currentView.append(titleView);
}


export function plusReady(cb) {
    function ready() {
        const webview = plus.webview.currentWebview();
        cb(webview);
    }
    if (plus) {
        ready();
    } else {
        document.addEventListener("plusready", ready, false);
    }
}
