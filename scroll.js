/**
 * ScrollView, strip from iAd Framework.
 */

var Scroll = {};

Scroll.IS_ANDROID = navigator.userAgent.toLowerCase().indexOf("android") > -1;
Scroll.iOS_VERSION = navigator.userAgent.match(/OS ([0-9_]+)/);
Scroll.iOS_VERSION = Scroll.iOS_VERSION ? Scroll.iOS_VERSION[1].replace(/_/g, ".") : null;
Scroll.IS_IPAD = navigator.platform == "iPad";
Scroll.HAS_HIDPI_DISPLAY = window.devicePixelRatio >= 2;
Scroll.HIDPI_SUFFIX = "@2x";
Scroll.SUPPORTS_TOUCHES = "createTouch" in document;
Scroll.START_EVENT = Scroll.SUPPORTS_TOUCHES ? "touchstart" : "mousedown";
Scroll.MOVE_EVENT = Scroll.SUPPORTS_TOUCHES ? "touchmove" : "mousemove";
Scroll.END_EVENT = Scroll.SUPPORTS_TOUCHES ? "touchend" : "mouseup";
Scroll.CANCEL_EVENT = "touchcancel";
Scroll.Utils = {
    registeredHTMLViewLoadingClasses: {}
};
Scroll.Utils.t = function (a, b) {
    return Scroll.Utils.t3d(a, b, 0)
};
Scroll.Utils.t3d = function (a, b, c) {
    return "translate3d(" + a + "px, " + b + "px, " + c + "px)"
};
Scroll.Utils.px = function (a) {
    return a + "px"
};
Scroll.Utils.CSSMatrixFromString = function (a) {
    var b = "";
    if (a.length > 0 && a != "none") b = a.replace(/([^(]*)\(([^)]*)\)/g, function (c, d, e) {
        c = e.replace(/(\-?[0-9.]+(?:e\-?[0-9]+)?)([^,]*)/g, function (f, g, i) {
            g = parseFloat(g);
            return g.toFixed(6) + i
        });
        return d + "(" + c + ")"
    });
    return new WebKitCSSMatrix(b)
};
Scroll.Utils.concatenateTransforms = function () {
    for (var a = [], b = 0, c = arguments.length; b < c; b++) {
        var d = arguments[b];
        d && d != "none" && a.push(d)
    }
    return a.join(" ")
};
Scroll.Utils.removeObjectFromArray = function (a, b) {
    var c = b.indexOf(a);
    if (c == -1) return false;
    b.splice(c, 1);
    return true
};
Scroll.Utils.copyPropertiesFromSourceToTarget = function (a, b) {
    for (var c in a) b[c] = a[c]
};
Scroll.Utils.escapeRegExp = function (a) {
    var b = RegExp("[.*+?|()\\[\\]{}\\\\]", "g");
    return a.replace(b, "\\$&")
};
Scroll.Utils.appendHiDPISuffix = function (a) {
    var b = "(" + Scroll.Utils.escapeRegExp(Scroll.HIDPI_SUFFIX) + "|" + Scroll.Utils.escapeRegExp(encodeURIComponent(Scroll.HIDPI_SUFFIX)) + ")(\\.[^\\./]+)?$";
    if (!RegExp(b, "i").test(a)) if (/\.[^\.\/]+/.test(a)) {
        b = a.lastIndexOf(".");
        a = a.substr(0, b) + Scroll.HIDPI_SUFFIX + a.substr(b)
    } else a += Scroll.HIDPI_SUFFIX;
    return a
};
Scroll.Utils.objectIsFunction = function (a) {
    return typeof a == "function"
};
Scroll.Utils.objectIsUndefined = function (a) {
    return a === undefined
};
Scroll.Utils.objectIsString = function (a) {
    return typeof a == "string" || a instanceof String
};
Scroll.Utils.objectIsArray = function (a) {
    return a instanceof Array
};
Scroll.Utils.objectHasMethod = function (a, b) {
    return a !== null && !this.objectIsUndefined(a[b]) && this.objectIsFunction(a[b])
};
Scroll.Utils.resolveObjectPathFrom = function (a, b, c) {
    if (!(!b || b[0] == ".")) {
        b = b.split(".");
        for (var d, e, f = 0, g = b.length; a != null && f < g; f++) {
            e = b[f];
            d = a[e];
            if (c && d == null) d = a[e] = {};
            a = d
        }
        return a
    }
};
Scroll.Utils.resolveObjectPath = function (a, b) {
    return Scroll.Utils.resolveObjectPathFrom(window, a, b)
};
Scroll.Utils.preventEventDefault = function (a) {
    a.preventDefault()
};
Scroll.Utils.createUIEvent = function (a, b) {
    return Scroll.SUPPORTS_TOUCHES ? this.createEventWithTouch(a, b) : this.createEventWithMouse(a, b)
};
Scroll.Utils.createEventWithTouch = function (a, b) {
    var c = document.createEvent("TouchEvent");
    c.initTouchEvent(a, b.bubbles, b.cancelable, window, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.touches, b.targetTouches, b.changedTouches, b.scale, b.rotation);
    return c
};
Scroll.Utils.createEventWithMouse = function (a, b) {
    var c = document.createEvent("MouseEvent");
    c.initMouseEvent(a, b.bubbles, b.cancelable, document.defaultView, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.metaKey, b.button, b.relatedTarget);
    return c
};
Scroll.Utils.init = function () {
    document.body.addClassName(Scroll.HAS_HIDPI_DISPLAY ? "x-HiDPI" : "x-LoDPI");
    Scroll.IS_IPAD && document.body.addClassName("x-iPad");
    if (Scroll.RootView._sharedRoot == null) {
        a = document.querySelector("." + Scroll.RootView.cssClassName);
        if (a === null) {
            document.body.addClassName(Scroll.RootView.cssClassName);
            a = document.body;
        }
        Scroll.RootView._sharedRoot = new Scroll.RootView(a)
    }
};
Scroll.Utils.setupDisplayNames = function (a, b) {
    var c = b || a.displayName || a.name;
    for (var d in a) if (!a.__lookupGetter__(d)) {
        var e = a[d];
        if (Scroll.Utils.objectIsFunction(e)) e.displayName = Scroll.Utils.createDisplayName(c, d)
    }
    for (d in a.prototype) if (!a.prototype.__lookupGetter__(d)) {
        e = a.prototype[d];
        if (Scroll.Utils.objectIsFunction(e)) e.displayName = Scroll.Utils.createDisplayName(c, d)
    }
};
Scroll.Utils.createDisplayName = function (a, b) {
    return a + "." + b + "()"
};
Scroll.Utils.createNodeFromString = function (a) {
    var b = document.createRange();
    b.selectNode(document.body);
    for (a = b.createContextualFragment(a).firstChild; a.nodeType != Node.ELEMENT_NODE && a.nextSibling;) a = a.nextSibling;
    return a
};
Scroll.Utils.registerClassForHTMLViewLoading = function (a) {
    Scroll.Utils.registeredHTMLViewLoadingClasses[a.cssClassName] = a
};
Scroll.Utils.getViewClassForLayer = function (a) {
    var b = this.registeredHTMLViewLoadingClasses;
    a = a.className.trim().split(/\s+/);
    for (var c = 0, d = a.length; c < d; c++) {
        var e = b.hasOwnProperty(a[c]) ? b[a[c]] : null;
        if (e) return e
    }
    return null
};
Scroll.Utils.getViewWithLayer = function (a) {
    return new(this.getViewClassForLayer(a) || Scroll.View)(a)
};
Scroll.Utils.viewsForClassAndNode = function (a, b) {
    var c = [];
    if (!a.hasOwnProperty("cssClassName")) return c;
    for (var d = b.querySelectorAll("." + a.cssClassName), e = 0; e < d.length; e++) c.push(d[e]._view);
    return c
};
Scroll.Utils.clampValue = function (a, b, c) {
    return Math.min(Math.max(a, b), c)
};
Scroll.Utils.isElementInDocument = function (a) {
    if (a === undefined || a === null || a.ownerDocument !== document) return false;
    for (var b = document.body; a !== b && a.parentNode;) a = a.parentNode;
    return a === b
};
Scroll.Utils.elementForNode = function (a) {
    return a.nodeType === Node.ELEMENT_NODE ? a : a.parentElement
};
Scroll.Utils.TEXT_FIELD_INPUT_TYPES = ["text", "password", "email", "url", "search", "tel", "number", "week"];
Scroll.Utils.isElementTextFieldInput = function (a) {
    return a.nodeName == "INPUT" && Scroll.Utils.TEXT_FIELD_INPUT_TYPES.indexOf(a.type) != -1
};
window.addEventListener("DOMContentLoaded", Scroll.Utils.init, true);
Scroll.Utils.setupDisplayNames(Scroll.Utils, "Scroll.Utils");
Scroll.Class = function (a) {
    if (typeof a === "string") a = {
        name: a
    };
    a = a || {};
    a.symbol = a.symbol === undefined ? a.name : a.symbol;
    a.name = a.name || "AnonymousClass";
    a.superclass = a.superclass || Scroll.Object;
    var b = function () {
            b.processed || Scroll.Class.processAllClasses();
            b.prototype.init.apply(this, arguments)
        };
    b.processed = false;
    Scroll.Class.unprocessedClasses.push(b);
    b.displayName = b._name = a.name;
    Scroll.Utils.copyPropertiesFromSourceToTarget(a, b);
    if (a.symbol && typeof a.symbol === "string") {
        var c = a.symbol.split(".");
        a = c.pop();
        if (c = c.length ? Scroll.Utils.resolveObjectPath(c.join("."), true) : window) c[a] = b
    }
    return b
};
Scroll.Class.unprocessedClasses = [];
Scroll.Class.processAllClasses = function () {
    for (var a, b = 0; b < Scroll.Class.unprocessedClasses.length; b++) {
        a = Scroll.Class.unprocessedClasses[b];
        a.processed || Scroll.Class.processClassAndHierarchy(a)
    }
    Scroll.Class.unprocessedClasses = []
};
Scroll.Class.processClassAndHierarchy = function (a) {
    for (var b = [a], c = a; c = c.superclass;) b.push(c);
    var d;
    for (c = b.length - 1; c >= 0; c--) {
        d = b[c];
        d.processed || Scroll.Class.processClass(d)
    }
    for (c = b.length - 1; c >= 0; c--) {
        d = b[c];
        Scroll.Utils.objectHasMethod(d, "initialize") && d.initialize.apply(a)
    }
};
Scroll.Class.processClass = function (a) {
    a.mixins && Scroll.Class.mixin(a.prototype, a.mixins);
    for (var b = a.synthesizedProperties || [], c = 0; c < b.length; c++) Scroll.Class.synthesizeProperty(a.prototype, b[c]);
    for (var d in a.prototype) a.prototype.__lookupGetter__(d) || Scroll.Class.processMethod(a, d);
    if (a !== Scroll.Object) a.prototype.__proto__ = a.superclass.prototype;
    a.processed = true
};
Scroll.Class.synthesizeProperty = function (a, b) {
    var c = b.charAt(0).toUpperCase() + b.substr(1),
        d = "get" + c,
        e = "set" + c,
        f = "_" + b;
    Scroll.Utils.objectHasMethod(a, e) || (a[e] = function (i) {
        this[f] = i
    });
    c = function (i) {
        this[e](i);
        this.notifyPropertyChange(b)
    };
    c.displayName = "Setter for ." + b + " on " + a.constructor.displayName;
    Scroll.Utils.objectHasMethod(a, d) || (a[d] = function () {
        return this[f]
    });
    var g = function () {
            return this[d]()
        };
    g.displayName = "Getter for ." + b + " on " + a.constructor.displayName;
    Object.defineProperty(a, b, {
        get: g,
        set: c
    })
};
Scroll.Class.processMethod = function (a, b) {
    var c = a.prototype[b];
    if (Scroll.Utils.objectIsFunction(c)) {
        c._class = a;
        c._name = b;
        if (c.displayName === undefined) c.displayName = Scroll.Utils.createDisplayName(a.displayName, b)
    }
};
Scroll.Class.mixin = function (a, b) {
    for (var c, d = 0; d < b.length; d++) {
        c = b[d];
        for (var e in c) a.hasOwnProperty(e) || (a[e] = c[e])
    }
};
Scroll.Class.synthesizeProperties = function (a, b) {
    Scroll.Class.processClassAndHierarchy(a);
    for (var c = 0; c < b.length; c++) Scroll.Class.synthesizeProperty(a.prototype, b[c])
};
Scroll.Class.processMethods = function (a, b) {
    Scroll.Class.processClassAndHierarchy(a);
    for (var c = 0; c < b.length; c++) Scroll.Class.processMethod(a, b[c])
};
Scroll.Utils.setupDisplayNames(Scroll.Class, "Scroll.Class");
Scroll.Class("Scroll.Object");
Scroll.Object.PROPERTY_CHANGED = "handlePropertyChange";
Scroll.Object.prototype.init = function () {
    this.observedProperties = {}
};
Scroll.Object.prototype.callSuper = function () {
    var a = Scroll.Object.prototype.callSuper.caller;
    if (Scroll.Utils.objectHasMethod(a, "superclass")) a.superclass.apply(this, arguments);
    else {
        var b = a._class.superclass.prototype;
        a = a._name;
        if (Scroll.Utils.objectHasMethod(b, a)) return b[a].apply(this, arguments)
    }
};
Scroll.Object.prototype.isPropertyObserved = function (a) {
    return !Scroll.Utils.objectIsUndefined(this.observedProperties[a])
};
Scroll.Object.prototype.addPropertyObserver = function (a, b, c) {
    var d = this.observedProperties[a];
    if (this.isPropertyObserved(a)) {
        if (d.targets.indexOf(b) > -1) return
    } else d = this.observedProperties[a] = {
        targets: [],
        methodNames: []
    };
    c = c || Scroll.Object.PROPERTY_CHANGED;
    if (Scroll.Utils.objectHasMethod(b, c)) {
        d.targets.push(b);
        d.methodNames.push(c)
    }
};
Scroll.Object.prototype.notifyPropertyChange = function (a) {
    if (this.isPropertyObserved(a)) {
        var b = this.observedProperties[a],
            c = b.targets.slice();
        b = b.methodNames.slice();
        for (var d = 0; d < c.length; d++) c[d][b[d]](this, a)
    }
};
Scroll.Object.prototype.callMethodNameAfterDelay = function (a, b) {
    var c = this,
        d = Array.prototype.slice.call(arguments, 2),
        e = function () {
            c[a].apply(c, d)
        };
    e.displayName = Scroll.Utils.createDisplayName(this.constructor.displayName || this.constructor.name, a);
    return setTimeout(e, b * 1E3)
};
Scroll.notificationEvents = {};
Scroll.registerForNotificationEvent = function (a) {
    Scroll.notificationEvents[a] = true
};
Scroll.EventTarget = {};
Scroll.EventTarget.addEventListener = function (a, b, c) {
    Scroll.registerForNotificationEvent(a);
    this.eventTarget.addEventListener(a, b, c)
};
Scroll.EventTarget.removeEventListener = function (a, b, c) {
    this.eventTarget.removeEventListener(a, b, c)
};
Scroll.EventTarget.dispatchEvent = function (a) {
    this.eventTarget.dispatchEvent(a)
};
Scroll.EventTarget.dispatchNotification = function (a, b, c) {
    if (Scroll.Utils.objectHasMethod(b, a)) {
        var d = [this];
        if (c) d = d.concat(c.map(function (e) {
            return e[1]
        }));
        b[a].apply(b, d)
    }
    this.createAndDispatchEvent(a, c)
};
Scroll.EventTarget.createEvent = function (a, b) {
    var c = document.createEvent("Event");
    c.initEvent(a, true, false);
    if (!c.ad) c.ad = {};
    c.ad.sender = this;
    if (b) for (var d = 0; d < b.length; d++) c.ad[b[d][0]] = b[d][1];
    return c
};
Scroll.EventTarget.createAndDispatchEvent = function (a, b) {
    Scroll.notificationEvents[a] && this.dispatchEvent(this.createEvent(a, b))
};
Scroll.Utils.setupDisplayNames(Scroll.EventTarget, "Scroll.EventTarget");
Element.prototype.hasClassName = function (a) {
    return RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className)
};
Element.prototype.addClassName = function (a) {
    if (this.hasClassName(a)) return false;
    else {
        this.className = [this.className, a].join(" ");
        return true
    }
};
Element.prototype.removeClassName = function (a) {
    if (this.hasClassName(a)) {
        this.className = this.className.replace(RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)", "g"), " ");
        return true
    }
    return false
};
Element.prototype.toggleClassName = function (a, b) {
    if (b == null) b = !this.hasClassName(a);
    this[b ? "addClassName" : "removeClassName"](a)
};
Scroll.Utils.setupDisplayNames(Element, "Element");
Node.prototype.getNearestView = function () {
    for (var a = this; Scroll.Utils.objectIsUndefined(a._view) && a.parentNode;) a = a.parentNode;
    return Scroll.Utils.objectIsUndefined(a._view) ? null : a._view
};
Scroll.Utils.setupDisplayNames(Node, "Node");
WebKitCSSMatrix.prototype.equals = function (a) {
    for (var b = 1; b <= 4; b++) for (var c = 1; c <= 4; c++) {
        var d = "m" + b + c;
        if (this[d] !== a[d]) return false
    }
    return true
};
Scroll.Utils.setupDisplayNames(WebKitCSSMatrix, "WebKitCSSMatrix");
Scroll.Point = function (a, b) {
    this.x = a != null && !isNaN(a) ? a : 0;
    this.y = b != null && !isNaN(b) ? b : 0
};
Scroll.Point.fromEvent = function (a) {
    a = a.touches && a.touches.length > 0 ? a.touches[0] : a;
    return new Scroll.Point(a.pageX, a.pageY)
};
Scroll.Point.fromEventInElement = function (a, b) {
    a = a.touches && a.touches.length > 0 ? a.touches[0] : a;
    var c = window.webkitConvertPointFromPageToNode(b, new WebKitPoint(a.pageX, a.pageY));
    return new Scroll.Point(c.x, c.y)
};
Scroll.Point.prototype.toString = function () {
    return "Scroll.Point[" + this.x + "," + this.y + "]"
};
Scroll.Point.prototype.copy = function () {
    return new Scroll.Point(this.x, this.y)
};
Scroll.Point.prototype.equals = function (a) {
    return this.x == a.x && this.y == a.y
};
Scroll.Utils.setupDisplayNames(Scroll.Point, "Scroll.Point");
Scroll.Size = function (a, b) {
    this.width = a != null && !isNaN(a) ? a : 0;
    this.height = b != null && !isNaN(b) ? b : 0
};
Scroll.Size.ZERO_SIZE = new Scroll.Size(0, 0);
Scroll.Size.prototype.toString = function () {
    return "Scroll.Size[" + this.width + "," + this.height + "]"
};
Scroll.Size.prototype.copy = function () {
    return new Scroll.Size(this.width, this.height)
};
Scroll.Size.prototype.equals = function (a) {
    return this.width == a.width && this.height == a.height
};
Scroll.Utils.setupDisplayNames(Scroll.Size);
Scroll.Rect = function (a, b, c, d) {
    this.origin = new Scroll.Point(a || 0, b || 0);
    this.size = new Scroll.Size(c || 0, d || 0)
};
Scroll.Rect.ZERO_RECT = new Scroll.Rect(0, 0, 0, 0);
Scroll.Rect.prototype.toString = function () {
    return "Scroll.Rect[" + [this.origin.x, this.origin.y, this.size.width, this.size.height].join(", ") + "]"
};
Scroll.Rect.prototype.copy = function () {
    return new Scroll.Rect(this.origin.x, this.origin.y, this.size.width, this.size.height)
};
Scroll.Rect.prototype.equals = function (a) {
    return this.origin.equals(a.origin) && this.size.equals(a.size)
};
Scroll.Rect.prototype.inset = function (a) {
    return new Scroll.Rect(this.origin.x + a.left, this.origin.y + a.top, this.size.width - a.left - a.right, this.size.height - a.top - a.bottom)
};
Scroll.Rect.prototype.minX = function () {
    return this.origin.x
};
Scroll.Rect.prototype.minY = function () {
    return this.origin.y
};
Scroll.Rect.prototype.midX = function () {
    return this.origin.x + this.size.width / 2
};
Scroll.Rect.prototype.midY = function () {
    return this.origin.y + this.size.height / 2
};
Scroll.Rect.prototype.maxX = function () {
    return this.origin.x + this.size.width
};
Scroll.Rect.prototype.maxY = function () {
    return this.origin.y + this.size.height
};
Scroll.Rect.prototype.intersectionWithRect = function (a) {
    var b = new Scroll.Rect,
        c = Math.max(this.minX(), a.minX()),
        d = Math.min(this.maxX(), a.maxX());
    if (c > d) return Scroll.Rect.ZERO_RECT;
    b.origin.x = c;
    b.size.width = d - c;
    c = Math.max(this.minY(), a.minY());
    a = Math.min(this.maxY(), a.maxY());
    if (c > a) return Scroll.Rect.ZERO_RECT;
    b.origin.y = c;
    b.size.height = a - c;
    return b
};
Scroll.Utils.setupDisplayNames(Scroll.Rect);
Scroll.EdgeInsets = function (a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d
};
Scroll.Class({
    name: "Scroll.View",
    superclass: Scroll.Object,
    mixins: [Scroll.EventTarget],
    synthesizedProperties: ["id", "position", "size", "frame", "transform", "anchorPoint", "doubleSided", "zIndex", "opacity", "clipsToBounds", "hidden", "wantsHardwareLayerBacking", "transitionsEnabled", "transitionsDuration", "hostingLayer", "userInteractionEnabled", "declarativeLayerWasInitialized", "eventTarget", "layerIsInDocument", "touchLayer", "tracking"],
    cssClassName: "x-view",
    collectionAccessor: "views"
});
Scroll.View.prototype.init = function (a) {
    this.callSuper();
    if (Scroll.Utils.objectIsString(a)) a = document.querySelector(a);
    this.layer = a;
    this.superview = null;
    this.subviews = [];
    this.autoresizesSubviews = this.tracksAllTouchesOnceTouchesBegan = true;
    this.autoresizingMask = Scroll.View.AUTORESIZING_NONE;
    this._layerIsInDocument = false;
    this._position = new Scroll.Point;
    this._size = new Scroll.Size;
    this._anchorPoint = new Scroll.Point(0.5, 0.5);
    this._doubleSided = true;
    this._zIndex = 0;
    this._transform = "none";
    this._transitionsEnabled = this._wantsHardwareLayerBacking = this._hidden = this._clipsToBounds = false;
    this._transitionsDuration = 0.5;
    this._hostingLayer = null;
    this._userInteractionEnabled = false;
    this._touchLayer = null;
    this.touchInside = this._tracking = false;
    this.gestureRecognizers = [];
    this.usesDeclarativeBacking = a instanceof Element;
    this._declarativeLayerWasInitialized = false;
    if (this.usesDeclarativeBacking) {
        if (Scroll.Utils.isElementInDocument(this.layer)) {
            this._layerIsInDocument = true;
            this.initWithDeclarativeBacking();
            this.layerWasInsertedIntoDocument()
        }
    } else {
        this.createLayer();
        this.setupCSSClasses();
        this.layerWasCreated()
    }
    this.layer._view = this
};
Scroll.View.MANAGED_BY_VIEW_CONTROLLER_ATTR = "x-managed-by-view-controller";
Scroll.View.AUTORESIZING_NONE = 0;
Scroll.View.AUTORESIZING_FLEXIBLE_LEFT_MARGIN = 1;
Scroll.View.AUTORESIZING_FLEXIBLE_WIDTH = 2;
Scroll.View.AUTORESIZING_FLEXIBLE_RIGHT_MARGIN = 4;
Scroll.View.AUTORESIZING_FLEXIBLE_TOP_MARGIN = 8;
Scroll.View.AUTORESIZING_FLEXIBLE_HEIGHT = 16;
Scroll.View.AUTORESIZING_FLEXIBLE_BOTTOM_MARGIN = 32;
Scroll.View.PROPERTY_MAPPING = {
    opacity: "opacity",
    transform: "-webkit-transform",
    position: "-webkit-transform",
    anchorPoint: "-webkit-transform-origin",
    doubleSided: "-webkit-backface-visibility",
    zIndex: "z-index"
};
Scroll.View.ATTRIBUTE_PREFIX = "x-";
Scroll.View.EVENT_ATTRIBUTE_PREFIX = Scroll.View.ATTRIBUTE_PREFIX + "on";
Scroll.View.LAYER_STYLE_DID_CHANGE_EVENT = "viewLayerStyleDidChange";
Scroll.View.INSIDE_PADDING = Scroll.IS_IPAD ? 25 : 70;
Scroll.View.TOUCH_DOWN_EVENT = "viewTouchDown";
Scroll.View.TOUCH_DRAG_INSIDE_EVENT = "viewTouchDragInside";
Scroll.View.TOUCH_DRAG_OUTSIDE_EVENT = "viewTouchDragOutside";
Scroll.View.TOUCH_DRAG_ENTER_EVENT = "viewTouchDragEnter";
Scroll.View.TOUCH_DRAG_EXIT_EVENT = "viewTouchDragExit";
Scroll.View.TOUCH_UP_INSIDE_EVENT = "viewTouchUpInside";
Scroll.View.TOUCH_UP_OUTSIDE_EVENT = "viewTouchUpOutside";
Scroll.View.TOUCH_CANCEL_EVENT = "viewTouchCancel";
Scroll.View.TOUCH_STATE_CHANGE_EVENT = "viewTouchStateChange";
Scroll.View.synthesizedEvents = [Scroll.View.TOUCH_DOWN_EVENT, Scroll.View.TOUCH_DRAG_INSIDE_EVENT, Scroll.View.TOUCH_DRAG_OUTSIDE_EVENT, Scroll.View.TOUCH_DRAG_ENTER_EVENT, Scroll.View.TOUCH_DRAG_EXIT_EVENT, Scroll.View.TOUCH_UP_INSIDE_EVENT, Scroll.View.TOUCH_UP_OUTSIDE_EVENT, Scroll.View.TOUCH_CANCEL_EVENT, Scroll.View.TOUCH_STATE_CHANGE_EVENT];
Scroll.View.dispatchesStyleChangeEvents = false;
Scroll.View.prototype.createLayer = function () {
    this.layer = document.createElement("div")
};
Scroll.View.prototype.initWithDeclarativeBacking = function () {
    this.setupLayer();
    this.layerWasCreated();
    this.setupCSSClasses();
    this.readPropertiesFromLayerComputedStyle(window.getComputedStyle(this.layer));
    this.declarativeLayerWasInitialized = true
};
Scroll.View.prototype.setupLayer = function () {
    this.lookupViewLayersInLayer(this.hostingLayer)
};
Scroll.View.prototype.lookupViewLayersInLayer = function (a) {
    for (a = a.firstElementChild; a;) {
        if (!a.hasOwnProperty("_view")) {
            var b = Scroll.Utils.getViewClassForLayer(a);
            if (b) {
                b = new b(a);
                b._indexInSuperviewSubviews = this.subviews.push(b) - 1;
                b.willMoveToSuperview(this);
                b.superview = this;
                b.didMoveToSuperview()
            } else this.lookupViewLayersInLayer(a)
        }
        a = a.nextElementSibling
    }
};
Scroll.View.prototype.setupCSSClasses = function () {
    for (var a = this.constructor; a.superclass;) {
        (cssClassName = a.cssClassName) && this.layer.addClassName(cssClassName);
        if (a === Scroll.View) break;
        a = a.superclass
    }
};
Scroll.View.prototype.readPropertiesFromLayerComputedStyle = function (a) {
    this._size.width = parseInt(a.width, 10);
    this._size.height = parseInt(a.height, 10);
    this._position.x = parseInt(a.left, 10);
    this._position.y = parseInt(a.top, 10);
    this._zIndex = parseInt(a.zIndex, 10);
    this._clipsToBounds = a.overflow == "hidden";
    this._doubleSided = a.webkitBackfaceVisibility == "visible";
    this._transform = a.webkitTransform;
    this._hidden = a.visibility == "hidden";
    a = Scroll.Utils.CSSMatrixFromString(this._transform);
    var b = new WebKitCSSMatrix;
    if (!a.equals(b)) {
        this._position.x += a.m41;
        this._position.y += a.m42;
        a = a.translate(a.m41 * -1, a.m42 * -1, 0);
        this._transform = a.toString()
    }
    if (this._transform != "none") this._wantsHardwareLayerBacking = true
};
Scroll.View.prototype.setLayerStyle = function (a) {
    for (var b in a) this.layer.style.setProperty(b, a[b]);
    Scroll.View.dispatchesStyleChangeEvents && this.createAndDispatchEvent(Scroll.View.LAYER_STYLE_DID_CHANGE_EVENT, [
        ["changedProperties", a]
    ])
};
Scroll.View.prototype.toString = function () {
    return [this.constructor.displayName, "[", this._size.width, "x", this._size.height, "@", this._position.x, ",", this._position.y, "]"].join("")
};
Scroll.View.prototype.setPosition = function (a) {
    if (!this._position.equals(a)) {
        this._position = a;
        this.updatePositionAndTransform()
    }
};
Scroll.View.prototype.setSize = function (a) {
    if (!this._size.equals(a)) {
        var b = this._size.copy();
        this._size = a;
        this.setLayerStyle({
            width: a.width + "px",
            height: a.height + "px"
        });
        this.autoresizesSubviews && this.resizeSubviewsWithOldSize(b)
    }
};
Scroll.View.prototype.updatePositionAndTransform = function () {
    this._wantsHardwareLayerBacking || this._transitionsEnabled ? this.setLayerStyle({
        left: "0",
        top: "0",
        "-webkit-transform": Scroll.Utils.concatenateTransforms(Scroll.Utils.t(this._position.x, this._position.y), this._transform)
    }) : this.setLayerStyle({
        left: Scroll.Utils.px(this._position.x),
        top: Scroll.Utils.px(this._position.y),
        "-webkit-transform": this._transform
    })
};
Scroll.View.prototype.getOpacity = function () {
    return parseFloat(window.getComputedStyle(this.layer).opacity || 1)
};
Scroll.View.prototype.setOpacity = function (a) {
    this.setLayerStyle({
        opacity: a
    })
};
Scroll.View.prototype.getHostingLayer = function () {
    return this._hostingLayer != null ? this._hostingLayer : this.layer
};
Scroll.View.prototype.addSubview = function (a) {
    return this.insertSubviewAtIndex(a, this.subviews.length)
};
Scroll.View.prototype.insertSubviewAtIndex = function (a, b) {
    var c = this.subviews;
    if (!(b > c.length)) {
        var d = a.superview,
            e;
        if (d == this) {
            e = a._indexInSuperviewSubviews;
            c.splice(e, 1);
            b > e && b--
        } else {
            d && d.removeSubview(a);
            a.willMoveToSuperview(this)
        }
        c.splice(b, 0, a);
        a._indexInSuperviewSubviews = b;
        for (e = e != null && e < b ? e : b + 1; e < c.length; e++) c[e]._indexInSuperviewSubviews = e;
        c = c[b + 1];
        this.hostingLayer.insertBefore(a.layer, c ? c.layer : null);
        if (d != this) {
            a.superview = this;
            a.didMoveToSuperview()
        }
        this.didAddSubview(a);
        this._layerIsInDocument && !a._layerIsInDocument && a.dispatchNotificationOfLayerInsertionIntoDocument();
        return a
    }
};
Scroll.View.prototype.dispatchNotificationOfLayerInsertionIntoDocument = function () {
    for (var a = this.subviews, b = 0, c = a.length; b < c; b++) a[b].dispatchNotificationOfLayerInsertionIntoDocument();
    this.layerWasInsertedIntoDocument()
};
Scroll.View.prototype.layerWasCreated = function () {};
Scroll.View.prototype.willMoveToSuperview = function () {};
Scroll.View.prototype.didMoveToSuperview = function () {};
Scroll.View.prototype.didAddSubview = function () {};
Scroll.View.prototype.willRemoveSubview = function () {};
Scroll.View.prototype.layerWasInsertedIntoDocument = function () {
    if (this.usesDeclarativeBacking) if (this.declarativeLayerWasInitialized) {
        var a = window.getComputedStyle(this.layer);
        if (isNaN(this._size.width)) {
            this._size.width = parseInt(a.width, 10);
            this._size.height = parseInt(a.height, 10)
        }
        if (isNaN(this._position.x)) {
            this._position.x = parseInt(a.left, 10);
            this._position.y = parseInt(a.top, 10)
        }
    } else this.initWithDeclarativeBacking();
    this.layerIsInDocument = true
};
Scroll.View.prototype.layerWasRemovedFromDocument = function () {
    this.layerIsInDocument = false
};
Scroll.View.prototype.setUserInteractionEnabled = function (a) {
    if (this._userInteractionEnabled != a) {
        this.layer[(a ? "add" : "remove") + "EventListener"](Scroll.START_EVENT, this, false);
        this._userInteractionEnabled = a
    }
};
Scroll.View.prototype.handleEvent = function (a) {
    switch (a.type) {
    case Scroll.START_EVENT:
        this.touchesBegan(a);
        break;
    case Scroll.MOVE_EVENT:
        this.touchesMoved(a);
        break;
    case Scroll.END_EVENT:
        this.touchesEnded(a);
        break;
    case Scroll.CANCEL_EVENT:
        this.touchesCancelled(a)
    }
};
Scroll.View.prototype.touchesBegan = function (a) {
    if (this.tracksAllTouchesOnceTouchesBegan) {
        window.addEventListener(Scroll.MOVE_EVENT, this, true);
        window.addEventListener(Scroll.END_EVENT, this, true);
        window.addEventListener(Scroll.CANCEL_EVENT, this, true)
    }
    a.preventDefault();
    this.touchInside = this.tracking = true;
    this.dispatchEvent(this.createUIEvent(Scroll.View.TOUCH_DOWN_EVENT, a));
    this.createAndDispatchEvent(Scroll.View.TOUCH_STATE_CHANGE_EVENT);
    this.lastProcessedEvent = a
};
Scroll.View.prototype.touchesMoved = function (a) {
    a.preventDefault();
    var b = this.pointInsidePaddedBounds(Scroll.Point.fromEventInElement(a, this.layer)),
        c = b ? Scroll.View.TOUCH_DRAG_INSIDE_EVENT : Scroll.View.TOUCH_DRAG_OUTSIDE_EVENT;
    if (b != this.touchInside) {
        c = (this.touchInside = b) ? Scroll.View.TOUCH_DRAG_ENTER_EVENT : Scroll.View.TOUCH_DRAG_EXIT_EVENT;
        this.createAndDispatchEvent(Scroll.View.TOUCH_STATE_CHANGE_EVENT)
    }
    this.dispatchEvent(this.createUIEvent(c, a));
    this.lastProcessedEvent = a
};
Scroll.View.prototype.createUIEvent = function (a, b) {
    var c = Scroll.Utils.createUIEvent(a, b);
    if (!c.ad) c.ad = {};
    c.ad.sender = this;
    return c
};
Scroll.View.prototype.pointInsidePaddedBounds = function (a) {
    var b = Scroll.View.INSIDE_PADDING;
    return a.x >= -b && a.x <= this.size.width + b && a.y >= -b && a.y <= this.size.height + b
};
Scroll.View.prototype.pointInside = function (a) {
    return a.x >= 0 && a.x <= this.size.width && a.y >= 0 && a.y <= this.size.height
};
Scroll.View.prototype.resizeSubviewsWithOldSize = function (a) {
    for (var b = 0; b < this.subviews.length; b++) this.subviews[b].resizeWithOldSuperviewSize(a)
};
Scroll.View.prototype.resizeWithOldSuperviewSize = function (a) {
    var b = this._position.copy(),
        c = this._size.copy(),
        d = this.autoresizingMask,
        e;
    switch ((d & Scroll.View.AUTORESIZING_FLEXIBLE_LEFT_MARGIN) + (d & Scroll.View.AUTORESIZING_FLEXIBLE_WIDTH) + (d & Scroll.View.AUTORESIZING_FLEXIBLE_RIGHT_MARGIN)) {
    case Scroll.View.AUTORESIZING_FLEXIBLE_LEFT_MARGIN:
        b.x += this.superview._size.width - a.width;
        break;
    case Scroll.View.AUTORESIZING_FLEXIBLE_WIDTH:
        c.width = this.superview._size.width - (a.width - this._size.width);
        break;
    case Scroll.View.AUTORESIZING_FLEXIBLE_LEFT_MARGIN | Scroll.View.AUTORESIZING_FLEXIBLE_WIDTH:
        e = a.width - this._size.width - this._position.x;
        b.x = this._position.x / (a.width - e) * (this.superview._size.width - e);
        c.width = this.superview._size.width - b.x - e;
        break;
    case Scroll.View.AUTORESIZING_FLEXIBLE_LEFT_MARGIN | Scroll.View.AUTORESIZING_FLEXIBLE_RIGHT_MARGIN:
        e = a.width - this._size.width - this._position.x;
        b.x += (this.superview._size.width - a.width) * (this.position.x / (this.position.x + e));
        break;
    case Scroll.View.AUTORESIZING_FLEXIBLE_RIGHT_MARGIN | Scroll.View.AUTORESIZING_FLEXIBLE_WIDTH:
        e = a.width - this._size.width - this._position.x;
        scaled_right_margin = e / (a.width - this._position.x) * (this.superview._size.width - this._position.x);
        c.width = this.superview._size.width - b.x - scaled_right_margin;
        break;
    case Scroll.View.AUTORESIZING_FLEXIBLE_LEFT_MARGIN | Scroll.View.AUTORESIZING_FLEXIBLE_WIDTH | Scroll.View.AUTORESIZING_FLEXIBLE_RIGHT_MARGIN:
        b.x = this._position.x / a.width * this.superview._size.width;
        c.width = this._size.width / a.width * this.superview._size.width
    }
    switch ((d & Scroll.View.AUTORESIZING_FLEXIBLE_TOP_MARGIN) + (d & Scroll.View.AUTORESIZING_FLEXIBLE_HEIGHT) + (d & Scroll.View.AUTORESIZING_FLEXIBLE_BOTTOM_MARGIN)) {
    case Scroll.View.AUTORESIZING_FLEXIBLE_TOP_MARGIN:
        b.y += this.superview._size.height - a.height;
        break;
    case Scroll.View.AUTORESIZING_FLEXIBLE_HEIGHT:
        c.height = this.superview._size.height - (a.height - this._size.height);
        break;
    case Scroll.View.AUTORESIZING_FLEXIBLE_TOP_MARGIN | Scroll.View.AUTORESIZING_FLEXIBLE_HEIGHT:
        d = a.height - this._size.height - this._position.y;
        b.y = this._position.y / (a.height - d) * (this.superview._size.height - d);
        c.height = this.superview._size.height - b.y - d;
        break;
    case Scroll.View.AUTORESIZING_FLEXIBLE_TOP_MARGIN | Scroll.View.AUTORESIZING_FLEXIBLE_BOTTOM_MARGIN:
        d = a.height - this._size.height - this._position.y;
        b.y += (this.superview._size.height - a.height) * (this.position.y / (this.position.y + d));
        break;
    case Scroll.View.AUTORESIZING_FLEXIBLE_BOTTOM_MARGIN | Scroll.View.AUTORESIZING_FLEXIBLE_HEIGHT:
        d = a.height - this._size.height - this._position.y;
        scaled_bottom_margin = d / (a.height - this._position.y) * (this.superview._size.height - this._position.y);
        c.height = this.superview._size.height - b.y - scaled_bottom_margin;
        break;
    case Scroll.View.AUTORESIZING_FLEXIBLE_TOP_MARGIN | Scroll.View.AUTORESIZING_FLEXIBLE_HEIGHT | Scroll.View.AUTORESIZING_FLEXIBLE_BOTTOM_MARGIN:
        b.y = this._position.y / a.height * this.superview._size.height;
        c.height = this._size.height / a.height * this.superview._size.height
    }
    this.position = b;
    this.size = c
};
Scroll.View.prototype.descendantViewsOfClass = function (a) {
    return Scroll.Utils.viewsForClassAndNode(a, this.layer)
};
Scroll.View.prototype.getEventTarget = function () {
    return this.layer
};
Scroll.View.prototype.addGestureRecognizer = function (a) {
    if (this.gestureRecognizers.indexOf(a) == -1) {
        a.view !== null && a.view !== this && a.view.removeGestureRecognizer(a);
        this.gestureRecognizers.push(a);
        a.view = this
    }
};
Scroll.View.prototype.removeGestureRecognizer = function (a) {
    if (Scroll.Utils.removeObjectFromArray(a, this.gestureRecognizers)) a.view = null
};
Scroll.View.prototype.convertPointToView = function (a, b) {
    var c = window.webkitConvertPointFromNodeToPage(this.layer, new WebKitPoint(a.x, a.y));
    c = window.webkitConvertPointFromPageToNode(b.layer, c);
    return new Scroll.Point(c.x, c.y)
};
Scroll.View.prototype.convertPointFromView = function (a, b) {
    return b.convertPointToView(a, this)
};
Scroll.View.initialize = function () {
    var a = this;
    if (this.hasOwnProperty("cssClassName")) {
        Object.defineProperty(this, "views", {
            get: function () {
                return Scroll.Utils.viewsForClassAndNode(a, document)
            }
        });
        Scroll.Utils.registerClassForHTMLViewLoading(this);
        a.hasOwnProperty("collectionAccessor") && Object.defineProperty(Scroll.View.prototype, this.collectionAccessor, {
            get: function () {
                return this.descendantViewsOfClass(a)
            }
        })
    }
    if (!this.hasOwnProperty("synthesizedEventMap")) this.synthesizedEventMap = {};
    for (var b = this; b;) {
        if (b.hasOwnProperty("synthesizedEvents")) for (var c = b.synthesizedEvents, d = 0, e = c.length; d < e; d++) {
            var f = c[d];
            this.synthesizedEventMap[Scroll.View.EVENT_ATTRIBUTE_PREFIX + f.toLowerCase()] = f
        }
        b = b.superclass
    }
};
Scroll.Class({
    name: "Scroll.ViewController",
    superclass: Scroll.Object,
    mixins: [Scroll.EventTarget],
    synthesizedProperties: ["view", "title", "loadingRequiredFiles", "viewWasProcessed", "contentView", "interfaceOrientation"]
});
Scroll.ViewController.__minimalViewLoadingTime = 0;
Scroll.ViewController.prototype.init = function (a) {
    this.stateChangeDelegate = this.requiredFilesLoadDelegate = null;
    this.callSuper();
    this.configuration = {};
    this.openRequests = [];
    this.loadedContentViewMarkup = null;
    this.viewIsLoaded = this.loadedAllRequiredFiles = this.shouldSetUpContentViewUponLoad = false;
    if (Scroll.Utils.objectIsString(a)) this.configuration = {
        id: a
    };
    else if (a !== undefined && a !== null) this.configuration = a;
    this.id = this.configuration.id || Scroll.ViewController.uniqueId();
    this._contentView = this._view = null;
    this._title = "";
    this._toolbarItems = this._navigationItem = this._tabBarItem = null;
    this.hidesBottomBarWhenPushed = this._viewWasProcessed = false;
    this.outlets = {};
    this.eventTarget = document;
    this.searchDisplayController = this.modalTransitionStyle = this.parentViewController = this.modalViewController = null;
    this.wasBackItemTransition = Scroll.ViewController.TRANSITION_IN_FROM_LEFT;
    this.becomesBackItemTransition = Scroll.ViewController.TRANSITION_OUT_TO_LEFT;
    this.wasTopItemTransition = Scroll.ViewController.TRANSITION_OUT_TO_RIGHT;
    this.becomesTopItemTransition = Scroll.ViewController.TRANSITION_IN_FROM_RIGHT;
    this.becomesHiddenTransition = Scroll.ViewController.TRANSITION_DISSOLVE_OUT;
    this.becomesVisibleTransition = Scroll.ViewController.TRANSITION_DISSOLVE_IN;
    this.buildOutActionListShouldDelayTransition = this.buildInActionListShouldOccurAfterTransition = false;
    this.viewLoadingDelaysTransition = true;
    this.__minimalViewLoadingTime = Scroll.ViewController.__minimalViewLoadingTime;
    this.contentSizeForViewInPopover = new Scroll.Size(320, 1100);
    this.modalInPopover = false;
    Scroll.ViewController.instances[this.id] = this;
    Scroll.Utils.copyPropertiesFromSourceToTarget(this.configuration.properties, this);
    this.actionListManagersByName = [];
    this.actionListByName = {};
    this.actionListNameByClassName = {};
    if (a = this.configuration.actionLists) for (var b = 0; b < a.length; b++) this.loadActionList(a[b])
};
Scroll.ViewController.instances = {};
Scroll.ViewController.viewProcessors = [];
Scroll.ViewController.WILL_LOAD_REQUIRED_FILES = "viewControllerWillLoadRequiredFiles";
Scroll.ViewController.PROGRESS_LOADING_REQUIRED_FILES = "viewControllerProgressLoadingRequiredFiles";
Scroll.ViewController.DID_LOAD_REQUIRED_FILES = "viewControllerDidLoadRequiredFiles";
Scroll.ViewController.DID_ABORT_LOAD_REQUIRED_FILES = "viewControllerDidAbortLoadRequiredFiles";
Scroll.ViewController.DID_ENTER_STATE = "viewControllerDidEnterState";
Scroll.ViewController.DID_EXIT_STATE = "viewControllerDidExitState";
Scroll.ViewController.VIEW_WILL_APPEAR_STATE = "x-view-will-appear";
Scroll.ViewController.VIEW_DID_APPEAR_STATE = "x-view-did-appear";
Scroll.ViewController.VIEW_WILL_DISAPPEAR_STATE = "x-view-will-disappear";
Scroll.ViewController.VIEW_DID_DISAPPEAR_STATE = "x-view-did-disappear";
Scroll.ViewController.APPEARANCE_STATES = [Scroll.ViewController.VIEW_WILL_APPEAR_STATE, Scroll.ViewController.VIEW_DID_APPEAR_STATE, Scroll.ViewController.VIEW_WILL_DISAPPEAR_STATE, Scroll.ViewController.VIEW_DID_DISAPPEAR_STATE];
Scroll.ViewController.VIEW_WILL_APPEAR_EVENT = "viewControllerViewWillAppear";
Scroll.ViewController.VIEW_DID_APPEAR_EVENT = "viewControllerViewDidAppear";
Scroll.ViewController.VIEW_WILL_DISAPPEAR_EVENT = "viewControllerViewWillDisappear";
Scroll.ViewController.VIEW_DID_DISAPPEAR_EVENT = "viewControllerViewDidDisappear";
Scroll.ViewController.VIEW_DID_LOAD = "viewControllerViewDidLoad";
Scroll.ViewController.VIEW_DID_UNLOAD = "viewControllerViewDidUnload";
Scroll.ViewController.ACTION_LIST_WILL_START = "viewControllerActionListWillStart";
Scroll.ViewController.ACTION_LIST_DID_START = "viewControllerActionListDidStart";
Scroll.ViewController.ACTION_LIST_WILL_ITERATE = "viewControllerActionListWillIterate";
Scroll.ViewController.ACTION_LIST_DID_ITERATE = "viewControllerActionListDidIterate";
Scroll.ViewController.ACTION_LIST_WILL_COMPLETE = "viewControllerActionListWillComplete";
Scroll.ViewController.ACTION_LIST_DID_COMPLETE = "viewControllerActionListDidComplete";
Scroll.ViewController.ACTION_LIST_DID_CANCEL = "viewControllerActionListDidCancel";
Scroll.ViewController.ACTION_LIST_PROGRESS_UPDATED = "viewControllerProgressPlayingActionList";
Scroll.ViewController.TRANSITION_IN_FROM_RIGHT = {
    properties: ["transform"],
    from: ["translateX($width)"],
    to: ["translateX(0)"]
};
Scroll.ViewController.TRANSITION_IN_FROM_LEFT = {
    properties: ["transform"],
    from: ["translateX(-$width)"],
    to: ["translateX(0)"]
};
Scroll.ViewController.TRANSITION_OUT_TO_RIGHT = {
    properties: ["transform"],
    from: ["translateX(0)"],
    to: ["translateX($width)"]
};
Scroll.ViewController.TRANSITION_OUT_TO_LEFT = {
    properties: ["transform"],
    from: ["translateX(0)"],
    to: ["translateX(-$width)"]
};
Scroll.ViewController.TRANSITION_DISSOLVE_OUT = {
    properties: ["opacity"],
    from: [1],
    to: [0]
};
Scroll.ViewController.TRANSITION_DISSOLVE_IN = {
    properties: ["opacity"],
    from: [0],
    to: [1]
};
Scroll.ViewController.DECLARATIVE_MIME_TYPE = "application/vnd.apple.iadjs; type=view-controllers";
Scroll.ViewController.prototype.getView = function () {
    this._view === null && this.loadView();
    return this._view
};
Scroll.ViewController.prototype.setView = function (a) {
    this._view instanceof Scroll.View && delete this._view._viewController;
    a._viewController = this;
    this._view = a;
    this._viewFromSetter = true;
    a.usesDeclarativeBacking && a.layer.hasAttribute("x-content-view") ? this.loadContentView(a.layer.getAttribute("x-content-view")) : this.processView()
};
Scroll.ViewController.prototype.setContentView = function (a) {
    a.autoresizingMask = Scroll.View.AUTORESIZING_FLEXIBLE_WIDTH | Scroll.View.AUTORESIZING_FLEXIBLE_HEIGHT;
    a.superview = this._view;
    a._indexInSuperviewSubviews = this._view.subviews.push(a) - 1;
    this._contentView = a
};
Scroll.ViewController.prototype.loadView = function () {
    if (this.__minimalViewLoadingTime > 0) this.__loadViewStartTime = new Date;
    this._view = new Scroll.View;
    this._view._viewController = this;
    this.configuration.hasOwnProperty("requiredFileURIs") ? this.loadContentView() : this.processView()
};
Scroll.ViewController.prototype.loadContentView = function (a) {
    if (a) {
        if (!this.configuration.hasOwnProperty("requiredFileURIs")) this.configuration.requiredFileURIs = {};
        this.configuration.requiredFileURIs.contentView = a
    }
    if (this.loadingRequiredFiles) this.shouldSetUpContentViewUponLoad = true;
    else if (this.loadedAllRequiredFiles) this.setupContentViewFromLayer();
    else {
        this.shouldSetUpContentViewUponLoad = true;
        this.loadRequiredFiles()
    }
};
Scroll.ViewController.prototype.isViewLoading = function () {
    return this.loadingRequiredFiles || this.loadedAllRequiredFiles && !this.viewIsLoaded
};
Scroll.ViewController.prototype.isViewLoaded = function () {
    return this.viewIsLoaded
};
Scroll.ViewController.prototype.viewDidLoad = function () {
    this.createAndDispatchEvent(Scroll.ViewController.VIEW_DID_LOAD)
};
Scroll.ViewController.prototype.viewDidUnload = function () {
    this.createAndDispatchEvent(Scroll.ViewController.VIEW_DID_UNLOAD)
};
Scroll.ViewController.prototype.setTitle = function (a) {
    this._title = a;
    var b = this.parentViewController;
    if (b != null) if (Scroll.TabBarController != null && b instanceof Scroll.TabBarController) this.tabBarItem.title = a;
    else if (Scroll.NavigationController != null && b instanceof Scroll.NavigationController) this.navigationItem.title = a
};
Scroll.ViewController.prototype.isInState = function (a) {
    return this.view.layer.hasClassName(a)
};
Scroll.ViewController.prototype.enterState = function (a) {
    var b = this.view.layer.addClassName(a);
    b && this.dispatchNotification(Scroll.ViewController.DID_ENTER_STATE, this.stateChangeDelegate, [
        ["state", a]
    ]);
    return b
};
Scroll.ViewController.prototype.exitState = function (a) {
    var b = this.view.layer.removeClassName(a);
    b && this.dispatchNotification(Scroll.ViewController.DID_EXIT_STATE, this.stateChangeDelegate, [
        ["state", a]
    ]);
    return b
};
Scroll.ViewController.prototype.toggleState = function (a, b) {
    if (b == null) b = !this.isInState(a);
    this[b ? "enterState" : "exitState"](a)
};
Scroll.ViewController.prototype.enterExclusiveAppearanceState = function (a) {
    for (var b, c = 0; c < Scroll.ViewController.APPEARANCE_STATES.length; c++) {
        b = Scroll.ViewController.APPEARANCE_STATES[c];
        this[(b === a ? "enter" : "exit") + "State"](b)
    }
};
Scroll.ViewController.prototype.viewWillAppear = function (a) {
    this.createAndDispatchEvent(Scroll.ViewController.VIEW_WILL_APPEAR_EVENT, [
        ["animated", a]
    ]);
    this.enterExclusiveAppearanceState(Scroll.ViewController.VIEW_WILL_APPEAR_STATE)
};
Scroll.ViewController.prototype.viewDidAppear = function (a) {
    this.enterExclusiveAppearanceState(Scroll.ViewController.VIEW_DID_APPEAR_STATE);
    this.createAndDispatchEvent(Scroll.ViewController.VIEW_DID_APPEAR_EVENT, [
        ["animated", a]
    ])
};
Scroll.ViewController.prototype.viewWillDisappear = function (a) {
    this.createAndDispatchEvent(Scroll.ViewController.VIEW_WILL_DISAPPEAR_EVENT, [
        ["animated", a]
    ]);
    this.enterExclusiveAppearanceState(Scroll.ViewController.VIEW_WILL_DISAPPEAR_STATE)
};
Scroll.ViewController.prototype.viewDidDisappear = function (a) {
    this.enterExclusiveAppearanceState(Scroll.ViewController.VIEW_DID_DISAPPEAR_STATE);
    this.createAndDispatchEvent(Scroll.ViewController.VIEW_DID_DISAPPEAR_EVENT, [
        ["animated", a]
    ])
};
Scroll.ViewController.prototype.presentModalViewControllerAnimated = function (a) {
    this.modalViewController = a
};
Scroll.ViewController.prototype.dismissModalViewControllerAnimated = function () {
    this.modalViewController = null
};
Scroll.ViewController.prototype.parentControllerOfKind = function (a) {
    for (var b = this; b = b.parentViewController;) if (b instanceof a) return b;
    return null
};
Scroll.ViewController.prototype.getLoadingRequiredFiles = function () {
    return this.openRequests.length > 0
};
Scroll.ViewController.prototype.loadRequiredFiles = function () {
    if (!this.loadedAllRequiredFiles) {
        this.dispatchNotification(Scroll.ViewController.WILL_LOAD_REQUIRED_FILES, this.requiredFilesLoadDelegate);
        this.numberOfLoadedRequiredFiles = this.totalNumberOfRequiredFiles = 0;
        this.configuration.requiredFileURIs.hasOwnProperty("contentView") && this.loadFilesOfType([this.configuration.requiredFileURIs.contentView], "html");
        this.configuration.requiredFileURIs.hasOwnProperty("stylesheets") && this.loadFilesOfType(this.configuration.requiredFileURIs.stylesheets, "css");
        this.configuration.requiredFileURIs.hasOwnProperty("scripts") && this.loadFilesOfType(this.configuration.requiredFileURIs.scripts, "js");
        this.configuration.requiredFileURIs.hasOwnProperty("images") && this.loadFilesOfType(this.configuration.requiredFileURIs.images, "image")
    }
};
Scroll.ViewController.prototype.loadFilesOfType = function (a, b) {
    for (var c = 0; c < a.length; c++) this.openRequest(a[c], b)
};
Scroll.ViewController.prototype.openRequest = function (a, b) {
    this.totalNumberOfRequiredFiles++;
    var c;
    c = b == "image" ? new Image : new XMLHttpRequest;
    this.openRequests.push(c);
    c._url = a;
    c._type = b;
    c.addEventListener("load", this, false);
    c.addEventListener("error", this, false);
    if (b == "image") c.src = Scroll.HAS_HIDPI_DISPLAY && this.configuration.hasHiDPIVersion ? Scroll.Utils.appendHiDPISuffix(a) : a;
    else {
        c.open("GET", a, true);
        try {
            c.send()
        } catch (d) {
            this.requestDidFail(c)
        }
    }
};
Scroll.ViewController.prototype.abortLoadRequiredFiles = function () {
    for (var a = [], b = 0, c = this.openRequests.length; b < c; b++) {
        var d = this.openRequests[b];
        d.removeEventListener("load", this);
        d.removeEventListener("error", this);
        if (d._type != "image") {
            d.abort();
            a.push(d._url)
        }
    }
    this.openRequests = [];
    this.dispatchNotification(Scroll.ViewController.DID_ABORT_LOAD_REQUIRED_FILES, this.requiredFilesLoadDelegate, [
        ["uris", a]
    ])
};
Scroll.ViewController.prototype.handleEvent = function (a) {
    switch (a.type) {
    case "load":
        this.handleLoadEvent(a);
        break;
    case "error":
        this.requestDidFail(a.target)
    }
};
Scroll.ViewController.prototype.handleLoadEvent = function (a) {
    a = a.target;
    switch (a._type) {
    case "css":
        this.stylesheetDidLoad(a);
        break;
    case "js":
        this.scriptDidLoad(a);
        break;
    case "html":
        this.htmlDidLoad(a)
    }
    this.requestDidComplete(a)
};
Scroll.ViewController.prototype.requestDidFail = function (a) {
    Scroll.Console.warn("Scroll.ViewController \u2014 could not load required file with URI " + a._url);
    this.requestDidComplete(a)
};
Scroll.ViewController.prototype.requestDidComplete = function (a) {
    var b = this.openRequests.indexOf(a);
    b != -1 && this.openRequests.splice(b, 1);
    this.numberOfLoadedRequiredFiles++;
    this.totalNumberOfRequiredFiles > 0 && this.dispatchNotification(Scroll.ViewController.PROGRESS_LOADING_REQUIRED_FILES, this.requiredFilesLoadDelegate, [
        ["progress", this.numberOfLoadedRequiredFiles / this.totalNumberOfRequiredFiles],
        ["url", a._url]
    ]);
    if (!this.loadingRequiredFiles) {
        this.loadedAllRequiredFiles = true;
        this.dispatchNotification(Scroll.ViewController.DID_LOAD_REQUIRED_FILES, this.requiredFilesLoadDelegate);
        this.notifyPropertyChange("loadingRequiredFiles");
        this.shouldSetUpContentViewUponLoad && this.setupContentViewFromLayer()
    }
};
Scroll.ViewController.prototype.stylesheetDidLoad = function (a) {
    var b = document.createElement("style");
    b.textContent = a.responseText;
    document.head.appendChild(b)
};
Scroll.ViewController.prototype.scriptDidLoad = function (a) {
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.src = a._url;
    document.head.appendChild(b)
};
Scroll.ViewController.prototype.htmlDidLoad = function (a) {
    this.loadedContentViewMarkup = a.responseText
};
Scroll.ViewController.prototype.setupContentViewFromLayer = function () {
    var a = Scroll.Utils.createNodeFromString(this.loadedContentViewMarkup);
    this._view.hostingLayer.appendChild(a);
    if (!a.hasAttribute("id")) a.id = this.id;
    this.contentView = Scroll.Utils.getViewWithLayer(a);
    this.contentView.declarativeLayerWasInitialized ? this.processView() : this.contentView.addPropertyObserver("declarativeLayerWasInitialized", this, "processView")
};
Scroll.ViewController.prototype.processView = function () {
    if (!this._view.layer.hasAttribute("id")) this._view.id = this.id + (this.configuration.hasOwnProperty("requiredFileURIs") && this.configuration.requiredFileURIs.hasOwnProperty("contentView") ? "-container" : "");
    this.viewProcessors = [];
    for (var a, b = 0; b < Scroll.ViewController.viewProcessors.length; b++) {
        a = new Scroll.ViewController.viewProcessors[b](this);
        a.processView(this._view);
        this.viewProcessors.push(a)
    }
    if (this.__minimalViewLoadingTime > 0) {
        a = (Date.now() - this.__loadViewStartTime) / 1E3;
        if (a < this.__minimalViewLoadingTime) {
            this.callMethodNameAfterDelay("viewProcessingDidComplete", this.__minimalViewLoadingTime - a);
            return
        }
    }
    this.viewProcessingDidComplete()
};
Scroll.ViewController.prototype.viewProcessingDidComplete = function () {
    if (!this.viewIsLoaded) {
        this.viewIsLoaded = true;
        this.viewDidLoad()
    }
    this.viewWasProcessed = true
};
Scroll.ViewController.prototype.cleanViewProcessors = function () {
    for (; this.viewProcessors.length;) this.viewProcessors.pop().cleanUp();
    this.viewWasProcessed = false
};
Scroll.ViewController.uniqueId = function () {
    return "vc-" + this._uid++
};
Scroll.ViewController._uid = 1;
Scroll.ViewController.addViewProcessor = function (a) {
    Scroll.ViewController.viewProcessors.push(a)
};
Scroll.ViewController.init = function () {
    console.log('ViewController.init: ' + Date.now());
    Scroll.Class.processAllClasses();
    for (var a = document.scripts, b, c = 0; c < a.length; c++) {
        b = a[c];
        b.type == Scroll.ViewController.DECLARATIVE_MIME_TYPE && Scroll.ViewController.handleScriptElementForDeclarativeViewControllers(b)
    }
};
Scroll.ViewController.handleScriptElementForDeclarativeViewControllers = function (a) {
    if (a.src != "") {
        var b = new XMLHttpRequest;
        b._url = a.src;
        b.addEventListener("load", this.handleEventProxy, false);
        b.addEventListener("error", this.handleEventProxy, false);
        b.open("GET", b._url, true);
        b.send()
    } else {
        var c = Function("undefined", "return (" + a.textContent + ");")();
        setTimeout(function () {
            Scroll.ViewController.handleDeclarativeViewControllerDefinitions(c)
        }, 0)
    }
};
Scroll.ViewController.handleEventProxy = function (a) {
    Scroll.ViewController.handleEvent(a)
};
Scroll.ViewController.handleEvent = function (a) {
    var b = a.target;
    switch (a.type) {
    case "load":
        a = Function("undefined", "return (" + b.responseText + ");")();
        Scroll.ViewController.handleDeclarativeViewControllerDefinitions(a);
        break;
    case "error":
        Scroll.Console.error("Failed to read content from JSON file " + b._url)
    }
};
Scroll.ViewController.handleDeclarativeViewControllerDefinitions = function (a) {
    if (Scroll.Utils.objectIsArray(a)) for (var b = 0; b < a.length; b++) Scroll.ViewController.viewControllerWithConfiguration(a[b]);
    else Scroll.ViewController.viewControllerWithConfiguration(a)
};
Scroll.ViewController.viewControllerWithConfiguration = function (a) {
    return new(Scroll.ViewController.constructorMap[a.type] || Scroll.ViewController)(a)
};
Scroll.ViewController.constructorMap = {};
Scroll.ViewController.prototype.startAction = function (a) {
    var b = Scroll.Utils.resolveObjectPath(a.className);
    if (!b) throw Scroll.ActionListManager.INVALID_CLASS_NAME_EXCEPTION;
    b = new b(this);
    var c = a.properties;
    for (var d in c) b[d] = c[d];
    if (a.delay) b.delay = a.delay;
    b.prepare();
    b.run()
};
Scroll.ViewController.prototype.loadActionList = function (a) {
    var b = a.name,
        c = a.cssClassName;
    if (b && a.actions.length > 0) {
        this.actionListByName[b] = a;
        if (c == null) a.cssClassName = c = b.replace(/\s+/g, "-").toLowerCase();
        this.actionListNameByClassName[c] = b
    }
};
Scroll.ViewController.prototype.startActionList = function (a) {
    var b = this.actionListByName[a];
    if (b) {
        var c = this.actionListManagersByName[a];
        c || (this.actionListManagersByName[a] = c = new Scroll.ActionListManager(b, this));
        c.callMethodNameAfterDelay("start", 0)
    }
};
Scroll.ViewController.prototype.cancelActionList = function (a) {
    (a = this.actionListManagersByName[a]) && a.reset()
};
Scroll.ViewController.prototype.hasActionList = function (a) {
    return !!this.actionListByName[a]
};
Scroll.ViewController.orientationDidChange = function (a) {
    var b = this.instances;
    for (var c in b) b[c].didRotateFromInterfaceOrientation(a)
};
Scroll.ViewController.prototype.getInterfaceOrientation = function () {
    return Scroll.OrientationManager.orientation
};
Scroll.ViewController.prototype.didRotateFromInterfaceOrientation = function () {};
Scroll.ViewController.initialize = function () {
    Scroll.ViewController.constructorMap[this.displayName] = this
};
window.addEventListener("DOMContentLoaded", Scroll.ViewController.init, true);
Scroll.Object.prototype.getAnalyticsEnabled = function () {
    if (typeof this._analyticsEnabled === "undefined") this._analyticsEnabled = false;
    return this._analyticsEnabled
};
Scroll.Object.prototype.setAnalyticsEnabled = function (a) {
    this._analyticsEnabled = !! a;
    if (typeof this._registeredInitialAnalyticsEvents === "undefined" || this._registeredInitialAnalyticsEvents !== true) {
        this._registeredInitialAnalyticsEvents = true;
        Scroll.Analytics.registerEventsForObject(this._analyticsEvents, this)
    }
};
Scroll.Class.synthesizeProperty(Scroll.Object.prototype, "analyticsEnabled");
Scroll.Object.prototype.getAnalyticsObjectId = function () {
    if (typeof this._analyticsObjectId === "undefined") this._analyticsObjectId = this.constructor._name;
    return this._analyticsObjectId
};
Scroll.Object.prototype.setAnalyticsObjectId = function (a) {
    this._analyticsObjectId = a
};
Scroll.Class.synthesizeProperty(Scroll.Object.prototype, "analyticsObjectId");
Scroll.Object.prototype.getAnalyticsSectionId = function () {
    return this._analyticsSectionId
};
Scroll.Object.prototype.setAnalyticsSectionId = function (a) {
    this._analyticsSectionId = a
};
Scroll.Class.synthesizeProperty(Scroll.Object.prototype, "analyticsSectionId");
Scroll.Object.prototype.getAnalyticsEvents = function () {
    if (!this.hasOwnProperty("_analyticsEvents")) this._analyticsEvents = [];
    return this._analyticsEvents
};
Scroll.Object.prototype.setAnalyticsEvents = function (a) {
    if (!a || a.length === 0) this._analyticsEvents && this._analyticsEvents.map(function (c) {
        Scroll.Analytics.unregisterEventsForObject(c, this)
    }, this);
    else {
        if (Scroll.Utils.objectIsString(a) == true) a = [a];
        else if (Scroll.Utils.objectIsArray(a) !== true) return;
        if (this._analyticsEvents) {
            var b = [];
            this._analyticsEvents.map(function (c) {
                var d = false,
                    e = 0,
                    f = a.length;
                a: for (; e < f; e += 1) if (a[e] === c) {
                    d = true;
                    break a
                }
                d === false && b.push(c)
            });
            Scroll.Analytics.unregisterEventsForObject(b, this)
        }
        Scroll.Analytics.registerEventsForObject(a, this);
        this._analyticsEvents = a
    }
};
Scroll.Class.synthesizeProperty(Scroll.Object.prototype, "analyticsEvents");
Scroll.Object.prototype.getDetailsForAnalyticsEvents = function () {
    if (!this._analyticsEventDetails) this._analyticsEventDetails = {};
    return this._analyticsEventDetails
};
Scroll.Object.prototype.setDetailsForAnalyticsEvents = function (a) {
    if (a) {
        if (!this._analyticsEventDetails) this._analyticsEventDetails = {};
        var b;
        for (b in a) this._analyticsEventDetails[b] = a[b]
    }
};
Scroll.Class.synthesizeProperty(Scroll.Object.prototype, "detailsForAnalyticsEvents");
Scroll.Object.prototype.getHash = function () {
    if (typeof this._hash === "undefined") this._hash = Scroll.Object.generateHash();
    return this._hash
};
Scroll.Object.prototype.setHash = function () {
    console.warn("Scroll.Object.hash is read-only")
};
Scroll.Class.synthesizeProperty(Scroll.Object.prototype, "hash");
Scroll.Object.generateHash = function () {
    var a = 0;
    return function () {
        return a += 1
    }
}();
Scroll.Object.prototype.getObjectType = function () {
    if (typeof this._type === "undefined") this._type = this.constructor && (this.constructor.displayName || this.constructor.name);
    return this._type
};
Scroll.Object.prototype.setObjectType = function () {
    console.warn("Scroll.Object.objectType is read-only")
};
Scroll.Class.synthesizeProperty(Scroll.Object.prototype, "objectType");
Scroll.Object.prototype.toString = function () {
    if (typeof this._stringValue === "undefined") this._stringValue = this.description.toString();
    return this._stringValue
};
Scroll.Object.prototype.getDescription = function () {
    if (typeof this._description === "undefined") {
        var a = {};
        a.hash = this.hash;
        a.type = this.objectType;
        this._description = a.toString()
    }
    return this._description
};
Scroll.Object.prototype.setDescription = function (a) {
    var b = this.description;
    b.summary = a.toString();
    this._description = b
};
Scroll.Class.synthesizeProperty(Scroll.Object.prototype, "description");
Scroll.Object.prototype.analyticsTypeForName = function (a) {
    switch (a) {
    case "screen update":
    case "transition":
    case "overlay":
    case "perspective":
    case "scroll":
        return "view";
    case "tap":
    case "select":
    case "swipe":
    case "drag":
    case "pinch":
    case "shake":
        return "gesture";
    case "play":
    case "pause":
    case "progress":
    case "end":
        return "media";
    case "completion":
    case "phone dial":
    case "image save":
    case "email send":
    case "form post":
    case "twitter tweet":
    case "twitter follow":
    case "purchase":
    case "failure":
        return "conversion";
    default:
        return null
    }
};
Scroll.Class({
    name: "Scroll.Control",
    superclass: Scroll.View,
    synthesizedProperties: ["state", "enabled", "selected", "highlighted"],
    collectionAccessor: "controls"
});
Scroll.Control.prototype.init = function (a) {
    this.tag = 0;
    this._enabled = true;
    this._highlighted = this._selected = false;
    this.callSuper(a);
    this.layer._control = this;
    this.userInteractionEnabled = this._enabled
};
Scroll.Control.VALUE_CHANGE_EVENT = "controlValueChange";
Scroll.Control.STATE_NORMAL = 0;
Scroll.Control.STATE_NORMAL_CSS = "x-normal";
Scroll.Control.STATE_HIGHLIGHTED = 1;
Scroll.Control.STATE_HIGHLIGHTED_CSS = "x-highlighted";
Scroll.Control.STATE_DISABLED = 2;
Scroll.Control.STATE_DISABLED_CSS = "x-disabled";
Scroll.Control.STATE_SELECTED = 4;
Scroll.Control.STATE_SELECTED_CSS = "x-selected";
Scroll.Control.synthesizedEvents = [Scroll.Control.VALUE_CHANGE_EVENT];
Scroll.Control.prototype.getState = function () {
    return Scroll.Control.STATE_NORMAL | (this._highlighted ? Scroll.Control.STATE_HIGHLIGHTED : 0) | (this._enabled ? 0 : Scroll.Control.STATE_DISABLED) | (this._selected ? Scroll.Control.STATE_SELECTED : 0)
};
Scroll.Control.prototype.setEnabled = function (a) {
    if (a != this._enabled) {
        this.layer.toggleClassName(Scroll.Control.STATE_DISABLED_CSS, !a);
        this.userInteractionEnabled = this._enabled = a;
        this.notifyPropertyChange("state")
    }
};
Scroll.Control.prototype.setSelected = function (a) {
    if (a != this._selected) {
        this.layer.toggleClassName(Scroll.Control.STATE_SELECTED_CSS, a);
        this._selected = a;
        this.notifyPropertyChange("state")
    }
};
Scroll.Control.prototype.setHighlighted = function (a) {
    if (a != this._highlighted) {
        this.layer.toggleClassName(Scroll.Control.STATE_HIGHLIGHTED_CSS, a);
        this._highlighted = a;
        this.notifyPropertyChange("state")
    }
};
Scroll.Control.prototype.touchesBegan = function (a) {
    if (this._enabled) {
        this.callSuper(a);
        this.highlighted = true
    }
};
Scroll.Control.prototype.touchesMoved = function (a) {
    var b = this.touchInside;
    this.callSuper(a);
    if (b != this.touchInside) this.highlighted = this.touchInside
};
Scroll.Control.prototype.touchesEnded = function (a) {
    this.callSuper(a);
    this.highlighted = false
};
Scroll.Control.prototype.touchesCancelled = function (a) {
    this.callSuper(a);
    this.highlighted = false
};
Scroll.Control.isNodeInControlHierarchyBoundedByElement = function (a, b) {
    for (; a.parentNode;) {
        if (a.hasOwnProperty("_view") && a._view instanceof Scroll.Control) return true;
        if (a === b) break;
        a = a.parentNode
    }
    return false
};

Scroll.Class({
    name: "Scroll.RootView",
    superclass: Scroll.View,
    synthesizedProperties: ["disablesDefaultScrolling"],
    cssClassName: "x-root-view"
});
Scroll.RootView.prototype.init = function (a) {
    this.callSuper(a);
    this.disablesDefaultScrolling = true;
    if (this.layer === document.body) {
        this.layerIsInDocument = true;
        this._size = new Scroll.Size(window.innerWidth, window.innerHeight);
        this.layer.removeClassName("x-view");
        window.addEventListener(Scroll.iOS_VERSION ? "orientationchange" : "resize", this, true)
    }
};
Scroll.RootView.prototype.createLayer = function () {
    this.layer = document.body
};
Scroll.RootView.prototype.setDisablesDefaultScrolling = function (a) {
    this.layer[a ? "addEventListener" : "removeEventListener"](Scroll.MOVE_EVENT, Scroll.Utils.preventEventDefault, false);
    this._disablesDefaultScrolling = a
};
Scroll.RootView.prototype.handleEvent = function (a) {
    this.callSuper(a);
    if (a.type == "resize" || a.type == "orientationchange") {
        this.size = new Scroll.Size(window.innerWidth, window.innerHeight);
        window.scrollTo(0, 0)
    }
};
Scroll.RootView._sharedRoot = null;
Object.defineProperty(Scroll.RootView, "sharedRoot", {
    get: function () {
        if (Scroll.RootView._sharedRoot === null) Scroll.RootView._sharedRoot = new Scroll.RootView;
        return Scroll.RootView._sharedRoot
    },
    set: function (a) {
        Scroll.RootView._sharedRoot = a
    }
});
Scroll.Class({
    name: "Scroll.RootViewController",
    superclass: Scroll.ViewController
});
Scroll.RootViewController.prototype.init = function (a) {
    a = a || {};
    a.id = "root";
    a.properties = a.properties || {};
    a.properties.view = Scroll.RootView.sharedRoot;
    if (a.requiredFileURIs) delete a.requiredFileURIs.contentView;
    else a.requiredFileURIs = {};
    this.callSuper(a);
    this.openBeginIgnoringInteractionEventsCalls = 0;
    Scroll.RootViewController.sharedRootViewController = this
};
Scroll.RootViewController.prototype.beginIgnoringInteractionEvents = function () {
    this.openBeginIgnoringInteractionEventsCalls++;
    if (this.openBeginIgnoringInteractionEventsCalls == 1) this.view.layer.style.pointerEvents = "none"
};
Scroll.RootViewController.prototype.endIgnoringInteractionEvents = function () {
    if (this.openBeginIgnoringInteractionEventsCalls != 0) {
        this.openBeginIgnoringInteractionEventsCalls--;
        if (this.openBeginIgnoringInteractionEventsCalls == 0) this.view.layer.style.pointerEvents = "auto"
    }
};
Scroll.RootViewController.prototype.isIgnoringInteractionEvents = function () {
    return this.openBeginIgnoringInteractionEventsCalls > 0
};
Object.defineProperty(Scroll.RootViewController, "sharedRootViewController", {
    get: function () {
        if (!Scroll.RootViewController.hasOwnProperty("_sharedRootViewController")) Scroll.RootViewController.sharedRootViewController = new Scroll.RootViewController;
        return Scroll.RootViewController._sharedRootViewController
    },
    set: function (a) {
        Scroll.RootViewController._sharedRootViewController = a
    }
});

Scroll.Class({
    name: "Scroll.ScrollIndicator",
    superclass: Scroll.View,
    synthesizedProperties: ["visible", "width", "height", "indicatorStyle"]
});
Scroll.ScrollIndicator.THICKNESS = 7;
Scroll.ScrollIndicator.END_SIZE = 3;
Scroll.ScrollIndicator.TYPE_HORIZONTAL = "x-horizontal";
Scroll.ScrollIndicator.TYPE_VERTICAL = "x-vertical";
Scroll.ScrollIndicator.prototype.init = function (a) {
    this.callSuper();
    this.type = a;
    this.layer.addClassName(a);
    this._visible = false;
    this._height = this._width = Scroll.ScrollIndicator.THICKNESS;
    this.positionBeforeHide = this.position = new Scroll.Point(-Scroll.ScrollIndicator.THICKNESS, -Scroll.ScrollIndicator.THICKNESS);
    this.lastPositionUpdateInHide = false;
    this._indicatorStyle = Scroll.ScrollView.INDICATOR_STYLE_DEFAULT;
    this.visible = false
};
Scroll.ScrollIndicator.prototype.createLayer = function () {
    this.callSuper();
    this.layer.addClassName("x-scroll-indicator");
    this.layer.addEventListener("webkitTransitionEnd", this, false);
    this.start = this.layer.appendChild(document.createElement("div"));
    this.middle = this.layer.appendChild(document.createElement("div"));
    this.end = this.layer.appendChild(document.createElement("div"))
};
Scroll.ScrollIndicator.prototype.setPosition = function (a) {
    a.x = Math.round(a.x);
    a.y = Math.round(a.y);
    this.callSuper(a);
    this.lastPositionUpdateInHide = false
};
Scroll.ScrollIndicator.prototype.setSize = function (a) {
    this.width = a.width;
    this.height = a.height;
    this._size = a
};
Scroll.ScrollIndicator.prototype.setIndicatorStyle = function (a) {
    this._indicatorStyle = a;
    this.layer.removeClassName(this._indicatorStyle);
    this.layer.addClassName(this._indicatorStyle);
    var b = this.type === Scroll.ScrollIndicator.TYPE_HORIZONTAL ? "-3px 0" : "0 -3px";
    this.middle.style.backgroundPosition = b
};
Scroll.ScrollIndicator.prototype.setWidth = function (a) {
    this.middle.style.webkitTransform = "scale(" + (a - Scroll.ScrollIndicator.END_SIZE * 2) + ",1)";
    this.end.style.webkitTransform = "translate3d(" + (a - Scroll.ScrollIndicator.END_SIZE) + "px,0,0)";
    this._width = a
};
Scroll.ScrollIndicator.prototype.setHeight = function (a) {
    this.middle.style.webkitTransform = "scale(1," + (a - Scroll.ScrollIndicator.END_SIZE * 2) + ")";
    this.end.style.webkitTransform = "translate3d(0," + (a - Scroll.ScrollIndicator.END_SIZE) + "px,0)";
    this._height = a
};
Scroll.ScrollIndicator.prototype.setVisible = function (a) {
    if (a) {
        this.fading = false;
        this.opacity = 1;
        this.position = this.lastPositionUpdateInHide ? this.positionBeforeHide : this.position
    } else if (!this.fading) {
        this.fading = true;
        this.opacity = 0;
        this.lastPositionUpdateInHide = true;
        this.positionBeforeHide = this.position
    }
    this._visible = a
};
Scroll.ScrollIndicator.prototype.flash = function () {
    this.flashing = true
};
Scroll.ScrollIndicator.prototype.handleEvent = function (a) {
    if (a.type == "webkitTransitionEnd") {
        this.callSuper(a);
        if (this.flashing) this.flashing = false;
        else if (this.fading) {
            this.position = new Scroll.Point(-Scroll.ScrollIndicator.THICKNESS, -Scroll.ScrollIndicator.THICKNESS);
            this.fading = false
        }
    }
};
Scroll.Class({
    name: "Scroll.ScrollViewPanGestureRecognizer",
    synthesizedProperties: ["enabled"]
});
Scroll.ScrollViewPanGestureRecognizer.prototype.init = function () {
    this.callSuper();
    this.identifier = this.delegate = this.view = null;
    this.translation = new Scroll.Point;
    this.panning = this.detectedPanning = this.tracking = false;
    this.trackingDataPoints = [];
    this._enabled = true
};
Scroll.ScrollViewPanGestureRecognizer.MINIMUM_TRACKING_FOR_PAN = 10;
Scroll.ScrollViewPanGestureRecognizer.MAX_TIME_FOR_TRACKING_DATA_POINTS = Scroll.IS_ANDROID ? 250 : 100;
Scroll.ScrollViewPanGestureRecognizer.PANNING_DID_FAIL = "panningGestureDidFail";
Scroll.ScrollViewPanGestureRecognizer.PANNING_DID_START = "panningGestureDidStart";
Scroll.ScrollViewPanGestureRecognizer.PANNING_DID_CHANGE = "panningGestureDidChange";
Scroll.ScrollViewPanGestureRecognizer.PANNING_DID_END = "panningGestureDidEnd";
Scroll.ScrollViewPanGestureRecognizer.PANNING_DID_CANCEL = "panningGestureDidCancel";
Scroll.ScrollViewPanGestureRecognizer.prototype.touchBegan = function (a, b) {
    if (!this.tracking) {
        this.startTouchPosition = Scroll.Point.fromEvent(a);
        this.startTouchPositionInView = Scroll.Point.fromEventInElement(a, this.view.layer);
        this.tracking = true;
        this.addTrackingDataPoint(this.startTouchPositionInView, b)
    }
};
Scroll.ScrollViewPanGestureRecognizer.prototype.touchMoved = function (a, b) {
    this.lastTouchPositionInView = Scroll.Point.fromEventInElement(a, this.view.layer);
    this.addTrackingDataPoint(this.lastTouchPositionInView, b);
    var c = Scroll.Point.fromEvent(a);
    this.translation = new Scroll.Point(c.x - this.startTouchPosition.x, c.y - this.startTouchPosition.y);
    if (this.panning) this.notifyDelegateOfStateChange(Scroll.ScrollViewPanGestureRecognizer.PANNING_DID_CHANGE, b);
    else {
        c = Scroll.ScrollViewPanGestureRecognizer.MINIMUM_TRACKING_FOR_PAN;
        if (Math.abs(this.translation.x) >= c || Math.abs(this.translation.y) >= c) this.detectedPanning = true
    }
};
Scroll.ScrollViewPanGestureRecognizer.prototype.touchEnded = function (a, b) {
    this.panning && this.notifyDelegateOfStateChange(Scroll.ScrollViewPanGestureRecognizer.PANNING_DID_END, b);
    this.reset()
};
Scroll.ScrollViewPanGestureRecognizer.prototype.touchCancelled = function (a, b) {
    this.panning && this.notifyDelegateOfStateChange(Scroll.ScrollViewPanGestureRecognizer.PANNING_DID_CANCEL, b);
    this.reset()
};
Scroll.ScrollViewPanGestureRecognizer.prototype.reset = function () {
    this.panning = this.detectedPanning = this.tracking = false;
    this.trackingDataPoints = [];
    this.identifier = this.lastTouchPositionInView = null
};
Scroll.ScrollViewPanGestureRecognizer.prototype.setEnabled = function (a) {
    if (a != this._enabled) {
        this._enabled = a;
        if (!a) {
            this.panning && this.touchCancelled();
            Scroll.ScrollViewPanGestureRecognizer.recognizerWasDisabled(this)
        }
    }
};
Scroll.ScrollViewPanGestureRecognizer.prototype.notifyDelegateOfStateChange = function (a) {
    this.delegate !== null && Scroll.Utils.objectHasMethod(this.delegate, a) && this.delegate[a](this, event)
};
Scroll.ScrollViewPanGestureRecognizer.prototype.gestureWasRecognized = function (a) {
    this.startTouchPosition = this.trackingDataPoints[0].point;
    if (this.lastTouchPositionInView) this.startTouchPositionInView = this.lastTouchPositionInView.copy();
    this.detectedPanning = false;
    this.panning = true;
    this.notifyDelegateOfStateChange(Scroll.ScrollViewPanGestureRecognizer.PANNING_DID_START, a)
};
Scroll.ScrollViewPanGestureRecognizer.prototype.gestureWasNotRecognized = function (a) {
    this.notifyDelegateOfStateChange(Scroll.ScrollViewPanGestureRecognizer.PANNING_DID_FAIL, a);
    this.reset()
};
Scroll.ScrollViewPanGestureRecognizer.prototype.translationInView = function () {
    return new Scroll.Point(this.lastTouchPositionInView.x - this.startTouchPositionInView.x, this.lastTouchPositionInView.y - this.startTouchPositionInView.y)
};
Scroll.ScrollViewPanGestureRecognizer.prototype.velocityInView = function () {
    this.purgeTrackingDataPointsWithTime((new Date).getTime());
    if (this.trackingDataPoints.length < 2) return new Scroll.Point(0, 0);
    var a = this.trackingDataPoints[0],
        b = this.trackingDataPoints[this.trackingDataPoints.length - 1],
        c = (b.time - a.time) / 1E3;
    return new Scroll.Point((b.point.x - a.point.x) / c, (b.point.y - a.point.y) / c)
};
Scroll.ScrollViewPanGestureRecognizer.prototype.purgeTrackingDataPointsWithTime = function (a) {
    for (; this.trackingDataPoints.length > 0;) {
        if (a - this.trackingDataPoints[0].time <= Scroll.ScrollViewPanGestureRecognizer.MAX_TIME_FOR_TRACKING_DATA_POINTS) break;
        this.trackingDataPoints.shift()
    }
};
Scroll.ScrollViewPanGestureRecognizer.prototype.addTrackingDataPoint = function (a, b) {
    var c = b.timeStamp;
    if (typeof c !== 'number') {
        c = c.getTime();
    }
    this.purgeTrackingDataPointsWithTime(c);
    this.trackingDataPoints.push({
        time: c,
        point: a
    });
};
Scroll.ScrollViewPanGestureRecognizer.recognizers = [];
Scroll.ScrollViewPanGestureRecognizer.recognizersForTouch = {};
Scroll.ScrollViewPanGestureRecognizer.panningTouchIdentifiers = [];
Scroll.ScrollViewPanGestureRecognizer.registerRecognizer = function (a) {
    if (!(!a.enabled || this.recognizers.indexOf(a) != -1 || !a.view.userInteractionEnabled)) {
        this.recognizers.push(a);
        if (this.recognizersForTouch[a.identifier] === undefined) this.recognizersForTouch[a.identifier] = [];
        this.recognizersForTouch[a.identifier].push(a);
        if (this.recognizers.length == 1) {
            window.addEventListener(Scroll.MOVE_EVENT, this.handleEventProxy, true);
            window.addEventListener(Scroll.END_EVENT, this.handleEventProxy, true);
            window.addEventListener(Scroll.CANCEL_EVENT, this.handleEventProxy, true)
        }
    }
};
Scroll.ScrollViewPanGestureRecognizer.stopTrackingTouchIdentifier = function (a) {
    var b = this.recognizersForTouch[a];
    if (b !== undefined) {
        for (; b.length;) Scroll.Utils.removeObjectFromArray(b.pop(), this.recognizers);
        delete this.recognizersForTouch[a];
        if (this.recognizers.length == 0) {
            window.removeEventListener(Scroll.MOVE_EVENT, this.handleEventProxy, true);
            window.removeEventListener(Scroll.END_EVENT, this.handleEventProxy, true);
            window.removeEventListener(Scroll.CANCEL_EVENT, this.handleEventProxy, true)
        }
        Scroll.Utils.removeObjectFromArray(a, this.panningTouchIdentifiers)
    }
};
Scroll.ScrollViewPanGestureRecognizer.recognizerWasDisabled = function (a) {
    var b = this.recognizersForTouch[a.identifier];
    if (b !== undefined) {
        Scroll.Utils.removeObjectFromArray(a, b);
        Scroll.Utils.removeObjectFromArray(a, this.recognizers);
        b.length == 0 && this.stopTrackingTouchIdentifier(a.identifier)
    }
};
Scroll.ScrollViewPanGestureRecognizer.handleEventProxy = function (a) {
    Scroll.ScrollViewPanGestureRecognizer.handleEvent(a)
};
Scroll.ScrollViewPanGestureRecognizer.handleEvent = function (a) {
    if (!a.hasOwnProperty("_synthetic")) {
        var b = a.changedTouches;
        if (!Scroll.SUPPORTS_TOUCHES) {
            a.identifier = 0;
            b = [a]
        }
        a.type === Scroll.START_EVENT && this.setupRecognizersForTouches(b, a);
        for (var c, d, e, f = 0; f < b.length; f++) {
            c = b[f];
            if (d = this.recognizersForTouch[c.identifier]) for (var g = 0; g < d.length; g++) {
                e = d[g];
                this.sendEventToRecognizer(e, a, c)
            }
            a.type == Scroll.MOVE_EVENT && this.panningTouchIdentifiers.indexOf(c.identifier) == -1 && this.checkRecognizersWithTouchIdentifierForPanning(c.identifier, a);
            a.type == Scroll.END_EVENT && this.stopTrackingTouchIdentifier(c.identifier)
        }
    }
};
Scroll.ScrollViewPanGestureRecognizer.parentScrollViewForView = function (a) {
    for (; a.superview;) {
        a = a.superview;
        if (a instanceof Scroll.ScrollView) return a
    }
    return null
};
Scroll.ScrollViewPanGestureRecognizer.scrollViewHasPanningChildScrollView = function (a) {
    a = a.scrollViews;
    for (var b = 0; b < a.length; b++) if (a[b].dragging) return true;
    return false
};
Scroll.ScrollViewPanGestureRecognizer.scrollViewHasPanningParentScrollView = function (a) {
    for (a = this.parentScrollViewForView(a); a !== null;) {
        if (a.dragging) return true;
        a = this.parentScrollViewForView(a)
    }
    return false
};
Scroll.ScrollViewPanGestureRecognizer.setupRecognizersForTouches = function (a, b) {
    for (var c, d, e, f, g = 0; g < a.length; g++) {
        c = a[g];
        f = c.target.getNearestView();
        if (f !== null) {
            d = f instanceof Scroll.ScrollView ? f : this.parentScrollViewForView(f);
            if (!(d === null || d.dragging || this.scrollViewHasPanningChildScrollView(d) || this.scrollViewHasPanningParentScrollView(d))) {
                for (var i = null; f;) {
                    d = f.gestureRecognizers;
                    if (d.length > 0 && f.pointInside(Scroll.Point.fromEventInElement(c, f.layer))) for (var h = 0; h < d.length; h++) {
                        e = d[h];
                        if (!(e.tracking || e.identifier != null)) {
                            e.identifier = c.identifier;
                            if (f.decelerating) i = e;
                            f.touchesBegan(b);
                            this.registerRecognizer(e)
                        }
                    }
                    f = f.superview
                }
                if (i) {
                    i.touchBegan(c, b);
                    this.gestureWasRecognized(i, b)
                }
            }
        }
    }
};
Scroll.ScrollViewPanGestureRecognizer.checkRecognizersWithTouchIdentifierForPanning = function (a, b) {
    var c = this.recognizersForTouch[a];
    if (c !== undefined) for (var d, e, f = 0; f < c.length; f++) {
        d = c[f];
        if (d.panning) break;
        if (d.detectedPanning) {
            e = d.view;
            var g = Scroll.ScrollViewPanGestureRecognizer.MINIMUM_TRACKING_FOR_PAN;
            if (e = Math.abs(d.translation.x) >= g && (e.canScrollHorizontally || e.alwaysBounceHorizontal) || Math.abs(d.translation.y) >= g && (e.canScrollVertically || e.alwaysBounceVertical)) {
                this.gestureWasRecognized(d, b);
                break
            }
        }
    }
};
Scroll.ScrollViewPanGestureRecognizer.gestureWasRecognized = function (a, b) {
    a.gestureWasRecognized(b);
    this.panningTouchIdentifiers.push(a.identifier);
    for (var c = this.recognizersForTouch[a.identifier], d = c.length; d--;) if (c[d] != a) {
        c[d].gestureWasNotRecognized(b);
        Scroll.Utils.removeObjectFromArray(c[d], this.recognizers);
        c.splice(d, 1)
    }
};
Scroll.ScrollViewPanGestureRecognizer.sendEventToRecognizer = function (a, b, c) {
    switch (b.type) {
    case Scroll.START_EVENT:
        a.touchBegan(c, b);
        break;
    case Scroll.MOVE_EVENT:
        a.touchMoved(c, b);
        break;
    case Scroll.END_EVENT:
        a.touchEnded(c, b);
        break;
    case Scroll.CANCEL_EVENT:
        a.touchCancelled(c, b)
    }
};
document.addEventListener(Scroll.START_EVENT, Scroll.ScrollViewPanGestureRecognizer.handleEventProxy, true);
Scroll.Class({
    name: "Scroll.ScrollView",
    superclass: Scroll.View,
    synthesizedProperties: ["contentOffset", "contentSize", "indicatorStyle", "scrollEnabled", "scrollIndicatorInsets", "dragging"],
    cssClassName: "x-scroll-view",
    collectionAccessor: "scrollViews"
});
Scroll.ScrollView.WILL_BEGIN_DRAGGING = "scrollViewWillBeginDragging";
Scroll.ScrollView.DID_END_SCROLLING_ANIMATION = "scrollViewDidEndScrollingAnimation";
Scroll.ScrollView.DID_SCROLL = "scrollViewDidScroll";
Scroll.ScrollView.WILL_END_DRAGGING = "scrollViewWillEndDraggingWithVelocityAndTargetContentOffset";
Scroll.ScrollView.DID_END_DRAGGING = "scrollViewDidEndDragging";
Scroll.ScrollView.WILL_BEGIN_DECELERATING = "scrollViewWillBeginDecelerating";
Scroll.ScrollView.DID_END_DECELERATING = "scrollViewDidEndDecelerating";
Scroll.ScrollView.MIN_INDICATOR_LENGTH = 34;
Scroll.ScrollView.DECELERATION_FRICTION_FACTOR = 0.998;
Scroll.ScrollView.DESIRED_ANIMATION_FRAME_RATE = 1 / 60;
Scroll.ScrollView.MINIMUM_VELOCITY = 10;
Scroll.ScrollView.PENETRATION_DECELERATION = 5;
Scroll.ScrollView.PENETRATION_ACCELERATION = 8;
Scroll.ScrollView.MIN_VELOCITY_FOR_DECELERATION = 250;
Scroll.ScrollView.MIN_VELOCITY_FOR_DECELERATION_WITH_PAGING = 300;
Scroll.ScrollView.PAGING_ACCELERATION = 3.6E-4;
Scroll.ScrollView.PAGING_DECELERATION = 0.9668;
Scroll.ScrollView.PAGING_TRANSITION_DURATION = "0.25s";
Scroll.ScrollView.CONTENT_TOUCHES_DELAY = 0.15;
Scroll.ScrollView.AUTOMATED_CONTENT_SIZE = -1;
Scroll.ScrollView.INDICATOR_STYLE_DEFAULT = "x-indicator-default";
Scroll.ScrollView.INDICATOR_STYLE_BLACK = "x-indicator-black";
Scroll.ScrollView.INDICATOR_STYLE_WHITE = "x-indicator-white";
Scroll.ScrollView.prototype.init = function (a) {
    /*----------------------Modified By yixia-------------------------*/
    this.onScrollMove = a && a.onScrollMove || function() {};
    this.onGestureEnd = a && a.onGestureEnd || function() {};
    this.onGestureChange = a && a.onGestureChange || function() {};
    this.pullDownOffset = a && a.pullDownOffset || 0;
    /*----------------------Modified At 2012.01.10-------------------------*/
    this._contentOffset = new Scroll.Point;
    this._contentSize = Scroll.ScrollView.AUTOMATED_CONTENT_SIZE;
    this.adjustedContentSize = new Scroll.Size;
    this.decelerating = this._dragging = false;
    this.decelerationTimer = null;
    this._indicatorStyle = "";
    this.showsVerticalScrollIndicator = this.showsHorizontalScrollIndicator = true;
    this.scrollIndicatorsNeedFlashing = false;
    this._scrollIndicatorInsets = new Scroll.EdgeInsets(0, 0, 0, 0);
    this.pagingEnabled = false;
    this.bounces = true;
    this.alwaysBounceVertical = this.alwaysBounceHorizontal = false;
    this.delegate = null;
    this.canCancelContentTouches = this.delaysContentTouches = true;
    this._setContentOffsetAnimatedCalledFromSetter = false;
    this.beginTouchesInContentTimer = null;
    this.panGestureRecognizer = new Scroll.ScrollViewPanGestureRecognizer;
    this.panGestureRecognizer.delegate = this;
    this.callSuper(a);
    this.userInteractionEnabled = true;
    this.layer.addEventListener("webkitTransitionEnd", this, false);
    this.hostingLayer.addEventListener("webkitTransitionEnd", this, false);
    this.addGestureRecognizer(this.panGestureRecognizer);
    this.layer.addEventListener("focus", this, true);
    this.shouldPreventSelectElementFocus = false
};
Scroll.ScrollView.prototype.createLayer = function () {
    this.callSuper();
    this._hostingLayer = this.layer.appendChild(document.createElement("div"));
    this._hostingLayer.className = "x-hosting-layer";
    this.clipsToBounds = true;
    this.createScrollIndicators();
    /*----------------------Modified By yixia-------------------------*/
    this.hostingLayer.style.webkitTransform = Scroll.Utils.t(-this._contentOffset.x, -this._contentOffset.y - this.pullDownOffset);
    /*----------------------Modified At 2012.01.10-------------------------*/
    this.indicatorStyle = Scroll.ScrollView.INDICATOR_STYLE_DEFAULT
};
Scroll.ScrollView.prototype.setupLayer = function () {
    this.callSuper();
    this._hostingLayer = document.createElement("div");
    for (this._hostingLayer.className = "x-hosting-layer"; this.layer.firstChild;) this._hostingLayer.appendChild(this.layer.firstChild);
    this.layer.appendChild(this._hostingLayer);
    this.createScrollIndicators();
    this.indicatorStyle = this.layer.hasAttribute("x-indicator-style") ? this.layer.getAttribute("x-indicator-style") : Scroll.ScrollView.INDICATOR_STYLE_DEFAULT
};
Scroll.ScrollView.prototype.setSize = function (a) {
    if (!this._size.equals(a)) {
        this.callSuper(a);
        if (this._contentSize !== Scroll.ScrollView.AUTOMATED_CONTENT_SIZE || this.layerIsInDocument) this.adjustContentSize(true)
    }
};
Scroll.ScrollView.prototype.layerWasInsertedIntoDocument = function () {
    this.callSuper();
    this._contentSize === Scroll.ScrollView.AUTOMATED_CONTENT_SIZE && this.adjustContentSize(true)
};
Scroll.ScrollView.prototype.setUserInteractionEnabled = function (a) {
    if (this._userInteractionEnabled != a) {
        this.callSuper(a);
        this.layer[(a ? "add" : "remove") + "EventListener"](Scroll.START_EVENT, this, true)
    }
};
Scroll.ScrollView.prototype.getScrollEnabled = function () {
    return this.panGestureRecognizer.enabled
};
Scroll.ScrollView.prototype.setScrollEnabled = function (a) {
    this.panGestureRecognizer.enabled = a
};
Scroll.ScrollView.prototype.setContentOffset = function (a) {
    this._setContentOffsetAnimatedCalledFromSetter = true;
    this.setContentOffsetAnimated(a, false)
};
Scroll.ScrollView.prototype.setContentOffsetAnimated = function (a, b) {
    if (!a.equals(this._contentOffset)) {
        this._contentOffset = a;
        if (!this.dragging && !this.decelerating) {
            this.adjustContentSize(false);
            this._contentOffset.x = Math.max(Math.min(this.maxPoint.x, this._contentOffset.x), 0);
            this._contentOffset.y = Math.max(Math.min(this.maxPoint.y, this._contentOffset.y), 0)
        }
        this.onScrollMove(this._contentOffset);
        this.hostingLayer.style.webkitTransform = Scroll.Utils.t(-this._contentOffset.x, -this._contentOffset.y - this.pullDownOffset);
        if (b) {
            this.scrollTransitionsNeedRemoval = true;
            this.hostingLayer.style.webkitTransitionDuration = Scroll.ScrollView.PAGING_TRANSITION_DURATION
        } else this.didScroll(false);
        if (!b) {
            this.canScrollHorizontally && this.showsHorizontalScrollIndicator && this.updateHorizontalScrollIndicator();
            this.canScrollVertically && this.showsVerticalScrollIndicator && this.updateVerticalScrollIndicator()
        }
        this._setContentOffsetAnimatedCalledFromSetter || this.notifyPropertyChange("contentOffset");
        this._setContentOffsetAnimatedCalledFromSetter = false
    }
};
Scroll.ScrollView.prototype.snapContentOffsetToBounds = function (a) {
    var b = false,
        c = new Scroll.Point;
    if (this.pagingEnabled && a) {
        c.x = Math.round(this._contentOffset.x / this._size.width) * this._size.width;
        c.y = Math.round(this._contentOffset.y / this._size.height) * this._size.height;
        b = true
    } else if (this.bounces) {
        c.x = Math.max(Math.min(this.maxPoint.x, this._contentOffset.x), 0);
        c.y = Math.max(Math.min(this.maxPoint.y, this._contentOffset.y), 0);
        b = c.x != this._contentOffset.x || c.y != this._contentOffset.y
    }
    b && this.setContentOffsetAnimated(c, a)
};
Scroll.ScrollView.prototype.getContentSize = function () {
    var a = this._contentSize;
    if (a === Scroll.ScrollView.AUTOMATED_CONTENT_SIZE) {
        a = new Scroll.Size(this._hostingLayer.offsetWidth, this._hostingLayer.offsetHeight);
        if (this.subviews.length) for (var b = 0; b < this.subviews.length; b++) {
            var c = this.subviews[b];
            a.width = Math.max(a.width, c.position.x + c.size.width);
            a.height = Math.max(a.height, c.position.y + c.size.height)
        }
    }
    return a
};
Scroll.ScrollView.prototype.setContentSize = function (a) {
    this._contentSize = a;
    this.adjustContentSize(false)
};
Scroll.ScrollView.prototype.adjustContentSize = function (a) {
    if (a) {
        var b = new Scroll.Point;
        if (this.adjustedContentSize.width != 0) b.x = this._contentOffset.x / this.adjustedContentSize.width;
        if (this.adjustedContentSize.height != 0) b.y = this._contentOffset.y / this.adjustedContentSize.height
    }
    this.adjustedContentSize.width = Math.max(this._size.width, this.contentSize.width);
    this.adjustedContentSize.height = Math.max(this._size.height, this.contentSize.height);
    this.maxPoint = new Scroll.Point(this.adjustedContentSize.width - this._size.width, this.adjustedContentSize.height - this._size.height);
    if (a) this.contentOffset = new Scroll.Point(Math.min(b.x * this.adjustedContentSize.width, this.maxPoint.x), Math.min(b.y * this.adjustedContentSize.height, this.maxPoint.y));
    this.canScrollHorizontally = this.size.width < this.adjustedContentSize.width;
    this.canScrollVertically = this.size.height < this.adjustedContentSize.height
};
Scroll.ScrollView.prototype.setIndicatorStyle = function (a) {
    this._indicatorStyle = a;
    this.horizontalScrollIndicator.indicatorStyle = a;
    this.verticalScrollIndicator.indicatorStyle = a
};
Scroll.ScrollView.prototype.setScrollIndicatorInsets = function (a) {
    this._scrollIndicatorInsets = a;
    this.horizontalScrollIndicator.visible && this.updateHorizontalScrollIndicator();
    this.verticalScrollIndicator.visible && this.updateVerticalScrollIndicator()
};
Scroll.ScrollView.prototype.createScrollIndicators = function () {
    this.horizontalScrollIndicator = new Scroll.ScrollIndicator(Scroll.ScrollIndicator.TYPE_HORIZONTAL);
    this.layer.appendChild(this.horizontalScrollIndicator.layer);
    this.horizontalScrollIndicator.indicatorStyle = this._indicatorStyle;
    this.verticalScrollIndicator = new Scroll.ScrollIndicator(Scroll.ScrollIndicator.TYPE_VERTICAL);
    this.layer.appendChild(this.verticalScrollIndicator.layer);
    this.verticalScrollIndicator.indicatorStyle = this._indicatorStyle
};
Scroll.ScrollView.prototype.updateHorizontalScrollIndicator = function () {
    var a = this.scrollIndicatorInsets.left + 1,
        b = this.size.width - this.scrollIndicatorInsets.right - 1;
    if (this.canScrollVertically && this.showsVerticalScrollIndicator) b -= Scroll.ScrollIndicator.THICKNESS - 1;
    var c = b - a,
        d = Math.max(Scroll.ScrollView.MIN_INDICATOR_LENGTH, Math.round(this.size.width / this.adjustedContentSize.width * c)),
        e = this.size.height - Scroll.ScrollIndicator.THICKNESS - this.scrollIndicatorInsets.bottom - 1;
    if (this.contentOffset.x < 0) {
        d = Math.round(Math.max(d + this.contentOffset.x, Scroll.ScrollIndicator.THICKNESS));
        a = a
    } else if (this.contentOffset.x > this.maxPoint.x) {
        d = Math.round(Math.max(d + this.adjustedContentSize.width - this.size.width - this.contentOffset.x, Scroll.ScrollIndicator.THICKNESS));
        a = b - d
    } else a = Scroll.Utils.clampValue(Math.round(this.contentOffset.x / (this.adjustedContentSize.width - this.size.width) * (c - d) + this.scrollIndicatorInsets.left), a, b - d);
    this.horizontalScrollIndicator.position = new Scroll.Point(a, e);
    this.horizontalScrollIndicator.width = d
};
Scroll.ScrollView.prototype.updateVerticalScrollIndicator = function () {
    var a = this.scrollIndicatorInsets.top + 1,
        b = this.size.height - this.scrollIndicatorInsets.bottom - 1;
    if (this.canScrollHorizontally && this.showsHorizontalScrollIndicator) b -= Scroll.ScrollIndicator.THICKNESS - 1;
    var c = b - a,
        d = Math.max(Scroll.ScrollView.MIN_INDICATOR_LENGTH, Math.round(this.size.height / this.adjustedContentSize.height * c)),
        e = this.size.width - Scroll.ScrollIndicator.THICKNESS - this.scrollIndicatorInsets.right - 1;
    if (this.contentOffset.y < 0) {
        d = Math.round(Math.max(d + this.contentOffset.y, Scroll.ScrollIndicator.THICKNESS));
        a = a
    } else if (this.contentOffset.y > this.maxPoint.y) {
        d = Math.round(Math.max(d + this.adjustedContentSize.height - this.size.height - this.contentOffset.y, Scroll.ScrollIndicator.THICKNESS));
        a = b - d
    } else a = Scroll.Utils.clampValue(Math.round(this.contentOffset.y / (this.adjustedContentSize.height - this.size.height) * (c - d) + this.scrollIndicatorInsets.top), a, b - d);
    this.verticalScrollIndicator.position = new Scroll.Point(e, a);
    this.verticalScrollIndicator.height = d
};
Scroll.ScrollView.prototype.flashScrollIndicators = function (a) {
    if (a) this.scrollIndicatorsNeedFlashing = true;
    else {
        if (this.canScrollHorizontally && this.showsHorizontalScrollIndicator && this.adjustedContentSize.width > this._size.width) {
            this.updateHorizontalScrollIndicator();
            this.horizontalScrollIndicator.flash()
        }
        if (this.canScrollVertically && this.showsVerticalScrollIndicator && this.adjustedContentSize.height > this._size.height) {
            this.updateVerticalScrollIndicator();
            this.verticalScrollIndicator.flash()
        }
    }
};
Scroll.ScrollView.prototype.hideScrollIndicators = function () {
    this.horizontalScrollIndicator.visible = false;
    this.verticalScrollIndicator.visible = false
};
Scroll.ScrollView.prototype.showHorizontalScrollIndicator = function () {
    this.horizontalScrollIndicator.visible = true
};
Scroll.ScrollView.prototype.showVerticalScrollIndicator = function () {
    this.verticalScrollIndicator.visible = true
};
Scroll.ScrollView.prototype.handleEvent = function (a) {
    if (!a.hasOwnProperty("_synthetic")) if (a.type == "focus" && this.shouldPreventSelectElementFocus) {
        a.stopPropagation();
        a.preventDefault();
        this.originalTarget.blur()
    } else if (a.type == Scroll.START_EVENT && a.eventPhase == Event.CAPTURING_PHASE) this.touchesBeganInCapturePhase(a);
    else a.type == "webkitTransitionEnd" ? this.transitionEnded(a) : this.callSuper(a)
};
Scroll.ScrollView.prototype.touchesBeganInCapturePhase = function (a) {
    this.scrollEnabled && a.stopPropagation()
};
Scroll.ScrollView.prototype.touchesBegan = function (a) {
    this.beginTracking(a)
};
Scroll.ScrollView.prototype.touchesMoved = function (a) {
    var b = this.getInitialTouch(a);
    if (b !== null) {
        this.lastKnownTouchPosition = Scroll.Point.fromEvent(b);
        this.contentTouchesCouldNotBeCancelled || this.callSuper(a)
    }
};
Scroll.ScrollView.prototype.touchesEnded = function (a) {
    if (this.getInitialTouch(a) !== null) {
        this.stopTrackingTouches();
        if (this.contentTouchesCouldNotBeCancelled) if (this.isOriginalTargetElementAtPoint(this.lastKnownTouchPosition)) {
            if (!a.hasOwnProperty("_scrollViewDispatchedEventToContent")) {
                this.dispatchClickToContent();
                a._scrollViewDispatchedEventToContent = true
            }
        } else {
            if (this.originalTarget.localName == "select") this.shouldPreventSelectElementFocus = true
        } else if (this.dragging) {
            a.preventDefault();
            if (this.originalTarget.localName == "select") this.shouldPreventSelectElementFocus = true;
            a.stopPropagation()
        } else {
            this.hideScrollIndicators();
            if (this.isOriginalTargetElementAtPoint(this.lastKnownTouchPosition)) {
                if (!a.hasOwnProperty("_scrollViewDispatchedEventToContent")) {
                    this.touchesInContentBegan ? this.endTouchesInContent() : this.dispatchTapSequenceToContent();
                    this.dispatchClickToContent();
                    a._scrollViewDispatchedEventToContent = true
                }
            } else if (this.originalTarget.localName == "select") this.shouldPreventSelectElementFocus = true;
            else a.preventDefault()
        }
    }
};
Scroll.ScrollView.prototype.touchesCancelled = function () {
    this.stopTrackingTouches();
    this.hideScrollIndicators()
};
Scroll.ScrollView.prototype.panningGestureDidFail = function () {
    this.stopTrackingTouches()
};
Scroll.ScrollView.prototype.panningGestureDidStart = function () {
    if (!this.contentTouchesCouldNotBeCancelled) if (this.canCancelContentTouches && this.touchesInContentBegan && !this.touchesShouldCancelInContentElementAndView(this.originalTarget, this.originalTarget.getNearestView())) this.interruptTrackingInteraction(true);
    else {
        this.cancelTouchesInContent();
        this.hostingLayer.style.webkitTransitionDuration = 0;
        this.startContentOffset = this.contentOffset.copy();
        this.dispatchNotification(Scroll.ScrollView.WILL_BEGIN_DRAGGING, this.delegate);
        this.dragging = true;
        this.canScrollHorizontally && this.showsHorizontalScrollIndicator && this.adjustedContentSize.width > this._size.width && this.showHorizontalScrollIndicator();
        this.canScrollVertically && this.showsVerticalScrollIndicator && this.adjustedContentSize.height > this._size.height && this.showVerticalScrollIndicator()
    }
};
Scroll.ScrollView.prototype.panningGestureDidChange = function (a, b) {
    this.onGestureChange(this._contentOffset);
    if (!this.contentTouchesCouldNotBeCancelled) {
        b.stopPropagation();
        var c = this.canScrollHorizontally || this.bounces && this.alwaysBounceHorizontal,
            d = this.canScrollVertically || this.bounces && this.alwaysBounceVertical,
            e = a.translationInView();
        c = c ? this.startContentOffset.x - e.x : this._contentOffset.x;
        d = d ? this.startContentOffset.y - e.y : this._contentOffset.y;
        if (this.bounces) {
            c -= (c > this.maxPoint.x ? c - this.maxPoint.x : c < 0 ? c : 0) / 2;
            d -= (d > this.maxPoint.y ? d - this.maxPoint.y : d < 0 ? d : 0) / 2
        } else {
            c = Math.max(Math.min(this.maxPoint.x, c), 0);
            d = Math.max(Math.min(this.maxPoint.y, d), 0)
        }
        this.contentOffset = new Scroll.Point(c, d)
    }
};
Scroll.ScrollView.prototype.panningGestureDidEnd = function () {
    this.onGestureEnd(this._contentOffset);
    if (!this.contentTouchesCouldNotBeCancelled) {
        this.dragging = false;
        this.stopTrackingTouches();
        this.startDecelerationAnimation();
        this.dispatchNotification(Scroll.ScrollView.DID_END_DRAGGING, this.delegate);
        if (!this.decelerating) {
            this.snapContentOffsetToBounds(true);
            this.hideScrollIndicators()
        }
    }
};
Scroll.ScrollView.prototype.panningGestureDidCancel = function () {
    if (this._dragging) {
        this.dragging = false;
        this.snapContentOffsetToBounds(true);
        this.dispatchNotification(Scroll.ScrollView.DID_END_DRAGGING, this.delegate);
        this.hideScrollIndicators()
    }
};
Scroll.ScrollView.prototype.getInitialTouch = function (a) {
    if (!Scroll.SUPPORTS_TOUCHES) return a;
    for (var b, c = 0; c < a.changedTouches.length; c++) {
        b = a.changedTouches[c];
        if (b.identifier == this.initialTouchIdentifier) return b
    }
    return null
};
Scroll.ScrollView.prototype.beginTracking = function (a) {
    if (!this._tracking) {
        this.stopDecelerationAnimation();
        this.snapContentOffsetToBounds(false);
        this.lastKnownTouchPosition = Scroll.Point.fromEvent(a);
        var b = Scroll.SUPPORTS_TOUCHES ? a.targetTouches[0] : a;
        this.initialTouchIdentifier = b.identifier;
        this.originalTarget = Scroll.Utils.elementForNode(b.target);
        this.originalEvent = a;
        this.originalTarget.localName != "select" && a.preventDefault();
        this.adjustContentSize(false);
        this.tracking = true;
        this.beginTouchesInContentTimer = null;
        this.contentTouchesCouldNotBeCancelled = this.shouldPreventSelectElementFocus = this.touchesInContentBegan = false;
        if (this.delaysContentTouches) this.beginTouchesInContentTimer = this.callMethodNameAfterDelay("beginTouchesInContentIfPermitted", Scroll.ScrollView.CONTENT_TOUCHES_DELAY);
        else this.beginTouchesInContentIfPermitted();
        document.addEventListener(Scroll.MOVE_EVENT, this, true);
        document.addEventListener(Scroll.END_EVENT, this, true);
        document.addEventListener(Scroll.CANCEL_EVENT, this, true)
    }
};
Scroll.ScrollView.prototype.stopTrackingTouches = function () {
    if (this._tracking) {
        this.tracking = false;
        document.removeEventListener(Scroll.MOVE_EVENT, this, true);
        document.removeEventListener(Scroll.END_EVENT, this, true);
        document.removeEventListener(Scroll.CANCEL_EVENT, this, true);
        window.clearTimeout(this.beginTouchesInContentTimer)
    }
};
Scroll.ScrollView.prototype.interruptTrackingInteraction = function (a) {
    this.contentTouchesCouldNotBeCancelled = a;
    if (this.dragging) {
        this.dragging = false;
        this.snapContentOffsetToBounds(true);
        this.dispatchNotification(Scroll.ScrollView.DID_END_DRAGGING, this.delegate);
        this.hideScrollIndicators()
    }
};
Scroll.ScrollView.prototype.isOriginalTargetElementAtPoint = function (a) {
    return this.originalTarget === document.elementFromPoint(a.x, a.y)
};
Scroll.ScrollView.prototype.beginTouchesInContentIfPermitted = function () {
    this.touchesShouldBeginInContentElementAndView(this.originalEvent, this.originalTarget, this.originalTarget.getNearestView()) && this.beginTouchesInContent()
};
Scroll.ScrollView.prototype.beginTouchesInContent = function () {
    if (!this.isContentInChildScrollView()) {
        this.touchesInContentBegan = true;
        this.dispatchUIEventToContent(Scroll.START_EVENT);
        this.canCancelContentTouches || this.interruptTrackingInteraction(true)
    }
};
Scroll.ScrollView.prototype.endTouchesInContent = function () {
    this.dispatchUIEventToContent(Scroll.END_EVENT);
    this.elementShouldReceiveFocus(this.originalTarget) && this.originalTarget.focus()
};
Scroll.ScrollView.prototype.touchesShouldBeginInContentElementAndView = function () {
    return true
};
Scroll.ScrollView.prototype.cancelTouchesInContent = function () {
    var a = document.createEvent("Event");
    a.initEvent(Scroll.CANCEL_EVENT, true, true);
    a._synthetic = true;
    this.originalTarget.dispatchEvent(a);
    window.clearTimeout(this.beginTouchesInContentTimer)
};
Scroll.ScrollView.prototype.touchesShouldCancelInContentElementAndView = function (a) {
    return !Scroll.Control.isNodeInControlHierarchyBoundedByElement(a, this.hostingLayer)
};
Scroll.ScrollView.prototype.isContentInChildScrollView = function () {
    for (var a = this.scrollViews, b = 0, c = a.length; b < c; b++) if (a[b].originalTarget === this.originalTarget) return true;
    return false
};
Scroll.ScrollView.prototype.dispatchTapSequenceToContent = function () {
    this.dispatchUIEventToContent(Scroll.START_EVENT);
    this.endTouchesInContent()
};
Scroll.ScrollView.prototype.dispatchUIEventToContent = function (a) {
    a = Scroll.Utils.createUIEvent(a, this.originalEvent);
    a._synthetic = true;
    this.originalTarget.dispatchEvent(a)
};
Scroll.ScrollView.prototype.elementShouldReceiveFocus = function (a) {
    return Scroll.Utils.isElementTextFieldInput(a) || a.nodeName == "TEXTAREA"
};
Scroll.ScrollView.prototype.dispatchClickToContent = function () {
    if (Scroll.SUPPORTS_TOUCHES) {
        var a = this.getInitialTouch(this.originalEvent);
        if (a !== null) {
            var b = document.createEvent("MouseEvent");
            b.initMouseEvent("click", true, true, document.defaultView, 0, a.screenX, a.screenY, a.clientX, a.clientY, 0, 0, 0, 0, 0, 0, null);
            b._synthetic = true;
            this.originalTarget.dispatchEvent(b)
        }
    }
};
Scroll.ScrollView.prototype.transitionEnded = function (a) {
    if (this.scrollIndicatorsNeedFlashing && a.currentTarget === this.layer) {
        this.scrollIndicatorsNeedFlashing = false;
        this.flashScrollIndicators()
    }
    if (this.scrollTransitionsNeedRemoval && a.currentTarget === this.hostingLayer) {
        this.scrollTransitionsNeedRemoval = false;
        this.hostingLayer.style.webkitTransitionDuration = 0;
        this.didScroll(true)
    }
};
Scroll.ScrollView.prototype.didScroll = function (a) {
    a && this.dispatchNotification(Scroll.ScrollView.DID_END_SCROLLING_ANIMATION, this.delegate);
    this.dispatchNotification(Scroll.ScrollView.DID_SCROLL, this.delegate)
};
Scroll.ScrollView.prototype.startDecelerationAnimation = function () {
    if (!(this.bounces && (this._contentOffset.x > this.maxPoint.x || this._contentOffset.x < 0) && (this._contentOffset.y > this.maxPoint.y || this._contentOffset.y < 0))) {
        this.decelerationVelocity = this.panGestureRecognizer.velocityInView();
        this.decelerationVelocity.x = -this.decelerationVelocity.x;
        this.decelerationVelocity.y = -this.decelerationVelocity.y;
        this.adjustedDecelerationFactor = new Scroll.Size(Scroll.ScrollView.DECELERATION_FRICTION_FACTOR, Scroll.ScrollView.DECELERATION_FRICTION_FACTOR);
        if (!this.canScrollVertically) this.decelerationVelocity.y = 0;
        if (!this.canScrollHorizontally) this.decelerationVelocity.x = 0;
        this.minDecelerationPoint = new Scroll.Point(0, 0);
        this.maxDecelerationPoint = this.maxPoint.copy();
        if (this.pagingEnabled) {
            this.minDecelerationPoint.x = Math.max(0, Math.floor(this._contentOffset.x / this._size.width) * this._size.width);
            this.minDecelerationPoint.y = Math.max(0, Math.floor(this._contentOffset.y / this._size.height) * this._size.height);
            this.maxDecelerationPoint.x = Math.min(this.maxPoint.x, Math.ceil(this._contentOffset.x / this._size.width) * this._size.width);
            this.maxDecelerationPoint.y = Math.min(this.maxPoint.y, Math.ceil(this._contentOffset.y / this._size.height) * this._size.height)
        }
        var a = this.pagingEnabled ? Scroll.ScrollView.MIN_VELOCITY_FOR_DECELERATION_WITH_PAGING : Scroll.ScrollView.MIN_VELOCITY_FOR_DECELERATION;
        if (Math.abs(this.decelerationVelocity.x) > a || Math.abs(this.decelerationVelocity.y) > a) {
            this.decelerating = true;
            if (this.pagingEnabled) this.nextPageContentOffset = new Scroll.Point(this.decelerationVelocity.x > 0 ? this.maxDecelerationPoint.x : this.minDecelerationPoint.x, this.decelerationVelocity.y > 0 ? this.maxDecelerationPoint.y : this.minDecelerationPoint.y);
            else Scroll.Utils.objectHasMethod(this.delegate, Scroll.ScrollView.WILL_END_DRAGGING) && this.adjustedDecelerationParameters();
            this.decelerationTimer = this.callMethodNameAfterDelay("stepThroughDecelerationAnimation", Scroll.ScrollView.DESIRED_ANIMATION_FRAME_RATE);
            this.previousDecelerationFrame = new Date;
            this.dispatchNotification(Scroll.ScrollView.WILL_BEGIN_DECELERATING, this.delegate)
        }
    }
};
Scroll.ScrollView.prototype.adjustedDecelerationParameters = function () {
    var a = new Scroll.Point(this.decelerationVelocity.x / 1E3, this.decelerationVelocity.y / 1E3),
        b = new Scroll.Point((this.decelerationVelocity.x < 0 ? -Scroll.ScrollView.MINIMUM_VELOCITY : Scroll.ScrollView.MINIMUM_VELOCITY) / 1E3, (this.decelerationVelocity.y < 0 ? -Scroll.ScrollView.MINIMUM_VELOCITY : Scroll.ScrollView.MINIMUM_VELOCITY) / 1E3),
        c = Math.log(Scroll.ScrollView.DECELERATION_FRICTION_FACTOR),
        d = new Scroll.Point(this._contentOffset.x - (a.x - b.x) / c, this._contentOffset.y - (a.y - b.y) / c);
    d.x = Scroll.Utils.clampValue(d.x, this.minDecelerationPoint.x, this.maxDecelerationPoint.x);
    d.y = Scroll.Utils.clampValue(d.y, this.minDecelerationPoint.y, this.maxDecelerationPoint.y);
    var e = d.copy();
    this.delegate[Scroll.ScrollView.WILL_END_DRAGGING](this, a, d);
    if (!e.equals(d)) {
        var f = new Scroll.Point(d.x - this._contentOffset.x, d.y - this._contentOffset.y);
        if (a.x <= 0 && d.x < e.x || a.x >= 0 && d.x > e.x) this.decelerationVelocity.x = (b.x - c * f.x) * 1E3;
        else this.adjustedDecelerationFactor.width = Math.min(Scroll.ScrollView.MIN_VELOCITY_FOR_DECELERATION, Math.exp(-(a.x - b.x) / f.x));
        if (a.y <= 0 && d.y < e.y || a.y >= 0 && d.y > e.y) this.decelerationVelocity.y = (b.y - c * f.y) * 1E3;
        else this.adjustedDecelerationFactor.height = Math.min(Scroll.ScrollView.MIN_VELOCITY_FOR_DECELERATION, Math.exp(-(a.y - b.y) / f.y))
    }
};
Scroll.ScrollView.prototype.stopDecelerationAnimation = function () {
    this.decelerating = false;
    clearTimeout(this.decelerationTimer)
};
Scroll.ScrollView.prototype.stepThroughDecelerationAnimation = function () {
    if (this.decelerating) {
        var a = new Date,
            b = a - this.previousDecelerationFrame,
            c = this._contentOffset.copy();
        if (this.pagingEnabled) for (var d = 0; d < b; d++) {
            this.decelerationVelocity.x += 1E3 * Scroll.ScrollView.PAGING_ACCELERATION * (this.nextPageContentOffset.x - c.x);
            this.decelerationVelocity.x *= Scroll.ScrollView.PAGING_DECELERATION;
            c.x += this.decelerationVelocity.x / 1E3;
            this.decelerationVelocity.y += 1E3 * Scroll.ScrollView.PAGING_ACCELERATION * (this.nextPageContentOffset.y - c.y);
            this.decelerationVelocity.y *= Scroll.ScrollView.PAGING_DECELERATION;
            c.y += this.decelerationVelocity.y / 1E3
        } else {
            d = this.adjustedDecelerationFactor;
            b = new Scroll.Size(Math.exp(Math.log(d.width) * b), Math.exp(Math.log(d.height) * b));
            d = new Scroll.Size(d.width * ((1 - b.width) / (1 - d.width)), d.height * ((1 - b.height) / (1 - d.height)));
            c.x += this.decelerationVelocity.x / 1E3 * d.width;
            c.y += this.decelerationVelocity.y / 1E3 * d.height;
            this.decelerationVelocity.x *= b.width;
            this.decelerationVelocity.y *= b.height
        }
        if (!this.bounces) {
            b = Math.max(Math.min(this.maxPoint.x, c.x), 0);
            if (b != c.x) {
                c.x = b;
                this.decelerationVelocity.x = 0
            }
            b = Math.max(Math.min(this.maxPoint.y, c.y), 0);
            if (b != c.y) {
                c.y = b;
                this.decelerationVelocity.y = 0
            }
        }
        if ((this._contentOffset.x | 0) == (c.x | 0) && (this._contentOffset.y | 0) == (c.y | 0)) this._contentOffset = c;
        else {
            this.contentOffset = c;
        }
        b = Math.abs(this.decelerationVelocity.y);
        b = Math.abs(this.decelerationVelocity.x) <= Scroll.ScrollView.MINIMUM_VELOCITY && b <= Scroll.ScrollView.MINIMUM_VELOCITY;
        d = this.pagingEnabled && b && Math.abs(this.nextPageContentOffset.x - c.x) <= 1 && Math.abs(this.nextPageContentOffset.y - c.y) <= 1;
        if (!this.pagingEnabled && b || d) this.decelerationAnimationCompleted();
        else {
            if (!this.pagingEnabled && this.bounces) {
                b = new Scroll.Point(0, 0);
                if (c.x < this.minDecelerationPoint.x) b.x = this.minDecelerationPoint.x - c.x;
                else if (c.x > this.maxDecelerationPoint.x) b.x = this.maxDecelerationPoint.x - c.x;
                if (c.y < this.minDecelerationPoint.y) b.y = this.minDecelerationPoint.y - c.y;
                else if (c.y > this.maxDecelerationPoint.y) b.y = this.maxDecelerationPoint.y - c.y;
                if (b.x != 0) if (b.x * this.decelerationVelocity.x <= 0) this.decelerationVelocity.x += b.x * Scroll.ScrollView.PENETRATION_DECELERATION;
                else this.decelerationVelocity.x = b.x * Scroll.ScrollView.PENETRATION_ACCELERATION;
                if (b.y != 0) if (b.y * this.decelerationVelocity.y <= 0) this.decelerationVelocity.y += b.y * Scroll.ScrollView.PENETRATION_DECELERATION;
                else {
                    this.decelerationVelocity.y = b.y * Scroll.ScrollView.PENETRATION_ACCELERATION;
                }
            }
            this.decelerationTimer = this.callMethodNameAfterDelay("stepThroughDecelerationAnimation", Scroll.ScrollView.DESIRED_ANIMATION_FRAME_RATE);
            this.previousDecelerationFrame = a
        }
    }
};
Scroll.ScrollView.prototype.decelerationAnimationCompleted = function () {
    this.stopDecelerationAnimation();
    this.hideScrollIndicators();
    this.pagingEnabled && this.setContentOffsetAnimated(new Scroll.Point(Math.round(this._contentOffset.x / this._size.width) * this._size.width, Math.round(this._contentOffset.y / this._size.height) * this._size.height), false);
    this.snapContentOffsetToBounds(false);
    this.dispatchNotification(Scroll.ScrollView.DID_END_DECELERATING, this.delegate)
};
