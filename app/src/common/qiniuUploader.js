var task = plus.uploader.createUpload("http://upload.qiniu.com/", {
        method: "POST"
    },
    function (t, status) { //
        console.log(t.responseText);
        var data = JSON.parse(t.responseText);
        console.log(data.message);
        if (status == 200) {
            wt.close();
        } else {
            mui.toast("上传失败：" + status);
            wt.close();
        }
    }
);
var uid = Math.floor(Math.random() * 100000000 + 10000000).toString();
var scope = "test";
var type = uid + url.substring(url.lastIndexOf("."), url.length);
var putPolicy = {
    scope: scope + ":" + type,
    deadline: new Date().getTime()
}
var token = genUpToken(app.AK, app.SK, putPolicy);
task.addData("key", type);
task.addData("scope", scope);
task.addData("token", token);
console.log(url);
task.addFile(url, {
    "key": "file",
    "name": "file"
});
task.start();