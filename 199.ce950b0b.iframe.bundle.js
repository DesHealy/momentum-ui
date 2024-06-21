(window.webpackJsonp=window.webpackJsonp||[]).push([[199],{1492:function(__webpack_module__,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"defineEventAttribute",(function(){return defineEventAttribute})),__webpack_require__.d(__webpack_exports__,"EventTarget",(function(){return EventTarget}));const privateData=new WeakMap,wrappers=new WeakMap;function pd(event){const retv=privateData.get(event);return console.assert(null!=retv,"'this' is expected an Event object, but got",event),retv}function setCancelFlag(data){null==data.passiveListener?data.event.cancelable&&(data.canceled=!0,"function"==typeof data.event.preventDefault&&data.event.preventDefault()):"undefined"!=typeof console&&"function"==typeof console.error&&console.error("Unable to preventDefault inside passive event listener invocation.",data.passiveListener)}function Event(eventTarget,event){privateData.set(this,{eventTarget:eventTarget,event:event,eventPhase:2,currentTarget:eventTarget,canceled:!1,stopped:!1,immediateStopped:!1,passiveListener:null,timeStamp:event.timeStamp||Date.now()}),Object.defineProperty(this,"isTrusted",{value:!1,enumerable:!0});const keys=Object.keys(event);for(let i=0;i<keys.length;++i){const key=keys[i];key in this||Object.defineProperty(this,key,defineRedirectDescriptor(key))}}function defineRedirectDescriptor(key){return{get(){return pd(this).event[key]},set(value){pd(this).event[key]=value},configurable:!0,enumerable:!0}}function defineCallDescriptor(key){return{value(){const event=pd(this).event;return event[key].apply(event,arguments)},configurable:!0,enumerable:!0}}function getWrapper(proto){if(null==proto||proto===Object.prototype)return Event;let wrapper=wrappers.get(proto);return null==wrapper&&(wrapper=function defineWrapper(BaseEvent,proto){const keys=Object.keys(proto);if(0===keys.length)return BaseEvent;function CustomEvent(eventTarget,event){BaseEvent.call(this,eventTarget,event)}CustomEvent.prototype=Object.create(BaseEvent.prototype,{constructor:{value:CustomEvent,configurable:!0,writable:!0}});for(let i=0;i<keys.length;++i){const key=keys[i];if(!(key in BaseEvent.prototype)){const isFunc="function"==typeof Object.getOwnPropertyDescriptor(proto,key).value;Object.defineProperty(CustomEvent.prototype,key,isFunc?defineCallDescriptor(key):defineRedirectDescriptor(key))}}return CustomEvent}(getWrapper(Object.getPrototypeOf(proto)),proto),wrappers.set(proto,wrapper)),wrapper}function isStopped(event){return pd(event).immediateStopped}function setPassiveListener(event,passiveListener){pd(event).passiveListener=passiveListener}Event.prototype={get type(){return pd(this).event.type},get target(){return pd(this).eventTarget},get currentTarget(){return pd(this).currentTarget},composedPath(){const currentTarget=pd(this).currentTarget;return null==currentTarget?[]:[currentTarget]},get NONE(){return 0},get CAPTURING_PHASE(){return 1},get AT_TARGET(){return 2},get BUBBLING_PHASE(){return 3},get eventPhase(){return pd(this).eventPhase},stopPropagation(){const data=pd(this);data.stopped=!0,"function"==typeof data.event.stopPropagation&&data.event.stopPropagation()},stopImmediatePropagation(){const data=pd(this);data.stopped=!0,data.immediateStopped=!0,"function"==typeof data.event.stopImmediatePropagation&&data.event.stopImmediatePropagation()},get bubbles(){return Boolean(pd(this).event.bubbles)},get cancelable(){return Boolean(pd(this).event.cancelable)},preventDefault(){setCancelFlag(pd(this))},get defaultPrevented(){return pd(this).canceled},get composed(){return Boolean(pd(this).event.composed)},get timeStamp(){return pd(this).timeStamp},get srcElement(){return pd(this).eventTarget},get cancelBubble(){return pd(this).stopped},set cancelBubble(value){if(!value)return;const data=pd(this);data.stopped=!0,"boolean"==typeof data.event.cancelBubble&&(data.event.cancelBubble=!0)},get returnValue(){return!pd(this).canceled},set returnValue(value){value||setCancelFlag(pd(this))},initEvent(){}},Object.defineProperty(Event.prototype,"constructor",{value:Event,configurable:!0,writable:!0}),"undefined"!=typeof window&&void 0!==window.Event&&(Object.setPrototypeOf(Event.prototype,window.Event.prototype),wrappers.set(window.Event.prototype,Event));const listenersMap=new WeakMap;function isObject(x){return null!==x&&"object"==typeof x}function getListeners(eventTarget){const listeners=listenersMap.get(eventTarget);if(null==listeners)throw new TypeError("'this' is expected an EventTarget object, but got another value.");return listeners}function defineEventAttribute(eventTargetPrototype,eventName){Object.defineProperty(eventTargetPrototype,"on"+eventName,function defineEventAttributeDescriptor(eventName){return{get(){let node=getListeners(this).get(eventName);for(;null!=node;){if(3===node.listenerType)return node.listener;node=node.next}return null},set(listener){"function"==typeof listener||isObject(listener)||(listener=null);const listeners=getListeners(this);let prev=null,node=listeners.get(eventName);for(;null!=node;)3===node.listenerType?null!==prev?prev.next=node.next:null!==node.next?listeners.set(eventName,node.next):listeners.delete(eventName):prev=node,node=node.next;if(null!==listener){const newNode={listener:listener,listenerType:3,passive:!1,once:!1,next:null};null===prev?listeners.set(eventName,newNode):prev.next=newNode}},configurable:!0,enumerable:!0}}(eventName))}function defineCustomEventTarget(eventNames){function CustomEventTarget(){EventTarget.call(this)}CustomEventTarget.prototype=Object.create(EventTarget.prototype,{constructor:{value:CustomEventTarget,configurable:!0,writable:!0}});for(let i=0;i<eventNames.length;++i)defineEventAttribute(CustomEventTarget.prototype,eventNames[i]);return CustomEventTarget}function EventTarget(){if(!(this instanceof EventTarget)){if(1===arguments.length&&Array.isArray(arguments[0]))return defineCustomEventTarget(arguments[0]);if(arguments.length>0){const types=new Array(arguments.length);for(let i=0;i<arguments.length;++i)types[i]=arguments[i];return defineCustomEventTarget(types)}throw new TypeError("Cannot call a class as a function")}listenersMap.set(this,new Map)}EventTarget.prototype={addEventListener(eventName,listener,options){if(null==listener)return;if("function"!=typeof listener&&!isObject(listener))throw new TypeError("'listener' should be a function or an object.");const listeners=getListeners(this),optionsIsObj=isObject(options),listenerType=(optionsIsObj?Boolean(options.capture):Boolean(options))?1:2,newNode={listener:listener,listenerType:listenerType,passive:optionsIsObj&&Boolean(options.passive),once:optionsIsObj&&Boolean(options.once),next:null};let node=listeners.get(eventName);if(void 0===node)return void listeners.set(eventName,newNode);let prev=null;for(;null!=node;){if(node.listener===listener&&node.listenerType===listenerType)return;prev=node,node=node.next}prev.next=newNode},removeEventListener(eventName,listener,options){if(null==listener)return;const listeners=getListeners(this),listenerType=(isObject(options)?Boolean(options.capture):Boolean(options))?1:2;let prev=null,node=listeners.get(eventName);for(;null!=node;){if(node.listener===listener&&node.listenerType===listenerType)return void(null!==prev?prev.next=node.next:null!==node.next?listeners.set(eventName,node.next):listeners.delete(eventName));prev=node,node=node.next}},dispatchEvent(event){if(null==event||"string"!=typeof event.type)throw new TypeError('"event.type" should be a string.');const listeners=getListeners(this),eventName=event.type;let node=listeners.get(eventName);if(null==node)return!0;const wrappedEvent=function wrapEvent(eventTarget,event){return new(getWrapper(Object.getPrototypeOf(event)))(eventTarget,event)}(this,event);let prev=null;for(;null!=node;){if(node.once?null!==prev?prev.next=node.next:null!==node.next?listeners.set(eventName,node.next):listeners.delete(eventName):prev=node,setPassiveListener(wrappedEvent,node.passive?node.listener:null),"function"==typeof node.listener)try{node.listener.call(this,wrappedEvent)}catch(err){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(err)}else 3!==node.listenerType&&"function"==typeof node.listener.handleEvent&&node.listener.handleEvent(wrappedEvent);if(isStopped(wrappedEvent))break;node=node.next}return setPassiveListener(wrappedEvent,null),function setEventPhase(event,eventPhase){pd(event).eventPhase=eventPhase}(wrappedEvent,0),function setCurrentTarget(event,currentTarget){pd(event).currentTarget=currentTarget}(wrappedEvent,null),!wrappedEvent.defaultPrevented}},Object.defineProperty(EventTarget.prototype,"constructor",{value:EventTarget,configurable:!0,writable:!0}),"undefined"!=typeof window&&void 0!==window.EventTarget&&Object.setPrototypeOf(EventTarget.prototype,window.EventTarget.prototype),__webpack_exports__.default=EventTarget}}]);