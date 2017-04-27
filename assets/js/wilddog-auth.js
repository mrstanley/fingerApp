(function() {
    var define = null;
    !function(t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.eio = e() : t.eio = e()
    }(this, function() {
        return function(t) {
            function e(n) {
                if (r[n])
                    return r[n].exports;
                var o = r[n] = {
                    exports: {},
                    id: n,
                    loaded: !1
                };
                return t[n].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
            }
            var r = {};
            return e.m = t, e.c = r, e.p = "", e(0)
        }([function(t, e, r) {
            "use strict";
            t.exports = r(1)
        }, function(t, e, r) {
            "use strict";
            t.exports = r(2), t.exports.parser = r(9)
        }, function(t, e, r) {
            (function(e) {
                "use strict";
                function n(t, r) {
                    if (!(this instanceof n))
                        return new n(t, r);
                    r = r || {}, t && "object" === ("undefined" == typeof t ? "undefined" : s(t)) && (r = t, t = null), t ? (t = h(t), r.hostname = t.host, r.secure = "https" === t.protocol || "wss" === t.protocol, r.port = t.port, t.query && (r.query = t.query)) : r.host && (r.hostname = h(r.host).host), this.secure = null != r.secure ? r.secure : e.location && "https:" === location.protocol, r.hostname && !r.port && (r.port = this.secure ? "443" : "80"), this.agent = r.agent || !1, this.hostname = r.hostname || (e.location ? location.hostname : "localhost"), this.port = r.port || (e.location && location.port ? location.port : this.secure ? 443 : 80), this.query = r.query || {}, "string" == typeof this.query && (this.query = l.decode(this.query)), this.upgrade = !1 !== r.upgrade, this.path = (r.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!r.forceJSONP, this.jsonp = !1 !== r.jsonp, this.forceBase64 = !!r.forceBase64, this.enablesXDR = !!r.enablesXDR, this.timestampParam = r.timestampParam || "t", this.timestampRequests = r.timestampRequests, this.transports = r.transports || ["polling", "websocket"], this.transportOptions = r.transportOptions || {}, this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = r.policyPort || 843, this.rememberUpgrade = r.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = r.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== r.perMessageDeflate && (r.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = r.pfx || null, this.key = r.key || null, this.passphrase = r.passphrase || null, this.cert = r.cert || null, this.ca = r.ca || null, this.ciphers = r.ciphers || null, this.rejectUnauthorized = void 0 === r.rejectUnauthorized || r.rejectUnauthorized, this.forceNode = !!r.forceNode;
                    var o = "object" === ("undefined" == typeof e ? "undefined" : s(e)) && e;
                    o.global === o && (r.extraHeaders && Object.keys(r.extraHeaders).length > 0 && (this.extraHeaders = r.extraHeaders), r.localAddress && (this.localAddress = r.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, this.open()
                }
                function o(t) {
                    var e = {};
                    for (var r in t)
                        t.hasOwnProperty(r) && (e[r] = t[r]);
                    return e
                }
                var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    },
                    i = r(3),
                    a = r(19),
                    c = r(23)("engine.io-client:socket"),
                    u = r(30),
                    p = r(9),
                    h = r(31),
                    f = r(32),
                    l = r(20);
                t.exports = n, n.priorWebsocketSuccess = !1, a(n.prototype), n.protocol = p.protocol, n.Socket = n, n.Transport = r(8), n.transports = r(3), n.parser = r(9), n.prototype.createTransport = function(t) {
                    c('creating transport "%s"', t);
                    var e = o(this.query);
                    e.EIO = p.protocol, e.transport = t;
                    var r = this.transportOptions[t] || {};
                    this.id && (e.sid = this.id);
                    var n = new i[t]({
                        query: e,
                        socket: this,
                        agent: r.agent || this.agent,
                        hostname: r.hostname || this.hostname,
                        port: r.port || this.port,
                        secure: r.secure || this.secure,
                        path: r.path || this.path,
                        forceJSONP: r.forceJSONP || this.forceJSONP,
                        jsonp: r.jsonp || this.jsonp,
                        forceBase64: r.forceBase64 || this.forceBase64,
                        enablesXDR: r.enablesXDR || this.enablesXDR,
                        timestampRequests: r.timestampRequests || this.timestampRequests,
                        timestampParam: r.timestampParam || this.timestampParam,
                        policyPort: r.policyPort || this.policyPort,
                        pfx: r.pfx || this.pfx,
                        key: r.key || this.key,
                        passphrase: r.passphrase || this.passphrase,
                        cert: r.cert || this.cert,
                        ca: r.ca || this.ca,
                        ciphers: r.ciphers || this.ciphers,
                        rejectUnauthorized: r.rejectUnauthorized || this.rejectUnauthorized,
                        perMessageDeflate: r.perMessageDeflate || this.perMessageDeflate,
                        extraHeaders: r.extraHeaders || this.extraHeaders,
                        forceNode: r.forceNode || this.forceNode,
                        localAddress: r.localAddress || this.localAddress,
                        requestTimeout: r.requestTimeout || this.requestTimeout,
                        protocols: r.protocols || void 0
                    });
                    return n
                }, n.prototype.open = function() {
                    var t;
                    if (this.rememberUpgrade && n.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1)
                        t = "websocket";
                    else {
                        if (0 === this.transports.length) {
                            var e = this;
                            return void setTimeout(function() {
                                e.emit("error", "No transports available")
                            }, 0)
                        }
                        t = this.transports[0]
                    }
                    this.readyState = "opening";
                    try {
                        t = this.createTransport(t)
                    } catch (r) {
                        return this.transports.shift(), void this.open()
                    }
                    t.open(), this.setTransport(t)
                }, n.prototype.setTransport = function(t) {
                    c("setting transport %s", t.name);
                    var e = this;
                    this.transport && (c("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = t, t.on("drain", function() {
                        e.onDrain()
                    }).on("packet", function(t) {
                        e.onPacket(t)
                    }).on("error", function(t) {
                        e.onError(t)
                    }).on("close", function() {
                        e.onClose("transport close")
                    })
                }, n.prototype.probe = function(t) {
                    function e() {
                        if (f.onlyBinaryUpgrades) {
                            var e = !this.supportsBinary && f.transport.supportsBinary;
                            h = h || e
                        }
                        h || (c('probe transport "%s" opened', t), p.send([{
                            type: "ping",
                            data: "probe"
                        }]), p.once("packet", function(e) {
                            if (!h)
                                if ("pong" === e.type && "probe" === e.data) {
                                    if (c('probe transport "%s" pong', t), f.upgrading = !0, f.emit("upgrading", p), !p)
                                        return;
                                    n.priorWebsocketSuccess = "websocket" === p.name, c('pausing current transport "%s"', f.transport.name), f.transport.pause(function() {
                                        h || "closed" !== f.readyState && (c("changing transport and sending upgrade packet"), u(), f.setTransport(p), p.send([{
                                            type: "upgrade"
                                        }]), f.emit("upgrade", p), p = null, f.upgrading = !1, f.flush())
                                    })
                                } else {
                                    c('probe transport "%s" failed', t);
                                    var r = new Error("probe error");
                                    r.transport = p.name, f.emit("upgradeError", r)
                                }
                        }))
                    }
                    function r() {
                        h || (h = !0, u(), p.close(), p = null)
                    }
                    function o(e) {
                        var n = new Error("probe error: " + e);
                        n.transport = p.name, r(), c('probe transport "%s" failed because of error: %s', t, e), f.emit("upgradeError", n)
                    }
                    function s() {
                        o("transport closed")
                    }
                    function i() {
                        o("socket closed")
                    }
                    function a(t) {
                        p && t.name !== p.name && (c('"%s" works - aborting "%s"', t.name, p.name), r())
                    }
                    function u() {
                        p.removeListener("open", e), p.removeListener("error", o), p.removeListener("close", s), f.removeListener("close", i), f.removeListener("upgrading", a)
                    }
                    c('probing transport "%s"', t);
                    var p = this.createTransport(t, {
                            probe: 1
                        }),
                        h = !1,
                        f = this;
                    n.priorWebsocketSuccess = !1, p.once("open", e), p.once("error", o), p.once("close", s), this.once("close", i), this.once("upgrading", a), p.open()
                }, n.prototype.onOpen = function() {
                    if (c("socket open"), this.readyState = "open", n.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
                        c("starting upgrade probes");
                        for (var t = 0, e = this.upgrades.length; t < e; t++)
                            this.probe(this.upgrades[t])
                    }
                }, n.prototype.onPacket = function(t) {
                    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState)
                        switch (c('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {
                        case "open":
                            this.onHandshake(f(t.data));
                            break;
                        case "pong":
                            this.setPing(), this.emit("pong");
                            break;
                        case "error":
                            var e = new Error("server error");
                            e.code = t.data, this.onError(e);
                            break;
                        case "message":
                            this.emit("data", t.data), this.emit("message", t.data)
                        }
                    else
                        c('packet received with socket readyState "%s"', this.readyState)
                }, n.prototype.onHandshake = function(t) {
                    this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
                }, n.prototype.onHeartbeat = function(t) {
                    clearTimeout(this.pingTimeoutTimer);
                    var e = this;
                    e.pingTimeoutTimer = setTimeout(function() {
                        "closed" !== e.readyState && e.onClose("ping timeout")
                    }, t || e.pingInterval + e.pingTimeout)
                }, n.prototype.setPing = function() {
                    var t = this;
                    clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function() {
                        c("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout)
                    }, t.pingInterval)
                }, n.prototype.ping = function() {
                    var t = this;
                    this.sendPacket("ping", function() {
                        t.emit("ping")
                    })
                }, n.prototype.onDrain = function() {
                    this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
                }, n.prototype.flush = function() {
                    "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (c("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
                }, n.prototype.write = n.prototype.send = function(t, e, r) {
                    return this.sendPacket("message", t, e, r), this
                }, n.prototype.sendPacket = function(t, e, r, n) {
                    if ("function" == typeof e && (n = e, e = void 0), "function" == typeof r && (n = r, r = null), "closing" !== this.readyState && "closed" !== this.readyState) {
                        r = r || {}, r.compress = !1 !== r.compress;
                        var o = {
                            type: t,
                            data: e,
                            options: r
                        };
                        this.emit("packetCreate", o), this.writeBuffer.push(o), n && this.once("flush", n), this.flush()
                    }
                }, n.prototype.close = function() {
                    function t() {
                        n.onClose("forced close"), c("socket closing - telling transport to close"), n.transport.close()
                    }
                    function e() {
                        n.removeListener("upgrade", e), n.removeListener("upgradeError", e), t()
                    }
                    function r() {
                        n.once("upgrade", e), n.once("upgradeError", e)
                    }
                    if ("opening" === this.readyState || "open" === this.readyState) {
                        this.readyState = "closing";
                        var n = this;
                        this.writeBuffer.length ? this.once("drain", function() {
                            this.upgrading ? r() : t()
                        }) : this.upgrading ? r() : t()
                    }
                    return this
                }, n.prototype.onError = function(t) {
                    c("socket error %j", t), n.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t)
                }, n.prototype.onClose = function(t, e) {
                    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                        c('socket close with reason: "%s"', t);
                        var r = this;
                        clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, e), r.writeBuffer = [], r.prevBufferLen = 0
                    }
                }, n.prototype.filterUpgrades = function(t) {
                    for (var e = [], r = 0, n = t.length; r < n; r++)
                        ~u(this.transports, t[r]) && e.push(t[r]);
                    return e
                }
            }).call(e, function() {
                return this
            }())
        }, function(t, e, r) {
            (function(t) {
                "use strict";
                function n(e) {
                    var r,
                        n = !1,
                        a = !1,
                        c = !1 !== e.jsonp;
                    if (t.location) {
                        var u = "https:" === location.protocol,
                            p = location.port;
                        p || (p = u ? 443 : 80), n = e.hostname !== location.hostname || p !== e.port, a = e.secure !== u
                    }
                    if (e.xdomain = n, e.xscheme = a, r = new o(e), "open" in r && !e.forceJSONP)
                        return new s(e);
                    if (!c)
                        throw new Error("JSONP disabled");
                    return new i(e)
                }
                var o = r(4),
                    s = r(6),
                    i = r(27),
                    a = r(28);
                e.polling = n, e.websocket = a
            }).call(e, function() {
                return this
            }())
        }, function(t, e, r) {
            (function(e) {
                "use strict";
                var n = r(5);
                t.exports = function(t) {
                    var r = t.xdomain,
                        o = t.xscheme,
                        s = t.enablesXDR;
                    try {
                        if ("undefined" != typeof XMLHttpRequest && (!r || n))
                            return new XMLHttpRequest
                    } catch (i) {}
                    try {
                        if ("undefined" != typeof XDomainRequest && !o && s)
                            return new XDomainRequest
                    } catch (i) {}
                    if (!r)
                        try {
                            return new (e[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                        } catch (i) {}
                }
            }).call(e, function() {
                return this
            }())
        }, function(t, e) {
            try {
                t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
            } catch (r) {
                t.exports = !1
            }
        }, function(t, e, r) {
            (function(e) {
                "use strict";
                function n() {}
                function o(t) {
                    if (c.call(this, t), this.requestTimeout = t.requestTimeout, this.extraHeaders = t.extraHeaders, e.location) {
                        var r = "https:" === location.protocol,
                            n = location.port;
                        n || (n = r ? 443 : 80), this.xd = t.hostname !== e.location.hostname || n !== t.port, this.xs = t.secure !== r
                    }
                }
                function s(t) {
                    this.method = t.method || "GET", this.uri = t.uri, this.xd = !!t.xd, this.xs = !!t.xs, this.async = !1 !== t.async, this.data = void 0 !== t.data ? t.data : null, this.agent = t.agent, this.isBinary = t.isBinary, this.supportsBinary = t.supportsBinary, this.enablesXDR = t.enablesXDR, this.requestTimeout = t.requestTimeout, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.extraHeaders = t.extraHeaders, this.create()
                }
                function i() {
                    for (var t in s.requests)
                        s.requests.hasOwnProperty(t) && s.requests[t].abort()
                }
                var a = r(4),
                    c = r(7),
                    u = r(19),
                    p = r(21),
                    h = r(23)("engine.io-client:polling-xhr");
                t.exports = o, t.exports.Request = s, p(o, c), o.prototype.supportsBinary = !0, o.prototype.request = function(t) {
                    return t = t || {}, t.uri = this.uri(), t.xd = this.xd, t.xs = this.xs, t.agent = this.agent || !1, t.supportsBinary = this.supportsBinary, t.enablesXDR = this.enablesXDR, t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized, t.requestTimeout = this.requestTimeout, t.extraHeaders = this.extraHeaders, new s(t)
                }, o.prototype.doWrite = function(t, e) {
                    var r = "string" != typeof t && void 0 !== t,
                        n = this.request({
                            method: "POST",
                            data: t,
                            isBinary: r
                        }),
                        o = this;
                    n.on("success", e), n.on("error", function(t) {
                        o.onError("xhr post error", t)
                    }), this.sendXhr = n
                }, o.prototype.doPoll = function() {
                    h("xhr poll");
                    var t = this.request(),
                        e = this;
                    t.on("data", function(t) {
                        e.onData(t)
                    }), t.on("error", function(t) {
                        e.onError("xhr poll error", t)
                    }), this.pollXhr = t
                }, u(s.prototype), s.prototype.create = function() {
                    var t = {
                        agent: this.agent,
                        xdomain: this.xd,
                        xscheme: this.xs,
                        enablesXDR: this.enablesXDR
                    };
                    t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized;
                    var r = this.xhr = new a(t),
                        n = this;
                    try {
                        h("xhr open %s: %s", this.method, this.uri), r.open(this.method, this.uri, this.async);
                        try {
                            if (this.extraHeaders) {
                                r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0);
                                for (var o in this.extraHeaders)
                                    this.extraHeaders.hasOwnProperty(o) && r.setRequestHeader(o, this.extraHeaders[o])
                            }
                        } catch (i) {}
                        if (this.supportsBinary && (r.responseType = "arraybuffer"), "POST" === this.method)
                            try {
                                this.isBinary ? r.setRequestHeader("Content-type", "application/octet-stream") : r.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                            } catch (i) {}
                        try {
                            r.setRequestHeader("Accept", "*/*")
                        } catch (i) {}
                        "withCredentials" in r && (r.withCredentials = !0), this.requestTimeout && (r.timeout = this.requestTimeout), this.hasXDR() ? (r.onload = function() {
                            n.onLoad()
                        }, r.onerror = function() {
                            n.onError(r.responseText)
                        }) : r.onreadystatechange = function() {
                            4 === r.readyState && (200 === r.status || 1223 === r.status ? n.onLoad() : setTimeout(function() {
                                n.onError(r.status)
                            }, 0))
                        }, h("xhr data %s", this.data), r.send(this.data)
                    } catch (i) {
                        return void setTimeout(function() {
                            n.onError(i)
                        }, 0)
                    }
                    e.document && (this.index = s.requestsCount++, s.requests[this.index] = this)
                }, s.prototype.onSuccess = function() {
                    this.emit("success"), this.cleanup()
                }, s.prototype.onData = function(t) {
                    this.emit("data", t), this.onSuccess()
                }, s.prototype.onError = function(t) {
                    this.emit("error", t), this.cleanup(!0)
                }, s.prototype.cleanup = function(t) {
                    if ("undefined" != typeof this.xhr && null !== this.xhr) {
                        if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = n : this.xhr.onreadystatechange = n, t)
                            try {
                                this.xhr.abort()
                            } catch (r) {}
                        e.document && delete s.requests[this.index], this.xhr = null
                    }
                }, s.prototype.onLoad = function() {
                    var t;
                    try {
                        var e;
                        try {
                            e = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                        } catch (r) {}
                        if ("application/octet-stream" === e)
                            t = this.xhr.response || this.xhr.responseText;
                        else if (this.supportsBinary)
                            try {
                                t = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response))
                            } catch (r) {
                                for (var n = new Uint8Array(this.xhr.response), o = [], s = 0, i = n.length; s < i; s++)
                                    o.push(n[s]);
                                t = String.fromCharCode.apply(null, o)
                            }
                        else
                            t = this.xhr.responseText
                    } catch (r) {
                        this.onError(r)
                    }
                    null != t && this.onData(t)
                }, s.prototype.hasXDR = function() {
                    return "undefined" != typeof e.XDomainRequest && !this.xs && this.enablesXDR
                }, s.prototype.abort = function() {
                    this.cleanup()
                }, s.requestsCount = 0, s.requests = {}, e.document && (e.attachEvent ? e.attachEvent("onunload", i) : e.addEventListener && e.addEventListener("beforeunload", i, !1))
            }).call(e, function() {
                return this
            }())
        }, function(t, e, r) {
            "use strict";
            function n(t) {
                var e = t && t.forceBase64;
                p && !e || (this.supportsBinary = !1), o.call(this, t)
            }
            var o = r(8),
                s = r(20),
                i = r(9),
                a = r(21),
                c = r(22),
                u = r(23)("engine.io-client:polling");
            t.exports = n;
            var p = function() {
                var t = r(4),
                    e = new t({
                        xdomain: !1
                    });
                return null != e.responseType
            }();
            a(n, o), n.prototype.name = "polling", n.prototype.doOpen = function() {
                this.poll()
            }, n.prototype.pause = function(t) {
                function e() {
                    u("paused"), r.readyState = "paused", t()
                }
                var r = this;
                if (this.readyState = "pausing", this.polling || !this.writable) {
                    var n = 0;
                    this.polling && (u("we are currently polling - waiting to pause"), n++, this.once("pollComplete", function() {
                        u("pre-pause polling complete"), --n || e()
                    })), this.writable || (u("we are currently writing - waiting to pause"), n++, this.once("drain", function() {
                        u("pre-pause writing complete"), --n || e()
                    }))
                } else
                    e()
            }, n.prototype.poll = function() {
                u("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
            }, n.prototype.onData = function(t) {
                var e = this;
                u("polling got data %s", t);
                var r = function(t, r, n) {
                    return "opening" === e.readyState && e.onOpen(), "close" === t.type ? (e.onClose(), !1) : void e.onPacket(t)
                };
                i.decodePayload(t, this.socket.binaryType, this.supportsBinary, r), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : u('ignoring poll - transport state "%s"', this.readyState))
            }, n.prototype.doClose = function() {
                function t() {
                    u("writing close packet"), e.write([{
                        type: "close"
                    }])
                }
                var e = this;
                "open" === this.readyState ? (u("transport open - closing"), t()) : (u("transport not open - deferring close"), this.once("open", t))
            }, n.prototype.write = function(t) {
                var e = this;
                this.writable = !1;
                var r = function() {
                    e.writable = !0, e.emit("drain")
                };
                i.encodePayload(t, this.supportsBinary, function(t) {
                    e.doWrite(t, r)
                })
            }, n.prototype.uri = function() {
                var t = this.query || {},
                    e = this.secure ? "https" : "http",
                    r = "";
                !1 !== this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || t.sid || (t.b64 = 1), t = s.encode(t), this.port && ("https" === e && 443 !== Number(this.port) || "http" === e && 80 !== Number(this.port)) && (r = ":" + this.port), t.length && (t = "?" + t);
                var n = this.hostname.indexOf(":") !== -1;
                return e + "://" + (n ? "[" + this.hostname + "]" : this.hostname) + r + this.path + t
            }
        }, function(t, e, r) {
            "use strict";
            function n(t) {
                this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.forceNode = t.forceNode, this.extraHeaders = t.extraHeaders, this.localAddress = t.localAddress
            }
            var o = r(9),
                s = r(19);
            t.exports = n, s(n.prototype), n.prototype.onError = function(t, e) {
                var r = new Error(t);
                return r.type = "TransportError", r.description = e, this.emit("error", r), this
            }, n.prototype.open = function() {
                return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
            }, n.prototype.close = function() {
                return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
            }, n.prototype.send = function(t) {
                if ("open" !== this.readyState)
                    throw new Error("Transport not open");
                this.write(t)
            }, n.prototype.onOpen = function() {
                this.readyState = "open", this.writable = !0, this.emit("open")
            }, n.prototype.onData = function(t) {
                var e = o.decodePacket(t, this.socket.binaryType);
                this.onPacket(e)
            }, n.prototype.onPacket = function(t) {
                this.emit("packet", t)
            }, n.prototype.onClose = function() {
                this.readyState = "closed", this.emit("close")
            }
        }, function(t, e, r) {
            (function(t) {
                function n(t, r) {
                    var n = "b" + e.packets[t.type] + t.data.data;
                    return r(n)
                }
                function o(t, r, n) {
                    if (!r)
                        return e.encodeBase64Packet(t, n);
                    var o = t.data,
                        s = new Uint8Array(o),
                        i = new Uint8Array(1 + o.byteLength);
                    i[0] = v[t.type];
                    for (var a = 0; a < s.length; a++)
                        i[a + 1] = s[a];
                    return n(i.buffer)
                }
                function s(t, r, n) {
                    if (!r)
                        return e.encodeBase64Packet(t, n);
                    var o = new FileReader;
                    return o.onload = function() {
                        t.data = o.result, e.encodePacket(t, r, !0, n)
                    }, o.readAsArrayBuffer(t.data)
                }
                function i(t, r, n) {
                    if (!r)
                        return e.encodeBase64Packet(t, n);
                    if (m)
                        return s(t, r, n);
                    var o = new Uint8Array(1);
                    o[0] = v[t.type];
                    var i = new x([o.buffer, t.data]);
                    return n(i)
                }
                function a(t) {
                    try {
                        t = d.decode(t, {
                            strict: !1
                        })
                    } catch (e) {
                        return !1
                    }
                    return t
                }
                function c(t, e, r) {
                    for (var n = new Array(t.length), o = l(t.length, r), s = function(t, r, o) {
                            e(r, function(e, r) {
                                n[t] = r, o(e, n)
                            })
                        }, i = 0; i < t.length; i++)
                        s(i, t[i], o)
                }
                var u,
                    p = r(10),
                    h = r(11),
                    f = r(13),
                    l = r(14),
                    d = r(15);
                t && t.ArrayBuffer && (u = r(17));
                var y = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
                    g = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
                    m = y || g;
                e.protocol = 3;
                var v = e.packets = {
                        open: 0,
                        close: 1,
                        ping: 2,
                        pong: 3,
                        message: 4,
                        upgrade: 5,
                        noop: 6
                    },
                    b = p(v),
                    w = {
                        type: "error",
                        data: "parser error"
                    },
                    x = r(18);
                e.encodePacket = function(e, r, s, a) {
                    "function" == typeof r && (a = r, r = !1), "function" == typeof s && (a = s, s = null);
                    var c = void 0 === e.data ? void 0 : e.data.buffer || e.data;
                    if (t.ArrayBuffer && c instanceof ArrayBuffer)
                        return o(e, r, a);
                    if (x && c instanceof t.Blob)
                        return i(e, r, a);
                    if (c && c.base64)
                        return n(e, a);
                    var u = v[e.type];
                    return void 0 !== e.data && (u += s ? d.encode(String(e.data), {
                        strict: !1
                    }) : String(e.data)), a("" + u)
                }, e.encodeBase64Packet = function(r, n) {
                    var o = "b" + e.packets[r.type];
                    if (x && r.data instanceof t.Blob) {
                        var s = new FileReader;
                        return s.onload = function() {
                            var t = s.result.split(",")[1];
                            n(o + t)
                        }, s.readAsDataURL(r.data)
                    }
                    var i;
                    try {
                        i = String.fromCharCode.apply(null, new Uint8Array(r.data))
                    } catch (a) {
                        for (var c = new Uint8Array(r.data), u = new Array(c.length), p = 0; p < c.length; p++)
                            u[p] = c[p];
                        i = String.fromCharCode.apply(null, u)
                    }
                    return o += t.btoa(i), n(o)
                }, e.decodePacket = function(t, r, n) {
                    if (void 0 === t)
                        return w;
                    if ("string" == typeof t) {
                        if ("b" === t.charAt(0))
                            return e.decodeBase64Packet(t.substr(1), r);
                        if (n && (t = a(t), t === !1))
                            return w;
                        var o = t.charAt(0);
                        return Number(o) == o && b[o] ? t.length > 1 ? {
                            type: b[o],
                            data: t.substring(1)
                        } : {
                            type: b[o]
                        } : w
                    }
                    var s = new Uint8Array(t),
                        o = s[0],
                        i = f(t, 1);
                    return x && "blob" === r && (i = new x([i])), {
                        type: b[o],
                        data: i
                    }
                }, e.decodeBase64Packet = function(t, e) {
                    var r = b[t.charAt(0)];
                    if (!u)
                        return {
                            type: r,
                            data: {
                                base64: !0,
                                data: t.substr(1)
                            }
                        };
                    var n = u.decode(t.substr(1));
                    return "blob" === e && x && (n = new x([n])), {
                        type: r,
                        data: n
                    }
                }, e.encodePayload = function(t, r, n) {
                    function o(t) {
                        return t.length + ":" + t
                    }
                    function s(t, n) {
                        e.encodePacket(t, !!i && r, !1, function(t) {
                            n(null, o(t))
                        })
                    }
                    "function" == typeof r && (n = r, r = null);
                    var i = h(t);
                    return r && i ? x && !m ? e.encodePayloadAsBlob(t, n) : e.encodePayloadAsArrayBuffer(t, n) : t.length ? void c(t, s, function(t, e) {
                        return n(e.join(""))
                    }) : n("0:")
                }, e.decodePayload = function(t, r, n, o) {
                    if ("string" != typeof t)
                        return e.decodePayloadAsBinary(t, r, o);
                    "function" == typeof r && (o = r, r = null), "function" == typeof n && (o = n, n = null);
                    var s;
                    if ("" === t)
                        return o(w, 0, 1);
                    if (n && (t = a(t), t === !1))
                        return o(w, 0, 1);
                    for (var i, c, u = "", p = 0, h = t.length; p < h; p++) {
                        var f = t.charAt(p);
                        if (":" === f) {
                            if ("" === u || u != (i = Number(u)))
                                return o(w, 0, 1);
                            if (c = t.substr(p + 1, i), u != c.length)
                                return o(w, 0, 1);
                            if (c.length) {
                                if (s = e.decodePacket(c, r, !1), w.type === s.type && w.data === s.data)
                                    return o(w, 0, 1);
                                var l = o(s, p + i, h);
                                if (!1 === l)
                                    return
                            }
                            p += i, u = ""
                        } else
                            u += f
                    }
                    return "" !== u ? o(w, 0, 1) : void 0
                }, e.encodePayloadAsArrayBuffer = function(t, r) {
                    function n(t, r) {
                        e.encodePacket(t, !0, !0, function(t) {
                            return r(null, t)
                        })
                    }
                    return t.length ? void c(t, n, function(t, e) {
                        var n = e.reduce(function(t, e) {
                                var r;
                                return r = "string" == typeof e ? e.length : e.byteLength, t + r.toString().length + r + 2
                            }, 0),
                            o = new Uint8Array(n),
                            s = 0;
                        return e.forEach(function(t) {
                            var e = "string" == typeof t,
                                r = t;
                            if (e) {
                                for (var n = new Uint8Array(t.length), i = 0; i < t.length; i++)
                                    n[i] = t.charCodeAt(i);
                                r = n.buffer
                            }
                            e ? o[s++] = 0 : o[s++] = 1;
                            for (var a = r.byteLength.toString(), i = 0; i < a.length; i++)
                                o[s++] = parseInt(a[i]);
                            o[s++] = 255;
                            for (var n = new Uint8Array(r), i = 0; i < n.length; i++)
                                o[s++] = n[i]
                        }), r(o.buffer)
                    }) : r(new ArrayBuffer(0))
                }, e.encodePayloadAsBlob = function(t, r) {
                    function n(t, r) {
                        e.encodePacket(t, !0, !0, function(t) {
                            var e = new Uint8Array(1);
                            if (e[0] = 1, "string" == typeof t) {
                                for (var n = new Uint8Array(t.length), o = 0; o < t.length; o++)
                                    n[o] = t.charCodeAt(o);
                                t = n.buffer, e[0] = 0
                            }
                            for (var s = t instanceof ArrayBuffer ? t.byteLength : t.size, i = s.toString(), a = new Uint8Array(i.length + 1), o = 0; o < i.length; o++)
                                a[o] = parseInt(i[o]);
                            if (a[i.length] = 255, x) {
                                var c = new x([e.buffer, a.buffer, t]);
                                r(null, c)
                            }
                        })
                    }
                    c(t, n, function(t, e) {
                        return r(new x(e))
                    })
                }, e.decodePayloadAsBinary = function(t, r, n) {
                    "function" == typeof r && (n = r, r = null);
                    for (var o = t, s = []; o.byteLength > 0;) {
                        for (var i = new Uint8Array(o), a = 0 === i[0], c = "", u = 1; 255 !== i[u]; u++) {
                            if (c.length > 310)
                                return n(w, 0, 1);
                            c += i[u]
                        }
                        o = f(o, 2 + c.length), c = parseInt(c);
                        var p = f(o, 0, c);
                        if (a)
                            try {
                                p = String.fromCharCode.apply(null, new Uint8Array(p))
                            } catch (h) {
                                var l = new Uint8Array(p);
                                p = "";
                                for (var u = 0; u < l.length; u++)
                                    p += String.fromCharCode(l[u])
                            }
                        s.push(p), o = f(o, c)
                    }
                    var d = s.length;
                    s.forEach(function(t, o) {
                        n(e.decodePacket(t, r, !0), o, d)
                    })
                }
            }).call(e, function() {
                return this
            }())
        }, function(t, e) {
            t.exports = Object.keys || function(t) {
                var e = [],
                    r = Object.prototype.hasOwnProperty;
                for (var n in t)
                    r.call(t, n) && e.push(n);
                return e
            }
        }, function(t, e, r) {
            (function(e) {
                function n(t) {
                    if (!t || "object" != typeof t)
                        return !1;
                    if (o(t)) {
                        for (var r = 0, s = t.length; r < s; r++)
                            if (n(t[r]))
                                return !0;
                        return !1
                    }
                    if ("function" == typeof e.Buffer && e.Buffer.isBuffer && e.Buffer.isBuffer(t) || "function" == typeof e.ArrayBuffer && t instanceof ArrayBuffer || "function" == typeof e.Blob && t instanceof Blob || "function" == typeof e.File && t instanceof File)
                        return !0;
                    if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length)
                        return n(t.toJSON(), !0);
                    for (var i in t)
                        if (Object.prototype.hasOwnProperty.call(t, i) && n(t[i]))
                            return !0;
                    return !1
                }
                var o = r(12);
                t.exports = n
            }).call(e, function() {
                return this
            }())
        }, function(t, e) {
            var r = {}.toString;
            t.exports = Array.isArray || function(t) {
                return "[object Array]" == r.call(t)
            }
        }, function(t, e) {
            t.exports = function(t, e, r) {
                var n = t.byteLength;
                if (e = e || 0, r = r || n, t.slice)
                    return t.slice(e, r);
                if (e < 0 && (e += n), r < 0 && (r += n), r > n && (r = n), e >= n || e >= r || 0 === n)
                    return new ArrayBuffer(0);
                for (var o = new Uint8Array(t), s = new Uint8Array(r - e), i = e, a = 0; i < r; i++, a++)
                    s[a] = o[i];
                return s.buffer
            }
        }, function(t, e) {
            function r(t, e, r) {
                function o(t, n) {
                    if (o.count <= 0)
                        throw new Error("after called too many times");
                    --o.count, t ? (s = !0, e(t), e = r) : 0 !== o.count || s || e(null, n)
                }
                var s = !1;
                return r = r || n, o.count = t, 0 === t ? e() : o
            }
            function n() {}
            t.exports = r
        }, function(t, e, r) {
            var n;
            (function(t, o) {
                !function(s) {
                    function i(t) {
                        for (var e, r, n = [], o = 0, s = t.length; o < s;)
                            e = t.charCodeAt(o++), e >= 55296 && e <= 56319 && o < s ? (r = t.charCodeAt(o++), 56320 == (64512 & r) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e), o--)) : n.push(e);
                        return n
                    }
                    function a(t) {
                        for (var e, r = t.length, n = -1, o = ""; ++n < r;)
                            e = t[n], e > 65535 && (e -= 65536, o += w(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), o += w(e);
                        return o
                    }
                    function c(t, e) {
                        if (t >= 55296 && t <= 57343) {
                            if (e)
                                throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value");
                            return !1
                        }
                        return !0
                    }
                    function u(t, e) {
                        return w(t >> e & 63 | 128)
                    }
                    function p(t, e) {
                        if (0 == (4294967168 & t))
                            return w(t);
                        var r = "";
                        return 0 == (4294965248 & t) ? r = w(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (c(t, e) || (t = 65533), r = w(t >> 12 & 15 | 224), r += u(t, 6)) : 0 == (4292870144 & t) && (r = w(t >> 18 & 7 | 240), r += u(t, 12), r += u(t, 6)), r += w(63 & t | 128)
                    }
                    function h(t, e) {
                        e = e || {};
                        for (var r, n = !1 !== e.strict, o = i(t), s = o.length, a = -1, c = ""; ++a < s;)
                            r = o[a], c += p(r, n);
                        return c
                    }
                    function f() {
                        if (b >= v)
                            throw Error("Invalid byte index");
                        var t = 255 & m[b];
                        if (b++, 128 == (192 & t))
                            return 63 & t;
                        throw Error("Invalid continuation byte")
                    }
                    function l(t) {
                        var e,
                            r,
                            n,
                            o,
                            s;
                        if (b > v)
                            throw Error("Invalid byte index");
                        if (b == v)
                            return !1;
                        if (e = 255 & m[b], b++, 0 == (128 & e))
                            return e;
                        if (192 == (224 & e)) {
                            if (r = f(), s = (31 & e) << 6 | r, s >= 128)
                                return s;
                            throw Error("Invalid continuation byte")
                        }
                        if (224 == (240 & e)) {
                            if (r = f(), n = f(), s = (15 & e) << 12 | r << 6 | n, s >= 2048)
                                return c(s, t) ? s : 65533;
                            throw Error("Invalid continuation byte")
                        }
                        if (240 == (248 & e) && (r = f(), n = f(), o = f(), s = (7 & e) << 18 | r << 12 | n << 6 | o, s >= 65536 && s <= 1114111))
                            return s;
                        throw Error("Invalid UTF-8 detected")
                    }
                    function d(t, e) {
                        e = e || {};
                        var r = !1 !== e.strict;
                        m = i(t), v = m.length, b = 0;
                        for (var n, o = []; (n = l(r)) !== !1;)
                            o.push(n);
                        return a(o)
                    }
                    var y = "object" == typeof e && e,
                        g = ("object" == typeof t && t && t.exports == y && t, "object" == typeof o && o);
                    g.global !== g && g.window !== g || (s = g);
                    var m,
                        v,
                        b,
                        w = String.fromCharCode,
                        x = {
                            version: "2.1.2",
                            encode: h,
                            decode: d
                        };
                    n = function() {
                        return x
                    }.call(e, r, e, t), !(void 0 !== n && (t.exports = n))
                }(this)
            }).call(e, r(16)(t), function() {
                return this
            }())
        }, function(t, e) {
            t.exports = function(t) {
                return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children = [], t.webpackPolyfill = 1), t
            }
        }, function(t, e) {
            !function() {
                "use strict";
                for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = new Uint8Array(256), n = 0; n < t.length; n++)
                    r[t.charCodeAt(n)] = n;
                e.encode = function(e) {
                    var r,
                        n = new Uint8Array(e),
                        o = n.length,
                        s = "";
                    for (r = 0; r < o; r += 3)
                        s += t[n[r] >> 2], s += t[(3 & n[r]) << 4 | n[r + 1] >> 4], s += t[(15 & n[r + 1]) << 2 | n[r + 2] >> 6], s += t[63 & n[r + 2]];
                    return o % 3 === 2 ? s = s.substring(0, s.length - 1) + "=" : o % 3 === 1 && (s = s.substring(0, s.length - 2) + "=="), s
                }, e.decode = function(t) {
                    var e,
                        n,
                        o,
                        s,
                        i,
                        a = .75 * t.length,
                        c = t.length,
                        u = 0;
                    "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
                    var p = new ArrayBuffer(a),
                        h = new Uint8Array(p);
                    for (e = 0; e < c; e += 4)
                        n = r[t.charCodeAt(e)], o = r[t.charCodeAt(e + 1)], s = r[t.charCodeAt(e + 2)], i = r[t.charCodeAt(e + 3)], h[u++] = n << 2 | o >> 4, h[u++] = (15 & o) << 4 | s >> 2, h[u++] = (3 & s) << 6 | 63 & i;
                    return p
                }
            }()
        }, function(t, e) {
            (function(e) {
                function r(t) {
                    for (var e = 0; e < t.length; e++) {
                        var r = t[e];
                        if (r.buffer instanceof ArrayBuffer) {
                            var n = r.buffer;
                            if (r.byteLength !== n.byteLength) {
                                var o = new Uint8Array(r.byteLength);
                                o.set(new Uint8Array(n, r.byteOffset, r.byteLength)), n = o.buffer
                            }
                            t[e] = n
                        }
                    }
                }
                function n(t, e) {
                    e = e || {};
                    var n = new s;
                    r(t);
                    for (var o = 0; o < t.length; o++)
                        n.append(t[o]);
                    return e.type ? n.getBlob(e.type) : n.getBlob()
                }
                function o(t, e) {
                    return r(t), new Blob(t, e || {})
                }
                var s = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder,
                    i = function() {
                        try {
                            var t = new Blob(["hi"]);
                            return 2 === t.size
                        } catch (e) {
                            return !1
                        }
                    }(),
                    a = i && function() {
                        try {
                            var t = new Blob([new Uint8Array([1, 2])]);
                            return 2 === t.size
                        } catch (e) {
                            return !1
                        }
                    }(),
                    c = s && s.prototype.append && s.prototype.getBlob;
                t.exports = function() {
                    return i ? a ? e.Blob : o : c ? n : void 0
                }()
            }).call(e, function() {
                return this
            }())
        }, function(t, e, r) {
            function n(t) {
                if (t)
                    return o(t)
            }
            function o(t) {
                for (var e in n.prototype)
                    t[e] = n.prototype[e];
                return t
            }
            t.exports = n, n.prototype.on = n.prototype.addEventListener = function(t, e) {
                return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
            }, n.prototype.once = function(t, e) {
                function r() {
                    this.off(t, r), e.apply(this, arguments)
                }
                return r.fn = e, this.on(t, r), this
            }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(t, e) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length)
                    return this._callbacks = {}, this;
                var r = this._callbacks["$" + t];
                if (!r)
                    return this;
                if (1 == arguments.length)
                    return delete this._callbacks["$" + t], this;
                for (var n, o = 0; o < r.length; o++)
                    if (n = r[o], n === e || n.fn === e) {
                        r.splice(o, 1);
                        break
                    }
                return this
            }, n.prototype.emit = function(t) {
                this._callbacks = this._callbacks || {};
                var e = [].slice.call(arguments, 1),
                    r = this._callbacks["$" + t];
                if (r) {
                    r = r.slice(0);
                    for (var n = 0, o = r.length; n < o; ++n)
                        r[n].apply(this, e)
                }
                return this
            }, n.prototype.listeners = function(t) {
                return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
            }, n.prototype.hasListeners = function(t) {
                return !!this.listeners(t).length
            }
        }, function(t, e) {
            e.encode = function(t) {
                var e = "";
                for (var r in t)
                    t.hasOwnProperty(r) && (e.length && (e += "&"), e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
                return e
            }, e.decode = function(t) {
                for (var e = {}, r = t.split("&"), n = 0, o = r.length; n < o; n++) {
                    var s = r[n].split("=");
                    e[decodeURIComponent(s[0])] = decodeURIComponent(s[1])
                }
                return e
            }
        }, function(t, e) {
            t.exports = function(t, e) {
                var r = function() {};
                r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
            }
        }, function(t, e) {
            "use strict";
            function r(t) {
                var e = "";
                do e = i[t % a] + e, t = Math.floor(t / a);
                while (t > 0);
                return e
            }
            function n(t) {
                var e = 0;
                for (p = 0; p < t.length; p++)
                    e = e * a + c[t.charAt(p)];
                return e
            }
            function o() {
                var t = r(+new Date);
                return t !== s ? (u = 0, s = t) : t + "." + r(u++)
            }
            for (var s, i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), a = 64, c = {}, u = 0, p = 0; p < a; p++)
                c[i[p]] = p;
            o.encode = r, o.decode = n, t.exports = o
        }, function(t, e, r) {
            (function(n) {
                function o() {
                    return "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
                }
                function s() {
                    var t = arguments,
                        r = this.useColors;
                    if (t[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + t[0] + (r ? "%c " : " ") + "+" + e.humanize(this.diff), !r)
                        return t;
                    var n = "color: " + this.color;
                    t = [t[0], n, "color: inherit"].concat(Array.prototype.slice.call(t, 1));
                    var o = 0,
                        s = 0;
                    return t[0].replace(/%[a-z%]/g, function(t) {
                        "%%" !== t && (o++, "%c" === t && (s = o))
                    }), t.splice(s, 0, n), t
                }
                function i() {
                    return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                }
                function a(t) {
                    try {
                        null == t ? e.storage.removeItem("debug") : e.storage.debug = t
                    } catch (r) {}
                }
                function c() {
                    try {
                        return e.storage.debug
                    } catch (t) {}
                    if ("undefined" != typeof n && "env" in n)
                        return n.env.DEBUG
                }
                function u() {
                    try {
                        return window.localStorage
                    } catch (t) {}
                }
                e = t.exports = r(25), e.log = i, e.formatArgs = s, e.save = a, e.load = c, e.useColors = o, e.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : u(), e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], e.formatters.j = function(t) {
                    try {
                        return JSON.stringify(t)
                    } catch (e) {
                        return "[UnexpectedJSONParseError]: " + e.message
                    }
                }, e.enable(c())
            }).call(e, r(24))
        }, function(t, e) {
            function r() {
                throw new Error("setTimeout has not been defined")
            }
            function n() {
                throw new Error("clearTimeout has not been defined")
            }
            function o(t) {
                if (p === setTimeout)
                    return setTimeout(t, 0);
                if ((p === r || !p) && setTimeout)
                    return p = setTimeout, setTimeout(t, 0);
                try {
                    return p(t, 0)
                } catch (e) {
                    try {
                        return p.call(null, t, 0)
                    } catch (e) {
                        return p.call(this, t, 0)
                    }
                }
            }
            function s(t) {
                if (h === clearTimeout)
                    return clearTimeout(t);
                if ((h === n || !h) && clearTimeout)
                    return h = clearTimeout, clearTimeout(t);
                try {
                    return h(t)
                } catch (e) {
                    try {
                        return h.call(null, t)
                    } catch (e) {
                        return h.call(this, t)
                    }
                }
            }
            function i() {
                y && l && (y = !1, l.length ? d = l.concat(d) : g = -1, d.length && a())
            }
            function a() {
                if (!y) {
                    var t = o(i);
                    y = !0;
                    for (var e = d.length; e;) {
                        for (l = d, d = []; ++g < e;)
                            l && l[g].run();
                        g = -1, e = d.length
                    }
                    l = null, y = !1, s(t)
                }
            }
            function c(t, e) {
                this.fun = t, this.array = e
            }
            function u() {}
            var p,
                h,
                f = t.exports = {};
            !function() {
                try {
                    p = "function" == typeof setTimeout ? setTimeout : r
                } catch (t) {
                    p = r
                }
                try {
                    h = "function" == typeof clearTimeout ? clearTimeout : n
                } catch (t) {
                    h = n
                }
            }();
            var l,
                d = [],
                y = !1,
                g = -1;
            f.nextTick = function(t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var r = 1; r < arguments.length; r++)
                        e[r - 1] = arguments[r];
                d.push(new c(t, e)), 1 !== d.length || y || o(a)
            }, c.prototype.run = function() {
                this.fun.apply(null, this.array)
            }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {}, f.on = u, f.addListener = u, f.once = u, f.off = u, f.removeListener = u, f.removeAllListeners = u, f.emit = u, f.binding = function(t) {
                throw new Error("process.binding is not supported")
            }, f.cwd = function() {
                return "/"
            }, f.chdir = function(t) {
                throw new Error("process.chdir is not supported")
            }, f.umask = function() {
                return 0
            }
        }, function(t, e, r) {
            function n() {
                return e.colors[p++ % e.colors.length]
            }
            function o(t) {
                function r() {}
                function o() {
                    var t = o,
                        r = +new Date,
                        s = r - (u || r);
                    t.diff = s, t.prev = u, t.curr = r, u = r, null == t.useColors && (t.useColors = e.useColors()), null == t.color && t.useColors && (t.color = n());
                    for (var i = new Array(arguments.length), a = 0; a < i.length; a++)
                        i[a] = arguments[a];
                    i[0] = e.coerce(i[0]), "string" != typeof i[0] && (i = ["%o"].concat(i));
                    var c = 0;
                    i[0] = i[0].replace(/%([a-z%])/g, function(r, n) {
                        if ("%%" === r)
                            return r;
                        c++;
                        var o = e.formatters[n];
                        if ("function" == typeof o) {
                            var s = i[c];
                            r = o.call(t, s), i.splice(c, 1), c--
                        }
                        return r
                    }), i = e.formatArgs.apply(t, i);
                    var p = o.log || e.log || console.log.bind(console);
                    p.apply(t, i)
                }
                r.enabled = !1, o.enabled = !0;
                var s = e.enabled(t) ? o : r;
                return s.namespace = t, s
            }
            function s(t) {
                e.save(t);
                for (var r = (t || "").split(/[\s,]+/), n = r.length, o = 0; o < n; o++)
                    r[o] && (t = r[o].replace(/[\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, ".*?"), "-" === t[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")))
            }
            function i() {
                e.enable("")
            }
            function a(t) {
                var r,
                    n;
                for (r = 0, n = e.skips.length; r < n; r++)
                    if (e.skips[r].test(t))
                        return !1;
                for (r = 0, n = e.names.length; r < n; r++)
                    if (e.names[r].test(t))
                        return !0;
                return !1
            }
            function c(t) {
                return t instanceof Error ? t.stack || t.message : t
            }
            e = t.exports = o.debug = o, e.coerce = c, e.disable = i, e.enable = s, e.enabled = a, e.humanize = r(26), e.names = [], e.skips = [], e.formatters = {};
            var u,
                p = 0
        }, function(t, e) {
            function r(t) {
                if (t = String(t), !(t.length > 1e4)) {
                    var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
                    if (e) {
                        var r = parseFloat(e[1]),
                            n = (e[2] || "ms").toLowerCase();
                        switch (n) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return r * p;
                        case "days":
                        case "day":
                        case "d":
                            return r * u;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return r * c;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return r * a;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return r * i;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return r;
                        default:
                            return
                        }
                    }
                }
            }
            function n(t) {
                return t >= u ? Math.round(t / u) + "d" : t >= c ? Math.round(t / c) + "h" : t >= a ? Math.round(t / a) + "m" : t >= i ? Math.round(t / i) + "s" : t + "ms"
            }
            function o(t) {
                return s(t, u, "day") || s(t, c, "hour") || s(t, a, "minute") || s(t, i, "second") || t + " ms"
            }
            function s(t, e, r) {
                if (!(t < e))
                    return t < 1.5 * e ? Math.floor(t / e) + " " + r : Math.ceil(t / e) + " " + r + "s"
            }
            var i = 1e3,
                a = 60 * i,
                c = 60 * a,
                u = 24 * c,
                p = 365.25 * u;
            t.exports = function(t, e) {
                e = e || {};
                var s = typeof t;
                if ("string" === s && t.length > 0)
                    return r(t);
                if ("number" === s && isNaN(t) === !1)
                    return e["long"] ? o(t) : n(t);
                throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t))
            }
        }, function(t, e, r) {
            (function(e) {
                "use strict";
                function n() {}
                function o(t) {
                    s.call(this, t), this.query = this.query || {}, a || (e.___eio || (e.___eio = []), a = e.___eio), this.index = a.length;
                    var r = this;
                    a.push(function(t) {
                        r.onData(t)
                    }), this.query.j = this.index, e.document && e.addEventListener && e.addEventListener("beforeunload", function() {
                        r.script && (r.script.onerror = n)
                    }, !1)
                }
                var s = r(7),
                    i = r(21);
                t.exports = o;
                var a,
                    c = /\n/g,
                    u = /\\n/g;
                i(o, s), o.prototype.supportsBinary = !1, o.prototype.doClose = function() {
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), s.prototype.doClose.call(this)
                }, o.prototype.doPoll = function() {
                    var t = this,
                        e = document.createElement("script");
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), e.async = !0, e.src = this.uri(), e.onerror = function(e) {
                        t.onError("jsonp poll error", e)
                    };
                    var r = document.getElementsByTagName("script")[0];
                    r ? r.parentNode.insertBefore(e, r) : (document.head || document.body).appendChild(e), this.script = e;
                    var n = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                    n && setTimeout(function() {
                        var t = document.createElement("iframe");
                        document.body.appendChild(t), document.body.removeChild(t)
                    }, 100)
                }, o.prototype.doWrite = function(t, e) {
                    function r() {
                        n(), e()
                    }
                    function n() {
                        if (o.iframe)
                            try {
                                o.form.removeChild(o.iframe)
                            } catch (t) {
                                o.onError("jsonp polling iframe removal error", t)
                            }
                        try {
                            var e = '<iframe src="javascript:0" name="' + o.iframeId + '">';
                            s = document.createElement(e)
                        } catch (t) {
                            s = document.createElement("iframe"), s.name = o.iframeId, s.src = "javascript:0"
                        }
                        s.id = o.iframeId, o.form.appendChild(s), o.iframe = s
                    }
                    var o = this;
                    if (!this.form) {
                        var s,
                            i = document.createElement("form"),
                            a = document.createElement("textarea"),
                            p = this.iframeId = "eio_iframe_" + this.index;
                        i.className = "socketio", i.style.position = "absolute", i.style.top = "-1000px", i.style.left = "-1000px", i.target = p, i.method = "POST", i.setAttribute("accept-charset", "utf-8"), a.name = "d", i.appendChild(a), document.body.appendChild(i), this.form = i, this.area = a
                    }
                    this.form.action = this.uri(), n(), t = t.replace(u, "\\\n"), this.area.value = t.replace(c, "\\n");
                    try {
                        this.form.submit()
                    } catch (h) {}
                    this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                        "complete" === o.iframe.readyState && r()
                    } : this.iframe.onload = r
                }
            }).call(e, function() {
                return this
            }())
        }, function(t, e, r) {
            (function(e) {
                "use strict";
                function n(t) {
                    var e = t && t.forceBase64;
                    e && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, this.usingBrowserWebSocket = h && !t.forceNode, this.protocols = t.protocols, this.usingBrowserWebSocket || (l = o), s.call(this, t)
                }
                var o,
                    s = r(8),
                    i = r(9),
                    a = r(20),
                    c = r(21),
                    u = r(22),
                    p = r(23)("engine.io-client:websocket"),
                    h = e.WebSocket || e.MozWebSocket;
                if ("undefined" == typeof window)
                    try {
                        o = r(29)
                    } catch (f) {}
                var l = h;
                l || "undefined" != typeof window || (l = o), t.exports = n, c(n, s), n.prototype.name = "websocket", n.prototype.supportsBinary = !0, n.prototype.doOpen = function() {
                    if (this.check()) {
                        var t = this.uri(),
                            e = this.protocols,
                            r = {
                                agent: this.agent,
                                perMessageDeflate: this.perMessageDeflate
                            };
                        r.pfx = this.pfx, r.key = this.key, r.passphrase = this.passphrase, r.cert = this.cert, r.ca = this.ca, r.ciphers = this.ciphers, r.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (r.headers = this.extraHeaders), this.localAddress && (r.localAddress = this.localAddress);
                        try {
                            this.ws = this.usingBrowserWebSocket ? e ? new l(t, e) : new l(t) : new l(t, e, r)
                        } catch (n) {
                            return this.emit("error", n)
                        }
                        void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
                    }
                }, n.prototype.addEventListeners = function() {
                    var t = this;
                    this.ws.onopen = function() {
                        t.onOpen()
                    }, this.ws.onclose = function() {
                        t.onClose()
                    }, this.ws.onmessage = function(e) {
                        t.onData(e.data)
                    }, this.ws.onerror = function(e) {
                        t.onError("websocket error", e)
                    }
                }, n.prototype.write = function(t) {
                    function r() {
                        n.emit("flush"), setTimeout(function() {
                            n.writable = !0, n.emit("drain")
                        }, 0)
                    }
                    var n = this;
                    this.writable = !1;
                    for (var o = t.length, s = 0, a = o; s < a; s++)
                        !function(t) {
                            i.encodePacket(t, n.supportsBinary, function(s) {
                                if (!n.usingBrowserWebSocket) {
                                    var i = {};
                                    if (t.options && (i.compress = t.options.compress), n.perMessageDeflate) {
                                        var a = "string" == typeof s ? e.Buffer.byteLength(s) : s.length;
                                        a < n.perMessageDeflate.threshold && (i.compress = !1)
                                    }
                                }
                                try {
                                    n.usingBrowserWebSocket ? n.ws.send(s) : n.ws.send(s, i)
                                } catch (c) {
                                    p("websocket closed before onclose event")
                                }
                                --o || r()
                            })
                        }(t[s])
                }, n.prototype.onClose = function() {
                    s.prototype.onClose.call(this)
                }, n.prototype.doClose = function() {
                    "undefined" != typeof this.ws && this.ws.close()
                }, n.prototype.uri = function() {
                    var t = this.query || {},
                        e = this.secure ? "wss" : "ws",
                        r = "";
                    this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (r = ":" + this.port), this.timestampRequests && (t[this.timestampParam] = u()), this.supportsBinary || (t.b64 = 1), t = a.encode(t), t.length && (t = "?" + t);
                    var n = this.hostname.indexOf(":") !== -1;
                    return e + "://" + (n ? "[" + this.hostname + "]" : this.hostname) + r + this.path + t
                }, n.prototype.check = function() {
                    return !(!l || "__initialize" in l && this.name === n.prototype.name)
                }
            }).call(e, function() {
                return this
            }())
        }, function(t, e) {}, function(t, e) {
            var r = [].indexOf;
            t.exports = function(t, e) {
                if (r)
                    return t.indexOf(e);
                for (var n = 0; n < t.length; ++n)
                    if (t[n] === e)
                        return n;
                return -1
            }
        }, function(t, e) {
            var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                n = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            t.exports = function(t) {
                var e = t,
                    o = t.indexOf("["),
                    s = t.indexOf("]");
                o != -1 && s != -1 && (t = t.substring(0, o) + t.substring(o, s).replace(/:/g, ";") + t.substring(s, t.length));
                for (var i = r.exec(t || ""), a = {}, c = 14; c--;)
                    a[n[c]] = i[c] || "";
                return o != -1 && s != -1 && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a
            }
        }, function(t, e) {
            (function(e) {
                var r = /^[\],:{}\s]*$/,
                    n = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    s = /(?:^|:|,)(?:\s*\[)+/g,
                    i = /^\s+/,
                    a = /\s+$/;
                t.exports = function(t) {
                    return "string" == typeof t && t ? (t = t.replace(i, "").replace(a, ""), e.JSON && JSON.parse ? JSON.parse(t) : r.test(t.replace(n, "@").replace(o, "]").replace(s, "")) ? new Function("return " + t)() : void 0) : null
                }
            }).call(e, function() {
                return this
            }())
        }])
    });
})();
(function(ns) {
    var CLIENT_VERSION = "2.5.5";
    var CLIENT_TYPE = "WEB";
    ns.wrapper = function(goog, wd) {
        var h = this;
        function aa() {}
        function k(a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array)
                        return "array";
                    if (a instanceof Object)
                        return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c)
                        return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                        return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                        return "function"
                } else
                    return "null";
            else if ("function" ==
            b && "undefined" == typeof a.call)
                return "object";
            return b
        }
        function l(a) {
            return "string" == typeof a
        }
        function n(a) {
            return "function" == k(a)
        }
        function ba(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        }
        function ca(a, b, c) {
            return a.call.apply(a.bind, arguments)
        }
        function da(a, b, c) {
            if (!a)
                throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        }
        function p(a, b, c) {
            p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ca : da;
            return p.apply(null, arguments)
        }
        var ea = Date.now || function() {
            return +new Date
        };
        function fa(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.sb = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.pb = function(a, c, f) {
                for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++)
                    d[e - 2] = arguments[e];
                return b.prototype[c].apply(a, d)
            }
        }
        ;
        function ha(a) {
            return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
        }
        function ia(a) {
            a = String(a);
            if (ha(a))
                try {
                    return eval("(" + a + ")")
                } catch (b) {}
            throw Error("Invalid JSON string: " + a);
        }
        function ja() {
            this.aa = void 0
        }
        function ka(a, b, c) {
            if (null == b)
                c.push("null");
            else {
                if ("object" == typeof b) {
                    if ("array" == k(b)) {
                        var d = b;
                        b = d.length;
                        c.push("[");
                        for (var e = "", f = 0; f < b; f++)
                            c.push(e), e = d[f], ka(a, a.aa ? a.aa.call(d, String(f), e) : e, c), e = ",";
                        c.push("]");
                        return
                    }
                    if (b instanceof String || b instanceof Number || b instanceof Boolean)
                        b = b.valueOf();
                    else {
                        c.push("{");
                        f = "";
                        for (d in b)
                            Object.prototype.hasOwnProperty.call(b, d) && (e = b[d], "function" != typeof e && (c.push(f), la(d, c), c.push(":"), ka(a, a.aa ? a.aa.call(b, d, e) : e, c), f = ","));
                        c.push("}");
                        return
                    }
                }
                switch (typeof b) {
                case "string":
                    la(b,
                    c);
                    break;
                case "number":
                    c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                    break;
                case "boolean":
                    c.push(String(b));
                    break;
                case "function":
                    c.push("null");
                    break;
                default:
                    throw Error("Unknown type: " + typeof b);
                }
            }
        }
        var ma = {
                '"': '\\"',
                "\\": "\\\\",
                "/": "\\/",
                "\b": "\\b",
                "\f": "\\f",
                "\n": "\\n",
                "\r": "\\r",
                "\t": "\\t",
                "\x0B": "\\u000b"
            },
            na = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
        function la(a, b) {
            b.push('"', a.replace(na, function(a) {
                var b = ma[a];
                b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), ma[a] = b);
                return b
            }), '"')
        }
        ;
        function q(a) {
            return "undefined" !== typeof JSON && void 0 !== JSON.parse ? JSON.parse(a) : ia(a)
        }
        function oa(a) {
            if ("undefined" !== typeof JSON && void 0 !== JSON.stringify)
                a = JSON.stringify(a);
            else {
                var b = [];
                ka(new ja, a, b);
                a = b.join("")
            }
            return a
        }
        ;
        function r(a) {
            if (Error.captureStackTrace)
                Error.captureStackTrace(this, r);
            else {
                var b = Error().stack;
                b && (this.stack = b)
            }
            a && (this.message = String(a))
        }
        fa(r, Error);
        r.prototype.name = "CustomError";
        function pa() {
            return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ ea()).toString(36)
        }
        ;
        var qa = Array.prototype.indexOf ? function(a, b, c) {
                return Array.prototype.indexOf.call(a, b, c)
            } : function(a, b, c) {
                c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
                if (l(a))
                    return l(b) && 1 == b.length ? a.indexOf(b, c) : -1;
                for (; c < a.length; c++)
                    if (c in a && a[c] === b)
                        return c;
                return -1
            },
            ra = Array.prototype.forEach ? function(a, b, c) {
                Array.prototype.forEach.call(a, b, c)
            } : function(a, b, c) {
                for (var d = a.length, e = l(a) ? a.split("") : a, f = 0; f < d; f++)
                    f in e && b.call(c, e[f], f, a)
            },
            sa = Array.prototype.filter ? function(a, b, c) {
                return Array.prototype.filter.call(a,
                b, c)
            } : function(a, b, c) {
                for (var d = a.length, e = [], f = 0, g = l(a) ? a.split("") : a, m = 0; m < d; m++)
                    if (m in g) {
                        var v = g[m];
                        b.call(c, v, m, a) && (e[f++] = v)
                    }
                return e
            },
            ta = Array.prototype.map ? function(a, b, c) {
                return Array.prototype.map.call(a, b, c)
            } : function(a, b, c) {
                for (var d = a.length, e = Array(d), f = l(a) ? a.split("") : a, g = 0; g < d; g++)
                    g in f && (e[g] = b.call(c, f[g], g, a));
                return e
            };
        function ua(a, b) {
            var c;
            a:
            {
                c = a.length;
                for (var d = l(a) ? a.split("") : a, e = 0; e < c; e++)
                    if (e in d && b.call(void 0, d[e], e, a)) {
                        c = e;
                        break a
                    }
                c = -1
            }return 0 > c ? null : l(a) ? a.charAt(c) : a[c]
        }
        function va(a, b) {
            a.sort(b || wa)
        }
        function wa(a, b) {
            return a > b ? 1 : a < b ? -1 : 0
        }
        ;
        var t;
        a:
        {
            var xa = h.navigator;
            if (xa) {
                var ya = xa.userAgent;
                if (ya) {
                    t = ya;
                    break a
                }
            }
            t = ""
        };
        var za = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
        function Aa(a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d)
                    a[c] = d[c];
                for (var f = 0; f < za.length; f++)
                    c = za[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        }
        ;
        var Ba = null,
            Ca = null;
        function Da(a) {
            var b = "";
            Ea(a, function(a) {
                b += String.fromCharCode(a)
            });
            return b
        }
        function Ea(a, b) {
            function c(b) {
                for (; d < a.length;) {
                    var c = a.charAt(d++),
                        e = Ca[c];
                    if (null != e)
                        return e;
                    if (!/^[\s\xa0]*$/.test(c))
                        throw Error("Unknown base64 encoding at char: " + c);
                }
                return b
            }
            Fa();
            for (var d = 0;;) {
                var e = c(-1),
                    f = c(0),
                    g = c(64),
                    m = c(64);
                if (64 === m && -1 === e)
                    break;
                b(e << 2 | f >> 4);
                64 != g && (b(f << 4 & 240 | g >> 2), 64 != m && b(g << 6 & 192 | m))
            }
        }
        function Fa() {
            if (!Ba) {
                Ba = {};
                Ca = {};
                for (var a = 0; 65 > a; a++)
                    Ba[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), Ca[Ba[a]] = a, 62 <= a && (Ca["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)] = a)
            }
        }
        ;
        function Ga(a, b) {
            if (!a)
                throw Error("Wilddog (" + Wilddog.ja + ") INTERNAL ASSERT FAILED: " + b);
        }
        function Ha(a) {
            try {
                return "NODE" == CLIENT_TYPE ? (new Buffer(a, "base64")).toString("utf8") : "undefined" !== typeof atob ? atob(a) : Da(a)
            } catch (b) {
                !0 === Ia && (Ia = !1, !0 === u.get("logging_enabled") && Wilddog.qb(!0))
            }
            return null
        }
        function Ja(a) {
            for (var b = "", c = 0; c < arguments.length; c++)
                var d = arguments[c],
                    e = k(d),
                    b = "array" == e || "object" == e && "number" == typeof d.length ? b + Ja.apply(null, arguments[c]) : "object" === typeof arguments[c] ? b + oa(arguments[c]) : b + arguments[c],
                    b = b + " ";
            return b
        }
        var Ia = !0;
        function Ka(a) {
            if ("undefined" !== typeof console) {
                var b = "WILDDOG WARNING: " + Ja.apply(null, arguments);
                "undefined" !== typeof console.warn ? console.warn(b) : console.log(b)
            }
        }
        function La(a) {
            try {
                a()
            } catch (b) {
                setTimeout(function() {
                    Ka("Exception was thrown by user callback.", b.stack || "");
                    throw b;
                }, Math.floor(0))
            }
        }
        function w(a, b) {
            if (n(a)) {
                var c = Array.prototype.slice.call(arguments, 1).slice();
                La(function() {
                    a.apply(null, c)
                })
            }
        }
        ;
        function Ma(a) {
            Ga("array" == k(a) && 0 < a.length, "Requires a non-empty array");
            this.va = a;
            this.A = {}
        }
        Ma.prototype.eb = function(a, b) {
            for (var c = this.A[a] || [], d = 0; d < c.length; d++)
                if (c[d].ta) {
                    var e = c.splice(d, 1)[0];
                    e.U.apply(e.context, Array.prototype.slice.call(arguments, 1))
                } else
                    c[d].U.apply(c[d].context, Array.prototype.slice.call(arguments, 1))
        };
        function Na(a, b) {
            Ga(ua(a.va, function(a) {
                return a === b
            }), "Unknown event: " + b)
        }
        ;
        function y(a, b) {
            Ma.call(this, ["authStateChanged", "authTokenExpired"]);
            this.ua = {
                sa: !1
            };
            this.ka = {};
            Object.defineProperty(this, "name", {
                value: b,
                writable: !1
            });
            Object.defineProperty(this, "options", {
                value: a,
                writable: !1
            })
        }
        fa(y, Ma);
        function Oa(a, b) {
            y.prototype[a] = function() {
                return b(this)
            }
        }
        y.prototype.Da = function(a, b) {
            var c = !0,
                d;
            for (d in z)
                if (z.hasOwnProperty(d) && z[d] === a) {
                    c = !1;
                    break
                }
            if (c)
                throw Error("Unknown event " + a);
            this.ka[a] = b;
            switch (a) {
            case z.s:
                this.ua.sa = b && b.sa
            }
            this.eb(a, b)
        };
        y.prototype.emit = y.prototype.Da;
        y.prototype.ya = function(a, b) {
            Na(this, a);
            var c = Pa(this, a);
            c ? b.apply(void 0, [c]) : (this.A[a] = this.A[a] || [], this.A[a].push({
                U: b,
                context: void 0,
                ta: !0
            }))
        };
        y.prototype.bindOnce = y.prototype.ya;
        y.prototype.bind = function(a, b) {
            Na(this, a);
            this.A[a] = this.A[a] || [];
            this.A[a].push({
                U: b,
                context: void 0,
                ta: !1
            });
            var c = Pa(this, a);
            c && b.apply(void 0, [c])
        };
        y.prototype.bind = y.prototype.bind;
        y.prototype.fb = function(a, b) {
            Na(this, a);
            for (var c = this.A[a] || [], d = 0; d < c.length; d++)
                if (c[d].U === b) {
                    c.splice(d, 1);
                    break
                }
        };
        y.prototype.unbind = y.prototype.fb;
        function Pa(a, b) {
            switch (b) {
            case z.s:
                return a.ka[z.s]
            }
            return null
        }
        var z = {
            s: "authStateChanged",
            xa: "authTokenExpired"
        };
        y.prototype.F = z;
        function Qa(a, b, c, d, e, f) {
            this.uid = e;
            this.displayName = a;
            this.phone = f;
            this.email = b;
            this.photoURL = c;
            this.providerId = d
        }
        ;
        function Ra(a, b, c) {
            this.Ia = c;
            this.Ca = a;
            this.Pa = b;
            this.Y = 0;
            this.X = null
        }
        Ra.prototype.get = function() {
            var a;
            0 < this.Y ? (this.Y--, a = this.X, this.X = a.next, a.next = null) : a = this.Ca();
            return a
        };
        Ra.prototype.put = function(a) {
            this.Pa(a);
            this.Y < this.Ia && (this.Y++, a.next = this.X, this.X = a)
        };
        function Sa() {
            this.ca = this.K = null
        }
        var Ua = new Ra(function() {
            return new Ta
        }, function(a) {
            a.reset()
        }, 100);
        Sa.prototype.add = function(a, b) {
            var c = Ua.get();
            c.set(a, b);
            this.ca ? this.ca.next = c : this.K = c;
            this.ca = c
        };
        Sa.prototype.remove = function() {
            var a = null;
            this.K && (a = this.K, this.K = this.K.next, this.K || (this.ca = null), a.next = null);
            return a
        };
        function Ta() {
            this.next = this.scope = this.ga = null
        }
        Ta.prototype.set = function(a, b) {
            this.ga = a;
            this.scope = b;
            this.next = null
        };
        Ta.prototype.reset = function() {
            this.next = this.scope = this.ga = null
        };
        function Va(a) {
            h.setTimeout(function() {
                throw a;
            }, 0)
        }
        var Wa;
        function Xa() {
            var a = h.MessageChannel;
            "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && -1 == t.indexOf("Presto") && (a = function() {
                var a = document.createElement("IFRAME");
                a.style.display = "none";
                a.src = "";
                document.documentElement.appendChild(a);
                var b = a.contentWindow,
                    a = b.document;
                a.open();
                a.write("");
                a.close();
                var c = "callImmediate" + Math.random(),
                    d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
                    a = p(function(a) {
                        if (("*" == d || a.origin ==
                        d) && a.data == c)
                            this.port1.onmessage()
                    }, this);
                b.addEventListener("message", a, !1);
                this.port1 = {};
                this.port2 = {
                    postMessage: function() {
                        b.postMessage(c, d)
                    }
                }
            });
            if ("undefined" !== typeof a && -1 == t.indexOf("Trident") && -1 == t.indexOf("MSIE")) {
                var b = new a,
                    c = {},
                    d = c;
                b.port1.onmessage = function() {
                    if (void 0 !== c.next) {
                        c = c.next;
                        var a = c.ma;
                        c.ma = null;
                        a()
                    }
                };
                return function(a) {
                    d.next = {
                        ma: a
                    };
                    d = d.next;
                    b.port2.postMessage(0)
                }
            }
            return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function(a) {
                var b =
                document.createElement("SCRIPT");
                b.onreadystatechange = function() {
                    b.onreadystatechange = null;
                    b.parentNode.removeChild(b);
                    b = null;
                    a();
                    a = null
                };
                document.documentElement.appendChild(b)
            } : function(a) {
                h.setTimeout(a, 0)
            }
        }
        ;
        function Ya(a, b) {
            Za || $a();
            ab || (Za(), ab = !0);
            bb.add(a, b)
        }
        var Za;
        function $a() {
            var a = h.Promise;
            if (-1 != String(a).indexOf("[native code]")) {
                var b = a.resolve(void 0);
                Za = function() {
                    b.then(cb)
                }
            } else
                Za = function() {
                    var a = cb,
                        b;
                    !(b = !n(h.setImmediate)) && (b = h.Window && h.Window.prototype) && (b = -1 == t.indexOf("Edge") && h.Window.prototype.setImmediate == h.setImmediate);
                    b ? (Wa || (Wa = Xa()), Wa(a)) : h.setImmediate(a)
                }
        }
        var ab = !1,
            bb = new Sa;
        function cb() {
            for (var a; a = bb.remove();) {
                try {
                    a.ga.call(a.scope)
                } catch (b) {
                    Va(b)
                }
                Ua.put(a)
            }
            ab = !1
        }
        ;
        function A(a, b) {
            this.j = B;
            this.ra = void 0;
            this.H = this.u = this.D = null;
            this.W = this.ea = !1;
            if (a != aa)
                try {
                    var c = this;
                    a.call(b, function(a) {
                        C(c, db, a)
                    }, function(a) {
                        if (!(a instanceof D))
                            try {
                                if (a instanceof Error)
                                    throw a;
                                throw Error("Promise rejected.");
                            } catch (e) {}
                        C(c, E, a)
                    })
                } catch (d) {
                    C(this, E, d)
                }
        }
        var B = 0,
            db = 2,
            E = 3;
        function eb() {
            this.next = this.context = this.I = this.O = this.w = null;
            this.R = !1
        }
        eb.prototype.reset = function() {
            this.context = this.I = this.O = this.w = null;
            this.R = !1
        };
        var fb = new Ra(function() {
            return new eb
        }, function(a) {
            a.reset()
        }, 100);
        function gb(a, b, c) {
            var d = fb.get();
            d.O = a;
            d.I = b;
            d.context = c;
            return d
        }
        A.prototype.then = function(a, b, c) {
            return hb(this, n(a) ? a : null, n(b) ? b : null, c)
        };
        A.prototype.then = A.prototype.then;
        A.prototype.$goog_Thenable = !0;
        A.prototype.cb = function(a, b) {
            return hb(this, null, a, b)
        };
        A.prototype.cancel = function(a) {
            this.j == B && Ya(function() {
                var b = new D(a);
                ib(this, b)
            }, this)
        };
        function ib(a, b) {
            if (a.j == B)
                if (a.D) {
                    var c = a.D;
                    if (c.u) {
                        for (var d = 0, e = null, f = null, g = c.u; g && (g.R || (d++, g.w == a && (e = g), !(e && 1 < d))); g = g.next)
                            e || (f = g);
                        e && (c.j == B && 1 == d ? ib(c, b) : (f ? (d = f, d.next == c.H && (c.H = d), d.next = d.next.next) : jb(c), kb(c, e, E, b)))
                    }
                    a.D = null
                } else
                    C(a, E, b)
        }
        function lb(a, b) {
            a.u || a.j != db && a.j != E || mb(a);
            a.H ? a.H.next = b : a.u = b;
            a.H = b
        }
        function hb(a, b, c, d) {
            var e = gb(null, null, null);
            e.w = new A(function(a, g) {
                e.O = b ? function(c) {
                    try {
                        var e = b.call(d, c);
                        a(e)
                    } catch (x) {
                        g(x)
                    }
                } : a;
                e.I = c ? function(b) {
                    try {
                        var e = c.call(d, b);
                        void 0 === e && b instanceof D ? g(b) : a(e)
                    } catch (x) {
                        g(x)
                    }
                } : g
            });
            e.w.D = a;
            lb(a, e);
            return e.w
        }
        A.prototype.gb = function(a) {
            this.j = B;
            C(this, db, a)
        };
        A.prototype.hb = function(a) {
            this.j = B;
            C(this, E, a)
        };
        function C(a, b, c) {
            if (a.j == B) {
                a === c && (b = E, c = new TypeError("Promise cannot resolve to itself"));
                a.j = 1;
                var d;
                a:
                {
                    var e = c,
                        f = a.gb,
                        g = a.hb;
                    if (e instanceof A)
                        lb(e, gb(f || aa, g || null, a)), d = !0;
                    else {
                        var m;
                        if (e)
                            try {
                                m = !!e.$goog_Thenable
                            } catch (x) {
                                m = !1
                            }
                        else
                            m = !1;
                        if (m)
                            e.then(f, g, a), d = !0;
                        else {
                            if (ba(e))
                                try {
                                    var v = e.then;
                                    if (n(v)) {
                                        nb(e, v, f, g, a);
                                        d = !0;
                                        break a
                                    }
                                } catch (x) {
                                    g.call(a, x);
                                    d = !0;
                                    break a
                                }
                            d = !1
                        }
                    }
                }d || (a.ra = c, a.j = b, a.D = null, mb(a), b != E || c instanceof D || ob(a, c))
            }
        }
        function nb(a, b, c, d, e) {
            function f(a) {
                m || (m = !0, d.call(e, a))
            }
            function g(a) {
                m || (m = !0, c.call(e, a))
            }
            var m = !1;
            try {
                b.call(a, g, f)
            } catch (v) {
                f(v)
            }
        }
        function mb(a) {
            a.ea || (a.ea = !0, Ya(a.Ea, a))
        }
        function jb(a) {
            var b = null;
            a.u && (b = a.u, a.u = b.next, b.next = null);
            a.u || (a.H = null);
            return b
        }
        A.prototype.Ea = function() {
            for (var a; a = jb(this);)
                kb(this, a, this.j, this.ra);
            this.ea = !1
        };
        function kb(a, b, c, d) {
            if (c == E && b.I && !b.R)
                for (; a && a.W; a = a.D)
                    a.W = !1;
            if (b.w)
                b.w.D = null, pb(b, c, d);
            else
                try {
                    b.R ? b.O.call(b.context) : pb(b, c, d)
                } catch (e) {
                    qb.call(null, e)
                }
            fb.put(b)
        }
        function pb(a, b, c) {
            b == db ? a.O.call(a.context, c) : a.I && a.I.call(a.context, c)
        }
        function ob(a, b) {
            a.W = !0;
            Ya(function() {
                a.W && qb.call(null, b)
            })
        }
        var qb = Va;
        function D(a) {
            r.call(this, a)
        }
        fa(D, r);
        D.prototype.name = "cancel";
        var rb = "undefined" != typeof Promise ? Promise : "undefined" != typeof h.Promise ? h.Promise : A;
        h.setTimeout || (h.setTimeout = function() {
            setTimeout.apply(null, arguments)
        });
        A.prototype["catch"] = A.prototype.cb;
        function F() {
            var a = this;
            this.reject = this.resolve = null;
            this.b = new rb(function(b, c) {
                a.resolve = b;
                a.reject = c
            })
        }
        function G(a, b) {
            return function(c, d) {
                c ? a.reject(c) : a.resolve(d);
                n(b) && (a.b.then(void 0, aa), 1 === b.length ? b(c) : b(c, d))
            }
        }
        ;
        function H(a, b, c, d, e) {
            Qa.call(this, b.displayName, b.email, b.photoURL, b.providerId, b.uid, b.phone);
            this.isAnonymous = "anonymous" === this.providerId;
            this.emailVerified = !0 === c;
            this.phoneVerified = !0 === d;
            this.providerData = e || [];
            this.refreshToken = null;
            Object.defineProperty(this, "__authManager", {
                value: a,
                writable: !1
            })
        }
        fa(H, Qa);
        var I = ["wd", "User"],
            J = h;
        I[0] in J || !J.execScript || J.execScript("var " + I[0]);
        for (var K; I.length && (K = I.shift());)
            I.length || void 0 === H ? J = J[K] ? J[K] : J[K] = {} : J[K] = H;
        H.prototype["delete"] = function(a) {
            var b = new F;
            sb(this.__authManager, this.h(), G(b, a));
            return b.b
        };
        H.prototype["delete"] = H.prototype["delete"];
        H.prototype.h = function() {
            return (this.__authManager.l || null).idToken
        };
        H.prototype.getToken = H.prototype.h;
        H.prototype.ha = function() {
            return this.phone
        };
        H.prototype.getPhone = H.prototype.ha;
        H.prototype.link = function(a, b) {
            L("wilddog.User.link", 1, 2, arguments.length);
            M("wilddog.User.link", a);
            var c = a.provider,
                d = new F,
                e = {};
            e.idToken = this.h();
            "password" == c ? (e.email = a.email, e.password = a.password, tb(this.__authManager, e, G(d, b))) : (e.providerId = a.provider, e.accessToken = a.accessToken, e.openId = a.openId || "", e.authType = "link", N(this.__authManager, e, G(d, b)));
            return d.b
        };
        H.prototype.link = H.prototype.link;
        H.prototype.ib = function(a, b) {
            L("wilddog.User.unlink", 1, 2, arguments.length);
            O("wilddog.User.unlink", 1, a);
            var c = new F,
                d = this;
            ub(this.__authManager, "unlink", {
                idToken: this.h(),
                deleteProvider: [a]
            }, G(c, function(c, f) {
                f && (d.providerData = d.providerData.filter(function(b) {
                    if (b.providerId != a)
                        return b
                }), 0 === d.providerData.length && vb(d.__authManager));
                b && b(c, f)
            }));
            return c.b
        };
        H.prototype.unlink = H.prototype.ib;
        H.prototype.Ja = function(a, b) {
            L("wilddog.auth().signInWithPopup", 1, 2, arguments.length);
            M("wilddog.auth().signInWithPopup", a);
            var c = new F;
            wb(this.__authManager, a, {
                authType: "link",
                idToken: this.h()
            }, G(c, b));
            return c.b
        };
        H.prototype.linkWithPopup = H.prototype.Ja;
        H.prototype.Ka = function(a, b) {
            L("wilddog.auth().signInWithPopup", 1, 2, arguments.length);
            M("wilddog.auth().signInWithPopup", a);
            var c = new F;
            xb(this.__authManager, a, {
                authType: "link",
                idToken: this.h()
            }, G(c, b));
            return c.b
        };
        H.prototype.linkWithRedirect = H.prototype.Ka;
        H.prototype.mb = function(a, b) {
            L("wilddog.User.updateProfile", 1, 2, arguments.length);
            M("wilddog.User.updateProfile", a);
            var c = new F;
            a.idToken = this.h();
            ub(this.__authManager, "profile", a, G(c, b));
            return c.b
        };
        H.prototype.updateProfile = H.prototype.mb;
        H.prototype.jb = function(a, b) {
            L("wilddog.User.updateEmail", 1, 2, arguments.length);
            O("wilddog.User.updateEmail", 1, a);
            var c = new F;
            tb(this.__authManager, {
                email: a,
                idToken: this.h()
            }, G(c, b));
            return c.b
        };
        H.prototype.updateEmail = H.prototype.jb;
        H.prototype.lb = function(a, b) {
            L("wilddog.User.updatePhone", 1, 2, arguments.length);
            O("wilddog.User.updatePhone", 1, a);
            var c = new F;
            tb(this.__authManager, {
                phoneNumber: a,
                idToken: this.h()
            }, G(c, b));
            return c.b
        };
        H.prototype.updatePhone = H.prototype.lb;
        H.prototype.nb = function(a, b) {
            L("wilddog.User.verifiyPhone", 1, 2, arguments.length);
            O("wilddog.User.verifiyPhone", 1, a);
            var c = new F;
            yb(this.__authManager, {
                phoneNumber: this.ha(),
                smsCode: a
            }, G(c, b));
            return c.b
        };
        H.prototype.verifiyPhone = H.prototype.nb;
        H.prototype.kb = function(a, b) {
            L("wilddog.User.updatePassword", 1, 2, arguments.length);
            O("wilddog.User.updatePassword", 1, a);
            var c = new F;
            tb(this.__authManager, {
                password: a,
                idToken: this.h()
            }, G(c, b));
            return c.b
        };
        H.prototype.updatePassword = H.prototype.kb;
        H.prototype.Qa = function(a) {
            L("wilddog.User.sendEmailVerification", 0, 1, arguments.length);
            P("wilddog.User.sendEmailVerification", 1, a, !0);
            var b = new F;
            zb(this.__authManager, {
                idToken: this.h(),
                requestType: "VERIFY_EMAIL"
            }, G(b, a));
            return b.b
        };
        H.prototype.sendEmailVerification = H.prototype.Qa;
        H.prototype.Ta = function(a) {
            L("wilddog.User.sendPhoneVerification", 0, 1, arguments.length);
            P("wilddog.User.sendPhoneVerification", 1, a, !0);
            var b = new F;
            Ab(this.__authManager, {
                phoneNumber: this.ha(),
                type: "PHONE_VERIFY"
            }, G(b, a));
            return b.b
        };
        H.prototype.sendPhoneVerification = H.prototype.Ta;
        H.prototype.reload = function(a) {
            L("wilddog.User.reload", 0, 1, arguments.length);
            P("wilddog.User.reload", 1, a, !0);
            var b = new F;
            Bb(this.__authManager, this.h(), G(b, a));
            return b.b
        };
        H.prototype.reload = H.prototype.reload;
        H.prototype.Oa = function(a, b) {
            L("wilddog.User.reload", 1, 2, arguments.length);
            P("wilddog.User.reload", 2, b, !0);
            if (!a || !a.provider)
                throw Error("Unknown credential object.");
            var c = new F;
            N(this.__authManager, a, G(c, b));
            return c.b
        };
        H.prototype.reauthenticate = H.prototype.Oa;
        function Cb(a) {
            var b = "POST";
            switch (a.providerId || a.provider) {
            case "password":
                a = "verifyPassword";
                break;
            case "anonymous":
                a = "verifyAnonymous";
                break;
            case "custom":
                a = "verifyCustomToken";
                break;
            default:
                a = "credential", b = "GET"
            }
            if (!a)
                throw Error("Unknown provider '" + provider + "'.");
            return {
                path: a,
                method: b
            }
        }
        ;
        function Db(a) {
            if (a && a.users && a.users[0])
                return a = a.users[0], new Qa(a.displayName, a.email, a.photoUrl, a.providerId, a.localId, a.phoneNumber);
            throw Error("Bad response format.");
        }
        function Eb(a, b) {
            var c = Db(b);
            if (!c)
                return null;
            var d = b.users[0],
                e = d.providerUserInfo.map(function(a) {
                    a.photoURL = a.photoUrl;
                    delete a.photoUrl;
                    return a
                });
            return new H(a, c, d.emailVerified, d.phoneNumberVerified, e)
        }
        ;
        function Fb(a, b) {
            if (Object.prototype.hasOwnProperty.call(a, b))
                return a[b]
        }
        function Gb(a, b) {
            for (var c in a)
                Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c])
        }
        function Hb(a) {
            var b = {};
            Gb(a, function(a, d) {
                b[a] = d
            });
            return b
        }
        ;
        function Ib(a) {
            var b = {};
            try {
                var c = a.split("."),
                    d = Ha(c[0]) || "",
                    e = Ha(c[1]) || "";
                q(d);
                b = q(e);
                delete b.d
            } catch (f) {
                console.warn("error", f)
            }
            a = b;
            return "object" === typeof a && a.hasOwnProperty("iat") ? Fb(a, "iat") : null
        }
        ;
        function Q(a, b, c) {
            this.ia = ["session", b.Na, b.L, a].join(":");
            this.ba = c
        }
        Q.prototype.set = function(a, b) {
            if (!b)
                if (this.ba.length)
                    b = this.ba[0];
                else
                    throw Error("wd.auth.SessionManager : No storage options available!");
            b.set(this.ia, a)
        };
        Q.prototype.get = function() {
            var a = ta(this.ba, p(this.Fa, this)),
                a = sa(a, function(a) {
                    return null !== a
                });
            va(a, function(a, c) {
                return Ib(c.idToken) - Ib(a.idToken)
            });
            return 0 < a.length ? a.shift() : null
        };
        Q.prototype.Fa = function(a) {
            try {
                var b = a.get(this.ia);
                if (b.idToken)
                    return b;
                this.clear(a)
            } catch (c) {}
            return null
        };
        Q.prototype.clear = function() {
            var a = this;
            ra(this.ba, function(b) {
                b.remove(a.ia)
            })
        };
        var Jb = {
            NETWORK_ERROR: "Unable to contact the Wilddog server.",
            SERVER_ERROR: "An unknown server error occurred.",
            TRANSPORT_UNAVAILABLE: "There are no login transports available for the requested method.",
            REQUEST_INTERRUPTED: "The browser redirected the page before the login request could complete.",
            USER_CANCELLED: "The user cancelled authentication."
        };
        function R(a) {
            var b = Fb(Jb, a),
                b = Error(b, a);
            b.code = a;
            return b
        }
        ;
        function Kb(a, b, c) {
            this.V = a || {};
            this.P = b || {};
            this.f = c || {};
            this.V.remember || (this.V.remember = "default")
        }
        var Lb = ["remember", "redirectTo"];
        function S(a) {
            var b = {},
                c = {};
            Gb(a || {}, function(a, e) {
                0 <= qa(Lb, a) ? b[a] = e : c[a] = e
            });
            return new Kb(b, {}, c)
        }
        ;
        function Mb(a) {
            this.N = a;
            this.$ = "wilddog:"
        }
        Mb.prototype.set = function(a, b) {
            null == b ? this.N.removeItem(this.$ + a) : this.N.setItem(this.$ + a, oa(b))
        };
        Mb.prototype.get = function(a) {
            a = this.N.getItem(this.$ + a);
            return null == a ? null : q(a)
        };
        Mb.prototype.remove = function(a) {
            this.N.removeItem(this.$ + a)
        };
        Mb.prototype.toString = function() {
            return this.N.toString()
        };
        function Nb() {
            this.M = {}
        }
        Nb.prototype.set = function(a, b) {
            null == b ? delete this.M[a] : this.M[a] = b
        };
        Nb.prototype.get = function(a) {
            return Object.prototype.hasOwnProperty.call(this.M, a) ? this.M[a] : null
        };
        Nb.prototype.remove = function(a) {
            delete this.M[a]
        };
        function Ob(a) {
            try {
                if ("undefined" !== typeof window && "undefined" !== typeof window[a]) {
                    var b = window[a];
                    b.setItem("wilddog:sentinel", "cache");
                    b.removeItem("wilddog:sentinel");
                    return new Mb(b)
                }
            } catch (c) {}
            return new Nb
        }
        var Pb = Ob("localStorage"),
            Qb = Ob("sessionStorage");
        function Rb(a) {
            var b = [];
            Gb(a, function(a, d) {
                "array" == k(d) ? ra(d, function(c) {
                    b.push(encodeURIComponent(a) + "=" + encodeURIComponent(c))
                }) : b.push(encodeURIComponent(a) + "=" + encodeURIComponent(d))
            });
            return b.length ? "&" + b.join("&") : ""
        }
        function Sb(a) {
            var b = {};
            a = a.replace(/^\?/, "").split("&");
            ra(a, function(a) {
                a && (a = a.split("="), b[a[0]] = a[1])
            });
            return b
        }
        ;
        function Tb(a, b) {
            var c = window;
            c.attachEvent ? c.attachEvent("on" + a, b) : c.addEventListener && c.addEventListener(a, b, !1)
        }
        function Ub(a, b) {
            var c = window;
            c.detachEvent ? c.detachEvent("on" + a, b) : c.removeEventListener && c.removeEventListener(a, b, !1)
        }
        function Vb(a) {
            /^https?:\/\//.test(a) || (a = window.location.href);
            var b = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);
            return b ? b[1] : a
        }
        function Wb() {
            var a = document.location.hash,
                b = "";
            try {
                var a = a.replace("#", ""),
                    c = Sb(a);
                c && Object.prototype.hasOwnProperty.call(c, "__wilddog_request_key") && (b = Fb(c, "__wilddog_request_key"))
            } catch (d) {}
            return b
        }
        function Xb() {
            var a = "auth.wilddog.com",
                b = "",
                c = "https";
            if (l(a)) {
                b = a.indexOf("//");
                0 <= b && (c = a.substring(0, b - 1), a = a.substring(b + 2));
                var d = a.indexOf("/");
                -1 === d && (d = a.length);
                b = a.substring(0, d);
                a = a.substring(d).split("/");
                for (d = 0; d < a.length; d++)
                    if (0 < a[d].length) {
                        var e = a[d];
                        try {
                            e.replace(/\+/g, " ")
                        } catch (f) {}
                    }
            }
            return c + "://" + b + "/v2"
        }
        function Yb(a) {
            return Xb() + "/" + a + "/auth/channel"
        }
        ;
        function Zb() {
            return "undefined" !== typeof window && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent)
        }
        function $b() {
            return "undefined" !== typeof location && /^file:\//.test(location.href)
        }
        function ac() {
            if ("undefined" === typeof navigator)
                return !1;
            var a = navigator.userAgent;
            if ("Microsoft Internet Explorer" === navigator.appName) {
                if ((a = a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)) && 1 < a.length)
                    return 8 <= parseFloat(a[1])
            } else if (-1 < a.indexOf("Trident") && (a = a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/)) && 1 < a.length)
                return 8 <= parseFloat(a[1]);
            return !1
        }
        ;
        function bc(a) {
            a.method || (a.method = "GET");
            a.headers || (a.headers = {});
            a.headers["Content-Type"] || "GET" == a.method || (a.headers["Content-Type"] = "application/json");
            a.headers["Content-Type"] && (a.headers["Content-Type"] = a.headers["Content-Type"].toLowerCase());
            this.options = a
        }
        bc.prototype.open = function(a, b, c) {
            function d() {
                c && (c(R("REQUEST_INTERRUPTED")), c = null)
            }
            var e = new XMLHttpRequest,
                f = this.options.method.toUpperCase(),
                g;
            Tb("beforeunload", d);
            e.onreadystatechange = function() {
                if (c && 4 === e.readyState) {
                    var a;
                    if (200 <= e.status && 300 > e.status) {
                        try {
                            a = q(e.responseText)
                        } catch (ga) {}
                        c(null, a)
                    } else
                        500 <= e.status && 600 > e.status ? c(R("SERVER_ERROR")) : c(R("NETWORK_ERROR"));
                    c = null;
                    Ub("beforeunload", d)
                }
            };
            if ("GET" === f)
                a += (/\?/.test(a) ? "" : "?") + Rb(b), g = null;
            else {
                var m = this.options.headers["Content-Type"];
                "application/json" === m && (g = oa(b));
                "application/x-www-form-urlencoded" === m && (g = Rb(b))
            }
            e.open(f, a, !0);
            a = {
                Accept: "application/json;text/plain"
            };
            Aa(a, this.options.headers);
            for (var v in a)
                e.setRequestHeader(v, a[v]);
            e.send(g)
        };
        bc.isAvailable = function() {
            return "NODE" != CLIENT_TYPE && !!window.XMLHttpRequest && (!("undefined" !== typeof navigator && (navigator.userAgent.match(/MSIE/) || navigator.userAgent.match(/Trident/))) || ac())
        };
        bc.prototype.da = function() {
            return "json"
        };
        var cc = {};
        var dc = {};
        function ec(a) {
            if (!a.window_features || "undefined" !== typeof navigator && (-1 !== navigator.userAgent.indexOf("Fennec/") || -1 !== navigator.userAgent.indexOf("Firefox/") && -1 !== navigator.userAgent.indexOf("Android")))
                a.window_features = void 0;
            a.window_name || (a.window_name = "_blank");
            this.options = a
        }
        ec.prototype.open = function(a, b, c) {
            function d(a) {
                g && (document.body.removeChild(g), g = void 0);
                ga && (ga = clearInterval(ga));
                Ub("message", e);
                Ub("unload", d);
                if (x && !a)
                    try {
                        x.close()
                    } catch (vc) {
                        m.postMessage("die", v)
                    }
                x = m = void 0
            }
            function e(a) {
                if (a.origin === v)
                    try {
                        var b = q(a.data);
                        "ready" === b.a ? m.postMessage(pc, v) : "error" === b.a ? (d(!1), c && (c(b.d), c = null)) : "response" === b.a && (d(b.forceKeepWindowOpen), c && (c(null, b.d), c = null))
                    } catch (wc) {}
            }
            var f = ac(),
                g,
                m;
            if (!this.options.relay_url)
                return c(Error("invalid arguments: origin of url and relay_url must match"));
            var v = Vb(a);
            if (v !== Vb(this.options.relay_url))
                c && setTimeout(function() {
                    c(Error("invalid arguments: origin of url and relay_url must match"))
                }, 0);
            else {
                f && (g = document.createElement("iframe"), g.setAttribute("src", this.options.relay_url), g.style.display = "none", g.setAttribute("name", "__winchan_relay_frame"), document.body.appendChild(g), m = g.contentWindow);
                a += (/\?/.test(a) ? "" : "?") + Rb(b);
                var x = window.open(a, this.options.window_name, this.options.window_features);
                m || (m = x);
                var ga = setInterval(function() {
                        x && x.closed &&
                        (d(!1), c && (c(R("USER_CANCELLED")), c = null))
                    }, 500),
                    pc = oa({
                        a: "request",
                        d: b
                    });
                Tb("unload", d);
                Tb("message", e)
            }
        };
        ec.isAvailable = function() {
            return "WEB" == CLIENT_TYPE && "postMessage" in window && !$b() && !(Zb() || "undefined" !== typeof navigator && (navigator.userAgent.match(/Windows Phone/) || window.Windows && /^ms-appx:/.test(location.href)) || "undefined" !== typeof navigator && "undefined" !== typeof window && (navigator.userAgent.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i) || navigator.userAgent.match(/CriOS/) || navigator.userAgent.match(/Twitter for iPhone/) || navigator.userAgent.match(/FBAN\/FBIOS/) || window.navigator.standalone)) &&
                !("undefined" !== typeof navigator && navigator.userAgent.match(/PhantomJS/))
        };
        ec.prototype.da = function() {
            return "popup"
        };
        function fc() {
            this.qa = pa() + pa() + pa()
        }
        fc.prototype.open = function(a, b) {
            u.set("redirect_request_id", this.qa);
            b.requestId = this.qa;
            b.redirectTo = b.redirectTo || window.location.href;
            a += (/\?/.test(a) ? "" : "?") + Rb(b);
            window.location = a
        };
        fc.isAvailable = function() {
            return "WEB" == CLIENT_TYPE && !$b() && !Zb()
        };
        fc.prototype.da = function() {
            return "redirect"
        };
        function T(a) {
            var b = [];
            a.forEach(function(a) {
                null != this.oa[a] && b.push(this.oa[a])
            }, gc);
            return b
        }
        var u = Qb,
            gc = new function() {
                this.oa = {
                    XHR: bc,
                    JSONP: cc,
                    Cordova: dc,
                    Popup: ec,
                    Redirect: fc
                }
            };
        function hc(a, b, c) {
            this.T = a;
            this.B = a.app;
            this.G = b;
            this.J = new Q(this.B.name, b, [Pb, u]);
            this.l = null;
            this.Z = c;
            ic(this)
        }
        function ic(a) {
            u.get("redirect_request_id") && jc(a);
            var b = a.J.get();
            b && b.idToken ? Bb(a, b.idToken, function(c, d) {
                if (!c && d) {
                    var e = {
                        signIn: !0
                    };
                    e.currentUser = d;
                    e.idToken = b.idToken;
                    kc(a, e, {});
                    U(a, e)
                } else
                    U(a, null)
            }) : U(a, null)
        }
        function lc(a, b, c, d) {
            b && b.idToken ? mc(a, b.idToken, c, function(a, b) {
                d(a, b)
            }) : (U(a, null), d(Error("No idToken found in response.")))
        }
        function mc(a, b, c, d) {
            Bb(a, b, function(e, f) {
                if (!e && f) {
                    var g = {
                        signIn: !0
                    };
                    g.currentUser = f;
                    g.idToken = b;
                    kc(a, g, c);
                    U(a, g);
                    d(null, f)
                } else
                    U(a, null), d(e)
            })
        }
        function vb(a, b) {
            a.B.bindOnce(a.B.F.s, function() {
                U(a, null);
                b(null)
            })
        }
        function N(a, b, c) {
            V(a);
            var d = new Kb({}, {}, b || {});
            b = Cb(b);
            d.f._method = b.method;
            var e = T(["XHR", "JSONP", "NodeHttp", "WxHttp"]);
            nc(a, e, "/auth/" + b.path, d, function(a, b) {
                w(c, a, b)
            })
        }
        function oc(a, b) {
            V(a);
            var c = new Kb({}, {}, {}),
                d = T(["WxImplicit"]);
            nc(a, d, "/auth/wxapp", c, function(a, c) {
                w(b, a, c)
            })
        }
        function wb(a, b, c, d) {
            V(a);
            var e = T(["Popup", "Cordova"]);
            requestInfo = S(c);
            height = width = 625;
            b.id ? (requestInfo.f.providerId = b.id, requestInfo.f.scope = b.scope || "", requestInfo.f.appId = a.G.L, requestInfo.P.window_features = "menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=" + height + ",width=" + width + ",top=" + ("object" === typeof screen ? .5 * (screen.height - height) : 0) + ",left=" + ("object" === typeof screen ? .5 * (screen.width - width) : 0), requestInfo.P.relay_url = Yb(a.G.L), requestInfo.P.requestWithCredential =
            p(a.m, a), nc(a, e, "/auth/oauth", requestInfo, function(a, b) {
                w(d, a, b)
            })) : setTimeout(function() {
                w(d, R("TRANSPORT_UNAVAILABLE_FOR_UNKNOWN_PROVIDER"))
            }, 0)
        }
        function xb(a, b, c, d) {
            V(a);
            var e = T(["Redirect"]);
            c = S(c);
            b.id ? (c.f.providerId = b.id, c.f.scope = b.scope || "", c.f.appId = a.G.L, u.set("redirect_client_options", c.V), nc(a, e, "/auth/oauth", c, function(a, b) {
                w(d, a, b)
            })) : w(d, R("TRANSPORT_UNAVAILABLE"))
        }
        function jc(a) {
            var b = u.get("redirect_request_id");
            if (b) {
                var c = u.get("redirect_client_options"),
                    d = T(["XHR", "JSONP"]);
                serverParams = {
                    requestId: b,
                    requestKey: Wb()
                };
                transportOptions = {};
                requestInfo = new Kb(c, transportOptions, serverParams);
                try {
                    document.location.hash = document.location.hash.replace(/&__wilddog_request_key=([a-zA-z0-9]*)/, "")
                } catch (e) {}
                nc(a, d, "/auth/session", requestInfo, function() {
                    u.remove("redirect_request_id");
                    u.remove("redirect_client_options")
                }.bind(a))
            }
        }
        function qc(a, b, c) {
            V(a);
            b = S(b);
            b.f._method = "POST";
            a.m("/auth/signupNewUser", b, function(b, e) {
                !b && e && e.idToken ? mc(a, e.idToken, null, function(a, b) {
                    w(c, a, b)
                }) : w(c, b)
            })
        }
        function ub(a, b, c, d) {
            var e = {
                    idToken: c.idToken
                },
                f = c.photoURL || a.l.currentUser.photoURL,
                g = c.displayName || a.l.currentUser.displayName;
            switch (b) {
            case "unlink":
                e.deleteProvider = c.deleteProvider;
                break;
            case "profile":
                e.photoUrl = f, e.displayName = g
            }
            rc(a, e, function(b, c) {
                b ? w(d, b) : (a.l.currentUser.displayName = g, a.l.currentUser.photoURL = f, kc(a, a.l), w(d, b, c))
            })
        }
        function tb(a, b, c) {
            rc(a, b, function(b, e) {
                b ? w(c, b) : lc(a, e, {}, c)
            })
        }
        function rc(a, b, c) {
            b = S(b);
            b.f._method = "POST";
            b.f.idToken = a.l.idToken;
            a.m("/auth/setAccountInfo", b, function(a, b) {
                a ? c(a) : c(a, b)
            })
        }
        function Bb(a, b, c) {
            V(a);
            b = S({
                idToken: b
            });
            b.f._method = "POST";
            a.m("/auth/getAccountInfo", b, function(b, e) {
                b ? c(b) : c(b, Eb(a, e))
            })
        }
        function sb(a, b, c) {
            V(a);
            b = S({
                idToken: b
            });
            b.f._method = "POST";
            a.m("/auth/deleteAccount", b, function(b, e) {
                !b && e && "ok" == e.status && a.l && vb(a);
                w(c, b)
            })
        }
        function zb(a, b, c) {
            V(a);
            b = S(b);
            b.f._method = "POST";
            a.m("/auth/getOobConfirmationCode", b, function(a, b) {
                w(c, a, b)
            })
        }
        hc.prototype.fa = function(a, b) {
            V(this);
            var c = S({
                email: a
            });
            c.f._method = "POST";
            this.m("/auth/getProvider", c, function(a, c) {
                a ? w(b, a) : w(b, a, c.allProviders || [])
            })
        };
        hc.prototype.m = function(a, b, c) {
            var d = T(["XHR", "JSONP", "NodeHttp", "WxHttp"]);
            sc(this, d, a, b, c)
        };
        function nc(a, b, c, d, e) {
            sc(a, b, c, d, function(b, c) {
                !b && c && c.idToken ? lc(a, c, d.V, function(a, b) {
                    a ? e(a) : e(null, b)
                }) : e(b || R("UNKNOWN_ERROR"))
            })
        }
        function sc(a, b, c, d, e) {
            b = sa(b, function(a) {
                return "function" === typeof a.isAvailable && a.isAvailable()
            });
            0 === b.length ? setTimeout(function() {
                e(R("TRANSPORT_UNAVAILABLE"))
            }, 0) : (b = b.shift(), d.P.method = d.f._method, b = new b(d.P), d = Hb(d.f), d.v = CLIENT_TYPE + CLIENT_VERSION, d.transport = b.da(), d.suppress_status_codes = !0, a = Xb() + "/" + a.G.L + c, b.open(a, d, function(a, b) {
                if (a)
                    e(a);
                else if (b && b.error) {
                    var c = Error(b.message);
                    c.code = b.errcode;
                    e(c)
                } else
                    e(null, b)
            }))
        }
        function kc(a, b, c) {
            a.J.clear();
            c = c || {};
            var d = Pb;
            "sessionOnly" === c.remember && (d = u);
            "none" !== c.remember && a.J.set(b, d)
        }
        function U(a, b) {
            a.l = b;
            a.T.currentUser = b && b.signIn ? b.currentUser : null;
            a.Z && a.Z(null !== b);
            b && b.signIn || a.J.clear();
            a.B.emit(a.B.F.s, b || {
                signIn: !1
            })
        }
        function V(a) {
            if (a.G.Ha)
                throw Error("This custom Wilddog server ('" + a.G.domain + "') does not support delegated login.");
        }
        function yb(a, b, c) {
            b = S(b);
            b.f._method = "POST";
            a.m("/auth/verifyPhone", b, function(b, e) {
                !b && e && "ok" == e.status && a.T.currentUser && (a.T.currentUser.phoneVerified = !0);
                !b && e && e.idToken ? mc(a, e.idToken, null, function(a) {
                    w(c, a)
                }) : w(c, b)
            })
        }
        function tc(a, b, c) {
            V(a);
            b = S(b);
            b.f._method = "POST";
            a.m("/auth/resetPhonePassword", b, function(a, b) {
                a ? w(c, a) : w(c, a, b)
            })
        }
        function Ab(a, b, c) {
            V(a);
            b = S(b);
            b.f._method = "POST";
            a.m("/auth/sendSmsCode", b, function(a, b) {
                w(c, a, b)
            })
        }
        ;
        function L(a, b, c, d) {
            var e;
            d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
            if (e)
                throw Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + ".");
        }
        function uc(a, b, c) {
            switch (b) {
            case 1:
                b = c ? "first" : "First";
                break;
            case 2:
                b = c ? "second" : "Second";
                break;
            case 3:
                b = c ? "third" : "Third";
                break;
            case 4:
                b = c ? "fourth" : "Fourth";
                break;
            default:
                throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");
            }
            return a + " failed: " + (b + " argument ")
        }
        function P(a, b, c, d) {
            if (!(d && void 0 === c || n(c)))
                throw Error(uc(a, b, d) + "must be a valid function.");
        }
        ;
        function W(a, b) {
            if (1 == arguments.length) {
                this.c = a.split("/");
                for (var c = 0, d = 0; d < this.c.length; d++)
                    0 < this.c[d].length && (this.c[c] = this.c[d], c++);
                this.c.length = c;
                this.i = 0
            } else
                this.c = a, this.i = b
        }
        W.prototype.toString = function() {
            for (var a = "", b = this.i; b < this.c.length; b++)
                "" !== this.c[b] && (a += "/" + this.c[b]);
            return a || "/"
        };
        W.prototype.slice = function(a) {
            return this.c.slice(this.i + (a || 0))
        };
        W.prototype.parent = function() {
            if (this.i >= this.c.length)
                return null;
            for (var a = [], b = this.i; b < this.c.length - 1; b++)
                a.push(this.c[b]);
            return new W(a, 0)
        };
        W.prototype.w = function(a) {
            for (var b = [], c = this.i; c < this.c.length; c++)
                b.push(this.c[c]);
            if (a instanceof W)
                for (c = a.i; c < a.c.length; c++)
                    b.push(a.c[c]);
            else
                for (a = a.split("/"), c = 0; c < a.length; c++)
                    0 < a[c].length && b.push(a[c]);
            return new W(b, 0)
        };
        W.prototype.contains = function(a) {
            var b = this.i,
                c = a.i;
            if (this.c.length - this.i > a.c.length - a.i)
                return !1;
            for (; b < this.c.length;) {
                if (this.c[b] !== a.c[c])
                    return !1;
                ++b;
                ++c
            }
            return !0
        };
        new W("");
        function O(a, b, c) {
            if (!l(c))
                throw Error(uc(a, b, !1) + "must be a valid string.");
        }
        function M(a, b) {
            if (!ba(b) || null === b)
                throw Error(uc(a, 1, !1) + "must be a valid object.");
        }
        ;
        function X(a) {
            if (!a.options.authDomain)
                throw Error("Could not find 'authDomain' in options.");
            var b = this;
            this.wa = function(a) {
                var b = /^([a-zA-Z0-9\-_]+)\.([a-z]+)\.com/.exec(a.toLowerCase());
                if (!b)
                    throw Error("Bad 'authDomain' format '" + a + "'.");
                return {
                    L: b[1],
                    rb: b[2],
                    ob: b[0],
                    Na: "",
                    Ha: "wilddog" !== b[2]
                }
            }(a.options.authDomain);
            this.app = a;
            this.g = new hc(this, this.wa);
            this.app.bind(this.app.F.xa, function(a) {
                var c = b.g;
                a = a.reason;
                c.J.clear();
                c.l = null;
                c.T.currentUser = null;
                c.B.emit(c.B.F.s, {
                    signIn: !1,
                    reason: a
                });
                c.Z && c.Z(!1)
            })
        }
        X.prototype.Ma = function(a) {
            function b(b) {
                var d;
                if (!(d = b && b.signIn)) {
                    var f = c.g;
                    d = u.get("redirect_request_id");
                    f = f.J.get();
                    d = !(d || f && f.idToken)
                }
                d && a(b && b.signIn ? b.currentUser : null)
            }
            var c = this;
            L("wilddog.auth().onAuthStateChanged", 1, 1, arguments.length);
            P("wilddog.auth().onAuthStateChanged", 1, a, !1);
            this.app.bind(this.app.F.s, b);
            return function() {
                c.app.unbind(c.app.F.s, b)
            }
        };
        X.prototype.onAuthStateChanged = X.prototype.Ma;
        X.prototype.Ua = function(a) {
            L("wilddog.auth().signInAnonymously", 0, 1, arguments.length);
            P("wilddog.auth().signInAnonymously", 1, a, !0);
            var b = new F;
            qc(this.g, {}, G(b, a));
            return b.b
        };
        X.prototype.signInAnonymously = X.prototype.Ua;
        X.prototype.Va = function(a) {
            L("wilddog.auth().signInAnonymously", 0, 1, arguments.length);
            P("wilddog.auth().signInAnonymously", 1, a, !0);
            var b = new F;
            oc(this.g, G(b, a));
            return b.b
        };
        X.prototype.signInWeapp = X.prototype.Va;
        X.prototype.Ra = function(a, b) {
            L("wilddog.auth().sendPasswordResetEmail", 1, 2, arguments.length);
            P("wilddog.auth().sendPasswordResetEmail", 2, b, !0);
            var c = new F;
            zb(this.g, {
                requestType: "RESET_PASSWORD",
                email: a
            }, G(c, b));
            return c.b
        };
        X.prototype.sendPasswordResetEmail = X.prototype.Ra;
        X.prototype.Sa = function(a, b) {
            L("wilddog.auth().sendPasswordResetSms", 1, 2, arguments.length);
            P("wilddog.auth().sendPasswordResetSms", 2, b, !0);
            var c = new F;
            Ab(this.g, {
                type: "PASSWORD_RESET",
                phoneNumber: a
            }, G(c, b));
            return c.b
        };
        X.prototype.sendPasswordResetSms = X.prototype.Sa;
        X.prototype.za = function(a, b, c, d) {
            L("wilddog.auth().sendPasswordResetSms", 3, 4, arguments.length);
            P("wilddog.auth().sendPasswordResetSms", 4, d, !0);
            O("wilddog.auth().sendPasswordResetSms", 2, b);
            var e = new F;
            tc(this.g, {
                phoneNumber: a,
                password: c,
                smsCode: b
            }, G(e, d));
            return e.b
        };
        X.prototype.confirmPasswordResetSms = X.prototype.za;
        X.prototype.fa = function(a, b) {
            L("wilddog.auth().fetchProvidersForEmail", 1, 2, arguments.length);
            P("wilddog.auth().fetchProvidersForEmail", 2, b, !0);
            var c = new F;
            this.g.fa(a, G(c, b));
            return c.b
        };
        X.prototype.fetchProvidersForEmail = X.prototype.fa;
        X.prototype.Xa = function(a, b) {
            L("wilddog.auth().signInWithCustomToken", 1, 2, arguments.length);
            P("wilddog.auth().signInWithCustomToken", 2, b, !0);
            var c = new F;
            N(this.g, {
                providerId: "custom",
                token: a
            }, G(c, b));
            return c.b
        };
        X.prototype.signInWithCustomToken = X.prototype.Xa;
        X.prototype.Ya = function(a, b, c) {
            L("wilddog.auth().signInWithEmailAndPassword", 2, 3, arguments.length);
            P("wilddog.auth().signInWithEmailAndPassword", 3, c, !0);
            var d = new F;
            N(this.g, {
                providerId: "password",
                password: b,
                email: a
            }, G(d, c));
            return d.b
        };
        X.prototype.signInWithEmailAndPassword = X.prototype.Ya;
        X.prototype.Za = function(a, b, c) {
            L("wilddog.auth().signInWithPhoneAndPassword", 2, 3, arguments.length);
            P("wilddog.auth().signInWithPhoneAndPassword", 3, c, !0);
            var d = new F;
            N(this.g, {
                providerId: "password",
                password: b,
                phoneNumber: a
            }, G(d, c));
            return d.b
        };
        X.prototype.signInWithPhoneAndPassword = X.prototype.Za;
        X.prototype.bb = function(a) {
            L("wilddog.auth().signOut", 0, 1, arguments.length);
            P("wilddog.auth().signOut", 1, a, !0);
            var b = new F;
            vb(this.g, G(b, a));
            return b.b
        };
        X.prototype.signOut = X.prototype.bb;
        X.prototype.Aa = function(a, b, c) {
            L("wilddog.auth().createUserWithEmailAndPassword", 2, 3, arguments.length);
            P("wilddog.auth().createUserWithEmailAndPassword", 3, c, !0);
            var d = new F;
            qc(this.g, {
                email: a,
                password: b
            }, G(d, c));
            return d.b
        };
        X.prototype.createUserWithEmailAndPassword = X.prototype.Aa;
        X.prototype.Ba = function(a, b, c) {
            L("wilddog.auth().createUserWithPhoneAndPassword", 2, 3, arguments.length);
            P("wilddog.auth().createUserWithPhoneAndPassword", 3, c, !0);
            var d = new F;
            qc(this.g, {
                phoneNumber: a,
                password: b
            }, G(d, c));
            return d.b
        };
        X.prototype.createUserWithPhoneAndPassword = X.prototype.Ba;
        X.prototype.$a = function(a, b) {
            L("wilddog.auth().signInWithPopup", 1, 2, arguments.length);
            M("wilddog.auth().signInWithPopup", a);
            var c = new F;
            wb(this.g, a, {
                authType: "login"
            }, G(c, b));
            return c.b
        };
        X.prototype.signInWithPopup = X.prototype.$a;
        X.prototype.ab = function(a, b) {
            L("wilddog.auth().signInWithRedirect", 1, 2, arguments.length);
            M("wilddog.auth().signInWithRedirect", a);
            var c = new F;
            xb(this.g, a, {
                authType: "login"
            }, G(c, b));
            return c.b
        };
        X.prototype.signInWithRedirect = X.prototype.ab;
        X.prototype.Wa = function(a, b) {
            L("wilddog.auth().signInWithCredential", 1, 2, arguments.length);
            M("wilddog.auth().signInWithCredential", a);
            var c = {};
            "password" == a.provider ? (c.providerId = a.provider, c.email = a.email, c.phoneNumber = a.phone, c.password = a.password) : (c.providerId = a.provider, c.accessToken = a.accessToken, c.openId = a.openId || a.email);
            c.authType = "login";
            var d = new F;
            N(this.g, c, G(d, b));
            return d.b
        };
        X.prototype.signInWithCredential = X.prototype.Wa;
        function Y() {
            this.na = "DEFAULT";
            this.La = {};
            this.S = {};
            this.app = null
        }
        Y.prototype.Ga = function(a, b) {
            var c = b || this.na;
            this.S[c] = new y(a, c);
            b == this.na || null == b ? this.app = this.S[c] : this[c] = this.S[c];
            return this.S[c]
        };
        Y.prototype.initializeApp = Y.prototype.Ga;
        Y.prototype.pa = function(a, b) {
            this.La[a] = b;
            Oa(a, b);
            this[a] = function() {
                if (this.app)
                    return this.app[a]();
                throw Error("Default application not initialized!Please call wilddog.initializeApp first.");
            }
        };
        Y.prototype.regService = Y.prototype.pa;
        Y.prototype.ja = CLIENT_VERSION;
        Y.prototype.SDK_VERSION = Y.prototype.ja;
        var Z = new Y;
        Z.pa("auth", function(a) {
            null == a.la && (a.la = new X(a));
            return a.la
        });
        (function(a) {
            a.auth = a.auth ? a.auth : {};
            [{
                id: "password",
                name: "Wilddog",
                C: "phoneOrEmail",
                o: "password"
            }, {
                id: "password",
                name: "Email",
                C: "email",
                o: "password"
            }, {
                id: "qq",
                name: "QQ",
                C: "accessToken",
                o: "openId"
            }, {
                id: "weibo",
                name: "Weibo",
                C: "accessToken",
                o: "openId"
            }, {
                id: "weixin",
                name: "Weixin",
                C: "accessToken",
                o: "openId"
            }, {
                id: "weixinmp",
                name: "Weixinmp",
                C: "accessToken",
                o: "openId"
            }].forEach(function(b) {
                a.auth[b.name + "AuthProvider"] = function() {
                    this.id = b.id;
                    this.addScope = function(a) {
                        this.scope = a
                    }
                };
                "Wilddog" == b.name ? (a.auth.WilddogAuthProvider.emailCredential =
                function(a, d) {
                    var c = {};
                    c.provider = b.id;
                    c.email = a;
                    c[b.o] = d;
                    return c
                }, a.auth.WilddogAuthProvider.phoneCredential = function(a, d) {
                    var c = {};
                    c.provider = b.id;
                    c.phoneNumber = a;
                    c[b.o] = d;
                    return c
                }) : a.auth[b.name + "AuthProvider"].credential = "Email" == b.name ? function(a, d) {
                    Ka("wilddog.auth.EmailAuthProvider being deprecated. Please usewilddog.auth.WilddogAuthProvider instead.");
                    var c = {};
                    c.provider = b.id;
                    c[b.C] = a;
                    c[b.o] = d;
                    return c
                } : function(a, d) {
                    var c = {};
                    c.provider = b.id;
                    c[b.C] = a;
                    c[b.o] = d;
                    return c
                }
            })
        })(Z);
        if ("WEB" == CLIENT_TYPE)
            "object" == typeof module && module.exports && (module.exports = Z), "function" == typeof define && define.amd && define("wilddog", [], function() {
                return Z
            }), "undefined" != typeof window ? window.wilddog = Z : WorkerGlobalScope && self && (self.wilddog = Z);
        else if ("NODE" == CLIENT_TYPE || "WX" == CLIENT_TYPE || "RN" == CLIENT_TYPE)
            module.exports = Z;
    };
    ns.wrapper(ns.goog, ns.wd)
})({
    goog: {},
    wd: {}
})
