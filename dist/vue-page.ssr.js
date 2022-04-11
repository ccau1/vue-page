'use strict';var vm=require('vm');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var vm__default=/*#__PURE__*/_interopDefaultLegacy(vm);function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }

      return desc.value;
    };
  }

  return _get.apply(this, arguments);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}/*! *****************************************************************************
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
function isObject$1(val) {
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
        if (ob && isObject$1(val) && !hasOwn(val, '__ob__')) {
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
    if (!isObject$1(obj)) {
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
        else if (isObject$1(binding)) {
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
                        else if (!isObject$1(bindingValue)) {
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
}var FormControl = /*#__PURE__*/_createClass( // public meta: { platforms: ["web", "fb"] };
function FormControl(_ref) {
  var form = _ref.form,
      display = _ref.display,
      readOnly = _ref.readOnly;

  _classCallCheck(this, FormControl);

  this.form = form;
  this.display = display;
  this.readOnly = readOnly;
  this.tags = [];
});var script$A = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: Boolean
  },
  inject: ["t"],
  methods: {
    onToggle: function onToggle(ev) {
      var _this$$props$onChange, _this$$props;

      (_this$$props$onChange = (_this$$props = this.$props).onChange) === null || _this$$props$onChange === void 0 ? void 0 : _this$$props$onChange.call(_this$$props, ev.target.checked);
    }
  }
});function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}/* script */
var __vue_script__$A = script$A;
/* template */

var __vue_render__$A = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<label><input type=\"checkbox\"" + _vm._ssrAttr("name", _vm.widget.id) + _vm._ssrAttr("checked", _vm.value) + ">" + _vm._ssrEscape("\n    " + _vm._s(_vm.t("__checkboxLabel", _vm.widget.id)) + "\n  ") + "</label>")]);
};

var __vue_staticRenderFns__$A = [];
/* style */

var __vue_inject_styles__$A = undefined;
/* scoped */

var __vue_scope_id__$A = undefined;
/* module identifier */

var __vue_module_identifier__$A = "data-v-4ee0eb82";
/* functional template */

var __vue_is_functional_template__$A = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$B = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$A,
  staticRenderFns: __vue_staticRenderFns__$A
}, __vue_inject_styles__$A, __vue_script__$A, __vue_scope_id__$A, __vue_is_functional_template__$A, __vue_module_identifier__$A, false, undefined, undefined, undefined);

var Form$9 = __vue_component__$B;var script$z = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: Boolean
  },
  inject: ["t"],
  methods: {
    onToggle: function onToggle(ev) {
      var _this$$props$onChange, _this$$props;

      (_this$$props$onChange = (_this$$props = this.$props).onChange) === null || _this$$props$onChange === void 0 ? void 0 : _this$$props$onChange.call(_this$$props, ev.target.checked);
    }
  }
});/* script */
var __vue_script__$z = script$z;
/* template */

var __vue_render__$z = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<label><input type=\"checkbox\"" + _vm._ssrAttr("name", _vm.widget.id) + _vm._ssrAttr("checked", _vm.value) + ">" + _vm._ssrEscape("\n    " + _vm._s(_vm.t("__checkboxLabel", _vm.widget.id)) + "\n  ") + "</label>")]);
};

var __vue_staticRenderFns__$z = [];
/* style */

var __vue_inject_styles__$z = undefined;
/* scoped */

var __vue_scope_id__$z = undefined;
/* module identifier */

var __vue_module_identifier__$z = "data-v-7e6315ed";
/* functional template */

var __vue_is_functional_template__$z = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$A = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$z,
  staticRenderFns: __vue_staticRenderFns__$z
}, __vue_inject_styles__$z, __vue_script__$z, __vue_scope_id__$z, __vue_is_functional_template__$z, __vue_module_identifier__$z, false, undefined, undefined, undefined);

var Display$b = __vue_component__$A;var script$y = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: Boolean
  },
  inject: ["t"]
});/* script */
var __vue_script__$y = script$y;
/* template */

var __vue_render__$y = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode(_vm._ssrEscape("\n  " + _vm._s(!!_vm.value) + "\n"))]);
};

var __vue_staticRenderFns__$y = [];
/* style */

var __vue_inject_styles__$y = undefined;
/* scoped */

var __vue_scope_id__$y = undefined;
/* module identifier */

var __vue_module_identifier__$y = "data-v-711b0fdb";
/* functional template */

var __vue_is_functional_template__$y = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$z = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$y,
  staticRenderFns: __vue_staticRenderFns__$y
}, __vue_inject_styles__$y, __vue_script__$y, __vue_scope_id__$y, __vue_is_functional_template__$y, __vue_module_identifier__$y, false, undefined, undefined, undefined);

var ReadOnly$b = __vue_component__$z;var checkbox = new FormControl({
  form: Form$9,
  display: Display$b,
  readOnly: ReadOnly$b
});var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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
}var dayjs_min = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(v=i),i||!r&&v},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var v=this.$locale().weekStart||0,D=(y<v?y+7:y)-v;return $(r?m-D:m+(6-D),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,v=O.m(this,M);return v=(l={},l[c]=v/12,l[f]=v,l[h]=v/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?v:O.a(v)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}));
});var formatDateString = function formatDateString(date) {
  if (!date) return undefined; // NOTE: does not handle timezone, but we don't want to
  // because admin timezone cause different output in
  // client side

  return date.toISOString().split("T")[0];
};
var getDateByPropertyValue = function getDateByPropertyValue(date) {
  if (!date) {
    return undefined;
  }

  if (date instanceof Date) {
    return date;
  }

  var parsedDate = Date.parse(date);

  if (!isNaN(parsedDate)) {
    // is a proper date timestamp, return date with it
    return new Date(parsedDate);
  } // if date string === Date.now or new Date, return current date


  if (/^Date.now(\(\))*$/.test(date) || /^new Date(\(\))*$/.test(date)) {
    return new Date();
  } // if it is a dayjs handling, run it through dayjs


  if (/(^dayjs|^[\w]+\([^\)]*\))/.test(date)) {
    return date.split(".").reduce(function (accDate, part) {
      var _ref;

      var parts = part.match(/([\w]+)\(([^\)]*)\)/);
      if (!parts) return accDate;

      switch (parts[1]) {
        case "dayjs":
          if (parts[2]) return dayjs_min(parts[2]);
          return accDate;

        default:
          return (_ref = accDate)[parts[1]].apply(_ref, _toConsumableArray(parts[2].split(/\s*,\s*/).map(function (a) {
            var parsedNum = parseFloat(a);

            if (isNaN(parsedNum)) {
              return a.replaceAll(/[\'\"]+/g, "");
            } else {
              return parsedNum;
            }
          })));
      }
    }, dayjs_min()).toDate();
  }

  return undefined;
};var script$x = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String
  },
  inject: ["t"],
  data: function data() {
    return {
      defaultDate: formatDateString(getDateByPropertyValue(this.$props.properties.defaultDate)),
      minDate: formatDateString(getDateByPropertyValue(this.$props.properties.minDate)),
      maxDate: formatDateString(getDateByPropertyValue(this.$props.properties.maxDate))
    };
  },
  methods: {
    onDateChange: function onDateChange(newDate) {
      this.$props.onChange(newDate.target.value);
    }
  }
});function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$x = script$x;
/* template */

var __vue_render__$x = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<input type=\"date\"" + _vm._ssrAttr("min", _vm.minDate) + _vm._ssrAttr("max", _vm.maxDate) + _vm._ssrAttr("value", _vm.value || _vm.defaultDate) + " data-v-1aa94aed>")]);
};

var __vue_staticRenderFns__$x = [];
/* style */

var __vue_inject_styles__$x = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-1aa94aed_0", {
    source: ".radio-item[data-v-1aa94aed]{margin-right:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$x = "data-v-1aa94aed";
/* module identifier */

var __vue_module_identifier__$x = "data-v-1aa94aed";
/* functional template */

var __vue_is_functional_template__$x = false;
/* style inject shadow dom */

var __vue_component__$y = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$x,
  staticRenderFns: __vue_staticRenderFns__$x
}, __vue_inject_styles__$x, __vue_script__$x, __vue_scope_id__$x, __vue_is_functional_template__$x, __vue_module_identifier__$x, false, undefined, createInjectorSSR, undefined);

var Display$a = __vue_component__$y;var script$w = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String
  },
  inject: ["t"],
  computed: {
    label: function label() {
      var _this = this;

      var selectedOption = this.$props.widget.properties.controlProperties.options.find(function (f) {
        return f.value === _this.$props.value;
      });
      return selectedOption !== null && selectedOption !== void 0 && selectedOption.labelKey ? this.t(selectedOption.labelKey, this.$props.widget.id) : "";
    }
  }
});/* script */
var __vue_script__$w = script$w;
/* template */

var __vue_render__$w = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode(_vm._ssrEscape("\n  " + _vm._s(_vm.label) + "\n"))]);
};

var __vue_staticRenderFns__$w = [];
/* style */

var __vue_inject_styles__$w = undefined;
/* scoped */

var __vue_scope_id__$w = undefined;
/* module identifier */

var __vue_module_identifier__$w = "data-v-42704d7f";
/* functional template */

var __vue_is_functional_template__$w = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$x = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$w,
  staticRenderFns: __vue_staticRenderFns__$w
}, __vue_inject_styles__$w, __vue_script__$w, __vue_scope_id__$w, __vue_is_functional_template__$w, __vue_module_identifier__$w, false, undefined, undefined, undefined);

var ReadOnly$a = __vue_component__$x;var datePicker = new FormControl({
  display: Display$a,
  readOnly: ReadOnly$a
});var script$v = defineComponent({
  props: {
    properties: Object,
    value: Number,
    onChange: Function
  },
  computed: {
    step: function step() {
      return this.$props.properties.step || 1;
    },
    numValue: function numValue() {
      var _this$$props$value;

      return ((_this$$props$value = this.$props.value) === null || _this$$props$value === void 0 ? void 0 : _this$$props$value.num) || this.$props.properties.default || this.$props.properties.min || 0;
    }
  },
  methods: {
    changeValue: function changeValue(diff) {
      var _this$$props$properti, _this$$props$properti2, _this$$props$properti3, _this$$props$properti4, _this$$props$onChange, _this$$props;

      var newNum = this.numValue + diff;
      if (((_this$$props$properti = this.$props.properties) === null || _this$$props$properti === void 0 ? void 0 : _this$$props$properti.min) !== undefined && newNum < ((_this$$props$properti2 = this.$props.properties) === null || _this$$props$properti2 === void 0 ? void 0 : _this$$props$properti2.min)) newNum = this.$props.properties.min;
      if (((_this$$props$properti3 = this.$props.properties) === null || _this$$props$properti3 === void 0 ? void 0 : _this$$props$properti3.max) !== undefined && newNum > ((_this$$props$properti4 = this.$props.properties) === null || _this$$props$properti4 === void 0 ? void 0 : _this$$props$properti4.max)) newNum = this.$props.properties.max;
      (_this$$props$onChange = (_this$$props = this.$props).onChange) === null || _this$$props$onChange === void 0 ? void 0 : _this$$props$onChange.call(_this$$props, {
        num: newNum
      });
    }
  }
});/* script */
var __vue_script__$v = script$v;
/* template */

var __vue_render__$v = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<button data-v-b41eccf2>-</button> <input type=\"number\"" + _vm._ssrAttr("step", _vm.step) + _vm._ssrAttr("value", _vm.numValue) + " data-v-b41eccf2> <button data-v-b41eccf2>+</button>")]);
};

var __vue_staticRenderFns__$v = [];
/* style */

var __vue_inject_styles__$v = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-b41eccf2_0", {
    source: "input[data-v-b41eccf2]::-webkit-inner-spin-button,input[data-v-b41eccf2]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$v = "data-v-b41eccf2";
/* module identifier */

var __vue_module_identifier__$v = "data-v-b41eccf2";
/* functional template */

var __vue_is_functional_template__$v = false;
/* style inject shadow dom */

var __vue_component__$w = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$v,
  staticRenderFns: __vue_staticRenderFns__$v
}, __vue_inject_styles__$v, __vue_script__$v, __vue_scope_id__$v, __vue_is_functional_template__$v, __vue_module_identifier__$v, false, undefined, createInjectorSSR, undefined);

var Form$8 = __vue_component__$w;var script$u = defineComponent({
  props: {
    properties: Object,
    value: Number,
    onChange: Function
  },
  created: function created() {
    var _this$$props$properti;

    // if value has not been set and default is set, set value to default
    if (this.$props.value === undefined && ((_this$$props$properti = this.$props.properties) === null || _this$$props$properti === void 0 ? void 0 : _this$$props$properti.default) !== undefined) this.changeValue(this.$props.properties.default, true);
  },
  computed: {
    step: function step() {
      return this.$props.properties.step || 1;
    },
    numValue: function numValue() {
      var _this$$props$properti2, _this$$props$properti3;

      if (this.$props.value !== undefined) return this.$props.value;
      if (((_this$$props$properti2 = this.$props.properties) === null || _this$$props$properti2 === void 0 ? void 0 : _this$$props$properti2.default) !== undefined) return this.$props.properties.default;
      if (((_this$$props$properti3 = this.$props.properties) === null || _this$$props$properti3 === void 0 ? void 0 : _this$$props$properti3.min) !== undefined) return this.$props.properties.min;
      return 0;
    }
  },
  methods: {
    changeValue: function changeValue(newNum, ignoreChecks) {
      var _this$$props$properti4, _this$$props$properti5, _this$$props$properti6, _this$$props$properti7, _this$$props$onChange, _this$$props;

      if (/^[^0-9]+$/.test(newNum.toString())) return;

      var _newNum = parseInt(newNum.toString(), 10);

      if (((_this$$props$properti4 = this.$props.properties) === null || _this$$props$properti4 === void 0 ? void 0 : _this$$props$properti4.min) !== undefined && _newNum < ((_this$$props$properti5 = this.$props.properties) === null || _this$$props$properti5 === void 0 ? void 0 : _this$$props$properti5.min)) _newNum = this.$props.properties.min;
      if (((_this$$props$properti6 = this.$props.properties) === null || _this$$props$properti6 === void 0 ? void 0 : _this$$props$properti6.max) !== undefined && _newNum > ((_this$$props$properti7 = this.$props.properties) === null || _this$$props$properti7 === void 0 ? void 0 : _this$$props$properti7.max)) _newNum = this.$props.properties.max;
      (_this$$props$onChange = (_this$$props = this.$props).onChange) === null || _this$$props$onChange === void 0 ? void 0 : _this$$props$onChange.call(_this$$props, _newNum, ignoreChecks);
    }
  }
});/* script */
var __vue_script__$u = script$u;
/* template */

var __vue_render__$u = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<button data-v-1a52acb6>-</button> <input type=\"number\"" + _vm._ssrAttr("step", _vm.step) + _vm._ssrAttr("value", _vm.numValue) + " data-v-1a52acb6> <button data-v-1a52acb6>+</button>")]);
};

var __vue_staticRenderFns__$u = [];
/* style */

var __vue_inject_styles__$u = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-1a52acb6_0", {
    source: "input[data-v-1a52acb6]::-webkit-inner-spin-button,input[data-v-1a52acb6]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$u = "data-v-1a52acb6";
/* module identifier */

var __vue_module_identifier__$u = "data-v-1a52acb6";
/* functional template */

var __vue_is_functional_template__$u = false;
/* style inject shadow dom */

var __vue_component__$v = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$u,
  staticRenderFns: __vue_staticRenderFns__$u
}, __vue_inject_styles__$u, __vue_script__$u, __vue_scope_id__$u, __vue_is_functional_template__$u, __vue_module_identifier__$u, false, undefined, createInjectorSSR, undefined);

var Display$9 = __vue_component__$v;var script$t = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: Number
  },
  inject: ["t"]
});/* script */
var __vue_script__$t = script$t;
/* template */

var __vue_render__$t = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode(_vm._ssrEscape("\n  " + _vm._s(_vm.value || _vm.widget.properties.controlProperties.default) + "\n"))]);
};

var __vue_staticRenderFns__$t = [];
/* style */

var __vue_inject_styles__$t = undefined;
/* scoped */

var __vue_scope_id__$t = undefined;
/* module identifier */

var __vue_module_identifier__$t = "data-v-8e0d9334";
/* functional template */

var __vue_is_functional_template__$t = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$u = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$t,
  staticRenderFns: __vue_staticRenderFns__$t
}, __vue_inject_styles__$t, __vue_script__$t, __vue_scope_id__$t, __vue_is_functional_template__$t, __vue_module_identifier__$t, false, undefined, undefined, undefined);

var ReadOnly$9 = __vue_component__$u;var numberPicker = new FormControl({
  form: Form$8,
  display: Display$9,
  readOnly: ReadOnly$9
});var script$s = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: Object
  },
  inject: ["t"],
  methods: {
    onSelect: function onSelect(ev) {
      this.$props.onChange({
        value: ev.target.value
      });
    }
  }
});/* script */
var __vue_script__$s = script$s;
/* template */

var __vue_render__$s = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode(_vm._ssrList(_vm.properties.options, function (option) {
    return "<label class=\"radio-item\" data-v-31ad933e><input type=\"radio\"" + _vm._ssrAttr("name", _vm.widget.id) + _vm._ssrAttr("checked", _vm.value && _vm.value.value === option.value) + _vm._ssrAttr("value", option.value) + " data-v-31ad933e>" + _vm._ssrEscape("\n    " + _vm._s(_vm.t(option.labelKey, _vm.widget.id)) + "\n  ") + "</label>";
  }))]);
};

var __vue_staticRenderFns__$s = [];
/* style */

var __vue_inject_styles__$s = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-31ad933e_0", {
    source: ".radio-item[data-v-31ad933e]{margin-right:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$s = "data-v-31ad933e";
/* module identifier */

var __vue_module_identifier__$s = "data-v-31ad933e";
/* functional template */

var __vue_is_functional_template__$s = false;
/* style inject shadow dom */

var __vue_component__$t = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$s,
  staticRenderFns: __vue_staticRenderFns__$s
}, __vue_inject_styles__$s, __vue_script__$s, __vue_scope_id__$s, __vue_is_functional_template__$s, __vue_module_identifier__$s, false, undefined, createInjectorSSR, undefined);

var Form$7 = __vue_component__$t;var script$r = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String
  },
  inject: ["t"],
  methods: {
    onSelect: function onSelect(ev) {
      this.$props.onChange(ev.target.value);
    }
  }
});/* script */
var __vue_script__$r = script$r;
/* template */

var __vue_render__$r = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode(_vm._ssrList(_vm.properties.options, function (option) {
    return "<label class=\"radio-item\" data-v-4b1138df><input type=\"radio\"" + _vm._ssrAttr("name", _vm.widget.id) + _vm._ssrAttr("checked", _vm.value === option.value) + _vm._ssrAttr("value", option.value) + " data-v-4b1138df>" + _vm._ssrEscape("\n    " + _vm._s(_vm.t(option.labelKey, _vm.widget.id)) + "\n  ") + "</label>";
  }))]);
};

var __vue_staticRenderFns__$r = [];
/* style */

var __vue_inject_styles__$r = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-4b1138df_0", {
    source: ".radio-item[data-v-4b1138df]{margin-right:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$r = "data-v-4b1138df";
/* module identifier */

var __vue_module_identifier__$r = "data-v-4b1138df";
/* functional template */

var __vue_is_functional_template__$r = false;
/* style inject shadow dom */

var __vue_component__$s = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$r,
  staticRenderFns: __vue_staticRenderFns__$r
}, __vue_inject_styles__$r, __vue_script__$r, __vue_scope_id__$r, __vue_is_functional_template__$r, __vue_module_identifier__$r, false, undefined, createInjectorSSR, undefined);

var Display$8 = __vue_component__$s;var script$q = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String
  },
  inject: ["t"],
  computed: {
    label: function label() {
      var _this = this;

      var selectedOption = this.$props.widget.properties.controlProperties.options.find(function (f) {
        return f.value === _this.$props.value;
      });
      return selectedOption !== null && selectedOption !== void 0 && selectedOption.labelKey ? this.t(selectedOption.labelKey, this.$props.widget.id) : "";
    }
  }
});/* script */
var __vue_script__$q = script$q;
/* template */

var __vue_render__$q = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode(_vm._ssrEscape("\n  " + _vm._s(_vm.label) + "\n"))]);
};

var __vue_staticRenderFns__$q = [];
/* style */

var __vue_inject_styles__$q = undefined;
/* scoped */

var __vue_scope_id__$q = undefined;
/* module identifier */

var __vue_module_identifier__$q = "data-v-42704d7f";
/* functional template */

var __vue_is_functional_template__$q = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$r = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$q,
  staticRenderFns: __vue_staticRenderFns__$q
}, __vue_inject_styles__$q, __vue_script__$q, __vue_scope_id__$q, __vue_is_functional_template__$q, __vue_module_identifier__$q, false, undefined, undefined, undefined);

var ReadOnly$8 = __vue_component__$r;var radio = new FormControl({
  form: Form$7,
  display: Display$8,
  readOnly: ReadOnly$8
});var script$p = defineComponent({
  props: {
    properties: Object,
    value: String,
    onChange: Function
  },
  created: function created() {
    var _this$$props$properti;

    // if value has not been set and default is set, set value to default
    if (this.$props.value === undefined && ((_this$$props$properti = this.$props.properties) === null || _this$$props$properti === void 0 ? void 0 : _this$$props$properti.default) !== undefined) this.changeValue(this.$props.properties.default, true);
  },
  computed: {
    step: function step() {
      return this.$props.properties.step || 1;
    },
    numValue: function numValue() {
      var _this$$props$properti2, _this$$props$properti3;

      if (this.$props.value !== undefined) return this.$props.value;
      if (((_this$$props$properti2 = this.$props.properties) === null || _this$$props$properti2 === void 0 ? void 0 : _this$$props$properti2.default) !== undefined) return this.$props.properties.default;
      if (((_this$$props$properti3 = this.$props.properties) === null || _this$$props$properti3 === void 0 ? void 0 : _this$$props$properti3.min) !== undefined) return this.$props.properties.min;
      return 0;
    }
  },
  methods: {
    onTextChange: function onTextChange(ev) {
      this.$props.onChange(ev.target.value);
    }
  }
});/* script */
var __vue_script__$p = script$p;
/* template */

var __vue_render__$p = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode((!_vm.properties.multiline ? "<input type=\"text\"" + _vm._ssrAttr("value", _vm.value) + " data-v-66b5dc24>" : "<!---->") + " " + (_vm.properties.multiline ? "<textarea" + _vm._ssrAttr("value", _vm.value) + " data-v-66b5dc24></textarea>" : "<!---->"))]);
};

var __vue_staticRenderFns__$p = [];
/* style */

var __vue_inject_styles__$p = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-66b5dc24_0", {
    source: "input[data-v-66b5dc24]::-webkit-inner-spin-button,input[data-v-66b5dc24]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$p = "data-v-66b5dc24";
/* module identifier */

var __vue_module_identifier__$p = "data-v-66b5dc24";
/* functional template */

var __vue_is_functional_template__$p = false;
/* style inject shadow dom */

var __vue_component__$q = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$p,
  staticRenderFns: __vue_staticRenderFns__$p
}, __vue_inject_styles__$p, __vue_script__$p, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, false, undefined, createInjectorSSR, undefined);

var Display$7 = __vue_component__$q;var script$o = defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: Number
  },
  inject: ["t"]
});/* script */
var __vue_script__$o = script$o;
/* template */

var __vue_render__$o = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode(_vm._ssrEscape("\n  " + _vm._s(_vm.value || _vm.widget.properties.controlProperties.default) + "\n"))]);
};

var __vue_staticRenderFns__$o = [];
/* style */

var __vue_inject_styles__$o = undefined;
/* scoped */

var __vue_scope_id__$o = undefined;
/* module identifier */

var __vue_module_identifier__$o = "data-v-65611795";
/* functional template */

var __vue_is_functional_template__$o = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$p = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$o,
  staticRenderFns: __vue_staticRenderFns__$o
}, __vue_inject_styles__$o, __vue_script__$o, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, false, undefined, undefined, undefined);

var ReadOnly$7 = __vue_component__$p;var text = new FormControl({
  display: Display$7,
  readOnly: ReadOnly$7
});var questionControls = {
  checkbox: checkbox,
  datePicker: datePicker,
  numberPicker: numberPicker,
  radio: radio,
  text: text
};/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}var c=Object.prototype,l=c.toString,s=c.hasOwnProperty,v=/^\s*function (\w+)/;function p(e){var t,n=null!==(t=null==e?void 0:e.type)&&void 0!==t?t:e;if(n){var r=n.toString().match(v);return r?r[1]:""}return ""}var y=isPlainObject,d=function(e){return e},h=d;var g=function(e,t){return s.call(e,t)},m=Array.isArray||function(e){return "[object Array]"===l.call(e)},j=function(e){return "[object Function]"===l.call(e)},_=function(e){return y(e)&&g(e,"_vueTypes_name")},T=function(e){return y(e)&&(g(e,"type")||["_vueTypes_name","validator","default","required"].some(function(t){return g(e,t)}))};function w(e,t){return Object.defineProperty(e.bind(t),"__original",{value:e})}function k(e,t,n){var r;void 0===n&&(n=!1);var i=!0,o="";r=y(e)?e:{type:e};var u=_(r)?r._vueTypes_name+" - ":"";if(T(r)&&null!==r.type){if(void 0===r.type||!0===r.type)return i;if(!r.required&&void 0===t)return i;m(r.type)?(i=r.type.some(function(e){return !0===k(e,t,!0)}),o=r.type.map(function(e){return p(e)}).join(" or ")):i="Array"===(o=p(r))?m(t):"Object"===o?y(t):"String"===o||"Number"===o||"Boolean"===o||"Function"===o?function(e){if(null==e)return "";var t=e.constructor.toString().match(v);return t?t[1]:""}(t)===o:t instanceof r.type;}if(!i){var a=u+'value "'+t+'" should be of type "'+o+'"';return !1===n?(h(a),!1):a}if(g(r,"validator")&&j(r.validator)){var f=h,c=[];if(h=function(e){c.push(e);},i=r.validator(t),h=f,!i){var l=(c.length>1?"* ":"")+c.join("\n* ");return c.length=0,!1===n?(h(l),i):l}}return i}function P(e,t){var n=Object.defineProperties(t,{_vueTypes_name:{value:e,writable:!0},isRequired:{get:function(){return this.required=!0,this}},def:{value:function(e){return void 0===e?(g(this,"default")&&delete this.default,this):j(e)||!0===k(this,e,!0)?(this.default=m(e)?function(){return [].concat(e)}:y(e)?function(){return Object.assign({},e)}:e,this):(h(this._vueTypes_name+' - invalid default value: "'+e+'"'),this)}}}),r=n.validator;return j(r)&&(n.validator=w(r,n)),n}function x(e,t){var n=P(e,t);return Object.defineProperty(n,"validate",{value:function(e){return j(this.validator)&&h(this._vueTypes_name+" - calling .validate() will overwrite the current custom validator function. Validator info:\n"+JSON.stringify(this)),this.validator=w(e,this),this}})}function N(e){return e.replace(/^(?!\s*$)/gm,"  ")}var V=function(){return x("boolean",{type:Boolean})},S=function(){return x("string",{type:String})};function R(e){return P("arrayOf",{type:Array,validator:function(t){var n="",r=t.every(function(t){return !0===(n=k(e,t,!0))});return r||h("arrayOf - value validation error:\n"+N(n)),r}})}function $(e){return P("instanceOf",{type:e})}function C(e){var t=Object.keys(e),n=t.filter(function(t){var n;return !(null===(n=e[t])||void 0===n||!n.required)}),r=P("shape",{type:Object,validator:function(r){var i=this;if(!y(r))return !1;var o=Object.keys(r);if(n.length>0&&n.some(function(e){return -1===o.indexOf(e)})){var u=n.filter(function(e){return -1===o.indexOf(e)});return h(1===u.length?'shape - required property "'+u[0]+'" is not defined.':'shape - required properties "'+u.join('", "')+'" are not defined.'),!1}return o.every(function(n){if(-1===t.indexOf(n))return !0===i._vueTypes_isLoose||(h('shape - shape definition does not include a "'+n+'" property. Allowed keys: "'+t.join('", "')+'".'),!1);var o=k(e[n],r[n],!0);return "string"==typeof o&&h('shape - "'+n+'" property validation error:\n '+N(o)),!0===o})}});return Object.defineProperty(r,"_vueTypes_isLoose",{writable:!0,value:!1}),Object.defineProperty(r,"loose",{get:function(){return this._vueTypes_isLoose=!0,this}}),r}//
var script$n = defineComponent({
  props: {
    widget: Object,
    widgetControls: Object,
    widgetItems: Object,
    formState: Object,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String
  },
  setup: function setup() {}
});/* script */
var __vue_script__$n = script$n;
/* template */

var __vue_render__$n = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "widget-wrapper"
  }, [_vm.widget.style ? _c('style', {
    tag: "component",
    attrs: {
      "scoped": ""
    }
  }, [_vm._v("\n    " + _vm._s(_vm.widget.style) + "\n  ")]) : _vm._e(), _vm._ssrNode(" "), _vm.view === 'form' ? _vm._ssrNode("<div class=\"widget-form-control\" data-v-774df5bc>", "</div>", [_c(_vm.widgetControls[_vm.widget.type].formControl, {
    tag: "component",
    attrs: {
      "widget": _vm.widget,
      "widgetControls": _vm.widgetControls,
      "widgetItems": _vm.widgetItems,
      "formState": _vm.formState,
      "setWidgetState": function setWidgetState(key, value) {
        return _vm.setWidgetState(key, value, _vm.widget);
      },
      "getWidgetState": function getWidgetState(key) {
        return _vm.getWidgetState(key, _vm.widget);
      },
      "view": _vm.view
    }
  })], 1) : _vm._e(), _vm._ssrNode(" "), _vm._ssrNode("<div data-v-774df5bc>", "</div>", [_c(_vm.widgetControls[_vm.widget.type][_vm.view || 'display'], {
    tag: "component",
    attrs: {
      "widget": _vm.widget,
      "widgetControls": _vm.widgetControls,
      "widgetItems": _vm.widgetItems,
      "formState": _vm.formState,
      "setWidgetState": function setWidgetState(key, value) {
        return _vm.setWidgetState(key, value, _vm.widget);
      },
      "getWidgetState": function getWidgetState(key) {
        return _vm.getWidgetState(key, _vm.widget);
      },
      "view": _vm.view
    }
  })], 1)], 2);
};

var __vue_staticRenderFns__$n = [];
/* style */

var __vue_inject_styles__$n = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-774df5bc_0", {
    source: ".widget-wrapper[data-v-774df5bc]{padding:0 10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$n = "data-v-774df5bc";
/* module identifier */

var __vue_module_identifier__$n = "data-v-774df5bc";
/* functional template */

var __vue_is_functional_template__$n = false;
/* style inject shadow dom */

var __vue_component__$o = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$n,
  staticRenderFns: __vue_staticRenderFns__$n
}, __vue_inject_styles__$n, __vue_script__$n, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, false, undefined, createInjectorSSR, undefined);

var WidgetView = __vue_component__$o;//
var script$m = defineComponent({
  components: {
    WidgetView: WidgetView
  },
  props: {
    widgetControls: Object,
    widgetItems: Object,
    excludeWidgetIds: R(String),
    onlyIncludeWidgetIds: R(String),
    forParent: String
  },
  inject: ["widgetControls", "getFormState", "getView", "setFormState"],
  computed: {
    view: function view() {
      return this.getView();
    },
    formState: function formState() {
      return this.getFormState();
    },
    widgetItemsArr: function widgetItemsArr() {
      return Object.values(this.$props.widgetItems);
    },
    filteredWidgetItemsArr: function filteredWidgetItemsArr() {
      var _this = this;

      var filteredArr = this.widgetItemsArr.filter(function (f) {
        return f.parentId === _this.forParent && (!_this.$props.onlyIncludeWidgetIds || _this.$props.onlyIncludeWidgetIds.includes(f.id)) && (!(_this.excludeWidgetIds || []).length || !_this.excludeWidgetIds.includes(f.id));
      }).sort(function (a, b) {
        return (a.order || 0) - (b.order || 0);
      });
      return filteredArr;
    }
  },
  methods: {
    setWidgetState: function setWidgetState(key, value, widget) {
      var formState = this.formState;

      if (value === undefined) {
        if (!formState.widgetState[widget.id]) return;
        delete formState.widgetState[widget.id][key];
      } else {
        if (!formState.widgetState[widget.id]) formState.widgetState[widget.id] = {};
        formState.widgetState[widget.id][key] = value;
      }

      this.setFormState(formState);
    },
    getWidgetState: function getWidgetState(key, widget) {
      var _this$formState$widge;

      return (_this$formState$widge = this.formState.widgetState[widget.id]) === null || _this$formState$widge === void 0 ? void 0 : _this$formState$widge[key];
    }
  },
  setup: function setup() {}
});/* script */
var __vue_script__$m = script$m;
/* template */

var __vue_render__$m = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._l(_vm.filteredWidgetItemsArr, function (widget) {
    return _vm._ssrNode("<div class=\"widget-container\" data-v-0b497604>", "</div>", [_c('widget-view', {
      attrs: {
        "widget": widget,
        "widgetControls": _vm.widgetControls,
        "widgetItems": _vm.widgetItems,
        "formState": _vm.formState,
        "setWidgetState": _vm.setWidgetState,
        "getWidgetState": _vm.getWidgetState,
        "view": _vm.view
      }
    })], 1);
  }), 0);
};

var __vue_staticRenderFns__$m = [];
/* style */

var __vue_inject_styles__$m = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-0b497604_0", {
    source: ".widget-container[data-v-0b497604]{position:relative}.widget-form-control[data-v-0b497604]{position:absolute;top:-40px;left:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$m = "data-v-0b497604";
/* module identifier */

var __vue_module_identifier__$m = "data-v-0b497604";
/* functional template */

var __vue_is_functional_template__$m = false;
/* style inject shadow dom */

var __vue_component__$n = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$m,
  staticRenderFns: __vue_staticRenderFns__$m
}, __vue_inject_styles__$m, __vue_script__$m, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, false, undefined, createInjectorSSR, undefined);

var WidgetsLayout = __vue_component__$n;var script$l = defineComponent({
  components: {
    WidgetsLayout: WidgetsLayout
  },
  props: {
    widget: Object,
    widgetItems: Object,
    formState: Object,
    setWidgetState: Function
  },
  data: function data() {
    return {
      sortedPages: []
    };
  },
  inject: ["t"],
  computed: {
    currentPageIndex: function currentPageIndex() {
      var _this$formState$widge, _this$formState$widge2;

      return ((_this$formState$widge = this.formState.widgetState) === null || _this$formState$widge === void 0 ? void 0 : (_this$formState$widge2 = _this$formState$widge[this.$props.widget.id]) === null || _this$formState$widge2 === void 0 ? void 0 : _this$formState$widge2.currentPageIndex) || 0;
    }
  },
  watch: {
    currentPageIndex: {
      handler: function handler() {
        var viewedIndices = this.$props.widget.getState("viewedIndices");
        this.$props.widget.setState("viewedIndices", _toConsumableArray(new Set([].concat(_toConsumableArray(viewedIndices || []), [this.currentPageIndex]))));
      },
      immediate: true
    },
    "widget.properties.pages": {
      handler: function handler() {
        this.$data.sortedPages = this.$props.widget.getSortedPages();
      },
      immediate: true
    }
  } // methods: {
  //   pageIndexHasErrors(idx) {
  //     // get child errors
  //     const childErrors = this.$props.widget.getState("pageIdxErrors") || {};
  //     // if no childErrors, just return false
  //     if (!Object.keys(childErrors).length) return false;
  //     // map child error widget ids to pages children index
  //     // const children = this.$props.widget.getChildren();
  //     return Object.keys(childErrors[idx] || {}).length;
  //   },
  // },

});/* script */
var __vue_script__$l = script$l;
/* template */

var __vue_render__$l = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode((_vm.widget.properties.tabsVisible ? "<div class=\"pages-menu-wrapper\" data-v-53700efa>" + _vm._ssrList(_vm.sortedPages, function (page, pageIndex) {
    return "<a" + _vm._ssrAttr("disabled", !(_vm.widget.getState('viewedIndices') || []).includes(pageIndex)) + _vm._ssrClass("pages-menu-item", {
      active: _vm.currentPageIndex === pageIndex,
      errors: _vm.widget.pageIndexHasErrors(pageIndex, {
        allChildPages: true
      }),
      unopened: !(_vm.widget.getState('viewedIndices') || []).includes(pageIndex)
    }) + " data-v-53700efa>" + _vm._ssrEscape("\n      " + _vm._s(_vm.t(page.labelKey, _vm.widget.id)) + "\n    ") + "</a>";
  }) + "</div>" : "<!---->") + " "), _vm._l(_vm.sortedPages, function (page, pageIndex) {
    return _vm._ssrNode("<div class=\"pages-content-item\" data-v-53700efa>", "</div>", [_vm.currentPageIndex === pageIndex ? _vm._ssrNode("<div data-v-53700efa>", "</div>", [_c('widgets-layout', {
      attrs: {
        "widgetItems": _vm.widgetItems,
        "excludeWidgetIds": [_vm.widget.id],
        "onlyIncludeWidgetIds": page.children,
        "forParent": _vm.widget.id
      }
    })], 1) : _vm._e()]);
  }), _vm._ssrNode(" " + (_vm.widget.properties.navigationVisible ? "<div class=\"back-forward-wrapper\" data-v-53700efa><div data-v-53700efa>" + (_vm.widget.hasPreviousButton() ? "<button class=\"back-forward-button\" data-v-53700efa>" + _vm._ssrEscape("\n        " + _vm._s(_vm.t("__" + _vm.widget.previousButtonType(), _vm.widget.id)) + "\n      ") + "</button>" : "<!---->") + "</div> <div data-v-53700efa>" + (_vm.widget.hasNextButton() ? "<button" + _vm._ssrAttr("disabled", _vm.widget.pageIndexHasErrors(_vm.currentPageIndex)) + _vm._ssrClass("back-forward-button", {
    errors: _vm.widget.pageIndexHasErrors(_vm.currentPageIndex)
  }) + " data-v-53700efa>" + _vm._ssrEscape("\n        " + _vm._s(_vm.t("__" + _vm.widget.nextButtonType(), _vm.widget.id)) + "\n      ") + "</button>" : "<!---->") + "</div></div>" : "<!---->"))], 2);
};

var __vue_staticRenderFns__$l = [];
/* style */

var __vue_inject_styles__$l = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-53700efa_0", {
    source: ".pages-menu-wrapper[data-v-53700efa]{display:flex;flex-direction:row;justify-content:center;margin:10px 0}.pages-menu-item[data-v-53700efa]{display:inline-block;padding:10px 20px;cursor:pointer;text-align:center}.pages-menu-item.unopened[data-v-53700efa]{opacity:.3;cursor:default}.pages-menu-item.active[data-v-53700efa]{border-bottom:3px solid #03a9f4}.pages-menu-item.errors[data-v-53700efa]{border-color:red}.back-forward-wrapper[data-v-53700efa]{display:flex;flex-direction:row;justify-content:space-between}.back-forward-button[data-v-53700efa]{padding:10px 20px;margin:10px;border:1px solid transparent;background-color:#03a9f4;color:#fff;cursor:pointer}.back-forward-button.errors[data-v-53700efa]{background-color:red;color:#fff;opacity:.2;cursor:default}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$l = "data-v-53700efa";
/* module identifier */

var __vue_module_identifier__$l = "data-v-53700efa";
/* functional template */

var __vue_is_functional_template__$l = false;
/* style inject shadow dom */

var __vue_component__$m = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$l,
  staticRenderFns: __vue_staticRenderFns__$l
}, __vue_inject_styles__$l, __vue_script__$l, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, false, undefined, createInjectorSSR, undefined);

var Display$6 = __vue_component__$m;//
var script$k = defineComponent({
  components: {
    WidgetsLayout: WidgetsLayout
  },
  props: {
    widget: Object,
    widgets: Object,
    widgetItems: Object,
    formState: Object
  },
  inject: ["t", "setFormState"],
  computed: {
    currentPageIndex: function currentPageIndex() {
      var _this$formState$widge, _this$formState$widge2;

      return ((_this$formState$widge = this.formState.widgetState) === null || _this$formState$widge === void 0 ? void 0 : (_this$formState$widge2 = _this$formState$widge[this.$props.widget.id]) === null || _this$formState$widge2 === void 0 ? void 0 : _this$formState$widge2.currentPageIndex) || 0;
    }
  },
  watch: {
    formStateCurrentPageIndex: {
      handler: function handler(newPageIndex) {
        this.$data.currentPageIndex = newPageIndex;
      },
      deep: true
    }
  },
  methods: {
    setState: function setState(key, value) {
      var formState = this.formState;

      if (value === undefined) {
        if (!formState.widgetState[this.$props.widget.id]) return;
        delete formState.widgetState[this.$props.widget.id][key];
      } else {
        if (!formState.widgetState[this.$props.widget.id]) formState.widgetState[this.$props.widget.id] = {};
        formState.widgetState[this.$props.widget.id][key] = value;
      }

      this.setFormState(formState);
    }
  }
});/* script */
var __vue_script__$k = script$k;
/* template */

var __vue_render__$k = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<div class=\"paging-menu\" data-v-75828a48>" + _vm._ssrList(_vm.widget.properties.pages, function (page, pageIndex) {
    return "<a" + _vm._ssrClass("paging-menu-item", {
      active: _vm.currentPageIndex === pageIndex
    }) + " data-v-75828a48>" + _vm._ssrEscape("\n      " + _vm._s(_vm.t(page.labelKey, _vm.widget.id)) + "\n    ") + "</a>";
  }) + "</div> "), _vm._l(_vm.widget.properties.pages, function (page, pageIndex) {
    return _vm._ssrNode("<div class=\"paging-content-item\" data-v-75828a48>", "</div>", [_vm.currentPageIndex === pageIndex ? _vm._ssrNode("<div data-v-75828a48>", "</div>", _vm._l(page.children, function (child, childIndex) {
      return _vm._ssrNode("<div data-v-75828a48>", "</div>", [_c('widgets-layout', {
        attrs: {
          "widgets": _vm.widgets,
          "widgetItems": _vm.widgetItems,
          "excludeWidgetIds": [_vm.widget.id],
          "forParent": _vm.widget.id
        }
      })], 1);
    }), 0) : _vm._e()]);
  })], 2);
};

var __vue_staticRenderFns__$k = [];
/* style */

var __vue_inject_styles__$k = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-75828a48_0", {
    source: ".paging-menu[data-v-75828a48]{display:flex;flex-direction:row;justify-content:space-around}.paging-menu-item[data-v-75828a48]{display:inline-block;padding:5px 10px}.paging-menu-item.active[data-v-75828a48]{background-color:#e8e8e8}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$k = "data-v-75828a48";
/* module identifier */

var __vue_module_identifier__$k = "data-v-75828a48";
/* functional template */

var __vue_is_functional_template__$k = false;
/* style inject shadow dom */

var __vue_component__$l = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$k,
  staticRenderFns: __vue_staticRenderFns__$k
}, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, false, undefined, createInjectorSSR, undefined);

var Form$6 = __vue_component__$l;//
var script$j = defineComponent({
  components: {
    WidgetsLayout: WidgetsLayout
  },
  props: {
    widget: Object,
    widgets: Object,
    widgetItems: Object,
    formState: Object,
    setWidgetState: Function
  },
  data: function data() {
    return {
      sortedPages: []
    };
  },
  inject: ["t"],
  computed: {
    currentPageIndex: function currentPageIndex() {
      var _this$formState$widge, _this$formState$widge2;

      return ((_this$formState$widge = this.formState.widgetState) === null || _this$formState$widge === void 0 ? void 0 : (_this$formState$widge2 = _this$formState$widge[this.$props.widget.id]) === null || _this$formState$widge2 === void 0 ? void 0 : _this$formState$widge2.currentPageIndex) || 0;
    }
  },
  watch: {
    "widget.properties.pages": {
      handler: function handler() {
        this.$data.sortedPages = this.$props.widget.getSortedPages();
      },
      immediate: true
    }
  },
  methods: {
    pageIndexHasErrors: function pageIndexHasErrors(idx) {
      // get child errors
      var childErrors = this.$props.widget.getState("pageIdxErrors") || {}; // if no childErrors, just return false

      if (!Object.keys(childErrors).length) return false; // map child error widget ids to paging children index
      // const children = this.$props.widget.getChildren();

      return Object.keys(childErrors[idx] || {}).length;
    }
  }
});/* script */
var __vue_script__$j = script$j;
/* template */

var __vue_render__$j = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<div class=\"paging-menu-wrapper\" data-v-14235d2b>" + _vm._ssrList(_vm.sortedPages, function (page, pageIndex) {
    return "<a" + _vm._ssrClass("paging-menu-item", {
      active: _vm.currentPageIndex === pageIndex,
      errors: _vm.pageIndexHasErrors(pageIndex)
    }) + " data-v-14235d2b>" + _vm._ssrEscape("\n      " + _vm._s(_vm.t(page.labelKey, _vm.widget.id)) + "\n    ") + "</a>";
  }) + "</div> "), _vm._l(_vm.sortedPages, function (page, pageIndex) {
    return _vm._ssrNode("<div class=\"paging-content-item\" data-v-14235d2b>", "</div>", [_vm.currentPageIndex === pageIndex ? _vm._ssrNode("<div data-v-14235d2b>", "</div>", [_c('widgets-layout', {
      attrs: {
        "widgets": _vm.widgets,
        "widgetItems": _vm.widgetItems,
        "excludeWidgetIds": [_vm.widget.id],
        "onlyIncludeWidgetIds": page.children,
        "forParent": _vm.widget.id
      }
    })], 1) : _vm._e()]);
  })], 2);
};

var __vue_staticRenderFns__$j = [];
/* style */

var __vue_inject_styles__$j = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-14235d2b_0", {
    source: ".paging-menu-wrapper[data-v-14235d2b]{display:flex;flex-direction:row;justify-content:center;margin:10px 0}.paging-menu-item[data-v-14235d2b]{display:inline-block;padding:10px 20px;cursor:pointer;border:1px solid transparent}.paging-menu-item.active[data-v-14235d2b]{background-color:#e8e8e8}.paging-menu-item.errors[data-v-14235d2b]{border-color:red}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$j = "data-v-14235d2b";
/* module identifier */

var __vue_module_identifier__$j = "data-v-14235d2b";
/* functional template */

var __vue_is_functional_template__$j = false;
/* style inject shadow dom */

var __vue_component__$k = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$j,
  staticRenderFns: __vue_staticRenderFns__$j
}, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, false, undefined, createInjectorSSR, undefined);

var ReadOnly$6 = __vue_component__$k;/**
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
hash.is = is;var fact = createCommonjsModule(function (module, exports) {

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
});var debug_1 = createCommonjsModule(function (module, exports) {

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
});/**
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

var lodash_isobjectlike = isObjectLike;var condition = createCommonjsModule(function (module, exports) {

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
});var clone_1 = createCommonjsModule(function (module) {
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
});var ruleResult = createCommonjsModule(function (module, exports) {

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
});var eventemitter2 = createCommonjsModule(function (module, exports) {
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
});var rule = createCommonjsModule(function (module, exports) {

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
});var operator = createCommonjsModule(function (module, exports) {

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
});var errors = createCommonjsModule(function (module, exports) {

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
});const {
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

JSONPath.prototype.vm = vm__default["default"];var indexNodeEsm=/*#__PURE__*/Object.freeze({__proto__:null,JSONPath:JSONPath});var _jsonpathPlus = getCjsExportFromNamespace(indexNodeEsm);var almanac = createCommonjsModule(function (module, exports) {

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
});var engineDefaultOperators = createCommonjsModule(function (module, exports) {

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
});var engine = createCommonjsModule(function (module, exports) {

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
});var jsonRulesEngine = createCommonjsModule(function (module, exports) {

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
});var dist = jsonRulesEngine;var WidgetItem = /*#__PURE__*/function () {
  function WidgetItem(_ref) {
    var _this$reflexiveRules;

    var widget = _ref.widget,
        getState = _ref.getState,
        setState = _ref.setState,
        onUpdate = _ref.onUpdate;

    _classCallCheck(this, WidgetItem);

    this._widgetItems = {};
    this._widget = widget;
    this._getFormState = getState;
    this._setFormState = setState;
    this._onUpdate = onUpdate;
    if (this.code) getState().registerWidgetCode(this.code, this.id);

    if ((_this$reflexiveRules = this.reflexiveRules) !== null && _this$reflexiveRules !== void 0 && _this$reflexiveRules.length) {
      this.formState.registerReflexWatch(this.id, this.reflexiveRules.map(function (r) {
        return r.fact;
      })); // initial run

      this.runReflexives();
    }
  }

  _createClass(WidgetItem, [{
    key: "formState",
    get: function get() {
      return this._getFormState();
    }
  }, {
    key: "id",
    get: function get() {
      return this._widget.id;
    }
  }, {
    key: "type",
    get: function get() {
      return this._widget.type;
    }
  }, {
    key: "code",
    get: function get() {
      return this._widget.code;
    }
  }, {
    key: "style",
    get: function get() {
      return this._widget.style;
    }
  }, {
    key: "properties",
    get: function get() {
      return this._widget.properties;
    }
  }, {
    key: "parentId",
    get: function get() {
      return this._widget.parent;
    }
  }, {
    key: "parent",
    set: function set(parentId) {
      this._widget.parent = parentId;
    }
  }, {
    key: "reflexiveRules",
    get: function get() {
      return this._widget.reflexiveRules;
    }
  }, {
    key: "validationRules",
    get: function get() {
      return this._widget.validationRules;
    }
  }, {
    key: "destroyed",
    value: function destroyed() {
      var _this$reflexiveRules2;

      if ((_this$reflexiveRules2 = this.reflexiveRules) !== null && _this$reflexiveRules2 !== void 0 && _this$reflexiveRules2.length) this.formState.unregisterReflexWatch(this.id, this.reflexiveRules.map(function (r) {
        return r.fact;
      }));
    }
  }, {
    key: "setWidgetItems",
    value: function setWidgetItems(widgetItems) {
      this._widgetItems = widgetItems;
    }
  }, {
    key: "validate",
    value: function () {
      var _validate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(conditions, data) {
        var engine;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                engine = new dist.Engine();
                engine.addRule({
                  conditions: {
                    all: conditions
                  },
                  event: {
                    type: "isTruthy"
                  }
                });
                _context.next = 4;
                return engine.run(data);

              case 4:
                return _context.abrupt("return", _context.sent.events.some(function (e) {
                  return e.type === "isTruthy";
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function validate(_x, _x2) {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "runValidations",
    value: function () {
      var _runValidations = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var errors;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._getValidationErrors();

              case 2:
                errors = _context2.sent;
                // save error to widgetState
                this.setState("errors", errors);

                this._setFormState(this.formState); // update parent fields that they have children errors
                // TODO
                // return errors


                return _context2.abrupt("return", errors);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function runValidations() {
        return _runValidations.apply(this, arguments);
      }

      return runValidations;
    }()
  }, {
    key: "_getValidationErrors",
    value: function () {
      var _getValidationErrors2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this$validationRules,
            _this = this;

        var response, errors;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if ((_this$validationRules = this.validationRules) !== null && _this$validationRules !== void 0 && _this$validationRules.length) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", null);

              case 2:
                // get current widget's response
                response = this.getState("response"); // go through each validation, and return error string if
                // invalid, and null if valid.
                // Only store an array of errors

                _context4.next = 5;
                return Promise.all(this.validationRules.map( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(validation) {
                    var isValid;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this.validate(validation.conditions, {
                              data: _this.properties,
                              response: response
                            });

                          case 2:
                            isValid = _context3.sent;

                            if (isValid) {
                              _context3.next = 5;
                              break;
                            }

                            return _context3.abrupt("return", validation.error);

                          case 5:
                            return _context3.abrupt("return", null);

                          case 6:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 5:
                errors = _context4.sent.filter(function (a) {
                  return a;
                });
                return _context4.abrupt("return", errors.length ? errors : null);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _getValidationErrors() {
        return _getValidationErrors2.apply(this, arguments);
      }

      return _getValidationErrors;
    }()
  }, {
    key: "setChildErrors",
    value: function setChildErrors(childWidgetId, errors) {
      var currentChildErrors = this.getState("childErrors") || {};

      if (!errors) {
        delete currentChildErrors[childWidgetId];
      } else {
        currentChildErrors[childWidgetId] = errors;
      }

      if (!Object.keys(currentChildErrors).length) {
        this.setState("childErrors", undefined);
      } else {
        this.setState("childErrors", currentChildErrors);
      }
    }
  }, {
    key: "childErrors",
    value: function childErrors() {
      return this.getState("childErrors");
    }
  }, {
    key: "hasChildErrors",
    value: function hasChildErrors() {
      return Object.keys(this.childErrors() || {}).length > 0;
    }
  }, {
    key: "runReflexives",
    value: function () {
      var _runReflexives = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var isReflexive;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.isReflexive();

              case 2:
                isReflexive = _context5.sent;
                this.setState("reflexiveHide", !isReflexive);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function runReflexives() {
        return _runReflexives.apply(this, arguments);
      }

      return runReflexives;
    }()
  }, {
    key: "isReflexive",
    value: function () {
      var _isReflexive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this$reflexiveRules3,
            _this2 = this;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if ((_this$reflexiveRules3 = this.reflexiveRules) !== null && _this$reflexiveRules3 !== void 0 && _this$reflexiveRules3.length) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", true);

              case 2:
                return _context6.abrupt("return", this.validate(this.reflexiveRules, this.reflexiveRules.reduce(function (obj, reflexive) {
                  var _this2$formState$widg;

                  var widgetIdByCode = _this2.formState.widgetCodeToIdMap[reflexive.fact]; // TODO: what if I want to be more generic
                  // and run rule by any param in widgetState and data

                  // TODO: what if I want to be more generic
                  // and run rule by any param in widgetState and data
                  var response = (_this2$formState$widg = _this2.formState.widgetState[widgetIdByCode]) === null || _this2$formState$widg === void 0 ? void 0 : _this2$formState$widg.response;
                  obj[reflexive.fact] = response;
                  return obj;
                }, {})));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function isReflexive() {
        return _isReflexive.apply(this, arguments);
      }

      return isReflexive;
    }()
  }, {
    key: "setState",
    value: function setState(key, value) {
      var state = this._getFormState();

      state.setWidgetState(this.id, key, value); // FIXME: hack to trigger re-render

      this._setFormState(this.formState);
    }
  }, {
    key: "getState",
    value: function getState(key) {
      var state = this._getFormState();

      return state.getWidgetState(this.id, key);
    }
  }, {
    key: "getParentIds",
    value: function getParentIds() {
      return WidgetItem.getParentIds(this.id, this._widgetItems);
    }
  }, {
    key: "getParents",
    value: function getParents() {
      var _this3 = this;

      return this.getParentIds().map(function (pId) {
        return _this3._widgetItems[pId];
      });
    }
  }, {
    key: "getParent",
    value: function getParent() {
      return this._widgetItems[this.parentId || ""] || null;
    }
  }, {
    key: "getChildrenIds",
    value: function getChildrenIds(_opts, _meta) {
      // this can be used if overridden in widget control
      return [];
    }
  }, {
    key: "getChildren",
    value: function getChildren(opts, meta) {
      var _this4 = this;

      return this.getChildrenIds(opts, meta).map(function (c) {
        return _this4._widgetItems[c];
      });
    }
  }, {
    key: "addChild",
    value: function addChild(childWidget, _meta) {
      // to be overridden to handle adding to this widget as well
      childWidget.parent = this.id;
    }
  }, {
    key: "removeChild",
    value: function removeChild(childWidget) {
      // to be overridden to handle removing in this widget
      childWidget.parent = undefined;
    }
  }], [{
    key: "getParentIds",
    value: function getParentIds(widgetId, widgetItems) {
      var widget = widgetItems[widgetId];
      if (!(widget !== null && widget !== void 0 && widget.parentId)) return [];
      return [widget.parentId].concat(_toConsumableArray(WidgetItem.getParentIds(widget.parentId, widgetItems) || []));
    }
  }]);

  return WidgetItem;
}();var PagesWidgetItem = /*#__PURE__*/function (_WidgetItem) {
  _inherits(PagesWidgetItem, _WidgetItem);

  var _super = _createSuper(PagesWidgetItem);

  function PagesWidgetItem(opts) {
    _classCallCheck(this, PagesWidgetItem);

    return _super.call(this, opts);
  }

  _createClass(PagesWidgetItem, [{
    key: "getSortedPages",
    value: function getSortedPages() {
      // FIXME: should be sorted, but this creates loop in UI
      return this.properties.pages; // return this.properties.pages.sort((a, b) => (a.idx || 0) - (b.idx || 0));
    }
  }, {
    key: "isWidgetIdInWidgetIds",
    value: function isWidgetIdInWidgetIds(widgetId, inWidgetIds) {
      var _this = this;

      return inWidgetIds.some(function (wId) {
        return wId === widgetId || _this.isWidgetIdInWidgetIds(widgetId, _this._widgetItems[wId].getChildrenIds());
      });
    }
  }, {
    key: "getChildIndexByWidgetId",
    value: function getChildIndexByWidgetId(widgetId) {
      var _this2 = this;

      return this.getSortedPages().findIndex(function (page) {
        return _this2.isWidgetIdInWidgetIds(widgetId, page.children);
      });
    }
  }, {
    key: "getChildrenIds",
    value: function getChildrenIds(opts, meta) {
      var _this3 = this;

      return this.getSortedPages().filter(function (p, pIndex) {
        var _meta$inPageIndices;

        if (meta !== null && meta !== void 0 && (_meta$inPageIndices = meta.inPageIndices) !== null && _meta$inPageIndices !== void 0 && _meta$inPageIndices.length) {
          return meta.inPageIndices.includes(pIndex);
        } else if (meta !== null && meta !== void 0 && meta.currentPageIndexOnly) {
          return pIndex === _this3.currentPageIndex;
        }

        return p;
      }).reduce(function (arr, page) {
        return [].concat(_toConsumableArray(arr), _toConsumableArray(page.children), _toConsumableArray(opts !== null && opts !== void 0 && opts.deep ? page.children.reduce(function (childArr, childId) {
          return [].concat(_toConsumableArray(childArr), _toConsumableArray(_this3._widgetItems[childId].getChildrenIds(opts, meta)));
        }, []) : []));
      }, []);
    }
  }, {
    key: "setChildErrors",
    value: function setChildErrors(childWidgetId, errors) {
      // run original function to store the general state
      _get(_getPrototypeOf(PagesWidgetItem.prototype), "setChildErrors", this).call(this, childWidgetId, errors); // also store widget errors by children index
      // get current page index errors object from state


      var pageIndexErrors = this.getState("pageIdxErrors") || {}; // find which index this childWidget belongs to

      var childIndex = this.getChildIndexByWidgetId(childWidgetId);

      if (childIndex === -1) {
        throw new Error("child widget not in paging");
      }

      if (!errors) {
        var _pageIndexErrors$chil;

        (_pageIndexErrors$chil = pageIndexErrors[childIndex]) === null || _pageIndexErrors$chil === void 0 ? true : delete _pageIndexErrors$chil[childWidgetId];
        if (!Object.keys(pageIndexErrors[childIndex]).length) delete pageIndexErrors[childIndex];
      } else {
        if (!pageIndexErrors[childIndex]) {
          pageIndexErrors[childIndex] = {};
        }

        pageIndexErrors[childIndex][childWidgetId] = errors;
      } // save pageIdxErrors to state


      this.setState("pageIdxErrors", Object.keys(pageIndexErrors).length ? pageIndexErrors : undefined);
    }
  }, {
    key: "addChild",
    value: function addChild(childWidget, meta) {
      _get(_getPrototypeOf(PagesWidgetItem.prototype), "addChild", this).call(this, childWidget, meta);

      this._widget.properties.pages[(meta === null || meta === void 0 ? void 0 : meta.pageIdx) || 0].children.splice((meta === null || meta === void 0 ? void 0 : meta.childIdx) || 0, 0, childWidget.id);
    }
  }, {
    key: "removeChild",
    value: function removeChild(childWidget) {
      _get(_getPrototypeOf(PagesWidgetItem.prototype), "removeChild", this).call(this, childWidget);

      this._widget.properties.pages.forEach(function (page) {
        page.children = page.children.filter(function (c) {
          return c !== childWidget.id;
        });
      });
    }
  }, {
    key: "onChangePageIndex",
    value: function onChangePageIndex(toIndex) {
      var sortedPages = this.getSortedPages();
      if (toIndex < 0) return;
      if (toIndex > sortedPages.length - 1) return;
      this.setState("currentPageIndex", toIndex);
    }
  }, {
    key: "currentPageIndex",
    get: function get() {
      return this.getState("currentPageIndex") || 0;
    }
  }, {
    key: "getParentPagesWidgets",
    value: function getParentPagesWidgets(opts) {
      var parentPages = this.getParents().filter(function (w) {
        return w.type === "pages";
      });
      return opts !== null && opts !== void 0 && opts.first ? parentPages[0] : parentPages;
    }
  }, {
    key: "getChildrenPagesWidgets",
    value: function getChildrenPagesWidgets(opts) {
      var childrenPages = this.getChildren({
        deep: true
      }, {
        inPageIndices: opts === null || opts === void 0 ? void 0 : opts.inPageIndices
      }).filter(function (w) {
        return w.type === "pages";
      });
      return opts !== null && opts !== void 0 && opts.first ? childrenPages[0] : childrenPages;
    }
  }, {
    key: "pageIndexHasErrors",
    value: function pageIndexHasErrors(idx, opts) {
      var pageIdxErrors = this.getState("pageIdxErrors") || {}; // if no pageIdxErrors, just return false

      if (!Object.keys(pageIdxErrors).length) return false; // if current index doesn't have issues, that means
      // neither this page idx nor its children have any
      // errors, so just return false

      if (!Object.keys(pageIdxErrors[idx] || {}).length) return false; // if navigation integrate children pages, then check if
      // child pages has error in its CURRENT page idx

      var childPagesWidget = this.properties.navigationIntegrateChildrenPages ? this.getChildrenPagesWidgets({
        first: true,
        inPageIndices: [this.currentPageIndex]
      }) : null;

      if (childPagesWidget && !(childPagesWidget !== null && childPagesWidget !== void 0 && childPagesWidget.properties.detachParentIntegration) && (childPagesWidget === null || childPagesWidget === void 0 ? void 0 : childPagesWidget.nextButtonType()) !== "none") {
        return opts !== null && opts !== void 0 && opts.allChildPages ? childPagesWidget.hasChildErrors() : childPagesWidget.currentPageIndexHasErrors();
      } // since don't need to handle child pages widget and
      // current page idx has errors, return true


      return true;
    }
  }, {
    key: "currentPageIndexHasErrors",
    value: function currentPageIndexHasErrors() {
      return this.pageIndexHasErrors(this.currentPageIndex);
    }
  }, {
    key: "toNextPage",
    value: function () {
      var _toNextPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var children, hasErrors, nextType, childPagesWidget;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                children = this.getChildren({
                  deep: true
                }, {
                  currentPageIndexOnly: true
                });
                _context2.next = 3;
                return Promise.all(children.map( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(child) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            return _context.abrupt("return", child.runValidations());

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 3:
                hasErrors = _context2.sent.some(function (err) {
                  return err;
                });

                if (hasErrors) {
                  _context2.next = 15;
                  break;
                }

                // update current pages or, if
                // navigationIntegrateParentPage is true,
                // update parent's instead
                // get next type first to determine which to update
                nextType = this.nextButtonType();

                if (!(nextType === "complete")) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 15;
                break;

              case 9:
                if (!(nextType === "none")) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return");

              case 13:
                // current pages at end, so update parent's
                childPagesWidget = this.properties.navigationIntegrateChildrenPages ? this.getChildrenPagesWidgets({
                  first: true,
                  inPageIndices: [this.currentPageIndex]
                }) : null;

                if (childPagesWidget && !(childPagesWidget !== null && childPagesWidget !== void 0 && childPagesWidget.properties.detachParentIntegration) && (childPagesWidget === null || childPagesWidget === void 0 ? void 0 : childPagesWidget.nextButtonType()) !== "none") {
                  childPagesWidget.toNextPage();
                } else {
                  this.onChangePageIndex(this.currentPageIndex + 1);
                }

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function toNextPage() {
        return _toNextPage.apply(this, arguments);
      }

      return toNextPage;
    }()
  }, {
    key: "toPreviousPage",
    value: function toPreviousPage() {
      // get previous type first to determine which to update
      var previousType = this.previousButtonType();

      if (previousType === "none") {
        // wasn't suppose to be clicked, so just ignore
        return;
      }

      var childPagesWidget = this.properties.navigationIntegrateChildrenPages ? this.getChildrenPagesWidgets({
        first: true,
        inPageIndices: [this.currentPageIndex]
      }) : null;

      if (childPagesWidget && !(childPagesWidget !== null && childPagesWidget !== void 0 && childPagesWidget.properties.detachParentIntegration) && (childPagesWidget === null || childPagesWidget === void 0 ? void 0 : childPagesWidget.previousButtonType()) !== "none") {
        childPagesWidget.toPreviousPage();
      } else {
        this.onChangePageIndex(this.currentPageIndex - 1);
      }
    }
  }, {
    key: "previousButtonType",
    value: function previousButtonType() {
      // check whether this pages widget is at its end
      var isCurrentPageAtEnd = this.currentPageIndex <= 0; // check if there is any parents. Just get the immediate one

      var childPages = this.getChildrenPagesWidgets({
        first: true
      }); // if we don't need to integrate with parent pages or
      // current pages is not at its end yet, just return
      // based on current pages' state

      if (!this.properties.navigationIntegrateChildrenPages || !childPages || childPages.properties.detachParentIntegration || !isCurrentPageAtEnd) {
        if (isCurrentPageAtEnd) {
          return "none";
        }

        return "previous";
      } // return whether parent should be at its end


      return childPages.previousButtonType();
    }
  }, {
    key: "nextButtonType",
    value: function nextButtonType() {
      // check whether this pages widget is at its end
      var isCurrentPageAtEnd = this.currentPageIndex >= this._widget.properties.pages.length - 1; // check if there is any parents. Just get the immediate one

      var childPages = this.properties.navigationIntegrateChildrenPages ? this.getChildrenPagesWidgets({
        first: true
      }) : null; // if we don't need to integrate with parent pages or
      // current pages is not at its end yet, just return
      // based on current pages' state

      if (!this.properties.navigationIntegrateChildrenPages || !childPages || childPages.properties.detachParentIntegration || !isCurrentPageAtEnd) {
        if (isCurrentPageAtEnd) {
          return this.properties.hasCompleteButton ? "complete" : "none";
        }

        return "next";
      } // return whether parent should be at its end


      return childPages.nextButtonType();
    }
  }, {
    key: "hasPreviousButton",
    value: function hasPreviousButton() {
      return !!this.properties.navigationVisible && this.previousButtonType() !== "none";
    }
  }, {
    key: "hasNextButton",
    value: function hasNextButton() {
      return !!this.properties.navigationVisible && this.nextButtonType() !== "none";
    }
  }]);

  return PagesWidgetItem;
}(WidgetItem);var pages = {
  display: Display$6,
  form: Form$6,
  readOnly: ReadOnly$6,
  widgetItem: PagesWidgetItem
};// import { validateWidget } from "../../validateUtils";

var script$i = defineComponent({
  props: {
    widget: Object,
    widgetControls: Object,
    widgetItems: Object,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String
  },
  inject: ["t", "questionControls", "widgetControls", "getFormState", "setFormState"],
  created: function created() {
    var widgetState = _objectSpread2({}, this.$props.widget.getState());

    this.widget.setState("type", "question");

    if ((widgetState === null || widgetState === void 0 ? void 0 : widgetState.touched) === undefined) {
      this.widget.setState("touched", false);
      this.widget.setState("pristine", true);
      this.widget.setState("dirty", false);
    }
  },
  unmounted: function unmounted() {},
  computed: {
    formState: function formState() {
      return this.getFormState();
    }
  },
  methods: {
    onChange: function onChange(response, ignoreChecks) {
      var _this = this;

      this.widget.setState("response", response);
      if (ignoreChecks) return;
      this.widget.setState("touched", true);
      this.widget.setState("pristine", false);
      this.widget.setState("dirty", true);

      _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var widgetIdsToHandleReflexives;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.$props.widget.runValidations();

              case 2:
                // handle reflexives
                widgetIdsToHandleReflexives = _this.formState.getReflexWidgetIdsByCode(_this.$props.widget.code);
                _context2.next = 5;
                return Promise.all(widgetIdsToHandleReflexives.map( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(widgetId) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            return _context.abrupt("return", _this.$props.widgetItems[widgetId].runReflexives());

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  }
});/* script */
var __vue_script__$i = script$i;
/* template */

var __vue_render__$i = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !_vm.widget.getState('reflexiveHide') ? _c('div', [_vm._ssrNode("<div class=\"question-wrapper\" data-v-72d55c0a>", "</div>", [_vm._ssrNode((!_vm.widget.properties.hideLabel ? "<label" + _vm._ssrAttr("for", _vm.widget.code || _vm.widget.id) + " data-v-72d55c0a>" + _vm._ssrEscape(_vm._s(_vm.t("__label", _vm.widget.id))) + "</label>" : "<!---->") + " "), _vm._ssrNode("<div data-v-72d55c0a>", "</div>", [_c(_vm.questionControls[_vm.widget.properties.control].display, {
    tag: "component",
    attrs: {
      "properties": _vm.widget.properties.controlProperties,
      "widget": _vm.widget,
      "onChange": _vm.onChange,
      "value": _vm.widget.getState('response'),
      "setWidgetState": _vm.setWidgetState,
      "getWidgetState": _vm.getWidgetState,
      "view": _vm.view,
      "t": _vm.t
    }
  }), _vm._ssrNode(" " + _vm._ssrList(_vm.getWidgetState('errors'), function (errorKey) {
    return "<span class=\"error\" data-v-72d55c0a>" + _vm._ssrEscape(_vm._s(_vm.t(errorKey, _vm.widget.id))) + "</span>";
  }))], 2)], 2)]) : _vm._e();
};

var __vue_staticRenderFns__$i = [];
/* style */

var __vue_inject_styles__$i = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-72d55c0a_0", {
    source: ".question-wrapper[data-v-72d55c0a]{width:100%;display:flex;flex-direction:row}.question-wrapper>label[data-v-72d55c0a]{flex:1;max-width:300px;border-right:1px solid #393939;padding:20px 0;margin-right:20px}.question-wrapper>div[data-v-72d55c0a]{flex:2;padding:20px 0}.error[data-v-72d55c0a]{display:block;color:red;margin-top:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$i = "data-v-72d55c0a";
/* module identifier */

var __vue_module_identifier__$i = "data-v-72d55c0a";
/* functional template */

var __vue_is_functional_template__$i = false;
/* style inject shadow dom */

var __vue_component__$j = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, false, undefined, createInjectorSSR, undefined);

var Display$5 = __vue_component__$j;//
var script$h = defineComponent({
  props: {
    widget: Object,
    widgetControls: Object,
    widgetItems: Object,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String
  },
  inject: ["t", "questionControls"],
  setup: function setup() {},
  methods: {
    onChange: function onChange(response) {
      this.setWidgetState("response", response);
    }
  }
});/* script */
var __vue_script__$h = script$h;
/* template */

var __vue_render__$h = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<div class=\"question-wrapper\" data-v-4de99166>", "</div>", [_vm._ssrNode("<label data-v-4de99166>" + _vm._ssrEscape(_vm._s(_vm.t("__label", _vm.widget.id))) + "</label> "), _vm._ssrNode("<div data-v-4de99166>", "</div>", [_c(_vm.questionControls[_vm.widget.properties.control].form, {
    tag: "component",
    attrs: {
      "properties": _vm.widget.properties.controlProperties,
      "widget": _vm.widget,
      "onChange": _vm.onChange,
      "value": _vm.getWidgetState('response'),
      "setWidgetState": _vm.setWidgetState,
      "getWidgetState": _vm.getWidgetState,
      "view": _vm.view
    }
  })], 1)], 2)]);
};

var __vue_staticRenderFns__$h = [];
/* style */

var __vue_inject_styles__$h = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-4de99166_0", {
    source: ".question-wrapper[data-v-4de99166]{width:100%;display:flex;flex-direction:row;padding:10px 10px}.question-wrapper>label[data-v-4de99166]{flex:1;border-right:1px solid #393939}.question-wrapper>div[data-v-4de99166]{flex:2;padding-left:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$h = "data-v-4de99166";
/* module identifier */

var __vue_module_identifier__$h = "data-v-4de99166";
/* functional template */

var __vue_is_functional_template__$h = false;
/* style inject shadow dom */

var __vue_component__$i = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, false, undefined, createInjectorSSR, undefined);

var Form$5 = __vue_component__$i;//
var script$g = defineComponent({
  props: {
    widget: Object,
    widgetControls: Object,
    widgetItems: Object,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String
  },
  inject: ["t", "questionControls", "widgetControls", "getFormState", "setFormState"],
  created: function created() {},
  unmounted: function unmounted() {},
  computed: {
    formState: function formState() {
      return this.getFormState();
    }
  },
  methods: {
    onChange: function onChange(response) {
      this.setWidgetState("response", response);
    }
  }
});/* script */
var __vue_script__$g = script$g;
/* template */

var __vue_render__$g = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !_vm.getWidgetState('reflexiveHide') ? _c('div', [_vm._ssrNode("<div class=\"question-wrapper\" data-v-42b234d1>", "</div>", [_vm._ssrNode((!_vm.widget.properties.hideLabel ? "<label data-v-42b234d1>" + _vm._ssrEscape(_vm._s(_vm.t("__label", _vm.widget.id))) + "</label>" : "<!---->") + " "), _vm._ssrNode("<div data-v-42b234d1>", "</div>", [_c(_vm.questionControls[_vm.widget.properties.control].readOnly, {
    tag: "component",
    attrs: {
      "properties": _vm.widget.properties.controlProperties,
      "widget": _vm.widget,
      "onChange": _vm.onChange,
      "value": _vm.getWidgetState('response'),
      "setWidgetState": _vm.setWidgetState,
      "getWidgetState": _vm.getWidgetState,
      "view": _vm.view,
      "t": _vm.t
    }
  })], 1)], 2)]) : _vm._e();
};

var __vue_staticRenderFns__$g = [];
/* style */

var __vue_inject_styles__$g = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-42b234d1_0", {
    source: ".question-wrapper[data-v-42b234d1]{width:100%;display:flex;flex-direction:row;padding:10px 10px}.question-wrapper>label[data-v-42b234d1]{flex:1;max-width:300px;border-right:1px solid #393939;padding:10px 0}.question-wrapper>div[data-v-42b234d1]{flex:2;padding:10px 20px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$g = "data-v-42b234d1";
/* module identifier */

var __vue_module_identifier__$g = "data-v-42b234d1";
/* functional template */

var __vue_is_functional_template__$g = false;
/* style inject shadow dom */

var __vue_component__$h = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, false, undefined, createInjectorSSR, undefined);

var ReadOnly$5 = __vue_component__$h;var QuestionWidgetItem = /*#__PURE__*/function (_WidgetItem) {
  _inherits(QuestionWidgetItem, _WidgetItem);

  var _super = _createSuper(QuestionWidgetItem);

  function QuestionWidgetItem(opts) {
    _classCallCheck(this, QuestionWidgetItem);

    return _super.call(this, opts);
  }

  _createClass(QuestionWidgetItem, [{
    key: "runValidations",
    value: function () {
      var _runValidations = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var errors, parentIds;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(_getPrototypeOf(QuestionWidgetItem.prototype), "runValidations", this).call(this);

              case 2:
                errors = _context.sent;
                this.setState("valid", !errors);
                this.setState("hasErrors", !!errors);
                parentIds = this.getParentIds();
                (parentIds || []).forEach(function (parentId) {
                  var parentState = _this._widgetItems[parentId].getState();

                  var childErrorsState = (parentState === null || parentState === void 0 ? void 0 : parentState.childErrors) || {};
                  if (!errors && !childErrorsState[_this.id]) return;

                  if (!errors) {
                    delete childErrorsState[_this.id];
                  } else {
                    childErrorsState[_this.id] = errors;
                  } // FIXME: if this widget is reflexive, need
                  // to handle parent's childErrors if not shown


                  _this._widgetItems[parentId].setChildErrors(_this.id, errors);
                });
                return _context.abrupt("return", errors);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function runValidations() {
        return _runValidations.apply(this, arguments);
      }

      return runValidations;
    }()
  }]);

  return QuestionWidgetItem;
}(WidgetItem);var question = {
  display: Display$5,
  form: Form$5,
  readOnly: ReadOnly$5,
  widgetItem: QuestionWidgetItem
};//
var script$f = defineComponent({
  props: {
    widget: Object
  },
  inject: ["t"],
  setup: function setup() {},
  computed: {
    label: function label() {
      return this.t("__label", this.$props.widget.id);
    }
  },
  methods: {
    isShowLabel: function isShowLabel(pos) {
      return this.$props.widget.properties.hasLabel && this.$props.widget.properties.labelPosition === pos;
    }
  }
});/* script */
var __vue_script__$f = script$f;
/* template */

var __vue_render__$f = function __vue_render__() {
  var _obj, _obj$1, _obj$2;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "line-wrapper",
    class: {
      vertical: _vm.widget.properties.dir === 'vertical'
    }
  }, [_vm._ssrNode((_vm.isShowLabel('start') ? "<label" + _vm._ssrClass(null, (_obj = {}, _obj[_vm.widget.properties.labelPosition || 'start'] = true, _obj)) + " data-v-ad924e26>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label>" : "<!---->") + " <div class=\"line\" data-v-ad924e26></div> " + (_vm.isShowLabel('center') ? "<label" + _vm._ssrClass(null, (_obj$1 = {}, _obj$1[_vm.widget.properties.labelPosition || 'start'] = true, _obj$1)) + " data-v-ad924e26>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label>" : "<!---->") + " <div class=\"line\" data-v-ad924e26></div> " + (_vm.isShowLabel('end') ? "<label" + _vm._ssrClass(null, (_obj$2 = {}, _obj$2[_vm.widget.properties.labelPosition || 'start'] = true, _obj$2)) + " data-v-ad924e26>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label>" : "<!---->"))]);
};

var __vue_staticRenderFns__$f = [];
/* style */

var __vue_inject_styles__$f = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-ad924e26_0", {
    source: ".line-wrapper[data-v-ad924e26]{display:flex;flex-direction:row;align-items:center;padding:10px 0}.line-wrapper.vertical[data-v-ad924e26]{flex-direction:column}.line-wrapper .line[data-v-ad924e26]{flex:1;background-color:#a0a0a0;height:1px}.line-wrapper.vertical .line[data-v-ad924e26]{width:1px}.line-wrapper label[data-v-ad924e26]{padding:10px;background-color:rgba(255,255,255,.5);border-radius:10px}.line-wrapper label.start[data-v-ad924e26]{padding-left:0}.line-wrapper label.end[data-v-ad924e26]{padding-right:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$f = "data-v-ad924e26";
/* module identifier */

var __vue_module_identifier__$f = "data-v-ad924e26";
/* functional template */

var __vue_is_functional_template__$f = false;
/* style inject shadow dom */

var __vue_component__$g = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, undefined, createInjectorSSR, undefined);

var Display$4 = __vue_component__$g;//
var script$e = defineComponent({
  props: {
    widget: Object
  },
  inject: ["t"],
  setup: function setup() {},
  computed: {
    label: function label() {
      return this.t("__label", this.$props.widget.id);
    }
  },
  methods: {
    isShowLabel: function isShowLabel(pos) {
      return this.$props.widget.properties.hasLabel && this.$props.widget.properties.labelPosition === pos;
    }
  }
});/* script */
var __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function __vue_render__() {
  var _obj, _obj$1, _obj$2;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "line-wrapper",
    class: {
      vertical: _vm.widget.properties.dir === 'vertical'
    }
  }, [_vm._ssrNode((_vm.isShowLabel('start') ? "<label" + _vm._ssrClass(null, (_obj = {}, _obj[_vm.widget.properties.labelPosition || 'start'] = true, _obj)) + " data-v-28956a53>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label>" : "<!---->") + " <div class=\"line\" data-v-28956a53></div> " + (_vm.isShowLabel('center') ? "<label" + _vm._ssrClass(null, (_obj$1 = {}, _obj$1[_vm.widget.properties.labelPosition || 'start'] = true, _obj$1)) + " data-v-28956a53>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label>" : "<!---->") + " <div class=\"line\" data-v-28956a53></div> " + (_vm.isShowLabel('end') ? "<label" + _vm._ssrClass(null, (_obj$2 = {}, _obj$2[_vm.widget.properties.labelPosition || 'start'] = true, _obj$2)) + " data-v-28956a53>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label>" : "<!---->"))]);
};

var __vue_staticRenderFns__$e = [];
/* style */

var __vue_inject_styles__$e = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-28956a53_0", {
    source: ".line-wrapper[data-v-28956a53]{display:flex;flex-direction:row;align-items:center;padding:10px}.line-wrapper.vertical[data-v-28956a53]{flex-direction:column}.line-wrapper .line[data-v-28956a53]{flex:1;background-color:#a0a0a0;height:1px}.line-wrapper.vertical .line[data-v-28956a53]{width:1px}.line-wrapper label[data-v-28956a53]{padding:10px;background-color:rgba(255,255,255,.5);border-radius:10px}.line-wrapper label.start[data-v-28956a53]{padding-left:0}.line-wrapper label.end[data-v-28956a53]{padding-right:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$e = "data-v-28956a53";
/* module identifier */

var __vue_module_identifier__$e = "data-v-28956a53";
/* functional template */

var __vue_is_functional_template__$e = false;
/* style inject shadow dom */

var __vue_component__$f = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, undefined, createInjectorSSR, undefined);

var Form$4 = __vue_component__$f;//
var script$d = defineComponent({
  props: {
    widget: Object
  },
  inject: ["t"],
  setup: function setup() {},
  computed: {
    label: function label() {
      return this.t("__label", this.$props.widget.id);
    }
  },
  methods: {
    isShowLabel: function isShowLabel(pos) {
      return this.$props.widget.properties.hasLabel && this.$props.widget.properties.labelPosition === pos;
    }
  }
});/* script */
var __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function __vue_render__() {
  var _obj, _obj$1, _obj$2;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "line-wrapper",
    class: {
      vertical: _vm.widget.properties.dir === 'vertical'
    }
  }, [_vm._ssrNode((_vm.isShowLabel('start') ? "<label" + _vm._ssrClass(null, (_obj = {}, _obj[_vm.widget.properties.labelPosition || 'start'] = true, _obj)) + " data-v-655c6171>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label>" : "<!---->") + " <div class=\"line\" data-v-655c6171></div> " + (_vm.isShowLabel('center') ? "<label" + _vm._ssrClass(null, (_obj$1 = {}, _obj$1[_vm.widget.properties.labelPosition || 'start'] = true, _obj$1)) + " data-v-655c6171>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label>" : "<!---->") + " <div class=\"line\" data-v-655c6171></div> " + (_vm.isShowLabel('end') ? "<label" + _vm._ssrClass(null, (_obj$2 = {}, _obj$2[_vm.widget.properties.labelPosition || 'start'] = true, _obj$2)) + " data-v-655c6171>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label>" : "<!---->"))]);
};

var __vue_staticRenderFns__$d = [];
/* style */

var __vue_inject_styles__$d = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-655c6171_0", {
    source: ".line-wrapper[data-v-655c6171]{display:flex;flex-direction:row;align-items:center;padding:10px}.line-wrapper.vertical[data-v-655c6171]{flex-direction:column}.line-wrapper .line[data-v-655c6171]{flex:1;background-color:#a0a0a0;height:1px}.line-wrapper.vertical .line[data-v-655c6171]{width:1px}.line-wrapper label[data-v-655c6171]{padding:10px;background-color:rgba(255,255,255,.5);border-radius:10px}.line-wrapper label.start[data-v-655c6171]{padding-left:0}.line-wrapper label.end[data-v-655c6171]{padding-right:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$d = "data-v-655c6171";
/* module identifier */

var __vue_module_identifier__$d = "data-v-655c6171";
/* functional template */

var __vue_is_functional_template__$d = false;
/* style inject shadow dom */

var __vue_component__$e = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, createInjectorSSR, undefined);

var ReadOnly$4 = __vue_component__$e;var separator = {
  display: Display$4,
  form: Form$4,
  readOnly: ReadOnly$4
};var SectionWidgetItem = /*#__PURE__*/function (_WidgetItem) {
  _inherits(SectionWidgetItem, _WidgetItem);

  var _super = _createSuper(SectionWidgetItem);

  function SectionWidgetItem(opts) {
    _classCallCheck(this, SectionWidgetItem);

    return _super.call(this, opts);
  }

  _createClass(SectionWidgetItem, [{
    key: "getChildrenIds",
    value: function getChildrenIds() {
      return this.properties.children;
    }
  }, {
    key: "addChild",
    value: function addChild(childWidget, meta) {
      _get(_getPrototypeOf(SectionWidgetItem.prototype), "addChild", this).call(this, childWidget, meta);

      this._widget.properties.children.splice((meta === null || meta === void 0 ? void 0 : meta.idx) || 0, 0, childWidget.id);
    }
  }, {
    key: "removeChild",
    value: function removeChild(childWidget) {
      _get(_getPrototypeOf(SectionWidgetItem.prototype), "removeChild", this).call(this, childWidget);

      var removeIdx = this._widget.properties.children.findIndex(function (c) {
        return c === childWidget.id;
      });

      if (removeIdx > -1) this._widget.properties.children.splice(removeIdx, 1);
    }
  }]);

  return SectionWidgetItem;
}(WidgetItem);//
var script$c = defineComponent({
  components: {
    WidgetsLayout: WidgetsLayout
  },
  props: {
    widget: WidgetItem,
    widgetItems: Object,
    widgetControls: Object
  },
  inject: ["t"],
  setup: function setup() {},
  computed: {
    label: function label() {
      return this.t("__label", this.$props.widget.id);
    },
    childErrors: function childErrors() {
      var _this$$props$widget$g;

      return (_this$$props$widget$g = this.$props.widget.getState()) === null || _this$$props$widget$g === void 0 ? void 0 : _this$$props$widget$g.childErrors;
    },
    hasChildErrors: function hasChildErrors() {
      return this.$props.widget.hasChildErrors();
    }
  },
  methods: {
    isShowLabel: function isShowLabel(pos) {
      return this.$props.widget.properties.hasLabel && this.$props.widget.properties.labelPosition === pos;
    }
  }
});/* script */
var __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('section', {
    staticClass: "section-wrapper",
    class: {
      errors: _vm.hasChildErrors
    }
  }, [_vm._ssrNode((!!_vm.label ? "<label data-v-7a4f949e>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label>" : "<!---->") + " "), _c('widgets-layout', {
    attrs: {
      "widgetControls": _vm.widgetControls,
      "widgetItems": _vm.widgetItems,
      "forParent": _vm.widget.id
    }
  })], 2);
};

var __vue_staticRenderFns__$c = [];
/* style */

var __vue_inject_styles__$c = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-7a4f949e_0", {
    source: ".section-wrapper[data-v-7a4f949e]{position:relative;border:1px solid #a9a9a9;min-height:30px;padding:10px;margin:10px 0;border-radius:8px}.section-wrapper>label[data-v-7a4f949e]{position:absolute;top:0;left:10px;transform:translateY(-50%);background-color:#fff;padding:10px}.section-wrapper.errors[data-v-7a4f949e]{border-color:red}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$c = "data-v-7a4f949e";
/* module identifier */

var __vue_module_identifier__$c = "data-v-7a4f949e";
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject shadow dom */

var __vue_component__$d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, createInjectorSSR, undefined);

var Display$3 = __vue_component__$d;//
var script$b = defineComponent({
  components: {
    WidgetsLayout: WidgetsLayout
  },
  props: {
    widget: Object,
    widgetItems: Object,
    widgetControls: Object
  },
  inject: ["t"],
  setup: function setup() {},
  computed: {
    label: function label() {
      return this.t("__label", this.$props.widget.id);
    }
  },
  methods: {
    isShowLabel: function isShowLabel(pos) {
      return this.$props.widget.properties.hasLabel && this.$props.widget.properties.labelPosition === pos;
    }
  }
});/* script */
var __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('section', {
    staticClass: "section-wrapper"
  }, [_vm._ssrNode((!!_vm.label ? "<label data-v-e0fb7cf6>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label>" : "<!---->") + " "), _c('widgets-layout', {
    attrs: {
      "widgetControls": _vm.widgetControls,
      "widgetItems": _vm.widgetItems,
      "forParent": _vm.widget.id
    }
  })], 2);
};

var __vue_staticRenderFns__$b = [];
/* style */

var __vue_inject_styles__$b = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-e0fb7cf6_0", {
    source: ".section-wrapper[data-v-e0fb7cf6]{position:relative;border:1px solid #a9a9a9;min-height:30px;padding:10px;margin:10px;border-radius:8px}.section-wrapper>label[data-v-e0fb7cf6]{position:absolute;top:0;left:10px;transform:translateY(-50%);background-color:#fff;padding:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$b = "data-v-e0fb7cf6";
/* module identifier */

var __vue_module_identifier__$b = "data-v-e0fb7cf6";
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject shadow dom */

var __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, createInjectorSSR, undefined);

var Form$3 = __vue_component__$c;//
var script$a = defineComponent({
  components: {
    WidgetsLayout: WidgetsLayout
  },
  props: {
    widget: Object,
    widgetItems: Object,
    widgetControls: Object
  },
  inject: ["t"],
  setup: function setup() {},
  computed: {
    label: function label() {
      return this.t("__label", this.$props.widget.id);
    }
  },
  methods: {
    isShowLabel: function isShowLabel(pos) {
      return this.$props.widget.properties.hasLabel && this.$props.widget.properties.labelPosition === pos;
    }
  }
});/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('section', {
    staticClass: "section-wrapper"
  }, [_vm._ssrNode((!!_vm.label ? "<label data-v-4bf662ba>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</label>" : "<!---->") + " "), _c('widgets-layout', {
    attrs: {
      "widgetControls": _vm.widgetControls,
      "widgetItems": _vm.widgetItems,
      "forParent": _vm.widget.id
    }
  })], 2);
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$a = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-4bf662ba_0", {
    source: ".section-wrapper[data-v-4bf662ba]{position:relative;border:1px solid #a9a9a9;min-height:30px;padding:10px;margin:10px;border-radius:8px}.section-wrapper>label[data-v-4bf662ba]{position:absolute;top:0;left:10px;transform:translateY(-50%);background-color:#fff;padding:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$a = "data-v-4bf662ba";
/* module identifier */

var __vue_module_identifier__$a = "data-v-4bf662ba";
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject shadow dom */

var __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, createInjectorSSR, undefined);

var ReadOnly$3 = __vue_component__$b;var section = {
  display: Display$3,
  form: Form$3,
  readOnly: ReadOnly$3,
  widgetItem: SectionWidgetItem
};//
var script$9 = defineComponent({
  props: {
    widget: Object
  },
  inject: ["t"]
});/* script */
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.widget.properties.tagType, {
    tag: "component",
    staticClass: "header"
  }, [_vm._v(_vm._s(_vm.t("__label", _vm.widget.id)))]);
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = "data-v-efd0e968";
/* module identifier */

var __vue_module_identifier__$9 = "data-v-efd0e968";
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

var Display$2 = __vue_component__$a;//
var script$8 = defineComponent({
  props: {
    widget: Object
  },
  inject: ["t"]
});/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.widget.properties.tagType, {
    tag: "component",
    staticClass: "header"
  }, [_vm._v(_vm._s(_vm.t("__label", _vm.widget.id)))]);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-7ba8f767_0", {
    source: ".header[data-v-7ba8f767]{padding:0 10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$8 = "data-v-7ba8f767";
/* module identifier */

var __vue_module_identifier__$8 = "data-v-7ba8f767";
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject shadow dom */

var __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, createInjectorSSR, undefined);

var Form$2 = __vue_component__$9;//
var script$7 = defineComponent({
  props: {
    widget: Object
  },
  inject: ["t"]
});/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.widget.properties.tagType, {
    tag: "component",
    staticClass: "header"
  }, [_vm._v(_vm._s(_vm.t("__label", _vm.widget.id)))]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-4d6ef985_0", {
    source: ".header[data-v-4d6ef985]{padding:0 10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$7 = "data-v-4d6ef985";
/* module identifier */

var __vue_module_identifier__$7 = "data-v-4d6ef985";
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject shadow dom */

var __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, createInjectorSSR, undefined);

var ReadOnly$2 = __vue_component__$8;var header = {
  display: Display$2,
  form: Form$2,
  readOnly: ReadOnly$2
};var script$6 = defineComponent({
  props: {
    widget: Object
  },
  inject: ["t"],
  data: function data() {
    return {
      isOpen: true
    };
  },
  methods: {
    onCloseAlert: function onCloseAlert() {
      this.$data.isOpen = false;
    }
  },
  computed: {
    alertStyles: function alertStyles() {
      if (this.widget.properties.type !== "custom" || this.widget.properties.customColor) return {};
      return _objectSpread2({
        backgroundColor: this.widget.properties.customBackgroundColor,
        borderColor: this.widget.properties.customBorderColor || "transparent"
      }, this.widget.properties.customTextColor ? {
        color: this.widget.properties.customTextColor
      } : {});
    }
  }
});/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _obj;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.isOpen ? _c('div', {
    staticClass: "alert",
    class: (_obj = {}, _obj[_vm.widget.properties.type] = true, _obj),
    style: _vm.alertStyles
  }, [_vm._ssrNode("<h3 class=\"title\" data-v-6fdc1ae4>" + _vm._ssrEscape(_vm._s(_vm.t("__title", _vm.widget.id))) + "</h3> <p data-v-6fdc1ae4>" + _vm._ssrEscape(_vm._s(_vm.t("__text", _vm.widget.id))) + "</p> " + (_vm.widget.properties.showCloseBtn ? "<a class=\"close-button\" data-v-6fdc1ae4>x</a>" : "<!---->"))]) : _vm._e();
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-6fdc1ae4_0", {
    source: ".alert[data-v-6fdc1ae4]{padding:18px 18px;margin:10px 0;border-radius:10px;background-color:#f4f6f8;border:1px solid #e5e9ed;position:relative}.alert.success[data-v-6fdc1ae4]{background-color:#ebf7ee;border-color:#e2f1e7}.alert.info[data-v-6fdc1ae4]{background-color:#e6f0f8;border-color:#cad9e7}.alert.danger[data-v-6fdc1ae4]{background-color:#fdede9;border-color:#f2e1dd}.alert.warning[data-v-6fdc1ae4]{background-color:#fef8ea;border-color:#f4eada}.alert .title[data-v-6fdc1ae4]{margin:0 0 10px 0;font-weight:700}.alert>.close-button[data-v-6fdc1ae4]{position:absolute;top:0;right:0;padding:18px 18px;cursor:pointer;transform:scaleX(1.2)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$6 = "data-v-6fdc1ae4";
/* module identifier */

var __vue_module_identifier__$6 = "data-v-6fdc1ae4";
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject shadow dom */

var __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, createInjectorSSR, undefined);

var Display$1 = __vue_component__$7;var script$5 = defineComponent({
  props: {
    widget: Object
  },
  inject: ["t"],
  data: function data() {
    return {
      isOpen: true
    };
  },
  methods: {
    onCloseAlert: function onCloseAlert() {
      this.$data.isOpen = false;
    }
  },
  computed: {
    alertStyles: function alertStyles() {
      if (this.widget.properties.type !== "custom" || this.widget.properties.customColor) return {};
      return _objectSpread2({
        backgroundColor: this.widget.properties.customBackgroundColor,
        borderColor: this.widget.properties.customBorderColor || "transparent"
      }, this.widget.properties.customTextColor ? {
        color: this.widget.properties.customTextColor
      } : {});
    }
  }
});/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _obj;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.isOpen ? _c('div', {
    staticClass: "alert",
    class: (_obj = {}, _obj[_vm.widget.properties.type] = true, _obj),
    style: _vm.alertStyles
  }, [_vm._ssrNode("<h3 data-v-41152049>" + _vm._ssrEscape(_vm._s(_vm.t("__title", _vm.widget.id))) + "</h3> <p data-v-41152049>" + _vm._ssrEscape(_vm._s(_vm.t("__text", _vm.widget.id))) + "</p> " + (_vm.widget.properties.showCloseBtn ? "<a class=\"close-button\" data-v-41152049>x</a>" : "<!---->"))]) : _vm._e();
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-41152049_0", {
    source: ".alert[data-v-41152049]{padding:10px;margin:10px;border-radius:10px;background-color:#f4f6f8;border:1px solid #e5e9ed;position:relative}.alert.success[data-v-41152049]{background-color:#ebf7ee;border-color:#e2f1e7}.alert.info[data-v-41152049]{background-color:#e6f0f8;border-color:#cad9e7}.alert.danger[data-v-41152049]{background-color:#fdede9;border-color:#f2e1dd}.alert.warning[data-v-41152049]{background-color:#fef8ea;border-color:#f4eada}.alert>.close-button[data-v-41152049]{position:absolute;top:0;right:0;padding:10px 15px;cursor:pointer;transform:scaleX(1.2)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$5 = "data-v-41152049";
/* module identifier */

var __vue_module_identifier__$5 = "data-v-41152049";
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, createInjectorSSR, undefined);

var Form$1 = __vue_component__$6;var script$4 = defineComponent({
  props: {
    widget: Object
  },
  inject: ["t"],
  data: function data() {
    return {
      isOpen: true
    };
  },
  methods: {
    onCloseAlert: function onCloseAlert() {
      this.$data.isOpen = false;
    }
  },
  computed: {
    alertStyles: function alertStyles() {
      if (this.widget.properties.type !== "custom" || this.widget.properties.customColor) return {};
      return _objectSpread2({
        backgroundColor: this.widget.properties.customBackgroundColor,
        borderColor: this.widget.properties.customBorderColor || "transparent"
      }, this.widget.properties.customTextColor ? {
        color: this.widget.properties.customTextColor
      } : {});
    }
  }
});/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _obj;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.isOpen ? _c('div', {
    staticClass: "alert",
    class: (_obj = {}, _obj[_vm.widget.properties.type] = true, _obj),
    style: _vm.alertStyles
  }, [_vm._ssrNode("<h3 data-v-fde52432>" + _vm._ssrEscape(_vm._s(_vm.t("__title", _vm.widget.id))) + "</h3> <p data-v-fde52432>" + _vm._ssrEscape(_vm._s(_vm.t("__text", _vm.widget.id))) + "</p> " + (_vm.widget.properties.showCloseBtn ? "<a class=\"close-button\" data-v-fde52432>x</a>" : "<!---->"))]) : _vm._e();
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-fde52432_0", {
    source: ".alert[data-v-fde52432]{padding:10px;margin:10px;border-radius:10px;background-color:#f4f6f8;border:1px solid #e5e9ed;position:relative}.alert.success[data-v-fde52432]{background-color:#ebf7ee;border-color:#e2f1e7}.alert.info[data-v-fde52432]{background-color:#e6f0f8;border-color:#cad9e7}.alert.danger[data-v-fde52432]{background-color:#fdede9;border-color:#f2e1dd}.alert.warning[data-v-fde52432]{background-color:#fef8ea;border-color:#f4eada}.alert>.close-button[data-v-fde52432]{position:absolute;top:0;right:0;padding:10px 15px;cursor:pointer;transform:scaleX(1.2)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$4 = "data-v-fde52432";
/* module identifier */

var __vue_module_identifier__$4 = "data-v-fde52432";
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, createInjectorSSR, undefined);

var ReadOnly$1 = __vue_component__$5;var alert = {
  display: Display$1,
  form: Form$1,
  readOnly: ReadOnly$1
};//
var script$3 = defineComponent({
  props: {
    widget: Object,
    widgets: Object,
    widgetItems: Object,
    formState: Object,
    setWidgetState: Function
  },
  inject: ["t"]
});/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "html-wrapper",
    domProps: {
      "innerHTML": _vm._s(_vm.t('__html', _vm.widget.id))
    }
  }, []);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = "data-v-6fcb9054";
/* module identifier */

var __vue_module_identifier__$3 = "data-v-6fcb9054";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

var Display = __vue_component__$4;//
var script$2 = defineComponent({
  props: {
    widget: Object,
    widgets: Object,
    widgetItems: Object,
    formState: Object,
    setWidgetState: Function
  }
});/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.widget.properties.html)
    }
  }, []);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-2875ed0e";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

var Form = __vue_component__$3;//
var script$1 = defineComponent({
  props: {
    widget: Object,
    widgets: Object,
    widgetItems: Object,
    formState: Object,
    setWidgetState: Function
  }
});/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.widget.properties.html)
    }
  }, []);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-511e0197";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

var ReadOnly = __vue_component__$2;var html = {
  display: Display,
  form: Form,
  readOnly: ReadOnly
};var widgets = {
  alert: alert,
  header: header,
  html: html,
  pages: pages,
  question: question,
  section: section,
  separator: separator
};var FormState = /*#__PURE__*/function () {
  function FormState(_ref) {
    var widgetState = _ref.widgetState,
        widgetCodeToIdMap = _ref.widgetCodeToIdMap,
        reflexCodeToIdsMap = _ref.reflexCodeToIdsMap;

    _classCallCheck(this, FormState);

    this._widgetState = widgetState || {};
    this._widgetCodeToIdMap = widgetCodeToIdMap || {};
    this._reflexCodeToIdsMap = reflexCodeToIdsMap || {};
  }

  _createClass(FormState, [{
    key: "widgetState",
    get: function get() {
      return this._widgetState;
    }
  }, {
    key: "widgetCodeToIdMap",
    get: function get() {
      return this._widgetCodeToIdMap;
    }
  }, {
    key: "reflexCodeToIdsMap",
    get: function get() {
      return this._reflexCodeToIdsMap;
    }
  }, {
    key: "onUpdate",
    value: function onUpdate() {}
  }, {
    key: "getWidgetState",
    value: function getWidgetState(widgetId, key) {
      var _this$_widgetState$wi;

      return key ? (_this$_widgetState$wi = this._widgetState[widgetId]) === null || _this$_widgetState$wi === void 0 ? void 0 : _this$_widgetState$wi[key] : this._widgetState[widgetId];
    }
  }, {
    key: "setWidgetState",
    value: function setWidgetState(widgetId, key, value) {
      if (!this._widgetState[widgetId]) this._widgetState[widgetId] = {};

      if (value === undefined) {
        var _this$_widgetState$wi2;

        (_this$_widgetState$wi2 = this._widgetState[widgetId]) === null || _this$_widgetState$wi2 === void 0 ? true : delete _this$_widgetState$wi2[key];
      } else {
        this._widgetState[widgetId][key] = value;
      } // FIXME: this is not updating parent in App.vue

    }
  }, {
    key: "clearWidgetState",
    value: function clearWidgetState(widgetId, key) {
      this.setWidgetState(widgetId, key);
    }
  }, {
    key: "registerWidgetCode",
    value: function registerWidgetCode(widgetCode, widgetId) {
      this._widgetCodeToIdMap[widgetCode] = widgetId;
      this.setWidgetState(widgetId, "code", widgetCode);
    }
  }, {
    key: "unregisterWidgetCode",
    value: function unregisterWidgetCode(widgetCode) {
      delete this._widgetCodeToIdMap[widgetCode];
    }
  }, {
    key: "getReflexWidgetIdsByCode",
    value: function getReflexWidgetIdsByCode(widgetCode) {
      return this._reflexCodeToIdsMap[widgetCode] || [];
    }
  }, {
    key: "registerReflexWatch",
    value: function registerReflexWatch(widgetId, reflexCodes) {
      var _this = this;

      reflexCodes.forEach(function (code) {
        _this._reflexCodeToIdsMap[code] = _toConsumableArray(new Set([].concat(_toConsumableArray(_this._reflexCodeToIdsMap[code] || []), [widgetId])));
      });
    }
  }, {
    key: "unregisterReflexWatch",
    value: function unregisterReflexWatch(widgetId, reflexCodes) {
      var _this2 = this;

      reflexCodes.forEach(function (rc) {
        _this2._reflexCodeToIdsMap[rc] = _this2._reflexCodeToIdsMap[rc].filter(function (f) {
          return f !== widgetId;
        });
      });
    }
  }], [{
    key: "from",
    value: function from(formState) {
      if (formState instanceof FormState) {
        // from an object, use their public getters
        return new FormState({
          widgetState: formState.widgetState,
          widgetCodeToIdMap: formState.widgetCodeToIdMap,
          reflexCodeToIdsMap: formState.reflexCodeToIdsMap
        });
      } else {
        // assume it is just a plain object, fetch its protected
        // field
        return new FormState({
          widgetState: formState._widgetState,
          widgetCodeToIdMap: formState._widgetCodeToIdMap,
          reflexCodeToIdsMap: formState._reflexCodeToIdsMap
        });
      }
    }
  }]);

  return FormState;
}();var script = defineComponent({
  components: {
    WidgetsLayout: WidgetsLayout
  },
  // components: { DynamicFormLayout },
  props: {
    languages: Object,
    form: Object,
    // eslint-disable-next-line no-unused-vars
    onFormChange: Function,
    // func<(form: Form) => void>().isRequired,
    state: $(FormState).isRequired,
    // eslint-disable-next-line no-unused-vars
    onStateChange: Function,
    // func<(state: FormState) => void>().isRequired,
    widgets: Object,
    // shape(FormControl),
    questionControls: R(FormControl),
    // display | form | readOnly
    view: String,
    configs: C({
      widgets: C({
        // whether or not to use controls
        disableInternalControls: V(),
        blacklist: R(S()),
        whitelist: R(S()),
        filters: Object
      }),
      questionControls: C({
        // whether or not to use controls
        //
        disableInternalControls: V(),
        blacklist: R(S()),
        whitelist: R(S()),
        filters: Object
      })
    })
  },
  data: function data() {
    return {
      combQuestionControls: questionControls,
      combWidgetControls: widgets,
      widgetItems: {}
    };
  },
  computed: {
    widgetItemsArr: function widgetItemsArr() {
      return this.$props.form.widgets;
    },
    widgetsHandlerWatch: function widgetsHandlerWatch() {
      var _this$$props$configs;

      return {
        widgets: this.$props.widgets,
        configs: (_this$$props$configs = this.$props.configs) === null || _this$$props$configs === void 0 ? void 0 : _this$$props$configs.widgets
      };
    },
    questionControlsHandlerWatch: function questionControlsHandlerWatch() {
      var _this$$props$configs2;

      return {
        questionControls: this.$props.questionControls,
        configs: (_this$$props$configs2 = this.$props.configs) === null || _this$$props$configs2 === void 0 ? void 0 : _this$$props$configs2.questionControls
      };
    },
    formState: function formState() {
      return this.$props.state;
    }
  },
  watch: {
    widgetsHandlerWatch: {
      handler: function handler(_ref) {
        var _configs$widgets;

        var widgets$1 = _ref.widgets,
            configs = _ref.configs;
        this.$data.combWidgetControls = _objectSpread2(_objectSpread2({}, configs !== null && configs !== void 0 && (_configs$widgets = configs.widgets) !== null && _configs$widgets !== void 0 && _configs$widgets.disableInternalControls ? {} : widgets), widgets$1 || {});
      },
      immediate: true
    },
    questionControlsHandlerWatch: {
      handler: function handler(_ref2) {
        var _configs$questionCont;

        var questionControls$1 = _ref2.questionControls,
            configs = _ref2.configs;
        this.$data.combQuestionControls = _objectSpread2(_objectSpread2({}, configs !== null && configs !== void 0 && (_configs$questionCont = configs.questionControls) !== null && _configs$questionCont !== void 0 && _configs$questionCont.disableInternalControls ? {} : questionControls), questionControls$1 || {});
      },
      immediate: true
    },
    "form.widgets": {
      handler: function handler(newFormWidgetArr) {
        var _this = this;

        this.$data.widgetItems = newFormWidgetArr.reduce(function (obj, widget) {
          var _this$$data$combWidge;

          var WidgetItemClass = ((_this$$data$combWidge = _this.$data.combWidgetControls[widget.type]) === null || _this$$data$combWidge === void 0 ? void 0 : _this$$data$combWidge.widgetItem) || WidgetItem;
          obj[widget.id] = new WidgetItemClass({
            widget: widget,
            getState: function getState() {
              return _this.$props.state;
            },
            setState: function setState(newFormState) {
              _this.$emit("onStateChange", newFormState);
            },
            onUpdate: function onUpdate(newWidget) {
              var _this$$props$onFormCh, _this$$props;

              (_this$$props$onFormCh = (_this$$props = _this.$props).onFormChange) === null || _this$$props$onFormCh === void 0 ? void 0 : _this$$props$onFormCh.call(_this$$props, _objectSpread2(_objectSpread2({}, _this.$props.form), {}, {
                widgets: Object.values(_objectSpread2(_objectSpread2({}, _this.$data.widgetItems), {}, _defineProperty({}, newWidget.id, newWidget)))
              }));
            }
          });
          return obj;
        }, {});
        Object.values(this.$data.widgetItems).forEach(function (widgetItem) {
          widgetItem.setWidgetItems(_this.$data.widgetItems);
        });
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    t: function t(key, groupId) {
      var _lang;

      var lang = this.languages;

      if (groupId) {
        lang = groupId.split(".").reduce(function (obj, g) {
          return obj === null || obj === void 0 ? void 0 : obj[g];
        }, lang);
      }

      return (_lang = lang) === null || _lang === void 0 ? void 0 : _lang[key];
    }
  },
  provide: function provide() {
    var _this2 = this;

    return {
      getView: function getView() {
        return _this2.$props.view;
      },
      t: this.t,
      languages: this.$props.languages,
      getFormState: function getFormState() {
        return _this2.$props.state;
      },
      setFormState: function setFormState(newFormState) {
        _this2.$emit("onStateChange", newFormState);
      },
      widgetControls: this.$data.combWidgetControls,
      questionControls: this.$data.combQuestionControls
    };
  }
});/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
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

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-20e02914_0", {
    source: ".main-wrapper[data-v-20e02914]{font-family:Arial,Helvetica,sans-serif}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-20e02914";
/* module identifier */

var __vue_module_identifier__ = "data-v-20e02914";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);

var __vue_component__$1 = __vue_component__;var components$1=/*#__PURE__*/Object.freeze({__proto__:null,VuePage:__vue_component__$1,WidgetsLayout:WidgetsLayout,WidgetView:WidgetView,FormState:FormState,widgets:widgets,FormControl:FormControl,formatDateString:formatDateString,getDateByPropertyValue:getDateByPropertyValue,questionControls:questionControls});var install = function installVuePage(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default':install,VuePage:__vue_component__$1,WidgetsLayout:WidgetsLayout,WidgetView:WidgetView,FormState:FormState,widgets:widgets,FormControl:FormControl,formatDateString:formatDateString,getDateByPropertyValue:getDateByPropertyValue,questionControls:questionControls});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== "default") {
    var key = componentName;
    var val = component;
    install[key] = val;
  }
});module.exports=install;