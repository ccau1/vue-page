import crypto from 'crypto';
import vm from 'vm';

let QuestionControlProps$b = {
  properties: {
    type: Object,
    required: true
  },
  widget: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true
  },
  t: {
    type: Function,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
};
let WidgetControlProps$j = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

var activeEffectScope;
var effectScopeStack = [];
var EffectScopeImpl = /** @class */ (function () {
    function EffectScopeImpl(vm) {
        this.active = true;
        this.effects = [];
        this.cleanups = [];
        this.vm = vm;
    }
    EffectScopeImpl.prototype.run = function (fn) {
        if (this.active) {
            try {
                this.on();
                return fn();
            }
            finally {
                this.off();
            }
        }
        return;
    };
    EffectScopeImpl.prototype.on = function () {
        if (this.active) {
            effectScopeStack.push(this);
            activeEffectScope = this;
        }
    };
    EffectScopeImpl.prototype.off = function () {
        if (this.active) {
            effectScopeStack.pop();
            activeEffectScope = effectScopeStack[effectScopeStack.length - 1];
        }
    };
    EffectScopeImpl.prototype.stop = function () {
        if (this.active) {
            this.vm.$destroy();
            this.effects.forEach(function (e) { return e.stop(); });
            this.cleanups.forEach(function (cleanup) { return cleanup(); });
            this.active = false;
        }
    };
    return EffectScopeImpl;
}());
/** @class */ ((function (_super) {
    __extends(EffectScope, _super);
    function EffectScope(detached) {
        if (detached === void 0) { detached = false; }
        var _this = this;
        var vm = undefined;
        withCurrentInstanceTrackingDisabled(function () {
            vm = defineComponentInstance(getVueConstructor());
        });
        _this = _super.call(this, vm) || this;
        if (!detached) {
            recordEffectScope(_this);
        }
        return _this;
    }
    return EffectScope;
})(EffectScopeImpl));
function recordEffectScope(effect, scope) {
    var _a;
    scope = scope || activeEffectScope;
    if (scope && scope.active) {
        scope.effects.push(effect);
        return;
    }
    // destory on parent component unmounted
    var vm = (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy;
    vm && vm.$on('hook:destroyed', function () { return effect.stop(); });
}
/**
 * @internal
 **/
function bindCurrentScopeToVM(vm) {
    if (!vm.scope) {
        var scope_1 = new EffectScopeImpl(vm.proxy);
        vm.scope = scope_1;
        vm.proxy.$on('hook:destroyed', function () { return scope_1.stop(); });
    }
    return vm.scope;
}

var vueDependency = undefined;
try {
    var requiredVue = require('vue');
    if (requiredVue && isVue(requiredVue)) {
        vueDependency = requiredVue;
    }
    else if (requiredVue &&
        'default' in requiredVue &&
        isVue(requiredVue.default)) {
        vueDependency = requiredVue.default;
    }
}
catch (_a) {
    // not available
}
var vueConstructor = null;
var currentInstance = null;
var currentInstanceTracking = true;
var PluginInstalledFlag = '__composition_api_installed__';
function isVue(obj) {
    return obj && isFunction(obj) && obj.name === 'Vue';
}
function isVueRegistered(Vue) {
    // resolve issue: https://github.com/vuejs/composition-api/issues/876#issue-1087619365
    return vueConstructor && hasOwn(Vue, PluginInstalledFlag);
}
function getVueConstructor() {
    return vueConstructor;
}
// returns registered vue or `vue` dependency
function getRegisteredVueOrDefault() {
    var constructor = vueConstructor || vueDependency;
    return constructor;
}
function setVueConstructor(Vue) {
    vueConstructor = Vue;
    Object.defineProperty(Vue, PluginInstalledFlag, {
        configurable: true,
        writable: true,
        value: true,
    });
}
/**
 * For `effectScope` to create instance without populate the current instance
 * @internal
 **/
function withCurrentInstanceTrackingDisabled(fn) {
    var prev = currentInstanceTracking;
    currentInstanceTracking = false;
    try {
        fn();
    }
    finally {
        currentInstanceTracking = prev;
    }
}
function setCurrentInstance(instance) {
    if (!currentInstanceTracking)
        return;
    var prev = currentInstance;
    prev === null || prev === void 0 ? void 0 : prev.scope.off();
    currentInstance = instance;
    currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope.on();
}
function getCurrentInstance() {
    return currentInstance;
}
var instanceMapCache = new WeakMap();
function toVue3ComponentInstance(vm) {
    if (instanceMapCache.has(vm)) {
        return instanceMapCache.get(vm);
    }
    var instance = {
        proxy: vm,
        update: vm.$forceUpdate,
        type: vm.$options,
        uid: vm._uid,
        // $emit is defined on prototype and it expected to be bound
        emit: vm.$emit.bind(vm),
        parent: null,
        root: null, // to be immediately set
    };
    bindCurrentScopeToVM(instance);
    // map vm.$props =
    var instanceProps = [
        'data',
        'props',
        'attrs',
        'refs',
        'vnode',
        'slots',
    ];
    instanceProps.forEach(function (prop) {
        proxy(instance, prop, {
            get: function () {
                return vm["$".concat(prop)];
            },
        });
    });
    proxy(instance, 'isMounted', {
        get: function () {
            // @ts-expect-error private api
            return vm._isMounted;
        },
    });
    proxy(instance, 'isUnmounted', {
        get: function () {
            // @ts-expect-error private api
            return vm._isDestroyed;
        },
    });
    proxy(instance, 'isDeactivated', {
        get: function () {
            // @ts-expect-error private api
            return vm._inactive;
        },
    });
    proxy(instance, 'emitted', {
        get: function () {
            // @ts-expect-error private api
            return vm._events;
        },
    });
    instanceMapCache.set(vm, instance);
    if (vm.$parent) {
        instance.parent = toVue3ComponentInstance(vm.$parent);
    }
    if (vm.$root) {
        instance.root = toVue3ComponentInstance(vm.$root);
    }
    return instance;
}

var toString$1 = function (x) { return Object.prototype.toString.call(x); };
function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}
var hasSymbol = typeof Symbol !== 'undefined' &&
    isNative(Symbol) &&
    typeof Reflect !== 'undefined' &&
    isNative(Reflect.ownKeys);
var noopFn = function (_) { return _; };
function proxy(target, key, _a) {
    var get = _a.get, set = _a.set;
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get: get || noopFn,
        set: set || noopFn,
    });
}
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true,
    });
}
function hasOwn(obj, key) {
    return Object.hasOwnProperty.call(obj, key);
}
function isArray(x) {
    return Array.isArray(x);
}
var MAX_VALID_ARRAY_LENGTH = 4294967295; // Math.pow(2, 32) - 1
function isValidArrayIndex(val) {
    var n = parseFloat(String(val));
    return (n >= 0 &&
        Math.floor(n) === n &&
        isFinite(val) &&
        n <= MAX_VALID_ARRAY_LENGTH);
}
function isObject$2(val) {
    return val !== null && typeof val === 'object';
}
function isPlainObject$1(x) {
    return toString$1(x) === '[object Object]';
}
function isFunction(x) {
    return typeof x === 'function';
}
function defineComponentInstance(Ctor, options) {
    if (options === void 0) { options = {}; }
    var silent = Ctor.config.silent;
    Ctor.config.silent = true;
    var vm = new Ctor(options);
    Ctor.config.silent = silent;
    return vm;
}
function isComponentInstance(obj) {
    var Vue = getVueConstructor();
    return Vue && obj instanceof Vue;
}
function createSlotProxy(vm, slotName) {
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!vm.$scopedSlots[slotName]) {
            return;
        }
        return vm.$scopedSlots[slotName].apply(vm, args);
    });
}
function resolveSlots(slots, normalSlots) {
    var res;
    if (!slots) {
        res = {};
    }
    else if (slots._normalized) {
        // fast path 1: child component re-render only, parent did not change
        return slots._normalized;
    }
    else {
        res = {};
        for (var key in slots) {
            if (slots[key] && key[0] !== '$') {
                res[key] = true;
            }
        }
    }
    // expose normal slots on scopedSlots
    for (var key in normalSlots) {
        if (!(key in res)) {
            res[key] = true;
        }
    }
    return res;
}
// must be a string, symbol key is ignored in reactive
var RefKey = 'composition-api.refKey';

var accessModifiedSet = new WeakMap();
var readonlySet = new WeakMap();

/**
 * Set a property on an object. Adds the new property, triggers change
 * notification and intercept it's subsequent access if the property doesn't
 * already exist.
 */
function set$1(target, key, val) {
    var Vue = getVueConstructor();
    // @ts-expect-error https://github.com/vuejs/vue/pull/12132
    var _a = Vue.util; _a.warn; var defineReactive = _a.defineReactive;
    var ob = target.__ob__;
    function ssrMockReactivity() {
        // in SSR, there is no __ob__. Mock for reactivity check
        if (ob && isObject$2(val) && !hasOwn(val, '__ob__')) {
            mockReactivityDeep(val);
        }
    }
    if (isArray(target)) {
        if (isValidArrayIndex(key)) {
            target.length = Math.max(target.length, key);
            target.splice(key, 1, val);
            ssrMockReactivity();
            return val;
        }
        else if (key === 'length' && val !== target.length) {
            target.length = val;
            ob === null || ob === void 0 ? void 0 : ob.dep.notify();
            return val;
        }
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        ssrMockReactivity();
        return val;
    }
    if (target._isVue || (ob && ob.vmCount)) {
        return val;
    }
    if (!ob) {
        target[key] = val;
        return val;
    }
    defineReactive(ob.value, key, val);
    // IMPORTANT: define access control before trigger watcher
    defineAccessControl(target, key, val);
    ssrMockReactivity();
    ob.dep.notify();
    return val;
}

var RefImpl = /** @class */ (function () {
    function RefImpl(_a) {
        var get = _a.get, set = _a.set;
        proxy(this, 'value', {
            get: get,
            set: set,
        });
    }
    return RefImpl;
}());
function createRef(options, isReadonly, isComputed) {
    if (isReadonly === void 0) { isReadonly = false; }
    if (isComputed === void 0) { isComputed = false; }
    var r = new RefImpl(options);
    // add effect to differentiate refs from computed
    if (isComputed)
        r.effect = true;
    // seal the ref, this could prevent ref from being observed
    // It's safe to seal the ref, since we really shouldn't extend it.
    // related issues: #79
    var sealed = Object.seal(r);
    if (isReadonly)
        readonlySet.set(sealed, true);
    return sealed;
}
function ref(raw) {
    var _a;
    if (isRef(raw)) {
        return raw;
    }
    var value = reactive((_a = {}, _a[RefKey] = raw, _a));
    return createRef({
        get: function () { return value[RefKey]; },
        set: function (v) { return (value[RefKey] = v); },
    });
}
function isRef(value) {
    return value instanceof RefImpl;
}
function toRefs(obj) {
    if (!isPlainObject$1(obj))
        return obj;
    var ret = {};
    for (var key in obj) {
        ret[key] = toRef(obj, key);
    }
    return ret;
}
function toRef(object, key) {
    if (!(key in object))
        set$1(object, key, undefined);
    var v = object[key];
    if (isRef(v))
        return v;
    return createRef({
        get: function () { return object[key]; },
        set: function (v) { return (object[key] = v); },
    });
}

function isRaw(obj) {
    var _a;
    return Boolean(obj &&
        hasOwn(obj, '__ob__') &&
        typeof obj.__ob__ === 'object' &&
        ((_a = obj.__ob__) === null || _a === void 0 ? void 0 : _a.__raw__));
}
function isReactive(obj) {
    var _a;
    return Boolean(obj &&
        hasOwn(obj, '__ob__') &&
        typeof obj.__ob__ === 'object' &&
        !((_a = obj.__ob__) === null || _a === void 0 ? void 0 : _a.__raw__));
}
/**
 * Proxing property access of target.
 * We can do unwrapping and other things here.
 */
function setupAccessControl(target) {
    if (!isPlainObject$1(target) ||
        isRaw(target) ||
        isArray(target) ||
        isRef(target) ||
        isComponentInstance(target) ||
        accessModifiedSet.has(target))
        return;
    accessModifiedSet.set(target, true);
    var keys = Object.keys(target);
    for (var i = 0; i < keys.length; i++) {
        defineAccessControl(target, keys[i]);
    }
}
/**
 * Auto unwrapping when access property
 */
function defineAccessControl(target, key, val) {
    if (key === '__ob__')
        return;
    if (isRaw(target[key]))
        return;
    var getter;
    var setter;
    var property = Object.getOwnPropertyDescriptor(target, key);
    if (property) {
        if (property.configurable === false) {
            return;
        }
        getter = property.get;
        setter = property.set;
        if ((!getter || setter) /* not only have getter */ &&
            arguments.length === 2) {
            val = target[key];
        }
    }
    setupAccessControl(val);
    proxy(target, key, {
        get: function getterHandler() {
            var value = getter ? getter.call(target) : val;
            // if the key is equal to RefKey, skip the unwrap logic
            if (key !== RefKey && isRef(value)) {
                return value.value;
            }
            else {
                return value;
            }
        },
        set: function setterHandler(newVal) {
            if (getter && !setter)
                return;
            // If the key is equal to RefKey, skip the unwrap logic
            // If and only if "value" is ref and "newVal" is not a ref,
            // the assignment should be proxied to "value" ref.
            if (key !== RefKey && isRef(val) && !isRef(newVal)) {
                val.value = newVal;
            }
            else if (setter) {
                setter.call(target, newVal);
                val = newVal;
            }
            else {
                val = newVal;
            }
            setupAccessControl(newVal);
        },
    });
}
function observe(obj) {
    var Vue = getRegisteredVueOrDefault();
    var observed;
    if (Vue.observable) {
        observed = Vue.observable(obj);
    }
    else {
        var vm = defineComponentInstance(Vue, {
            data: {
                $$state: obj,
            },
        });
        observed = vm._data.$$state;
    }
    // in SSR, there is no __ob__. Mock for reactivity check
    if (!hasOwn(observed, '__ob__')) {
        mockReactivityDeep(observed);
    }
    return observed;
}
/**
 * Mock __ob__ for object recursively
 */
function mockReactivityDeep(obj, seen) {
    var e_1, _a;
    if (seen === void 0) { seen = new Set(); }
    if (seen.has(obj) || hasOwn(obj, '__ob__') || !Object.isExtensible(obj))
        return;
    def(obj, '__ob__', mockObserver(obj));
    seen.add(obj);
    try {
        for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var value = obj[key];
            if (!(isPlainObject$1(value) || isArray(value)) ||
                isRaw(value) ||
                !Object.isExtensible(value)) {
                continue;
            }
            mockReactivityDeep(value, seen);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function mockObserver(value) {
    if (value === void 0) { value = {}; }
    return {
        value: value,
        dep: {
            notify: noopFn,
            depend: noopFn,
            addSub: noopFn,
            removeSub: noopFn,
        },
    };
}
function createObserver() {
    return observe({}).__ob__;
}
/**
 * Make obj reactivity
 */
function reactive(obj) {
    if (!isObject$2(obj)) {
        return obj;
    }
    if (!(isPlainObject$1(obj) || isArray(obj)) ||
        isRaw(obj) ||
        !Object.isExtensible(obj)) {
        return obj;
    }
    var observed = observe(obj);
    setupAccessControl(observed);
    return observed;
}

function set(vm, key, value) {
    var state = (vm.__composition_api_state__ =
        vm.__composition_api_state__ || {});
    state[key] = value;
}
function get(vm, key) {
    return (vm.__composition_api_state__ || {})[key];
}
var vmStateManager = {
    set: set,
    get: get,
};

function asVmProperty(vm, propName, propValue) {
    var props = vm.$options.props;
    if (!(propName in vm) && !(props && hasOwn(props, propName))) {
        if (isRef(propValue)) {
            proxy(vm, propName, {
                get: function () { return propValue.value; },
                set: function (val) {
                    propValue.value = val;
                },
            });
        }
        else {
            proxy(vm, propName, {
                get: function () {
                    if (isReactive(propValue)) {
                        propValue.__ob__.dep.depend();
                    }
                    return propValue;
                },
                set: function (val) {
                    propValue = val;
                },
            });
        }
    }
}
function updateTemplateRef(vm) {
    var rawBindings = vmStateManager.get(vm, 'rawBindings') || {};
    if (!rawBindings || !Object.keys(rawBindings).length)
        return;
    var refs = vm.$refs;
    var oldRefKeys = vmStateManager.get(vm, 'refs') || [];
    for (var index = 0; index < oldRefKeys.length; index++) {
        var key = oldRefKeys[index];
        var setupValue = rawBindings[key];
        if (!refs[key] && setupValue && isRef(setupValue)) {
            setupValue.value = null;
        }
    }
    var newKeys = Object.keys(refs);
    var validNewKeys = [];
    for (var index = 0; index < newKeys.length; index++) {
        var key = newKeys[index];
        var setupValue = rawBindings[key];
        if (refs[key] && setupValue && isRef(setupValue)) {
            setupValue.value = refs[key];
            validNewKeys.push(key);
        }
    }
    vmStateManager.set(vm, 'refs', validNewKeys);
}
function afterRender(vm) {
    var stack = [vm._vnode];
    while (stack.length) {
        var vnode = stack.pop();
        if (vnode.context)
            updateTemplateRef(vnode.context);
        if (vnode.children) {
            for (var i = 0; i < vnode.children.length; ++i) {
                stack.push(vnode.children[i]);
            }
        }
    }
}
function updateVmAttrs(vm, ctx) {
    var e_1, _a;
    if (!vm) {
        return;
    }
    var attrBindings = vmStateManager.get(vm, 'attrBindings');
    if (!attrBindings && !ctx) {
        // fix 840
        return;
    }
    if (!attrBindings) {
        var observedData = reactive({});
        attrBindings = { ctx: ctx, data: observedData };
        vmStateManager.set(vm, 'attrBindings', attrBindings);
        proxy(ctx, 'attrs', {
            get: function () {
                return attrBindings === null || attrBindings === void 0 ? void 0 : attrBindings.data;
            },
            set: function () {
            },
        });
    }
    var source = vm.$attrs;
    var _loop_1 = function (attr) {
        if (!hasOwn(attrBindings.data, attr)) {
            proxy(attrBindings.data, attr, {
                get: function () {
                    // to ensure it always return the latest value
                    return vm.$attrs[attr];
                },
            });
        }
    };
    try {
        for (var _b = __values(Object.keys(source)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var attr = _c.value;
            _loop_1(attr);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function resolveScopedSlots(vm, slotsProxy) {
    var parentVNode = vm.$options._parentVnode;
    if (!parentVNode)
        return;
    var prevSlots = vmStateManager.get(vm, 'slots') || [];
    var curSlots = resolveSlots(parentVNode.data.scopedSlots, vm.$slots);
    // remove staled slots
    for (var index = 0; index < prevSlots.length; index++) {
        var key = prevSlots[index];
        if (!curSlots[key]) {
            delete slotsProxy[key];
        }
    }
    // proxy fresh slots
    var slotNames = Object.keys(curSlots);
    for (var index = 0; index < slotNames.length; index++) {
        var key = slotNames[index];
        if (!slotsProxy[key]) {
            slotsProxy[key] = createSlotProxy(vm, key);
        }
    }
    vmStateManager.set(vm, 'slots', slotNames);
}
function activateCurrentInstance(instance, fn, onError) {
    var preVm = getCurrentInstance();
    setCurrentInstance(instance);
    try {
        return fn(instance);
    }
    catch (
    // FIXME: remove any
    err) {
        if (onError) {
            onError(err);
        }
        else {
            throw err;
        }
    }
    finally {
        setCurrentInstance(preVm);
    }
}

function mixin(Vue) {
    Vue.mixin({
        beforeCreate: functionApiInit,
        mounted: function () {
            afterRender(this);
        },
        beforeUpdate: function () {
            updateVmAttrs(this);
        },
        updated: function () {
            afterRender(this);
        },
    });
    /**
     * Vuex init hook, injected into each instances init hooks list.
     */
    function functionApiInit() {
        var vm = this;
        var $options = vm.$options;
        var setup = $options.setup, render = $options.render;
        if (render) {
            // keep currentInstance accessible for createElement
            $options.render = function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return activateCurrentInstance(toVue3ComponentInstance(vm), function () {
                    return render.apply(_this, args);
                });
            };
        }
        if (!setup) {
            return;
        }
        if (!isFunction(setup)) {
            return;
        }
        var data = $options.data;
        // wrapper the data option, so we can invoke setup before data get resolved
        $options.data = function wrappedData() {
            initSetup(vm, vm.$props);
            return isFunction(data)
                ? data.call(vm, vm)
                : data || {};
        };
    }
    function initSetup(vm, props) {
        if (props === void 0) { props = {}; }
        var setup = vm.$options.setup;
        var ctx = createSetupContext(vm);
        var instance = toVue3ComponentInstance(vm);
        instance.setupContext = ctx;
        // fake reactive for `toRefs(props)`
        def(props, '__ob__', createObserver());
        // resolve scopedSlots and slots to functions
        resolveScopedSlots(vm, ctx.slots);
        var binding;
        activateCurrentInstance(instance, function () {
            // make props to be fake reactive, this is for `toRefs(props)`
            binding = setup(props, ctx);
        });
        if (!binding)
            return;
        if (isFunction(binding)) {
            // keep typescript happy with the binding type.
            var bindingFunc_1 = binding;
            // keep currentInstance accessible for createElement
            vm.$options.render = function () {
                resolveScopedSlots(vm, ctx.slots);
                return activateCurrentInstance(instance, function () { return bindingFunc_1(); });
            };
            return;
        }
        else if (isObject$2(binding)) {
            if (isReactive(binding)) {
                binding = toRefs(binding);
            }
            vmStateManager.set(vm, 'rawBindings', binding);
            var bindingObj_1 = binding;
            Object.keys(bindingObj_1).forEach(function (name) {
                var bindingValue = bindingObj_1[name];
                if (!isRef(bindingValue)) {
                    if (!isReactive(bindingValue)) {
                        if (isFunction(bindingValue)) {
                            var copy_1 = bindingValue;
                            bindingValue = bindingValue.bind(vm);
                            Object.keys(copy_1).forEach(function (ele) {
                                bindingValue[ele] = copy_1[ele];
                            });
                        }
                        else if (!isObject$2(bindingValue)) {
                            bindingValue = ref(bindingValue);
                        }
                        else if (hasReactiveArrayChild(bindingValue)) {
                            // creates a custom reactive properties without make the object explicitly reactive
                            // NOTE we should try to avoid this, better implementation needed
                            customReactive(bindingValue);
                        }
                    }
                    else if (isArray(bindingValue)) {
                        bindingValue = ref(bindingValue);
                    }
                }
                asVmProperty(vm, name, bindingValue);
            });
            return;
        }
    }
    function customReactive(target, seen) {
        if (seen === void 0) { seen = new Set(); }
        if (seen.has(target))
            return;
        if (!isPlainObject$1(target) ||
            isRef(target) ||
            isReactive(target) ||
            isRaw(target))
            return;
        var Vue = getVueConstructor();
        // @ts-expect-error https://github.com/vuejs/vue/pull/12132
        var defineReactive = Vue.util.defineReactive;
        Object.keys(target).forEach(function (k) {
            var val = target[k];
            defineReactive(target, k, val);
            if (val) {
                seen.add(val);
                customReactive(val, seen);
            }
            return;
        });
    }
    function hasReactiveArrayChild(target, visited) {
        if (visited === void 0) { visited = new Map(); }
        if (visited.has(target)) {
            return visited.get(target);
        }
        visited.set(target, false);
        if (isArray(target) && isReactive(target)) {
            visited.set(target, true);
            return true;
        }
        if (!isPlainObject$1(target) || isRaw(target) || isRef(target)) {
            return false;
        }
        return Object.keys(target).some(function (x) {
            return hasReactiveArrayChild(target[x], visited);
        });
    }
    function createSetupContext(vm) {
        var ctx = { slots: {} };
        var propsPlain = [
            'root',
            'parent',
            'refs',
            'listeners',
            'isServer',
            'ssrContext',
        ];
        var methodReturnVoid = ['emit'];
        propsPlain.forEach(function (key) {
            var srcKey = "$".concat(key);
            proxy(ctx, key, {
                get: function () { return vm[srcKey]; },
                set: function () {
                },
            });
        });
        updateVmAttrs(vm, ctx);
        methodReturnVoid.forEach(function (key) {
            var srcKey = "$".concat(key);
            proxy(ctx, key, {
                get: function () {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var fn = vm[srcKey];
                        fn.apply(vm, args);
                    };
                },
            });
        });
        return ctx;
    }
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(from, to) {
    if (!from)
        return to;
    if (!to)
        return from;
    var key;
    var toVal;
    var fromVal;
    var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
    for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        // in case the object is already observed...
        if (key === '__ob__')
            continue;
        toVal = to[key];
        fromVal = from[key];
        if (!hasOwn(to, key)) {
            to[key] = fromVal;
        }
        else if (toVal !== fromVal &&
            isPlainObject$1(toVal) &&
            !isRef(toVal) &&
            isPlainObject$1(fromVal) &&
            !isRef(fromVal)) {
            mergeData(fromVal, toVal);
        }
    }
    return to;
}
function install$1(Vue) {
    if (isVueRegistered(Vue)) {
        return;
    }
    Vue.config.optionMergeStrategies.setup = function (parent, child) {
        return function mergedSetupFn(props, context) {
            return mergeData(isFunction(parent) ? parent(props, context) || {} : undefined, isFunction(child) ? child(props, context) || {} : undefined);
        };
    };
    setVueConstructor(Vue);
    mixin(Vue);
}
var Plugin = {
    install: function (Vue) { return install$1(Vue); },
};

// implementation, close to no-op
function defineComponent(options) {
    return options;
}
// auto install when using CDN
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin);
}

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify$1(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify$1(rnds);
}

const WidgetControlProps$i = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$1b = defineComponent({
  props: WidgetControlProps$i,
  inject: ['getLocale', 'setMessage'],

  mounted() {
    this.$nextTick(() => {
      this.$refs.titleInput.style.height = '';
      this.$refs.titleInput.style.height = this.$refs.titleInput.scrollHeight + 'px';
      this.$refs.textInput.style.height = '';
      this.$refs.textInput.style.height = this.$refs.textInput.scrollHeight + 'px';
    });
  },

  data() {
    return {
      isOpen: true
    };
  },

  methods: {
    onCloseAlert() {
      this.$data.isOpen = false;
      setTimeout(() => this.$data.isOpen = true, 1000);
    },

    updateText(name, text) {
      this.setMessage({
        id: this.$props.widget.id,
        locale: this.getLocale(),
        key: `__${name}`,
        value: text.replaceAll(/\n|\r/g, '')
      });
    }

  },
  computed: {
    alertStyles() {
      var _this$widget, _this$widget2;

      if (((_this$widget = this.widget) === null || _this$widget === void 0 ? void 0 : _this$widget.properties.type) !== 'custom' || (_this$widget2 = this.widget) !== null && _this$widget2 !== void 0 && _this$widget2.properties.customColor) return {};
      return {
        backgroundColor: this.widget.properties.customBackgroundColor,
        borderColor: this.widget.properties.customBorderColor || 'transparent',
        ...(this.widget.properties.customTextColor ? {
          color: this.widget.properties.customTextColor
        } : {})
      };
    }

  }
});

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1b = script$1b;
/* template */

var __vue_render__$1b = function () {
  var this$1$1 = this;

  var _obj;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.isOpen ? _c('div', {
    staticClass: "alert",
    class: (_obj = {}, _obj[_vm.widget.properties.type] = true, _obj),
    style: _vm.alertStyles
  }, [_c('h3', {
    staticClass: "title"
  }, [_c('textarea', {
    ref: "titleInput",
    staticClass: "text-input",
    attrs: {
      "oninput": "this.style.height = \"\";this.style.height = this.scrollHeight + \"px\""
    },
    domProps: {
      "value": _vm.t('__title', _vm.widget.id)
    },
    on: {
      "input": function (ev) {
        return _vm.updateText('title', ev.target.value);
      },
      "load": function () {
        this$1$1.style.height = '';
        this$1$1.style.height = this$1$1.scrollHeight + 'px';
      }
    }
  })]), _vm._v(" "), _c('p', [_c('textarea', {
    ref: "textInput",
    staticClass: "text-input",
    attrs: {
      "oninput": "this.style.height = \"\";this.style.height = this.scrollHeight + \"px\""
    },
    domProps: {
      "value": _vm.t('__text', _vm.widget.id)
    },
    on: {
      "input": function (ev) {
        return _vm.updateText('text', ev.target.value);
      },
      "load": function () {
        this$1$1.style.height = '';
        this$1$1.style.height = this$1$1.scrollHeight + 'px';
      }
    }
  })]), _vm._v(" "), _vm.widget.properties.showCloseBtn ? _c('a', {
    staticClass: "close-button",
    on: {
      "click": _vm.onCloseAlert
    }
  }, [_vm._v("x")]) : _vm._e()]) : _vm._e();
};

var __vue_staticRenderFns__$1b = [];
/* style */

const __vue_inject_styles__$1b = function (inject) {
  if (!inject) return;
  inject("data-v-1c7a8776_0", {
    source: ".alert[data-v-1c7a8776]{padding:18px 18px;margin:10px 0;border-radius:10px;background-color:#f4f6f8;border:1px solid #e5e9ed;position:relative}.alert.success[data-v-1c7a8776]{background-color:#ebf7ee;border-color:#e2f1e7}.alert.info[data-v-1c7a8776]{background-color:#e6f0f8;border-color:#cad9e7}.alert.danger[data-v-1c7a8776]{background-color:#fdede9;border-color:#f2e1dd}.alert.warning[data-v-1c7a8776]{background-color:#fef8ea;border-color:#f4eada}.alert .title[data-v-1c7a8776]{margin:0 0 10px 0;font-weight:700}.alert>.close-button[data-v-1c7a8776]{position:absolute;top:0;right:0;padding:18px 18px;cursor:pointer;transform:scaleX(1.2)}.text-input[data-v-1c7a8776]{font-size:inherit;font-weight:inherit;font-family:inherit;border:none;outline:0;width:100%;background-color:transparent;resize:none;min-height:10px;margin-bottom:-15px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1b = "data-v-1c7a8776";
/* module identifier */

const __vue_module_identifier__$1b = undefined;
/* functional template */

const __vue_is_functional_template__$1b = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1b,
  staticRenderFns: __vue_staticRenderFns__$1b
}, __vue_inject_styles__$1b, __vue_script__$1b, __vue_scope_id__$1b, __vue_is_functional_template__$1b, __vue_module_identifier__$1b, false, createInjector, undefined, undefined);

var Builder$8 = __vue_component__$1d;

const WidgetControlProps$h = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$1a = defineComponent({
  props: { ...WidgetControlProps$h
  },

  data() {
    return {
      isOpen: true
    };
  },

  computed: {
    alertStyles() {
      if (this.widget.properties.type !== 'custom' || this.widget.properties.customColor) return {};
      return {
        backgroundColor: this.widget.properties.customBackgroundColor,
        borderColor: this.widget.properties.customBorderColor || 'transparent',
        ...(this.widget.properties.customTextColor ? {
          color: this.widget.properties.customTextColor
        } : {})
      };
    }

  },
  methods: {
    onCloseAlert() {
      this.$data.isOpen = false;
    }

  }
});

/* script */
const __vue_script__$1a = script$1a;
/* template */

var __vue_render__$1a = function () {
  var _obj;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.isOpen ? _c('div', {
    staticClass: "alert",
    class: (_obj = {}, _obj[_vm.widget.properties.type] = true, _obj),
    style: _vm.alertStyles
  }, [_c('h3', {
    staticClass: "title"
  }, [_vm._v("\n    " + _vm._s(_vm.t('__title')) + "\n  ")]), _vm._v(" "), _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.t('__text'))
    }
  }), _vm._v(" "), _vm.widget.properties.showCloseBtn ? _c('a', {
    staticClass: "close-button",
    on: {
      "click": _vm.onCloseAlert
    }
  }, [_vm._v("x")]) : _vm._e()]) : _vm._e();
};

var __vue_staticRenderFns__$1a = [];
/* style */

const __vue_inject_styles__$1a = function (inject) {
  if (!inject) return;
  inject("data-v-6da03338_0", {
    source: ".alert[data-v-6da03338]{padding:18px 18px;margin:10px 0;border-radius:10px;background-color:#f4f6f8;border:1px solid #e5e9ed;position:relative}.alert.success[data-v-6da03338]{background-color:#ebf7ee;border-color:#e2f1e7}.alert.info[data-v-6da03338]{background-color:#e6f0f8;border-color:#cad9e7}.alert.danger[data-v-6da03338]{background-color:#fdede9;border-color:#f2e1dd}.alert.warning[data-v-6da03338]{background-color:#fef8ea;border-color:#f4eada}.alert .title[data-v-6da03338]{margin:0 0 10px 0;font-weight:700}.alert>.close-button[data-v-6da03338]{position:absolute;top:0;right:0;padding:18px 18px;cursor:pointer;transform:scaleX(1.2)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1a = "data-v-6da03338";
/* module identifier */

const __vue_module_identifier__$1a = undefined;
/* functional template */

const __vue_is_functional_template__$1a = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1a,
  staticRenderFns: __vue_staticRenderFns__$1a
}, __vue_inject_styles__$1a, __vue_script__$1a, __vue_scope_id__$1a, __vue_is_functional_template__$1a, __vue_module_identifier__$1a, false, createInjector, undefined, undefined);

var Display$e = __vue_component__$1c;

let WidgetControlProps$g = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$19 = defineComponent({
  props: WidgetControlProps$g,

  data() {
    return {
      isOpen: true
    };
  },

  computed: {
    alertStyles() {
      var _this$widget, _this$widget2, _this$widget3, _this$widget4, _this$widget5, _this$widget6;

      if (((_this$widget = this.widget) === null || _this$widget === void 0 ? void 0 : _this$widget.properties.type) !== 'custom' || (_this$widget2 = this.widget) !== null && _this$widget2 !== void 0 && _this$widget2.properties.customColor) return {};
      return {
        backgroundColor: (_this$widget3 = this.widget) === null || _this$widget3 === void 0 ? void 0 : _this$widget3.properties.customBackgroundColor,
        borderColor: ((_this$widget4 = this.widget) === null || _this$widget4 === void 0 ? void 0 : _this$widget4.properties.customBorderColor) || 'transparent',
        ...((_this$widget5 = this.widget) !== null && _this$widget5 !== void 0 && _this$widget5.properties.customTextColor ? {
          color: (_this$widget6 = this.widget) === null || _this$widget6 === void 0 ? void 0 : _this$widget6.properties.customTextColor
        } : {})
      };
    }

  },
  methods: {
    onCloseAlert() {
      this.$data.isOpen = false;
    }

  }
});

/* script */
const __vue_script__$19 = script$19;
/* template */

var __vue_render__$19 = function () {
  var _obj;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.isOpen ? _c('div', {
    staticClass: "alert",
    class: (_obj = {}, _obj[_vm.widget.properties.type] = true, _obj),
    style: _vm.alertStyles
  }, [_c('h3', [_vm._v(_vm._s(_vm.t('__title', _vm.widget.id)))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.t('__text', _vm.widget.id)))]), _vm._v(" "), _vm.widget.properties.showCloseBtn ? _c('a', {
    staticClass: "close-button",
    on: {
      "click": _vm.onCloseAlert
    }
  }, [_vm._v("x")]) : _vm._e()]) : _vm._e();
};

var __vue_staticRenderFns__$19 = [];
/* style */

const __vue_inject_styles__$19 = function (inject) {
  if (!inject) return;
  inject("data-v-20431722_0", {
    source: ".alert[data-v-20431722]{padding:10px;margin:10px;border-radius:10px;background-color:#f4f6f8;border:1px solid #e5e9ed;position:relative}.alert.success[data-v-20431722]{background-color:#ebf7ee;border-color:#e2f1e7}.alert.info[data-v-20431722]{background-color:#e6f0f8;border-color:#cad9e7}.alert.danger[data-v-20431722]{background-color:#fdede9;border-color:#f2e1dd}.alert.warning[data-v-20431722]{background-color:#fef8ea;border-color:#f4eada}.alert>.close-button[data-v-20431722]{position:absolute;top:0;right:0;padding:10px 15px;cursor:pointer;transform:scaleX(1.2)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$19 = "data-v-20431722";
/* module identifier */

const __vue_module_identifier__$19 = undefined;
/* functional template */

const __vue_is_functional_template__$19 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$19,
  staticRenderFns: __vue_staticRenderFns__$19
}, __vue_inject_styles__$19, __vue_script__$19, __vue_scope_id__$19, __vue_is_functional_template__$19, __vue_module_identifier__$19, false, createInjector, undefined, undefined);

var ReadOnly$e = __vue_component__$1b;

var alert = {
  create(props) {
    return {
      id: v4(),
      type: 'alert',
      properties: {
        type: 'default',
        ...props
      }
    };
  },

  display: Display$e,
  builder: Builder$8,
  readOnly: ReadOnly$e
};

var script$18 = defineComponent({
  props: WidgetControlProps$j,
  inject: ['getLocale', 'setMessage'],
  methods: {
    onTextChange(val) {
      this.setMessage({
        id: this.$props.widget.id,
        locale: this.getLocale(),
        key: '__label',
        value: val.target.value
      });
    }

  }
});

/* script */
const __vue_script__$18 = script$18;
/* template */

var __vue_render__$18 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.widget.properties.tagType, {
    tag: "component",
    staticClass: "header"
  }, [_c('input', {
    staticClass: "header-input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.t('__label', _vm.widget.id)
    },
    on: {
      "input": _vm.onTextChange
    }
  })]);
};

var __vue_staticRenderFns__$18 = [];
/* style */

const __vue_inject_styles__$18 = function (inject) {
  if (!inject) return;
  inject("data-v-724eb4fb_0", {
    source: ".header-input[data-v-724eb4fb]{font-size:inherit;font-family:inherit;font-weight:inherit;outline:0;border:none;width:100%;background-color:transparent}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$18 = "data-v-724eb4fb";
/* module identifier */

const __vue_module_identifier__$18 = undefined;
/* functional template */

const __vue_is_functional_template__$18 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$18,
  staticRenderFns: __vue_staticRenderFns__$18
}, __vue_inject_styles__$18, __vue_script__$18, __vue_scope_id__$18, __vue_is_functional_template__$18, __vue_module_identifier__$18, false, createInjector, undefined, undefined);

var Builder$7 = __vue_component__$1a;

var script$17 = defineComponent({
  props: {
    widget: Object,
    widgets: Object,
    widgetItems: Object,
    pageState: Object,
    setWidgetState: Function
  },
  inject: ['updateWidget'],
  methods: {
    setTagType(type) {
      this.widget.properties.tagType = type;
      this.updateWidget(this.widget);
    }

  }
});

/* script */
const __vue_script__$17 = script$17;
/* template */

var __vue_render__$17 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "control-wrapper"
  }, [_c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'h1'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('h1');
      }
    }
  }, [_vm._v("H1")]), _vm._v(" "), _c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'h2'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('h2');
      }
    }
  }, [_vm._v("H2")]), _vm._v(" "), _c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'h3'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('h3');
      }
    }
  }, [_vm._v("H3")]), _vm._v(" "), _c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'h4'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('h4');
      }
    }
  }, [_vm._v("H4")]), _vm._v(" "), _c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'h5'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('h5');
      }
    }
  }, [_vm._v("H5")]), _vm._v(" "), _c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'h6'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('h6');
      }
    }
  }, [_vm._v("H6")])]);
};

var __vue_staticRenderFns__$17 = [];
/* style */

const __vue_inject_styles__$17 = function (inject) {
  if (!inject) return;
  inject("data-v-04ea9b20_0", {
    source: ".control-wrapper[data-v-04ea9b20]{display:flex;flex-direction:row;border-radius:8px;border:1px solid #e8e8e8;background-color:#fff;overflow:hidden}.tag-selection[data-v-04ea9b20]{height:30px;width:40px;display:flex;align-items:center;justify-content:center;cursor:pointer}.tag-selection[data-v-04ea9b20]:hover{background-color:#e8e8e8}.tag-selection.selected[data-v-04ea9b20]{background-color:#03a9f4;color:#fff}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$17 = "data-v-04ea9b20";
/* module identifier */

const __vue_module_identifier__$17 = undefined;
/* functional template */

const __vue_is_functional_template__$17 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$19 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$17,
  staticRenderFns: __vue_staticRenderFns__$17
}, __vue_inject_styles__$17, __vue_script__$17, __vue_scope_id__$17, __vue_is_functional_template__$17, __vue_module_identifier__$17, false, createInjector, undefined, undefined);

var BuilderControl$1 = __vue_component__$19;

//
var script$16 = defineComponent({});

/* script */
const __vue_script__$16 = script$16;
/* template */

var __vue_render__$16 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.widget.properties.tagType, {
    tag: "component",
    staticClass: "header"
  }, [_vm._v("\n    " + _vm._s(_vm.t('__label', _vm.widget.id)) + "\n  ")]);
};

var __vue_staticRenderFns__$16 = [];
/* style */

const __vue_inject_styles__$16 = undefined;
/* scoped */

const __vue_scope_id__$16 = "data-v-5a79aac4";
/* module identifier */

const __vue_module_identifier__$16 = undefined;
/* functional template */

const __vue_is_functional_template__$16 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$18 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$16,
  staticRenderFns: __vue_staticRenderFns__$16
}, __vue_inject_styles__$16, __vue_script__$16, __vue_scope_id__$16, __vue_is_functional_template__$16, __vue_module_identifier__$16, false, undefined, undefined, undefined);

var Display$d = __vue_component__$18;

//
var script$15 = defineComponent({});

/* script */
const __vue_script__$15 = script$15;
/* template */

var __vue_render__$15 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.widget.properties.tagType, {
    tag: "component",
    staticClass: "header"
  }, [_vm._v("\n    " + _vm._s(_vm.t('__label')) + "\n  ")]);
};

var __vue_staticRenderFns__$15 = [];
/* style */

const __vue_inject_styles__$15 = function (inject) {
  if (!inject) return;
  inject("data-v-a2123f0c_0", {
    source: ".header[data-v-a2123f0c]{padding:0 10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$15 = "data-v-a2123f0c";
/* module identifier */

const __vue_module_identifier__$15 = undefined;
/* functional template */

const __vue_is_functional_template__$15 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$17 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$15,
  staticRenderFns: __vue_staticRenderFns__$15
}, __vue_inject_styles__$15, __vue_script__$15, __vue_scope_id__$15, __vue_is_functional_template__$15, __vue_module_identifier__$15, false, createInjector, undefined, undefined);

var ReadOnly$d = __vue_component__$17;

var header = {
  create(props) {
    return {
      id: v4(),
      type: 'header',
      properties: {
        tagType: 'h1',
        ...props
      }
    };
  },

  display: Display$d,
  builder: Builder$7,
  builderControl: BuilderControl$1,
  readOnly: ReadOnly$d
};

const WidgetControlProps$f = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$14 = defineComponent({
  props: WidgetControlProps$f
});

/* script */
const __vue_script__$14 = script$14;
/* template */

var __vue_render__$14 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "html-wrapper",
    domProps: {
      "innerHTML": _vm._s(_vm.t('__html', _vm.widget.id))
    }
  });
};

var __vue_staticRenderFns__$14 = [];
/* style */

const __vue_inject_styles__$14 = undefined;
/* scoped */

const __vue_scope_id__$14 = "data-v-34dadf78";
/* module identifier */

const __vue_module_identifier__$14 = undefined;
/* functional template */

const __vue_is_functional_template__$14 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$16 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$14,
  staticRenderFns: __vue_staticRenderFns__$14
}, __vue_inject_styles__$14, __vue_script__$14, __vue_scope_id__$14, __vue_is_functional_template__$14, __vue_module_identifier__$14, false, undefined, undefined, undefined);

var Builder$6 = __vue_component__$16;

let WidgetControlProps$e = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$13 = defineComponent({
  props: { ...WidgetControlProps$e
  }
});

/* script */
const __vue_script__$13 = script$13;
/* template */

var __vue_render__$13 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "html-wrapper",
    domProps: {
      "innerHTML": _vm._s(_vm.t('__html'))
    }
  });
};

var __vue_staticRenderFns__$13 = [];
/* style */

const __vue_inject_styles__$13 = undefined;
/* scoped */

const __vue_scope_id__$13 = "data-v-29b29f8c";
/* module identifier */

const __vue_module_identifier__$13 = undefined;
/* functional template */

const __vue_is_functional_template__$13 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$15 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$13,
  staticRenderFns: __vue_staticRenderFns__$13
}, __vue_inject_styles__$13, __vue_script__$13, __vue_scope_id__$13, __vue_is_functional_template__$13, __vue_module_identifier__$13, false, undefined, undefined, undefined);

var Display$c = __vue_component__$15;

let WidgetControlProps$d = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$12 = defineComponent({
  props: WidgetControlProps$d
});

/* script */
const __vue_script__$12 = script$12;
/* template */

var __vue_render__$12 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.widget.properties.html)
    }
  });
};

var __vue_staticRenderFns__$12 = [];
/* style */

const __vue_inject_styles__$12 = undefined;
/* scoped */

const __vue_scope_id__$12 = undefined;
/* module identifier */

const __vue_module_identifier__$12 = undefined;
/* functional template */

const __vue_is_functional_template__$12 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$14 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$12,
  staticRenderFns: __vue_staticRenderFns__$12
}, __vue_inject_styles__$12, __vue_script__$12, __vue_scope_id__$12, __vue_is_functional_template__$12, __vue_module_identifier__$12, false, undefined, undefined, undefined);

var ReadOnly$c = __vue_component__$14;

var html = {
  create(props) {
    return {
      id: v4(),
      type: 'html',
      properties: {
        from: 'default',
        ...props
      }
    };
  },

  display: Display$c,
  builder: Builder$6,
  readOnly: ReadOnly$c
};

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject$1(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject$1(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject$1(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

var c=Object.prototype,l=c.toString,s=c.hasOwnProperty,v=/^\s*function (\w+)/;function p(e){var t,n=null!==(t=null==e?void 0:e.type)&&void 0!==t?t:e;if(n){var r=n.toString().match(v);return r?r[1]:""}return ""}var y=isPlainObject,d=function(e){return e},h=d;var g=function(e,t){return s.call(e,t)},m=Array.isArray||function(e){return "[object Array]"===l.call(e)},j=function(e){return "[object Function]"===l.call(e)},_=function(e){return y(e)&&g(e,"_vueTypes_name")},T=function(e){return y(e)&&(g(e,"type")||["_vueTypes_name","validator","default","required"].some(function(t){return g(e,t)}))};function w(e,t){return Object.defineProperty(e.bind(t),"__original",{value:e})}function k(e,t,n){var r;void 0===n&&(n=!1);var i=!0,o="";r=y(e)?e:{type:e};var u=_(r)?r._vueTypes_name+" - ":"";if(T(r)&&null!==r.type){if(void 0===r.type||!0===r.type)return i;if(!r.required&&void 0===t)return i;m(r.type)?(i=r.type.some(function(e){return !0===k(e,t,!0)}),o=r.type.map(function(e){return p(e)}).join(" or ")):i="Array"===(o=p(r))?m(t):"Object"===o?y(t):"String"===o||"Number"===o||"Boolean"===o||"Function"===o?function(e){if(null==e)return "";var t=e.constructor.toString().match(v);return t?t[1]:""}(t)===o:t instanceof r.type;}if(!i){var a=u+'value "'+t+'" should be of type "'+o+'"';return !1===n?(h(a),!1):a}if(g(r,"validator")&&j(r.validator)){var f=h,c=[];if(h=function(e){c.push(e);},i=r.validator(t),h=f,!i){var l=(c.length>1?"* ":"")+c.join("\n* ");return c.length=0,!1===n?(h(l),i):l}}return i}function P(e,t){var n=Object.defineProperties(t,{_vueTypes_name:{value:e,writable:!0},isRequired:{get:function(){return this.required=!0,this}},def:{value:function(e){return void 0===e?(g(this,"default")&&delete this.default,this):j(e)||!0===k(this,e,!0)?(this.default=m(e)?function(){return [].concat(e)}:y(e)?function(){return Object.assign({},e)}:e,this):(h(this._vueTypes_name+' - invalid default value: "'+e+'"'),this)}}}),r=n.validator;return j(r)&&(n.validator=w(r,n)),n}function N(e){return e.replace(/^(?!\s*$)/gm,"  ")}function R(e){return P("arrayOf",{type:Array,validator:function(t){var n="",r=t.every(function(t){return !0===(n=k(e,t,!0))});return r||h("arrayOf - value validation error:\n"+N(n)),r}})}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

/**
 * based on string passed, get the integer hash value
 * through bitwise operation (based on spinoff of dbj2
 * with enhancements for reduced collisions)
 *
 * @param string the string to get the hash value for
 * @returns the hash value
 */
function getUniqueIntegerFromString(string) {
  var index = string.length;
  var hashA = 5381;
  var hashB = 52711;
  var charCode;

  while (index--) {
    charCode = string.charCodeAt(index);
    hashA = hashA * 33 ^ charCode;
    hashB = hashB * 33 ^ charCode;
  }

  return (hashA >>> 0) * 4096 + (hashB >>> 0);
}

var getClassTypes = function getClassTypes(classes, reversed) {
  return classes.reduce(function (map, className) {
    var toStringClassName = "[object " + className + "]";

    if (reversed) {
      map[toStringClassName] = className;
    } else {
      map[className] = toStringClassName;
    }

    return map;
  }, {});
};

var getFlags = function getFlags(flags) {
  return flags.reduce(function (flag, item) {
    flag[item] = true;
    return flag;
  }, {});
};

var OBJECT_CLASSES = [// self tags
'Array', 'Arguments', 'Object', // toString tags
'RegExp', 'Symbol', // iterable tags
'Map', 'Set', 'Date', 'Error', 'Event', // bailout tags
'Generator', 'Promise', 'WeakMap', 'WeakSet', 'DocumentFragment', // typed array tags
'Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'ArrayBuffer', 'DataView', 'DocumentFragment', 'Window', // primitive classes, e.g. new String()
'String', 'Number', 'Boolean', 'Function', 'Undefined', 'GeneratorFunction', 'BigInt', 'Null'];
var OBJECT_CLASS_TYPE = getClassTypes(OBJECT_CLASSES, false);
var OBJECT_CLASS = getClassTypes(OBJECT_CLASSES, true);
var BAILOUT_TAGS = getFlags([OBJECT_CLASS_TYPE.Generator, OBJECT_CLASS_TYPE.Promise, OBJECT_CLASS_TYPE.WeakMap, OBJECT_CLASS_TYPE.WeakSet]);
var ITERABLE_TAGS = getFlags([OBJECT_CLASS_TYPE.Map, OBJECT_CLASS_TYPE.Set]);
var NORMALIZED_TAGS = getFlags([OBJECT_CLASS_TYPE.Date, OBJECT_CLASS_TYPE.RegExp]);
var PRIMITIVE_TAGS = getFlags(['bigint', 'boolean', 'function', 'number', 'string', 'undefined']);
var SELF_TAGS = getFlags([OBJECT_CLASS_TYPE.Arguments, OBJECT_CLASS_TYPE.Array]);
var TO_STRING_TAGS = getFlags([OBJECT_CLASS_TYPE.RegExp, OBJECT_CLASS_TYPE.Symbol]);
var TYPED_ARRAY_TAGS = getFlags([OBJECT_CLASS_TYPE.Float32Array, OBJECT_CLASS_TYPE.Float64Array, OBJECT_CLASS_TYPE.Int8Array, OBJECT_CLASS_TYPE.Int16Array, OBJECT_CLASS_TYPE.Int32Array, OBJECT_CLASS_TYPE.Uint8Array, OBJECT_CLASS_TYPE.Uint8ClampedArray, OBJECT_CLASS_TYPE.Uint16Array, OBJECT_CLASS_TYPE.Uint32Array]);

var HAS_BUFFER_FROM_SUPPORT = typeof Buffer !== 'undefined' && typeof Buffer.from === 'function';
var HAS_UINT16ARRAY_SUPPORT = typeof Uint16Array === 'function';
/**
 * get the string value of the buffer passed based on a Buffer
 *
 * @param buffer the array buffer to convert
 * @returns the stringified buffer
 */

function getStringifiedArrayBufferFallback(buffer) {
  return String.fromCharCode.apply(null, new Uint16Array(buffer));
}
/**
 * get the string value of the buffer passed based on a Uint16Array
 *
 * @param buffer the array buffer to convert
 * @returns the stringified buffer
 */

function getStringifiedArrayBufferModern(buffer) {
  return Buffer.from(buffer).toString('utf8');
}
/**
 * return a placeholder when no arraybuffer support exists
 *
 * @returns the placeholder
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

function getStringifiedArrayBufferNoSupport(buffer) {
  return '';
}
/**
 * @function getStringifiedArrayBuffer
 *
 * @description
 * get the string value of the buffer passed
 *
 * @param {ArrayBuffer} buffer the array buffer to convert
 * @returns {string} the stringified buffer
 */

var getStringifiedArrayBuffer = function () {
  if (HAS_BUFFER_FROM_SUPPORT) {
    return getStringifiedArrayBufferModern;
  }

  if (HAS_UINT16ARRAY_SUPPORT) {
    return getStringifiedArrayBufferFallback;
  }

  return getStringifiedArrayBufferNoSupport;
}();

var XML_ELEMENT_REGEXP = /\[object ([HTML|SVG](.*)Element)\]/;
var toString = Object.prototype.toString;
var keys = Object.keys;
/**
 * get the event object sorted by its properties
 *
 * @param event the event to sort
 * @returns the event object with all properties sorted
 */

function getSortedEvent(event) {
  return {
    bubbles: event.bubbles,
    cancelBubble: event.cancelBubble,
    cancelable: event.cancelable,
    composed: event.composed,
    currentTarget: event.currentTarget,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    returnValue: event.returnValue,
    target: event.target,
    type: event.type
  };
}
/**
 * get the sort result based on the two values to compare
 *
 * @param first the first value to compare
 * @param second the second value to compare
 * @returns should the value be sorted
 */


function shouldSort(first, second) {
  return first > second;
}
/**
 * get the sort result based on the two pairs to compare
 *
 * @param firstPair the first pair to compare
 * @param secondPair the second pair to compare
 * @returns should the value be sorted
 */


function shouldSortPair(firstPair, secondPair) {
  return firstPair[0] > secondPair[0];
}
/**
 * sort the array based on the fn passed
 *
 * @param array the array to sort
 * @param fn the sorting function
 * @returns the sorted array
 */


function sort(array, fn) {
  var subIndex;
  var value;

  for (var index = 0; index < array.length; ++index) {
    value = array[index];

    for (subIndex = index - 1; ~subIndex && fn(array[subIndex], value); --subIndex) {
      array[subIndex + 1] = array[subIndex];
    }

    array[subIndex + 1] = value;
  }

  return array;
}
/**
 * get the pairs in the map for stringification
 *
 * @param map the map to get the pairs for
 * @returns the sorted, stringified map
 */


function getSortedMap(map, cache, keys) {
  var entries = [];
  map.forEach(function (value, key) {
    entries.push([stringify(key, cache, keys), stringify(value, cache, keys)]);
  });
  sort(entries, shouldSortPair);

  for (var index = 0, entry; index < entries.length; ++index) {
    entry = entries[index];
    entries[index] = "[" + entry[0] + "," + entry[1] + "]";
  }

  return "Map|[" + entries.join(',') + "]";
}
/**
 * get the values in the set for stringification
 *
 * @param set the set to get the values for
 * @returns the sorted, stringified set
 */


function getSortedSet(set, cache, keys) {
  var entries = [];
  set.forEach(function (value) {
    entries.push(stringify(value, cache, keys));
  });
  sort(entries, shouldSort);
  return "Set|[" + entries.join(',') + "]";
}
/**
 * get the object with the keys sorted
 *
 * @param object the object to sort
 * @returns the sorted object
 */


function getSortedObject(object) {
  var objectKeys = sort(keys(object), shouldSort);
  var newObject = {};
  var key;

  for (var index = 0; index < objectKeys.length; ++index) {
    key = objectKeys[index];
    newObject[key] = object[key];
  }

  return newObject;
}
/**
 * build a string based on all the fragment's children
 *
 * @param fragment the fragment to stringify
 * @returns the stringified fragment
 */


function getStringifiedDocumentFragment(fragment) {
  var children = fragment.children;
  var innerHTML = [];

  for (var index = 0; index < children.length; ++index) {
    innerHTML.push(children[index].outerHTML);
  }

  return innerHTML.join(',');
}
/**
 * get the index after that of the value match in the array (faster than
 * native indexOf) to determine the cutoff index for the `splice()` call.
 *
 * @param array the array to get the index of the value at
 * @param value the value to match
 * @returns the index after the value match in the array
 */


function getCutoffIndex(array, value) {
  for (var index = 0; index < array.length; ++index) {
    if (array[index] === value) {
      return index + 1;
    }
  }

  return 0;
}
/**
 * get the value normalized for stringification
 *
 * @param value the value to normalize
 * @param sortedCache the cache of sorted objects
 * @param passedTag the previously-calculated tag
 * @returns the normalized value
 */


function getNormalizedValue(value, cache, keys, passedTag) {
  if (!passedTag) {
    var type = typeof value;

    if (PRIMITIVE_TAGS[type]) {
      return type + "|" + value;
    }

    if (value === null) {
      return value + "|" + value;
    }
  }

  var tag = passedTag || toString.call(value);

  if (SELF_TAGS[tag]) {
    return value;
  }

  if (tag === OBJECT_CLASS_TYPE.Object) {
    return getSortedObject(value);
  }

  if (TO_STRING_TAGS[tag]) {
    return OBJECT_CLASS[tag] + "|" + value.toString();
  }

  if (ITERABLE_TAGS[tag]) {
    return value instanceof Map ? getSortedMap(value, cache, keys) : getSortedSet(value, cache, keys);
  }

  if (tag === OBJECT_CLASS_TYPE.Date) {
    return OBJECT_CLASS[tag] + "|" + value.getTime();
  }

  if (tag === OBJECT_CLASS_TYPE.Error) {
    return OBJECT_CLASS[tag] + "|" + value.stack;
  }

  if (tag === OBJECT_CLASS_TYPE.Event) {
    return getSortedEvent(value);
  }

  if (BAILOUT_TAGS[tag]) {
    return OBJECT_CLASS[tag] + "|NOT_ENUMERABLE";
  }

  if (XML_ELEMENT_REGEXP.test(tag)) {
    return tag.slice(8, -1) + "|" + value.outerHTML;
  }

  if (tag === OBJECT_CLASS_TYPE.DocumentFragment) {
    return OBJECT_CLASS[tag] + "|" + getStringifiedDocumentFragment(value);
  }

  if (TYPED_ARRAY_TAGS[tag]) {
    return OBJECT_CLASS[tag] + "|" + value.join(',');
  }

  if (tag === OBJECT_CLASS_TYPE.ArrayBuffer) {
    return OBJECT_CLASS[tag] + "|" + getStringifiedArrayBuffer(value);
  }

  if (tag === OBJECT_CLASS_TYPE.DataView) {
    return OBJECT_CLASS[tag] + "|" + getStringifiedArrayBuffer(value.buffer);
  }

  return value;
}
/**
 * create the replacer function used for stringification
 *
 * @param sortedCache the cache to use for sorting objects
 * @returns function getting the normalized value
 */


function createReplacer(cache, keys) {
  if (cache === void 0) {
    cache = [];
  }

  if (keys === void 0) {
    keys = [];
  }

  return function (key, value) {
    if (typeof value === 'object') {
      if (cache.length) {
        var thisCutoff = getCutoffIndex(cache, this);

        if (thisCutoff === 0) {
          cache.push(this);
        } else {
          cache.splice(thisCutoff);
          keys.splice(thisCutoff);
        }

        keys.push(key);
        var valueCutoff = getCutoffIndex(cache, value);

        if (valueCutoff !== 0) {
          return "[~" + (keys.slice(0, valueCutoff).join('.') || '.') + "]";
        }

        cache.push(value);
      } else {
        cache[0] = value;
        keys[0] = key;
      }
    }

    if (key && this[key] instanceof Date) {
      return getNormalizedValue(this[key], cache, keys, OBJECT_CLASS_TYPE.Date);
    }

    return getNormalizedValue(value, cache, keys);
  };
}
/**
 * stringify the value based on the options passed
 *
 * @param value the value to stringify
 * @returns the stringified value
 */


function stringify(value, cache, keys) {
  if (!value || typeof value !== 'object') {
    return getNormalizedValue(value, cache, keys);
  }

  var tag = toString.call(value);

  if (NORMALIZED_TAGS[tag]) {
    return getNormalizedValue(value, cache, keys, tag);
  }

  return JSON.stringify(value, createReplacer(cache, keys));
}

/**
 * hash the value passed to a unique, consistent hash value
 *
 * @param value the value to hash
 * @returns the object hash
 */

function hash(value) {
  return getUniqueIntegerFromString(stringify(value));
}

function is(value, otherValue) {
  return hash(value) === hash(otherValue);
}

function isAll(value) {
  for (var index = 0; index < (arguments.length <= 1 ? 0 : arguments.length - 1); ++index) {
    if (!is(value, index + 1 < 1 || arguments.length <= index + 1 ? undefined : arguments[index + 1])) {
      return false;
    }
  }

  return true;
}

function isAny(value) {
  for (var index = 0; index < (arguments.length <= 1 ? 0 : arguments.length - 1); ++index) {
    if (is(value, index + 1 < 1 || arguments.length <= index + 1 ? undefined : arguments[index + 1])) {
      return true;
    }
  }

  return false;
}

function isNot(value, otherValue) {
  return hash(value) !== hash(otherValue);
}

is.all = isAll;
is.any = isAny;
is.not = isNot;
hash.is = is;

var fact = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _hashIt2 = _interopRequireDefault(hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fact = function () {
  /**
   * Returns a new fact instance
   * @param  {string} id - fact unique identifer
   * @param  {object} options
   * @param  {boolean} options.cache - whether to cache the fact's value for future rules
   * @param  {primitive|function} valueOrMethod - constant primitive, or method to call when computing the fact's value
   * @return {Fact}
   */
  function Fact(id, valueOrMethod, options) {
    _classCallCheck(this, Fact);

    this.id = id;
    var defaultOptions = { cache: true };
    if (typeof options === 'undefined') {
      options = defaultOptions;
    }
    if (typeof valueOrMethod !== 'function') {
      this.value = valueOrMethod;
      this.type = this.constructor.CONSTANT;
    } else {
      this.calculationMethod = valueOrMethod;
      this.type = this.constructor.DYNAMIC;
    }

    if (!this.id) throw new Error('factId required');

    this.priority = parseInt(options.priority || 1, 10);
    this.options = Object.assign({}, defaultOptions, options);
    this.cacheKeyMethod = this.defaultCacheKeys;
    return this;
  }

  _createClass(Fact, [{
    key: 'isConstant',
    value: function isConstant() {
      return this.type === this.constructor.CONSTANT;
    }
  }, {
    key: 'isDynamic',
    value: function isDynamic() {
      return this.type === this.constructor.DYNAMIC;
    }

    /**
     * Return the fact value, based on provided parameters
     * @param  {object} params
     * @param  {Almanac} almanac
     * @return {any} calculation method results
     */

  }, {
    key: 'calculate',
    value: function calculate(params, almanac) {
      // if constant fact w/set value, return immediately
      if (Object.prototype.hasOwnProperty.call(this, 'value')) {
        return this.value;
      }
      return this.calculationMethod(params, almanac);
    }

    /**
     * Return a cache key (MD5 string) based on parameters
     * @param  {object} obj - properties to generate a hash key from
     * @return {string} MD5 string based on the hash'd object
     */

  }, {
    key: 'defaultCacheKeys',


    /**
     * Default properties to use when caching a fact
     * Assumes every fact is a pure function, whose computed value will only
     * change when input params are modified
     * @param  {string} id - fact unique identifer
     * @param  {object} params - parameters passed to fact calcution method
     * @return {object} id + params
     */
    value: function defaultCacheKeys(id, params) {
      return { params: params, id: id };
    }

    /**
     * Generates the fact's cache key(MD5 string)
     * Returns nothing if the fact's caching has been disabled
     * @param  {object} params - parameters that would be passed to the computation method
     * @return {string} cache key
     */

  }, {
    key: 'getCacheKey',
    value: function getCacheKey(params) {
      if (this.options.cache === true) {
        var cacheProperties = this.cacheKeyMethod(this.id, params);
        var _hash = Fact.hashFromObject(cacheProperties);
        return _hash;
      }
    }
  }], [{
    key: 'hashFromObject',
    value: function hashFromObject(obj) {
      return (0, _hashIt2.default)(obj);
    }
  }]);

  return Fact;
}();

Fact.CONSTANT = 'CONSTANT';
Fact.DYNAMIC = 'DYNAMIC';

exports.default = Fact;
});

var debug_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debug;
function debug(message) {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.DEBUG && process.env.DEBUG.match(/json-rules-engine/) || typeof window !== 'undefined' && window.localStorage && window.localStorage.debug && window.localStorage.debug.match(/json-rules-engine/)) {
      console.log(message);
    }
  } catch (ex) {
    // Do nothing
  }
}
});

/**
 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

var lodash_isobjectlike = isObjectLike;

var condition = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _debug2 = _interopRequireDefault(debug_1);



var _lodash2 = _interopRequireDefault(lodash_isobjectlike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Condition = function () {
  function Condition(properties) {
    _classCallCheck(this, Condition);

    if (!properties) throw new Error('Condition: constructor options required');
    var booleanOperator = Condition.booleanOperator(properties);
    Object.assign(this, properties);
    if (booleanOperator) {
      var subConditions = properties[booleanOperator];
      if (!Array.isArray(subConditions)) {
        throw new Error('"' + booleanOperator + '" must be an array');
      }
      this.operator = booleanOperator;
      // boolean conditions always have a priority; default 1
      this.priority = parseInt(properties.priority, 10) || 1;
      this[booleanOperator] = subConditions.map(function (c) {
        return new Condition(c);
      });
    } else {
      if (!Object.prototype.hasOwnProperty.call(properties, 'fact')) throw new Error('Condition: constructor "fact" property required');
      if (!Object.prototype.hasOwnProperty.call(properties, 'operator')) throw new Error('Condition: constructor "operator" property required');
      if (!Object.prototype.hasOwnProperty.call(properties, 'value')) throw new Error('Condition: constructor "value" property required');

      // a non-boolean condition does not have a priority by default. this allows
      // priority to be dictated by the fact definition
      if (Object.prototype.hasOwnProperty.call(properties, 'priority')) {
        properties.priority = parseInt(properties.priority, 10);
      }
    }
  }

  /**
   * Converts the condition into a json-friendly structure
   * @param   {Boolean} stringify - whether to return as a json string
   * @returns {string,object} json string or json-friendly object
   */


  _createClass(Condition, [{
    key: 'toJSON',
    value: function toJSON() {
      var stringify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var props = {};
      if (this.priority) {
        props.priority = this.priority;
      }
      var oper = Condition.booleanOperator(this);
      if (oper) {
        props[oper] = this[oper].map(function (c) {
          return c.toJSON(stringify);
        });
      } else {
        props.operator = this.operator;
        props.value = this.value;
        props.fact = this.fact;
        if (this.factResult !== undefined) {
          props.factResult = this.factResult;
        }
        if (this.result !== undefined) {
          props.result = this.result;
        }
        if (this.params) {
          props.params = this.params;
        }
        if (this.path) {
          props.path = this.path;
        }
      }
      if (stringify) {
        return JSON.stringify(props);
      }
      return props;
    }

    /**
     * Interprets .value as either a primitive, or if a fact, retrieves the fact value
     */

  }, {
    key: '_getValue',
    value: function _getValue(almanac) {
      var value = this.value;
      if ((0, _lodash2.default)(value) && Object.prototype.hasOwnProperty.call(value, 'fact')) {
        // value: { fact: 'xyz' }
        return almanac.factValue(value.fact, value.params, value.path);
      }
      return Promise.resolve(value);
    }

    /**
     * Takes the fact result and compares it to the condition 'value', using the operator
     *   LHS                      OPER       RHS
     * <fact + params + path>  <operator>  <value>
     *
     * @param   {Almanac} almanac
     * @param   {Map} operatorMap - map of available operators, keyed by operator name
     * @returns {Boolean} - evaluation result
     */

  }, {
    key: 'evaluate',
    value: function evaluate(almanac, operatorMap) {
      var _this = this;

      if (!almanac) return Promise.reject(new Error('almanac required'));
      if (!operatorMap) return Promise.reject(new Error('operatorMap required'));
      if (this.isBooleanOperator()) return Promise.reject(new Error('Cannot evaluate() a boolean condition'));

      var op = operatorMap.get(this.operator);
      if (!op) return Promise.reject(new Error('Unknown operator: ' + this.operator));

      return this._getValue(almanac) // todo - parallelize
      .then(function (rightHandSideValue) {
        return almanac.factValue(_this.fact, _this.params, _this.path).then(function (leftHandSideValue) {
          var result = op.evaluate(leftHandSideValue, rightHandSideValue);
          (0, _debug2.default)('condition::evaluate <' + JSON.stringify(leftHandSideValue) + ' ' + _this.operator + ' ' + JSON.stringify(rightHandSideValue) + '?> (' + result + ')');
          return { result: result, leftHandSideValue: leftHandSideValue, rightHandSideValue: rightHandSideValue, operator: _this.operator };
        });
      });
    }

    /**
     * Returns the boolean operator for the condition
     * If the condition is not a boolean condition, the result will be 'undefined'
     * @return {string 'all' or 'any'}
     */

  }, {
    key: 'booleanOperator',


    /**
     * Returns the condition's boolean operator
     * Instance version of Condition.isBooleanOperator
     * @returns {string,undefined} - 'any', 'all', or undefined (if not a boolean condition)
     */
    value: function booleanOperator() {
      return Condition.booleanOperator(this);
    }

    /**
     * Whether the operator is boolean ('all', 'any')
     * @returns {Boolean}
     */

  }, {
    key: 'isBooleanOperator',
    value: function isBooleanOperator() {
      return Condition.booleanOperator(this) !== undefined;
    }
  }], [{
    key: 'booleanOperator',
    value: function booleanOperator(condition) {
      if (Object.prototype.hasOwnProperty.call(condition, 'any')) {
        return 'any';
      } else if (Object.prototype.hasOwnProperty.call(condition, 'all')) {
        return 'all';
      }
    }
  }]);

  return Condition;
}();

exports.default = Condition;
});

var clone_1 = createCommonjsModule(function (module) {
var clone = (function() {

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      if (Buffer.allocUnsafe) {
        // Node.js >= 4.5.0
        child = Buffer.allocUnsafe(parent.length);
      } else {
        // Older Node.js versions
        child = new Buffer(parent.length);
      }
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (module.exports) {
  module.exports = clone;
}
});

var ruleResult = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _clone2 = _interopRequireDefault(clone_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RuleResult = function () {
  function RuleResult(conditions, event, priority, name) {
    _classCallCheck(this, RuleResult);

    this.conditions = (0, _clone2.default)(conditions);
    this.event = (0, _clone2.default)(event);
    this.priority = (0, _clone2.default)(priority);
    this.name = (0, _clone2.default)(name);
    this.result = null;
  }

  _createClass(RuleResult, [{
    key: 'setResult',
    value: function setResult(result) {
      this.result = result;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var stringify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var props = {
        conditions: this.conditions.toJSON(false),
        event: this.event,
        priority: this.priority,
        name: this.name,
        result: this.result
      };
      if (stringify) {
        return JSON.stringify(props);
      }
      return props;
    }
  }]);

  return RuleResult;
}();

exports.default = RuleResult;
});

var eventemitter2 = createCommonjsModule(function (module, exports) {
!function(undefined$1) {
  var hasOwnProperty= Object.hasOwnProperty;
  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;
  var nextTickSupported= typeof process=='object' && typeof process.nextTick=='function';
  var symbolsSupported= typeof Symbol==='function';
  var reflectSupported= typeof Reflect === 'object';
  var setImmediateSupported= typeof setImmediate === 'function';
  var _setImmediate= setImmediateSupported ? setImmediate : setTimeout;
  var ownKeys= symbolsSupported? (reflectSupported && typeof Reflect.ownKeys==='function'? Reflect.ownKeys : function(obj){
    var arr= Object.getOwnPropertyNames(obj);
    arr.push.apply(arr, Object.getOwnPropertySymbols(obj));
    return arr;
  }) : Object.keys;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);

      if(conf.maxListeners!==undefined$1){
          this._maxListeners= conf.maxListeners;
      }

      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this._newListener = conf.newListener);
      conf.removeListener && (this._removeListener = conf.removeListener);
      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);
      conf.ignoreErrors && (this.ignoreErrors = conf.ignoreErrors);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function logPossibleMemoryLeak(count, eventName) {
    var errorMsg = '(node) warning: possible EventEmitter memory ' +
        'leak detected. ' + count + ' listeners added. ' +
        'Use emitter.setMaxListeners() to increase limit.';

    if(this.verboseMemoryLeak){
      errorMsg += ' Event name: ' + eventName + '.';
    }

    if(typeof process !== 'undefined' && process.emitWarning){
      var e = new Error(errorMsg);
      e.name = 'MaxListenersExceededWarning';
      e.emitter = this;
      e.count = count;
      process.emitWarning(e);
    } else {
      console.error(errorMsg);

      if (console.trace){
        console.trace();
      }
    }
  }

  var toArray = function (a, b, c) {
    var n = arguments.length;
    switch (n) {
      case 0:
        return [];
      case 1:
        return [a];
      case 2:
        return [a, b];
      case 3:
        return [a, b, c];
      default:
        var arr = new Array(n);
        while (n--) {
          arr[n] = arguments[n];
        }
        return arr;
    }
  };

  function toObject(keys, values) {
    var obj = {};
    var key;
    var len = keys.length;
    var valuesCount = values ? value.length : 0;
    for (var i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = i < valuesCount ? values[i] : undefined$1;
    }
    return obj;
  }

  function TargetObserver(emitter, target, options) {
    this._emitter = emitter;
    this._target = target;
    this._listeners = {};
    this._listenersCount = 0;

    var on, off;

    if (options.on || options.off) {
      on = options.on;
      off = options.off;
    }

    if (target.addEventListener) {
      on = target.addEventListener;
      off = target.removeEventListener;
    } else if (target.addListener) {
      on = target.addListener;
      off = target.removeListener;
    } else if (target.on) {
      on = target.on;
      off = target.off;
    }

    if (!on && !off) {
      throw Error('target does not implement any known event API');
    }

    if (typeof on !== 'function') {
      throw TypeError('on method must be a function');
    }

    if (typeof off !== 'function') {
      throw TypeError('off method must be a function');
    }

    this._on = on;
    this._off = off;

    var _observers= emitter._observers;
    if(_observers){
      _observers.push(this);
    }else {
      emitter._observers= [this];
    }
  }

  Object.assign(TargetObserver.prototype, {
    subscribe: function(event, localEvent, reducer){
      var observer= this;
      var target= this._target;
      var emitter= this._emitter;
      var listeners= this._listeners;
      var handler= function(){
        var args= toArray.apply(null, arguments);
        var eventObj= {
          data: args,
          name: localEvent,
          original: event
        };
        if(reducer){
          var result= reducer.call(target, eventObj);
          if(result!==false){
            emitter.emit.apply(emitter, [eventObj.name].concat(args));
          }
          return;
        }
        emitter.emit.apply(emitter, [localEvent].concat(args));
      };


      if(listeners[event]){
        throw Error('Event \'' + event + '\' is already listening');
      }

      this._listenersCount++;

      if(emitter._newListener && emitter._removeListener && !observer._onNewListener){

        this._onNewListener = function (_event) {
          if (_event === localEvent && listeners[event] === null) {
            listeners[event] = handler;
            observer._on.call(target, event, handler);
          }
        };

        emitter.on('newListener', this._onNewListener);

        this._onRemoveListener= function(_event){
          if(_event === localEvent && !emitter.hasListeners(_event) && listeners[event]){
            listeners[event]= null;
            observer._off.call(target, event, handler);
          }
        };

        listeners[event]= null;

        emitter.on('removeListener', this._onRemoveListener);
      }else {
        listeners[event]= handler;
        observer._on.call(target, event, handler);
      }
    },

    unsubscribe: function(event){
      var observer= this;
      var listeners= this._listeners;
      var emitter= this._emitter;
      var handler;
      var events;
      var off= this._off;
      var target= this._target;
      var i;

      if(event && typeof event!=='string'){
        throw TypeError('event must be a string');
      }

      function clearRefs(){
        if(observer._onNewListener){
          emitter.off('newListener', observer._onNewListener);
          emitter.off('removeListener', observer._onRemoveListener);
          observer._onNewListener= null;
          observer._onRemoveListener= null;
        }
        var index= findTargetIndex.call(emitter, observer);
        emitter._observers.splice(index, 1);
      }

      if(event){
        handler= listeners[event];
        if(!handler) return;
        off.call(target, event, handler);
        delete listeners[event];
        if(!--this._listenersCount){
          clearRefs();
        }
      }else {
        events= ownKeys(listeners);
        i= events.length;
        while(i-->0){
          event= events[i];
          off.call(target, event, listeners[event]);
        }
        this._listeners= {};
        this._listenersCount= 0;
        clearRefs();
      }
    }
  });

  function resolveOptions(options, schema, reducers, allowUnknown) {
    var computedOptions = Object.assign({}, schema);

    if (!options) return computedOptions;

    if (typeof options !== 'object') {
      throw TypeError('options must be an object')
    }

    var keys = Object.keys(options);
    var length = keys.length;
    var option, value;
    var reducer;

    function reject(reason) {
      throw Error('Invalid "' + option + '" option value' + (reason ? '. Reason: ' + reason : ''))
    }

    for (var i = 0; i < length; i++) {
      option = keys[i];
      if (!allowUnknown && !hasOwnProperty.call(schema, option)) {
        throw Error('Unknown "' + option + '" option');
      }
      value = options[option];
      if (value !== undefined$1) {
        reducer = reducers[option];
        computedOptions[option] = reducer ? reducer(value, reject) : value;
      }
    }
    return computedOptions;
  }

  function constructorReducer(value, reject) {
    if (typeof value !== 'function' || !value.hasOwnProperty('prototype')) {
      reject('value must be a constructor');
    }
    return value;
  }

  function makeTypeReducer(types) {
    var message= 'value must be type of ' + types.join('|');
    var len= types.length;
    var firstType= types[0];
    var secondType= types[1];

    if (len === 1) {
      return function (v, reject) {
        if (typeof v === firstType) {
          return v;
        }
        reject(message);
      }
    }

    if (len === 2) {
      return function (v, reject) {
        var kind= typeof v;
        if (kind === firstType || kind === secondType) return v;
        reject(message);
      }
    }

    return function (v, reject) {
      var kind = typeof v;
      var i = len;
      while (i-- > 0) {
        if (kind === types[i]) return v;
      }
      reject(message);
    }
  }

  var functionReducer= makeTypeReducer(['function']);

  var objectFunctionReducer= makeTypeReducer(['object', 'function']);

  function makeCancelablePromise(Promise, executor, options) {
    var isCancelable;
    var callbacks;
    var timer= 0;
    var subscriptionClosed;

    var promise = new Promise(function (resolve, reject, onCancel) {
      options= resolveOptions(options, {
        timeout: 0,
        overload: false
      }, {
        timeout: function(value, reject){
          value*= 1;
          if (typeof value !== 'number' || value < 0 || !Number.isFinite(value)) {
            reject('timeout must be a positive number');
          }
          return value;
        }
      });

      isCancelable = !options.overload && typeof Promise.prototype.cancel === 'function' && typeof onCancel === 'function';

      function cleanup() {
        if (callbacks) {
          callbacks = null;
        }
        if (timer) {
          clearTimeout(timer);
          timer = 0;
        }
      }

      var _resolve= function(value){
        cleanup();
        resolve(value);
      };

      var _reject= function(err){
        cleanup();
        reject(err);
      };

      if (isCancelable) {
        executor(_resolve, _reject, onCancel);
      } else {
        callbacks = [function(reason){
          _reject(reason || Error('canceled'));
        }];
        executor(_resolve, _reject, function (cb) {
          if (subscriptionClosed) {
            throw Error('Unable to subscribe on cancel event asynchronously')
          }
          if (typeof cb !== 'function') {
            throw TypeError('onCancel callback must be a function');
          }
          callbacks.push(cb);
        });
        subscriptionClosed= true;
      }

      if (options.timeout > 0) {
        timer= setTimeout(function(){
          var reason= Error('timeout');
          reason.code = 'ETIMEDOUT';
          timer= 0;
          promise.cancel(reason);
          reject(reason);
        }, options.timeout);
      }
    });

    if (!isCancelable) {
      promise.cancel = function (reason) {
        if (!callbacks) {
          return;
        }
        var length = callbacks.length;
        for (var i = 1; i < length; i++) {
          callbacks[i](reason);
        }
        // internal callback to reject the promise
        callbacks[0](reason);
        callbacks = null;
      };
    }

    return promise;
  }

  function findTargetIndex(observer) {
    var observers = this._observers;
    if(!observers){
      return -1;
    }
    var len = observers.length;
    for (var i = 0; i < len; i++) {
      if (observers[i]._target === observer) return i;
    }
    return -1;
  }

  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i, typeLength) {
    if (!tree) {
      return null;
    }

    if (i === 0) {
      var kind = typeof type;
      if (kind === 'string') {
        var ns, n, l = 0, j = 0, delimiter = this.delimiter, dl = delimiter.length;
        if ((n = type.indexOf(delimiter)) !== -1) {
          ns = new Array(5);
          do {
            ns[l++] = type.slice(j, n);
            j = n + dl;
          } while ((n = type.indexOf(delimiter, j)) !== -1);

          ns[l++] = type.slice(j);
          type = ns;
          typeLength = l;
        } else {
          type = [type];
          typeLength = 1;
        }
      } else if (kind === 'object') {
        typeLength = type.length;
      } else {
        type = [type];
        typeLength = 1;
      }
    }

    var listeners= null, branch, xTree, xxTree, isolatedBranch, endReached, currentType = type[i],
        nextType = type[i + 1], branches, _listeners;

    if (i === typeLength) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //

      if(tree._listeners) {
        if (typeof tree._listeners === 'function') {
          handlers && handlers.push(tree._listeners);
          listeners = [tree];
        } else {
          handlers && handlers.push.apply(handlers, tree._listeners);
          listeners = [tree];
        }
      }
    } else {

      if (currentType === '*') {
        //
        // If the event emitted is '*' at this part
        // or there is a concrete match at this patch
        //
        branches = ownKeys(tree);
        n = branches.length;
        while (n-- > 0) {
          branch = branches[n];
          if (branch !== '_listeners') {
            _listeners = searchListenerTree(handlers, type, tree[branch], i + 1, typeLength);
            if (_listeners) {
              if (listeners) {
                listeners.push.apply(listeners, _listeners);
              } else {
                listeners = _listeners;
              }
            }
          }
        }
        return listeners;
      } else if (currentType === '**') {
        endReached = (i + 1 === typeLength || (i + 2 === typeLength && nextType === '*'));
        if (endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = searchListenerTree(handlers, type, tree, typeLength, typeLength);
        }

        branches = ownKeys(tree);
        n = branches.length;
        while (n-- > 0) {
          branch = branches[n];
          if (branch !== '_listeners') {
            if (branch === '*' || branch === '**') {
              if (tree[branch]._listeners && !endReached) {
                _listeners = searchListenerTree(handlers, type, tree[branch], typeLength, typeLength);
                if (_listeners) {
                  if (listeners) {
                    listeners.push.apply(listeners, _listeners);
                  } else {
                    listeners = _listeners;
                  }
                }
              }
              _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
            } else if (branch === nextType) {
              _listeners = searchListenerTree(handlers, type, tree[branch], i + 2, typeLength);
            } else {
              // No match on this one, shift into the tree but not in the type array.
              _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
            }
            if (_listeners) {
              if (listeners) {
                listeners.push.apply(listeners, _listeners);
              } else {
                listeners = _listeners;
              }
            }
          }
        }
        return listeners;
      } else if (tree[currentType]) {
        listeners = searchListenerTree(handlers, type, tree[currentType], i + 1, typeLength);
      }
    }

      xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i + 1, typeLength);
    }

    xxTree = tree['**'];
    if (xxTree) {
      if (i < typeLength) {
        if (xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
        }

        // Build arrays of matching next branches and others.
        branches= ownKeys(xxTree);
        n= branches.length;
        while(n-->0){
          branch= branches[n];
          if (branch !== '_listeners') {
            if (branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i + 2, typeLength);
            } else if (branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i + 1, typeLength);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, {'**': isolatedBranch}, i + 1, typeLength);
            }
          }
        }
      } else if (xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
      } else if (xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength, typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener, prepend) {
    var len = 0, j = 0, i, delimiter = this.delimiter, dl= delimiter.length, ns;

    if(typeof type==='string') {
      if ((i = type.indexOf(delimiter)) !== -1) {
        ns = new Array(5);
        do {
          ns[len++] = type.slice(j, i);
          j = i + dl;
        } while ((i = type.indexOf(delimiter, j)) !== -1);

        ns[len++] = type.slice(j);
      }else {
        ns= [type];
        len= 1;
      }
    }else {
      ns= type;
      len= type.length;
    }

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    if (len > 1) {
      for (i = 0; i + 1 < len; i++) {
        if (ns[i] === '**' && ns[i + 1] === '**') {
          return;
        }
      }
    }



    var tree = this.listenerTree, name;

    for (i = 0; i < len; i++) {
      name = ns[i];

      tree = tree[name] || (tree[name] = {});

      if (i === len - 1) {
        if (!tree._listeners) {
          tree._listeners = listener;
        } else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          if (prepend) {
            tree._listeners.unshift(listener);
          } else {
            tree._listeners.push(listener);
          }

          if (
              !tree._listeners.warned &&
              this._maxListeners > 0 &&
              tree._listeners.length > this._maxListeners
          ) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
          }
        }
        return true;
      }
    }

    return true;
  }

  function collectTreeEvents(tree, events, root, asArray){
     var branches= ownKeys(tree);
     var i= branches.length;
     var branch, branchName, path;
     var hasListeners= tree['_listeners'];
     var isArrayPath;

     while(i-->0){
         branchName= branches[i];

         branch= tree[branchName];

         if(branchName==='_listeners'){
             path= root;
         }else {
             path = root ? root.concat(branchName) : [branchName];
         }

         isArrayPath= asArray || typeof branchName==='symbol';

         hasListeners && events.push(isArrayPath? path : path.join(this.delimiter));

         if(typeof branch==='object'){
             collectTreeEvents.call(this, branch, events, path, isArrayPath);
         }
     }

     return events;
  }

  function recursivelyGarbageCollect(root) {
    var keys = ownKeys(root);
    var i= keys.length;
    var obj, key, flag;
    while(i-->0){
      key = keys[i];
      obj = root[key];

      if(obj){
          flag= true;
          if(key !== '_listeners' && !recursivelyGarbageCollect(obj)){
             delete root[key];
          }
      }
    }

    return flag;
  }

  function Listener(emitter, event, listener){
    this.emitter= emitter;
    this.event= event;
    this.listener= listener;
  }

  Listener.prototype.off= function(){
    this.emitter.off(this.event, this.listener);
    return this;
  };

  function setupListener(event, listener, options){
      if (options === true) {
        promisify = true;
      } else if (options === false) {
        async = true;
      } else {
        if (!options || typeof options !== 'object') {
          throw TypeError('options should be an object or true');
        }
        var async = options.async;
        var promisify = options.promisify;
        var nextTick = options.nextTick;
        var objectify = options.objectify;
      }

      if (async || nextTick || promisify) {
        var _listener = listener;
        var _origin = listener._origin || listener;

        if (nextTick && !nextTickSupported) {
          throw Error('process.nextTick is not supported');
        }

        if (promisify === undefined$1) {
          promisify = listener.constructor.name === 'AsyncFunction';
        }

        listener = function () {
          var args = arguments;
          var context = this;
          var event = this.event;

          return promisify ? (nextTick ? Promise.resolve() : new Promise(function (resolve) {
            _setImmediate(resolve);
          }).then(function () {
            context.event = event;
            return _listener.apply(context, args)
          })) : (nextTick ? process.nextTick : _setImmediate)(function () {
            context.event = event;
            _listener.apply(context, args);
          });
        };

        listener._async = true;
        listener._origin = _origin;
      }

    return [listener, objectify? new Listener(this, event, listener): this];
  }

  function EventEmitter(conf) {
    this._events = {};
    this._newListener = false;
    this._removeListener = false;
    this.verboseMemoryLeak = false;
    configure.call(this, conf);
  }

  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

  EventEmitter.prototype.listenTo= function(target, events, options){
    if(typeof target!=='object'){
      throw TypeError('target musts be an object');
    }

    var emitter= this;

    options = resolveOptions(options, {
      on: undefined$1,
      off: undefined$1,
      reducers: undefined$1
    }, {
      on: functionReducer,
      off: functionReducer,
      reducers: objectFunctionReducer
    });

    function listen(events){
      if(typeof events!=='object'){
        throw TypeError('events must be an object');
      }

      var reducers= options.reducers;
      var index= findTargetIndex.call(emitter, target);
      var observer;

      if(index===-1){
        observer= new TargetObserver(emitter, target, options);
      }else {
        observer= emitter._observers[index];
      }

      var keys= ownKeys(events);
      var len= keys.length;
      var event;
      var isSingleReducer= typeof reducers==='function';

      for(var i=0; i<len; i++){
        event= keys[i];
        observer.subscribe(
            event,
            events[event] || event,
            isSingleReducer ? reducers : reducers && reducers[event]
        );
      }
    }

    isArray(events)?
        listen(toObject(events)) :
        (typeof events==='string'? listen(toObject(events.split(/\s+/))): listen(events));

    return this;
  };

  EventEmitter.prototype.stopListeningTo = function (target, event) {
    var observers = this._observers;

    if(!observers){
      return false;
    }

    var i = observers.length;
    var observer;
    var matched= false;

    if(target && typeof target!=='object'){
      throw TypeError('target should be an object');
    }

    while (i-- > 0) {
      observer = observers[i];
      if (!target || observer._target === target) {
        observer.unsubscribe(event);
        matched= true;
      }
    }

    return matched;
  };

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    if (n !== undefined$1) {
      this._maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.getMaxListeners = function() {
    return this._maxListeners;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn, options) {
    return this._once(event, fn, false, options);
  };

  EventEmitter.prototype.prependOnceListener = function(event, fn, options) {
    return this._once(event, fn, true, options);
  };

  EventEmitter.prototype._once = function(event, fn, prepend, options) {
    return this._many(event, 1, fn, prepend, options);
  };

  EventEmitter.prototype.many = function(event, ttl, fn, options) {
    return this._many(event, ttl, fn, false, options);
  };

  EventEmitter.prototype.prependMany = function(event, ttl, fn, options) {
    return this._many(event, ttl, fn, true, options);
  };

  EventEmitter.prototype._many = function(event, ttl, fn, prepend, options) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      return fn.apply(this, arguments);
    }

    listener._origin = fn;

    return this._on(event, listener, prepend, options);
  };

  EventEmitter.prototype.emit = function() {
    if (!this._events && !this._all) {
      return false;
    }

    this._events || init.call(this);

    var type = arguments[0], ns, wildcard= this.wildcard;
    var args,l,i,j, containsSymbol;

    if (type === 'newListener' && !this._newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    if (wildcard) {
      ns= type;
      if(type!=='newListener' && type!=='removeListener'){
        if (typeof type === 'object') {
          l = type.length;
          if (symbolsSupported) {
            for (i = 0; i < l; i++) {
              if (typeof type[i] === 'symbol') {
                containsSymbol = true;
                break;
              }
            }
          }
          if (!containsSymbol) {
            type = type.join(this.delimiter);
          }
        }
      }
    }

    var al = arguments.length;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this, type);
          break;
        case 2:
          handler[i].call(this, type, arguments[1]);
          break;
        case 3:
          handler[i].call(this, type, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, arguments);
        }
      }
    }

    if (wildcard) {
      handler = [];
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0, l);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this);
          break;
        case 2:
          handler[i].call(this, arguments[1]);
          break;
        case 3:
          handler[i].call(this, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this.ignoreErrors && !this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function() {
    if (!this._events && !this._all) {
      return false;
    }

    this._events || init.call(this);

    var type = arguments[0], wildcard= this.wildcard, ns, containsSymbol;
    var args,l,i,j;

    if (type === 'newListener' && !this._newListener) {
        if (!this._events.newListener) { return Promise.resolve([false]); }
    }

    if (wildcard) {
      ns= type;
      if(type!=='newListener' && type!=='removeListener'){
        if (typeof type === 'object') {
          l = type.length;
          if (symbolsSupported) {
            for (i = 0; i < l; i++) {
              if (typeof type[i] === 'symbol') {
                containsSymbol = true;
                break;
              }
            }
          }
          if (!containsSymbol) {
            type = type.join(this.delimiter);
          }
        }
      }
    }

    var promises= [];

    var al = arguments.length;
    var handler;

    if (this._all) {
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(this._all[i].call(this, type));
          break;
        case 2:
          promises.push(this._all[i].call(this, type, arguments[1]));
          break;
        case 3:
          promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
          break;
        default:
          promises.push(this._all[i].apply(this, arguments));
        }
      }
    }

    if (wildcard) {
      handler = [];
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
      case 1:
        promises.push(handler.call(this));
        break;
      case 2:
        promises.push(handler.call(this, arguments[1]));
        break;
      case 3:
        promises.push(handler.call(this, arguments[1], arguments[2]));
        break;
      default:
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      handler = handler.slice();
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(handler[i].call(this));
          break;
        case 2:
          promises.push(handler[i].call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler[i].call(this, arguments[1], arguments[2]));
          break;
        default:
          promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this.ignoreErrors && !this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function(type, listener, options) {
    return this._on(type, listener, false, options);
  };

  EventEmitter.prototype.prependListener = function(type, listener, options) {
    return this._on(type, listener, true, options);
  };

  EventEmitter.prototype.onAny = function(fn) {
    return this._onAny(fn, false);
  };

  EventEmitter.prototype.prependAny = function(fn) {
    return this._onAny(fn, true);
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype._onAny = function(fn, prepend){
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    if(prepend){
      this._all.unshift(fn);
    }else {
      this._all.push(fn);
    }

    return this;
  };

  EventEmitter.prototype._on = function(type, listener, prepend, options) {
    if (typeof type === 'function') {
      this._onAny(type, listener);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    var returnValue= this, temp;

    if (options !== undefined$1) {
      temp = setupListener.call(this, type, listener, options);
      listener = temp[0];
      returnValue = temp[1];
    }

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    if (this._newListener) {
      this.emit('newListener', type, listener);
    }

    if (this.wildcard) {
      growListenerTree.call(this, type, listener, prepend);
      return returnValue;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    } else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just add
      if(prepend){
        this._events[type].unshift(listener);
      }else {
        this._events[type].push(listener);
      }

      // Check for listener leak
      if (
        !this._events[type].warned &&
        this._maxListeners > 0 &&
        this._events[type].length > this._maxListeners
      ) {
        this._events[type].warned = true;
        logPossibleMemoryLeak.call(this, this._events[type].length, type);
      }
    }

    return returnValue;
  };

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
      if(!leafs) return this;
    } else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        if (this._removeListener)
          this.emit("removeListener", type, listener);

        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
        if (this._removeListener)
          this.emit("removeListener", type, listener);
      }
    }

    this.listenerTree && recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          if (this._removeListener)
            this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      if (this._removeListener) {
        for(i = 0, l = fns.length; i < l; i++)
          this.emit("removeListenerAny", fns[i]);
      }
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function (type) {
    if (type === undefined$1) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var leafs = searchListenerTree.call(this, null, type, this.listenerTree, 0), leaf, i;
      if (!leafs) return this;
      for (i = 0; i < leafs.length; i++) {
        leaf = leafs[i];
        leaf._listeners = null;
      }
      this.listenerTree && recursivelyGarbageCollect(this.listenerTree);
    } else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function (type) {
    var _events = this._events;
    var keys, listeners, allListeners;
    var i;
    var listenerTree;

    if (type === undefined$1) {
      if (this.wildcard) {
        throw Error('event name required for wildcard emitter');
      }

      if (!_events) {
        return [];
      }

      keys = ownKeys(_events);
      i = keys.length;
      allListeners = [];
      while (i-- > 0) {
        listeners = _events[keys[i]];
        if (typeof listeners === 'function') {
          allListeners.push(listeners);
        } else {
          allListeners.push.apply(allListeners, listeners);
        }
      }
      return allListeners;
    } else {
      if (this.wildcard) {
        listenerTree= this.listenerTree;
        if(!listenerTree) return [];
        var handlers = [];
        var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
        searchListenerTree.call(this, handlers, ns, listenerTree, 0);
        return handlers;
      }

      if (!_events) {
        return [];
      }

      listeners = _events[type];

      if (!listeners) {
        return [];
      }
      return typeof listeners === 'function' ? [listeners] : listeners;
    }
  };

  EventEmitter.prototype.eventNames = function(nsAsArray){
    var _events= this._events;
    return this.wildcard? collectTreeEvents.call(this, this.listenerTree, [], null, nsAsArray) : (_events? ownKeys(_events) : []);
  };

  EventEmitter.prototype.listenerCount = function(type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.hasListeners = function (type) {
    if (this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers.length > 0;
    }

    var _events = this._events;
    var _all = this._all;

    return !!(_all && _all.length || _events && (type === undefined$1 ? ownKeys(_events).length : _events[type]));
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  EventEmitter.prototype.waitFor = function (event, options) {
    var self = this;
    var type = typeof options;
    if (type === 'number') {
      options = {timeout: options};
    } else if (type === 'function') {
      options = {filter: options};
    }

    options= resolveOptions(options, {
      timeout: 0,
      filter: undefined$1,
      handleError: false,
      Promise: Promise,
      overload: false
    }, {
      filter: functionReducer,
      Promise: constructorReducer
    });

    return makeCancelablePromise(options.Promise, function (resolve, reject, onCancel) {
      function listener() {
        var filter= options.filter;
        if (filter && !filter.apply(self, arguments)) {
          return;
        }
        self.off(event, listener);
        if (options.handleError) {
          var err = arguments[0];
          err ? reject(err) : resolve(toArray.apply(null, arguments).slice(1));
        } else {
          resolve(toArray.apply(null, arguments));
        }
      }

      onCancel(function(){
        self.off(event, listener);
      });

      self._on(event, listener, false);
    }, {
      timeout: options.timeout,
      overload: options.overload
    })
  };

  function once(emitter, name, options) {
    options= resolveOptions(options, {
      Promise: Promise,
      timeout: 0,
      overload: false
    }, {
      Promise: constructorReducer
    });

    var _Promise= options.Promise;

    return makeCancelablePromise(_Promise, function(resolve, reject, onCancel){
      var handler;
      if (typeof emitter.addEventListener === 'function') {
        handler=  function () {
          resolve(toArray.apply(null, arguments));
        };

        onCancel(function(){
          emitter.removeEventListener(name, handler);
        });

        emitter.addEventListener(
            name,
            handler,
            {once: true}
        );
        return;
      }

      var eventListener = function(){
        errorListener && emitter.removeListener('error', errorListener);
        resolve(toArray.apply(null, arguments));
      };

      var errorListener;

      if (name !== 'error') {
        errorListener = function (err){
          emitter.removeListener(name, eventListener);
          reject(err);
        };

        emitter.once('error', errorListener);
      }

      onCancel(function(){
        errorListener && emitter.removeListener('error', errorListener);
        emitter.removeListener(name, eventListener);
      });

      emitter.once(name, eventListener);
    }, {
      timeout: options.timeout,
      overload: options.overload
    });
  }

  var prototype= EventEmitter.prototype;

  Object.defineProperties(EventEmitter, {
    defaultMaxListeners: {
      get: function () {
        return prototype._maxListeners;
      },
      set: function (n) {
        if (typeof n !== 'number' || n < 0 || Number.isNaN(n)) {
          throw TypeError('n must be a non-negative number')
        }
        prototype._maxListeners = n;
      },
      enumerable: true
    },
    once: {
      value: once,
      writable: true,
      configurable: true
    }
  });

  Object.defineProperties(prototype, {
      _maxListeners: {
          value: defaultMaxListeners,
          writable: true,
          configurable: true
      },
      _observers: {value: null, writable: true, configurable: true}
  });

  if (typeof undefined$1 === 'function' && undefined$1.amd) {
     // AMD. Register as an anonymous module.
    undefined$1(function() {
      return EventEmitter;
    });
  } else {
    // CommonJS
    module.exports = EventEmitter;
  }
}();
});

var rule = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _condition2 = _interopRequireDefault(condition);



var _ruleResult2 = _interopRequireDefault(ruleResult);



var _debug2 = _interopRequireDefault(debug_1);



var _eventemitter2 = _interopRequireDefault(eventemitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rule = function (_EventEmitter) {
  _inherits(Rule, _EventEmitter);

  /**
   * returns a new Rule instance
   * @param {object,string} options, or json string that can be parsed into options
   * @param {integer} options.priority (>1) - higher runs sooner.
   * @param {Object} options.event - event to fire when rule evaluates as successful
   * @param {string} options.event.type - name of event to emit
   * @param {string} options.event.params - parameters to pass to the event listener
   * @param {Object} options.conditions - conditions to evaluate when processing this rule
   * @param {any} options.name - identifier for a particular rule, particularly valuable in RuleResult output
   * @return {Rule} instance
   */
  function Rule(options) {
    _classCallCheck(this, Rule);

    var _this = _possibleConstructorReturn(this, (Rule.__proto__ || Object.getPrototypeOf(Rule)).call(this));

    if (typeof options === 'string') {
      options = JSON.parse(options);
    }
    if (options && options.conditions) {
      _this.setConditions(options.conditions);
    }
    if (options && options.onSuccess) {
      _this.on('success', options.onSuccess);
    }
    if (options && options.onFailure) {
      _this.on('failure', options.onFailure);
    }
    if (options && (options.name || options.name === 0)) {
      _this.setName(options.name);
    }

    var priority = options && options.priority || 1;
    _this.setPriority(priority);

    var event = options && options.event || { type: 'unknown' };
    _this.setEvent(event);
    return _this;
  }

  /**
   * Sets the priority of the rule
   * @param {integer} priority (>=1) - increasing the priority causes the rule to be run prior to other rules
   */


  _createClass(Rule, [{
    key: 'setPriority',
    value: function setPriority(priority) {
      priority = parseInt(priority, 10);
      if (priority <= 0) throw new Error('Priority must be greater than zero');
      this.priority = priority;
      return this;
    }

    /**
     * Sets the name of the rule
     * @param {any} name - any truthy input and zero is allowed
     */

  }, {
    key: 'setName',
    value: function setName(name) {
      if (!name && name !== 0) {
        throw new Error('Rule "name" must be defined');
      }
      this.name = name;
      return this;
    }

    /**
     * Sets the conditions to run when evaluating the rule.
     * @param {object} conditions - conditions, root element must be a boolean operator
     */

  }, {
    key: 'setConditions',
    value: function setConditions(conditions) {
      if (!Object.prototype.hasOwnProperty.call(conditions, 'all') && !Object.prototype.hasOwnProperty.call(conditions, 'any')) {
        throw new Error('"conditions" root must contain a single instance of "all" or "any"');
      }
      this.conditions = new _condition2.default(conditions);
      return this;
    }

    /**
     * Sets the event to emit when the conditions evaluate truthy
     * @param {object} event - event to emit
     * @param {string} event.type - event name to emit on
     * @param {string} event.params - parameters to emit as the argument of the event emission
     */

  }, {
    key: 'setEvent',
    value: function setEvent(event) {
      if (!event) throw new Error('Rule: setEvent() requires event object');
      if (!Object.prototype.hasOwnProperty.call(event, 'type')) throw new Error('Rule: setEvent() requires event object with "type" property');
      this.ruleEvent = {
        type: event.type
      };
      if (event.params) this.ruleEvent.params = event.params;
      return this;
    }

    /**
     * returns the event object
     * @returns {Object} event
     */

  }, {
    key: 'getEvent',
    value: function getEvent() {
      return this.ruleEvent;
    }

    /**
     * returns the priority
     * @returns {Number} priority
     */

  }, {
    key: 'getPriority',
    value: function getPriority() {
      return this.priority;
    }

    /**
     * returns the event object
     * @returns {Object} event
     */

  }, {
    key: 'getConditions',
    value: function getConditions() {
      return this.conditions;
    }

    /**
     * returns the engine object
     * @returns {Object} engine
     */

  }, {
    key: 'getEngine',
    value: function getEngine() {
      return this.engine;
    }

    /**
     * Sets the engine to run the rules under
     * @param {object} engine
     * @returns {Rule}
     */

  }, {
    key: 'setEngine',
    value: function setEngine(engine) {
      this.engine = engine;
      return this;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var stringify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var props = {
        conditions: this.conditions.toJSON(false),
        priority: this.priority,
        event: this.ruleEvent,
        name: this.name
      };
      if (stringify) {
        return JSON.stringify(props);
      }
      return props;
    }

    /**
     * Priorizes an array of conditions based on "priority"
     *   When no explicit priority is provided on the condition itself, the condition's priority is determine by its fact
     * @param  {Condition[]} conditions
     * @return {Condition[][]} prioritized two-dimensional array of conditions
     *    Each outer array element represents a single priority(integer).  Inner array is
     *    all conditions with that priority.
     */

  }, {
    key: 'prioritizeConditions',
    value: function prioritizeConditions(conditions) {
      var _this2 = this;

      var factSets = conditions.reduce(function (sets, condition) {
        // if a priority has been set on this specific condition, honor that first
        // otherwise, use the fact's priority
        var priority = condition.priority;
        if (!priority) {
          var fact = _this2.engine.getFact(condition.fact);
          priority = fact && fact.priority || 1;
        }
        if (!sets[priority]) sets[priority] = [];
        sets[priority].push(condition);
        return sets;
      }, {});
      return Object.keys(factSets).sort(function (a, b) {
        return Number(a) > Number(b) ? -1 : 1; // order highest priority -> lowest
      }).map(function (priority) {
        return factSets[priority];
      });
    }

    /**
     * Evaluates the rule, starting with the root boolean operator and recursing down
     * All evaluation is done within the context of an almanac
     * @return {Promise(RuleResult)} rule evaluation result
     */

  }, {
    key: 'evaluate',
    value: function evaluate(almanac) {
      var _this3 = this;

      var ruleResult = new _ruleResult2.default(this.conditions, this.ruleEvent, this.priority, this.name);

      /**
       * Evaluates the rule conditions
       * @param  {Condition} condition - condition to evaluate
       * @return {Promise(true|false)} - resolves with the result of the condition evaluation
       */
      var evaluateCondition = function evaluateCondition(condition) {
        if (condition.isBooleanOperator()) {
          var subConditions = condition[condition.operator];
          var comparisonPromise = void 0;
          if (condition.operator === 'all') {
            comparisonPromise = all(subConditions);
          } else {
            comparisonPromise = any(subConditions);
          }
          // for booleans, rule passing is determined by the all/any result
          return comparisonPromise.then(function (comparisonValue) {
            var passes = comparisonValue === true;
            condition.result = passes;
            return passes;
          });
        } else {
          return condition.evaluate(almanac, _this3.engine.operators).then(function (evaluationResult) {
            var passes = evaluationResult.result;
            condition.factResult = evaluationResult.leftHandSideValue;
            condition.result = passes;
            return passes;
          });
        }
      };

      /**
       * Evalutes an array of conditions, using an 'every' or 'some' array operation
       * @param  {Condition[]} conditions
       * @param  {string(every|some)} array method to call for determining result
       * @return {Promise(boolean)} whether conditions evaluated truthy or falsey based on condition evaluation + method
       */
      var evaluateConditions = function evaluateConditions(conditions, method) {
        if (!Array.isArray(conditions)) conditions = [conditions];

        return Promise.all(conditions.map(function (condition) {
          return evaluateCondition(condition);
        })).then(function (conditionResults) {
          (0, _debug2.default)('rule::evaluateConditions results', conditionResults);
          return method.call(conditionResults, function (result) {
            return result === true;
          });
        });
      };

      /**
       * Evaluates a set of conditions based on an 'all' or 'any' operator.
       *   First, orders the top level conditions based on priority
       *   Iterates over each priority set, evaluating each condition
       *   If any condition results in the rule to be guaranteed truthy or falsey,
       *   it will short-circuit and not bother evaluating any additional rules
       * @param  {Condition[]} conditions - conditions to be evaluated
       * @param  {string('all'|'any')} operator
       * @return {Promise(boolean)} rule evaluation result
       */
      var prioritizeAndRun = function prioritizeAndRun(conditions, operator) {
        if (conditions.length === 0) {
          return Promise.resolve(true);
        }
        var method = Array.prototype.some;
        if (operator === 'all') {
          method = Array.prototype.every;
        }
        var orderedSets = _this3.prioritizeConditions(conditions);
        var cursor = Promise.resolve();
        // use for() loop over Array.forEach to support IE8 without polyfill

        var _loop = function _loop(i) {
          var set = orderedSets[i];
          var stop = false;
          cursor = cursor.then(function (setResult) {
            // after the first set succeeds, don't fire off the remaining promises
            if (operator === 'any' && setResult === true || stop) {
              (0, _debug2.default)('prioritizeAndRun::detected truthy result; skipping remaining conditions');
              stop = true;
              return true;
            }

            // after the first set fails, don't fire off the remaining promises
            if (operator === 'all' && setResult === false || stop) {
              (0, _debug2.default)('prioritizeAndRun::detected falsey result; skipping remaining conditions');
              stop = true;
              return false;
            }
            // all conditions passed; proceed with running next set in parallel
            return evaluateConditions(set, method);
          });
        };

        for (var i = 0; i < orderedSets.length; i++) {
          _loop(i);
        }
        return cursor;
      };

      /**
       * Runs an 'any' boolean operator on an array of conditions
       * @param  {Condition[]} conditions to be evaluated
       * @return {Promise(boolean)} condition evaluation result
       */
      var any = function any(conditions) {
        return prioritizeAndRun(conditions, 'any');
      };

      /**
       * Runs an 'all' boolean operator on an array of conditions
       * @param  {Condition[]} conditions to be evaluated
       * @return {Promise(boolean)} condition evaluation result
       */
      var all = function all(conditions) {
        return prioritizeAndRun(conditions, 'all');
      };

      /**
       * Emits based on rule evaluation result, and decorates ruleResult with 'result' property
       * @param {RuleResult} ruleResult
       */
      var processResult = function processResult(result) {
        ruleResult.setResult(result);
        var event = result ? 'success' : 'failure';
        return _this3.emitAsync(event, ruleResult.event, almanac, ruleResult).then(function () {
          return ruleResult;
        });
      };

      if (ruleResult.conditions.any) {
        return any(ruleResult.conditions.any).then(function (result) {
          return processResult(result);
        });
      } else {
        return all(ruleResult.conditions.all).then(function (result) {
          return processResult(result);
        });
      }
    }
  }]);

  return Rule;
}(_eventemitter2.default);

exports.default = Rule;
});

var operator = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Operator = function () {
  /**
   * Constructor
   * @param {string}   name - operator identifier
   * @param {function(factValue, jsonValue)} callback - operator evaluation method
   * @param {function}  [factValueValidator] - optional validator for asserting the data type of the fact
   * @returns {Operator} - instance
   */
  function Operator(name, cb, factValueValidator) {
    _classCallCheck(this, Operator);

    this.name = String(name);
    if (!name) throw new Error('Missing operator name');
    if (typeof cb !== 'function') throw new Error('Missing operator callback');
    this.cb = cb;
    this.factValueValidator = factValueValidator;
    if (!this.factValueValidator) this.factValueValidator = function () {
      return true;
    };
  }

  /**
   * Takes the fact result and compares it to the condition 'value', using the callback
   * @param   {mixed} factValue - fact result
   * @param   {mixed} jsonValue - "value" property of the condition
   * @returns {Boolean} - whether the values pass the operator test
   */


  _createClass(Operator, [{
    key: 'evaluate',
    value: function evaluate(factValue, jsonValue) {
      return this.factValueValidator(factValue) && this.cb(factValue, jsonValue);
    }
  }]);

  return Operator;
}();

exports.default = Operator;
});

var errors = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.UndefinedFactError = function (_Error) {
  _inherits(UndefinedFactError, _Error);

  function UndefinedFactError() {
    var _ref;

    _classCallCheck(this, UndefinedFactError);

    for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = UndefinedFactError.__proto__ || Object.getPrototypeOf(UndefinedFactError)).call.apply(_ref, [this].concat(props)));

    _this.code = 'UNDEFINED_FACT';
    return _this;
  }

  return UndefinedFactError;
}(Error);
});

const {
  hasOwnProperty: hasOwnProp
} = Object.prototype;
/**
* @typedef {null|boolean|number|string|PlainObject|GenericArray} JSONObject
*/

/**
 * Copies array and then pushes item into it.
 * @param {GenericArray} arr Array to copy and into which to push
 * @param {any} item Array item to add (to end)
 * @returns {GenericArray} Copy of the original array
 */

function push(arr, item) {
  arr = arr.slice();
  arr.push(item);
  return arr;
}
/**
 * Copies array and then unshifts item into it.
 * @param {any} item Array item to add (to beginning)
 * @param {GenericArray} arr Array to copy and into which to unshift
 * @returns {GenericArray} Copy of the original array
 */


function unshift(item, arr) {
  arr = arr.slice();
  arr.unshift(item);
  return arr;
}
/**
 * Caught when JSONPath is used without `new` but rethrown if with `new`
 * @extends Error
 */


class NewError extends Error {
  /**
   * @param {any} value The evaluated scalar value
   */
  constructor(value) {
    super('JSONPath should not be called with "new" (it prevents return ' + 'of (unwrapped) scalar values)');
    this.avoidNew = true;
    this.value = value;
    this.name = 'NewError';
  }

}
/**
* @typedef {PlainObject} ReturnObject
* @property {string} path
* @property {JSONObject} value
* @property {PlainObject|GenericArray} parent
* @property {string} parentProperty
*/

/**
* @callback JSONPathCallback
* @param {string|PlainObject} preferredOutput
* @param {"value"|"property"} type
* @param {ReturnObject} fullRetObj
* @returns {void}
*/

/**
* @callback OtherTypeCallback
* @param {JSONObject} val
* @param {string} path
* @param {PlainObject|GenericArray} parent
* @param {string} parentPropName
* @returns {boolean}
*/

/* eslint-disable max-len -- Can make multiline type after https://github.com/syavorsky/comment-parser/issues/109 */

/**
 * @typedef {PlainObject} JSONPathOptions
 * @property {JSON} json
 * @property {string|string[]} path
 * @property {"value"|"path"|"pointer"|"parent"|"parentProperty"|"all"} [resultType="value"]
 * @property {boolean} [flatten=false]
 * @property {boolean} [wrap=true]
 * @property {PlainObject} [sandbox={}]
 * @property {boolean} [preventEval=false]
 * @property {PlainObject|GenericArray|null} [parent=null]
 * @property {string|null} [parentProperty=null]
 * @property {JSONPathCallback} [callback]
 * @property {OtherTypeCallback} [otherTypeCallback] Defaults to
 *   function which throws on encountering `@other`
 * @property {boolean} [autostart=true]
 */

/* eslint-enable max-len -- Can make multiline type after https://github.com/syavorsky/comment-parser/issues/109 */

/**
 * @param {string|JSONPathOptions} opts If a string, will be treated as `expr`
 * @param {string} [expr] JSON path to evaluate
 * @param {JSON} [obj] JSON object to evaluate against
 * @param {JSONPathCallback} [callback] Passed 3 arguments: 1) desired payload
 *     per `resultType`, 2) `"value"|"property"`, 3) Full returned object with
 *     all payloads
 * @param {OtherTypeCallback} [otherTypeCallback] If `@other()` is at the end
 *   of one's query, this will be invoked with the value of the item, its
 *   path, its parent, and its parent's property name, and it should return
 *   a boolean indicating whether the supplied value belongs to the "other"
 *   type or not (or it may handle transformations and return `false`).
 * @returns {JSONPath}
 * @class
 */


function JSONPath(opts, expr, obj, callback, otherTypeCallback) {
  // eslint-disable-next-line no-restricted-syntax
  if (!(this instanceof JSONPath)) {
    try {
      return new JSONPath(opts, expr, obj, callback, otherTypeCallback);
    } catch (e) {
      if (!e.avoidNew) {
        throw e;
      }

      return e.value;
    }
  }

  if (typeof opts === 'string') {
    otherTypeCallback = callback;
    callback = obj;
    obj = expr;
    expr = opts;
    opts = null;
  }

  const optObj = opts && typeof opts === 'object';
  opts = opts || {};
  this.json = opts.json || obj;
  this.path = opts.path || expr;
  this.resultType = opts.resultType || 'value';
  this.flatten = opts.flatten || false;
  this.wrap = hasOwnProp.call(opts, 'wrap') ? opts.wrap : true;
  this.sandbox = opts.sandbox || {};
  this.preventEval = opts.preventEval || false;
  this.parent = opts.parent || null;
  this.parentProperty = opts.parentProperty || null;
  this.callback = opts.callback || callback || null;

  this.otherTypeCallback = opts.otherTypeCallback || otherTypeCallback || function () {
    throw new TypeError('You must supply an otherTypeCallback callback option ' + 'with the @other() operator.');
  };

  if (opts.autostart !== false) {
    const args = {
      path: optObj ? opts.path : expr
    };

    if (!optObj) {
      args.json = obj;
    } else if ('json' in opts) {
      args.json = opts.json;
    }

    const ret = this.evaluate(args);

    if (!ret || typeof ret !== 'object') {
      throw new NewError(ret);
    }

    return ret;
  }
} // PUBLIC METHODS


JSONPath.prototype.evaluate = function (expr, json, callback, otherTypeCallback) {
  let currParent = this.parent,
      currParentProperty = this.parentProperty;
  let {
    flatten,
    wrap
  } = this;
  this.currResultType = this.resultType;
  this.currPreventEval = this.preventEval;
  this.currSandbox = this.sandbox;
  callback = callback || this.callback;
  this.currOtherTypeCallback = otherTypeCallback || this.otherTypeCallback;
  json = json || this.json;
  expr = expr || this.path;

  if (expr && typeof expr === 'object' && !Array.isArray(expr)) {
    if (!expr.path && expr.path !== '') {
      throw new TypeError('You must supply a "path" property when providing an object ' + 'argument to JSONPath.evaluate().');
    }

    if (!hasOwnProp.call(expr, 'json')) {
      throw new TypeError('You must supply a "json" property when providing an object ' + 'argument to JSONPath.evaluate().');
    }

    ({
      json
    } = expr);
    flatten = hasOwnProp.call(expr, 'flatten') ? expr.flatten : flatten;
    this.currResultType = hasOwnProp.call(expr, 'resultType') ? expr.resultType : this.currResultType;
    this.currSandbox = hasOwnProp.call(expr, 'sandbox') ? expr.sandbox : this.currSandbox;
    wrap = hasOwnProp.call(expr, 'wrap') ? expr.wrap : wrap;
    this.currPreventEval = hasOwnProp.call(expr, 'preventEval') ? expr.preventEval : this.currPreventEval;
    callback = hasOwnProp.call(expr, 'callback') ? expr.callback : callback;
    this.currOtherTypeCallback = hasOwnProp.call(expr, 'otherTypeCallback') ? expr.otherTypeCallback : this.currOtherTypeCallback;
    currParent = hasOwnProp.call(expr, 'parent') ? expr.parent : currParent;
    currParentProperty = hasOwnProp.call(expr, 'parentProperty') ? expr.parentProperty : currParentProperty;
    expr = expr.path;
  }

  currParent = currParent || null;
  currParentProperty = currParentProperty || null;

  if (Array.isArray(expr)) {
    expr = JSONPath.toPathString(expr);
  }

  if (!expr && expr !== '' || !json) {
    return undefined;
  }

  const exprList = JSONPath.toPathArray(expr);

  if (exprList[0] === '$' && exprList.length > 1) {
    exprList.shift();
  }

  this._hasParentSelector = null;

  const result = this._trace(exprList, json, ['$'], currParent, currParentProperty, callback).filter(function (ea) {
    return ea && !ea.isParentSelector;
  });

  if (!result.length) {
    return wrap ? [] : undefined;
  }

  if (!wrap && result.length === 1 && !result[0].hasArrExpr) {
    return this._getPreferredOutput(result[0]);
  }

  return result.reduce((rslt, ea) => {
    const valOrPath = this._getPreferredOutput(ea);

    if (flatten && Array.isArray(valOrPath)) {
      rslt = rslt.concat(valOrPath);
    } else {
      rslt.push(valOrPath);
    }

    return rslt;
  }, []);
}; // PRIVATE METHODS


JSONPath.prototype._getPreferredOutput = function (ea) {
  const resultType = this.currResultType;

  switch (resultType) {
    case 'all':
      {
        const path = Array.isArray(ea.path) ? ea.path : JSONPath.toPathArray(ea.path);
        ea.pointer = JSONPath.toPointer(path);
        ea.path = typeof ea.path === 'string' ? ea.path : JSONPath.toPathString(ea.path);
        return ea;
      }

    case 'value':
    case 'parent':
    case 'parentProperty':
      return ea[resultType];

    case 'path':
      return JSONPath.toPathString(ea[resultType]);

    case 'pointer':
      return JSONPath.toPointer(ea.path);

    default:
      throw new TypeError('Unknown result type');
  }
};

JSONPath.prototype._handleCallback = function (fullRetObj, callback, type) {
  if (callback) {
    const preferredOutput = this._getPreferredOutput(fullRetObj);

    fullRetObj.path = typeof fullRetObj.path === 'string' ? fullRetObj.path : JSONPath.toPathString(fullRetObj.path); // eslint-disable-next-line node/callback-return

    callback(preferredOutput, type, fullRetObj);
  }
};
/**
 *
 * @param {string} expr
 * @param {JSONObject} val
 * @param {string} path
 * @param {PlainObject|GenericArray} parent
 * @param {string} parentPropName
 * @param {JSONPathCallback} callback
 * @param {boolean} hasArrExpr
 * @param {boolean} literalPriority
 * @returns {ReturnObject|ReturnObject[]}
 */


JSONPath.prototype._trace = function (expr, val, path, parent, parentPropName, callback, hasArrExpr, literalPriority) {
  // No expr to follow? return path and value as the result of
  //  this trace branch
  let retObj;

  if (!expr.length) {
    retObj = {
      path,
      value: val,
      parent,
      parentProperty: parentPropName,
      hasArrExpr
    };

    this._handleCallback(retObj, callback, 'value');

    return retObj;
  }

  const loc = expr[0],
        x = expr.slice(1); // We need to gather the return value of recursive trace calls in order to
  // do the parent sel computation.

  const ret = [];
  /**
   *
   * @param {ReturnObject|ReturnObject[]} elems
   * @returns {void}
   */

  function addRet(elems) {
    if (Array.isArray(elems)) {
      // This was causing excessive stack size in Node (with or
      //  without Babel) against our performance test:
      //  `ret.push(...elems);`
      elems.forEach(t => {
        ret.push(t);
      });
    } else {
      ret.push(elems);
    }
  }

  if ((typeof loc !== 'string' || literalPriority) && val && hasOwnProp.call(val, loc)) {
    // simple case--directly follow property
    addRet(this._trace(x, val[loc], push(path, loc), val, loc, callback, hasArrExpr)); // eslint-disable-next-line unicorn/prefer-switch -- Part of larger `if`
  } else if (loc === '*') {
    // all child properties
    this._walk(loc, x, val, path, parent, parentPropName, callback, (m, l, _x, v, p, par, pr, cb) => {
      addRet(this._trace(unshift(m, _x), v, p, par, pr, cb, true, true));
    });
  } else if (loc === '..') {
    // all descendent parent properties
    // Check remaining expression with val's immediate children
    addRet(this._trace(x, val, path, parent, parentPropName, callback, hasArrExpr));

    this._walk(loc, x, val, path, parent, parentPropName, callback, (m, l, _x, v, p, par, pr, cb) => {
      // We don't join m and x here because we only want parents,
      //   not scalar values
      if (typeof v[m] === 'object') {
        // Keep going with recursive descent on val's
        //   object children
        addRet(this._trace(unshift(l, _x), v[m], push(p, m), v, m, cb, true));
      }
    }); // The parent sel computation is handled in the frame above using the
    // ancestor object of val

  } else if (loc === '^') {
    // This is not a final endpoint, so we do not invoke the callback here
    this._hasParentSelector = true;
    return {
      path: path.slice(0, -1),
      expr: x,
      isParentSelector: true
    };
  } else if (loc === '~') {
    // property name
    retObj = {
      path: push(path, loc),
      value: parentPropName,
      parent,
      parentProperty: null
    };

    this._handleCallback(retObj, callback, 'property');

    return retObj;
  } else if (loc === '$') {
    // root only
    addRet(this._trace(x, val, path, null, null, callback, hasArrExpr));
  } else if (/^(-?\d*):(-?\d*):?(\d*)$/u.test(loc)) {
    // [start:end:step]  Python slice syntax
    addRet(this._slice(loc, x, val, path, parent, parentPropName, callback));
  } else if (loc.indexOf('?(') === 0) {
    // [?(expr)] (filtering)
    if (this.currPreventEval) {
      throw new Error('Eval [?(expr)] prevented in JSONPath expression.');
    }

    this._walk(loc, x, val, path, parent, parentPropName, callback, (m, l, _x, v, p, par, pr, cb) => {
      if (this._eval(l.replace(/^\?\((.*?)\)$/u, '$1'), v[m], m, p, par, pr)) {
        addRet(this._trace(unshift(m, _x), v, p, par, pr, cb, true));
      }
    });
  } else if (loc[0] === '(') {
    // [(expr)] (dynamic property/index)
    if (this.currPreventEval) {
      throw new Error('Eval [(expr)] prevented in JSONPath expression.');
    } // As this will resolve to a property name (but we don't know it
    //  yet), property and parent information is relative to the
    //  parent of the property to which this expression will resolve


    addRet(this._trace(unshift(this._eval(loc, val, path[path.length - 1], path.slice(0, -1), parent, parentPropName), x), val, path, parent, parentPropName, callback, hasArrExpr));
  } else if (loc[0] === '@') {
    // value type: @boolean(), etc.
    let addType = false;
    const valueType = loc.slice(1, -2);

    switch (valueType) {
      case 'scalar':
        if (!val || !['object', 'function'].includes(typeof val)) {
          addType = true;
        }

        break;

      case 'boolean':
      case 'string':
      case 'undefined':
      case 'function':
        // eslint-disable-next-line valid-typeof
        if (typeof val === valueType) {
          addType = true;
        }

        break;

      case 'integer':
        if (Number.isFinite(val) && !(val % 1)) {
          addType = true;
        }

        break;

      case 'number':
        if (Number.isFinite(val)) {
          addType = true;
        }

        break;

      case 'nonFinite':
        if (typeof val === 'number' && !Number.isFinite(val)) {
          addType = true;
        }

        break;

      case 'object':
        // eslint-disable-next-line valid-typeof
        if (val && typeof val === valueType) {
          addType = true;
        }

        break;

      case 'array':
        if (Array.isArray(val)) {
          addType = true;
        }

        break;

      case 'other':
        addType = this.currOtherTypeCallback(val, path, parent, parentPropName);
        break;

      case 'null':
        if (val === null) {
          addType = true;
        }

        break;

      /* istanbul ignore next */

      default:
        throw new TypeError('Unknown value type ' + valueType);
    }

    if (addType) {
      retObj = {
        path,
        value: val,
        parent,
        parentProperty: parentPropName
      };

      this._handleCallback(retObj, callback, 'value');

      return retObj;
    } // `-escaped property

  } else if (loc[0] === '`' && val && hasOwnProp.call(val, loc.slice(1))) {
    const locProp = loc.slice(1);
    addRet(this._trace(x, val[locProp], push(path, locProp), val, locProp, callback, hasArrExpr, true));
  } else if (loc.includes(',')) {
    // [name1,name2,...]
    const parts = loc.split(',');

    for (const part of parts) {
      addRet(this._trace(unshift(part, x), val, path, parent, parentPropName, callback, true));
    } // simple case--directly follow property

  } else if (!literalPriority && val && hasOwnProp.call(val, loc)) {
    addRet(this._trace(x, val[loc], push(path, loc), val, loc, callback, hasArrExpr, true));
  } // We check the resulting values for parent selections. For parent
  // selections we discard the value object and continue the trace with the
  // current val object


  if (this._hasParentSelector) {
    for (let t = 0; t < ret.length; t++) {
      const rett = ret[t];

      if (rett && rett.isParentSelector) {
        const tmp = this._trace(rett.expr, val, rett.path, parent, parentPropName, callback, hasArrExpr);

        if (Array.isArray(tmp)) {
          ret[t] = tmp[0];
          const tl = tmp.length;

          for (let tt = 1; tt < tl; tt++) {
            t++;
            ret.splice(t, 0, tmp[tt]);
          }
        } else {
          ret[t] = tmp;
        }
      }
    }
  }

  return ret;
};

JSONPath.prototype._walk = function (loc, expr, val, path, parent, parentPropName, callback, f) {
  if (Array.isArray(val)) {
    const n = val.length;

    for (let i = 0; i < n; i++) {
      f(i, loc, expr, val, path, parent, parentPropName, callback);
    }
  } else if (val && typeof val === 'object') {
    Object.keys(val).forEach(m => {
      f(m, loc, expr, val, path, parent, parentPropName, callback);
    });
  }
};

JSONPath.prototype._slice = function (loc, expr, val, path, parent, parentPropName, callback) {
  if (!Array.isArray(val)) {
    return undefined;
  }

  const len = val.length,
        parts = loc.split(':'),
        step = parts[2] && Number.parseInt(parts[2]) || 1;
  let start = parts[0] && Number.parseInt(parts[0]) || 0,
      end = parts[1] && Number.parseInt(parts[1]) || len;
  start = start < 0 ? Math.max(0, start + len) : Math.min(len, start);
  end = end < 0 ? Math.max(0, end + len) : Math.min(len, end);
  const ret = [];

  for (let i = start; i < end; i += step) {
    const tmp = this._trace(unshift(i, expr), val, path, parent, parentPropName, callback, true); // Should only be possible to be an array here since first part of
    //   ``unshift(i, expr)` passed in above would not be empty, nor `~`,
    //     nor begin with `@` (as could return objects)
    // This was causing excessive stack size in Node (with or
    //  without Babel) against our performance test: `ret.push(...tmp);`


    tmp.forEach(t => {
      ret.push(t);
    });
  }

  return ret;
};

JSONPath.prototype._eval = function (code, _v, _vname, path, parent, parentPropName) {
  if (code.includes('@parentProperty')) {
    this.currSandbox._$_parentProperty = parentPropName;
    code = code.replace(/@parentProperty/gu, '_$_parentProperty');
  }

  if (code.includes('@parent')) {
    this.currSandbox._$_parent = parent;
    code = code.replace(/@parent/gu, '_$_parent');
  }

  if (code.includes('@property')) {
    this.currSandbox._$_property = _vname;
    code = code.replace(/@property/gu, '_$_property');
  }

  if (code.includes('@path')) {
    this.currSandbox._$_path = JSONPath.toPathString(path.concat([_vname]));
    code = code.replace(/@path/gu, '_$_path');
  }

  if (code.includes('@root')) {
    this.currSandbox._$_root = this.json;
    code = code.replace(/@root/gu, '_$_root');
  }

  if (/@([.\s)[])/u.test(code)) {
    this.currSandbox._$_v = _v;
    code = code.replace(/@([.\s)[])/gu, '_$_v$1');
  }

  try {
    return this.vm.runInNewContext(code, this.currSandbox);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    throw new Error('jsonPath: ' + e.message + ': ' + code);
  }
}; // PUBLIC CLASS PROPERTIES AND METHODS
// Could store the cache object itself


JSONPath.cache = {};
/**
 * @param {string[]} pathArr Array to convert
 * @returns {string} The path string
 */

JSONPath.toPathString = function (pathArr) {
  const x = pathArr,
        n = x.length;
  let p = '$';

  for (let i = 1; i < n; i++) {
    if (!/^(~|\^|@.*?\(\))$/u.test(x[i])) {
      p += /^[0-9*]+$/u.test(x[i]) ? '[' + x[i] + ']' : "['" + x[i] + "']";
    }
  }

  return p;
};
/**
 * @param {string} pointer JSON Path
 * @returns {string} JSON Pointer
 */


JSONPath.toPointer = function (pointer) {
  const x = pointer,
        n = x.length;
  let p = '';

  for (let i = 1; i < n; i++) {
    if (!/^(~|\^|@.*?\(\))$/u.test(x[i])) {
      p += '/' + x[i].toString().replace(/~/gu, '~0').replace(/\//gu, '~1');
    }
  }

  return p;
};
/**
 * @param {string} expr Expression to convert
 * @returns {string[]}
 */


JSONPath.toPathArray = function (expr) {
  const {
    cache
  } = JSONPath;

  if (cache[expr]) {
    return cache[expr].concat();
  }

  const subx = [];
  const normalized = expr // Properties
  .replace(/@(?:null|boolean|number|string|integer|undefined|nonFinite|scalar|array|object|function|other)\(\)/gu, ';$&;') // Parenthetical evaluations (filtering and otherwise), directly
  //   within brackets or single quotes
  .replace(/[['](\??\(.*?\))[\]']/gu, function ($0, $1) {
    return '[#' + (subx.push($1) - 1) + ']';
  }) // Escape periods and tildes within properties
  .replace(/\[['"]([^'\]]*)['"]\]/gu, function ($0, prop) {
    return "['" + prop.replace(/\./gu, '%@%').replace(/~/gu, '%%@@%%') + "']";
  }) // Properties operator
  .replace(/~/gu, ';~;') // Split by property boundaries
  .replace(/['"]?\.['"]?(?![^[]*\])|\[['"]?/gu, ';') // Reinsert periods within properties
  .replace(/%@%/gu, '.') // Reinsert tildes within properties
  .replace(/%%@@%%/gu, '~') // Parent
  .replace(/(?:;)?(\^+)(?:;)?/gu, function ($0, ups) {
    return ';' + ups.split('').join(';') + ';';
  }) // Descendents
  .replace(/;;;|;;/gu, ';..;') // Remove trailing
  .replace(/;$|'?\]|'$/gu, '');
  const exprList = normalized.split(';').map(function (exp) {
    const match = exp.match(/#(\d+)/u);
    return !match || !match[1] ? exp : subx[match[1]];
  });
  cache[expr] = exprList;
  return cache[expr].concat();
};

JSONPath.prototype.vm = vm;

var indexNodeEsm = /*#__PURE__*/Object.freeze({
  __proto__: null,
  JSONPath: JSONPath
});

var _jsonpathPlus = getCjsExportFromNamespace(indexNodeEsm);

var almanac = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _fact2 = _interopRequireDefault(fact);





var _debug2 = _interopRequireDefault(debug_1);





var _lodash2 = _interopRequireDefault(lodash_isobjectlike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function defaultPathResolver(value, path) {
  return (0, _jsonpathPlus.JSONPath)({ path: path, json: value, wrap: false });
}

/**
 * Fact results lookup
 * Triggers fact computations and saves the results
 * A new almanac is used for every engine run()
 */

var Almanac = function () {
  function Almanac(factMap) {
    var runtimeFacts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Almanac);

    this.factMap = new Map(factMap);
    this.factResultsCache = new Map(); // { cacheKey:  Promise<factValu> }
    this.allowUndefinedFacts = Boolean(options.allowUndefinedFacts);
    this.pathResolver = options.pathResolver || defaultPathResolver;
    this.events = { success: [], failure: [] };
    this.ruleResults = [];

    for (var factId in runtimeFacts) {
      var fact = void 0;
      if (runtimeFacts[factId] instanceof _fact2.default) {
        fact = runtimeFacts[factId];
      } else {
        fact = new _fact2.default(factId, runtimeFacts[factId]);
      }

      this._addConstantFact(fact);
      (0, _debug2.default)('almanac::constructor initialized runtime fact:' + fact.id + ' with ' + fact.value + '<' + _typeof(fact.value) + '>');
    }
  }

  /**
   * Adds a success event
   * @param {Object} event
   */


  _createClass(Almanac, [{
    key: 'addEvent',
    value: function addEvent(event, outcome) {
      if (!outcome) throw new Error('outcome required: "success" | "failure"]');
      this.events[outcome].push(event);
    }

    /**
     * retrieve successful events
     */

  }, {
    key: 'getEvents',
    value: function getEvents() {
      var outcome = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (outcome) return this.events[outcome];
      return this.events.success.concat(this.events.failure);
    }

    /**
     * Adds a rule result
     * @param {Object} event
     */

  }, {
    key: 'addResult',
    value: function addResult(ruleResult) {
      this.ruleResults.push(ruleResult);
    }

    /**
     * retrieve successful events
     */

  }, {
    key: 'getResults',
    value: function getResults() {
      return this.ruleResults;
    }

    /**
     * Retrieve fact by id, raising an exception if it DNE
     * @param  {String} factId
     * @return {Fact}
     */

  }, {
    key: '_getFact',
    value: function _getFact(factId) {
      return this.factMap.get(factId);
    }

    /**
     * Registers fact with the almanac
     * @param {[type]} fact [description]
     */

  }, {
    key: '_addConstantFact',
    value: function _addConstantFact(fact) {
      this.factMap.set(fact.id, fact);
      this._setFactValue(fact, {}, fact.value);
    }

    /**
     * Sets the computed value of a fact
     * @param {Fact} fact
     * @param {Object} params - values for differentiating this fact value from others, used for cache key
     * @param {Mixed} value - computed value
     */

  }, {
    key: '_setFactValue',
    value: function _setFactValue(fact, params, value) {
      var cacheKey = fact.getCacheKey(params);
      var factValue = Promise.resolve(value);
      if (cacheKey) {
        this.factResultsCache.set(cacheKey, factValue);
      }
      return factValue;
    }

    /**
     * Adds a constant fact during runtime.  Can be used mid-run() to add additional information
     * @param {String} fact - fact identifier
     * @param {Mixed} value - constant value of the fact
     */

  }, {
    key: 'addRuntimeFact',
    value: function addRuntimeFact(factId, value) {
      (0, _debug2.default)('almanac::addRuntimeFact id:' + factId);
      var fact = new _fact2.default(factId, value);
      return this._addConstantFact(fact);
    }

    /**
     * Returns the value of a fact, based on the given parameters.  Utilizes the 'almanac' maintained
     * by the engine, which cache's fact computations based on parameters provided
     * @param  {string} factId - fact identifier
     * @param  {Object} params - parameters to feed into the fact.  By default, these will also be used to compute the cache key
     * @param  {String} path - object
     * @return {Promise} a promise which will resolve with the fact computation.
     */

  }, {
    key: 'factValue',
    value: function factValue(factId) {
      var _this = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var factValuePromise = void 0;
      var fact = this._getFact(factId);
      if (fact === undefined) {
        if (this.allowUndefinedFacts) {
          return Promise.resolve(undefined);
        } else {
          return Promise.reject(new errors.UndefinedFactError('Undefined fact: ' + factId));
        }
      }
      if (fact.isConstant()) {
        factValuePromise = Promise.resolve(fact.calculate(params, this));
      } else {
        var cacheKey = fact.getCacheKey(params);
        var cacheVal = cacheKey && this.factResultsCache.get(cacheKey);
        if (cacheVal) {
          factValuePromise = Promise.resolve(cacheVal);
          (0, _debug2.default)('almanac::factValue cache hit for fact:' + factId);
        } else {
          (0, _debug2.default)('almanac::factValue cache miss for fact:' + factId + '; calculating');
          factValuePromise = this._setFactValue(fact, params, fact.calculate(params, this));
        }
      }
      if (path) {
        (0, _debug2.default)('condition::evaluate extracting object property ' + path);
        return factValuePromise.then(function (factValue) {
          if ((0, _lodash2.default)(factValue)) {
            var pathValue = _this.pathResolver(factValue, path);
            (0, _debug2.default)('condition::evaluate extracting object property ' + path + ', received: ' + JSON.stringify(pathValue));
            return pathValue;
          } else {
            (0, _debug2.default)('condition::evaluate could not compute object path(' + path + ') of non-object: ' + factValue + ' <' + (typeof factValue === 'undefined' ? 'undefined' : _typeof(factValue)) + '>; continuing with ' + factValue);
            return factValue;
          }
        });
      }

      return factValuePromise;
    }
  }]);

  return Almanac;
}();

exports.default = Almanac;
});

var engineDefaultOperators = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _operator2 = _interopRequireDefault(operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Operators = [];
Operators.push(new _operator2.default('equal', function (a, b) {
  return a === b;
}));
Operators.push(new _operator2.default('notEqual', function (a, b) {
  return a !== b;
}));
Operators.push(new _operator2.default('in', function (a, b) {
  return b.indexOf(a) > -1;
}));
Operators.push(new _operator2.default('notIn', function (a, b) {
  return b.indexOf(a) === -1;
}));

Operators.push(new _operator2.default('contains', function (a, b) {
  return a.indexOf(b) > -1;
}, Array.isArray));
Operators.push(new _operator2.default('doesNotContain', function (a, b) {
  return a.indexOf(b) === -1;
}, Array.isArray));

function numberValidator(factValue) {
  return Number.parseFloat(factValue).toString() !== 'NaN';
}
Operators.push(new _operator2.default('lessThan', function (a, b) {
  return a < b;
}, numberValidator));
Operators.push(new _operator2.default('lessThanInclusive', function (a, b) {
  return a <= b;
}, numberValidator));
Operators.push(new _operator2.default('greaterThan', function (a, b) {
  return a > b;
}, numberValidator));
Operators.push(new _operator2.default('greaterThanInclusive', function (a, b) {
  return a >= b;
}, numberValidator));

exports.default = Operators;
});

var engine = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FINISHED = exports.RUNNING = exports.READY = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _fact2 = _interopRequireDefault(fact);



var _rule2 = _interopRequireDefault(rule);



var _operator2 = _interopRequireDefault(operator);



var _almanac2 = _interopRequireDefault(almanac);



var _eventemitter2 = _interopRequireDefault(eventemitter2);



var _engineDefaultOperators2 = _interopRequireDefault(engineDefaultOperators);



var _debug2 = _interopRequireDefault(debug_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var READY = exports.READY = 'READY';
var RUNNING = exports.RUNNING = 'RUNNING';
var FINISHED = exports.FINISHED = 'FINISHED';

var Engine = function (_EventEmitter) {
  _inherits(Engine, _EventEmitter);

  /**
   * Returns a new Engine instance
   * @param  {Rule[]} rules - array of rules to initialize with
   */
  function Engine() {
    var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Engine);

    var _this = _possibleConstructorReturn(this, (Engine.__proto__ || Object.getPrototypeOf(Engine)).call(this));

    _this.rules = [];
    _this.allowUndefinedFacts = options.allowUndefinedFacts || false;
    _this.pathResolver = options.pathResolver;
    _this.operators = new Map();
    _this.facts = new Map();
    _this.status = READY;
    rules.map(function (r) {
      return _this.addRule(r);
    });
    _engineDefaultOperators2.default.map(function (o) {
      return _this.addOperator(o);
    });
    return _this;
  }

  /**
   * Add a rule definition to the engine
   * @param {object|Rule} properties - rule definition.  can be JSON representation, or instance of Rule
   * @param {integer} properties.priority (>1) - higher runs sooner.
   * @param {Object} properties.event - event to fire when rule evaluates as successful
   * @param {string} properties.event.type - name of event to emit
   * @param {string} properties.event.params - parameters to pass to the event listener
   * @param {Object} properties.conditions - conditions to evaluate when processing this rule
   */


  _createClass(Engine, [{
    key: 'addRule',
    value: function addRule(properties) {
      if (!properties) throw new Error('Engine: addRule() requires options');

      var rule = void 0;
      if (properties instanceof _rule2.default) {
        rule = properties;
      } else {
        if (!Object.prototype.hasOwnProperty.call(properties, 'event')) throw new Error('Engine: addRule() argument requires "event" property');
        if (!Object.prototype.hasOwnProperty.call(properties, 'conditions')) throw new Error('Engine: addRule() argument requires "conditions" property');
        rule = new _rule2.default(properties);
      }
      rule.setEngine(this);
      this.rules.push(rule);
      this.prioritizedRules = null;
      return this;
    }

    /**
     * update a rule in the engine
     * @param {object|Rule} rule - rule definition. Must be a instance of Rule
     */

  }, {
    key: 'updateRule',
    value: function updateRule(rule) {
      var ruleIndex = this.rules.findIndex(function (ruleInEngine) {
        return ruleInEngine.name === rule.name;
      });
      if (ruleIndex > -1) {
        this.rules.splice(ruleIndex, 1);
        this.addRule(rule);
        this.prioritizedRules = null;
      } else {
        throw new Error('Engine: updateRule() rule not found');
      }
    }

    /**
     * Remove a rule from the engine
     * @param {object|Rule|string} rule - rule definition. Must be a instance of Rule
     */

  }, {
    key: 'removeRule',
    value: function removeRule(rule) {
      var ruleRemoved = false;
      if (!(rule instanceof _rule2.default)) {
        var filteredRules = this.rules.filter(function (ruleInEngine) {
          return ruleInEngine.name !== rule;
        });
        ruleRemoved = filteredRules.length !== this.rules.length;
        this.rules = filteredRules;
      } else {
        var index = this.rules.indexOf(rule);
        if (index > -1) {
          ruleRemoved = Boolean(this.rules.splice(index, 1).length);
        }
      }
      if (ruleRemoved) {
        this.prioritizedRules = null;
      }
      return ruleRemoved;
    }

    /**
     * Add a custom operator definition
     * @param {string}   operatorOrName - operator identifier within the condition; i.e. instead of 'equals', 'greaterThan', etc
     * @param {function(factValue, jsonValue)} callback - the method to execute when the operator is encountered.
     */

  }, {
    key: 'addOperator',
    value: function addOperator(operatorOrName, cb) {
      var operator = void 0;
      if (operatorOrName instanceof _operator2.default) {
        operator = operatorOrName;
      } else {
        operator = new _operator2.default(operatorOrName, cb);
      }
      (0, _debug2.default)('engine::addOperator name:' + operator.name);
      this.operators.set(operator.name, operator);
    }

    /**
     * Remove a custom operator definition
     * @param {string}   operatorOrName - operator identifier within the condition; i.e. instead of 'equals', 'greaterThan', etc
     * @param {function(factValue, jsonValue)} callback - the method to execute when the operator is encountered.
     */

  }, {
    key: 'removeOperator',
    value: function removeOperator(operatorOrName) {
      var operatorName = void 0;
      if (operatorOrName instanceof _operator2.default) {
        operatorName = operatorOrName.name;
      } else {
        operatorName = operatorOrName;
      }

      return this.operators.delete(operatorName);
    }

    /**
     * Add a fact definition to the engine.  Facts are called by rules as they are evaluated.
     * @param {object|Fact} id - fact identifier or instance of Fact
     * @param {function} definitionFunc - function to be called when computing the fact value for a given rule
     * @param {Object} options - options to initialize the fact with. used when "id" is not a Fact instance
     */

  }, {
    key: 'addFact',
    value: function addFact(id, valueOrMethod, options) {
      var factId = id;
      var fact = void 0;
      if (id instanceof _fact2.default) {
        factId = id.id;
        fact = id;
      } else {
        fact = new _fact2.default(id, valueOrMethod, options);
      }
      (0, _debug2.default)('engine::addFact id:' + factId);
      this.facts.set(factId, fact);
      return this;
    }

    /**
     * Remove a fact definition to the engine.  Facts are called by rules as they are evaluated.
     * @param {object|Fact} id - fact identifier or instance of Fact
     */

  }, {
    key: 'removeFact',
    value: function removeFact(factOrId) {
      var factId = void 0;
      if (!(factOrId instanceof _fact2.default)) {
        factId = factOrId;
      } else {
        factId = factOrId.id;
      }

      return this.facts.delete(factId);
    }

    /**
     * Iterates over the engine rules, organizing them by highest -> lowest priority
     * @return {Rule[][]} two dimensional array of Rules.
     *    Each outer array element represents a single priority(integer).  Inner array is
     *    all rules with that priority.
     */

  }, {
    key: 'prioritizeRules',
    value: function prioritizeRules() {
      if (!this.prioritizedRules) {
        var ruleSets = this.rules.reduce(function (sets, rule) {
          var priority = rule.priority;
          if (!sets[priority]) sets[priority] = [];
          sets[priority].push(rule);
          return sets;
        }, {});
        this.prioritizedRules = Object.keys(ruleSets).sort(function (a, b) {
          return Number(a) > Number(b) ? -1 : 1; // order highest priority -> lowest
        }).map(function (priority) {
          return ruleSets[priority];
        });
      }
      return this.prioritizedRules;
    }

    /**
     * Stops the rules engine from running the next priority set of Rules.  All remaining rules will be resolved as undefined,
     * and no further events emitted.  Since rules of the same priority are evaluated in parallel(not series), other rules of
     * the same priority may still emit events, even though the engine is in a "finished" state.
     * @return {Engine}
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.status = FINISHED;
      return this;
    }

    /**
     * Returns a fact by fact-id
     * @param  {string} factId - fact identifier
     * @return {Fact} fact instance, or undefined if no such fact exists
     */

  }, {
    key: 'getFact',
    value: function getFact(factId) {
      return this.facts.get(factId);
    }

    /**
     * Runs an array of rules
     * @param  {Rule[]} array of rules to be evaluated
     * @return {Promise} resolves when all rules in the array have been evaluated
     */

  }, {
    key: 'evaluateRules',
    value: function evaluateRules(ruleArray, almanac) {
      var _this2 = this;

      return Promise.all(ruleArray.map(function (rule) {
        if (_this2.status !== RUNNING) {
          (0, _debug2.default)('engine::run status:' + _this2.status + '; skipping remaining rules');
          return Promise.resolve();
        }
        return rule.evaluate(almanac).then(function (ruleResult) {
          (0, _debug2.default)('engine::run ruleResult:' + ruleResult.result);
          almanac.addResult(ruleResult);
          if (ruleResult.result) {
            almanac.addEvent(ruleResult.event, 'success');
            return _this2.emitAsync('success', ruleResult.event, almanac, ruleResult).then(function () {
              return _this2.emitAsync(ruleResult.event.type, ruleResult.event.params, almanac, ruleResult);
            });
          } else {
            almanac.addEvent(ruleResult.event, 'failure');
            return _this2.emitAsync('failure', ruleResult.event, almanac, ruleResult);
          }
        });
      }));
    }

    /**
     * Runs the rules engine
     * @param  {Object} runtimeFacts - fact values known at runtime
     * @param  {Object} runOptions - run options
     * @return {Promise} resolves when the engine has completed running
     */

  }, {
    key: 'run',
    value: function run() {
      var _this3 = this;

      var runtimeFacts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      (0, _debug2.default)('engine::run started');
      this.status = RUNNING;
      var almanacOptions = {
        allowUndefinedFacts: this.allowUndefinedFacts,
        pathResolver: this.pathResolver
      };
      var almanac = new _almanac2.default(this.facts, runtimeFacts, almanacOptions);
      var orderedSets = this.prioritizeRules();
      var cursor = Promise.resolve();
      // for each rule set, evaluate in parallel,
      // before proceeding to the next priority set.
      return new Promise(function (resolve, reject) {
        orderedSets.map(function (set) {
          cursor = cursor.then(function () {
            return _this3.evaluateRules(set, almanac);
          }).catch(reject);
          return cursor;
        });
        cursor.then(function () {
          _this3.status = FINISHED;
          (0, _debug2.default)('engine::run completed');
          var ruleResults = almanac.getResults();

          var _ruleResults$reduce = ruleResults.reduce(function (hash, ruleResult) {
            var group = ruleResult.result ? 'results' : 'failureResults';
            hash[group].push(ruleResult);
            return hash;
          }, { results: [], failureResults: [] }),
              results = _ruleResults$reduce.results,
              failureResults = _ruleResults$reduce.failureResults;

          resolve({
            almanac: almanac,
            results: results,
            failureResults: failureResults,
            events: almanac.getEvents('success'),
            failureEvents: almanac.getEvents('failure')
          });
        }).catch(reject);
      });
    }
  }]);

  return Engine;
}(_eventemitter2.default);

exports.default = Engine;
});

var jsonRulesEngine = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Engine = exports.Operator = exports.Rule = exports.Fact = undefined;

exports.default = function (rules, options) {
  return new _engine2.default(rules, options);
};



var _engine2 = _interopRequireDefault(engine);



var _fact2 = _interopRequireDefault(fact);



var _rule2 = _interopRequireDefault(rule);



var _operator2 = _interopRequireDefault(operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Fact = _fact2.default;
exports.Rule = _rule2.default;
exports.Operator = _operator2.default;
exports.Engine = _engine2.default;
});

var dist = jsonRulesEngine;

var dayjs_min = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(v=i),i||!r&&v},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var v=this.$locale().weekStart||0,D=(y<v?y+7:y)-v;return $(r?m-D:m+(6-D),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,v=O.m(this,M);return v=(l={},l[c]=v/12,l[f]=v,l[h]=v/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?v:O.a(v)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}));
});

const ABS = {
  regex: /^ABS\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;
    const subParts = (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`));

    if (subParts.length !== 1) {
      throw new Error(`ABS() requires 1 parameter, received ${subParts.length}`);
    }

    return Math.abs(parseFloat(stringParser(subParts[0], variables, options)));
  }
};

const AND = {
  regex: /^AND\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;
    const parts = matchParts[0].split(splitRootRegex(`\\s*,\\s*`)) || [];

    if (!parts.length) {
      throw new Error(`AND() requires 1 or more parameters, received ${parts.length}`);
    }

    return parts.every(p => stringParser(p, variables, options));
  }
};

const AVG = {
  regex: /^AVG\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;
    const subParts = (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`));

    if (subParts.length === 0) {
      throw new Error('AVG() requires 1 or more parameters, received 0');
    }

    return subParts.reduce((sum, num) => sum + parseFloat(stringParser(num, variables, options)), 0) / subParts.length;
  }
};

const DATE = {
  regex: /^(Date.now|new Date|dayjs)/,
  parse: (cmd, variables) => getDateByPropertyValue(cmd, variables)
};

const IF = {
  regex: /^IF\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;
    const subParts = (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`));

    if (subParts.length !== 3) {
      throw new Error('IF() requires 3 parameters');
    }

    const [isTrue, trueResult, falseResult] = subParts;
    return stringParser(stringParser(isTrue, variables, options) ? stringParser(trueResult, variables, options) : stringParser(falseResult, variables, options), variables, options);
  }
};

const IFNA = {
  regex: /^IFNA\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;

    for (const subCmd of (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`))) {
      const result = stringParser(subCmd, variables, options);

      if (result) {
        return result;
      }
    }
  }
};

const LOWER = {
  regex: /^LOWER\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;
    const subParts = (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`));

    if (subParts.length !== 1) {
      throw new Error(`LOWER() requires 1 parameter, received ${subParts.length}`);
    }

    return stringParser(subParts[0], variables, options).toLowerCase();
  }
};

const MAX = {
  regex: /^MAX\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;
    let max = -Infinity;

    for (const subCmd of (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`))) {
      const result = stringParser(subCmd, variables, options);

      if (typeof result === 'number') {
        if (result > max) max = result;
      } else if (typeof result === 'string') {
        if (result.localeCompare(max) > 0) {
          max = result;
        }
      }
    }

    return max;
  }
};

const MIN = {
  regex: /^MIN\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;
    let min = Infinity;

    for (const subCmd of (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`))) {
      const result = stringParser(subCmd, variables, options);

      if (typeof result === 'number') {
        if (result < min) min = result;
      } else if (typeof result === 'string') {
        if (result.localeCompare(min) < 0) {
          min = result;
        }
      }
    }

    return min;
  }
};

const NOT = {
  regex: /^NOT\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;
    return !stringParser(matchParts[0], variables, options);
  }
};

const OR = {
  regex: /^OR\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;
    const parts = matchParts[0].split(splitRootRegex(`\\s*,\\s*`)) || [];

    if (!parts.length) {
      throw new Error(`OR() requires 1 or more parameters, received ${parts.length}`);
    }

    return parts.some(p => stringParser(p, variables, options));
  }
};

const SUM = {
  regex: /^SUM\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;
    const subParts = (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`));

    if (subParts.length === 0) {
      throw new Error('SUM() requires 1 or more parameters');
    }

    return subParts.reduce((sum, num) => sum + parseFloat(stringParser(num, variables, options)), 0);
  }
};

const UPPER = {
  regex: /^UPPER\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;
    const subParts = (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`));

    if (subParts.length !== 1) {
      throw new Error(`UPPER() requires 1 parameter, received ${subParts.length}`);
    }

    return stringParser(subParts[0], variables, options).toUpperCase();
  }
};

const VARIABLE = {
  regex: /^\$(.*)$/,
  parse: (_cmd, variables, matched, options) => {
    return /^\$\(/.test(matched[0]) ? variables[stringParser(matched[0].replace(/^\$\((.*)\)$/, '$1'), variables, options)] : variables[matched[0]];
  }
};

const TRIM = {
  regex: /^TRIM\((.*)\)$/,
  parse: function (_cmd, variables) {
    let matchParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let options = arguments.length > 3 ? arguments[3] : undefined;
    const subParts = (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`));

    if (subParts.length !== 1) {
      throw new Error(`TRIM() requires 1 parameter, received ${subParts.length}`);
    }

    return stringParser(subParts[0], variables, options).trim();
  }
};

const parserCommands = {
  ABS,
  AND,
  AVG,
  DATE,
  IF,
  IFNA,
  LOWER,
  MAX,
  MIN,
  NOT,
  OR,
  SUM,
  UPPER,
  TRIM,
  VARIABLE
};

/**
 * split a string by a delimiter while respecting brackets and only
 * split root delimiters
 *
 * @param delimiter {string} string to separate them by
 * @returns {string[]} array of string
 */

let splitRootRegex = delimiter => {
  return new RegExp(`${delimiter}(?![^\\(]*\\))`, 'g');
};
/**
 * parse a string with commands and variable getters
 *
 * @param cmd {string} command string
 * @param variables {Object} a key-value object for cmd to access
 * @returns {string | Date | number | boolean} result of cmd parsing
 */

let stringParser = (cmd, variables, options) => {
  const commands = (options === null || options === void 0 ? void 0 : options.commands) || parserCommands; // if it is not a string, there's nothing to parse, just return it

  if (typeof cmd !== 'string') {
    return cmd;
  } // split command by "&" and handle each command part
  // then merge concat them back together


  const result = cmd.replace(/^=/, '').split(splitRootRegex(`\\s*&\\s*`)).map(splitCmd => {
    let parserCommand = null;
    let regexMatched = null;
    let isFound = false; // find command by key

    if (commands[splitCmd.replace(/\(.*$/, '')]) {
      parserCommand = commands[splitCmd.replace(/\(.*$/, '')];
      regexMatched = parserCommand.regex ? splitCmd.match(parserCommand.regex) : null;

      if (regexMatched || !parserCommand.regex) {
        // if regex has no match OR command doesn't have regex
        isFound = true;
      }
    } // find command by regex


    if (!isFound) {
      for (const [_cmdKey, _parserCommand] of Object.entries(commands)) {
        regexMatched = _parserCommand.regex ? splitCmd.match(_parserCommand.regex) : null;

        if (regexMatched) {
          parserCommand = _parserCommand;
          isFound = true;
          break;
        }
      }
    } // if no command found, just return string as is
    // if command found, parse and return result


    return isFound && parserCommand ? parserCommand.parse(splitCmd, variables, (regexMatched || []).slice(1), options) : splitCmd;
  }); // if result only has one (no &), do not join because it'll make
  // the result into a string. If it has &, then join them

  return result.length > 1 ? result.join('') : result[0];
};

var combineValidations = (function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce((validations, arg) => {
    Object.keys(arg.rules || {}).forEach(rule => {
      var _validations$rules;

      if ((_validations$rules = validations.rules) !== null && _validations$rules !== void 0 && _validations$rules[rule]) {
        console.warn(`validation rule [${rule}] has been defined more than once`);
      }
    });
    Object.keys(arg.facts || {}).forEach(fact => {
      var _validations$facts;

      if ((_validations$facts = validations.facts) !== null && _validations$facts !== void 0 && _validations$facts[fact]) {
        console.warn(`validation fact [${fact}] has been defined more than once`);
      }
    });
    return {
      rules: { ...validations.rules,
        ...arg.rules
      },
      facts: { ...validations.facts,
        ...arg.facts
      }
    };
  }, {
    rules: {},
    facts: {}
  });
});

let flatten = (arr, opts) => {
  return arr.reduce((_arr, item) => {
    if (opts !== null && opts !== void 0 && opts.deep) {
      const newList = Array.isArray(item) ? item : [item];
      return [..._arr, ...(newList.some(i => Array.isArray(i)) ? flatten(newList) : newList)];
    }

    return [..._arr, ...(Array.isArray(item) ? item : [item])];
  }, []);
};
const cachedArgs = {};
let cachedMerge = function (key) {
  if (!cachedArgs[key]) cachedArgs[key] = {
    cached: [],
    result: null
  };

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (!args.length) return null;

  if (args.length !== cachedArgs[key].cached.length || args.some((a, aIndex) => a !== cachedArgs[key].cached[aIndex])) {
    cachedArgs[key].cached = args; // cached not matched, update cache args and result

    if (Array.isArray(args[0])) {
      cachedArgs[key].result = args.reduce((arr, arg) => [...arr, ...arg], []);
    } else {
      cachedArgs[key].result = args.reduce((obj, argObj) => ({ ...obj,
        ...argObj
      }), {});
    }
  }

  return cachedArgs[key].result;
};
let flattenTranslateKey = input => {
  if (Array.isArray(input)) {
    return input.reduce((arr, i) => {
      if (Array.isArray(i)) {
        return [...arr, ...flattenTranslateKey(i)];
      } else {
        return [...arr, i];
      }
    }, []);
  } else {
    // it is a string, break it up now
    return input.split('.');
  }
};
let translate = (languages, key, data) => {
  const lang = flattenTranslateKey(key).reduce((obj, g) => {
    if (typeof obj === 'string') {
      return obj;
    }

    return (obj === null || obj === void 0 ? void 0 : obj[g]) || (obj === null || obj === void 0 ? void 0 : obj[`control_${g}`]);
  }, languages);
  return lang === null || lang === void 0 ? void 0 : lang.replace(/(\{(\w+)\})/g, (_orig, outer, inner) => (data || {})[inner] || outer);
};
let formatDateString = date => {
  if (!date) return undefined;
  return new Date(date).toLocaleString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};
/**
 * generate a date (or number) based on the string method passed into
 * the date param
 *
 * dayjs($startDate).add(2, 'day') = a date that is 2 days after startDate
 * dayjs().diff($startDate, 'day') = day count (number) from startDate to now
 *
 * @param date the string or date to render
 * @param variables object of variables used to substitute $variable
 * @returns a date or number
 */

let getDateByPropertyValue = (date, variables) => {
  if (!date) {
    return undefined;
  }

  if (date instanceof Date) {
    return date;
  }

  const parsedDate = Date.parse(date);

  if (!isNaN(parsedDate)) {
    // is a proper date timestamp, return date with it
    return new Date(parsedDate);
  }

  if (/^Date.now(\(\))*$/.test(date) || /^new Date(\(\))*$/.test(date)) {
    // if date string is Date.now or new Date, return current date
    return new Date();
  }

  if (/(^dayjs|^[\w]+\([^\)]*\))/.test(date)) {
    // if it is a dayjs handling, run it through dayjs
    // examples:
    // - subtract(1, 'month') (based on current date)
    // - dayjs($incidentDate).subtract(1, 'day')
    const dateResult = date.split('.').reduce((accDate, part) => {
      const parts = part.match(/([\w]+)\(([^\)]*)\)/); // if part doesn't match needed format, just short circuit return

      if (!parts) return accDate;

      switch (parts[1]) {
        case 'dayjs':
          // if command is dayjs, replace current dayjs instance
          // with this dayjs (to define specific date)
          if (parts[2]) {
            if (/^\$/.test(parts[2])) {
              const responseResult = parts[2].replace(/^\$/, '').split('.').reduce((response, part) => {
                return response[part];
              }, variables || {});
              return dayjs_min(responseResult);
            } else {
              return dayjs_min(parts[2]);
            }
          }

          return accDate;

        default:
          return accDate[parts[1]](...parts[2].split(/\s*,\s*/).map(a => {
            const parsedNum = parseFloat(a);

            if (isNaN(parsedNum)) {
              if (/^\$/.test(a)) {
                // starts with a $, it is looking for a variable
                return a.replace(/^\$/, '').split('.').reduce((response, part) => {
                  return response[part];
                }, variables || {});
              } // else just return sanitised text back


              return a.replaceAll(/[\'\"]+/g, '');
            } else {
              return parsedNum;
            }
          }));
      }
    }, dayjs_min()); // if date result is a dayjs, return the Date version of it,
    // else return it as is

    return dateResult instanceof dayjs_min ? dateResult.toDate() : dateResult;
  } else if (/^\$/.test(date)) {
    // if date field is a variable (ie. $incidentDate), we'll fetch this
    // field from variables
    const responseResult = date.replace(/^\$/, '').split('.').reduce((response, part) => {
      return response[part];
    }, variables || {}); // return date instance of drilled down field

    return new Date(responseResult);
  }

  return undefined;
};

const equal = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length !== 1) {
    throw new Error(`requires 1 argument, received ${args.length}`);
  }

  const [equal] = args;
  return [{
    fact: 'response',
    operator: 'equal',
    value: Validator.validationRuleValue(equal, {})
  }];
};

const inRange = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length !== 2) {
    throw new Error(`require 2 arguments, received ${args.length}`);
  }

  const [from, to] = args;
  return [{
    fact: 'response',
    operator: 'greaterThanInclusive',
    value: Validator.validationRuleValue(from, {})
  }, {
    fact: 'response',
    operator: 'lessThanInclusive',
    value: Validator.validationRuleValue(to, {})
  }];
};

const isEmpty = [{
  fact: 'response',
  operator: 'equal',
  value: null
}];

const isFalse = [{
  fact: 'response',
  operator: 'equal',
  value: false
}];

const isFieldEmpty = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 0) {
    throw new Error(`requires 1 or more arguments, received ${args.length}`);
  }

  return args.map(field => ({
    fact: field,
    operator: 'equal',
    value: null
  }));
};

const isTrue = [{
  fact: 'response',
  operator: 'equal',
  value: true
}];

const max = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length !== 1) {
    throw new Error(`requires 1 argument, received ${args.length}`);
  }

  const [max] = args;
  return [{
    fact: 'response',
    operator: 'lessThanInclusive',
    value: Validator.validationRuleValue(max, {})
  }];
};

const min = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length !== 1) {
    throw new Error(`requires 1 argument, received ${args.length}`);
  }

  const [min] = args;
  return [{
    fact: 'response',
    operator: 'greaterThanInclusive',
    value: Validator.validationRuleValue(min, {})
  }];
};

const notEqual = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length !== 1) {
    throw new Error(`requires 1 argument, received ${args.length}`);
  }

  const [notEqual] = args;
  return [{
    fact: 'response',
    operator: 'notEqual',
    value: Validator.validationRuleValue(notEqual, {})
  }];
};

const positiveNumber = [{
  fact: 'response',
  operator: 'greaterThanInclusive',
  value: 0
}];

const required = [{
  fact: 'response',
  operator: 'notEqual',
  value: null
}];

var validationRules = {
  equal,
  inRange,
  isEmpty,
  isFieldEmpty,
  isFalse,
  isTrue,
  max,
  min,
  notEqual,
  positiveNumber,
  required
};

const CMD_DATE_REGEX = /^(Date.now|new Date|dayjs)/;
class Validator {
  get rules() {
    return this._presetValidations.rules || {};
  }

  static getRuleConditions(rule, facts, commands) {
    return (Array.isArray(rule) ? rule : [rule]).reduce((arr, cond) => {
      var _cond$all, _cond$any;

      if (typeof cond === 'string') {
        const matched = cond.match(/^([^\(]+)(\((.*)\))*/);

        if (!matched) {
          throw new Error(`rule [${cond}] has incorrect format`);
        }

        const [_original, command, _paramsWithBrackets, params] = matched;

        if (!(commands !== null && commands !== void 0 && commands[command])) {
          throw new Error(`rule [${cond}] does not exist in predefined rules`);
        }

        if (params && typeof (commands === null || commands === void 0 ? void 0 : commands[command]) !== 'function') {
          throw new Error(`rule [${cond}] expects ${command} to be a function but is not`);
        }

        try {
          var _commands$command;

          return [...arr, ...(params ? typeof (commands === null || commands === void 0 ? void 0 : commands[command]) === 'function' ? commands === null || commands === void 0 ? void 0 : (_commands$command = commands[command]) === null || _commands$command === void 0 ? void 0 : _commands$command.call(commands, ...(params || '').split(/\s*,\s*/)) : commands === null || commands === void 0 ? void 0 : commands[command] : (commands === null || commands === void 0 ? void 0 : commands[command]) || [])];
        } catch (err) {
          throw new Error(`rule [${command}] ${err.message}`);
        }
      } else if ((_cond$all = cond.all) !== null && _cond$all !== void 0 && _cond$all.length) {
        return [...arr, {
          all: Validator.getRuleConditions(cond.all, facts, commands)
        }];
      } else if ((_cond$any = cond.any) !== null && _cond$any !== void 0 && _cond$any.length) {
        return [...arr, {
          any: Validator.getRuleConditions(cond.any, facts, commands)
        }];
      } else {
        return [...arr, { ...cond,
          value: Validator.validationRuleValue(cond.value, facts)
        }];
      }
    }, []);
  }

  static getRuleFacts(rule, facts) {
    var _ref;

    // define conditions from rule. rule can be:
    //  - FormValidationCondition
    //  - string that maps to rules from config
    let conditions = Validator.getRuleConditions(rule, facts); // with each condition, extract facts into a
    // final array

    return (_ref = conditions || []) === null || _ref === void 0 ? void 0 : _ref.reduce((_arr, c) => {
      var _c$all, _c$any;

      if ((_c$all = c.all) !== null && _c$all !== void 0 && _c$all.length) {
        // it is a AllConditions
        return [..._arr, ...this.getRuleFacts(c.all, facts)];
      } else if ((_c$any = c.any) !== null && _c$any !== void 0 && _c$any.length) {
        // it is a AnyConditions
        return [..._arr, ...this.getRuleFacts(c.any, facts)];
      } else {
        var _c$value;

        // default to ConditionProperties
        return [..._arr, c.fact, ...((_c$value = c.value) !== null && _c$value !== void 0 && _c$value.fact ? [c.value.fact] : [])];
      }
    }, []);
  }

  static validationRuleValue(value, facts) {
    if (!value) return value;
    const isFact = /^\$/.test(value.toString());

    if (isFact) {
      return {
        fact: value.toString().replace(/^$/, '')
      };
    }

    if (value.fact) {
      return {
        fact: Validator.validationRuleValue(value.fact, facts)
      };
    }

    if (CMD_DATE_REGEX.test(value.toString())) {
      return getDateByPropertyValue(value.toString(), facts);
    }

    if (value === 'false') {
      return false;
    } else if (value === 'true') {
      return true;
    } else if (!isNaN(parseFloat(value.toString()))) {
      return parseFloat(value.toString());
    }

    return value;
  }

  static sanitizeFacts(facts) {
    return Object.keys(facts).reduce((newObj, factKey) => {
      if (facts[factKey] === undefined || facts[factKey] === '') {
        newObj[factKey] = null;
      } else if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(facts[factKey]) || facts[factKey] instanceof Date) {
        newObj[factKey] = new Date(facts[factKey]).valueOf();

        if (isNaN(newObj[factKey])) {
          newObj[factKey] = null;
        }
      } else if (Array.isArray(facts[factKey])) {
        newObj[factKey] = facts[factKey].map(f => this.sanitizeFacts(f));
      } else if (facts[factKey] instanceof Object) {
        newObj[factKey] = this.sanitizeFacts(facts[factKey]);
      } else if (CMD_DATE_REGEX.test(facts[factKey])) {
        newObj[factKey] = getDateByPropertyValue(facts[factKey], facts);
      } else {
        newObj[factKey] = facts[factKey];
      }

      return newObj;
    }, {});
  }

  constructor(_presetValidations) {
    _defineProperty(this, "_presetValidations", {});

    _defineProperty(this, "setPresetValidations", presetValidations => {
      this._presetValidations = {
        // FIXME: all validation deps mixed together
        deps: presetValidations.deps,
        rules: { ...validationRules,
          ...presetValidations.rules
        },
        facts: { ...presetValidations.facts
        }
      };
    });

    _defineProperty(this, "getRuleEngine", () => {
      const validations = this._presetValidations || {};
      const ruleEngine = new dist.Engine(undefined, {
        allowUndefinedFacts: true
      });

      if (validations.facts && Object.keys(validations.facts).length) {
        Object.keys(validations.facts).forEach(factKey => {
          var _validations$facts;

          ruleEngine.addFact(factKey, (_validations$facts = validations.facts) === null || _validations$facts === void 0 ? void 0 : _validations$facts[factKey]);
        });
      }

      return ruleEngine;
    });

    // TODO: should just pass config.validations?
    // is this reactive? or need to recreate class
    // with new config to be reactive???
    // use fn getConfig() instead??
    this.setPresetValidations(_presetValidations || {});
  }

  getRuleConditions(rule, facts) {
    return Validator.getRuleConditions(rule, facts, this._presetValidations.rules);
  }

  getRuleFacts(rule, facts) {
    return Validator.getRuleFacts(rule, facts);
  }

  validationRuleValue(value, facts) {
    return Validator.validationRuleValue(value, facts);
  }

  sanitizeFacts(facts) {
    return Validator.sanitizeFacts(facts);
  }

  generateValidateGenericData() {
    return Validator.generateValidateGenericData();
  }

  async validateMultiple(conditions, facts) {
    const engine = this.getRuleEngine();
    const genericData = await Validator.generateValidateGenericData();
    const sanitizedFacts = Validator.sanitizeFacts({ ...facts,
      ...genericData
    });
    conditions.forEach(c => {
      const validateConditions = Validator.getRuleConditions(c.conditions, sanitizedFacts);
      engine.addRule({
        conditions: {
          all: validateConditions
        },
        event: {
          type: c.error
        }
      });
    });
    return (await engine.run(sanitizedFacts)).failureEvents.map(e => e.type);
  }

  async validate(conditions, facts) {
    const genericData = await Validator.generateValidateGenericData();
    const sanitizedFacts = Validator.sanitizeFacts({ ...facts,
      ...genericData
    });
    const engine = this.getRuleEngine();
    const validateConditions = Validator.getRuleConditions(conditions, sanitizedFacts);
    engine.addRule({
      conditions: {
        all: validateConditions
      },
      event: {
        type: 'isTruthy'
      }
    });
    const result = await engine.run(sanitizedFacts);
    return result.events.some(e => e.type === 'isTruthy');
  }

}

_defineProperty(Validator, "generateValidateGenericData", async () => {
  return {
    'Date.now': Date.now(),
    currentDate: new Date(),
    currentDateString: formatDateString(new Date())
  };
});

class WidgetItem {
  static getParentIds(widgetId, widgetItems) {
    const widget = widgetItems[widgetId];
    if (!(widget !== null && widget !== void 0 && widget.parentId)) return [];
    return [widget.parentId, ...(WidgetItem.getParentIds(widget.parentId, widgetItems) || [])];
  }

  get pageState() {
    return this._getPageState();
  }

  async emitEvent(name, value) {
    return this._emitEvent(name, value, this);
  }

  get t() {
    return this._t;
  }

  get id() {
    return this._widget.id;
  }

  get order() {
    return this._widget.order;
  }

  get widget() {
    return this._widget;
  }

  get effects() {
    return this._widget.effects;
  }

  get type() {
    return this._widget.type;
  }

  get code() {
    return this._widget.code;
  }

  get style() {
    return this._widget.style;
  }

  get properties() {
    return this._properties;
  }

  get parentId() {
    return this._widget.parent;
  }

  get parent() {
    return this._widget.parent;
  }

  set parent(parentId) {
    this._widget.parent = parentId;
  }

  get reflexiveRules() {
    return this._widget.reflexiveRules;
  }

  get validationRules() {
    return this._widget.validationRules;
  }

  get widgetMeta() {
    return this._getWidgetMeta();
  }

  get validator() {
    return this._getValidator();
  }

  constructor(_ref) {
    var _widget$toJSON,
        _this = this;

    let {
      widget,
      pageEventListener,
      removeWidget,
      emitEvent,
      getState,
      setState,
      onUpdate,
      t,
      getWidgetMeta,
      getConfig,
      getValidator
    } = _ref;

    _defineProperty(this, "_widget", void 0);

    _defineProperty(this, "_getPageState", void 0);

    _defineProperty(this, "_setPageState", void 0);

    _defineProperty(this, "_widgetItems", void 0);

    _defineProperty(this, "_update", void 0);

    _defineProperty(this, "_t", void 0);

    _defineProperty(this, "_emitEvent", void 0);

    _defineProperty(this, "_pageEventListener", void 0);

    _defineProperty(this, "_removeWidget", void 0);

    _defineProperty(this, "_attachedListenerSets", {});

    _defineProperty(this, "_getWidgetMeta", void 0);

    _defineProperty(this, "_getConfig", void 0);

    _defineProperty(this, "_properties", void 0);

    _defineProperty(this, "_getValidator", void 0);

    this._t = t;
    this._pageEventListener = pageEventListener;
    this._removeWidget = removeWidget;
    this._emitEvent = emitEvent;
    this._widgetItems = {};
    this._widget = ((_widget$toJSON = widget.toJSON) === null || _widget$toJSON === void 0 ? void 0 : _widget$toJSON.call(widget)) || widget;
    this._getWidgetMeta = getWidgetMeta;
    this._getConfig = getConfig;
    this._getPageState = getState;
    this._setPageState = setState;

    this._update = function () {
      let newWidgetItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this;
      return onUpdate(newWidgetItem);
    };

    this._properties = widget.properties;
    this._getValidator = getValidator;
    if (this.code) getState().registerWidgetCode(this.code, this.id);
    this.syncReflexiveListeners();
    this.syncValidationListeners();
    this.syncFetchPropertiesListeners();
    this.emitListener('change');
  }

  removeListenerSet(setName) {
    if (this._attachedListenerSets[setName]) {
      // if setName exists, remove prior listeners
      this._attachedListenerSets[setName].events.forEach(eventName => {
        this._pageEventListener.remove(eventName, this._attachedListenerSets[setName].fn);
      });
    } else {
      this._attachedListenerSets[setName] = {
        events: [],
        fn: () => null
      };
    }
  }

  setListenerSet(setName, events, fn) {
    // clear previous listeners
    this.removeListenerSet(setName); // if no events passed/defined, no point keeping this listener set,
    // so remove it and skip the rest

    if (!(events !== null && events !== void 0 && events.length)) {
      delete this._attachedListenerSets[setName];
      return;
    } // set new events & fn


    this._attachedListenerSets[setName].events = events;
    this._attachedListenerSets[setName].fn = fn; // add fn to event listener

    this._attachedListenerSets[setName].events.forEach(eventName => {
      this._pageEventListener.add(eventName, this._attachedListenerSets[setName].fn);
    });
  }

  syncFetchPropertiesListeners() {
    var _this$widget$fetchPro;

    this.setListenerSet('fetchProperties', ((_this$widget$fetchPro = this.widget.fetchPropertiesOnWidgetsChange) === null || _this$widget$fetchPro === void 0 ? void 0 : _this$widget$fetchPro.map(c => `${c}_change`)) || [], async () => {
      await this.callFetchPropertiesApi();
    });
  }

  syncValidationListeners() {
    var _this$validationRules;

    this.setListenerSet('validations', ((_this$validationRules = this.validationRules) === null || _this$validationRules === void 0 ? void 0 : _this$validationRules.reduce((arr, c) => [...arr, ...(c.conditions || []).reduce((arr, cond) => [...arr, ...this.validator.getRuleFacts(this.validator.getRuleConditions([cond].flat(1), this.validationFacts), this.validationFacts).map(c => `${c}_change`)], [])], []).filter(c => c !== 'response')) || [], () => this.runValidations());
  }

  syncReflexiveListeners() {
    var _this$validator$getRu, _this$reflexiveRules;

    const reflexiveFacts = this.reflexiveRulesFacts;
    this.setListenerSet('reflexives', ((_this$validator$getRu = this.validator.getRuleConditions(((_this$reflexiveRules = this.reflexiveRules) === null || _this$reflexiveRules === void 0 ? void 0 : _this$reflexiveRules.flat(1)) || [], reflexiveFacts)) === null || _this$validator$getRu === void 0 ? void 0 : _this$validator$getRu.reduce((arr, c) => [...arr, ...this.validator.getRuleFacts(c, reflexiveFacts).map(a => `${a}_change`)], []).filter(c => c !== 'response')) || [], () => this.runReflexives()); // initial run

    this.runReflexives();
  }

  async callFetchPropertiesApi() {
    if (!this.widget.fetchPropertiesApi) {
      // TODO: throw error?
      return;
    }

    const body = {
      currentProperties: this.properties,
      originalProperties: this.widget.properties
    };
    const propertiesResponse = await fetch(this.widget.fetchPropertiesApi, {
      method: 'POST',
      body: JSON.stringify(body)
    });

    if (!propertiesResponse.ok) {
      // TODO: fetch error, do something?
      return;
    }

    this._properties = await propertiesResponse.json();
  }

  setProperty(field, value) {
    this._widget.properties[field] = value;
    this.update();
  }

  setEffectProperties(type, properties) {
    var _this$_widget$effects;

    // if effects was never instantiated, nothing to update, skip
    if (!this._widget.effects) return; // get effect index by type

    const effectIdx = (_this$_widget$effects = this._widget.effects) === null || _this$_widget$effects === void 0 ? void 0 : _this$_widget$effects.findIndex(e => e.type === type); // if no effect was found with param type, just return

    if (effectIdx === -1) return; // update properties at effect idx

    this._widget.effects[effectIdx] = { ...this._widget.effects[effectIdx],
      properties
    }; // trigger update for widget in UI

    this.update();
  }

  update() {
    this._update(this);
  }

  addEffect(effect) {
    var _this$effects, _this$effects2;

    if (!this.effects) this._widget.effects = [];

    if ((_this$effects = this.effects) !== null && _this$effects !== void 0 && _this$effects.some(e => e.type === effect.type)) {
      // already exists? skip for now
      return;
    } // add effect to list of effects


    (_this$effects2 = this.effects) === null || _this$effects2 === void 0 ? void 0 : _this$effects2.push(effect); // trigger update

    this.update();
  }

  removeEffect(effectType) {
    var _this$_widget$effects2;

    this._widget.effects = (_this$_widget$effects2 = this._widget.effects) === null || _this$_widget$effects2 === void 0 ? void 0 : _this$_widget$effects2.filter(e => e.type !== effectType);
    this.update();
  }

  emitListener(name, data) {
    this._pageEventListener.emit(`${this.id}_${name}`, data, {
      widgetItem: this
    });

    if (this.code) {
      this._pageEventListener.emit(`${this.code}_${name}`, data, {
        widgetItem: this
      });
    }
  }

  destroy() {}

  toJSON() {
    return this._widget;
  }

  removeWidget() {
    // if there is a parent, let them know to remove you
    if (this.parentId) {
      this._widgetItems[this.parentId].removeChild(this);
    } // trigger destroy method for clean up


    this.destroy(); // remove self

    this._removeWidget(this.id);
  }

  setWidgetItems(widgetItems) {
    this._widgetItems = widgetItems;
  }

  setLoading(isLoading) {
    this.setState('loading', isLoading);
    this.emitEvent('isLoading', isLoading); // go through all parent to notify

    this.getParents().forEach(parentWidgetItem => {
      parentWidgetItem.setChildLoading(this.id, isLoading);
    });
  }

  setDirty() {
    let dirty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.setState({
      touched: dirty,
      pristine: !dirty,
      dirty
    });
    this.update();
  }

  async runValidations(opts) {
    var _errors;

    if (opts !== null && opts !== void 0 && opts.setDirty) {
      this.setDirty();
    } // get errors (or null if none)


    let errors = await this._getValidationErrors();
    if (!((_errors = errors) !== null && _errors !== void 0 && _errors.length)) errors = null; // save error to widgetState

    this.setState({
      errors: errors || [],
      valid: !errors,
      hasErrors: !!errors
    }); // update parent fields that they have children errors

    const parentIds = this.getParentIds(); // go through each parent and notify them of children error changes

    (parentIds || []).forEach(parentId => {
      this._widgetItems[parentId].setChildErrors(this.id, errors);
    });
    this.update(); // return errors

    return errors;
  }

  async _getValidationErrors() {
    var _this$validationRules2;

    if (!((_this$validationRules2 = this.validationRules) !== null && _this$validationRules2 !== void 0 && _this$validationRules2.length) || !(await this.isReflexive())) {
      return null;
    } // get current widget's response


    const response = this.getState('response'); // go through each validation, and return error string if
    // invalid, and null if valid.
    // Only store an array of errors

    const widgetResponses = this.responses;
    const genericData = await this.validator.generateValidateGenericData();
    const errors = (await Promise.all(this.validationRules.map(async validation => {
      const data = this.validator.sanitizeFacts({ ...genericData,
        properties: this.properties,
        // FIXME: store somewhere so doesn't need to keep computing this?
        ...widgetResponses,
        response: response === undefined || response === '' ? null : response
      });
      const conditions = validation.conditions.map(c => this.validator.getRuleConditions(c, data)).flat(2);
      const isValid = await this.validator.validate(conditions, data); // TODO: need to handle possible data to go with err message

      if (!isValid) return {
        err: validation.error,
        isWarning: validation.isWarning
      };
      return null;
    }))).filter(a => a); // return error array or null

    return errors.length ? errors : null;
  }

  addValidation(validation) {
    var _this$validationRules3;

    (_this$validationRules3 = this.validationRules) === null || _this$validationRules3 === void 0 ? void 0 : _this$validationRules3.push(validation);
    this.update();
  }

  setChildLoading(childWidgetId, isLoading) {
    const currentChildLoadings = this.getState('childLoadings') || {};

    if (!isLoading) {
      delete currentChildLoadings[childWidgetId];
    } else {
      currentChildLoadings[childWidgetId] = isLoading;
    }

    if (!Object.keys(currentChildLoadings).length) {
      this.setState('childLoadings', undefined);
    } else {
      this.setState('childLoadings', currentChildLoadings);
    }
  }

  childLoadings() {
    return this.getState('childLoadings');
  }

  hasChildLoading() {
    return Object.keys(this.childLoadings() || {}).length > 0;
  }

  async setChildErrors(childWidgetId, errors) {
    const originalChildErrors = this.getState('childErrors') || {};
    const currentChildErrors = { ...this.getState('childErrors')
    } || {};

    if (!errors) {
      delete currentChildErrors[childWidgetId];
    } else {
      currentChildErrors[childWidgetId] = errors;
    } // nothing to set, just return


    if (Object.keys(currentChildErrors).length === Object.keys(originalChildErrors).length && Object.keys(currentChildErrors).every(key => originalChildErrors[key] === currentChildErrors[key])) {
      return;
    }

    if (!Object.keys(currentChildErrors).length) {
      this.setState('childErrors', undefined);
    } else {
      this.setState('childErrors', currentChildErrors);
    }
  }

  childErrors() {
    return this.getState('childErrors');
  }

  hasChildErrors() {
    return Object.keys(this.childErrors() || {}).length > 0;
  }

  async runReflexives() {
    const isHide = !(await this.isReflexive());
    const stateIsHide = !!this.getState('reflexiveHide');

    if (isHide !== stateIsHide) {
      await this.runValidations();
      this.setState('reflexiveHide', isHide);
    }

    if (isHide) {
      this.setState({
        response: null
      });
    }
  }

  getResponsesByCodesOrIds(codesOrIds) {
    return codesOrIds.reduce((obj, codeOrId) => {
      var _this$pageState$widge;

      const widgetIdByCode = this.pageState.widgetCodeToIdMap[codeOrId]; // TODO: what if I want to be more generic
      // and run rule by any param in widgetState and data

      const response = (_this$pageState$widge = this.pageState.widgetState[widgetIdByCode]) === null || _this$pageState$widge === void 0 ? void 0 : _this$pageState$widge.response;
      obj[codeOrId] = response;
      return obj;
    }, {});
  }

  get responses() {
    if (!Object.keys(this._widgetItems).length) {
      return {};
    }

    return Object.keys(this.pageState.widgetState).reduce((responses, wStateKey) => {
      const wState = this.pageState.widgetState[wStateKey];

      if (wState.type === 'question' && this._widgetItems[wStateKey]) {
        var _this$_widgetItems$wS, _this$_widgetItems$wS2;

        responses[((_this$_widgetItems$wS = this._widgetItems[wStateKey]) === null || _this$_widgetItems$wS === void 0 ? void 0 : _this$_widgetItems$wS.code) || ((_this$_widgetItems$wS2 = this._widgetItems[wStateKey]) === null || _this$_widgetItems$wS2 === void 0 ? void 0 : _this$_widgetItems$wS2.id)] = wState.response;
      }

      return responses;
    }, {});
  }

  get validationFacts() {
    return Validator.sanitizeFacts({ ...Validator.generateValidateGenericData(),
      ...this.responses
    });
  }

  get reflexiveRulesFacts() {
    return this.getResponsesByCodesOrIds((this.reflexiveRules || []).reduce((arr, rule) => [...arr, ...this.validator.getRuleFacts(rule, this.responses)], []));
  }

  async isReflexive() {
    var _this$reflexiveRules2;

    if (!((_this$reflexiveRules2 = this.reflexiveRules) !== null && _this$reflexiveRules2 !== void 0 && _this$reflexiveRules2.length)) {
      return true;
    } // extract all rules from reflexiveRules


    const rules = this.reflexiveRules.map(r => this.validator.getRuleConditions(r, this.validationFacts)).flat(2); // go through each reflexive rule to generate
    // a list of variable dependencies

    const facts = this.reflexiveRulesFacts; // validate reflexive rules

    const isReflexive = await this.validator.validate(rules, facts);
    const stateIsHide = !!this.getState('reflexiveHide');

    if (isReflexive === stateIsHide) {
      this.setState('reflexiveHide', !isReflexive);
    }

    return isReflexive;
  }

  setState(key, value) {
    const state = this._getPageState();

    state.setWidgetState(this.id, key, value); // FIXME: hack to trigger re-render

    this._setPageState(this.pageState);
  }

  getState(key) {
    const state = this._getPageState();

    return state.getWidgetState(this.id, key);
  }

  getParentIds() {
    return WidgetItem.getParentIds(this.id, this._widgetItems);
  }

  getParents() {
    return this.getParentIds().map(pId => this._widgetItems[pId]);
  }

  getParent() {
    return this._widgetItems[this.parentId || ''] || null;
  }

  getChildrenIds(_opts, _meta) {
    // this can be used if overridden in widget control
    return [];
  }

  getChildren(opts, meta) {
    return this.getChildrenIds(opts, meta).map(c => this._widgetItems[c]);
  }

  addChild(childWidget, _meta) {
    // to be overridden to handle adding to this widget as well
    childWidget.parent = this.id;
  }

  removeChild(childWidget) {
    // to be overridden to handle removing in this widget
    childWidget.parent = undefined;
  }

}

var script$11 = defineComponent({
  inject: ['widgetEffectControls', 'setPageState'],
  props: {
    widget: {
      type: Object,
      required: true
    },
    widgetControls: {
      type: Object,
      required: true
    },
    widgetItems: {
      type: Object,
      required: true
    },
    pageState: {
      type: Object,
      required: true
    },
    setWidgetState: {
      type: Function,
      required: true
    },
    getWidgetState: {
      type: Function,
      required: true
    },
    view: String
  },

  data() {
    return {
      isMounted: false
    };
  },

  computed: {
    widgetView() {
      return this.view || 'display';
    }

  },

  mounted() {
    this.isMounted = true;
  },

  methods: {
    onWidgetSelect() {
      // if (
      //   this.pageState.interactiveState.selectedWidgetId ===
      //   this.widget.id
      // ) {
      //   this.pageState.interactiveState.selectedWidgetId = "";
      // } else {
      this.pageState.interactiveState.selectedWidgetId = this.widget.id; // }

      this.setPageState(this.pageState);
    },

    getWidgetRender() {
      var _this$widget;

      let view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'display';
      let opts = arguments.length > 1 ? arguments[1] : undefined;
      const widgetType = this.widgetControls[((_this$widget = this.widget) === null || _this$widget === void 0 ? void 0 : _this$widget.type) || ''];

      if (!widgetType) {
        var _this$widget2;

        if (opts !== null && opts !== void 0 && opts.nullable) {
          return null;
        }

        throw new Error(`widget type [${(_this$widget2 = this.widget) === null || _this$widget2 === void 0 ? void 0 : _this$widget2.type}] from widget [${this.widget.id}] was not found. Maybe the widget control was not imported`);
      }

      const widgetRender = widgetType[view];

      if (!widgetRender) {
        if (opts !== null && opts !== void 0 && opts.nullable) {
          return null;
        }

        throw new Error(`widget view [${view}] does not exist for widget type [${this.widget.type}]`);
      }

      return widgetRender;
    }

  }
});

/* script */
const __vue_script__$11 = script$11;
/* template */

var __vue_render__$11 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "widget-wrapper",
    on: {
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.onWidgetSelect($event);
      }
    }
  }, [_vm.widget.style ? _c('style', {
    tag: "component",
    attrs: {
      "scoped": ""
    }
  }, [_vm._v("\n    " + _vm._s(_vm.widget.style) + "\n  ")]) : _vm._e(), _vm._v(" "), _vm.view === 'builder' && _vm.widgetControls[_vm.widget.type].builderControl ? _c('div', {
    staticClass: "widget-builder-control",
    class: {
      hovered: _vm.pageState.interactiveState.hoveredWidgetId === _vm.widget.id
    }
  }, [_c(_vm.widgetControls[_vm.widget.type].builderControl, {
    tag: "component",
    attrs: {
      "widget": _vm.widget,
      "properties": _vm.widget.properties,
      "widget-controls": _vm.widgetControls,
      "widget-items": _vm.widgetItems,
      "page-state": _vm.pageState,
      "set-widget-state": function (key, value) {
        return _vm.setWidgetState(key, value, _vm.widget);
      },
      "get-widget-state": function (key) {
        return _vm.getWidgetState(key, _vm.widget);
      },
      "view": _vm.view
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    ref: "widgetComponentWrapper",
    staticClass: "widget-component-wrapper",
    class: {
      selected: _vm.pageState.interactiveState.selectedWidgetId === _vm.widget.id,
      unselected: _vm.pageState.interactiveState.selectedWidgetId && _vm.pageState.interactiveState.selectedWidgetId !== _vm.widget.id
    }
  }, [_vm.isMounted ? [_vm._l(_vm.widget.effects, function (widgetEffect) {
    return _c(_vm.widgetEffectControls[widgetEffect.type].display, {
      key: widgetEffect.type,
      tag: "component",
      attrs: {
        "properties": widgetEffect.properties,
        "wrapper-ref": _vm.$refs.widgetComponentWrapper
      }
    });
  }), _vm._v(" "), _c(_vm.getWidgetRender(_vm.widgetView), {
    tag: "component",
    attrs: {
      "id": "widget-" + _vm.widget.id,
      "data-test": "widget-" + _vm.widget.code,
      "widget": _vm.widget,
      "properties": _vm.widget.properties,
      "widget-controls": _vm.widgetControls,
      "widget-items": _vm.widgetItems,
      "page-state": _vm.pageState,
      "set-widget-state": function (key, value) {
        return _vm.setWidgetState(key, value, _vm.widget);
      },
      "get-widget-state": function (key) {
        return _vm.getWidgetState(key, _vm.widget);
      },
      "view": _vm.view,
      "wrapper-ref": _vm.$refs.widgetComponentWrapper,
      "t": _vm.widget.t
    },
    on: {
      "setWidgetState": function (key, value) {
        return _vm.setWidgetState(key, value, _vm.widget);
      },
      "getWidgetState": function (key) {
        return _vm.getWidgetState(key, _vm.widget);
      }
    }
  })] : _vm._e()], 2)], 1);
};

var __vue_staticRenderFns__$11 = [];
/* style */

const __vue_inject_styles__$11 = function (inject) {
  if (!inject) return;
  inject("data-v-74e97d1a_0", {
    source: ".widget-component-wrapper[data-v-74e97d1a]{position:relative}.widget-component-wrapper.selected[data-v-74e97d1a]{background-color:#fff;border:1px solid #86d5fa;border-radius:8px;padding:0 10px;margin:-1px -11px -1px -11px}.widget-wrapper[data-v-74e97d1a]{padding:0}.widget-builder-control[data-v-74e97d1a]{position:absolute;top:-10px;left:10px;opacity:0;transition:opacity .2s;z-index:10}.widget-builder-control.hovered[data-v-74e97d1a]{opacity:1}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$11 = "data-v-74e97d1a";
/* module identifier */

const __vue_module_identifier__$11 = undefined;
/* functional template */

const __vue_is_functional_template__$11 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$13 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$11,
  staticRenderFns: __vue_staticRenderFns__$11
}, __vue_inject_styles__$11, __vue_script__$11, __vue_scope_id__$11, __vue_is_functional_template__$11, __vue_module_identifier__$11, false, createInjector, undefined, undefined);

var BuilderWidgetView = __vue_component__$13;

//
var script$10 = defineComponent({
  components: {
    BuilderWidgetView
  },
  props: {
    widgetControls: Object,
    widgetItems: Object,
    excludeWidgetIds: R(String),
    onlyIncludeWidgetIds: R(String),
    forParent: String
  },
  inject: ['widgetControls', 'getPageState', 'getView', 'setPageState', 'removeWidget'],

  data() {
    return {
      hoveredWidgetId: -1,
      openedAddOptionsIndex: -1
    };
  },

  computed: {
    view() {
      return this.getView();
    },

    pageState() {
      return this.getPageState();
    },

    widgetItemsArr() {
      return Object.values(this.$props.widgetItems);
    },

    filteredWidgetItemsArr() {
      return this.widgetItemsArr.filter(f => {
        return (!this.forParent && !f.parentId || f.parentId === this.forParent) && (!this.$props.onlyIncludeWidgetIds || this.$props.onlyIncludeWidgetIds.includes(f.id)) && (!(this.excludeWidgetIds || []).length || !this.excludeWidgetIds.includes(f.id));
      }).sort((a, b) => (a.order || 0) - (b.order || 0));
    }

  },
  methods: {
    toggleShowAddOptions(ev, widget, widgetIndex) {
      this.$data.openedAddOptionsIndex = this.$data.openedAddOptionsIndex === widgetIndex ? -1 : widgetIndex;
    },

    addWidget(ev, widgetControlKey, widget, widgetIndex) {
      this.widgetControls[widgetControlKey].create();
      this.$data.openedAddOptionsIndex = -1;
    },

    onDnDPlaceholderMouseDown(ev, widgetId) {
      this.pageState.interactiveState.draggingWidgetId = widgetId;
      this.setPageState(this.pageState);
    },

    onDnDPlaceholderMouseUp(ev, widgetId) {
      this.pageState.interactiveState.draggingWidgetId = '';
      this.setPageState(this.pageState);
    },

    onMouseEnter(ev, widgetId) {
      ev.stopPropagation();
      this.$data.hoveredWidgetId = widgetId;
      this.pageState.interactiveState.hoveredWidgetId = widgetId;
      this.setPageState(this.pageState);
    },

    onMouseLeave(ev, widgetId) {
      if (this.$data.hoveredWidgetId !== widgetId) return;
      this.$data.hoveredWidgetId = -1;
      this.pageState.interactiveState.hoveredWidgetId = '';
      this.setPageState(this.pageState);
    },

    setWidgetState(key, value, widget) {
      const pageState = this.pageState;

      if (value === undefined) {
        if (!pageState.widgetState[widget.id]) return;
        delete pageState.widgetState[widget.id][key];
      } else {
        if (!pageState.widgetState[widget.id]) pageState.widgetState[widget.id] = {};
        pageState.widgetState[widget.id][key] = value;
      }

      this.setPageState(pageState);
    },

    getWidgetState(key, widget) {
      var _this$pageState$widge;

      return (_this$pageState$widge = this.pageState.widgetState[widget.id]) === null || _this$pageState$widge === void 0 ? void 0 : _this$pageState$widge[key];
    }

  }
});

/* script */
const __vue_script__$10 = script$10;
/* template */

var __vue_render__$10 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._l(_vm.filteredWidgetItemsArr, function (widget, widgetIndex) {
    return _c('div', {
      key: widget.id,
      staticClass: "widget-container",
      class: {
        hovering: _vm.hoveredWidgetId === widget.id,
        dragging: _vm.pageState.interactiveState.draggingWidgetId === widget.id,
        notDragging: _vm.pageState.interactiveState.draggingWidgetId && _vm.pageState.interactiveState.draggingWidgetId !== widget.id
      },
      on: {
        "mouseenter": function ($event) {
          $event.stopPropagation();
          return function (ev) {
            return _vm.onMouseEnter(ev, widget.id);
          }($event);
        },
        "mouseleave": function ($event) {
          $event.stopPropagation();
          return function (ev) {
            return _vm.onMouseLeave(ev, widget.id);
          }($event);
        }
      }
    }, [_c('div', {
      staticClass: "left-actions-wrapper"
    }, [_c('a', {
      staticClass: "dnd-placeholder",
      on: {
        "mousedown": function (ev) {
          return _vm.onDnDPlaceholderMouseDown(ev, widget.id);
        },
        "mouseup": function (ev) {
          return _vm.onDnDPlaceholderMouseUp(ev, widget.id);
        }
      }
    }, [_vm._v("\n          ↑↓\n        ")]), _vm._v(" "), _c('a', {
      staticClass: "delete-button",
      on: {
        "click": function () {
          return widget.removeWidget();
        }
      }
    }, [_vm._v("\n          🗑\n        ")])]), _vm._v(" "), _c('div', {
      staticClass: "add-line",
      class: {
        opened: _vm.openedAddOptionsIndex === widgetIndex
      }
    }, [_c('div', {
      staticClass: "line",
      on: {
        "click": function ($event) {
          $event.stopPropagation();
          return function (ev) {
            return _vm.toggleShowAddOptions(ev, widget, widgetIndex);
          }($event);
        }
      }
    }), _vm._v(" "), _c('a', {
      staticClass: "add-button",
      on: {
        "click": function ($event) {
          $event.stopPropagation();
          return function (ev) {
            return _vm.toggleShowAddOptions(ev, widget, widgetIndex);
          }($event);
        }
      }
    }, [_c('span', [_vm._v("+")])]), _vm._v(" "), _c('div', {
      staticClass: "add-options-wrapper",
      class: {
        open: _vm.openedAddOptionsIndex === widgetIndex
      }
    }, [_c('div', {
      staticClass: "add-options-inner-wrapper"
    }, _vm._l(Object.keys(_vm.widgetControls), function (widgetControlKey) {
      return _c('a', {
        key: widgetControlKey,
        on: {
          "click": function (ev) {
            return _vm.addWidget(ev, widgetControlKey, widget, widgetIndex);
          }
        }
      }, [_vm._v("\n              " + _vm._s(widgetControlKey) + "\n            ")]);
    }), 0)])]), _vm._v(" "), _c('builder-widget-view', {
      attrs: {
        "widget": widget,
        "widget-controls": _vm.widgetControls,
        "widget-items": _vm.widgetItems,
        "page-state": _vm.pageState,
        "set-widget-state": _vm.setWidgetState,
        "get-widget-state": _vm.getWidgetState,
        "view": _vm.view
      }
    }), _vm._v(" "), widgetIndex === _vm.filteredWidgetItemsArr.length - 1 ? _c('div', {
      staticClass: "add-line",
      class: {
        opened: _vm.openedAddOptionsIndex === widgetIndex + 1
      }
    }, [_c('div', {
      staticClass: "line",
      on: {
        "click": function ($event) {
          $event.stopPropagation();
          return function (ev) {
            return _vm.toggleShowAddOptions(ev, widget, widgetIndex + 1);
          }($event);
        }
      }
    }), _vm._v(" "), _c('a', {
      staticClass: "add-button",
      on: {
        "click": function ($event) {
          $event.stopPropagation();
          return function (ev) {
            return _vm.toggleShowAddOptions(ev, widget, widgetIndex + 1);
          }($event);
        }
      }
    }, [_c('span', [_vm._v("+")])]), _vm._v(" "), _c('div', {
      staticClass: "add-options-wrapper",
      class: {
        open: _vm.openedAddOptionsIndex === widgetIndex + 1
      }
    }, [_c('div', {
      staticClass: "add-options-inner-wrapper"
    }, _vm._l(Object.keys(_vm.widgetControls), function (widgetControlKey) {
      return _c('a', {
        key: widgetControlKey,
        on: {
          "click": function (ev) {
            return _vm.addWidget(ev, widgetControlKey, widget, widgetIndex + 1);
          }
        }
      }, [_vm._v("\n              " + _vm._s(widgetControlKey) + "\n            ")]);
    }), 0)])]) : _vm._e()], 1);
  }), 0);
};

var __vue_staticRenderFns__$10 = [];
/* style */

const __vue_inject_styles__$10 = function (inject) {
  if (!inject) return;
  inject("data-v-68166712_0", {
    source: ".widget-container[data-v-68166712]{position:relative}.widget-container.notDragging[data-v-68166712]{opacity:.4}.widget-container.dragging[data-v-68166712]{opacity:1}.widget-form-control[data-v-68166712]{position:absolute;top:-40px;left:0}.add-line[data-v-68166712]{position:relative;padding:10px 0;margin:-10.5px 0;opacity:0;transition:opacity .2s;z-index:10}.add-line[data-v-68166712]:hover{opacity:1}.add-line .line[data-v-68166712]{width:100%;height:1px;background-color:#b5b5b5;cursor:pointer}.add-line .add-button[data-v-68166712]{position:absolute;top:-2px;left:-10px;width:20px;height:20px;background-color:#fff;border:1px solid #cdcdcd;border-radius:4px;display:flex;justify-content:center;align-items:center;padding-top:2px;box-shadow:0 0 10px 10px #fff;cursor:pointer;transition:background-color .3s}.add-line.opened .add-button[data-v-68166712]{background-color:#f71414;border:1px solid #f71414;color:#fff}.add-line.opened .add-button[data-v-68166712]:hover{background-color:#dc1212;border:1px solid #dc1212}.add-line .add-button span[data-v-68166712]{transition:all .3s}.add-line.opened .add-button span[data-v-68166712]{transform:rotate(45deg)}.add-line .add-button[data-v-68166712]:hover{background-color:#eaeaea}.add-line .add-options-wrapper[data-v-68166712]{margin-left:15px;position:absolute;top:-2px;left:0;width:100%;display:none}.add-line .add-options-wrapper.open[data-v-68166712]{display:block}.add-line .add-options-inner-wrapper[data-v-68166712]{width:100%;padding-bottom:10px;overflow-x:auto;display:flex;flex-direction:row}.add-line .add-options-wrapper a[data-v-68166712]{padding:2px 4px;cursor:pointer;background-color:#fff;border:1px solid #e8e8e8;border-radius:4px}.widget-container .dnd-placeholder[data-v-68166712]{width:20px;height:25px;padding-bottom:2px;background-color:#fafafa;border:1px dashed #dadada;cursor:grab;font-size:9pt;display:flex;justify-content:center;align-items:center;border-radius:4px}.widget-container .dnd-placeholder[data-v-68166712]:hover{background-color:#eaeaea}.left-actions-wrapper[data-v-68166712]{position:absolute;top:15px;left:-40px;padding:10px;opacity:0;transition:opacity .2s;width:25px;display:flex;flex-direction:column;align-items:center}.widget-container.hovering>.left-actions-wrapper[data-v-68166712]{opacity:1}.delete-button[data-v-68166712]{font-size:12px;margin:2px 0;padding:1px 0;cursor:pointer;color:red}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$10 = "data-v-68166712";
/* module identifier */

const __vue_module_identifier__$10 = undefined;
/* functional template */

const __vue_is_functional_template__$10 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$12 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$10,
  staticRenderFns: __vue_staticRenderFns__$10
}, __vue_inject_styles__$10, __vue_script__$10, __vue_scope_id__$10, __vue_is_functional_template__$10, __vue_module_identifier__$10, false, createInjector, undefined, undefined);

var BuilderWidgetsLayout = __vue_component__$12;

var script$$ = defineComponent({
  props: {
    widget: {
      type: Object,
      required: true
    },
    widgetControls: {
      type: Object,
      required: true
    },
    widgetItems: {
      type: Object,
      required: true
    },
    pageState: {
      type: Object,
      required: true
    },
    setWidgetState: {
      type: Function,
      required: true
    },
    getWidgetState: {
      type: Function,
      required: true
    },
    view: String
  },
  inject: ['widgetEffectControls'],

  data() {
    return {
      isMounted: false
    };
  },

  computed: {
    widgetView() {
      return this.view || 'display';
    }

  },

  mounted() {
    this.isMounted = true;
  },

  methods: {
    getWidgetEffectRender(effectType) {
      let view = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'display';
      const widgetEffectType = this.widgetEffectControls[effectType];

      if (!widgetEffectType) {
        throw new Error(`widget effect type [${effectType}] from widget [${this.widget.id}] was not found. Maybe the widget effect control was not imported`);
      }

      const widgetRender = widgetEffectType[view];

      if (!widgetRender) {
        throw new Error(`widget view [${view}] does not exist for widget effect type [${effectType}]`);
      }

      return widgetRender;
    },

    getWidgetRender() {
      var _this$widget;

      let view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'display';
      let opts = arguments.length > 1 ? arguments[1] : undefined;
      const widgetType = this.widgetControls[((_this$widget = this.widget) === null || _this$widget === void 0 ? void 0 : _this$widget.type) || ''];

      if (!widgetType) {
        var _this$widget2;

        if (opts !== null && opts !== void 0 && opts.nullable) {
          return null;
        }

        throw new Error(`widget type [${(_this$widget2 = this.widget) === null || _this$widget2 === void 0 ? void 0 : _this$widget2.type}] from widget [${this.widget.id}] was not found. Maybe the widget control was not imported`);
      }

      const widgetRender = widgetType[view];

      if (!widgetRender) {
        if (opts !== null && opts !== void 0 && opts.nullable) {
          return null;
        }

        throw new Error(`widget view [${view}] does not exist for widget type [${this.widget.type}]`);
      }

      return widgetRender;
    }

  }
});

/* script */
const __vue_script__$$ = script$$;
/* template */

var __vue_render__$$ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "widget-wrapper",
    attrs: {
      "widget-id": _vm.widget.id,
      "widget-code": _vm.widget.code
    }
  }, [_vm.widget.style ? _c('style', {
    tag: "component",
    attrs: {
      "scoped": ""
    }
  }, [_vm._v("\n    " + _vm._s(_vm.widget.style) + "\n  ")]) : _vm._e(), _vm._v(" "), _vm.view === 'builder' ? _c('div', {
    staticClass: "widget-form-control"
  }, [_c(_vm.getWidgetRender('builderControl', {
    nullable: true
  }), {
    tag: "component",
    attrs: {
      "widget": _vm.widget,
      "properties": _vm.widget.properties,
      "widgetControls": _vm.widgetControls,
      "widgetItems": _vm.widgetItems,
      "pageState": _vm.pageState,
      "setWidgetState": function (key, value) {
        return _vm.setWidgetState(key, value, _vm.widget);
      },
      "getWidgetState": function (key) {
        return _vm.getWidgetState(key, _vm.widget);
      },
      "view": _vm.widgetView
    },
    on: {
      "setWidgetState": function (key, value) {
        return _vm.setWidgetState(key, value, _vm.widget);
      },
      "getWidgetState": function (key) {
        return _vm.getWidgetState(key, _vm.widget);
      }
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    ref: "widgetComponentWrapper",
    class: ['widget-component-wrapper', "view-" + _vm.widgetView],
    attrs: {
      "id": "widget-wrapper-" + _vm.widget.id,
      "data-test": "widget-wrapper-" + _vm.widget.code
    }
  }, [_vm.isMounted ? [_vm._l(_vm.widget.effects, function (widgetEffect) {
    return _c(_vm.getWidgetEffectRender(widgetEffect.type, 'display'), {
      key: widgetEffect.type,
      tag: "component",
      attrs: {
        "properties": widgetEffect.properties,
        "wrapperRef": _vm.$refs.widgetComponentWrapper
      }
    });
  }), _vm._v(" "), _vm.widget ? _c(_vm.getWidgetRender(_vm.widgetView), {
    tag: "component",
    attrs: {
      "id": "widget-" + _vm.widget.id,
      "data-test": "widget-" + _vm.widget.code,
      "widget": _vm.widget,
      "properties": _vm.widget.properties,
      "widgetControls": _vm.widgetControls,
      "widgetItems": _vm.widgetItems,
      "pageState": _vm.pageState,
      "setWidgetState": function (key, value) {
        return _vm.setWidgetState(key, value, _vm.widget);
      },
      "getWidgetState": function (key) {
        return _vm.getWidgetState(key, _vm.widget);
      },
      "view": _vm.widgetView,
      "wrapperRef": _vm.$refs.widgetComponentWrapper,
      "t": _vm.widget.t
    },
    on: {
      "setWidgetState": function (key, value) {
        return _vm.setWidgetState(key, value, _vm.widget);
      },
      "getWidgetState": function (key) {
        return _vm.getWidgetState(key, _vm.widget);
      }
    }
  }) : _vm._e()] : _vm._e()], 2)], 1);
};

var __vue_staticRenderFns__$$ = [];
/* style */

const __vue_inject_styles__$$ = function (inject) {
  if (!inject) return;
  inject("data-v-ed524fac_0", {
    source: ".widget-component-wrapper[data-v-ed524fac]{position:relative}.widget-wrapper[data-v-ed524fac]{padding:0;scroll-margin:100px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$$ = "data-v-ed524fac";
/* module identifier */

const __vue_module_identifier__$$ = undefined;
/* functional template */

const __vue_is_functional_template__$$ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$11 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$$,
  staticRenderFns: __vue_staticRenderFns__$$
}, __vue_inject_styles__$$, __vue_script__$$, __vue_scope_id__$$, __vue_is_functional_template__$$, __vue_module_identifier__$$, false, createInjector, undefined, undefined);

var WidgetView = __vue_component__$11;

//
var script$_ = defineComponent({
  components: {
    WidgetView
  },
  props: {
    widgetControls: Object,
    widgetItems: Object,
    excludeWidgetIds: R(String),
    onlyIncludeWidgetIds: R(String),
    widgetsOrder: R(String),
    forParent: String,
    view: String
  },
  inject: ['widgetControls', 'getPageState', 'getView', 'setPageState'],
  computed: {
    widgetView() {
      return this.view || this.getView();
    },

    pageState() {
      return this.getPageState();
    },

    widgetItemsArr() {
      return Object.values(this.widgetItems);
    },

    filteredWidgetItemsArr() {
      return this.widgetItemsArr.filter(f => {
        return (!this.forParent && !f.parentId || f.parentId === this.forParent) && (!this.onlyIncludeWidgetIds || this.onlyIncludeWidgetIds.includes(f.id)) && (!(this.excludeWidgetIds || []).length || !this.excludeWidgetIds.includes(f.id));
      }).sort((a, b) => {
        const aOrder = (this.widgetsOrder || []).includes(a.id) ? this.widgetsOrder.indexOf(a.id) : a.order || 0;
        const bOrder = (this.widgetsOrder || []).includes(b.id) ? this.widgetsOrder.indexOf(b.id) : b.order || 0;
        return aOrder - bOrder;
      });
    }

  },
  methods: {
    setWidgetState(key, value, widget) {
      const pageState = this.pageState;

      if (value === undefined) {
        if (!pageState.widgetState[widget.id]) return;
        delete pageState.widgetState[widget.id][key];
      } else {
        if (!pageState.widgetState[widget.id]) pageState.widgetState[widget.id] = {};
        pageState.widgetState[widget.id][key] = value;
      }

      this.setPageState(pageState);
    },

    getWidgetState(key, widget) {
      var _this$pageState$widge;

      if (!key) {
        return this.pageState.widgetState[widget.id];
      }

      return (_this$pageState$widge = this.pageState.widgetState[widget.id]) === null || _this$pageState$widge === void 0 ? void 0 : _this$pageState$widge[key];
    }

  }
});

/* script */
const __vue_script__$_ = script$_;
/* template */

var __vue_render__$_ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._l(_vm.filteredWidgetItemsArr, function (widget) {
    return _c('div', {
      key: widget.id,
      staticClass: "widget-container"
    }, [!widget.getState('reflexiveHide') ? _c('widget-view', {
      attrs: {
        "widget": widget,
        "widget-controls": _vm.widgetControls,
        "widget-items": _vm.widgetItems,
        "page-state": _vm.pageState,
        "set-widget-state": _vm.setWidgetState,
        "get-widget-state": _vm.getWidgetState,
        "view": _vm.widgetView
      }
    }) : _vm._e()], 1);
  }), 0);
};

var __vue_staticRenderFns__$_ = [];
/* style */

const __vue_inject_styles__$_ = function (inject) {
  if (!inject) return;
  inject("data-v-68b249e9_0", {
    source: ".widget-container[data-v-68b249e9]{position:relative}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$_ = "data-v-68b249e9";
/* module identifier */

const __vue_module_identifier__$_ = undefined;
/* functional template */

const __vue_is_functional_template__$_ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$10 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$_,
  staticRenderFns: __vue_staticRenderFns__$_
}, __vue_inject_styles__$_, __vue_script__$_, __vue_scope_id__$_, __vue_is_functional_template__$_, __vue_module_identifier__$_, false, createInjector, undefined, undefined);

var WidgetsLayout = __vue_component__$10;

class PagesWidgetItem extends WidgetItem {
  constructor(opts) {
    super(opts);

    _defineProperty(this, "isSubmitting", false);
  }

  getSortedPages() {
    // FIXME: should be sorted, but this creates loop in UI
    return this.properties.pages; // return this.properties.pages.sort((a, b) => (a.idx || 0) - (b.idx || 0));
  }

  isWidgetIdInWidgetIds(widgetId, inWidgetIds) {
    return inWidgetIds.some(wId => {
      return wId === widgetId || this.isWidgetIdInWidgetIds(widgetId, this._widgetItems[wId].getChildrenIds());
    });
  }

  getChildIndexByWidgetId(widgetId) {
    return this.getSortedPages().findIndex(page => {
      return this.isWidgetIdInWidgetIds(widgetId, page.children);
    });
  }

  getChildrenIds(opts, meta) {
    return this.getSortedPages().filter((p, pIndex) => {
      var _meta$inPageIndices;

      if (meta !== null && meta !== void 0 && (_meta$inPageIndices = meta.inPageIndices) !== null && _meta$inPageIndices !== void 0 && _meta$inPageIndices.length) {
        return meta.inPageIndices.includes(pIndex);
      } else if (meta !== null && meta !== void 0 && meta.currentPageIndexOnly) {
        return pIndex === this.currentPageIndex;
      }

      return p;
    }).reduce((arr, page) => {
      return [...arr, ...page.children, ...(opts !== null && opts !== void 0 && opts.deep ? page.children.reduce((childArr, childId) => {
        return [...childArr, ...this._widgetItems[childId].getChildrenIds(opts, meta)];
      }, []) : [])];
    }, []);
  }

  setChildLoading(childWidgetId, isLoading) {
    // run original function to store the general state
    super.setChildLoading(childWidgetId, isLoading); // also store widget loading by children index
    // get current page index loading object from state

    const pageIndexLoadings = this.getState('pageIdxLoadings') || {}; // find which index this childWidget belongs to

    const childIndex = this.getChildIndexByWidgetId(childWidgetId);

    if (childIndex === -1) {
      throw new Error(`child widget [${childWidgetId}] not in paging ${this.id}`);
    }

    if (!isLoading) {
      var _pageIndexLoadings$ch;

      (_pageIndexLoadings$ch = pageIndexLoadings[childIndex]) === null || _pageIndexLoadings$ch === void 0 ? true : delete _pageIndexLoadings$ch[childWidgetId];
      if (!Object.keys(pageIndexLoadings[childIndex] || {}).length) delete pageIndexLoadings[childIndex];
    } else {
      if (!pageIndexLoadings[childIndex]) {
        pageIndexLoadings[childIndex] = {};
      }

      pageIndexLoadings[childIndex][childWidgetId] = isLoading;
    } // save pageIdxErrors to state


    this.setState('pageIdxLoadings', Object.keys(pageIndexLoadings).length ? pageIndexLoadings : undefined);
  }

  pageIndexHasLoadings(idx, opts) {
    const pageIdxLoadings = this.getState('pageIdxLoadings') || {}; // if no pageIdxLoadings, just return false

    if (!Object.keys(pageIdxLoadings || []).length) return false; // if current index doesn't have issues, that means
    // neither this page idx nor its children have any
    // loadings, so just return false

    if (!Object.keys(pageIdxLoadings[idx] || {}).length) return false; // if navigation integrate children pages, then check if
    // child pages has loadings in its CURRENT page idx

    const childPagesWidget = this.properties.navigationIntegrateChildrenPages ? this.getChildrenPagesWidgets({
      first: true,
      inPageIndices: [this.currentPageIndex]
    }) : null;

    if (childPagesWidget && !(childPagesWidget !== null && childPagesWidget !== void 0 && childPagesWidget.properties.detachParentIntegration) && (childPagesWidget === null || childPagesWidget === void 0 ? void 0 : childPagesWidget.nextButtonType()) !== 'none') {
      return opts !== null && opts !== void 0 && opts.allChildPages ? childPagesWidget.hasChildLoading() : childPagesWidget.currentPageIndexHasLoadings(opts);
    } // since don't need to handle child pages widget and
    // current page idx has errors, return true


    return true;
  }

  currentPageIndexHasLoadings(opts) {
    return this.pageIndexHasLoadings(this.currentPageIndex, opts);
  }

  async setChildErrors(childWidgetId, errors) {
    // run original function to store the general state
    super.setChildErrors(childWidgetId, errors);
    const err = (await this._widgetItems[childWidgetId].isReflexive()) ? errors : null; // also store widget errors by children index
    // get current page index errors object from state

    const originalPageIndexErrors = this.getState('pageIdxErrors') || {};
    const pageIndexErrors = { ...this.getState('pageIdxErrors')
    } || {}; // find which index this childWidget belongs to

    const childIndex = this.getChildIndexByWidgetId(childWidgetId);

    if (childIndex === -1) {
      throw new Error(`child widget [${childWidgetId}] not in paging ${this.id}`);
    }

    if (!err) {
      var _pageIndexErrors$chil;

      (_pageIndexErrors$chil = pageIndexErrors[childIndex]) === null || _pageIndexErrors$chil === void 0 ? true : delete _pageIndexErrors$chil[childWidgetId];
      if (!Object.keys(pageIndexErrors[childIndex] || {}).length) delete pageIndexErrors[childIndex];
    } else {
      if (!pageIndexErrors[childIndex]) {
        pageIndexErrors[childIndex] = {};
      }

      pageIndexErrors[childIndex][childWidgetId] = err;
    } // nothing to set, just return


    if (Object.keys(pageIndexErrors).length === Object.keys(originalPageIndexErrors).length && Object.keys(pageIndexErrors).every(key => originalPageIndexErrors[key] === pageIndexErrors[key])) {
      return;
    } // save pageIdxErrors to state


    this.setState('pageIdxErrors', Object.keys(pageIndexErrors).length ? pageIndexErrors : undefined);
  }

  addChild(childWidget, meta) {
    super.addChild(childWidget, meta);

    this._widget.properties.pages[(meta === null || meta === void 0 ? void 0 : meta.pageIdx) || 0].children.splice((meta === null || meta === void 0 ? void 0 : meta.childIdx) || 0, 0, childWidget.id);
  }

  removeChild(childWidget) {
    super.removeChild(childWidget);

    this._widget.properties.pages.forEach(page => {
      page.children = page.children.filter(c => c !== childWidget.id);
    });

    this._update(this);
  }

  onChangePageIndex(toIndex) {
    const sortedPages = this.getSortedPages();
    if (toIndex < 0) return;
    if (toIndex > sortedPages.length - 1) return;
    this.setState('currentPageIndex', toIndex);
  }

  get currentPageIndex() {
    return this.getState('currentPageIndex') || 0;
  }

  getParentPagesWidgets(opts) {
    const parentPages = this.getParents().filter(w => w.type === 'pages');
    return opts !== null && opts !== void 0 && opts.first ? parentPages[0] : parentPages;
  }

  getChildrenPagesWidgets(opts) {
    const childrenPages = this.getChildren({
      deep: true
    }, {
      inPageIndices: opts === null || opts === void 0 ? void 0 : opts.inPageIndices
    }).filter(w => w.type === 'pages');
    return opts !== null && opts !== void 0 && opts.first ? childrenPages[0] : childrenPages;
  }

  pageIndexHasErrors(idx, opts) {
    const pageIdxErrors = this.getState('pageIdxErrors') || {}; // if no pageIdxErrors, just return false

    if (!Object.keys(pageIdxErrors || []).length) return false; // if current index doesn't have issues, that means
    // neither this page idx nor its children have any
    // errors, so just return false

    if (!Object.keys(pageIdxErrors[idx] || {}).filter(widgetId => !(opts !== null && opts !== void 0 && opts.skipPristine) || !this._widgetItems[widgetId].getState('pristine')).length) return false; // if navigation integrate children pages, then check if
    // child pages has error in its CURRENT page idx

    const childPagesWidget = this.properties.navigationIntegrateChildrenPages ? this.getChildrenPagesWidgets({
      first: true,
      inPageIndices: [this.currentPageIndex]
    }) : null;

    if (childPagesWidget && !(childPagesWidget !== null && childPagesWidget !== void 0 && childPagesWidget.properties.detachParentIntegration) && (childPagesWidget === null || childPagesWidget === void 0 ? void 0 : childPagesWidget.nextButtonType()) !== 'none') {
      return opts !== null && opts !== void 0 && opts.allChildPages ? childPagesWidget.hasChildErrors() : childPagesWidget.currentPageIndexHasErrors(opts);
    } // since don't need to handle child pages widget and
    // current page idx has errors, return true


    return true;
  }

  currentPageIndexHasErrors(opts) {
    return this.pageIndexHasErrors(this.currentPageIndex, opts);
  }

  async toNextPage() {
    const children = this.getChildren({
      deep: true
    }, {
      currentPageIndexOnly: true
    });
    const hasErrors = (await Promise.all(children.map(async child => {
      if (child.getState('pristine')) {
        child.setState({
          pristine: false,
          dirty: true
        });
        child.update();
      }

      return (await child.isReflexive()) ? child.runValidations() : null;
    }))).some(err => (err || []).some(e => !e.isWarning));

    if (!hasErrors) {
      // update current pages or, if
      // navigationIntegrateParentPage is true,
      // update parent's instead
      // get next type first to determine which to update
      const nextType = this.nextButtonType();

      if (nextType === 'complete') {
        const pageErrors = this.properties.pages.map((_, pageIdx) => {
          return this.pageIndexHasErrors(pageIdx, {
            allChildPages: true,
            includeWarnings: false
          });
        });
        this.isSubmitting = true;
        await this.emitEvent('pages_complete', {
          pageErrors,
          hasErrors: pageErrors.some(hasError => hasError),
          pageWidget: this
        });
        this.isSubmitting = false;
      } else if (nextType === 'none') {
        // wasn't suppose to show, just skip it
        return;
      } else {
        // current pages at end, so update parent's
        const childPagesWidget = this.properties.navigationIntegrateChildrenPages ? this.getChildrenPagesWidgets({
          first: true,
          inPageIndices: [this.currentPageIndex]
        }) : null;

        if (childPagesWidget && !(childPagesWidget !== null && childPagesWidget !== void 0 && childPagesWidget.properties.detachParentIntegration) && (childPagesWidget === null || childPagesWidget === void 0 ? void 0 : childPagesWidget.nextButtonType()) !== 'none') {
          childPagesWidget.toNextPage();
        } else {
          this.onChangePageIndex(this.currentPageIndex + 1);
          this.emitEvent('pages_page_change', this.currentPageIndex);
        }
      }
    }
  }

  toPreviousPage() {
    // get previous type first to determine which to update
    const previousType = this.previousButtonType();

    if (previousType === 'none') {
      // wasn't suppose to be clicked, so just ignore
      return;
    }

    const childPagesWidget = this.properties.navigationIntegrateChildrenPages ? this.getChildrenPagesWidgets({
      first: true,
      inPageIndices: [this.currentPageIndex]
    }) : null;

    if (childPagesWidget && !(childPagesWidget !== null && childPagesWidget !== void 0 && childPagesWidget.properties.detachParentIntegration) && (childPagesWidget === null || childPagesWidget === void 0 ? void 0 : childPagesWidget.previousButtonType()) !== 'none') {
      childPagesWidget.toPreviousPage();
    } else {
      this.onChangePageIndex(this.currentPageIndex - 1);
      this.emitEvent('pages_page_change', this.currentPageIndex);
    }
  }

  previousButtonType() {
    // check whether this pages widget is at its end
    const isCurrentPageAtEnd = this.currentPageIndex <= 0; // check if there is any parents. Just get the immediate one

    const childPages = this.getChildrenPagesWidgets({
      first: true
    }); // if we don't need to integrate with parent pages or
    // current pages is not at its end yet, just return
    // based on current pages' state

    if (!this.properties.navigationIntegrateChildrenPages || !childPages || childPages.properties.detachParentIntegration || !isCurrentPageAtEnd) {
      if (isCurrentPageAtEnd) {
        return 'none';
      }

      return 'previous';
    } // return whether parent should be at its end


    return childPages.previousButtonType();
  }

  nextButtonType() {
    // check whether this pages widget is at its end
    const isCurrentPageAtEnd = this.currentPageIndex >= this._widget.properties.pages.length - 1; // check if there is any parents. Just get the immediate one

    const childPages = this.properties.navigationIntegrateChildrenPages ? this.getChildrenPagesWidgets({
      first: true
    }) : null; // if we don't need to integrate with parent pages or
    // current pages is not at its end yet, just return
    // based on current pages' state

    if (!this.properties.navigationIntegrateChildrenPages || !childPages || childPages.nextButtonType() === 'none' || childPages.properties.detachParentIntegration || !isCurrentPageAtEnd) {
      if (isCurrentPageAtEnd) {
        return this.properties.hasCompleteButton ? 'complete' : 'none';
      }

      return 'next';
    } // return whether parent should be at its end


    return childPages.nextButtonType();
  }

  hasPreviousButton() {
    return !!this.properties.navigationVisible && this.previousButtonType() !== 'none';
  }

  hasNextButton() {
    return !!this.properties.navigationVisible && this.nextButtonType() !== 'none';
  }

}

const WidgetControlProps$c = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$Z = defineComponent({
  components: {
    WidgetsLayout,
    BuilderWidgetsLayout
  },
  props: { ...WidgetControlProps$c,
    widget: {
      type: PagesWidgetItem,
      required: true
    }
  },

  data() {
    return {
      sortedPages: []
    };
  },

  computed: {
    currentPageIndex() {
      var _this$pageState$widge, _this$pageState$widge2;

      return ((_this$pageState$widge = this.pageState.widgetState) === null || _this$pageState$widge === void 0 ? void 0 : (_this$pageState$widge2 = _this$pageState$widge[this.widget.id]) === null || _this$pageState$widge2 === void 0 ? void 0 : _this$pageState$widge2.currentPageIndex) || 0;
    }

  },
  watch: {
    currentPageIndex: {
      handler() {
        const viewedIndices = this.widget.getState('viewedIndices') || [];

        if (!viewedIndices.includes(this.currentPageIndex)) {
          this.widget.setState('viewedIndices', [...viewedIndices, this.currentPageIndex]);
        }
      },

      immediate: true
    },
    'widget.properties.pages': {
      handler() {
        this.sortedPages = this.widget.getSortedPages();
      },

      immediate: true
    }
  }
});

/* script */
const __vue_script__$Z = script$Z;
/* template */

var __vue_render__$Z = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm.widget.properties.tabsVisible ? _c('div', {
    staticClass: "pages-menu-wrapper"
  }, _vm._l(_vm.sortedPages, function (page, pageIndex) {
    return _c('a', {
      key: pageIndex,
      staticClass: "pages-menu-item",
      class: {
        active: _vm.currentPageIndex === pageIndex,
        errors: _vm.widget.pageIndexHasErrors(pageIndex, {
          allChildPages: true
        }),
        unopened: !(_vm.widget.getState('viewedIndices') || []).includes(pageIndex)
      },
      on: {
        "click": function () {
          return _vm.widget.onChangePageIndex(pageIndex);
        }
      }
    }, [_vm._v("\n      " + _vm._s(_vm.t(page.labelKey, _vm.widget.id)) + "\n    ")]);
  }), 0) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "pages-content-item"
  }, [_c('builder-widgets-layout', {
    attrs: {
      "widget-items": _vm.widgetItems,
      "exclude-widget-ids": [_vm.widget.id],
      "only-include-widget-ids": _vm.sortedPages.length && _vm.currentPageIndex > -1 ? _vm.sortedPages[_vm.currentPageIndex].children : [],
      "for-parent": _vm.widget.id
    }
  })], 1), _vm._v(" "), _vm.widget.properties.navigationVisible ? _c('div', {
    staticClass: "back-forward-wrapper"
  }, [_c('div', [_vm.widget.hasPreviousButton() ? _c('button', {
    staticClass: "back-forward-button",
    on: {
      "click": function () {
        return _vm.widget.toPreviousPage();
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.t("__" + _vm.widget.previousButtonType(), _vm.widget.id)) + "\n      ")]) : _vm._e()]), _vm._v(" "), _c('div', [_vm.widget.hasNextButton() ? _c('button', {
    staticClass: "back-forward-button",
    class: {
      errors: _vm.widget.pageIndexHasErrors(_vm.currentPageIndex)
    },
    on: {
      "click": function () {
        return _vm.widget.toNextPage();
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.t("__" + _vm.widget.nextButtonType(), _vm.widget.id)) + "\n      ")]) : _vm._e()])]) : _vm._e()]);
};

var __vue_staticRenderFns__$Z = [];
/* style */

const __vue_inject_styles__$Z = function (inject) {
  if (!inject) return;
  inject("data-v-6a25db02_0", {
    source: ".pages-menu-wrapper[data-v-6a25db02]{display:flex;flex-direction:row;justify-content:center;margin:10px 0}.pages-menu-item[data-v-6a25db02]{display:inline-block;padding:10px 20px;cursor:pointer;text-align:center}.pages-menu-item.unopened[data-v-6a25db02]{opacity:.3;cursor:default}.pages-menu-item.active[data-v-6a25db02]{border-bottom:3px solid #03a9f4}.pages-menu-item.errors[data-v-6a25db02]{border-color:red}.back-forward-wrapper[data-v-6a25db02]{display:flex;flex-direction:row;justify-content:space-between}.back-forward-button[data-v-6a25db02]{padding:10px 20px;margin:10px;border:1px solid transparent;background-color:#03a9f4;color:#fff;cursor:pointer}.back-forward-button.errors[data-v-6a25db02]{background-color:red;color:#fff;opacity:.2;cursor:default}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$Z = "data-v-6a25db02";
/* module identifier */

const __vue_module_identifier__$Z = undefined;
/* functional template */

const __vue_is_functional_template__$Z = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$$ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$Z,
  staticRenderFns: __vue_staticRenderFns__$Z
}, __vue_inject_styles__$Z, __vue_script__$Z, __vue_scope_id__$Z, __vue_is_functional_template__$Z, __vue_module_identifier__$Z, false, createInjector, undefined, undefined);

var Builder$5 = __vue_component__$$;

var script$Y = defineComponent({
  props: {
    widget: Object,
    t: Function
  },
  inject: ['updateWidget', 'setMessage', 'getLocale'],
  methods: {
    setPageLabel(pageIndex, label) {
      this.setMessage({
        id: this.$props.widget.id,
        locale: this.getLocale(),
        key: this.$props.widget.properties.pages[pageIndex].labelKey,
        value: label
      });
    },

    setProperty(field, value) {
      this.widget.setProperty(field, value);
    }

  }
});

/* script */
const __vue_script__$Y = script$Y;
/* template */

var __vue_render__$Y = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('div', {
    staticClass: "section"
  }, [_c('label', [_vm._v("Pages")]), _vm._v(" "), _c('div', {
    staticClass: "pages-list-wrapper"
  }, _vm._l(_vm.widget.properties.pages, function (page, pageIndex) {
    return _c('div', {
      key: pageIndex,
      staticClass: "page-item"
    }, [_c('input', {
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": _vm.t(page.labelKey)
      },
      on: {
        "change": function (ev) {
          return _vm.setPageLabel(pageIndex, ev.target.value);
        }
      }
    }), _vm._v(" "), _c('a', {
      staticClass: "delete-page-button",
      on: {
        "click": function () {
          return _vm.widget.removeWidget();
        }
      }
    }, [_vm._v("🗑")])]);
  }), 0)]), _vm._v(" "), _c('div', {
    staticClass: "section"
  }, [_c('label', [_vm._v("Options")]), _vm._v(" "), _c('label', [_c('input', {
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": _vm.widget.properties.hasCompleteButton
    },
    on: {
      "change": function (ev) {
        return _vm.setProperty('hasCompleteButton', ev.target.checked);
      }
    }
  }), _vm._v("\n      has complete button\n    ")]), _vm._v(" "), _c('label', [_c('input', {
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": _vm.widget.properties.tabsVisible
    },
    on: {
      "change": function (ev) {
        return _vm.setProperty('tabsVisible', ev.target.checked);
      }
    }
  }), _vm._v("\n      show tabs\n    ")]), _vm._v(" "), _c('label', [_c('input', {
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": _vm.widget.properties.navigationVisible
    },
    on: {
      "change": function (ev) {
        return _vm.setProperty('navigationVisible', ev.target.checked);
      }
    }
  }), _vm._v("\n      show navigation\n    ")]), _vm._v(" "), _c('label', [_c('input', {
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": _vm.widget.properties.navigationIntegrateChildrenPages
    },
    on: {
      "change": function (ev) {
        return _vm.setProperty('navigationIntegrateChildrenPages', ev.target.checked);
      }
    }
  }), _vm._v("\n      integrate children pages\n    ")])])]);
};

var __vue_staticRenderFns__$Y = [];
/* style */

const __vue_inject_styles__$Y = function (inject) {
  if (!inject) return;
  inject("data-v-47418e34_0", {
    source: ".section[data-v-47418e34]{padding:15px 5px}label[data-v-47418e34]{display:block;padding:5px 0}.page-item[data-v-47418e34]{padding:5px 0;display:flex;flex-direction:row;justify-content:space-between}.page-item input[data-v-47418e34]{flex:1;border-width:0 0 1px 0;outline:0}.page-item .delete-page-button[data-v-47418e34]{padding-right:5px;padding-left:5px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$Y = "data-v-47418e34";
/* module identifier */

const __vue_module_identifier__$Y = undefined;
/* functional template */

const __vue_is_functional_template__$Y = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$_ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$Y,
  staticRenderFns: __vue_staticRenderFns__$Y
}, __vue_inject_styles__$Y, __vue_script__$Y, __vue_scope_id__$Y, __vue_is_functional_template__$Y, __vue_module_identifier__$Y, false, createInjector, undefined, undefined);

var BuilderForm$2 = __vue_component__$_;

let WidgetControlProps$b = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$X = defineComponent({
  components: {
    WidgetsLayout
  },
  props: { ...WidgetControlProps$b,
    widget: {
      type: Object,
      required: true
    },
    t: Function
  },

  data() {
    return {
      sortedPages: []
    };
  },

  computed: {
    currentPageIndex() {
      var _this$pageState, _this$pageState$widge, _this$pageState$widge2;

      return ((_this$pageState = this.pageState) === null || _this$pageState === void 0 ? void 0 : (_this$pageState$widge = _this$pageState.widgetState) === null || _this$pageState$widge === void 0 ? void 0 : (_this$pageState$widge2 = _this$pageState$widge[this.widget.id]) === null || _this$pageState$widge2 === void 0 ? void 0 : _this$pageState$widge2.currentPageIndex) || 0;
    }

  },
  watch: {
    currentPageIndex: {
      handler() {
        const viewedIndices = this.widget.getState('viewedIndices') || [];

        if (!viewedIndices.includes(this.currentPageIndex)) {
          this.widget.setState('viewedIndices', [...viewedIndices, this.currentPageIndex]);
        }
      },

      immediate: true
    },
    'widget.properties.pages': {
      handler() {
        this.sortedPages = this.widget.getSortedPages();
      },

      immediate: true
    }
  }
});

/* script */
const __vue_script__$X = script$X;
/* template */

var __vue_render__$X = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm.widget.properties.tabsVisible ? _c('div', {
    staticClass: "pages-menu-wrapper"
  }, _vm._l(_vm.sortedPages, function (page, pageIndex) {
    return _c('a', {
      key: pageIndex,
      staticClass: "pages-menu-item",
      class: {
        active: _vm.currentPageIndex === pageIndex,
        errors: _vm.widget.pageIndexHasErrors(pageIndex, {
          allChildPages: true
        }),
        unopened: !(_vm.widget.getState('viewedIndices') || []).includes(pageIndex)
      },
      attrs: {
        "id": "pages-" + _vm.widget.id + "-" + pageIndex,
        "data-test": "pages-" + _vm.widget.code + "-" + pageIndex,
        "disabled": !(_vm.widget.getState('viewedIndices') || []).includes(pageIndex)
      },
      on: {
        "click": function () {
          return (_vm.widget.getState('viewedIndices') || []).includes(pageIndex) && _vm.widget.onChangePageIndex(pageIndex);
        }
      }
    }, [_vm._v("\n      " + _vm._s(_vm.t(page.labelKey, _vm.widget.id)) + "\n    ")]);
  }), 0) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "pages-content-item"
  }, [_c('widgets-layout', {
    attrs: {
      "widget-items": _vm.widgetItems,
      "exclude-widget-ids": [_vm.widget.id],
      "only-include-widget-ids": _vm.sortedPages.length && _vm.currentPageIndex > -1 ? _vm.sortedPages[_vm.currentPageIndex].children : undefined,
      "widgets-order": _vm.sortedPages.length && _vm.currentPageIndex > -1 ? _vm.sortedPages[_vm.currentPageIndex].children : undefined,
      "for-parent": _vm.widget.id
    }
  })], 1), _vm._v(" "), _vm.widget.properties.navigationVisible ? _c('div', {
    staticClass: "back-forward-wrapper"
  }, [_c('div', [_vm.widget.hasPreviousButton() ? _c('button', {
    staticClass: "back-forward-button",
    attrs: {
      "disabled": _vm.widget.pageIndexHasLoadings(_vm.currentPageIndex) || _vm.widget.isSubmitting
    },
    on: {
      "click": function () {
        return _vm.widget.toPreviousPage();
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.t("__" + _vm.widget.previousButtonType(), _vm.widget.id)) + "\n      ")]) : _vm._e()]), _vm._v(" "), _c('div', [_vm.widget.hasNextButton() ? _c('button', {
    staticClass: "back-forward-button",
    class: {
      errors: _vm.widget.pageIndexHasErrors(_vm.currentPageIndex),
      submitting: _vm.widget.isSubmitting
    },
    attrs: {
      "disabled": _vm.widget.pageIndexHasLoadings(_vm.currentPageIndex) || _vm.widget.pageIndexHasErrors(_vm.currentPageIndex) || _vm.widget.isSubmitting
    },
    on: {
      "click": function () {
        return _vm.widget.toNextPage();
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.t("__" + _vm.widget.nextButtonType(), _vm.widget.id)) + "\n      ")]) : _vm._e()])]) : _vm._e()]);
};

var __vue_staticRenderFns__$X = [];
/* style */

const __vue_inject_styles__$X = function (inject) {
  if (!inject) return;
  inject("data-v-8d79d2a6_0", {
    source: ".pages-menu-wrapper[data-v-8d79d2a6]{display:flex;flex-direction:row;justify-content:center;margin:10px 0}.pages-menu-item[data-v-8d79d2a6]{display:inline-block;padding:10px 20px;cursor:pointer;text-align:center}.pages-menu-item.unopened[data-v-8d79d2a6]{opacity:.3;cursor:default}.pages-menu-item.active[data-v-8d79d2a6]{border-bottom:3px solid #03a9f4}.pages-menu-item.errors[data-v-8d79d2a6]{border-color:red}.back-forward-wrapper[data-v-8d79d2a6]{display:flex;flex-direction:row;justify-content:space-between}.back-forward-button[data-v-8d79d2a6]{padding:10px 20px;margin:10px;border:1px solid transparent;background-color:#03a9f4;color:#fff;cursor:pointer}.back-forward-button.errors[data-v-8d79d2a6]{background-color:red;color:#fff;opacity:.2;cursor:default}.back-forward-button.submitting[data-v-8d79d2a6]{opacity:.2}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$X = "data-v-8d79d2a6";
/* module identifier */

const __vue_module_identifier__$X = undefined;
/* functional template */

const __vue_is_functional_template__$X = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$Z = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$X,
  staticRenderFns: __vue_staticRenderFns__$X
}, __vue_inject_styles__$X, __vue_script__$X, __vue_scope_id__$X, __vue_is_functional_template__$X, __vue_module_identifier__$X, false, createInjector, undefined, undefined);

var Display$b = __vue_component__$Z;

let WidgetControlProps$a = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$W = defineComponent({
  components: {
    WidgetsLayout
  },
  props: { ...WidgetControlProps$a,
    widget: {
      type: Object,
      required: true
    },
    t: Function
  },

  data() {
    return {
      sortedPages: []
    };
  },

  computed: {
    currentPageIndex() {
      var _this$pageState, _this$pageState$widge, _this$pageState$widge2;

      return ((_this$pageState = this.pageState) === null || _this$pageState === void 0 ? void 0 : (_this$pageState$widge = _this$pageState.widgetState) === null || _this$pageState$widge === void 0 ? void 0 : (_this$pageState$widge2 = _this$pageState$widge[this.widget.id]) === null || _this$pageState$widge2 === void 0 ? void 0 : _this$pageState$widge2.currentPageIndex) || 0;
    }

  },
  watch: {
    currentPageIndex: {
      handler() {
        const viewedIndices = this.widget.getState('viewedIndices') || [];

        if (!viewedIndices.includes(this.currentPageIndex)) {
          this.widget.setState('viewedIndices', [...viewedIndices, this.currentPageIndex]);
        }
      },

      immediate: true
    },
    'widget.properties.pages': {
      handler() {
        this.sortedPages = this.widget.getSortedPages();
      },

      immediate: true
    }
  }
});

/* script */
const __vue_script__$W = script$W;
/* template */

var __vue_render__$W = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._l(_vm.sortedPages, function (page, pageIndex) {
    return _c('div', {
      key: pageIndex,
      attrs: {
        "id": "pages-" + _vm.widget.id + "-" + pageIndex
      }
    }, [_c('h3', [_vm._v(_vm._s(_vm.t(page.labelKey, _vm.widget.id)))]), _vm._v(" "), _c('widgets-layout', {
      attrs: {
        "widget-items": _vm.widgetItems,
        "exclude-widget-ids": [_vm.widget.id],
        "only-include-widget-ids": page.children,
        "widgets-order": page.children,
        "for-parent": _vm.widget.id
      }
    })], 1);
  }), 0);
};

var __vue_staticRenderFns__$W = [];
/* style */

const __vue_inject_styles__$W = function (inject) {
  if (!inject) return;
  inject("data-v-1e28174e_0", {
    source: ".pages-menu-wrapper[data-v-1e28174e]{display:flex;flex-direction:row;justify-content:center;margin:10px 0}.pages-menu-item[data-v-1e28174e]{display:inline-block;padding:10px 20px;cursor:pointer;text-align:center}.pages-menu-item.unopened[data-v-1e28174e]{opacity:.3;cursor:default}.pages-menu-item.active[data-v-1e28174e]{border-bottom:3px solid #03a9f4}.pages-menu-item.errors[data-v-1e28174e]{border-color:red}.back-forward-wrapper[data-v-1e28174e]{display:flex;flex-direction:row;justify-content:space-between}.back-forward-button[data-v-1e28174e]{padding:10px 20px;margin:10px;border:1px solid transparent;background-color:#03a9f4;color:#fff;cursor:pointer}.back-forward-button.errors[data-v-1e28174e]{background-color:red;color:#fff;opacity:.2;cursor:default}.back-forward-button.submitting[data-v-1e28174e]{opacity:.2}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$W = "data-v-1e28174e";
/* module identifier */

const __vue_module_identifier__$W = undefined;
/* functional template */

const __vue_is_functional_template__$W = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$Y = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$W,
  staticRenderFns: __vue_staticRenderFns__$W
}, __vue_inject_styles__$W, __vue_script__$W, __vue_scope_id__$W, __vue_is_functional_template__$W, __vue_module_identifier__$W, false, createInjector, undefined, undefined);

var ReadOnly$b = __vue_component__$Y;

var script$V = defineComponent({
  name: 'BuilderWidgetTree',
  props: {
    widgetItems: Object,
    parentId: String,
    // this overrides parentId, as this represents
    // the final list to display for this level
    listIds: Array,
    level: Number
  },
  inject: ['widgetControls'],

  data() {
    return {
      filteredWidgetItems: []
    };
  },

  computed: {
    changes() {
      return {
        listIds: this.$props.listIds,
        parentId: this.$props.parentId
      };
    }

  },
  watch: {
    changes: {
      handler(_ref) {
        let {
          listIds,
          parentId
        } = _ref;

        if (listIds) {
          this.$data.filteredWidgetItems = listIds.map(id => this.$props.widgetItems[id]);
        } else {
          this.$data.filteredWidgetItems = Object.values(this.$props.widgetItems).filter(wi => wi.parentId === parentId);
        }
      },

      immediate: true
    }
  }
});

/* script */
const __vue_script__$V = script$V;
/* template */

var __vue_render__$V = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "tree-level-wrapper"
  }, _vm._l(_vm.filteredWidgetItems, function (widgetItem) {
    return _c('div', {
      key: widgetItem.id,
      staticClass: "tree-item",
      style: {
        marginLeft: (_vm.level || 0) * 10 + "px"
      }
    }, [_c('div', {
      staticClass: "tree-item-box"
    }, [_c('span', {
      staticClass: "drag-icon"
    }, [_vm._v("☷")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(widgetItem.type))]), _vm._v(" "), _c('small', [_vm._v(_vm._s(widgetItem.code))])]), _vm._v(" "), _vm.widgetControls[widgetItem.type].widgetTree ? [_c(_vm.widgetControls[widgetItem.type].widgetTree, {
      tag: "component",
      attrs: {
        "widgetItems": _vm.widgetItems,
        "widgetItem": widgetItem,
        "parentId": widgetItem.id,
        "level": 1
      }
    })] : [_c('builder-widget-tree', {
      attrs: {
        "widgetItems": _vm.widgetItems,
        "parentId": widgetItem.id,
        "level": 1
      }
    })]], 2);
  }), 0);
};

var __vue_staticRenderFns__$V = [];
/* style */

const __vue_inject_styles__$V = function (inject) {
  if (!inject) return;
  inject("data-v-3c1fc8b6_0", {
    source: ".tree-item-box[data-v-3c1fc8b6]{border:1px solid #f2f2f2;border-radius:4px;padding:5px;margin:2px 0;display:flex;flex-direction:row;align-items:center}.tree-item-box>*[data-v-3c1fc8b6]{margin:0;margin-right:5px}.tree-item-box small[data-v-3c1fc8b6]{color:#a1a1a1}.drag-icon[data-v-3c1fc8b6]{cursor:grab}.drag-icon[data-v-3c1fc8b6]:active{cursor:grabbing}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$V = "data-v-3c1fc8b6";
/* module identifier */

const __vue_module_identifier__$V = undefined;
/* functional template */

const __vue_is_functional_template__$V = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$X = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$V,
  staticRenderFns: __vue_staticRenderFns__$V
}, __vue_inject_styles__$V, __vue_script__$V, __vue_scope_id__$V, __vue_is_functional_template__$V, __vue_module_identifier__$V, false, createInjector, undefined, undefined);

var BuilderWidgetTree = __vue_component__$X;

var script$U = defineComponent({
  components: {
    BuilderWidgetTree
  },
  props: {
    widgetItems: Object,
    widgetItem: Object,
    parentId: String,
    level: Number
  },
  inject: ['t', 'setMessage', 'getLocale'],
  methods: {
    onPageLabelChange(pageIndex, label) {
      this.setMessage({
        id: this.$props.widgetItem.id,
        locale: this.getLocale(),
        key: this.$props.widgetItem.properties.pages[pageIndex].labelKey,
        value: label
      });
    }

  }
});

/* script */
const __vue_script__$U = script$U;
/* template */

var __vue_render__$U = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._l(_vm.widgetItem.properties.pages, function (page, pageIndex) {
    return _c('div', {
      key: pageIndex
    }, [_c('div', {
      staticClass: "page-label"
    }, [_c('small', [_c('input', {
      domProps: {
        "value": _vm.t(_vm.widgetItem.id + "." + page.labelKey)
      },
      on: {
        "change": function (ev) {
          return _vm.onPageLabelChange(pageIndex, ev.target.value);
        }
      }
    })])]), _vm._v(" "), _c('builder-widget-tree', {
      attrs: {
        "widgetItems": _vm.widgetItems,
        "level": 1,
        "listIds": page.children
      }
    })], 1);
  }), 0);
};

var __vue_staticRenderFns__$U = [];
/* style */

const __vue_inject_styles__$U = function (inject) {
  if (!inject) return;
  inject("data-v-d2da775a_0", {
    source: ".page-label[data-v-d2da775a]{padding:6px}.page-label input[data-v-d2da775a]{border:none;outline:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$U = "data-v-d2da775a";
/* module identifier */

const __vue_module_identifier__$U = undefined;
/* functional template */

const __vue_is_functional_template__$U = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$W = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$U,
  staticRenderFns: __vue_staticRenderFns__$U
}, __vue_inject_styles__$U, __vue_script__$U, __vue_scope_id__$U, __vue_is_functional_template__$U, __vue_module_identifier__$U, false, createInjector, undefined, undefined);

var WidgetTree = __vue_component__$W;

var pages = {
  create(props) {
    return {
      id: v4(),
      type: 'pages',
      properties: {
        pages: [{
          labelKey: '',
          children: []
        }],
        navigationVisible: true,
        tabsVisible: true,
        hasCompleteButton: false,
        navigationIntegrateChildrenPages: false,
        detachParentIntegration: false,
        ...props
      }
    };
  },

  display: Display$b,
  builder: Builder$5,
  builderForm: BuilderForm$2,
  readOnly: ReadOnly$b,
  widgetItem: PagesWidgetItem,
  widgetTree: WidgetTree
};

var script$T = defineComponent({
  inject: ['questionControls', 'widgetControls', 'getPageState', 'setPageState', 'getLocale', 'setMessage'],
  props: {
    widget: {
      type: Object,
      required: true
    },
    widgetControls: {
      type: Object,
      required: true
    },
    widgetItems: {
      type: Object,
      required: true
    },
    pageState: {
      type: Object,
      required: true
    },
    setWidgetState: {
      type: Function,
      required: true
    },
    getWidgetState: {
      type: Function,
      required: true
    },
    t: Function,
    view: String
  },

  created() {
    var _this$widget$getState;

    this.widget.setState({
      type: 'question',
      ...(((_this$widget$getState = this.widget.getState()) === null || _this$widget$getState === void 0 ? void 0 : _this$widget$getState.touched) === undefined ? {
        touched: false,
        pristine: true,
        dirty: false
      } : {})
    });
  },

  mounted() {
    this.$nextTick(() => {
      if (!this.$refs.labelInput) return;
      this.$refs.labelInput.style.height = '';
      this.$refs.labelInput.style.height = this.$refs.labelInput.scrollHeight + 'px';
    });
  },

  methods: {
    updateText(name, text) {
      this.setMessage({
        id: this.$props.widget.id,
        locale: this.getLocale(),
        key: `__${name}`,
        value: text.replaceAll(/\n|\r/g, '')
      });
    },

    onChange(response, ignoreChecks) {
      var _this$widget;

      (_this$widget = this.widget) === null || _this$widget === void 0 ? void 0 : _this$widget.setState({
        response,
        ...(!ignoreChecks ? {
          touched: true,
          pristine: false,
          dirty: true
        } : {})
      });
      if (ignoreChecks) return;

      (async () => {
        // handle validations
        await this.widget.runValidations();
        this.widget.emitListener('change');
      })();
    }

  }
});

/* script */
const __vue_script__$T = script$T;
/* template */

var __vue_render__$T = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !_vm.widget.getState('reflexiveHide') ? _c('div', [_c('div', {
    staticClass: "question-wrapper"
  }, [!_vm.widget.properties.hideLabel ? _c('label', {
    class: {
      errors: (_vm.getWidgetState('errors') || []).length
    },
    attrs: {
      "for": _vm.widget.code || _vm.widget.id
    }
  }, [_c('textarea', {
    ref: "labelInput",
    staticClass: "text-input",
    attrs: {
      "oninput": "this.style.height = \"\";this.style.height = this.scrollHeight + \"px\""
    },
    domProps: {
      "value": _vm.t('__label', _vm.widget.id)
    },
    on: {
      "input": function (ev) {
        return _vm.updateText('label', ev.target.value);
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', [_c(_vm.questionControls[_vm.widget.properties.control].display, {
    tag: "component",
    attrs: {
      "properties": _vm.widget.properties.controlProperties,
      "widget": _vm.widget,
      "widget-items": _vm.widgetItems,
      "on-change": _vm.onChange,
      "value": _vm.widget.getState('response'),
      "set-widget-state": _vm.setWidgetState,
      "get-widget-state": _vm.getWidgetState,
      "view": _vm.view,
      "errors": _vm.getWidgetState('errors'),
      "t": function (key, data) {
        return _vm.t("control_" + key, data);
      }
    }
  }), _vm._v(" "), _vm.getWidgetState('dirty') && _vm.getWidgetState('errors') ? _vm._l(_vm.getWidgetState('errors').slice(0, 1), function (errorKey, errorKeyIndex) {
    return _c('span', {
      key: errorKey.err + "_" + errorKeyIndex,
      staticClass: "error"
    }, [_vm.t("control_" + errorKey.err) ? [_vm._v(_vm._s(_vm.t("control_" + errorKey.err, errorKey.data)))] : [_vm._v(_vm._s(_vm.t("" + errorKey.err, errorKey.data)))]], 2);
  }) : _vm._e()], 2)])]) : _vm._e();
};

var __vue_staticRenderFns__$T = [];
/* style */

const __vue_inject_styles__$T = function (inject) {
  if (!inject) return;
  inject("data-v-0020c860_0", {
    source: ".question-wrapper[data-v-0020c860]{width:100%;display:flex;flex-direction:row}.question-wrapper>label[data-v-0020c860]{flex:1;max-width:300px;border-right:1px solid #393939;padding:20px 0;margin-right:20px}.question-wrapper>label.errors[data-v-0020c860]{color:red}.question-wrapper>div[data-v-0020c860]{flex:2;padding:20px 0}.error[data-v-0020c860]{display:block;color:red;margin-top:10px}.text-input[data-v-0020c860]{font-size:inherit;font-weight:inherit;font-family:inherit;border:none;outline:0;width:100%;background-color:transparent;resize:none;min-height:10px;margin-bottom:-15px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$T = "data-v-0020c860";
/* module identifier */

const __vue_module_identifier__$T = undefined;
/* functional template */

const __vue_is_functional_template__$T = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$V = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$T,
  staticRenderFns: __vue_staticRenderFns__$T
}, __vue_inject_styles__$T, __vue_script__$T, __vue_scope_id__$T, __vue_is_functional_template__$T, __vue_module_identifier__$T, false, createInjector, undefined, undefined);

var Builder$4 = __vue_component__$V;

// import { validateWidget } from "../../validateUtils";

var script$S = defineComponent({
  props: {
    widget: {
      type: Object,
      required: true
    },
    widgetControls: {
      type: Object,
      required: true
    },
    widgetItems: {
      type: Object,
      required: true
    },
    pageState: {
      type: Object,
      required: true
    },
    setWidgetState: {
      type: Function,
      required: true
    },
    getWidgetState: {
      type: Function,
      required: true
    },
    t: Function,
    view: String
  },
  inject: ['questionControls', 'widgetControls', 'setPageState'],

  created() {
    var _this$widget;

    const widgetState = ((_this$widget = this.widget) === null || _this$widget === void 0 ? void 0 : _this$widget.getState()) || {};

    if (!widgetState.type || widgetState.touched === undefined) {
      var _this$widget2;

      (_this$widget2 = this.widget) === null || _this$widget2 === void 0 ? void 0 : _this$widget2.setState({
        type: 'question',
        ...(widgetState.touched === undefined ? {
          touched: false,
          pristine: true,
          dirty: false
        } : {})
      });
    }
  },

  unmounted() {},

  methods: {
    onChange(response, ignoreChecks) {
      var _this$widget3;

      (_this$widget3 = this.widget) === null || _this$widget3 === void 0 ? void 0 : _this$widget3.setState({
        response,
        ...(!ignoreChecks ? {
          touched: true,
          pristine: false,
          dirty: true
        } : {})
      });
      if (ignoreChecks) return;

      (async () => {
        var _this$widget4, _this$widget5;

        // handle validations
        await ((_this$widget4 = this.widget) === null || _this$widget4 === void 0 ? void 0 : _this$widget4.runValidations());
        (_this$widget5 = this.widget) === null || _this$widget5 === void 0 ? void 0 : _this$widget5.emitListener('change');
      })();
    },

    getQuestionControlRender(type) {
      var _this$questionControl;

      let view = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'display';
      const widgetType = (_this$questionControl = this.questionControls) === null || _this$questionControl === void 0 ? void 0 : _this$questionControl[type];

      if (!widgetType) {
        var _this$widget6;

        throw new Error(`question control type [${type}] from widget [${(_this$widget6 = this.widget) === null || _this$widget6 === void 0 ? void 0 : _this$widget6.id}] was not found. Maybe the question control was not imported`);
      }

      const widgetRender = widgetType[view];

      if (!widgetRender) {
        throw new Error(`widget view [${view}] does not exist for question control type [${type}]`);
      }

      return widgetRender;
    }

  }
});

/* script */
const __vue_script__$S = script$S;
/* template */

var __vue_render__$S = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !_vm.widget.getState('reflexiveHide') ? _c('div', [_c('div', {
    staticClass: "question-wrapper"
  }, [!_vm.widget.properties.hideLabel ? _c('label', {
    class: {
      errors: (_vm.getWidgetState('errors') || []).length
    },
    attrs: {
      "for": _vm.widget.code || _vm.widget.id
    }
  }, [_vm._v(_vm._s(_vm.t('__label', _vm.widget.id)))]) : _vm._e(), _vm._v(" "), _c('div', [_c(_vm.getQuestionControlRender(_vm.widget.properties.control), {
    tag: "component",
    attrs: {
      "id": "widget_question_" + _vm.widget.id,
      "data-test": "widget_question_" + _vm.widget.code,
      "properties": _vm.widget.properties.controlProperties,
      "widget": _vm.widget,
      "widgetItems": _vm.widgetItems,
      "questionItem": _vm.widget.questionItem,
      "onChange": _vm.onChange,
      "value": _vm.widget.getState('response'),
      "setWidgetState": _vm.setWidgetState,
      "getWidgetState": _vm.getWidgetState,
      "view": _vm.view,
      "errors": _vm.getWidgetState('errors'),
      "t": function (key, data) {
        return _vm.t("control_" + key, data);
      }
    },
    on: {
      "onChange": _vm.onChange,
      "t": function (key, data) {
        return _vm.t("control_" + key, data);
      },
      "setWidgetState": _vm.setWidgetState,
      "getWidgetState": _vm.getWidgetState
    }
  }), _vm._v(" "), _vm.getWidgetState('dirty') && _vm.getWidgetState('errors') ? _vm._l(_vm.getWidgetState('errors').slice(0, 1), function (errorKey, errorKeyIndex) {
    return _c('span', {
      key: errorKey.err + "_" + errorKeyIndex,
      staticClass: "error"
    }, [_vm.t("control_" + errorKey.err) ? [_vm._v(_vm._s(_vm.t("control_" + errorKey.err, errorKey.data)))] : [_vm._v(_vm._s(_vm.t("" + errorKey.err, errorKey.data)))]], 2);
  }) : _vm._e()], 2)])]) : _vm._e();
};

var __vue_staticRenderFns__$S = [];
/* style */

const __vue_inject_styles__$S = function (inject) {
  if (!inject) return;
  inject("data-v-fe1414d8_0", {
    source: ".question-wrapper[data-v-fe1414d8]{width:100%;display:flex;flex-direction:row}.question-wrapper>label[data-v-fe1414d8]{flex:1;max-width:300px;border-right:1px solid #393939;padding:20px 0;margin-right:20px}.question-wrapper>label.errors[data-v-fe1414d8]{color:red}.question-wrapper>div[data-v-fe1414d8]{flex:2;padding:20px 0}.error[data-v-fe1414d8]{display:block;color:red}@media only screen and (max-width:600px){.question-wrapper[data-v-fe1414d8]{flex-direction:column}.question-wrapper>label[data-v-fe1414d8]{border-right:none;padding:10px 0 5px 0}.question-wrapper>label.errors[data-v-fe1414d8]{color:#000}.question-wrapper>div[data-v-fe1414d8]{padding:5px 0 10px 0}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$S = "data-v-fe1414d8";
/* module identifier */

const __vue_module_identifier__$S = undefined;
/* functional template */

const __vue_is_functional_template__$S = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$U = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$S,
  staticRenderFns: __vue_staticRenderFns__$S
}, __vue_inject_styles__$S, __vue_script__$S, __vue_scope_id__$S, __vue_is_functional_template__$S, __vue_module_identifier__$S, false, createInjector, undefined, undefined);

var Display$a = __vue_component__$U;

class QuestionItem {
  get widget() {
    return this._widget;
  }

  constructor(_ref) {
    let {
      widget
    } = _ref;

    _defineProperty(this, "_widget", void 0);

    this._widget = widget;
  }

  destroy() {}

}

class QuestionWidgetItem extends WidgetItem {
  get questionItem() {
    return this._questionItem;
  }

  constructor(opts) {
    super(opts);

    _defineProperty(this, "questionControlErrors", []);

    _defineProperty(this, "_questionItem", void 0);

    const QuestionItemClass = opts.getQuestionControls()[this._widget.properties.control].questionItem || QuestionItem;
    this._questionItem = new QuestionItemClass({
      widget: this
    });
  }

  async setQuestionErrors(errors) {
    this.questionControlErrors = errors;
    await this.runValidations();
  }

  async runValidations(opts) {
    var _errors;

    let errors = [...this.questionControlErrors, ...((await super.runValidations(opts)) || [])];
    if (!((_errors = errors) !== null && _errors !== void 0 && _errors.length)) errors = null;
    this.setState({
      errors: errors || [],
      valid: !errors,
      hasErrors: !!errors
    });
    const parentIds = this.getParentIds();
    (parentIds || []).forEach(parentId => {
      this._widgetItems[parentId].setChildErrors(this.id, errors);
    });
    return errors;
  }

  destroy() {
    super.destroy();
    this.questionItem.destroy();
  }

}

let WidgetControlProps$9 = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$R = defineComponent({
  inject: ['questionControls', 'widgetControls', 'getPageState', 'setPageState'],
  props: WidgetControlProps$9,
  computed: {
    pageState() {
      return this.getPageState();
    }

  },

  created() {},

  unmounted() {},

  methods: {
    onChange(response) {
      this.setWidgetState('response', response);
    }

  }
});

/* script */
const __vue_script__$R = script$R;
/* template */

var __vue_render__$R = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !_vm.getWidgetState('reflexiveHide') ? _c('div', [_c('div', {
    staticClass: "question-wrapper"
  }, [!_vm.widget.properties.hideLabel ? _c('label', [_vm._v(_vm._s(_vm.t('__label', _vm.widget.id)))]) : _vm._e(), _vm._v(" "), _c('div', [_c(_vm.questionControls[_vm.widget.properties.control].readOnly, {
    tag: "component",
    attrs: {
      "properties": _vm.widget.properties.controlProperties,
      "widget": _vm.widget,
      "on-change": _vm.onChange,
      "value": _vm.getWidgetState('response'),
      "set-widget-state": _vm.setWidgetState,
      "get-widget-state": _vm.getWidgetState,
      "view": _vm.view,
      "t": _vm.t
    }
  })], 1)])]) : _vm._e();
};

var __vue_staticRenderFns__$R = [];
/* style */

const __vue_inject_styles__$R = function (inject) {
  if (!inject) return;
  inject("data-v-38a5845c_0", {
    source: ".question-wrapper[data-v-38a5845c]{width:100%;display:flex;flex-direction:row;padding:10px 10px}.question-wrapper>label[data-v-38a5845c]{flex:1;max-width:300px;border-right:1px solid #393939;padding:10px 0}.question-wrapper>div[data-v-38a5845c]{flex:2;padding:10px 20px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$R = "data-v-38a5845c";
/* module identifier */

const __vue_module_identifier__$R = undefined;
/* functional template */

const __vue_is_functional_template__$R = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$T = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$R,
  staticRenderFns: __vue_staticRenderFns__$R
}, __vue_inject_styles__$R, __vue_script__$R, __vue_scope_id__$R, __vue_is_functional_template__$R, __vue_module_identifier__$R, false, createInjector, undefined, undefined);

var ReadOnly$a = __vue_component__$T;

var question = {
  create(props) {
    return {
      id: v4(),
      type: 'question',
      properties: {
        responseType: '',
        hideLabel: false,
        control: '',
        controlProperties: {},
        ...props
      }
    };
  },

  display: Display$a,
  builder: Builder$4,
  readOnly: ReadOnly$a,
  widgetItem: QuestionWidgetItem
};

const WidgetControlProps$8 = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$Q = defineComponent({
  components: {
    BuilderWidgetsLayout,
    WidgetsLayout
  },
  inject: ['getLocale', 'setMessage'],
  props: WidgetControlProps$8,

  setup() {},

  computed: {
    label() {
      var _this$t;

      return (_this$t = this.t) === null || _this$t === void 0 ? void 0 : _this$t.call(this, '__label', this.widget.id);
    },

    childErrors() {
      var _this$widget$getState;

      return (_this$widget$getState = this.widget.getState()) === null || _this$widget$getState === void 0 ? void 0 : _this$widget$getState.childErrors;
    },

    hasChildErrors() {
      return this.widget.hasChildErrors();
    }

  },
  methods: {
    updateText(name, text) {
      this.setMessage({
        id: this.widget.id,
        locale: this.getLocale(),
        key: `__${name}`,
        value: text.replaceAll(/\n|\r/g, '')
      });
    },

    isShowLabel(pos) {
      return this.widget.properties.hasLabel && this.widget.properties.labelPosition === pos;
    }

  }
});

/* script */
const __vue_script__$Q = script$Q;
/* template */

var __vue_render__$Q = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('section', {
    staticClass: "section-wrapper",
    class: {
      errors: _vm.hasChildErrors
    }
  }, [_c('label', [_c('input', {
    staticClass: "text-input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.label
    },
    on: {
      "input": function (ev) {
        return _vm.updateText('label', ev.target.value);
      }
    }
  })]), _vm._v(" "), _c('builder-widgets-layout', {
    attrs: {
      "widget-controls": _vm.widgetControls,
      "widget-items": _vm.widgetItems,
      "for-parent": _vm.widget.id
    }
  })], 1);
};

var __vue_staticRenderFns__$Q = [];
/* style */

const __vue_inject_styles__$Q = function (inject) {
  if (!inject) return;
  inject("data-v-47295f4d_0", {
    source: ".section-wrapper[data-v-47295f4d]{position:relative;border:1px solid #a9a9a9;min-height:30px;padding:10px;margin:10px 0;border-radius:8px}.section-wrapper>label[data-v-47295f4d]{position:absolute;top:0;left:10px;transform:translateY(-50%);background-color:#fff;padding:1px 10px;z-index:10}.section-wrapper.errors[data-v-47295f4d]{border-color:red}.text-input[data-v-47295f4d]{font-size:inherit;font-weight:inherit;font-family:inherit;border:none;outline:0;width:100%;background-color:transparent;resize:none;min-height:10px;margin-bottom:-15px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$Q = "data-v-47295f4d";
/* module identifier */

const __vue_module_identifier__$Q = undefined;
/* functional template */

const __vue_is_functional_template__$Q = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$S = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$Q,
  staticRenderFns: __vue_staticRenderFns__$Q
}, __vue_inject_styles__$Q, __vue_script__$Q, __vue_scope_id__$Q, __vue_is_functional_template__$Q, __vue_module_identifier__$Q, false, createInjector, undefined, undefined);

var Builder$3 = __vue_component__$S;

var script$P = defineComponent({
  inject: ['updateWidget'],
  props: {
    widget: Object
  }
});

/* script */
const __vue_script__$P = script$P;
/* template */

var __vue_render__$P = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v("section builder form")]);
};

var __vue_staticRenderFns__$P = [];
/* style */

const __vue_inject_styles__$P = undefined;
/* scoped */

const __vue_scope_id__$P = undefined;
/* module identifier */

const __vue_module_identifier__$P = undefined;
/* functional template */

const __vue_is_functional_template__$P = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$R = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$P,
  staticRenderFns: __vue_staticRenderFns__$P
}, __vue_inject_styles__$P, __vue_script__$P, __vue_scope_id__$P, __vue_is_functional_template__$P, __vue_module_identifier__$P, false, undefined, undefined, undefined);

var BuilderForm$1 = __vue_component__$R;

const WidgetControlProps$7 = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$O = defineComponent({
  components: {
    WidgetsLayout
  },
  props: WidgetControlProps$7,

  setup() {},

  computed: {
    label() {
      var _this$t;

      return (_this$t = this.t) === null || _this$t === void 0 ? void 0 : _this$t.call(this, '__label', this.widget.id);
    },

    childErrors() {
      var _this$widget$getState;

      return (_this$widget$getState = this.widget.getState()) === null || _this$widget$getState === void 0 ? void 0 : _this$widget$getState.childErrors;
    },

    hasChildErrors() {
      return this.widget.hasChildErrors();
    }

  },
  methods: {
    isShowLabel(pos) {
      return this.widget.properties.hasLabel && this.widget.properties.labelPosition === pos;
    }

  }
});

/* script */
const __vue_script__$O = script$O;
/* template */

var __vue_render__$O = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('section', {
    staticClass: "section-wrapper",
    class: {
      errors: _vm.hasChildErrors
    }
  }, [!!_vm.label ? _c('label', [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _c('widgets-layout', {
    attrs: {
      "widget-controls": _vm.widgetControls,
      "widget-items": _vm.widgetItems,
      "for-parent": _vm.widget.id
    }
  })], 1);
};

var __vue_staticRenderFns__$O = [];
/* style */

const __vue_inject_styles__$O = function (inject) {
  if (!inject) return;
  inject("data-v-cc68ccc6_0", {
    source: ".section-wrapper[data-v-cc68ccc6]{position:relative;border:1px solid #a9a9a9;min-height:30px;padding:10px;margin:10px 0;border-radius:8px}.section-wrapper>label[data-v-cc68ccc6]{position:absolute;top:0;left:10px;transform:translateY(-50%);background-color:#fff;padding:10px}.section-wrapper.errors[data-v-cc68ccc6]{border-color:red}@media only screen and (max-width:600px){.section-wrapper label[data-v-cc68ccc6]{font-size:10pt}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$O = "data-v-cc68ccc6";
/* module identifier */

const __vue_module_identifier__$O = undefined;
/* functional template */

const __vue_is_functional_template__$O = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$Q = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$O,
  staticRenderFns: __vue_staticRenderFns__$O
}, __vue_inject_styles__$O, __vue_script__$O, __vue_scope_id__$O, __vue_is_functional_template__$O, __vue_module_identifier__$O, false, createInjector, undefined, undefined);

var Display$9 = __vue_component__$Q;

let WidgetControlProps$6 = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$N = defineComponent({
  components: {
    WidgetsLayout
  },
  props: WidgetControlProps$6,

  setup() {},

  computed: {
    label() {
      var _this$t, _this$widget;

      return (_this$t = this.t) === null || _this$t === void 0 ? void 0 : _this$t.call(this, '__label', (_this$widget = this.widget) === null || _this$widget === void 0 ? void 0 : _this$widget.id);
    }

  },
  methods: {
    isShowLabel(pos) {
      var _this$widget2, _this$widget3;

      return ((_this$widget2 = this.widget) === null || _this$widget2 === void 0 ? void 0 : _this$widget2.properties.hasLabel) && ((_this$widget3 = this.widget) === null || _this$widget3 === void 0 ? void 0 : _this$widget3.properties.labelPosition) === pos;
    }

  }
});

/* script */
const __vue_script__$N = script$N;
/* template */

var __vue_render__$N = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('section', {
    staticClass: "section-wrapper"
  }, [!!_vm.label ? _c('label', [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _c('widgets-layout', {
    attrs: {
      "widget-controls": _vm.widgetControls,
      "widget-items": _vm.widgetItems,
      "for-parent": _vm.widget.id
    }
  })], 1);
};

var __vue_staticRenderFns__$N = [];
/* style */

const __vue_inject_styles__$N = function (inject) {
  if (!inject) return;
  inject("data-v-b08fbba2_0", {
    source: ".section-wrapper[data-v-b08fbba2]{position:relative;border:1px solid #a9a9a9;min-height:30px;padding:10px;margin:10px;border-radius:8px}.section-wrapper>label[data-v-b08fbba2]{position:absolute;top:0;left:10px;transform:translateY(-50%);background-color:#fff;padding:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$N = "data-v-b08fbba2";
/* module identifier */

const __vue_module_identifier__$N = undefined;
/* functional template */

const __vue_is_functional_template__$N = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$P = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$N,
  staticRenderFns: __vue_staticRenderFns__$N
}, __vue_inject_styles__$N, __vue_script__$N, __vue_scope_id__$N, __vue_is_functional_template__$N, __vue_module_identifier__$N, false, createInjector, undefined, undefined);

var ReadOnly$9 = __vue_component__$P;

class SectionWidgetItem extends WidgetItem {
  constructor(opts) {
    super(opts);
  }

  getChildrenIds() {
    return this.properties.children;
  }

  addChild(childWidget, meta) {
    super.addChild(childWidget, meta);

    this._widget.properties.children.splice((meta === null || meta === void 0 ? void 0 : meta.idx) || 0, 0, childWidget.id);
  }

  removeChild(childWidget) {
    super.removeChild(childWidget);

    const removeIdx = this._widget.properties.children.findIndex(c => c === childWidget.id);

    if (removeIdx > -1) this._widget.properties.children.splice(removeIdx, 1);
  }

}

var section = {
  create(props) {
    return {
      id: v4(),
      type: 'section',
      properties: {
        children: [],
        ...props
      }
    };
  },

  display: Display$9,
  builder: Builder$3,
  builderForm: BuilderForm$1,
  readOnly: ReadOnly$9,
  widgetItem: SectionWidgetItem
};

const WidgetControlProps$5 = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$M = defineComponent({
  inject: ['getLocale', 'setMessage'],
  props: WidgetControlProps$5,

  setup() {},

  computed: {
    label() {
      var _this$t;

      return (_this$t = this.t) === null || _this$t === void 0 ? void 0 : _this$t.call(this, '__label', this.widget.id);
    }

  },
  methods: {
    updateText(name, text) {
      this.setMessage({
        id: this.$props.widget.id,
        locale: this.getLocale(),
        key: `__${name}`,
        value: text.replaceAll(/\n|\r/g, '')
      });
    },

    isShowLabel(pos) {
      return this.$props.widget.properties.hasLabel && this.$props.widget.properties.labelPosition === pos;
    }

  }
});

/* script */
const __vue_script__$M = script$M;
/* template */

var __vue_render__$M = function () {
  var _obj, _obj$1, _obj$2;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "line-wrapper",
    class: {
      vertical: _vm.widget.properties.dir === 'vertical'
    }
  }, [_vm.isShowLabel('start') ? _c('label', {
    class: (_obj = {}, _obj[_vm.widget.properties.labelPosition || 'start'] = true, _obj)
  }, [_c('input', {
    staticClass: "text-input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.label
    },
    on: {
      "input": function (ev) {
        return _vm.updateText('label', ev.target.value);
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "line"
  }), _vm._v(" "), _vm.isShowLabel('center') ? _c('label', {
    class: (_obj$1 = {}, _obj$1[_vm.widget.properties.labelPosition || 'start'] = true, _obj$1)
  }, [_c('input', {
    staticClass: "text-input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.label
    },
    on: {
      "input": function (ev) {
        return _vm.updateText('label', ev.target.value);
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "line"
  }), _vm._v(" "), _vm.isShowLabel('end') ? _c('label', {
    class: (_obj$2 = {}, _obj$2[_vm.widget.properties.labelPosition || 'start'] = true, _obj$2)
  }, [_c('input', {
    staticClass: "text-input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.label
    },
    on: {
      "input": function (ev) {
        return _vm.updateText('label', ev.target.value);
      }
    }
  })]) : _vm._e()]);
};

var __vue_staticRenderFns__$M = [];
/* style */

const __vue_inject_styles__$M = function (inject) {
  if (!inject) return;
  inject("data-v-bba692ee_0", {
    source: ".line-wrapper[data-v-bba692ee]{display:flex;flex-direction:row;align-items:center;padding:10px 0}.line-wrapper.vertical[data-v-bba692ee]{flex-direction:column}.line-wrapper .line[data-v-bba692ee]{flex:1;background-color:#a0a0a0;height:1px}.line-wrapper.vertical .line[data-v-bba692ee]{width:1px}.line-wrapper label[data-v-bba692ee]{padding:10px;background-color:rgba(255,255,255,.5);border-radius:10px}.line-wrapper label.start[data-v-bba692ee]{padding-left:0}.line-wrapper label.end[data-v-bba692ee]{padding-right:0}.text-input[data-v-bba692ee]{font-size:inherit;font-weight:inherit;font-family:inherit;border:none;outline:0;width:100%;background-color:transparent;resize:none;min-height:10px;margin-bottom:-15px}.start .text-input[data-v-bba692ee]{text-align:left}.center .text-input[data-v-bba692ee]{text-align:center}.end .text-input[data-v-bba692ee]{text-align:right}.line-wrapper.vertical .text-input[data-v-bba692ee]{text-align:center}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$M = "data-v-bba692ee";
/* module identifier */

const __vue_module_identifier__$M = undefined;
/* functional template */

const __vue_is_functional_template__$M = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$O = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$M,
  staticRenderFns: __vue_staticRenderFns__$M
}, __vue_inject_styles__$M, __vue_script__$M, __vue_scope_id__$M, __vue_is_functional_template__$M, __vue_module_identifier__$M, false, createInjector, undefined, undefined);

var Builder$2 = __vue_component__$O;

var script$L = defineComponent({
  props: {
    widget: {
      type: WidgetItem,
      required: true
    }
  },
  inject: ['updateWidget'],
  methods: {
    setLabelPosition(labelPosition) {
      this.$props.widget.properties.labelPosition = labelPosition;
      this.updateWidget(this.$props.widget);
    }

  }
});

/* script */
const __vue_script__$L = script$L;
/* template */

var __vue_render__$L = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('div', {
    staticClass: "fieldItem"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Label Position")]), _vm._v(" "), _c('div', {
    staticClass: "button-group"
  }, [_c('button', {
    staticClass: "button-item",
    class: {
      active: _vm.widget.properties.labelPosition === 'start'
    },
    on: {
      "click": function () {
        return _vm.setLabelPosition('start');
      }
    }
  }, [_vm._v("\n        start\n      ")]), _vm._v(" "), _c('button', {
    staticClass: "button-item",
    class: {
      active: _vm.widget.properties.labelPosition === 'center'
    },
    on: {
      "click": function () {
        return _vm.setLabelPosition('center');
      }
    }
  }, [_vm._v("\n        center\n      ")]), _vm._v(" "), _c('button', {
    staticClass: "button-item",
    class: {
      active: _vm.widget.properties.labelPosition === 'end'
    },
    on: {
      "click": function () {
        return _vm.setLabelPosition('end');
      }
    }
  }, [_vm._v("\n        end\n      ")])])])]);
};

var __vue_staticRenderFns__$L = [];
/* style */

const __vue_inject_styles__$L = function (inject) {
  if (!inject) return;
  inject("data-v-423a58fa_0", {
    source: ".fieldItem[data-v-423a58fa]{padding:10px}.fieldItem>.label[data-v-423a58fa]{display:block;padding:10px 0}.button-group[data-v-423a58fa]{position:relative;display:flex;flex-direction:row;border-radius:4px;overflow:hidden;width:100%;max-width:300px}.button-item[data-v-423a58fa]{padding:5px 10px;border:none;flex:1;cursor:pointer}.button-item.active[data-v-423a58fa]{background-color:#03a9f4;color:#fff}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$L = "data-v-423a58fa";
/* module identifier */

const __vue_module_identifier__$L = undefined;
/* functional template */

const __vue_is_functional_template__$L = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$N = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$L,
  staticRenderFns: __vue_staticRenderFns__$L
}, __vue_inject_styles__$L, __vue_script__$L, __vue_scope_id__$L, __vue_is_functional_template__$L, __vue_module_identifier__$L, false, createInjector, undefined, undefined);

var BuilderForm = __vue_component__$N;

const WidgetControlProps$4 = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$K = defineComponent({
  props: WidgetControlProps$4,

  setup() {},

  computed: {
    label() {
      var _this$t;

      return (_this$t = this.t) === null || _this$t === void 0 ? void 0 : _this$t.call(this, '__label', this.widget.id);
    }

  },
  methods: {
    isShowLabel(pos) {
      return this.widget.properties.hasLabel && this.widget.properties.labelPosition === pos;
    }

  }
});

/* script */
const __vue_script__$K = script$K;
/* template */

var __vue_render__$K = function () {
  var _obj, _obj$1, _obj$2;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "line-wrapper",
    class: {
      vertical: _vm.widget.properties.dir === 'vertical'
    }
  }, [_vm.isShowLabel('start') ? _c('label', {
    class: (_obj = {}, _obj[_vm.widget.properties.labelPosition || 'start'] = true, _obj)
  }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "line"
  }), _vm._v(" "), _vm.isShowLabel('center') ? _c('label', {
    class: (_obj$1 = {}, _obj$1[_vm.widget.properties.labelPosition || 'start'] = true, _obj$1)
  }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "line"
  }), _vm._v(" "), _vm.isShowLabel('end') ? _c('label', {
    class: (_obj$2 = {}, _obj$2[_vm.widget.properties.labelPosition || 'start'] = true, _obj$2)
  }, [_vm._v(_vm._s(_vm.label))]) : _vm._e()]);
};

var __vue_staticRenderFns__$K = [];
/* style */

const __vue_inject_styles__$K = function (inject) {
  if (!inject) return;
  inject("data-v-84f25dd2_0", {
    source: ".line-wrapper[data-v-84f25dd2]{display:flex;flex-direction:row;align-items:center;padding:10px 0}.line-wrapper.vertical[data-v-84f25dd2]{flex-direction:column}.line-wrapper .line[data-v-84f25dd2]{flex:1;background-color:#a0a0a0;height:1px}.line-wrapper.vertical .line[data-v-84f25dd2]{width:1px}.line-wrapper label[data-v-84f25dd2]{padding:10px;background-color:rgba(255,255,255,.5);border-radius:10px}.line-wrapper label.start[data-v-84f25dd2]{padding-left:0}.line-wrapper label.end[data-v-84f25dd2]{padding-right:0}@media only screen and (max-width:600px){.line-wrapper label[data-v-84f25dd2]{font-size:10pt}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$K = "data-v-84f25dd2";
/* module identifier */

const __vue_module_identifier__$K = undefined;
/* functional template */

const __vue_is_functional_template__$K = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$M = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$K,
  staticRenderFns: __vue_staticRenderFns__$K
}, __vue_inject_styles__$K, __vue_script__$K, __vue_scope_id__$K, __vue_is_functional_template__$K, __vue_module_identifier__$K, false, createInjector, undefined, undefined);

var Display$8 = __vue_component__$M;

let WidgetControlProps$3 = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$J = defineComponent({
  props: WidgetControlProps$3,

  setup() {},

  computed: {
    label() {
      var _this$t, _this$widget;

      return (_this$t = this.t) === null || _this$t === void 0 ? void 0 : _this$t.call(this, '__label', (_this$widget = this.widget) === null || _this$widget === void 0 ? void 0 : _this$widget.id);
    }

  },
  methods: {
    isShowLabel(pos) {
      var _this$widget2, _this$widget3;

      return ((_this$widget2 = this.widget) === null || _this$widget2 === void 0 ? void 0 : _this$widget2.properties.hasLabel) && ((_this$widget3 = this.widget) === null || _this$widget3 === void 0 ? void 0 : _this$widget3.properties.labelPosition) === pos;
    }

  }
});

/* script */
const __vue_script__$J = script$J;
/* template */

var __vue_render__$J = function () {
  var _obj, _obj$1, _obj$2;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "line-wrapper",
    class: {
      vertical: _vm.widget.properties.dir === 'vertical'
    }
  }, [_vm.isShowLabel('start') ? _c('label', {
    class: (_obj = {}, _obj[_vm.widget.properties.labelPosition || 'start'] = true, _obj)
  }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "line"
  }), _vm._v(" "), _vm.isShowLabel('center') ? _c('label', {
    class: (_obj$1 = {}, _obj$1[_vm.widget.properties.labelPosition || 'start'] = true, _obj$1)
  }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "line"
  }), _vm._v(" "), _vm.isShowLabel('end') ? _c('label', {
    class: (_obj$2 = {}, _obj$2[_vm.widget.properties.labelPosition || 'start'] = true, _obj$2)
  }, [_vm._v(_vm._s(_vm.label))]) : _vm._e()]);
};

var __vue_staticRenderFns__$J = [];
/* style */

const __vue_inject_styles__$J = function (inject) {
  if (!inject) return;
  inject("data-v-5fb0eccc_0", {
    source: ".line-wrapper[data-v-5fb0eccc]{display:flex;flex-direction:row;align-items:center;padding:10px}.line-wrapper.vertical[data-v-5fb0eccc]{flex-direction:column}.line-wrapper .line[data-v-5fb0eccc]{flex:1;background-color:#a0a0a0;height:1px}.line-wrapper.vertical .line[data-v-5fb0eccc]{width:1px}.line-wrapper label[data-v-5fb0eccc]{padding:10px;background-color:rgba(255,255,255,.5);border-radius:10px}.line-wrapper label.start[data-v-5fb0eccc]{padding-left:0}.line-wrapper label.end[data-v-5fb0eccc]{padding-right:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$J = "data-v-5fb0eccc";
/* module identifier */

const __vue_module_identifier__$J = undefined;
/* functional template */

const __vue_is_functional_template__$J = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$L = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$J,
  staticRenderFns: __vue_staticRenderFns__$J
}, __vue_inject_styles__$J, __vue_script__$J, __vue_scope_id__$J, __vue_is_functional_template__$J, __vue_module_identifier__$J, false, createInjector, undefined, undefined);

var ReadOnly$8 = __vue_component__$L;

var separator = {
  create(props) {
    return {
      id: v4(),
      type: 'separator',
      properties: {
        dir: 'horizontal',
        hasLabel: true,
        labelPosition: 'start',
        ...props
      }
    };
  },

  display: Display$8,
  builder: Builder$2,
  builderForm: BuilderForm,
  readOnly: ReadOnly$8
};

const WidgetControlProps$2 = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$I = defineComponent({
  props: WidgetControlProps$2,
  inject: ['getLocale', 'setMessage'],
  methods: {
    onTextChange(val) {
      this.setMessage({
        id: this.$props.widget.id,
        locale: this.getLocale(),
        key: '__label',
        value: val.target.value
      });
    }

  }
});

/* script */
const __vue_script__$I = script$I;
/* template */

var __vue_render__$I = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.widget.properties.tagType, {
    tag: "component",
    staticClass: "text"
  }, [_c('input', {
    staticClass: "text-input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.t('__label', _vm.widget.id)
    },
    on: {
      "input": _vm.onTextChange
    }
  })]);
};

var __vue_staticRenderFns__$I = [];
/* style */

const __vue_inject_styles__$I = function (inject) {
  if (!inject) return;
  inject("data-v-016e0c50_0", {
    source: ".text-input[data-v-016e0c50]{font-size:inherit;font-family:inherit;font-weight:inherit;outline:0;border:none;width:100%;background-color:transparent}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$I = "data-v-016e0c50";
/* module identifier */

const __vue_module_identifier__$I = undefined;
/* functional template */

const __vue_is_functional_template__$I = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$K = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$I,
  staticRenderFns: __vue_staticRenderFns__$I
}, __vue_inject_styles__$I, __vue_script__$I, __vue_scope_id__$I, __vue_is_functional_template__$I, __vue_module_identifier__$I, false, createInjector, undefined, undefined);

var Builder$1 = __vue_component__$K;

const WidgetControlProps$1 = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$H = defineComponent({
  props: WidgetControlProps$1,
  inject: ['updateWidget'],
  methods: {
    setTagType(type) {
      this.widget.properties.tagType = type;
      this.updateWidget(this.widget);
    }

  }
});

/* script */
const __vue_script__$H = script$H;
/* template */

var __vue_render__$H = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "control-wrapper"
  }, [_c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'h1'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('h1');
      }
    }
  }, [_vm._v("H1")]), _vm._v(" "), _c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'h2'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('h2');
      }
    }
  }, [_vm._v("H2")]), _vm._v(" "), _c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'h3'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('h3');
      }
    }
  }, [_vm._v("H3")]), _vm._v(" "), _c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'h4'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('h4');
      }
    }
  }, [_vm._v("H4")]), _vm._v(" "), _c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'h5'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('h5');
      }
    }
  }, [_vm._v("H5")]), _vm._v(" "), _c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'h6'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('h6');
      }
    }
  }, [_vm._v("H6")]), _vm._v(" "), _c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'p'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('p');
      }
    }
  }, [_vm._v("Paragraph")]), _vm._v(" "), _c('a', {
    staticClass: "tag-selection",
    class: {
      selected: _vm.widget.properties.tagType === 'small'
    },
    on: {
      "click": function (ev) {
        return _vm.setTagType('small');
      }
    }
  }, [_vm._v("Small")])]);
};

var __vue_staticRenderFns__$H = [];
/* style */

const __vue_inject_styles__$H = function (inject) {
  if (!inject) return;
  inject("data-v-f76b79c0_0", {
    source: ".control-wrapper[data-v-f76b79c0]{display:flex;flex-direction:row;border-radius:8px;border:1px solid #e8e8e8;background-color:#fff;overflow:hidden}.tag-selection[data-v-f76b79c0]{height:30px;min-width:40px;padding:0 5px;display:flex;align-items:center;justify-content:center;cursor:pointer}.tag-selection[data-v-f76b79c0]:hover{background-color:#e8e8e8}.tag-selection.selected[data-v-f76b79c0]{background-color:#03a9f4;color:#fff}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$H = "data-v-f76b79c0";
/* module identifier */

const __vue_module_identifier__$H = undefined;
/* functional template */

const __vue_is_functional_template__$H = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$J = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$H,
  staticRenderFns: __vue_staticRenderFns__$H
}, __vue_inject_styles__$H, __vue_script__$H, __vue_scope_id__$H, __vue_is_functional_template__$H, __vue_module_identifier__$H, false, createInjector, undefined, undefined);

var BuilderControl = __vue_component__$J;

var script$G = defineComponent({
  props: {
    widget: {
      type: Object,
      required: true
    },
    widgetControls: {
      type: Object,
      required: true
    },
    widgetItems: {
      type: Object,
      required: true
    },
    pageState: {
      type: Object,
      required: true
    },
    setWidgetState: {
      type: Function,
      required: true
    },
    getWidgetState: {
      type: Function,
      required: true
    },
    t: Function,
    view: String
  }
});

/* script */
const __vue_script__$G = script$G;
/* template */

var __vue_render__$G = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.widget.properties.tagType, {
    tag: "component",
    staticClass: "text",
    attrs: {
      "maxlength": _vm.widget.properties.maxLength
    }
  }, [_vm._v("\n  " + _vm._s(_vm.t('__label', _vm.widget.id)) + "\n")]);
};

var __vue_staticRenderFns__$G = [];
/* style */

const __vue_inject_styles__$G = undefined;
/* scoped */

const __vue_scope_id__$G = "data-v-33c0476c";
/* module identifier */

const __vue_module_identifier__$G = undefined;
/* functional template */

const __vue_is_functional_template__$G = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$I = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$G,
  staticRenderFns: __vue_staticRenderFns__$G
}, __vue_inject_styles__$G, __vue_script__$G, __vue_scope_id__$G, __vue_is_functional_template__$G, __vue_module_identifier__$G, false, undefined, undefined, undefined);

var Display$7 = __vue_component__$I;

let WidgetControlProps = {
  widget: {
    type: Object,
    required: true
  },
  widgetControls: {
    type: Object,
    required: true
  },
  widgetItems: {
    type: Object,
    required: true
  },
  pageState: {
    type: Object,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true
  },
  t: Function,
  properties: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$F = defineComponent({
  props: WidgetControlProps
});

/* script */
const __vue_script__$F = script$F;
/* template */

var __vue_render__$F = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.widget.properties.tagType, {
    tag: "component",
    staticClass: "text",
    class: [_vm.widget.properties.tagType]
  }, [_vm._v("\n  " + _vm._s(_vm.t('__label')) + "\n")]);
};

var __vue_staticRenderFns__$F = [];
/* style */

const __vue_inject_styles__$F = undefined;
/* scoped */

const __vue_scope_id__$F = "data-v-e1dae31a";
/* module identifier */

const __vue_module_identifier__$F = undefined;
/* functional template */

const __vue_is_functional_template__$F = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$H = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$F,
  staticRenderFns: __vue_staticRenderFns__$F
}, __vue_inject_styles__$F, __vue_script__$F, __vue_scope_id__$F, __vue_is_functional_template__$F, __vue_module_identifier__$F, false, undefined, undefined, undefined);

var ReadOnly$7 = __vue_component__$H;

var text$1 = {
  create(props) {
    return {
      id: v4(),
      type: 'text',
      properties: {
        tagType: 'p',
        ...props
      }
    };
  },

  display: Display$7,
  builder: Builder$1,
  builderControl: BuilderControl,
  readOnly: ReadOnly$7
};

const widgets = {
  alert,
  header,
  html,
  pages,
  question,
  section,
  separator,
  text: text$1
};

class WidgetEffectControl {
  constructor(_ref) {
    let {
      display,
      form,
      name,
      key,
      create
    } = _ref;

    _defineProperty(this, "_display", void 0);

    _defineProperty(this, "_form", void 0);

    _defineProperty(this, "_name", void 0);

    _defineProperty(this, "_key", void 0);

    _defineProperty(this, "_create", void 0);

    this._create = create;
    this._key = key;
    this._name = name;
    this._display = display;
    this._form = form;
  }

  get create() {
    return this._create;
  }

  get display() {
    return this._display;
  }

  get form() {
    return this._form;
  }

  get name() {
    return this._name;
  }

  get key() {
    return this._key;
  }

}

//
var script$E = defineComponent({
  props: {
    wrapperRef: HTMLDivElement,
    properties: Object
  }
});

/* script */
const __vue_script__$E = script$E;
/* template */

var __vue_render__$E = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('a', {
    staticClass: "anchor",
    style: {
      top: (_vm.properties.top || 0) + 'px'
    },
    attrs: {
      "id": _vm.$props.properties.id
    }
  });
};

var __vue_staticRenderFns__$E = [];
/* style */

const __vue_inject_styles__$E = function (inject) {
  if (!inject) return;
  inject("data-v-6d640e86_0", {
    source: "a.anchor[data-v-6d640e86]{position:absolute;top:0;left:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$E = "data-v-6d640e86";
/* module identifier */

const __vue_module_identifier__$E = undefined;
/* functional template */

const __vue_is_functional_template__$E = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$G = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$E,
  staticRenderFns: __vue_staticRenderFns__$E
}, __vue_inject_styles__$E, __vue_script__$E, __vue_scope_id__$E, __vue_is_functional_template__$E, __vue_module_identifier__$E, false, createInjector, undefined, undefined);

var display$1 = __vue_component__$G;

var script$D = defineComponent({
  props: {
    effect: Object,
    properties: Object,
    widgetItem: Object
  },
  methods: {
    onChange(key, value) {
      this.$emit('onPropertiesChange', { ...this.$props.properties,
        [key]: value
      });
    }

  }
});

/* script */
const __vue_script__$D = script$D;
/* template */

var __vue_render__$D = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('div', {
    staticClass: "field-wrapper"
  }, [_c('label', {
    attrs: {
      "for": "id"
    }
  }, [_vm._v("ID")]), _vm._v(" "), _c('input', {
    attrs: {
      "id": "id",
      "type": "text"
    },
    domProps: {
      "value": _vm.properties.id
    },
    on: {
      "change": function (ev) {
        return _vm.onChange('id', ev.target.value);
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "field-wrapper"
  }, [_c('label', {
    attrs: {
      "for": "top"
    }
  }, [_vm._v("Position from top (px)")]), _vm._v(" "), _c('input', {
    attrs: {
      "id": "top",
      "type": "number"
    },
    domProps: {
      "value": _vm.properties.top
    },
    on: {
      "change": function (ev) {
        return _vm.onChange('top', parseFloat(ev.target.value));
      }
    }
  })])]);
};

var __vue_staticRenderFns__$D = [];
/* style */

const __vue_inject_styles__$D = function (inject) {
  if (!inject) return;
  inject("data-v-34f2b220_0", {
    source: ".field-wrapper[data-v-34f2b220]{padding:5px 0 15px 0}.field-wrapper.row[data-v-34f2b220]{display:flex;flex-direction:row;align-items:center}.field-wrapper>label[data-v-34f2b220]{display:block;margin-bottom:3px;font-size:9pt}.field-wrapper.row>label[data-v-34f2b220]{margin-right:5px}.field-wrapper select[data-v-34f2b220]{padding:5px;border-width:0 0 1px 0}.field-wrapper input[data-v-34f2b220]{padding:5px;border-width:0 0 1px 0}.field-row[data-v-34f2b220]{display:flex;flex-direction:row}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$D = "data-v-34f2b220";
/* module identifier */

const __vue_module_identifier__$D = undefined;
/* functional template */

const __vue_is_functional_template__$D = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$F = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$D,
  staticRenderFns: __vue_staticRenderFns__$D
}, __vue_inject_styles__$D, __vue_script__$D, __vue_scope_id__$D, __vue_is_functional_template__$D, __vue_module_identifier__$D, false, createInjector, undefined, undefined);

var form$1 = __vue_component__$F;

var anchor = new WidgetEffectControl({
  key: 'anchor',
  name: 'Anchor',

  create(props) {
    return {
      type: this.key,
      properties: {
        id: '',
        top: 0,
        ...props
      }
    };
  },

  display: display$1,
  form: form$1
});

/*! @license is-dom-node v1.0.4

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/
function isDomNode(x) {
	return typeof window.Node === 'object'
		? x instanceof window.Node
		: x !== null &&
				typeof x === 'object' &&
				typeof x.nodeType === 'number' &&
				typeof x.nodeName === 'string'
}

/*! @license is-dom-node-list v1.2.1

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/

function isDomNodeList(x) {
	var prototypeToString = Object.prototype.toString.call(x);
	var regex = /^\[object (HTMLCollection|NodeList|Object)\]$/;

	return typeof window.NodeList === 'object'
		? x instanceof window.NodeList
		: x !== null &&
				typeof x === 'object' &&
				typeof x.length === 'number' &&
				regex.test(prototypeToString) &&
				(x.length === 0 || isDomNode(x[0]))
}

/*! @license Tealight v0.3.6

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/

function tealight(target, context) {
  if ( context === void 0 ) context = document;

  if (target instanceof Array) { return target.filter(isDomNode); }
  if (isDomNode(target)) { return [target]; }
  if (isDomNodeList(target)) { return Array.prototype.slice.call(target); }
  if (typeof target === "string") {
    try {
      var query = context.querySelectorAll(target);
      return Array.prototype.slice.call(query);
    } catch (err) {
      return [];
    }
  }
  return [];
}

/*! @license Rematrix v0.3.0

	Copyright 2018 Julian Lloyd.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
/**
 * @module Rematrix
 */

/**
 * Transformation matrices in the browser come in two flavors:
 *
 *  - `matrix` using 6 values (short)
 *  - `matrix3d` using 16 values (long)
 *
 * This utility follows this [conversion guide](https://goo.gl/EJlUQ1)
 * to expand short form matrices to their equivalent long form.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */
function format(source) {
	if (source.constructor !== Array) {
		throw new TypeError('Expected array.')
	}
	if (source.length === 16) {
		return source
	}
	if (source.length === 6) {
		var matrix = identity();
		matrix[0] = source[0];
		matrix[1] = source[1];
		matrix[4] = source[2];
		matrix[5] = source[3];
		matrix[12] = source[4];
		matrix[13] = source[5];
		return matrix
	}
	throw new RangeError('Expected array with either 6 or 16 values.')
}

/**
 * Returns a matrix representing no transformation. The product of any matrix
 * multiplied by the identity matrix will be the original matrix.
 *
 * > **Tip:** Similar to how `5 * 1 === 5`, where `1` is the identity.
 *
 * @return {array}
 */
function identity() {
	var matrix = [];
	for (var i = 0; i < 16; i++) {
		i % 5 == 0 ? matrix.push(1) : matrix.push(0);
	}
	return matrix
}

/**
 * Returns a 4x4 matrix describing the combined transformations
 * of both arguments.
 *
 * > **Note:** Order is very important. For example, rotating 45°
 * along the Z-axis, followed by translating 500 pixels along the
 * Y-axis... is not the same as translating 500 pixels along the
 * Y-axis, followed by rotating 45° along on the Z-axis.
 *
 * @param  {array} m - Accepts both short and long form matrices.
 * @param  {array} x - Accepts both short and long form matrices.
 * @return {array}
 */
function multiply(m, x) {
	var fm = format(m);
	var fx = format(x);
	var product = [];

	for (var i = 0; i < 4; i++) {
		var row = [fm[i], fm[i + 4], fm[i + 8], fm[i + 12]];
		for (var j = 0; j < 4; j++) {
			var k = j * 4;
			var col = [fx[k], fx[k + 1], fx[k + 2], fx[k + 3]];
			var result =
				row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3];

			product[i + k] = result;
		}
	}

	return product
}

/**
 * Attempts to return a 4x4 matrix describing the CSS transform
 * matrix passed in, but will return the identity matrix as a
 * fallback.
 *
 * > **Tip:** This method is used to convert a CSS matrix (retrieved as a
 * `string` from computed styles) to its equivalent array format.
 *
 * @param  {string} source - `matrix` or `matrix3d` CSS Transform value.
 * @return {array}
 */
function parse(source) {
	if (typeof source === 'string') {
		var match = source.match(/matrix(3d)?\(([^)]+)\)/);
		if (match) {
			var raw = match[2].split(', ').map(parseFloat);
			return format(raw)
		}
	}
	return identity()
}

/**
 * Returns a 4x4 matrix describing X-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotateX(angle) {
	var theta = Math.PI / 180 * angle;
	var matrix = identity();

	matrix[5] = matrix[10] = Math.cos(theta);
	matrix[6] = matrix[9] = Math.sin(theta);
	matrix[9] *= -1;

	return matrix
}

/**
 * Returns a 4x4 matrix describing Y-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotateY(angle) {
	var theta = Math.PI / 180 * angle;
	var matrix = identity();

	matrix[0] = matrix[10] = Math.cos(theta);
	matrix[2] = matrix[8] = Math.sin(theta);
	matrix[2] *= -1;

	return matrix
}

/**
 * Returns a 4x4 matrix describing Z-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotateZ(angle) {
	var theta = Math.PI / 180 * angle;
	var matrix = identity();

	matrix[0] = matrix[5] = Math.cos(theta);
	matrix[1] = matrix[4] = Math.sin(theta);
	matrix[4] *= -1;

	return matrix
}

/**
 * Returns a 4x4 matrix describing 2D scaling. The first argument
 * is used for both X and Y-axis scaling, unless an optional
 * second argument is provided to explicitly define Y-axis scaling.
 *
 * @param  {number} scalar    - Decimal multiplier.
 * @param  {number} [scalarY] - Decimal multiplier.
 * @return {array}
 */
function scale(scalar, scalarY) {
	var matrix = identity();

	matrix[0] = scalar;
	matrix[5] = typeof scalarY === 'number' ? scalarY : scalar;

	return matrix
}

/**
 * Returns a 4x4 matrix describing X-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateX(distance) {
	var matrix = identity();
	matrix[12] = distance;
	return matrix
}

/**
 * Returns a 4x4 matrix describing Y-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateY(distance) {
	var matrix = identity();
	matrix[13] = distance;
	return matrix
}

/*! @license miniraf v1.0.0

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/
var polyfill$1 = (function () {
	var clock = Date.now();

	return function (callback) {
		var currentTime = Date.now();
		if (currentTime - clock > 16) {
			clock = currentTime;
			callback(currentTime);
		} else {
			setTimeout(function () { return polyfill$1(callback); }, 0);
		}
	}
})();

var index = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	polyfill$1;

/*! @license ScrollReveal v4.0.9

	Copyright 2021 Fisssion LLC.

	Licensed under the GNU General Public License 3.0 for
	compatible open source projects and non-commercial use.

	For commercial sites, themes, projects, and applications,
	keep your source code private/proprietary by purchasing
	a commercial license from https://scrollrevealjs.org/
*/

var defaults = {
	delay: 0,
	distance: '0',
	duration: 600,
	easing: 'cubic-bezier(0.5, 0, 0, 1)',
	interval: 0,
	opacity: 0,
	origin: 'bottom',
	rotate: {
		x: 0,
		y: 0,
		z: 0
	},
	scale: 1,
	cleanup: false,
	container: document.documentElement,
	desktop: true,
	mobile: true,
	reset: false,
	useDelay: 'always',
	viewFactor: 0.0,
	viewOffset: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	},
	afterReset: function afterReset() {},
	afterReveal: function afterReveal() {},
	beforeReset: function beforeReset() {},
	beforeReveal: function beforeReveal() {}
};

function failure() {
	document.documentElement.classList.remove('sr');

	return {
		clean: function clean() {},
		destroy: function destroy() {},
		reveal: function reveal() {},
		sync: function sync() {},
		get noop() {
			return true
		}
	}
}

function success() {
	document.documentElement.classList.add('sr');

	if (document.body) {
		document.body.style.height = '100%';
	} else {
		document.addEventListener('DOMContentLoaded', function () {
			document.body.style.height = '100%';
		});
	}
}

var mount = { success: success, failure: failure };

function isObject(x) {
	return (
		x !== null &&
		x instanceof Object &&
		(x.constructor === Object ||
			Object.prototype.toString.call(x) === '[object Object]')
	)
}

function each(collection, callback) {
	if (isObject(collection)) {
		var keys = Object.keys(collection);
		return keys.forEach(function (key) { return callback(collection[key], key, collection); })
	}
	if (collection instanceof Array) {
		return collection.forEach(function (item, i) { return callback(item, i, collection); })
	}
	throw new TypeError('Expected either an array or object literal.')
}

function logger(message) {
	var details = [], len = arguments.length - 1;
	while ( len-- > 0 ) details[ len ] = arguments[ len + 1 ];

	if (this.constructor.debug && console) {
		var report = "%cScrollReveal: " + message;
		details.forEach(function (detail) { return (report += "\n — " + detail); });
		console.log(report, 'color: #ea654b;'); // eslint-disable-line no-console
	}
}

function rinse() {
	var this$1$1 = this;

	var struct = function () { return ({
		active: [],
		stale: []
	}); };

	var elementIds = struct();
	var sequenceIds = struct();
	var containerIds = struct();

	/**
	 * Take stock of active element IDs.
	 */
	try {
		each(tealight('[data-sr-id]'), function (node) {
			var id = parseInt(node.getAttribute('data-sr-id'));
			elementIds.active.push(id);
		});
	} catch (e) {
		throw e
	}
	/**
	 * Destroy stale elements.
	 */
	each(this.store.elements, function (element) {
		if (elementIds.active.indexOf(element.id) === -1) {
			elementIds.stale.push(element.id);
		}
	});

	each(elementIds.stale, function (staleId) { return delete this$1$1.store.elements[staleId]; });

	/**
	 * Take stock of active container and sequence IDs.
	 */
	each(this.store.elements, function (element) {
		if (containerIds.active.indexOf(element.containerId) === -1) {
			containerIds.active.push(element.containerId);
		}
		if (element.hasOwnProperty('sequence')) {
			if (sequenceIds.active.indexOf(element.sequence.id) === -1) {
				sequenceIds.active.push(element.sequence.id);
			}
		}
	});

	/**
	 * Destroy stale containers.
	 */
	each(this.store.containers, function (container) {
		if (containerIds.active.indexOf(container.id) === -1) {
			containerIds.stale.push(container.id);
		}
	});

	each(containerIds.stale, function (staleId) {
		var stale = this$1$1.store.containers[staleId].node;
		stale.removeEventListener('scroll', this$1$1.delegate);
		stale.removeEventListener('resize', this$1$1.delegate);
		delete this$1$1.store.containers[staleId];
	});

	/**
	 * Destroy stale sequences.
	 */
	each(this.store.sequences, function (sequence) {
		if (sequenceIds.active.indexOf(sequence.id) === -1) {
			sequenceIds.stale.push(sequence.id);
		}
	});

	each(sequenceIds.stale, function (staleId) { return delete this$1$1.store.sequences[staleId]; });
}

var getPrefixedCssProp = (function () {
	var properties = {};
	var style = document.documentElement.style;

	function getPrefixedCssProperty(name, source) {
		if ( source === void 0 ) source = style;

		if (name && typeof name === 'string') {
			if (properties[name]) {
				return properties[name]
			}
			if (typeof source[name] === 'string') {
				return (properties[name] = name)
			}
			if (typeof source[("-webkit-" + name)] === 'string') {
				return (properties[name] = "-webkit-" + name)
			}
			throw new RangeError(("Unable to find \"" + name + "\" style property."))
		}
		throw new TypeError('Expected a string.')
	}

	getPrefixedCssProperty.clearCache = function () { return (properties = {}); };

	return getPrefixedCssProperty
})();

function style(element) {
	var computed = window.getComputedStyle(element.node);
	var position = computed.position;
	var config = element.config;

	/**
	 * Generate inline styles
	 */
	var inline = {};
	var inlineStyle = element.node.getAttribute('style') || '';
	var inlineMatch = inlineStyle.match(/[\w-]+\s*:\s*[^;]+\s*/gi) || [];

	inline.computed = inlineMatch ? inlineMatch.map(function (m) { return m.trim(); }).join('; ') + ';' : '';

	inline.generated = inlineMatch.some(function (m) { return m.match(/visibility\s?:\s?visible/i); })
		? inline.computed
		: inlineMatch.concat( ['visibility: visible']).map(function (m) { return m.trim(); }).join('; ') + ';';

	/**
	 * Generate opacity styles
	 */
	var computedOpacity = parseFloat(computed.opacity);
	var configOpacity = !isNaN(parseFloat(config.opacity))
		? parseFloat(config.opacity)
		: parseFloat(computed.opacity);

	var opacity = {
		computed: computedOpacity !== configOpacity ? ("opacity: " + computedOpacity + ";") : '',
		generated: computedOpacity !== configOpacity ? ("opacity: " + configOpacity + ";") : ''
	};

	/**
	 * Generate transformation styles
	 */
	var transformations = [];

	if (parseFloat(config.distance)) {
		var axis = config.origin === 'top' || config.origin === 'bottom' ? 'Y' : 'X';

		/**
		 * Let’s make sure our our pixel distances are negative for top and left.
		 * e.g. { origin: 'top', distance: '25px' } starts at `top: -25px` in CSS.
		 */
		var distance = config.distance;
		if (config.origin === 'top' || config.origin === 'left') {
			distance = /^-/.test(distance) ? distance.substr(1) : ("-" + distance);
		}

		var ref = distance.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g);
		var value = ref[0];
		var unit = ref[1];

		switch (unit) {
			case 'em':
				distance = parseInt(computed.fontSize) * value;
				break
			case 'px':
				distance = value;
				break
			case '%':
				/**
				 * Here we use `getBoundingClientRect` instead of
				 * the existing data attached to `element.geometry`
				 * because only the former includes any transformations
				 * current applied to the element.
				 *
				 * If that behavior ends up being unintuitive, this
				 * logic could instead utilize `element.geometry.height`
				 * and `element.geoemetry.width` for the distance calculation
				 */
				distance =
					axis === 'Y'
						? (element.node.getBoundingClientRect().height * value) / 100
						: (element.node.getBoundingClientRect().width * value) / 100;
				break
			default:
				throw new RangeError('Unrecognized or missing distance unit.')
		}

		if (axis === 'Y') {
			transformations.push(translateY(distance));
		} else {
			transformations.push(translateX(distance));
		}
	}

	if (config.rotate.x) { transformations.push(rotateX(config.rotate.x)); }
	if (config.rotate.y) { transformations.push(rotateY(config.rotate.y)); }
	if (config.rotate.z) { transformations.push(rotateZ(config.rotate.z)); }
	if (config.scale !== 1) {
		if (config.scale === 0) {
			/**
			 * The CSS Transforms matrix interpolation specification
			 * basically disallows transitions of non-invertible
			 * matrixes, which means browsers won't transition
			 * elements with zero scale.
			 *
			 * That’s inconvenient for the API and developer
			 * experience, so we simply nudge their value
			 * slightly above zero; this allows browsers
			 * to transition our element as expected.
			 *
			 * `0.0002` was the smallest number
			 * that performed across browsers.
			 */
			transformations.push(scale(0.0002));
		} else {
			transformations.push(scale(config.scale));
		}
	}

	var transform = {};
	if (transformations.length) {
		transform.property = getPrefixedCssProp('transform');
		/**
		 * The default computed transform value should be one of:
		 * undefined || 'none' || 'matrix()' || 'matrix3d()'
		 */
		transform.computed = {
			raw: computed[transform.property],
			matrix: parse(computed[transform.property])
		};

		transformations.unshift(transform.computed.matrix);
		var product = transformations.reduce(multiply);

		transform.generated = {
			initial: ((transform.property) + ": matrix3d(" + (product.join(', ')) + ");"),
			final: ((transform.property) + ": matrix3d(" + (transform.computed.matrix.join(', ')) + ");")
		};
	} else {
		transform.generated = {
			initial: '',
			final: ''
		};
	}

	/**
	 * Generate transition styles
	 */
	var transition = {};
	if (opacity.generated || transform.generated.initial) {
		transition.property = getPrefixedCssProp('transition');
		transition.computed = computed[transition.property];
		transition.fragments = [];

		var delay = config.delay;
		var duration = config.duration;
		var easing = config.easing;

		if (opacity.generated) {
			transition.fragments.push({
				delayed: ("opacity " + (duration / 1000) + "s " + easing + " " + (delay / 1000) + "s"),
				instant: ("opacity " + (duration / 1000) + "s " + easing + " 0s")
			});
		}

		if (transform.generated.initial) {
			transition.fragments.push({
				delayed: ((transform.property) + " " + (duration / 1000) + "s " + easing + " " + (delay / 1000) + "s"),
				instant: ((transform.property) + " " + (duration / 1000) + "s " + easing + " 0s")
			});
		}

		/**
		 * The default computed transition property should be undefined, or one of:
		 * '' || 'none 0s ease 0s' || 'all 0s ease 0s' || 'all 0s 0s cubic-bezier()'
		 */
		var hasCustomTransition =
			transition.computed && !transition.computed.match(/all 0s|none 0s/);

		if (hasCustomTransition) {
			transition.fragments.unshift({
				delayed: transition.computed,
				instant: transition.computed
			});
		}

		var composed = transition.fragments.reduce(
			function (composition, fragment, i) {
				composition.delayed += i === 0 ? fragment.delayed : (", " + (fragment.delayed));
				composition.instant += i === 0 ? fragment.instant : (", " + (fragment.instant));
				return composition
			},
			{
				delayed: '',
				instant: ''
			}
		);

		transition.generated = {
			delayed: ((transition.property) + ": " + (composed.delayed) + ";"),
			instant: ((transition.property) + ": " + (composed.instant) + ";")
		};
	} else {
		transition.generated = {
			delayed: '',
			instant: ''
		};
	}

	return {
		inline: inline,
		opacity: opacity,
		position: position,
		transform: transform,
		transition: transition
	}
}

/**
 * apply a CSS string to an element using the CSSOM (element.style) rather
 * than setAttribute, which may violate the content security policy.
 *
 * @param {Node}   [el]  Element to receive styles.
 * @param {string} [declaration] Styles to apply.
 */
function applyStyle (el, declaration) {
	declaration.split(';').forEach(function (pair) {
		var ref = pair.split(':');
		var property = ref[0];
		var value = ref.slice(1);
		if (property && value) {
			el.style[property.trim()] = value.join(':');
		}
	});
}

function clean(target) {
	var this$1$1 = this;

	var dirty;
	try {
		each(tealight(target), function (node) {
			var id = node.getAttribute('data-sr-id');
			if (id !== null) {
				dirty = true;
				var element = this$1$1.store.elements[id];
				if (element.callbackTimer) {
					window.clearTimeout(element.callbackTimer.clock);
				}
				applyStyle(element.node, element.styles.inline.generated);
				node.removeAttribute('data-sr-id');
				delete this$1$1.store.elements[id];
			}
		});
	} catch (e) {
		return logger.call(this, 'Clean failed.', e.message)
	}

	if (dirty) {
		try {
			rinse.call(this);
		} catch (e) {
			return logger.call(this, 'Clean failed.', e.message)
		}
	}
}

function destroy() {
	var this$1$1 = this;

	/**
	 * Remove all generated styles and element ids
	 */
	each(this.store.elements, function (element) {
		applyStyle(element.node, element.styles.inline.generated);
		element.node.removeAttribute('data-sr-id');
	});

	/**
	 * Remove all event listeners.
	 */
	each(this.store.containers, function (container) {
		var target =
			container.node === document.documentElement ? window : container.node;
		target.removeEventListener('scroll', this$1$1.delegate);
		target.removeEventListener('resize', this$1$1.delegate);
	});

	/**
	 * Clear all data from the store
	 */
	this.store = {
		containers: {},
		elements: {},
		history: [],
		sequences: {}
	};
}

function deepAssign(target) {
	var sources = [], len = arguments.length - 1;
	while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

	if (isObject(target)) {
		each(sources, function (source) {
			each(source, function (data, key) {
				if (isObject(data)) {
					if (!target[key] || !isObject(target[key])) {
						target[key] = {};
					}
					deepAssign(target[key], data);
				} else {
					target[key] = data;
				}
			});
		});
		return target
	} else {
		throw new TypeError('Target must be an object literal.')
	}
}

function isMobile(agent) {
	if ( agent === void 0 ) agent = navigator.userAgent;

	return /Android|iPhone|iPad|iPod/i.test(agent)
}

var nextUniqueId = (function () {
	var uid = 0;
	return function () { return uid++; }
})();

function initialize() {
	var this$1$1 = this;

	rinse.call(this);

	each(this.store.elements, function (element) {
		var styles = [element.styles.inline.generated];

		if (element.visible) {
			styles.push(element.styles.opacity.computed);
			styles.push(element.styles.transform.generated.final);
			element.revealed = true;
		} else {
			styles.push(element.styles.opacity.generated);
			styles.push(element.styles.transform.generated.initial);
			element.revealed = false;
		}

		applyStyle(element.node, styles.filter(function (s) { return s !== ''; }).join(' '));
	});

	each(this.store.containers, function (container) {
		var target =
			container.node === document.documentElement ? window : container.node;
		target.addEventListener('scroll', this$1$1.delegate);
		target.addEventListener('resize', this$1$1.delegate);
	});

	/**
	 * Manually invoke delegate once to capture
	 * element and container dimensions, container
	 * scroll position, and trigger any valid reveals
	 */
	this.delegate();

	/**
	 * Wipe any existing `setTimeout` now
	 * that initialization has completed.
	 */
	this.initTimeout = null;
}

function animate(element, force) {
	if ( force === void 0 ) force = {};

	var pristine = force.pristine || this.pristine;
	var delayed =
		element.config.useDelay === 'always' ||
		(element.config.useDelay === 'onload' && pristine) ||
		(element.config.useDelay === 'once' && !element.seen);

	var shouldReveal = element.visible && !element.revealed;
	var shouldReset = !element.visible && element.revealed && element.config.reset;

	if (force.reveal || shouldReveal) {
		return triggerReveal.call(this, element, delayed)
	}

	if (force.reset || shouldReset) {
		return triggerReset.call(this, element)
	}
}

function triggerReveal(element, delayed) {
	var styles = [
		element.styles.inline.generated,
		element.styles.opacity.computed,
		element.styles.transform.generated.final
	];
	if (delayed) {
		styles.push(element.styles.transition.generated.delayed);
	} else {
		styles.push(element.styles.transition.generated.instant);
	}
	element.revealed = element.seen = true;
	applyStyle(element.node, styles.filter(function (s) { return s !== ''; }).join(' '));
	registerCallbacks.call(this, element, delayed);
}

function triggerReset(element) {
	var styles = [
		element.styles.inline.generated,
		element.styles.opacity.generated,
		element.styles.transform.generated.initial,
		element.styles.transition.generated.instant
	];
	element.revealed = false;
	applyStyle(element.node, styles.filter(function (s) { return s !== ''; }).join(' '));
	registerCallbacks.call(this, element);
}

function registerCallbacks(element, isDelayed) {
	var this$1$1 = this;

	var duration = isDelayed
		? element.config.duration + element.config.delay
		: element.config.duration;

	var beforeCallback = element.revealed
		? element.config.beforeReveal
		: element.config.beforeReset;

	var afterCallback = element.revealed
		? element.config.afterReveal
		: element.config.afterReset;

	var elapsed = 0;
	if (element.callbackTimer) {
		elapsed = Date.now() - element.callbackTimer.start;
		window.clearTimeout(element.callbackTimer.clock);
	}

	beforeCallback(element.node);

	element.callbackTimer = {
		start: Date.now(),
		clock: window.setTimeout(function () {
			afterCallback(element.node);
			element.callbackTimer = null;
			if (element.revealed && !element.config.reset && element.config.cleanup) {
				clean.call(this$1$1, element.node);
			}
		}, duration - elapsed)
	};
}

function sequence(element, pristine) {
	if ( pristine === void 0 ) pristine = this.pristine;

	/**
	 * We first check if the element should reset.
	 */
	if (!element.visible && element.revealed && element.config.reset) {
		return animate.call(this, element, { reset: true })
	}

	var seq = this.store.sequences[element.sequence.id];
	var i = element.sequence.index;

	if (seq) {
		var visible = new SequenceModel(seq, 'visible', this.store);
		var revealed = new SequenceModel(seq, 'revealed', this.store);

		seq.models = { visible: visible, revealed: revealed };

		/**
		 * If the sequence has no revealed members,
		 * then we reveal the first visible element
		 * within that sequence.
		 *
		 * The sequence then cues a recursive call
		 * in both directions.
		 */
		if (!revealed.body.length) {
			var nextId = seq.members[visible.body[0]];
			var nextElement = this.store.elements[nextId];

			if (nextElement) {
				cue.call(this, seq, visible.body[0], -1, pristine);
				cue.call(this, seq, visible.body[0], +1, pristine);
				return animate.call(this, nextElement, { reveal: true, pristine: pristine })
			}
		}

		/**
		 * If our element isn’t resetting, we check the
		 * element sequence index against the head, and
		 * then the foot of the sequence.
		 */
		if (
			!seq.blocked.head &&
			i === [].concat( revealed.head ).pop() &&
			i >= [].concat( visible.body ).shift()
		) {
			cue.call(this, seq, i, -1, pristine);
			return animate.call(this, element, { reveal: true, pristine: pristine })
		}

		if (
			!seq.blocked.foot &&
			i === [].concat( revealed.foot ).shift() &&
			i <= [].concat( visible.body ).pop()
		) {
			cue.call(this, seq, i, +1, pristine);
			return animate.call(this, element, { reveal: true, pristine: pristine })
		}
	}
}

function Sequence(interval) {
	var i = Math.abs(interval);
	if (!isNaN(i)) {
		this.id = nextUniqueId();
		this.interval = Math.max(i, 16);
		this.members = [];
		this.models = {};
		this.blocked = {
			head: false,
			foot: false
		};
	} else {
		throw new RangeError('Invalid sequence interval.')
	}
}

function SequenceModel(seq, prop, store) {
	var this$1$1 = this;

	this.head = [];
	this.body = [];
	this.foot = [];

	each(seq.members, function (id, index) {
		var element = store.elements[id];
		if (element && element[prop]) {
			this$1$1.body.push(index);
		}
	});

	if (this.body.length) {
		each(seq.members, function (id, index) {
			var element = store.elements[id];
			if (element && !element[prop]) {
				if (index < this$1$1.body[0]) {
					this$1$1.head.push(index);
				} else {
					this$1$1.foot.push(index);
				}
			}
		});
	}
}

function cue(seq, i, direction, pristine) {
	var this$1$1 = this;

	var blocked = ['head', null, 'foot'][1 + direction];
	var nextId = seq.members[i + direction];
	var nextElement = this.store.elements[nextId];

	seq.blocked[blocked] = true;

	setTimeout(function () {
		seq.blocked[blocked] = false;
		if (nextElement) {
			sequence.call(this$1$1, nextElement, pristine);
		}
	}, seq.interval);
}

function reveal$1(target, options, syncing) {
	var this$1$1 = this;
	if ( options === void 0 ) options = {};
	if ( syncing === void 0 ) syncing = false;

	var containerBuffer = [];
	var sequence$$1;
	var interval = options.interval || defaults.interval;

	try {
		if (interval) {
			sequence$$1 = new Sequence(interval);
		}

		var nodes = tealight(target);
		if (!nodes.length) {
			throw new Error('Invalid reveal target.')
		}

		var elements = nodes.reduce(function (elementBuffer, elementNode) {
			var element = {};
			var existingId = elementNode.getAttribute('data-sr-id');

			if (existingId) {
				deepAssign(element, this$1$1.store.elements[existingId]);

				/**
				 * In order to prevent previously generated styles
				 * from throwing off the new styles, the style tag
				 * has to be reverted to its pre-reveal state.
				 */
				applyStyle(element.node, element.styles.inline.computed);
			} else {
				element.id = nextUniqueId();
				element.node = elementNode;
				element.seen = false;
				element.revealed = false;
				element.visible = false;
			}

			var config = deepAssign({}, element.config || this$1$1.defaults, options);

			if ((!config.mobile && isMobile()) || (!config.desktop && !isMobile())) {
				if (existingId) {
					clean.call(this$1$1, element);
				}
				return elementBuffer // skip elements that are disabled
			}

			var containerNode = tealight(config.container)[0];
			if (!containerNode) {
				throw new Error('Invalid container.')
			}
			if (!containerNode.contains(elementNode)) {
				return elementBuffer // skip elements found outside the container
			}

			var containerId;
			{
				containerId = getContainerId(
					containerNode,
					containerBuffer,
					this$1$1.store.containers
				);
				if (containerId === null) {
					containerId = nextUniqueId();
					containerBuffer.push({ id: containerId, node: containerNode });
				}
			}

			element.config = config;
			element.containerId = containerId;
			element.styles = style(element);

			if (sequence$$1) {
				element.sequence = {
					id: sequence$$1.id,
					index: sequence$$1.members.length
				};
				sequence$$1.members.push(element.id);
			}

			elementBuffer.push(element);
			return elementBuffer
		}, []);

		/**
		 * Modifying the DOM via setAttribute needs to be handled
		 * separately from reading computed styles in the map above
		 * for the browser to batch DOM changes (limiting reflows)
		 */
		each(elements, function (element) {
			this$1$1.store.elements[element.id] = element;
			element.node.setAttribute('data-sr-id', element.id);
		});
	} catch (e) {
		return logger.call(this, 'Reveal failed.', e.message)
	}

	/**
	 * Now that element set-up is complete...
	 * Let’s commit any container and sequence data we have to the store.
	 */
	each(containerBuffer, function (container) {
		this$1$1.store.containers[container.id] = {
			id: container.id,
			node: container.node
		};
	});
	if (sequence$$1) {
		this.store.sequences[sequence$$1.id] = sequence$$1;
	}

	/**
	 * If reveal wasn't invoked by sync, we want to
	 * make sure to add this call to the history.
	 */
	if (syncing !== true) {
		this.store.history.push({ target: target, options: options });

		/**
		 * Push initialization to the event queue, giving
		 * multiple reveal calls time to be interpreted.
		 */
		if (this.initTimeout) {
			window.clearTimeout(this.initTimeout);
		}
		this.initTimeout = window.setTimeout(initialize.bind(this), 0);
	}
}

function getContainerId(node) {
	var collections = [], len = arguments.length - 1;
	while ( len-- > 0 ) collections[ len ] = arguments[ len + 1 ];

	var id = null;
	each(collections, function (collection) {
		each(collection, function (container) {
			if (id === null && container.node === node) {
				id = container.id;
			}
		});
	});
	return id
}

/**
 * Re-runs the reveal method for each record stored in history,
 * for capturing new content asynchronously loaded into the DOM.
 */
function sync() {
	var this$1$1 = this;

	each(this.store.history, function (record) {
		reveal$1.call(this$1$1, record.target, record.options, true);
	});

	initialize.call(this);
}

var polyfill = function (x) { return (x > 0) - (x < 0) || +x; };
var mathSign = Math.sign || polyfill;

function getGeometry(target, isContainer) {
	/**
	 * We want to ignore padding and scrollbars for container elements.
	 * More information here: https://goo.gl/vOZpbz
	 */
	var height = isContainer ? target.node.clientHeight : target.node.offsetHeight;
	var width = isContainer ? target.node.clientWidth : target.node.offsetWidth;

	var offsetTop = 0;
	var offsetLeft = 0;
	var node = target.node;

	do {
		if (!isNaN(node.offsetTop)) {
			offsetTop += node.offsetTop;
		}
		if (!isNaN(node.offsetLeft)) {
			offsetLeft += node.offsetLeft;
		}
		node = node.offsetParent;
	} while (node)

	return {
		bounds: {
			top: offsetTop,
			right: offsetLeft + width,
			bottom: offsetTop + height,
			left: offsetLeft
		},
		height: height,
		width: width
	}
}

function getScrolled(container) {
	var top, left;
	if (container.node === document.documentElement) {
		top = window.pageYOffset;
		left = window.pageXOffset;
	} else {
		top = container.node.scrollTop;
		left = container.node.scrollLeft;
	}
	return { top: top, left: left }
}

function isElementVisible(element) {
	if ( element === void 0 ) element = {};

	var container = this.store.containers[element.containerId];
	if (!container) { return }

	var viewFactor = Math.max(0, Math.min(1, element.config.viewFactor));
	var viewOffset = element.config.viewOffset;

	var elementBounds = {
		top: element.geometry.bounds.top + element.geometry.height * viewFactor,
		right: element.geometry.bounds.right - element.geometry.width * viewFactor,
		bottom: element.geometry.bounds.bottom - element.geometry.height * viewFactor,
		left: element.geometry.bounds.left + element.geometry.width * viewFactor
	};

	var containerBounds = {
		top: container.geometry.bounds.top + container.scroll.top + viewOffset.top,
		right: container.geometry.bounds.right + container.scroll.left - viewOffset.right,
		bottom:
			container.geometry.bounds.bottom + container.scroll.top - viewOffset.bottom,
		left: container.geometry.bounds.left + container.scroll.left + viewOffset.left
	};

	return (
		(elementBounds.top < containerBounds.bottom &&
			elementBounds.right > containerBounds.left &&
			elementBounds.bottom > containerBounds.top &&
			elementBounds.left < containerBounds.right) ||
		element.styles.position === 'fixed'
	)
}

function delegate(
	event,
	elements
) {
	var this$1$1 = this;
	if ( event === void 0 ) event = { type: 'init' };
	if ( elements === void 0 ) elements = this.store.elements;

	index(function () {
		var stale = event.type === 'init' || event.type === 'resize';

		each(this$1$1.store.containers, function (container) {
			if (stale) {
				container.geometry = getGeometry.call(this$1$1, container, true);
			}
			var scroll = getScrolled.call(this$1$1, container);
			if (container.scroll) {
				container.direction = {
					x: mathSign(scroll.left - container.scroll.left),
					y: mathSign(scroll.top - container.scroll.top)
				};
			}
			container.scroll = scroll;
		});

		/**
		 * Due to how the sequencer is implemented, it’s
		 * important that we update the state of all
		 * elements, before any animation logic is
		 * evaluated (in the second loop below).
		 */
		each(elements, function (element) {
			if (stale || element.geometry === undefined) {
				element.geometry = getGeometry.call(this$1$1, element);
			}
			element.visible = isElementVisible.call(this$1$1, element);
		});

		each(elements, function (element) {
			if (element.sequence) {
				sequence.call(this$1$1, element);
			} else {
				animate.call(this$1$1, element);
			}
		});

		this$1$1.pristine = false;
	});
}

function isTransformSupported() {
	var style = document.documentElement.style;
	return 'transform' in style || 'WebkitTransform' in style
}

function isTransitionSupported() {
	var style = document.documentElement.style;
	return 'transition' in style || 'WebkitTransition' in style
}

var version = "4.0.9";

var boundDelegate;
var boundDestroy;
var boundReveal;
var boundClean;
var boundSync;
var config;
var debug;
var instance;

function ScrollReveal(options) {
	if ( options === void 0 ) options = {};

	var invokedWithoutNew =
		typeof this === 'undefined' ||
		Object.getPrototypeOf(this) !== ScrollReveal.prototype;

	if (invokedWithoutNew) {
		return new ScrollReveal(options)
	}

	if (!ScrollReveal.isSupported()) {
		logger.call(this, 'Instantiation failed.', 'This browser is not supported.');
		return mount.failure()
	}

	var buffer;
	try {
		buffer = config
			? deepAssign({}, config, options)
			: deepAssign({}, defaults, options);
	} catch (e) {
		logger.call(this, 'Invalid configuration.', e.message);
		return mount.failure()
	}

	try {
		var container = tealight(buffer.container)[0];
		if (!container) {
			throw new Error('Invalid container.')
		}
	} catch (e) {
		logger.call(this, e.message);
		return mount.failure()
	}

	config = buffer;

	if ((!config.mobile && isMobile()) || (!config.desktop && !isMobile())) {
		logger.call(
			this,
			'This device is disabled.',
			("desktop: " + (config.desktop)),
			("mobile: " + (config.mobile))
		);
		return mount.failure()
	}

	mount.success();

	this.store = {
		containers: {},
		elements: {},
		history: [],
		sequences: {}
	};

	this.pristine = true;

	boundDelegate = boundDelegate || delegate.bind(this);
	boundDestroy = boundDestroy || destroy.bind(this);
	boundReveal = boundReveal || reveal$1.bind(this);
	boundClean = boundClean || clean.bind(this);
	boundSync = boundSync || sync.bind(this);

	Object.defineProperty(this, 'delegate', { get: function () { return boundDelegate; } });
	Object.defineProperty(this, 'destroy', { get: function () { return boundDestroy; } });
	Object.defineProperty(this, 'reveal', { get: function () { return boundReveal; } });
	Object.defineProperty(this, 'clean', { get: function () { return boundClean; } });
	Object.defineProperty(this, 'sync', { get: function () { return boundSync; } });

	Object.defineProperty(this, 'defaults', { get: function () { return config; } });
	Object.defineProperty(this, 'version', { get: function () { return version; } });
	Object.defineProperty(this, 'noop', { get: function () { return false; } });

	return instance ? instance : (instance = this)
}

ScrollReveal.isSupported = function () { return isTransformSupported() && isTransitionSupported(); };

Object.defineProperty(ScrollReveal, 'debug', {
	get: function () { return debug || false; },
	set: function (value) { return (debug = typeof value === 'boolean' ? value : debug); }
});

ScrollReveal();

//
var script$C = defineComponent({
  props: {
    wrapperRef: HTMLDivElement,
    properties: Object
  },

  data() {
    return {
      initialized: false
    };
  },

  computed: {
    watchWrapperPropsChange() {
      return {
        properties: this.properties,
        wrapperRef: this.wrapperRef
      };
    }

  },
  watch: {
    watchWrapperPropsChange: {
      handler(_ref) {
        let {
          properties,
          wrapperRef
        } = _ref;
        if (!wrapperRef) return;
        ScrollReveal().clean(wrapperRef); // generate a new scroll reveal and reveal it

        const sr = ScrollReveal(properties);
        sr.reveal(wrapperRef);
      },

      immediate: true
    }
  },

  unmounted() {
    if (this.wrapperRef) {
      ScrollReveal().clean(this.wrapperRef);
    }
  }

});

/* script */
const __vue_script__$C = script$C;
/* template */

var __vue_render__$C = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div");
};

var __vue_staticRenderFns__$C = [];
/* style */

const __vue_inject_styles__$C = undefined;
/* scoped */

const __vue_scope_id__$C = undefined;
/* module identifier */

const __vue_module_identifier__$C = undefined;
/* functional template */

const __vue_is_functional_template__$C = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$E = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$C,
  staticRenderFns: __vue_staticRenderFns__$C
}, __vue_inject_styles__$C, __vue_script__$C, __vue_scope_id__$C, __vue_is_functional_template__$C, __vue_module_identifier__$C, false, undefined, undefined, undefined);

var display = __vue_component__$E;

var script$B = defineComponent({
  props: {
    effect: Object,
    properties: Object,
    widgetItem: Object
  },
  methods: {
    onChange(key, value) {
      this.$emit('onPropertiesChange', { ...this.$props.properties,
        [key]: value
      });
    }

  }
});

/* script */
const __vue_script__$B = script$B;
/* template */

var __vue_render__$B = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('div', {
    staticClass: "field-wrapper row"
  }, [_c('label', {
    attrs: {
      "for": "origin"
    }
  }, [_vm._v("Origin")]), _vm._v(" "), _c('select', {
    attrs: {
      "id": "origin"
    },
    on: {
      "change": function (ev) {
        return _vm.onChange('origin', ev.target.value);
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "left"
    },
    domProps: {
      "selected": _vm.properties.origin === 'left'
    }
  }, [_vm._v("\n        left\n      ")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "right"
    },
    domProps: {
      "selected": _vm.properties.origin === 'right'
    }
  }, [_vm._v("\n        right\n      ")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "top"
    },
    domProps: {
      "selected": _vm.properties.origin === 'top'
    }
  }, [_vm._v("top")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "bottom"
    },
    domProps: {
      "selected": _vm.properties.origin === 'bottom'
    }
  }, [_vm._v("\n        bottom\n      ")])])]), _vm._v(" "), _c('div', {
    staticClass: "field-wrapper"
  }, [_c('label', {
    attrs: {
      "for": "delay"
    }
  }, [_vm._v("Delay (ms)")]), _vm._v(" "), _c('input', {
    attrs: {
      "id": "delay",
      "type": "number"
    },
    domProps: {
      "value": _vm.properties.delay
    },
    on: {
      "change": function (ev) {
        return _vm.onChange('delay', parseFloat(ev.target.value));
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "field-wrapper"
  }, [_c('label', {
    attrs: {
      "for": "duration"
    }
  }, [_vm._v("Duration (ms)")]), _vm._v(" "), _c('input', {
    attrs: {
      "id": "duration",
      "type": "number"
    },
    domProps: {
      "value": _vm.properties.duration
    },
    on: {
      "change": function (ev) {
        return _vm.onChange('duration', parseFloat(ev.target.value));
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "field-wrapper"
  }, [_c('label', {
    attrs: {
      "for": "distance"
    }
  }, [_vm._v("Distance")]), _vm._v(" "), _c('div', {
    staticClass: "field-row"
  }, [_c('input', {
    attrs: {
      "id": "distance",
      "type": "number"
    },
    domProps: {
      "value": _vm.properties.distance.replace(/%|px/, '')
    },
    on: {
      "change": function (ev) {
        return _vm.onChange('distance', ev.target.value + _vm.properties.distance.replace(/^\d+/, ''));
      }
    }
  }), _vm._v(" "), _c('select', {
    on: {
      "change": function (ev) {
        return _vm.onChange('distance', _vm.properties.distance.replace(/%|px/, '') + ev.target.value);
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "%"
    },
    domProps: {
      "selected": /%$/.test(_vm.properties.distance)
    }
  }, [_vm._v("\n          %\n        ")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "px"
    },
    domProps: {
      "selected": /px$/.test(_vm.properties.distance)
    }
  }, [_vm._v("\n          px\n        ")])])])])]);
};

var __vue_staticRenderFns__$B = [];
/* style */

const __vue_inject_styles__$B = function (inject) {
  if (!inject) return;
  inject("data-v-250ce009_0", {
    source: ".field-wrapper[data-v-250ce009]{padding:5px 0 15px 0}.field-wrapper.row[data-v-250ce009]{display:flex;flex-direction:row;align-items:center}.field-wrapper>label[data-v-250ce009]{display:block;margin-bottom:3px;font-size:9pt}.field-wrapper.row>label[data-v-250ce009]{margin-right:5px}.field-wrapper select[data-v-250ce009]{padding:5px;border-width:0 0 1px 0}.field-wrapper input[data-v-250ce009]{padding:5px;border-width:0 0 1px 0}.field-row[data-v-250ce009]{display:flex;flex-direction:row}.flex-1[data-v-250ce009]{flex:1}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$B = "data-v-250ce009";
/* module identifier */

const __vue_module_identifier__$B = undefined;
/* functional template */

const __vue_is_functional_template__$B = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$D = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$B,
  staticRenderFns: __vue_staticRenderFns__$B
}, __vue_inject_styles__$B, __vue_script__$B, __vue_scope_id__$B, __vue_is_functional_template__$B, __vue_module_identifier__$B, false, createInjector, undefined, undefined);

var form = __vue_component__$D;

var reveal = new WidgetEffectControl({
  key: 'reveal',
  name: 'Reveal',

  create(props) {
    return {
      type: this.key,
      properties: {
        delay: 100,
        duration: 300,
        distance: '300px',
        origin: 'left',
        ...props
      }
    };
  },

  display,
  form
});

const widgetEffects = {
  anchor,
  reveal
};

class QuestionControl {
  // public meta: { platforms: ["web", "fb"] };
  constructor(_ref) {
    let {
      builder,
      display,
      readOnly,
      questionItem = QuestionItem
    } = _ref;

    _defineProperty(this, "builder", void 0);

    _defineProperty(this, "display", void 0);

    _defineProperty(this, "readOnly", void 0);

    _defineProperty(this, "questionItem", void 0);

    _defineProperty(this, "tags", void 0);

    this.builder = builder;
    this.display = display;
    this.readOnly = readOnly;
    this.tags = [];
    this.questionItem = questionItem;
  }

}

const QuestionControlProps$a = {
  properties: {
    type: Object,
    required: true
  },
  widget: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true
  },
  t: {
    type: Function,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$A = defineComponent({
  props: { ...QuestionControlProps$a,
    properties: {
      type: Object,
      required: true
    },
    value: {
      type: String
    }
  },

  data() {
    return {
      options: []
    };
  },

  watch: {
    ['properties.options']: {
      handler() {
        // FIXME: need to handle on locale switch as well
        this.options = this.properties.options.map(opt => ({
          value: opt.value,
          label: this.t(opt.labelKey, this.widget.id)
        }));
      },

      immediate: true
    }
  },
  computed: {
    selectedValue() {
      return this.options.find(o => o.value === this.value);
    }

  },
  methods: {
    onSelectChange(value) {
      var _this$onChange;

      (_this$onChange = this.onChange) === null || _this$onChange === void 0 ? void 0 : _this$onChange.call(this, value);
    }

  }
});

/* script */
const __vue_script__$A = script$A;
/* template */

var __vue_render__$A = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "button-group-wrapper"
  }, _vm._l(_vm.options, function (option, index) {
    return _c('button', {
      key: option.value,
      class: {
        isLast: index === _vm.options.length - 1,
        selected: _vm.value === option.value
      },
      on: {
        "click": function () {
          return _vm.onSelectChange(option.value);
        }
      }
    }, [_vm._v("\n    " + _vm._s(option.label) + "\n  ")]);
  }), 0);
};

var __vue_staticRenderFns__$A = [];
/* style */

const __vue_inject_styles__$A = function (inject) {
  if (!inject) return;
  inject("data-v-15bad84e_0", {
    source: ".button-group-wrapper[data-v-15bad84e]{display:inline-flex;flex-direction:row;border:1px solid #000;border-radius:8px;overflow:hidden}button[data-v-15bad84e]{border:1px solid transparent;cursor:pointer;background-color:#fff}button[data-v-15bad84e]:not(.isLast){border-right-color:#000}button.selected[data-v-15bad84e]{background-color:#03a9f4;color:#fff}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$A = "data-v-15bad84e";
/* module identifier */

const __vue_module_identifier__$A = undefined;
/* functional template */

const __vue_is_functional_template__$A = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$C = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$A,
  staticRenderFns: __vue_staticRenderFns__$A
}, __vue_inject_styles__$A, __vue_script__$A, __vue_scope_id__$A, __vue_is_functional_template__$A, __vue_module_identifier__$A, false, createInjector, undefined, undefined);

var Display$6 = __vue_component__$C;

var script$z = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
    errors: Array,
    t: Function
  },

  data() {
    return {
      translatedLabel: ''
    };
  },

  methods: {
    getLabelByValue(value) {
      var _this$$props$properti;

      return this.t(((_this$$props$properti = this.$props.properties.options.find(o => o.value === value)) === null || _this$$props$properti === void 0 ? void 0 : _this$$props$properti.labelKey) || '', this.$props.widget.id);
    }

  },
  watch: {
    value: {
      handler(value) {
        this.$data.translatedLabel = this.getLabelByValue(value);
      },

      immediate: true
    }
  }
});

/* script */
const __vue_script__$z = script$z;
/* template */

var __vue_render__$z = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v("\n  " + _vm._s(_vm.translatedLabel) + "\n")]);
};

var __vue_staticRenderFns__$z = [];
/* style */

const __vue_inject_styles__$z = undefined;
/* scoped */

const __vue_scope_id__$z = undefined;
/* module identifier */

const __vue_module_identifier__$z = undefined;
/* functional template */

const __vue_is_functional_template__$z = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$B = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$z,
  staticRenderFns: __vue_staticRenderFns__$z
}, __vue_inject_styles__$z, __vue_script__$z, __vue_scope_id__$z, __vue_is_functional_template__$z, __vue_module_identifier__$z, false, undefined, undefined, undefined);

var ReadOnly$6 = __vue_component__$B;

var buttonGroup = new QuestionControl({
  display: Display$6,
  readOnly: ReadOnly$6
});

var script$y = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
    errors: Array,
    t: Function
  },
  methods: {
    onToggle(ev) {
      var _this$$props$onChange, _this$$props;

      (_this$$props$onChange = (_this$$props = this.$props).onChange) === null || _this$$props$onChange === void 0 ? void 0 : _this$$props$onChange.call(_this$$props, ev.target.checked);
    }

  }
});

/* script */
const __vue_script__$y = script$y;
/* template */

var __vue_render__$y = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('label', [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": _vm.widget.id
    },
    domProps: {
      "checked": _vm.value
    },
    on: {
      "click": _vm.onToggle
    }
  }), _vm._v("\n    " + _vm._s(_vm.t('__checkboxLabel', _vm.widget.id)) + "\n  ")])]);
};

var __vue_staticRenderFns__$y = [];
/* style */

const __vue_inject_styles__$y = undefined;
/* scoped */

const __vue_scope_id__$y = undefined;
/* module identifier */

const __vue_module_identifier__$y = undefined;
/* functional template */

const __vue_is_functional_template__$y = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$A = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$y,
  staticRenderFns: __vue_staticRenderFns__$y
}, __vue_inject_styles__$y, __vue_script__$y, __vue_scope_id__$y, __vue_is_functional_template__$y, __vue_module_identifier__$y, false, undefined, undefined, undefined);

var Builder = __vue_component__$A;

const QuestionControlProps$9 = {
  properties: {
    type: Object,
    required: true
  },
  widget: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: Boolean
  },
  t: {
    type: Function,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$x = defineComponent({
  props: { ...QuestionControlProps$9,
    properties: Object
  },
  methods: {
    onToggle(ev) {
      var _this$$props$onChange, _this$$props;

      (_this$$props$onChange = (_this$$props = this.$props).onChange) === null || _this$$props$onChange === void 0 ? void 0 : _this$$props$onChange.call(_this$$props, ev.target.checked);
    }

  }
});

/* script */
const __vue_script__$x = script$x;
/* template */

var __vue_render__$x = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('label', [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": _vm.widget.id
    },
    domProps: {
      "checked": _vm.value
    },
    on: {
      "click": _vm.onToggle
    }
  }), _vm._v("\n    " + _vm._s(_vm.t('__checkboxLabel')) + "\n  ")])]);
};

var __vue_staticRenderFns__$x = [];
/* style */

const __vue_inject_styles__$x = undefined;
/* scoped */

const __vue_scope_id__$x = undefined;
/* module identifier */

const __vue_module_identifier__$x = undefined;
/* functional template */

const __vue_is_functional_template__$x = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$z = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$x,
  staticRenderFns: __vue_staticRenderFns__$x
}, __vue_inject_styles__$x, __vue_script__$x, __vue_scope_id__$x, __vue_is_functional_template__$x, __vue_module_identifier__$x, false, undefined, undefined, undefined);

var Display$5 = __vue_component__$z;

var script$w = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
    errors: Array,
    t: Function
  }
});

/* script */
const __vue_script__$w = script$w;
/* template */

var __vue_render__$w = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v("\n  " + _vm._s(!!_vm.value) + "\n")]);
};

var __vue_staticRenderFns__$w = [];
/* style */

const __vue_inject_styles__$w = undefined;
/* scoped */

const __vue_scope_id__$w = undefined;
/* module identifier */

const __vue_module_identifier__$w = undefined;
/* functional template */

const __vue_is_functional_template__$w = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$y = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$w,
  staticRenderFns: __vue_staticRenderFns__$w
}, __vue_inject_styles__$w, __vue_script__$w, __vue_scope_id__$w, __vue_is_functional_template__$w, __vue_module_identifier__$w, false, undefined, undefined, undefined);

var ReadOnly$5 = __vue_component__$y;

var checkbox = new QuestionControl({
  builder: Builder,
  display: Display$5,
  readOnly: ReadOnly$5
});

const QuestionControlProps$8 = {
  properties: {
    type: Object,
    required: true
  },
  widget: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: String
  },
  t: {
    type: Function,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$v = defineComponent({
  props: { ...QuestionControlProps$8,
    value: {
      type: String
    }
  },

  created() {
    var _this$onChange;

    if (!this.value) (_this$onChange = this.onChange) === null || _this$onChange === void 0 ? void 0 : _this$onChange.call(this, this.$data.defaultDate);
  },

  data() {
    var _this$properties, _this$properties2, _this$properties3;

    return {
      defaultDate: formatDateString(getDateByPropertyValue((_this$properties = this.properties) === null || _this$properties === void 0 ? void 0 : _this$properties.defaultDate)),
      minDate: formatDateString(getDateByPropertyValue((_this$properties2 = this.properties) === null || _this$properties2 === void 0 ? void 0 : _this$properties2.minDate)),
      maxDate: formatDateString(getDateByPropertyValue((_this$properties3 = this.properties) === null || _this$properties3 === void 0 ? void 0 : _this$properties3.maxDate))
    };
  },

  methods: {
    onDateChange(newDate) {
      var _this$onChange2;

      (_this$onChange2 = this.onChange) === null || _this$onChange2 === void 0 ? void 0 : _this$onChange2.call(this, newDate.target.value);
    }

  }
});

/* script */
const __vue_script__$v = script$v;
/* template */

var __vue_render__$v = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('input', {
    attrs: {
      "type": "date",
      "min": _vm.minDate,
      "max": _vm.maxDate
    },
    domProps: {
      "value": _vm.value || _vm.defaultDate
    },
    on: {
      "change": _vm.onDateChange
    }
  })]);
};

var __vue_staticRenderFns__$v = [];
/* style */

const __vue_inject_styles__$v = function (inject) {
  if (!inject) return;
  inject("data-v-9982ab16_0", {
    source: ".radio-item[data-v-9982ab16]{margin-right:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$v = "data-v-9982ab16";
/* module identifier */

const __vue_module_identifier__$v = undefined;
/* functional template */

const __vue_is_functional_template__$v = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$x = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$v,
  staticRenderFns: __vue_staticRenderFns__$v
}, __vue_inject_styles__$v, __vue_script__$v, __vue_scope_id__$v, __vue_is_functional_template__$v, __vue_module_identifier__$v, false, createInjector, undefined, undefined);

var Display$4 = __vue_component__$x;

const QuestionControlProps$7 = {
  properties: {
    type: Object,
    required: true
  },
  widget: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true
  },
  t: {
    type: Function,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$u = defineComponent({
  props: { ...QuestionControlProps$7
  },
  computed: {
    label() {
      var _this$widget, _this$widget2;

      const selectedOption = (_this$widget = this.widget) === null || _this$widget === void 0 ? void 0 : _this$widget.properties.controlProperties.options.find(f => f.value === this.value);
      return selectedOption !== null && selectedOption !== void 0 && selectedOption.labelKey ? this.t(selectedOption.labelKey, (_this$widget2 = this.widget) === null || _this$widget2 === void 0 ? void 0 : _this$widget2.id) : '';
    }

  }
});

/* script */
const __vue_script__$u = script$u;
/* template */

var __vue_render__$u = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v("\n  " + _vm._s(_vm.value) + "\n")]);
};

var __vue_staticRenderFns__$u = [];
/* style */

const __vue_inject_styles__$u = undefined;
/* scoped */

const __vue_scope_id__$u = undefined;
/* module identifier */

const __vue_module_identifier__$u = undefined;
/* functional template */

const __vue_is_functional_template__$u = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$w = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$u,
  staticRenderFns: __vue_staticRenderFns__$u
}, __vue_inject_styles__$u, __vue_script__$u, __vue_scope_id__$u, __vue_is_functional_template__$u, __vue_module_identifier__$u, false, undefined, undefined, undefined);

var ReadOnly$4 = __vue_component__$w;

var datePicker = new QuestionControl({
  display: Display$4,
  readOnly: ReadOnly$4
});

const QuestionControlProps$6 = {
  properties: {
    type: Object,
    required: true
  },
  widget: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true
  },
  t: {
    type: Function,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$t = defineComponent({
  props: { ...QuestionControlProps$6,
    widgetItem: Object,
    properties: Object,
    value: String
  },
  inject: ['pageEventListener', 'getPageState'],

  data() {
    return {
      options: [],
      attachedDependentCodeListeners: []
    };
  },

  created() {
    var _this$properties;

    if (!this.value && (_this$properties = this.properties) !== null && _this$properties !== void 0 && _this$properties.defaultValue) {
      var _this$onChange;

      (_this$onChange = this.onChange) === null || _this$onChange === void 0 ? void 0 : _this$onChange.call(this, this.properties.defaultValue);
    }
  },

  unmounted() {
    // remove conditional listeners
    this.attachedDependentCodeListeners.forEach(_ref => {
      var _this$pageEventListen;

      let [name, fn] = _ref;
      (_this$pageEventListen = this.pageEventListener) === null || _this$pageEventListen === void 0 ? void 0 : _this$pageEventListen.remove(name, fn);
    });
  },

  watch: {
    ['properties.options']: {
      async handler() {
        var _this$widget, _this$widget2;

        // recursively go through conditions and get all facts
        const getConditionFacts = conditions => {
          return [...new Set(conditions.reduce((arr, condition) => {
            if (condition.any) {
              return [...arr, ...getConditionFacts(condition.any)];
            } else if (condition.all) {
              return [...arr, ...getConditionFacts(condition.all)];
            } else {
              return [...arr, condition.fact];
            }
          }, []))];
        }; // go through each option and extract condition fact names


        const allDependentCodes = [...new Set((_this$widget = this.widget) === null || _this$widget === void 0 ? void 0 : _this$widget.properties.controlProperties.options.reduce((arr, option) => {
          var _option$conditions;

          return [...arr, ...((_option$conditions = option.conditions) !== null && _option$conditions !== void 0 && _option$conditions.length ? getConditionFacts(option.conditions) : [])];
        }, []))]; // sync listeners for filtering options

        (_this$widget2 = this.widget) === null || _this$widget2 === void 0 ? void 0 : _this$widget2.setListenerSet('options', allDependentCodes.map(c => `${c}_change`), () => this.setFilteredOptions()); // set initial filtered options

        this.setFilteredOptions();
      },

      immediate: true
    }
  },
  computed: {
    selectedValue() {
      return this.$data.options.find(o => o.value === this.value);
    }

  },
  methods: {
    async setFilteredOptions() {
      this.$data.options = (await this.getFilteredOptions()).map(opt => ({
        value: opt.value,
        label: this.t(opt.labelKey)
      }));
    },

    async getFilteredOptions() {
      var _this$widget3;

      // build facts data into:
      // { [idOrCode: string]: response }
      const validateData = Object.keys(this.widgetItems || {}).reduce((obj, widgetItemId) => {
        var _this$getPageState, _this$getPageState$wi;

        const response = (_this$getPageState = this.getPageState()) === null || _this$getPageState === void 0 ? void 0 : (_this$getPageState$wi = _this$getPageState.widgetState[widgetItemId]) === null || _this$getPageState$wi === void 0 ? void 0 : _this$getPageState$wi.response;

        if (response) {
          obj[widgetItemId] = response;

          if (this.widgetItems[widgetItemId].code) {
            obj[this.widgetItems[widgetItemId].code || ''] = response;
          }
        }

        return obj;
      }, {}); // go through each option and validate them based on its conditions
      // (if they have any) against responses set above.
      // Only return ones that meets validate() or does not have conditions at all

      return (await Promise.all((_this$widget3 = this.widget) === null || _this$widget3 === void 0 ? void 0 : _this$widget3.properties.controlProperties.options.map(async opt => {
        var _opt$conditions, _this$widget4;

        return !((_opt$conditions = opt.conditions) !== null && _opt$conditions !== void 0 && _opt$conditions.length) || (await ((_this$widget4 = this.widget) === null || _this$widget4 === void 0 ? void 0 : _this$widget4.validator.validate(opt.conditions, validateData))) ? opt : null;
      }))).filter(a => a);
    },

    onSelectChange(ev) {
      var _this$onChange2;

      (_this$onChange2 = this.onChange) === null || _this$onChange2 === void 0 ? void 0 : _this$onChange2.call(this, ev.target.value);
    }

  }
});

/* script */
const __vue_script__$t = script$t;
/* template */

var __vue_render__$t = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('select', {
    domProps: {
      "value": _vm.value || ''
    },
    on: {
      "change": _vm.onSelectChange
    }
  }, [_c('option', {
    attrs: {
      "value": "",
      "disabled": ""
    }
  }, [_vm._v(_vm._s(_vm.t('__placeholder')))]), _vm._v(" "), _vm._l(_vm.options, function (option) {
    return _c('option', {
      key: option.value,
      domProps: {
        "value": option.value,
        "selected": _vm.value === option.value
      }
    }, [_vm._v("\n      " + _vm._s(option.label) + "\n    ")]);
  })], 2)]);
};

var __vue_staticRenderFns__$t = [];
/* style */

const __vue_inject_styles__$t = function (inject) {
  if (!inject) return;
  inject("data-v-8ab8e6c2_0", {
    source: ".radio-item[data-v-8ab8e6c2]{margin-right:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$t = "data-v-8ab8e6c2";
/* module identifier */

const __vue_module_identifier__$t = undefined;
/* functional template */

const __vue_is_functional_template__$t = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$v = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$t,
  staticRenderFns: __vue_staticRenderFns__$t
}, __vue_inject_styles__$t, __vue_script__$t, __vue_scope_id__$t, __vue_is_functional_template__$t, __vue_module_identifier__$t, false, createInjector, undefined, undefined);

var Display$3 = __vue_component__$v;

var script$s = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
    errors: Array,
    t: Function
  },

  data() {
    return {
      translatedLabel: ''
    };
  },

  methods: {
    getLabelByValue(value) {
      var _this$$props$properti;

      return this.t(((_this$$props$properti = this.$props.properties.options.find(o => o.value === value)) === null || _this$$props$properti === void 0 ? void 0 : _this$$props$properti.labelKey) || '', this.$props.widget.id);
    }

  },
  watch: {
    value: {
      handler(value) {
        this.$data.translatedLabel = this.getLabelByValue(value);
      },

      immediate: true
    }
  }
});

/* script */
const __vue_script__$s = script$s;
/* template */

var __vue_render__$s = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v("\n  " + _vm._s(_vm.translatedLabel) + "\n")]);
};

var __vue_staticRenderFns__$s = [];
/* style */

const __vue_inject_styles__$s = undefined;
/* scoped */

const __vue_scope_id__$s = undefined;
/* module identifier */

const __vue_module_identifier__$s = undefined;
/* functional template */

const __vue_is_functional_template__$s = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$u = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$s,
  staticRenderFns: __vue_staticRenderFns__$s
}, __vue_inject_styles__$s, __vue_script__$s, __vue_scope_id__$s, __vue_is_functional_template__$s, __vue_module_identifier__$s, false, undefined, undefined, undefined);

var ReadOnly$3 = __vue_component__$u;

var dropdown = new QuestionControl({
  display: Display$3,
  readOnly: ReadOnly$3
});

const QuestionControlProps$5 = {
  properties: {
    type: Object,
    required: true
  },
  widget: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true
  },
  t: {
    type: Function,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$r = defineComponent({
  props: { ...QuestionControlProps$5,
    value: Number
  },

  created() {
    var _this$properties;

    // if value has not been set and default is set, set value to default
    if (this.value === undefined && ((_this$properties = this.properties) === null || _this$properties === void 0 ? void 0 : _this$properties.default) !== undefined) this.changeValue(this.properties.default, true);
  },

  computed: {
    step() {
      var _this$properties2;

      return ((_this$properties2 = this.properties) === null || _this$properties2 === void 0 ? void 0 : _this$properties2.step) || 1;
    },

    numValue() {
      var _this$properties3, _this$properties4;

      if (this.value !== undefined) return this.value;
      if (((_this$properties3 = this.properties) === null || _this$properties3 === void 0 ? void 0 : _this$properties3.default) !== undefined) return this.properties.default;
      if (((_this$properties4 = this.properties) === null || _this$properties4 === void 0 ? void 0 : _this$properties4.min) !== undefined) return this.properties.min;
      return 0;
    }

  },
  methods: {
    changeValue(newNum, ignoreChecks) {
      var _this$properties5, _this$properties6, _this$properties7, _this$properties8, _this$onChange;

      if (/^[^0-9]+$/.test(newNum.toString())) return;

      let _newNum = parseInt(newNum.toString(), 10);

      if (((_this$properties5 = this.properties) === null || _this$properties5 === void 0 ? void 0 : _this$properties5.min) !== undefined && _newNum < ((_this$properties6 = this.properties) === null || _this$properties6 === void 0 ? void 0 : _this$properties6.min)) _newNum = this.properties.min;
      if (((_this$properties7 = this.properties) === null || _this$properties7 === void 0 ? void 0 : _this$properties7.max) !== undefined && _newNum > ((_this$properties8 = this.properties) === null || _this$properties8 === void 0 ? void 0 : _this$properties8.max)) _newNum = this.properties.max;
      (_this$onChange = this.onChange) === null || _this$onChange === void 0 ? void 0 : _this$onChange.call(this, _newNum, ignoreChecks);
    }

  }
});

/* script */
const __vue_script__$r = script$r;
/* template */

var __vue_render__$r = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('button', {
    on: {
      "click": function () {
        return _vm.changeValue(_vm.numValue - _vm.step);
      }
    }
  }, [_vm._v("-")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "number",
      "step": _vm.step
    },
    domProps: {
      "value": _vm.numValue
    },
    on: {
      "keyup": function (ev) {
        return _vm.changeValue(ev.target.value);
      }
    }
  }), _vm._v(" "), _c('button', {
    on: {
      "click": function () {
        return _vm.changeValue(_vm.numValue + _vm.step);
      }
    }
  }, [_vm._v("+")])]);
};

var __vue_staticRenderFns__$r = [];
/* style */

const __vue_inject_styles__$r = function (inject) {
  if (!inject) return;
  inject("data-v-30f5c940_0", {
    source: "input[data-v-30f5c940]::-webkit-inner-spin-button,input[data-v-30f5c940]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$r = "data-v-30f5c940";
/* module identifier */

const __vue_module_identifier__$r = undefined;
/* functional template */

const __vue_is_functional_template__$r = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$t = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$r,
  staticRenderFns: __vue_staticRenderFns__$r
}, __vue_inject_styles__$r, __vue_script__$r, __vue_scope_id__$r, __vue_is_functional_template__$r, __vue_module_identifier__$r, false, createInjector, undefined, undefined);

var Display$2 = __vue_component__$t;

const QuestionControlProps$4 = {
  properties: {
    type: Object,
    required: true
  },
  widget: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true
  },
  t: {
    type: Function,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$q = defineComponent({
  props: { ...QuestionControlProps$4,
    value: Number
  }
});

/* script */
const __vue_script__$q = script$q;
/* template */

var __vue_render__$q = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v("\n  " + _vm._s(_vm.value || _vm.widget.properties.controlProperties.default) + "\n")]);
};

var __vue_staticRenderFns__$q = [];
/* style */

const __vue_inject_styles__$q = undefined;
/* scoped */

const __vue_scope_id__$q = undefined;
/* module identifier */

const __vue_module_identifier__$q = undefined;
/* functional template */

const __vue_is_functional_template__$q = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$s = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$q,
  staticRenderFns: __vue_staticRenderFns__$q
}, __vue_inject_styles__$q, __vue_script__$q, __vue_scope_id__$q, __vue_is_functional_template__$q, __vue_module_identifier__$q, false, undefined, undefined, undefined);

var ReadOnly$2 = __vue_component__$s;

var numberPicker = new QuestionControl({
  builder: Display$2,
  display: Display$2,
  readOnly: ReadOnly$2
});

const QuestionControlProps$3 = {
  properties: {
    type: Object,
    required: true
  },
  widget: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true
  },
  t: {
    type: Function,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$p = defineComponent({
  props: { ...QuestionControlProps$3,
    value: String
  },
  methods: {
    onSelect(ev) {
      var _this$onChange;

      (_this$onChange = this.onChange) === null || _this$onChange === void 0 ? void 0 : _this$onChange.call(this, ev.target.value);
    }

  }
});

/* script */
const __vue_script__$p = script$p;
/* template */

var __vue_render__$p = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._l(_vm.properties.options, function (option) {
    return _c('label', {
      key: option.value,
      staticClass: "radio-item"
    }, [_c('input', {
      attrs: {
        "type": "radio",
        "name": _vm.widget.id
      },
      domProps: {
        "checked": _vm.value === option.value,
        "value": option.value
      },
      on: {
        "change": _vm.onSelect
      }
    }), _vm._v("\n    " + _vm._s(_vm.t(option.labelKey, _vm.widget.id)) + "\n  ")]);
  }), 0);
};

var __vue_staticRenderFns__$p = [];
/* style */

const __vue_inject_styles__$p = function (inject) {
  if (!inject) return;
  inject("data-v-0fd43287_0", {
    source: ".radio-item[data-v-0fd43287]{margin-right:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$p = "data-v-0fd43287";
/* module identifier */

const __vue_module_identifier__$p = undefined;
/* functional template */

const __vue_is_functional_template__$p = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$r = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$p,
  staticRenderFns: __vue_staticRenderFns__$p
}, __vue_inject_styles__$p, __vue_script__$p, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, false, createInjector, undefined, undefined);

var Display$1 = __vue_component__$r;

const QuestionControlProps$2 = {
  properties: {
    type: Object,
    required: true
  },
  widget: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true
  },
  t: {
    type: Function,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$o = defineComponent({
  props: { ...QuestionControlProps$2,
    value: String
  },
  computed: {
    label() {
      var _this$widget, _this$widget2;

      const selectedOption = (_this$widget = this.widget) === null || _this$widget === void 0 ? void 0 : _this$widget.properties.controlProperties.options.find(f => f.value === this.value);
      return selectedOption !== null && selectedOption !== void 0 && selectedOption.labelKey ? this.t(selectedOption.labelKey, (_this$widget2 = this.widget) === null || _this$widget2 === void 0 ? void 0 : _this$widget2.id) : '';
    }

  }
});

/* script */
const __vue_script__$o = script$o;
/* template */

var __vue_render__$o = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v("\n  " + _vm._s(_vm.label) + "\n")]);
};

var __vue_staticRenderFns__$o = [];
/* style */

const __vue_inject_styles__$o = undefined;
/* scoped */

const __vue_scope_id__$o = undefined;
/* module identifier */

const __vue_module_identifier__$o = undefined;
/* functional template */

const __vue_is_functional_template__$o = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$q = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$o,
  staticRenderFns: __vue_staticRenderFns__$o
}, __vue_inject_styles__$o, __vue_script__$o, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, false, undefined, undefined, undefined);

var ReadOnly$1 = __vue_component__$q;

var radio = new QuestionControl({
  builder: Display$1,
  display: Display$1,
  readOnly: ReadOnly$1
});

const QuestionControlProps$1 = {
  properties: {
    type: Object,
    required: true
  },
  widget: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true
  },
  t: {
    type: Function,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$n = defineComponent({
  props: { ...QuestionControlProps$1,
    value: String
  },
  methods: {
    onTextChange(ev) {
      var _this$onChange;

      (_this$onChange = this.onChange) === null || _this$onChange === void 0 ? void 0 : _this$onChange.call(this, ev.target.value);
    }

  }
});

/* script */
const __vue_script__$n = script$n;
/* template */

var __vue_render__$n = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [!_vm.properties.multiline ? _c('input', {
    staticClass: "textInput",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.onTextChange
    }
  }) : _vm._e(), _vm._v(" "), _vm.properties.multiline ? _c('textarea', {
    staticClass: "textInput",
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.onTextChange
    }
  }) : _vm._e()]);
};

var __vue_staticRenderFns__$n = [];
/* style */

const __vue_inject_styles__$n = function (inject) {
  if (!inject) return;
  inject("data-v-5fb44e31_0", {
    source: ".textInput[data-v-5fb44e31]::-webkit-inner-spin-button,.textInput[data-v-5fb44e31]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}.textInput[data-v-5fb44e31]{min-height:42px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$n = "data-v-5fb44e31";
/* module identifier */

const __vue_module_identifier__$n = undefined;
/* functional template */

const __vue_is_functional_template__$n = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$p = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$n,
  staticRenderFns: __vue_staticRenderFns__$n
}, __vue_inject_styles__$n, __vue_script__$n, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, false, createInjector, undefined, undefined);

var Display = __vue_component__$p;

const QuestionControlProps = {
  properties: {
    type: Object,
    required: true
  },
  widget: {
    type: Object,
    required: true
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true
  },
  t: {
    type: Function,
    required: true
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    required: false
  }
};
var script$m = defineComponent({
  props: { ...QuestionControlProps,
    value: String
  }
});

/* script */
const __vue_script__$m = script$m;
/* template */

var __vue_render__$m = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v("\n  " + _vm._s(_vm.value || _vm.widget.properties.controlProperties.default) + "\n")]);
};

var __vue_staticRenderFns__$m = [];
/* style */

const __vue_inject_styles__$m = undefined;
/* scoped */

const __vue_scope_id__$m = undefined;
/* module identifier */

const __vue_module_identifier__$m = undefined;
/* functional template */

const __vue_is_functional_template__$m = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$o = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$m,
  staticRenderFns: __vue_staticRenderFns__$m
}, __vue_inject_styles__$m, __vue_script__$m, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, false, undefined, undefined, undefined);

var ReadOnly = __vue_component__$o;

var text = new QuestionControl({
  display: Display,
  readOnly: ReadOnly
});

const questionControls = {
  buttonGroup,
  checkbox,
  datePicker,
  dropdown,
  numberPicker,
  radio,
  text
};

class PageEventListener {
  constructor(opts) {
    _defineProperty(this, "_listenerFns", {});

    _defineProperty(this, "_emitEvent", void 0);

    this._emitEvent = opts.emitEvent;
  }

  addChangeListener(widgetIdOrCode, fn) {
    this.add(`${widgetIdOrCode}_change`, fn);
  }

  add(listenerKey, fn) {
    if (!this._listenerFns[listenerKey]) this._listenerFns[listenerKey] = [];

    this._listenerFns[listenerKey].push(fn);
  }

  remove(listenerKey, fn) {
    if (!this._listenerFns[listenerKey]) return;
    this._listenerFns[listenerKey] = this._listenerFns[listenerKey].filter(f => f !== fn);
  }

  emit(listenerKey, value, opts) {
    (this._listenerFns[listenerKey] || []).forEach(fn => fn());

    if (opts !== null && opts !== void 0 && opts.toExternal) {
      this._emitEvent(listenerKey, value, opts.widgetItem);
    }
  }

}

var script$l = defineComponent({
  components: {
    WidgetsLayout
  },
  emits: {
    event: _options => true,
    onStateChange: _newState => true,
    onPageChange: _newPage => true
  },
  props: {
    languages: {
      type: Object,
      required: true
    },
    page: {
      type: Object,
      required: true
    },
    onPageChange: Function,
    state: {
      type: Object,
      required: true
    },
    widgetControls: Object,
    questionControls: Object,
    widgetEffectControls: Object,
    plugins: Array,
    // display | page | readOnly
    view: String,
    config: Object
  },

  data() {
    return {
      widgetItems: {},
      pageEventListener: new PageEventListener({
        emitEvent: this.emitEvent
      })
    };
  },

  computed: {
    widgetItemsArr() {
      return this.page.widgets;
    },

    combWidgetControls() {
      var _this$config, _this$config$widgetCo, _ref;

      return cachedMerge('widgetControls', (_this$config = this.config) !== null && _this$config !== void 0 && (_this$config$widgetCo = _this$config.widgetControls) !== null && _this$config$widgetCo !== void 0 && _this$config$widgetCo.disableInternalControls ? {} : widgets, ...((_ref = this.plugins || []) === null || _ref === void 0 ? void 0 : _ref.map(p => p.widgetControls)), this.widgetControls);
    },

    combWidgetEffectControls() {
      var _this$config2, _this$config2$widgetE, _ref2;

      return cachedMerge('widgetEffectControls', (_this$config2 = this.config) !== null && _this$config2 !== void 0 && (_this$config2$widgetE = _this$config2.widgetEffectControls) !== null && _this$config2$widgetE !== void 0 && _this$config2$widgetE.disableInternalControls ? {} : widgetEffects, ...((_ref2 = this.plugins || []) === null || _ref2 === void 0 ? void 0 : _ref2.map(p => p.widgetEffectControls)), this.widgetEffectControls);
    },

    combQuestionControls() {
      var _this$config3, _this$config3$questio, _ref3;

      return cachedMerge('questionControls', (_this$config3 = this.config) !== null && _this$config3 !== void 0 && (_this$config3$questio = _this$config3.questionControls) !== null && _this$config3$questio !== void 0 && _this$config3$questio.disableInternalControls ? {} : questionControls, ...((_ref3 = this.plugins || []) === null || _ref3 === void 0 ? void 0 : _ref3.map(p => p.questionControls)), this.questionControls);
    },

    validations() {
      var _this$config4, _this$config4$validat, _this$config5, _this$config5$validat;

      return {
        rules: { ...validationRules,
          ...((_this$config4 = this.config) === null || _this$config4 === void 0 ? void 0 : (_this$config4$validat = _this$config4.validations) === null || _this$config4$validat === void 0 ? void 0 : _this$config4$validat.rules)
        },
        facts: { ...((_this$config5 = this.config) === null || _this$config5 === void 0 ? void 0 : (_this$config5$validat = _this$config5.validations) === null || _this$config5$validat === void 0 ? void 0 : _this$config5$validat.facts)
        }
      };
    },

    pageState() {
      return this.state;
    }

  },
  watch: {
    languages: {
      handler() {
        this.pageEventListener.emit('languages_changed', {});
      }

    },
    'page.widgets': {
      handler(newPageWidgetArr) {
        var _this$config6, _this$config6$widgets;

        this.widgetItems = newPageWidgetArr.reduce((obj, widget) => {
          var _this$combWidgetContr;

          const WidgetItemClass = ((_this$combWidgetContr = this.combWidgetControls[widget.type]) === null || _this$combWidgetContr === void 0 ? void 0 : _this$combWidgetContr.widgetItem) || WidgetItem;
          obj[widget.id] = new WidgetItemClass({
            widget,
            pageEventListener: this.pageEventListener,
            emitEvent: this.emitEvent,
            t: (key, data) => this.t([widget.id, key], data),
            getState: () => this.state,
            setState: newPageState => {
              this.$emit('onStateChange', newPageState);
            },
            onUpdate: newWidget => {
              this._onPageChange({ ...this.page,
                widgets: Object.values({ ...this.widgetItems,
                  // clone widget object to trigger change
                  [newWidget.id]: Object.assign(Object.create(Object.getPrototypeOf(newWidget)), newWidget)
                })
              });
            },
            getQuestionControls: () => this.combQuestionControls,
            getConfig: this.getConfig,
            getWidgetMeta: () => {
              var _this$getConfig, _this$getConfig$meta;

              return (_this$getConfig = this.getConfig()) === null || _this$getConfig === void 0 ? void 0 : (_this$getConfig$meta = _this$getConfig.meta) === null || _this$getConfig$meta === void 0 ? void 0 : _this$getConfig$meta[widget.type];
            },
            getValidator: this.getValidator
          });
          return obj;
        }, {});
        Object.values(this.widgetItems).forEach(widgetItem => {
          widgetItem.setWidgetItems(this.widgetItems);
        });

        if ((_this$config6 = this.config) !== null && _this$config6 !== void 0 && (_this$config6$widgets = _this$config6.widgetsToExclude) !== null && _this$config6$widgets !== void 0 && _this$config6$widgets.length) {
          this.excludeWidgets(this.config.widgetsToExclude);
        }
      },

      immediate: true // deep: true,

    },
    'config.widgetsToExclude': {
      handler() {
        var _this$config7, _this$config7$widgets;

        if ((_this$config7 = this.config) !== null && _this$config7 !== void 0 && (_this$config7$widgets = _this$config7.widgetsToExclude) !== null && _this$config7$widgets !== void 0 && _this$config7$widgets.length) {
          this.excludeWidgets(this.config.widgetsToExclude);
        }
      },

      deep: true
    }
  },
  methods: {
    _onPageChange(newPage) {
      var _this$onPageChange;

      (_this$onPageChange = this.onPageChange) === null || _this$onPageChange === void 0 ? void 0 : _this$onPageChange.call(this, newPage);
      this.$emit('onPageChange', newPage);
    },

    t(key, data) {
      return translate(this.languages, key, data);
    },

    getConfig() {
      return { ...this.config,
        validations: this.validations
      };
    },

    getValidator() {
      const validator = new Validator(this.validations);
      return validator;
    },

    getRuleEngine() {
      return this.getValidator().getRuleEngine();
    },

    excludeWidgets(widgetIdsOrCodes) {
      // map and ensure a list of ids (config.widgetsToExclude can be code or id)
      const excludedWidgetIds = Object.values(this.widgetItems).filter(w => widgetIdsOrCodes.includes(w.id) || widgetIdsOrCodes.includes(w.code || '')).map(w => w.id); // go through widgets and remove all widgets

      excludedWidgetIds.forEach(widgetId => {
        delete this.widgetItems[widgetId];
      }); // go through all pages and remove all pages that only holds excluded widgets

      Object.values(this.widgetItems).forEach(widget => {
        if (widget.type === 'pages') {
          const pages = widget.properties.pages; // go through each page from the end to start, and remove any
          // children excluded. If pages is empty after, remove it as well

          for (let p = pages.length - 1; p >= 0; p--) {
            const children = pages[p].children;

            for (let c = children.length - 1; c >= 0; c--) {
              if (excludedWidgetIds.includes(children[c])) {
                children.splice(c, 1);
              }
            }

            if (!children.length) {
              pages.splice(p, 1);
            }
          }
        }
      });
    },

    async emitEvent(name, value, widget) {
      if (Array.isArray(this.$listeners.event)) {
        await Promise.all(this.$listeners.event.map(evFn => evFn({
          name,
          value,
          widget,
          pageState: this.pageState,
          widgetItems: this.widgetItems
        })));
      } else {
        var _this$$listeners$even, _this$$listeners;

        await ((_this$$listeners$even = (_this$$listeners = this.$listeners).event) === null || _this$$listeners$even === void 0 ? void 0 : _this$$listeners$even.call(_this$$listeners, {
          name,
          value,
          widget,
          pageState: this.pageState,
          widgetItems: this.widgetItems
        }));
      }
    },

    async validateAll(opts) {
      const validationResults = await Object.values(this.widgetItems).reduce(async (obj, wi) => {
        const _obj = await obj;

        const result = await wi.runValidations({
          setDirty: (opts === null || opts === void 0 ? void 0 : opts.setDirty) || false
        }); // if result is null or all warnings,
        // there's no error to handle, just return

        if (!result || (result || []).every(e => e.isWarning)) {
          return _obj;
        }

        _obj[wi.code || wi.id] = result;
        return _obj;
      }, Promise.resolve({}));
      return validationResults;
    }

  },

  provide() {
    return {
      getConfig: this.getConfig,
      getView: () => this.view,
      t: this.t,
      pageEventListener: this.pageEventListener,
      languages: this.languages,
      getPageState: () => this.state,
      setPageState: newPageState => {
        this.$emit('onStateChange', newPageState);
      },
      emitEvent: this.emitEvent,
      widgetEffectControls: this.combWidgetEffectControls,
      widgetControls: this.combWidgetControls,
      questionControls: this.combQuestionControls,
      validateAll: this.validateAll,
      validations: this.validations,
      getRuleEngine: this.getRuleEngine,
      getValidator: this.getValidator
    };
  },

  expose: ['validateAll']
});

/* script */
const __vue_script__$l = script$l;
/* template */

var __vue_render__$l = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "main-wrapper"
  }, [_c('widgets-layout', {
    attrs: {
      "widgetControls": _vm.combWidgetControls,
      "widgetItems": _vm.widgetItems
    }
  })], 1);
};

var __vue_staticRenderFns__$l = [];
/* style */

const __vue_inject_styles__$l = function (inject) {
  if (!inject) return;
  inject("data-v-4d51478b_0", {
    source: ".main-wrapper[data-v-4d51478b]{font-family:Arial,Helvetica,sans-serif}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$l = "data-v-4d51478b";
/* module identifier */

const __vue_module_identifier__$l = undefined;
/* functional template */

const __vue_is_functional_template__$l = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$m = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$l,
  staticRenderFns: __vue_staticRenderFns__$l
}, __vue_inject_styles__$l, __vue_script__$l, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, false, createInjector, undefined, undefined);

var __vue_component__$n = __vue_component__$m;

var script$k = defineComponent({
  props: {
    position: {
      type: String,
      default: 'left'
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    paneWidth: {
      type: Number,
      default: 300
    }
  }
});

/* script */
const __vue_script__$k = script$k;
/* template */

var __vue_render__$k = function () {
  var _obj;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "pane-wrapper",
    class: {
      isOpen: _vm.isOpen
    }
  }, [_vm.position === 'left' ? _c('div', {
    staticClass: "pane-content-wrapper left",
    style: {
      width: _vm.paneWidth + 'px'
    }
  }, [_vm._t("pane-content")], 2) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "pane-outside-wrapper",
    style: (_obj = {}, _obj[_vm.position === 'left' ? 'marginLeft' : 'marginRight'] = _vm.paneWidth + 'px', _obj)
  }, [_vm._t("default")], 2), _vm._v(" "), _vm.position === 'right' ? _c('div', {
    staticClass: "pane-content-wrapper right",
    style: {
      width: _vm.paneWidth + 'px'
    }
  }, [_vm._t("pane-content")], 2) : _vm._e()]);
};

var __vue_staticRenderFns__$k = [];
/* style */

const __vue_inject_styles__$k = function (inject) {
  if (!inject) return;
  inject("data-v-81b41c56_0", {
    source: ".pane-wrapper[data-v-81b41c56]{display:flex;flex-direction:row;align-items:stretch;height:100%;position:relative}.pane-outside-wrapper[data-v-81b41c56]{flex:1;position:relative}.pane-content-wrapper[data-v-81b41c56]{position:absolute;top:0;height:100%;z-index:10;background-color:#fff;box-shadow:0 0 4px -2px #000;overflow:hidden;display:flex;flex-direction:column}.pane-content-wrapper.left[data-v-81b41c56]{left:0}.pane-content-wrapper.right[data-v-81b41c56]{right:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$k = "data-v-81b41c56";
/* module identifier */

const __vue_module_identifier__$k = undefined;
/* functional template */

const __vue_is_functional_template__$k = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$l = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$k,
  staticRenderFns: __vue_staticRenderFns__$k
}, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, false, createInjector, undefined, undefined);

var Pane = __vue_component__$l;

class PanelSection {
  constructor(_ref) {
    let {
      form,
      header,
      name,
      key
    } = _ref;

    _defineProperty(this, "_form", void 0);

    _defineProperty(this, "_header", void 0);

    _defineProperty(this, "_name", void 0);

    _defineProperty(this, "_key", void 0);

    this._form = form;
    this._header = header;
    this._name = name;
    this._key = key;
  }

  get form() {
    return this._form;
  }

  get header() {
    return this._header;
  }

  get name() {
    return this._name;
  }

  get key() {
    return this._key;
  }

}

var script$j = defineComponent({
  components: {
    BuilderWidgetTree
  },
  inject: ['widgetControls'],
  props: {
    widgetItems: Object,
    selectedWidgetItem: Object
  }
});

/* script */
const __vue_script__$j = script$j;
/* template */

var __vue_render__$j = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "wrapper"
  }, [_vm._l(_vm.widgetControls, function (widgetControl, widgetControlKey) {
    return [_c('a', {
      key: widgetControlKey,
      staticClass: "widget-item"
    }, [_vm._v("\n        " + _vm._s(widgetControlKey) + "\n      ")])];
  })], 2);
};

var __vue_staticRenderFns__$j = [];
/* style */

const __vue_inject_styles__$j = function (inject) {
  if (!inject) return;
  inject("data-v-7f636591_0", {
    source: ".wrapper[data-v-7f636591]{display:flex;flex-direction:row;flex-wrap:wrap;height:auto}.widget-item[data-v-7f636591]{display:block;width:33%;border:1px solid #f2f2f2;border-radius:4px;padding:5px;box-sizing:border-box}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$j = "data-v-7f636591";
/* module identifier */

const __vue_module_identifier__$j = undefined;
/* functional template */

const __vue_is_functional_template__$j = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$k = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$j,
  staticRenderFns: __vue_staticRenderFns__$j
}, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, false, createInjector, undefined, undefined);

var Form$5 = __vue_component__$k;

var script$i = defineComponent({
  props: {
    panelType: String,
    widgetItems: Object
  }
});

/* script */
const __vue_script__$i = script$i;
/* template */

var __vue_render__$i = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div');
};

var __vue_staticRenderFns__$i = [];
/* style */

const __vue_inject_styles__$i = undefined;
/* scoped */

const __vue_scope_id__$i = undefined;
/* module identifier */

const __vue_module_identifier__$i = undefined;
/* functional template */

const __vue_is_functional_template__$i = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$j = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, false, undefined, undefined, undefined);

var Header$5 = __vue_component__$j;

var addWidget = new PanelSection({
  key: 'addWidget',
  name: 'Add Widget',
  form: Form$5,
  header: Header$5
});

var script$h = defineComponent({
  props: {
    widgetItems: Object,
    selectedWidgetItem: Object
  },
  inject: ['widgetEffectControls'],
  methods: {
    onPropertiesChange(type, props) {
      this.$props.selectedWidgetItem.setEffectProperties(type, props);
    },

    removeEffect(effect) {
      this.$props.selectedWidgetItem.removeEffect(effect.type);
    }

  }
});

/* script */
const __vue_script__$h = script$h;
/* template */

var __vue_render__$h = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm.selectedWidgetItem ? _c('div', {
    staticClass: "existing-effects-wrapper"
  }, _vm._l(_vm.selectedWidgetItem.effects, function (effect) {
    return _c('div', {
      key: effect.type,
      staticClass: "effect-wrapper"
    }, [_c('a', {
      staticClass: "remove-effect-button",
      on: {
        "click": function () {
          return _vm.removeEffect(effect);
        }
      }
    }, [_vm._v("🗑")]), _vm._v(" "), _c('h6', {
      staticClass: "effect-header"
    }, [_vm._v("\n        " + _vm._s(_vm.widgetEffectControls[effect.type].name) + "\n      ")]), _vm._v(" "), _c(_vm.widgetEffectControls[effect.type].form, {
      tag: "component",
      attrs: {
        "effect": effect,
        "properties": effect.properties,
        "widgetItem": _vm.selectedWidgetItem
      },
      on: {
        "onPropertiesChange": function (props) {
          return _vm.onPropertiesChange(effect.type, props);
        }
      }
    })], 1);
  }), 0) : _vm._e()]);
};

var __vue_staticRenderFns__$h = [];
/* style */

const __vue_inject_styles__$h = function (inject) {
  if (!inject) return;
  inject("data-v-77374f20_0", {
    source: ".effect-wrapper[data-v-77374f20]{position:relative;background-color:#fdfdfd;padding:0 5px 10px 5px}.effect-wrapper[data-v-77374f20]:not(:last-child){margin-bottom:1px}.remove-effect-button[data-v-77374f20]{position:absolute;top:0;right:0;padding:1px 10px;cursor:pointer;font-size:9pt}.effect-header[data-v-77374f20]{margin:0 -5px 0 -5px;padding:5px;background-color:#bcdff0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$h = "data-v-77374f20";
/* module identifier */

const __vue_module_identifier__$h = undefined;
/* functional template */

const __vue_is_functional_template__$h = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$i = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, false, createInjector, undefined, undefined);

var Form$4 = __vue_component__$i;

var script$g = defineComponent({
  props: {
    panelType: String,
    widgetItems: Object,
    selectedWidgetItem: Object
  },
  inject: ['widgetEffectControls'],

  data() {
    return {
      panelSections
    };
  },

  computed: {
    panelSectionsAvailable() {
      if (!this.$props.selectedWidgetItem) return [];
      return Object.keys(this.widgetEffectControls).reduce((arr, effectKey) => {
        var _this$$props$selected, _this$$props$selected2, _this$$props$selected3, _this$$props$selected4;

        if (!((_this$$props$selected = this.$props.selectedWidgetItem) !== null && _this$$props$selected !== void 0 && (_this$$props$selected2 = _this$$props$selected.effects) !== null && _this$$props$selected2 !== void 0 && _this$$props$selected2.length) || (_this$$props$selected3 = this.$props.selectedWidgetItem) !== null && _this$$props$selected3 !== void 0 && (_this$$props$selected4 = _this$$props$selected3.effects) !== null && _this$$props$selected4 !== void 0 && _this$$props$selected4.every(effect => effect.type !== effectKey)) {
          // doesn't exists in widget item, can add to array
          arr.push(this.widgetEffectControls[effectKey]);
        }

        return arr;
      }, []);
    }

  },
  methods: {
    onAddEffect(ev) {
      const selectedEffectKey = ev.target.value;
      ev.target.value = '';

      if (!this.widgetEffectControls[selectedEffectKey]) {
        // effect key does not exist?? skip for now
        return;
      }

      this.$props.selectedWidgetItem.addEffect(this.widgetEffectControls[selectedEffectKey].create());
    }

  }
});

/* script */
const __vue_script__$g = script$g;
/* template */

var __vue_render__$g = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.selectedWidgetItem ? _c('div', [_c('select', {
    on: {
      "change": _vm.onAddEffect
    }
  }, [_c('option', {
    staticClass: "default",
    attrs: {
      "value": "",
      "disabled": "",
      "selected": ""
    }
  }, [_vm._v("+")]), _vm._v(" "), _vm._l(_vm.panelSectionsAvailable, function (panelSection) {
    return _c('option', {
      key: panelSection.key,
      domProps: {
        "value": panelSection.key
      }
    }, [_vm._v("\n      " + _vm._s(panelSection.name) + "\n    ")]);
  })], 2)]) : _vm._e();
};

var __vue_staticRenderFns__$g = [];
/* style */

const __vue_inject_styles__$g = function (inject) {
  if (!inject) return;
  inject("data-v-2421d1ea_0", {
    source: "select[data-v-2421d1ea]{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:1px 6px;border-radius:4px;border:none;background-color:transparent;cursor:pointer}select option.default[data-v-2421d1ea]{text-align:right}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$g = "data-v-2421d1ea";
/* module identifier */

const __vue_module_identifier__$g = undefined;
/* functional template */

const __vue_is_functional_template__$g = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$h = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, false, createInjector, undefined, undefined);

var Header$4 = __vue_component__$h;

var effects = new PanelSection({
  key: 'effects',
  name: 'Effects',
  form: Form$4,
  header: Header$4
});

var script$f = defineComponent({
  props: {
    widgetItems: Object,
    selectedWidgetItem: Object
  },
  inject: ['t', 'widgetEffectControls'],
  methods: {
    conditionValue(value) {
      if (Array.isArray(value)) {
        return value.join(', ');
      } else if (value === null) {
        return 'null';
      } else if (value === undefined) {
        return 'undefined';
      } else {
        return value;
      }
    },

    onPropertiesChange(type, props) {
      this.$props.selectedWidgetItem.setEffectProperties(type, props);
    },

    removeEffect(effect) {
      this.$props.selectedWidgetItem.removeEffect(effect.type);
    }

  }
});

/* script */
const __vue_script__$f = script$f;
/* template */

var __vue_render__$f = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.selectedWidgetItem ? _c('div', _vm._l(_vm.selectedWidgetItem.reflexiveRules, function (condition, conditionIndex) {
    return _c('div', {
      key: conditionIndex,
      staticClass: "condition-wrapper"
    }, [_c('label', [_vm._v("condition " + _vm._s(conditionIndex + 1))]), _vm._v(" "), _c('div', {
      staticClass: "condition-fields-wrapper"
    }, [_c('input', {
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": condition.fact
      }
    }), _vm._v(" "), _c('select', [_c('option', {
      attrs: {
        "value": "in"
      },
      domProps: {
        "selected": condition.operator === 'in'
      }
    }, [_vm._v("in")]), _vm._v(" "), _c('option', {
      attrs: {
        "value": "equal"
      },
      domProps: {
        "selected": condition.operator === 'equal'
      }
    }, [_vm._v("\n          equals\n        ")]), _vm._v(" "), _c('option', {
      attrs: {
        "value": "notEqual"
      },
      domProps: {
        "selected": condition.operator === 'notEqual'
      }
    }, [_vm._v("\n          not equal\n        ")]), _vm._v(" "), _c('option', {
      attrs: {
        "value": "greaterThanInclusive"
      },
      domProps: {
        "selected": condition.operator === 'greaterThanInclusive'
      }
    }, [_vm._v("\n          >=\n        ")]), _vm._v(" "), _c('option', {
      attrs: {
        "value": "lessThanInclusive"
      },
      domProps: {
        "selected": condition.operator === 'lessThanInclusive'
      }
    }, [_vm._v("\n          " + _vm._s('<=') + "\n        ")])]), _vm._v(" "), _c('input', {
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": _vm.conditionValue(condition.value)
      }
    })])]);
  }), 0) : _vm._e();
};

var __vue_staticRenderFns__$f = [];
/* style */

const __vue_inject_styles__$f = function (inject) {
  if (!inject) return;
  inject("data-v-163cdc56_0", {
    source: "input[data-v-163cdc56],select[data-v-163cdc56],textarea[data-v-163cdc56]{border-width:0 0 1px 0}.sub-header[data-v-163cdc56]{margin:0;padding:5px;background-color:#bcdff0}.condition-wrapper[data-v-163cdc56]{padding:10px 5px;margin-bottom:10px}.condition-wrapper>label[data-v-163cdc56]{display:block;margin-bottom:5px;font-size:9pt}.condition-fields-wrapper[data-v-163cdc56]{display:flex;flex-direction:row}.condition-fields-wrapper>input[data-v-163cdc56]{width:0}.condition-fields-wrapper>*[data-v-163cdc56]{flex:1}.error-message-wrapper[data-v-163cdc56]{padding:10px 5px}.error-message-wrapper label[data-v-163cdc56]{display:block;font-size:9pt;margin-bottom:5px}.error-message-wrapper textarea[data-v-163cdc56]{box-sizing:border-box;width:100%;max-width:100%;min-width:100%;min-height:40px;color:red}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$f = "data-v-163cdc56";
/* module identifier */

const __vue_module_identifier__$f = undefined;
/* functional template */

const __vue_is_functional_template__$f = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$g = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, createInjector, undefined, undefined);

var Form$3 = __vue_component__$g;

var script$e = defineComponent({
  props: {
    panelType: String,
    widgetItems: Object,
    selectedWidgetItem: Object
  },
  inject: ['widgetEffectControls'],

  data() {
    return {
      panelSections
    };
  },

  computed: {
    panelSectionsAvailable() {
      if (!this.$props.selectedWidgetItem) return [];
      return Object.keys(this.widgetEffectControls).reduce((arr, effectKey) => {
        var _this$$props$selected, _this$$props$selected2, _this$$props$selected3, _this$$props$selected4;

        if (!((_this$$props$selected = this.$props.selectedWidgetItem) !== null && _this$$props$selected !== void 0 && (_this$$props$selected2 = _this$$props$selected.effects) !== null && _this$$props$selected2 !== void 0 && _this$$props$selected2.length) || (_this$$props$selected3 = this.$props.selectedWidgetItem) !== null && _this$$props$selected3 !== void 0 && (_this$$props$selected4 = _this$$props$selected3.effects) !== null && _this$$props$selected4 !== void 0 && _this$$props$selected4.every(effect => effect.type !== effectKey)) {
          // doesn't exists in widget item, can add to array
          arr.push(this.widgetEffectControls[effectKey]);
        }

        return arr;
      }, []);
    }

  },
  methods: {
    addValidation() {
      var _ref;

      const validationsCount = (_ref = this.$props.selectedWidgetItem.validationRules || []) === null || _ref === void 0 ? void 0 : _ref.length;
      this.$props.selectedWidgetItem.addValidation({
        conditions: [],
        error: `err${validationsCount}`
      });
    }

  }
});

/* script */
const __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.selectedWidgetItem ? _c('div', [_c('button', {
    staticClass: "add-button",
    on: {
      "click": _vm.addValidation
    }
  }, [_vm._v("+")])]) : _vm._e();
};

var __vue_staticRenderFns__$e = [];
/* style */

const __vue_inject_styles__$e = function (inject) {
  if (!inject) return;
  inject("data-v-11ce21ca_0", {
    source: ".add-button[data-v-11ce21ca]{background-color:transparent;border:none}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$e = "data-v-11ce21ca";
/* module identifier */

const __vue_module_identifier__$e = undefined;
/* functional template */

const __vue_is_functional_template__$e = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$f = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, createInjector, undefined, undefined);

var Header$3 = __vue_component__$f;

var reflexives = new PanelSection({
  key: 'reflexives',
  name: 'Reflexives',
  form: Form$3,
  header: Header$3
});

var script$d = defineComponent({
  props: {
    widgetItems: Object,
    selectedWidgetItem: Object
  },
  inject: ['t', 'widgetEffectControls'],
  methods: {
    conditionValue(value) {
      if (Array.isArray(value)) {
        return value.join(', ');
      } else if (value === null) {
        return 'null';
      } else if (value === undefined) {
        return 'undefined';
      } else {
        return value;
      }
    },

    onPropertiesChange(type, props) {
      this.$props.selectedWidgetItem.setEffectProperties(type, props);
    },

    removeEffect(effect) {
      this.$props.selectedWidgetItem.removeEffect(effect.type);
    }

  }
});

/* script */
const __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.selectedWidgetItem ? _c('div', _vm._l(_vm.selectedWidgetItem.validationRules, function (rule, ruleIndex) {
    return _c('div', {
      key: ruleIndex
    }, [_c('h6', {
      staticClass: "sub-header"
    }, [_vm._v("rule " + _vm._s(ruleIndex + 1))]), _vm._v(" "), _vm._l(rule.conditions, function (condition, conditionIndex) {
      return _c('div', {
        key: conditionIndex,
        staticClass: "condition-wrapper"
      }, [_c('label', [_vm._v("condition " + _vm._s(conditionIndex + 1))]), _vm._v(" "), _c('div', {
        staticClass: "condition-fields-wrapper"
      }, [_c('input', {
        attrs: {
          "type": "text"
        },
        domProps: {
          "value": condition.fact
        }
      }), _vm._v(" "), _c('select', [_c('option', {
        attrs: {
          "value": "in"
        },
        domProps: {
          "selected": condition.operator === 'in'
        }
      }, [_vm._v("\n            in\n          ")]), _vm._v(" "), _c('option', {
        attrs: {
          "value": "equal"
        },
        domProps: {
          "selected": condition.operator === 'equal'
        }
      }, [_vm._v("\n            equals\n          ")]), _vm._v(" "), _c('option', {
        attrs: {
          "value": "notEqual"
        },
        domProps: {
          "selected": condition.operator === 'notEqual'
        }
      }, [_vm._v("\n            not equal\n          ")]), _vm._v(" "), _c('option', {
        attrs: {
          "value": "greaterThanInclusive"
        },
        domProps: {
          "selected": condition.operator === 'greaterThanInclusive'
        }
      }, [_vm._v("\n            >=\n          ")]), _vm._v(" "), _c('option', {
        attrs: {
          "value": "lessThanInclusive"
        },
        domProps: {
          "selected": condition.operator === 'lessThanInclusive'
        }
      }, [_vm._v("\n            " + _vm._s('<=') + "\n          ")])]), _vm._v(" "), _c('input', {
        attrs: {
          "type": "text"
        },
        domProps: {
          "value": _vm.conditionValue(condition.value)
        }
      })])]);
    }), _vm._v(" "), _c('div', {
      staticClass: "error-message-wrapper"
    }, [_c('label', [_vm._v("(conditions not met) error message")]), _vm._v(" "), _c('textarea', {
      domProps: {
        "value": _vm.t(_vm.selectedWidgetItem.id + "." + rule.error)
      }
    })])], 2);
  }), 0) : _vm._e();
};

var __vue_staticRenderFns__$d = [];
/* style */

const __vue_inject_styles__$d = function (inject) {
  if (!inject) return;
  inject("data-v-0544d0aa_0", {
    source: "input[data-v-0544d0aa],select[data-v-0544d0aa],textarea[data-v-0544d0aa]{border-width:0 0 1px 0}.sub-header[data-v-0544d0aa]{margin:0;padding:5px;background-color:#bcdff0}.condition-wrapper[data-v-0544d0aa]{padding:10px 5px;margin-bottom:10px}.condition-wrapper>label[data-v-0544d0aa]{display:block;margin-bottom:5px;font-size:9pt}.condition-fields-wrapper[data-v-0544d0aa]{display:flex;flex-direction:row}.condition-fields-wrapper>input[data-v-0544d0aa]{width:0}.condition-fields-wrapper>*[data-v-0544d0aa]{flex:1}.error-message-wrapper[data-v-0544d0aa]{padding:10px 5px}.error-message-wrapper label[data-v-0544d0aa]{display:block;font-size:9pt;margin-bottom:5px}.error-message-wrapper textarea[data-v-0544d0aa]{box-sizing:border-box;width:100%;max-width:100%;min-width:100%;min-height:40px;color:red}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$d = "data-v-0544d0aa";
/* module identifier */

const __vue_module_identifier__$d = undefined;
/* functional template */

const __vue_is_functional_template__$d = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$e = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, createInjector, undefined, undefined);

var Form$2 = __vue_component__$e;

var script$c = defineComponent({
  props: {
    panelType: String,
    widgetItems: Object,
    selectedWidgetItem: Object
  },
  inject: ['widgetEffectControls'],

  data() {
    return {
      panelSections
    };
  },

  computed: {
    panelSectionsAvailable() {
      if (!this.$props.selectedWidgetItem) return [];
      return Object.keys(this.widgetEffectControls).reduce((arr, effectKey) => {
        var _this$$props$selected, _this$$props$selected2, _this$$props$selected3, _this$$props$selected4;

        if (!((_this$$props$selected = this.$props.selectedWidgetItem) !== null && _this$$props$selected !== void 0 && (_this$$props$selected2 = _this$$props$selected.effects) !== null && _this$$props$selected2 !== void 0 && _this$$props$selected2.length) || (_this$$props$selected3 = this.$props.selectedWidgetItem) !== null && _this$$props$selected3 !== void 0 && (_this$$props$selected4 = _this$$props$selected3.effects) !== null && _this$$props$selected4 !== void 0 && _this$$props$selected4.every(effect => effect.type !== effectKey)) {
          // doesn't exists in widget item, can add to array
          arr.push(this.widgetEffectControls[effectKey]);
        }

        return arr;
      }, []);
    }

  },
  methods: {
    addValidation() {
      var _ref;

      const validationsCount = (_ref = this.$props.selectedWidgetItem.validationRules || []) === null || _ref === void 0 ? void 0 : _ref.length;
      this.$props.selectedWidgetItem.addValidation({
        conditions: [],
        error: `err${validationsCount}`
      });
    }

  }
});

/* script */
const __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.selectedWidgetItem ? _c('div', [_c('button', {
    staticClass: "add-button",
    on: {
      "click": _vm.addValidation
    }
  }, [_vm._v("+")])]) : _vm._e();
};

var __vue_staticRenderFns__$c = [];
/* style */

const __vue_inject_styles__$c = function (inject) {
  if (!inject) return;
  inject("data-v-11ce21ca_0", {
    source: ".add-button[data-v-11ce21ca]{background-color:transparent;border:none}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$c = "data-v-11ce21ca";
/* module identifier */

const __vue_module_identifier__$c = undefined;
/* functional template */

const __vue_is_functional_template__$c = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, createInjector, undefined, undefined);

var Header$2 = __vue_component__$d;

var validations = new PanelSection({
  key: 'validations',
  name: 'Validations',
  form: Form$2,
  header: Header$2
});

var script$b = defineComponent({
  props: {
    widgetItems: Object,
    selectedWidgetItem: Object
  },
  inject: ['widgetControls'],
  methods: {
    conditionValue(value) {
      if (Array.isArray(value)) {
        return value.join(', ');
      } else if (value === null) {
        return 'null';
      } else if (value === undefined) {
        return 'undefined';
      } else {
        return value;
      }
    },

    onPropertiesChange(type, props) {
      this.$props.selectedWidgetItem.setEffectProperties(type, props);
    },

    removeEffect(effect) {
      this.$props.selectedWidgetItem.removeEffect(effect.type);
    }

  }
});

/* script */
const __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.selectedWidgetItem ? _c('div', [!!_vm.selectedWidgetItem && _vm.widgetControls[_vm.selectedWidgetItem.type] ? _c(_vm.widgetControls[_vm.selectedWidgetItem.type].builderForm, {
    tag: "component",
    attrs: {
      "widget": _vm.selectedWidgetItem,
      "t": _vm.selectedWidgetItem.t
    }
  }) : _vm._e()], 1) : _vm._e();
};

var __vue_staticRenderFns__$b = [];
/* style */

const __vue_inject_styles__$b = function (inject) {
  if (!inject) return;
  inject("data-v-1e69f12a_0", {
    source: "input[data-v-1e69f12a],select[data-v-1e69f12a],textarea[data-v-1e69f12a]{border-width:0 0 1px 0}.sub-header[data-v-1e69f12a]{margin:0;padding:5px;background-color:#bcdff0}.condition-wrapper[data-v-1e69f12a]{padding:10px 5px;margin-bottom:10px}.condition-wrapper>label[data-v-1e69f12a]{display:block;margin-bottom:5px;font-size:9pt}.condition-fields-wrapper[data-v-1e69f12a]{display:flex;flex-direction:row}.condition-fields-wrapper>input[data-v-1e69f12a]{width:0}.condition-fields-wrapper>*[data-v-1e69f12a]{flex:1}.error-message-wrapper[data-v-1e69f12a]{padding:10px 5px}.error-message-wrapper label[data-v-1e69f12a]{display:block;font-size:9pt;margin-bottom:5px}.error-message-wrapper textarea[data-v-1e69f12a]{box-sizing:border-box;width:100%;max-width:100%;min-width:100%;min-height:40px;color:red}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$b = "data-v-1e69f12a";
/* module identifier */

const __vue_module_identifier__$b = undefined;
/* functional template */

const __vue_is_functional_template__$b = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, createInjector, undefined, undefined);

var Form$1 = __vue_component__$c;

var script$a = defineComponent({
  props: {
    panelType: String,
    widgetItems: Object,
    selectedWidgetItem: Object
  },
  inject: ['widgetEffectControls'],

  data() {
    return {
      panelSections
    };
  },

  computed: {
    panelSectionsAvailable() {
      if (!this.$props.selectedWidgetItem) return [];
      return Object.keys(this.widgetEffectControls).reduce((arr, effectKey) => {
        var _this$$props$selected, _this$$props$selected2, _this$$props$selected3, _this$$props$selected4;

        if (!((_this$$props$selected = this.$props.selectedWidgetItem) !== null && _this$$props$selected !== void 0 && (_this$$props$selected2 = _this$$props$selected.effects) !== null && _this$$props$selected2 !== void 0 && _this$$props$selected2.length) || (_this$$props$selected3 = this.$props.selectedWidgetItem) !== null && _this$$props$selected3 !== void 0 && (_this$$props$selected4 = _this$$props$selected3.effects) !== null && _this$$props$selected4 !== void 0 && _this$$props$selected4.every(effect => effect.type !== effectKey)) {
          // doesn't exists in widget item, can add to array
          arr.push(this.widgetEffectControls[effectKey]);
        }

        return arr;
      }, []);
    }

  },
  methods: {
    addValidation() {
      var _ref;

      const validationsCount = (_ref = this.$props.selectedWidgetItem.validationRules || []) === null || _ref === void 0 ? void 0 : _ref.length;
      this.$props.selectedWidgetItem.addValidation({
        conditions: [],
        error: `err${validationsCount}`
      });
    }

  }
});

/* script */
const __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.selectedWidgetItem ? _c('div', [_vm._v("\n  " + _vm._s(_vm.selectedWidgetItem.type) + "\n")]) : _vm._e();
};

var __vue_staticRenderFns__$a = [];
/* style */

const __vue_inject_styles__$a = function (inject) {
  if (!inject) return;
  inject("data-v-3e8f789b_0", {
    source: ".add-button[data-v-3e8f789b]{background-color:transparent;border:none}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$a = "data-v-3e8f789b";
/* module identifier */

const __vue_module_identifier__$a = undefined;
/* functional template */

const __vue_is_functional_template__$a = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, createInjector, undefined, undefined);

var Header$1 = __vue_component__$b;

var widget = new PanelSection({
  key: 'widget',
  name: 'Widget',
  form: Form$1,
  header: Header$1
});

var script$9 = defineComponent({
  components: {
    BuilderWidgetTree
  },
  props: {
    widgetItems: Object,
    selectedWidgetItem: Object
  }
});

/* script */
const __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('builder-widget-tree', {
    attrs: {
      "widget-items": _vm.widgetItems,
      "selected-widget-item": _vm.selectedWidgetItem
    }
  });
};

var __vue_staticRenderFns__$9 = [];
/* style */

const __vue_inject_styles__$9 = undefined;
/* scoped */

const __vue_scope_id__$9 = undefined;
/* module identifier */

const __vue_module_identifier__$9 = undefined;
/* functional template */

const __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

var Form = __vue_component__$a;

var script$8 = defineComponent({
  props: {
    panelType: String,
    widgetItems: Object
  }
});

/* script */
const __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div');
};

var __vue_staticRenderFns__$8 = [];
/* style */

const __vue_inject_styles__$8 = undefined;
/* scoped */

const __vue_scope_id__$8 = undefined;
/* module identifier */

const __vue_module_identifier__$8 = undefined;
/* functional template */

const __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

var Header = __vue_component__$9;

var widgetTree = new PanelSection({
  key: 'widgetTree',
  name: 'Widget Tree',
  form: Form,
  header: Header
});

const panelSections = {
  [addWidget.key]: addWidget,
  [effects.key]: effects,
  [reflexives.key]: reflexives,
  [validations.key]: validations,
  [widget.key]: widget,
  [widgetTree.key]: widgetTree
};

var script$7 = defineComponent({
  props: {
    panelType: String,
    widgetItems: Object,
    selectedWidgetItem: Object,
    isCollapsed: Boolean
  },

  data() {
    return {
      panelSections
    };
  },

  methods: {
    onToggleCollapse() {
      this.$emit('onToggleCollapse', !this.$props.isCollapsed);
    }

  }
});

/* script */
const __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "panel-section-wrapper",
    class: {
      isCollapsed: _vm.isCollapsed
    }
  }, [_c('div', {
    staticClass: "panel-header"
  }, [_c('div', {
    staticClass: "collapse-arrow",
    on: {
      "click": _vm.onToggleCollapse
    }
  }, [_vm._v("›")]), _vm._v(" "), _c('h5', {
    staticClass: "panel-title",
    on: {
      "click": _vm.onToggleCollapse
    }
  }, [_vm._v("\n        " + _vm._s(_vm.panelSections[_vm.panelType].name) + "\n      ")]), _vm._v(" "), _c(_vm.panelSections[_vm.panelType].header, {
    tag: "component",
    attrs: {
      "widget-items": _vm.widgetItems,
      "selected-widget-item": _vm.selectedWidgetItem
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "panel-content"
  }, [_c(_vm.panelSections[_vm.panelType].form, {
    tag: "component",
    attrs: {
      "widget-items": _vm.widgetItems,
      "selected-widget-item": _vm.selectedWidgetItem
    }
  })], 1)]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

const __vue_inject_styles__$7 = function (inject) {
  if (!inject) return;
  inject("data-v-5958104d_0", {
    source: ".panel-header[data-v-5958104d]{padding:5px 5px;background-color:#cbf3f0;color:#3a3a3a;display:flex;flex-direction:row;justify-content:space-between;align-items:center;box-shadow:0 3px 10px #a7a7a73b;z-index:10;position:relative}.panel-title[data-v-5958104d]{margin:0;margin-left:5px;flex:1;cursor:pointer}.panel-section-wrapper[data-v-5958104d]:not(.isCollapsed){flex:1;display:flex;flex-direction:column}.panel-section-wrapper.isCollapsed .panel-content[data-v-5958104d]{display:none}.collapse-arrow[data-v-5958104d]{cursor:pointer}.panel-section-wrapper:not(.isCollapsed) .collapse-arrow[data-v-5958104d]{transform:rotate(90deg)}.panel-section-wrapper:not(.isCollapsed) .panel-content[data-v-5958104d]{overflow:auto;flex:1}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$7 = "data-v-5958104d";
/* module identifier */

const __vue_module_identifier__$7 = undefined;
/* functional template */

const __vue_is_functional_template__$7 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector, undefined, undefined);

var BuilderPanelSectionView = __vue_component__$8;

var script$6 = defineComponent({
  components: {
    BuilderPanelSectionView
  },
  props: {
    sections: Array,
    selectedWidgetItem: Object,
    widgetItems: Object
  },

  data() {
    return {
      collapsed: {}
    };
  },

  methods: {
    onToggleCollapse(sectionName, newIsCollapsed) {
      if (newIsCollapsed) {
        this.$data.collapsed[sectionName] = true;
      } else {
        delete this.$data.collapsed[sectionName];
      }

      this.$data.collapsed = { ...this.$data.collapsed
      };
    }

  }
});

/* script */
const __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "wrapper"
  }, _vm._l(_vm.sections, function (sectionName) {
    return _c('builder-panel-section-view', {
      key: sectionName,
      attrs: {
        "panelType": sectionName,
        "selectedWidgetItem": _vm.selectedWidgetItem,
        "widgetItems": _vm.widgetItems,
        "isCollapsed": _vm.collapsed[sectionName]
      },
      on: {
        "onToggleCollapse": function (newCollapsed) {
          return _vm.onToggleCollapse(sectionName, newCollapsed);
        }
      }
    });
  }), 1);
};

var __vue_staticRenderFns__$6 = [];
/* style */

const __vue_inject_styles__$6 = function (inject) {
  if (!inject) return;
  inject("data-v-0357272b_0", {
    source: ".wrapper[data-v-0357272b]{position:relative;display:flex;flex-direction:column;flex:1}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$6 = "data-v-0357272b";
/* module identifier */

const __vue_module_identifier__$6 = undefined;
/* functional template */

const __vue_is_functional_template__$6 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);

var BuilderPanelSectionListView = __vue_component__$7;

var script$5 = defineComponent({
  components: {
    Pane,
    BuilderPanelSectionListView
  },
  props: {
    widgetItems: Object
  },
  inject: ['widgetControls', 'widgetEffectControls', 'getPageState'],

  data() {
    return {
      panelSections
    };
  },

  computed: {
    selectedWidgetItem() {
      var _this$$props$widgetIt;

      const pageState = this.getPageState();
      return pageState.interactiveState.selectedWidgetId ? (_this$$props$widgetIt = this.$props.widgetItems) === null || _this$$props$widgetIt === void 0 ? void 0 : _this$$props$widgetIt[pageState.interactiveState.selectedWidgetId] : null;
    }

  }
});

/* script */
const __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('pane', {
    attrs: {
      "position": 'right',
      "isOpen": true
    },
    scopedSlots: _vm._u([{
      key: "pane-content",
      fn: function () {
        return [_c('builder-panel-section-list-view', {
          attrs: {
            "sections": ['widget', 'reflexives', 'validations', 'effects'],
            "widgetItems": _vm.widgetItems,
            "selectedWidgetItem": _vm.selectedWidgetItem
          }
        })];
      },
      proxy: true
    }])
  }, [_vm._v(" "), [_vm._t("default")]], 2);
};

var __vue_staticRenderFns__$5 = [];
/* style */

const __vue_inject_styles__$5 = undefined;
/* scoped */

const __vue_scope_id__$5 = "data-v-1e19a752";
/* module identifier */

const __vue_module_identifier__$5 = undefined;
/* functional template */

const __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

var BuilderRightPane = __vue_component__$6;

var script$4 = defineComponent({
  components: {
    Pane,
    BuilderWidgetTree
  },
  props: {
    widgetItems: Object
  },
  inject: ['getPageState'],

  data() {
    return {
      panelSections,
      sections: ['widgetTree', 'addWidget'],
      selectedSection: 'widgetTree'
    };
  },

  computed: {
    selectedWidgetItem() {
      var _this$$props$widgetIt;

      const pageState = this.getPageState();
      return pageState.interactiveState.selectedWidgetId ? (_this$$props$widgetIt = this.$props.widgetItems) === null || _this$$props$widgetIt === void 0 ? void 0 : _this$$props$widgetIt[pageState.interactiveState.selectedWidgetId] : null;
    }

  },
  methods: {
    setSelectedSection(selectedSection) {
      this.$data.selectedSection = selectedSection;
    }

  }
});

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('pane', {
    attrs: {
      "position": 'left',
      "isOpen": true
    },
    scopedSlots: _vm._u([{
      key: "pane-content",
      fn: function () {
        return [_c('div', {
          staticClass: "button-group"
        }, _vm._l(_vm.sections, function (section) {
          return _c('button', {
            key: section,
            class: {
              active: section === _vm.selectedSection
            },
            on: {
              "click": function () {
                return _vm.setSelectedSection(section);
              }
            }
          }, [_vm._v("\n        " + _vm._s(_vm.panelSections[section].name) + "\n      ")]);
        }), 0), _vm._v(" "), _c(_vm.panelSections[_vm.selectedSection].form, {
          tag: "component",
          attrs: {
            "widgetItems": _vm.widgetItems,
            "selectedWidgetItem": _vm.selectedWidgetItem
          }
        })];
      },
      proxy: true
    }])
  }, [_vm._v(" "), [_vm._t("default")]], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

const __vue_inject_styles__$4 = function (inject) {
  if (!inject) return;
  inject("data-v-43275984_0", {
    source: ".button-group[data-v-43275984]{display:flex;flex-direction:row;width:100%}.button-group button[data-v-43275984]{flex:1;background-color:#fff;padding:10px 5px;border-width:0 0 4px 0;border-color:transparent;position:relative}.button-group button.active[data-v-43275984]::before{content:'';position:absolute;bottom:0;left:0;width:100%;height:4px;background-color:#cbf3f0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$4 = "data-v-43275984";
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);

var BuilderLeftPane = __vue_component__$5;

var script$3 = defineComponent({
  props: {
    widget: Object,
    widgetItems: Object
  },
  inject: ['getPageState', 'setPageState'],
  methods: {
    setSelectWidget(widget) {
      const currentState = this.getPageState();
      currentState.interactiveState.selectedWidgetId = widget.id;
      this.setPageState(currentState);
    }

  }
});

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !!_vm.widget ? _c('div', {
    staticClass: "widget-breadcrumb-wrapper"
  }, [_vm._l(_vm.widget.getParents().reverse(), function (parent) {
    return _c('div', {
      key: parent.id,
      staticClass: "widget-breadcrumb-item",
      on: {
        "click": function () {
          return _vm.setSelectWidget(parent);
        }
      }
    }, [_c('p', [_vm._v(_vm._s(parent.type))]), _vm._v(" "), parent.code ? _c('small', [_vm._v("(" + _vm._s(parent.code) + ")")]) : _vm._e()]);
  }), _vm._v(" "), _c('div', {
    staticClass: "widget-breadcrumb-item"
  }, [_c('p', [_vm._v(_vm._s(_vm.widget.type))]), _vm._v(" "), _vm.widget.code ? _c('small', [_vm._v("(" + _vm._s(_vm.widget.code) + ")")]) : _vm._e()])], 2) : _vm._e();
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = function (inject) {
  if (!inject) return;
  inject("data-v-34434a74_0", {
    source: ".widget-breadcrumb-wrapper[data-v-34434a74]{display:flex;flex-direction:row;align-items:center}.widget-breadcrumb-item[data-v-34434a74]{position:relative;display:flex;flex-direction:row;padding:5px 10px 5px 20px;margin-top:5px;align-items:center;cursor:pointer}.widget-breadcrumb-item[data-v-34434a74]:not(:first-child)::before{content:'>';position:absolute;top:6px;left:0;font-size:12pt}.widget-breadcrumb-item p[data-v-34434a74]{margin:0}.widget-breadcrumb-item small[data-v-34434a74]{margin-left:5px;color:#a1a1a1}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$3 = "data-v-34434a74";
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

var WidgetBreadcrumb = __vue_component__$4;

var script$2 = defineComponent({
  components: {
    WidgetBreadcrumb
  },
  props: {
    widgetItems: Object
  },
  inject: ['getPageState'],
  computed: {
    selectedWidgetItem() {
      var _this$widgetItems;

      const pageState = this.getPageState();
      return pageState.interactiveState.selectedWidgetId ? (_this$widgetItems = this.widgetItems) === null || _this$widgetItems === void 0 ? void 0 : _this$widgetItems[pageState.interactiveState.selectedWidgetId] : null;
    }

  }
});

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "bottom-pane-wrapper"
  }, [_c('div', {
    staticClass: "left-pane"
  }), _vm._v(" "), _c('div', {
    staticClass: "center"
  }, [_c('widget-breadcrumb', {
    attrs: {
      "widget": _vm.selectedWidgetItem,
      "widgetItems": _vm.widgetItems
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "right-pane"
  })]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = function (inject) {
  if (!inject) return;
  inject("data-v-7da0862a_0", {
    source: ".bottom-pane-wrapper[data-v-7da0862a]{height:40px;z-index:1000;box-shadow:0 0 4px -2px #000;display:flex;flex-direction:row}.center[data-v-7da0862a]{flex:1}.left-pane[data-v-7da0862a],.right-pane[data-v-7da0862a]{width:300px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$2 = "data-v-7da0862a";
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

var BuilderBottomPane = __vue_component__$3;

var script$1 = defineComponent({
  data() {
    return {
      width: '100%',
      height: '100%'
    };
  },

  computed: {
    deviceStyles() {
      return {
        width: this.$data.width,
        height: this.$data.height
      };
    }

  },
  methods: {
    setWidthHeight(ev) {
      const [w, h] = ev.target.value.split('_');
      this.$data.width = w;
      this.$data.height = h;
    }

  }
});

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "wrapper"
  }, [_c('select', {
    staticClass: "simulation-device-select",
    on: {
      "change": _vm.setWidthHeight
    }
  }, [_c('option', {
    domProps: {
      "value": '375px_667px',
      "selected": _vm.width === '375px' && _vm.height === '667px'
    }
  }, [_vm._v("\n      iPhone SE\n    ")]), _vm._v(" "), _c('option', {
    domProps: {
      "value": '414px_896px',
      "selected": _vm.width === '414px' && _vm.height === '896px'
    }
  }, [_vm._v("\n      iPhone XR\n    ")]), _vm._v(" "), _c('option', {
    domProps: {
      "value": '390px_844px',
      "selected": _vm.width === '390px' && _vm.height === '844px'
    }
  }, [_vm._v("\n      iPhone 12 Pro\n    ")]), _vm._v(" "), _c('option', {
    domProps: {
      "value": '100%_100%',
      "selected": _vm.width === '100%' && _vm.height === '100%'
    }
  }, [_vm._v("\n      Full\n    ")])]), _vm._v(" "), _c('div', {
    staticClass: "device-wrapper",
    style: {
      height: _vm.deviceStyles.height
    }
  }, [_c('div', {
    staticClass: "device-background",
    style: _vm.deviceStyles
  }), _vm._v(" "), _c('div', {
    staticClass: "device-inner-wrapper",
    style: {
      width: _vm.deviceStyles.width
    }
  }, [_vm._t("default")], 2)])]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-ce061fc0_0", {
    source: ".wrapper[data-v-ce061fc0]{height:100%;overflow:hidden;background-color:#eaedf5;box-sizing:border-box;position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center}.device-wrapper[data-v-ce061fc0]{height:100%;width:100%;padding:30px 30px 30px 30px;overflow-y:auto;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;overflow:auto}.device-inner-wrapper[data-v-ce061fc0]{min-height:100px;height:100%;border-radius:8px;position:relative}.device-background[data-v-ce061fc0]{background-color:#fff;border-radius:8px;margin:-30px auto 0 auto;position:absolute}.simulation-device-select[data-v-ce061fc0]{padding:5px 10px;border-radius:4px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = "data-v-ce061fc0";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

var BuilderScreenSimulationView = __vue_component__$2;

var script = defineComponent({
  components: {
    BuilderWidgetsLayout,
    BuilderRightPane,
    BuilderLeftPane,
    BuilderBottomPane,
    BuilderScreenSimulationView
  },
  // components: { DynamicPageLayout },
  props: {
    languages: {
      type: Object,
      required: true
    },
    locale: String,
    page: {
      type: Object,
      required: true
    },
    onPageChange: Function,
    state: {
      type: Object,
      required: true
    },
    onStateChange: Function,
    widgetControls: Object,
    questionControls: Object,
    widgetEffectControls: Object,
    plugins: Array,
    // display | page | readOnly
    view: String,
    config: Object
  },

  data() {
    return {
      widgetItems: {},
      pageEventListener: new PageEventListener({
        emitEvent: this.emitEvent
      })
    };
  },

  computed: {
    widgetItemsArr() {
      return this.page.widgets;
    },

    combWidgetControls() {
      var _this$config, _this$config$widgetCo, _ref;

      return cachedMerge('widgetControls', (_this$config = this.config) !== null && _this$config !== void 0 && (_this$config$widgetCo = _this$config.widgetControls) !== null && _this$config$widgetCo !== void 0 && _this$config$widgetCo.disableInternalControls ? {} : widgets, ...((_ref = this.plugins || []) === null || _ref === void 0 ? void 0 : _ref.map(p => p.widgetControls)), this.widgetControls);
    },

    combWidgetEffectControls() {
      var _this$config2, _this$config2$widgetE, _ref2;

      return cachedMerge('widgetEffectControls', (_this$config2 = this.config) !== null && _this$config2 !== void 0 && (_this$config2$widgetE = _this$config2.widgetEffectControls) !== null && _this$config2$widgetE !== void 0 && _this$config2$widgetE.disableInternalControls ? {} : widgetEffects, ...((_ref2 = this.plugins || []) === null || _ref2 === void 0 ? void 0 : _ref2.map(p => p.widgetEffectControls)), this.widgetEffectControls);
    },

    combQuestionControls() {
      var _this$config3, _this$config3$questio, _ref3;

      return cachedMerge('questionControls', (_this$config3 = this.config) !== null && _this$config3 !== void 0 && (_this$config3$questio = _this$config3.questionControls) !== null && _this$config3$questio !== void 0 && _this$config3$questio.disableInternalControls ? {} : questionControls, ...((_ref3 = this.plugins || []) === null || _ref3 === void 0 ? void 0 : _ref3.map(p => p.questionControls)), this.questionControls);
    },

    validations() {
      var _this$config4, _this$config4$validat, _this$config5, _this$config5$validat;

      return {
        rules: { ...validationRules,
          ...((_this$config4 = this.config) === null || _this$config4 === void 0 ? void 0 : (_this$config4$validat = _this$config4.validations) === null || _this$config4$validat === void 0 ? void 0 : _this$config4$validat.rules)
        },
        facts: { ...((_this$config5 = this.config) === null || _this$config5 === void 0 ? void 0 : (_this$config5$validat = _this$config5.validations) === null || _this$config5$validat === void 0 ? void 0 : _this$config5$validat.facts)
        }
      };
    },

    pageState() {
      return this.state;
    }

  },
  watch: {
    languages: {
      handler() {
        this.pageEventListener.emit(Event.LANGUAGE_CHANGED, {});
      }

    },
    'page.widgets': {
      handler(newPageWidgetArr) {
        var _this$config6, _this$config6$widgets;

        this.$data.widgetItems = newPageWidgetArr.reduce((obj, widget) => {
          var _this$combWidgetContr;

          const WidgetItemClass = ((_this$combWidgetContr = this.combWidgetControls[widget.type]) === null || _this$combWidgetContr === void 0 ? void 0 : _this$combWidgetContr.widgetItem) || WidgetItem;
          obj[widget.id] = new WidgetItemClass({
            widget,
            pageEventListener: this.pageEventListener,
            emitEvent: this.emitEvent,
            removeWidget: this.removeWidget,
            t: (key, data) => this.t([widget.id, key], data),
            getState: () => this.state,
            setState: newPageState => {
              this.$emit('onStateChange', newPageState);
            },
            onUpdate: newWidget => {
              this._onPageChange({ ...this.page,
                widgets: Object.values({ ...this.$data.widgetItems,
                  // clone widget object to trigger change
                  [newWidget.id]: Object.assign(Object.create(Object.getPrototypeOf(newWidget)), newWidget)
                })
              });
            },
            getQuestionControls: () => this.combQuestionControls,
            getConfig: () => ({ ...this.getConfig(),
              validations: this.validations
            }),
            getWidgetMeta: () => {
              var _this$getConfig, _this$getConfig$meta;

              return (_this$getConfig = this.getConfig()) === null || _this$getConfig === void 0 ? void 0 : (_this$getConfig$meta = _this$getConfig.meta) === null || _this$getConfig$meta === void 0 ? void 0 : _this$getConfig$meta[widget.type];
            },
            getValidator: this.getValidator
          });
          return obj;
        }, {});
        Object.values(this.$data.widgetItems).forEach(widgetItem => {
          widgetItem.setWidgetItems(this.$data.widgetItems);
        });

        if ((_this$config6 = this.config) !== null && _this$config6 !== void 0 && (_this$config6$widgets = _this$config6.widgetsToExclude) !== null && _this$config6$widgets !== void 0 && _this$config6$widgets.length) {
          this.excludeWidgets(this.config.widgetsToExclude);
        }
      },

      immediate: true,
      deep: true
    },
    'config.validations.facts': {
      handler(validations) {
        const ruleEngine = new dist.Engine(undefined, {
          allowUndefinedFacts: true
        });

        if (validations !== null && validations !== void 0 && validations.facts && Object.keys(validations === null || validations === void 0 ? void 0 : validations.facts).length) {
          Object.keys(validations.facts).forEach(factKey => {
            var _validations$facts;

            ruleEngine.addFact(factKey, (_validations$facts = validations.facts) === null || _validations$facts === void 0 ? void 0 : _validations$facts[factKey]);
          });
        }

        this.ruleEngine = ruleEngine;
      },

      deep: true
    },
    'config.widgetsToExclude': {
      handler() {
        var _this$config7, _this$config7$widgets;

        if ((_this$config7 = this.config) !== null && _this$config7 !== void 0 && (_this$config7$widgets = _this$config7.widgetsToExclude) !== null && _this$config7$widgets !== void 0 && _this$config7$widgets.length) {
          this.excludeWidgets(this.config.widgetsToExclude);
        }
      },

      deep: true
    }
  },
  methods: {
    _onPageChange(newPage) {
      var _this$onPageChange;

      (_this$onPageChange = this.onPageChange) === null || _this$onPageChange === void 0 ? void 0 : _this$onPageChange.call(this, newPage);
      this.$emit('onPageChange', newPage);
    },

    t(key, data) {
      const lang = flattenTranslateKey(key).reduce((obj, g, gIndex) => {
        if (typeof obj === 'string') return obj;
        return gIndex > 0 ? obj === null || obj === void 0 ? void 0 : obj[g] : (obj === null || obj === void 0 ? void 0 : obj[g][this.locale || ''].message) || {};
      }, this.languages);
      return lang === null || lang === void 0 ? void 0 : lang.replace(/(\{(\w+)\})/g, (_orig, _outer, inner) => (data || {})[inner]);
    },

    getConfig() {
      return this.config || {};
    },

    getValidator() {
      const validator = new Validator(this.validations);
      return validator;
    },

    getRuleEngine() {
      return this.getValidator().getRuleEngine();
    },

    excludeWidgets(widgetIdsOrCodes) {
      // map and ensure a list of ids (config.widgetsToExclude can be code or id)
      const excludedWidgetIds = Object.values(this.widgetItems).filter(w => widgetIdsOrCodes.includes(w.id) || widgetIdsOrCodes.includes(w.code || '')).map(w => w.id); // go through widgets and remove all widgets

      excludedWidgetIds.forEach(widgetId => {
        delete this.widgetItems[widgetId];
      }); // go through all pages and remove all pages that only holds excluded widgets

      Object.values(this.widgetItems).forEach(widget => {
        if (widget.type === 'pages') {
          const pageIdxToRemove = [];
          widget.properties.pages.forEach((page, pageIdx) => {
            if (page.children.every(c => excludedWidgetIds.includes(c))) {
              pageIdxToRemove.push(pageIdx);
            }
          });

          if (pageIdxToRemove.length) {
            pageIdxToRemove.reverse().forEach(idx => {
              widget.properties.pages.splice(idx, 1);
            });
          }
        }
      });
    },

    async emitEvent(name, value, widget) {
      if (Array.isArray(this.$listeners.event)) {
        await Promise.all(this.$listeners.event.map(evFn => evFn({
          name,
          value,
          widget,
          pageState: this.pageState,
          widgetItems: this.$data.widgetItems
        })));
      } else {
        var _this$$listeners$even, _this$$listeners;

        await ((_this$$listeners$even = (_this$$listeners = this.$listeners).event) === null || _this$$listeners$even === void 0 ? void 0 : _this$$listeners$even.call(_this$$listeners, {
          name,
          value,
          widget,
          pageState: this.pageState,
          widgetItems: this.$data.widgetItems
        }));
      }
    },

    async validateAll(opts) {
      const validationResults = await Object.values(this.widgetItems).reduce(async (obj, wi) => {
        const _obj = await obj;

        const result = await wi.runValidations({
          setDirty: (opts === null || opts === void 0 ? void 0 : opts.setDirty) || false
        });

        if (!result) {
          return _obj;
        }

        _obj[wi.code || wi.id] = result;
        return _obj;
      }, Promise.resolve({}));
      return validationResults;
    },

    setMessage(_ref4) {
      let {
        id,
        locale,
        key,
        value,
        type = 'pageItem'
      } = _ref4;
      const newLanguages = { ...this.languages
      };
      if (!newLanguages[id]) newLanguages[id] = {};
      if (!newLanguages[id][locale]) newLanguages[id][locale] = {
        id: '',
        refId: id,
        type,
        version: 1,
        locale,
        message: {}
      };
      newLanguages[id][locale].message[key] = value;
      this.$emit('onLanguageChange', newLanguages);
    },

    updatePage(page) {
      this.$emit('onPageChange', page);
    },

    updateWidget(widget) {
      this.$data.widgetItems[widget.id] = widget;
      this.updatePage({ ...this.page,
        widgets: Object.values(this.$data.widgetItems).map(m => m.widget)
      });
    },

    removeWidget(widgetId) {
      this.updatePage({ ...this.page,
        widgets: Object.keys(this.$data.widgetItems).reduce((arr, _widgetId) => {
          if (_widgetId === widgetId) return arr;
          return [...arr, this.$data.widgetItems[_widgetId].widget];
        }, [])
      }); // remove languages

      const newLanguages = { ...this.languages
      };
      delete newLanguages[widgetId];
      this.$emit('onLanguageChange', newLanguages);
    }

  },

  provide() {
    return {
      getConfig: () => this.configs,
      getView: () => this.view,
      t: this.t,
      pageEventListener: this.pageEventListener,
      emitEvent: this.emitEvent,
      getLocale: () => this.locale,
      languages: this.languages,
      setMessage: this.setMessage,
      updateWidget: this.updateWidget,
      removeWidget: this.removeWidget,
      getPageState: () => this.state,
      setPageState: newPageState => {
        this.$emit('onStateChange', newPageState);
      },
      widgetEffectControls: this.combWidgetEffectControls,
      widgetControls: this.combWidgetControls,
      questionControls: this.combQuestionControls,
      validateAll: this.validateAll,
      validations: this.validations,
      getRuleEngine: this.getRuleEngine
    };
  },

  expose: ['validateAll']
});

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "main-wrapper"
  }, [_c('div', {
    staticClass: "main-pane-wrapper"
  }, [_c('builder-left-pane', {
    attrs: {
      "widgetItems": _vm.widgetItems
    }
  }, [_c('builder-right-pane', {
    attrs: {
      "widgetItems": _vm.widgetItems
    }
  }, [_c('builder-screen-simulation-view', [_c('builder-widgets-layout', {
    attrs: {
      "widgetControls": _vm.combWidgetControls,
      "widgetItems": _vm.widgetItems
    }
  })], 1)], 1)], 1)], 1), _vm._v(" "), _c('builder-bottom-pane', {
    attrs: {
      "widgetItems": _vm.widgetItems
    }
  })], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-ecafe1d2_0", {
    source: ".main-pane-wrapper[data-v-ecafe1d2]{flex:1;overflow:auto}.main-wrapper[data-v-ecafe1d2]{font-family:Arial,Helvetica,sans-serif;position:absolute;height:100%;width:100%;background-color:#fff;display:flex;flex-direction:column}.widgets-layout-wrapper[data-v-ecafe1d2]{padding:30px;background-color:#eaedf5;height:100%;box-sizing:border-box}.widgets-layout-inner-wrapper[data-v-ecafe1d2]{background-color:#fff;position:relative;border-radius:4px;box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-ecafe1d2";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var __vue_component__$1 = __vue_component__;

class PageState {
  static from(pageState) {
    if (pageState instanceof PageState) {
      // from an object, use their public getters
      return new PageState({
        widgetState: pageState.widgetState,
        interactiveState: pageState.interactiveState,
        widgetCodeToIdMap: pageState.widgetCodeToIdMap,
        widgetIdToCodeMap: pageState.widgetIdToCodeMap
      });
    } else {
      // assume it is just a plain object, fetch its protected
      // field
      return new PageState({
        widgetState: pageState._widgetState,
        interactiveState: pageState._interactiveState,
        widgetCodeToIdMap: pageState._widgetCodeToIdMap,
        widgetIdToCodeMap: pageState._widgetIdToCodeMap
      });
    }
  }

  constructor(_ref) {
    let {
      widgetState,
      interactiveState,
      widgetCodeToIdMap,
      widgetIdToCodeMap
    } = _ref;

    _defineProperty(this, "_widgetState", void 0);

    _defineProperty(this, "_interactiveState", void 0);

    _defineProperty(this, "_widgetCodeToIdMap", void 0);

    _defineProperty(this, "_widgetIdToCodeMap", void 0);

    this._widgetState = widgetState || {};
    this._interactiveState = interactiveState || {};
    this._widgetCodeToIdMap = widgetCodeToIdMap || {};
    this._widgetIdToCodeMap = widgetIdToCodeMap || {};
  }

  get interactiveState() {
    return this._interactiveState;
  }

  get widgetState() {
    return this._widgetState;
  }

  get widgetCodeToIdMap() {
    return this._widgetCodeToIdMap;
  }

  get widgetIdToCodeMap() {
    return this._widgetIdToCodeMap;
  }

  getWidgetIdByCode(code) {
    return this._widgetCodeToIdMap[code];
  }

  getWidgetCodeById(widgetId) {
    return this._widgetIdToCodeMap[widgetId];
  }

  onUpdate() {}

  getWidgetState(widgetId, key) {
    var _this$_widgetState$wi;

    return key ? (_this$_widgetState$wi = this._widgetState[widgetId]) === null || _this$_widgetState$wi === void 0 ? void 0 : _this$_widgetState$wi[key] : this._widgetState[widgetId];
  }

  setWidgetState(widgetId, key, value) {
    if (!this._widgetState[widgetId]) this._widgetState[widgetId] = {};

    if (typeof key === 'string') {
      if (value === undefined) {
        var _this$_widgetState$wi2;

        (_this$_widgetState$wi2 = this._widgetState[widgetId]) === null || _this$_widgetState$wi2 === void 0 ? true : delete _this$_widgetState$wi2[key];
      } else {
        this._widgetState[widgetId][key] = value;
      }
    } else if (typeof key === 'object') {
      this._widgetState[widgetId] = { ...this._widgetState[widgetId],
        ...key
      };
    } // FIXME: this is not updating parent in App.vue

  }

  clearWidgetState(widgetId, key) {
    this.setWidgetState(widgetId, key);
  }

  registerWidgetCode(widgetCode, widgetId) {
    this._widgetCodeToIdMap[widgetCode] = widgetId;
    this._widgetIdToCodeMap[widgetId] = widgetCode;
    this.setWidgetState(widgetId, 'code', widgetCode);
  }

  unregisterWidgetCode(widgetCode) {
    delete this._widgetCodeToIdMap[widgetCode];
  }

}

const Event = {
  LANGUAGE_CHANGED: 'language_changed'
};

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  VuePage: __vue_component__$n,
  WidgetsLayout: WidgetsLayout,
  WidgetView: WidgetView,
  QuestionControlProps: QuestionControlProps$b,
  WidgetControlProps: WidgetControlProps$j,
  VuePageBuilder: __vue_component__$1,
  PageState: PageState,
  WidgetItem: WidgetItem,
  WidgetEffectControl: WidgetEffectControl,
  PagesWidgetItem: PagesWidgetItem,
  QuestionWidgetItem: QuestionWidgetItem,
  widgets: widgets,
  QuestionControl: QuestionControl,
  QuestionItem: QuestionItem,
  questionControls: questionControls,
  combineValidations: combineValidations,
  splitRootRegex: splitRootRegex,
  stringParser: stringParser,
  flatten: flatten,
  cachedMerge: cachedMerge,
  flattenTranslateKey: flattenTranslateKey,
  translate: translate,
  formatDateString: formatDateString,
  getDateByPropertyValue: getDateByPropertyValue,
  Event: Event
});

// install function executed by Vue.use()

const install = function installVuePage(Vue) {
  Object.entries(components).forEach(_ref => {
    let [componentName, component] = _ref;
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export { Event, PageState, PagesWidgetItem, QuestionControl, QuestionControlProps$b as QuestionControlProps, QuestionItem, QuestionWidgetItem, __vue_component__$n as VuePage, __vue_component__$1 as VuePageBuilder, WidgetControlProps$j as WidgetControlProps, WidgetEffectControl, WidgetItem, WidgetView, WidgetsLayout, cachedMerge, combineValidations, install as default, flatten, flattenTranslateKey, formatDateString, getDateByPropertyValue, questionControls, splitRootRegex, stringParser, translate, widgets };
