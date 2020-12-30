import { EventManager } from './EventManager.js';
import Templator from './templator/Templator.js';
import { isEqual, isObject } from './utils.js';
/* global HTMLElement, EventListenerOrEventListenerObject */
var Event;
(function (Event) {
    Event["INIT"] = "init";
    Event["FLOW_CDM"] = "flow:component-did-mount";
    Event["FLOW_RENDER"] = "flow:render";
    Event["FLOW_CDU"] = "flow:component-did-update";
})(Event || (Event = {}));
/*
 В отличие от реализации блока в тренажере, решил не использовать _meta.
 Теперь getContent() возвращает не один элемент, а массив элементов.
*/
class Component {
    constructor(props) {
        this._elements = [];
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            this.eventManager.emit(Event.FLOW_CDU, this.props, { ...this.props, ...nextProps });
        };
        this.props = this._makePropsProxy(props);
        this._templator = new Templator(this._template());
        this.eventManager = new EventManager();
        this._registerEvents(this.eventManager);
        this.eventManager.emit(Event.INIT);
    }
    _registerEvents(eventManager) {
        eventManager.on(Event.INIT, this._init.bind(this));
        eventManager.on(Event.FLOW_CDM, this._componentDidMount.bind(this));
        eventManager.on(Event.FLOW_RENDER, this._render.bind(this));
        eventManager.on(Event.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _createResources() {
        this._elements = this._templator.compile(this.props);
    }
    _init() {
        this._createResources();
        this.eventManager.emit(Event.FLOW_CDM);
    }
    _componentDidMount() {
        this.componentDidMount(this.props);
    }
    _isUpdateEnable(oldProps, newProps) {
        if (isObject(oldProps) && isObject(newProps)) {
            return !isEqual(oldProps, newProps);
        }
        return false;
    }
    _componentDidUpdate(oldProps, newProps) {
        let isUpdateEnabled;
        if (this.componentDidUpdate(oldProps, newProps) !== undefined) {
            isUpdateEnabled = this.componentDidUpdate(oldProps, newProps);
        }
        else {
            isUpdateEnabled = this._isUpdateEnable(oldProps, newProps);
        }
        if (isUpdateEnabled) {
            this.props = Object.assign(oldProps, newProps);
        }
    }
    _render() {
        var _a;
        const newElements = this._templator.compile(this.props);
        (_a = this._elements) === null || _a === void 0 ? void 0 : _a.forEach((oldNode, index) => {
            if (oldNode) {
                const newNode = newElements[index];
                const parentNode = oldNode.parentNode;
                const nextNode = oldNode.nextSibling;
                if (parentNode) {
                    oldNode.remove();
                    // если есть следующая нода того же уровня, то инсертим не в конец родителя, а к этой ноде
                    if (nextNode) {
                        parentNode.insertBefore(newNode, nextNode);
                    }
                    else {
                        parentNode.appendChild(newNode);
                    }
                }
            }
        });
        this._elements = newElements;
    }
    _makePropsProxy(props) {
        const self = this;
        return new Proxy(props, {
            set(target, prorerty, value) {
                target[prorerty] = value;
                self.eventManager.emit(Event.FLOW_RENDER);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }
    _template() {
        return this.template();
    }
    componentDidMount(_oldProps) { }
    componentDidUpdate(_oldProps, _newProps) { }
    template() {
        return '';
    }
    getContent() {
        return this._elements;
    }
    addEventListener(listenerName, callback) {
        const contentArr = this.getContent();
        contentArr === null || contentArr === void 0 ? void 0 : contentArr.forEach((node) => {
            node.addEventListener(listenerName, callback);
        });
    }
    show(display) {
        const contentArr = this.getContent();
        contentArr === null || contentArr === void 0 ? void 0 : contentArr.forEach((node) => {
            node.style.display = display;
        });
    }
    hide() {
        const contentArr = this.getContent();
        contentArr === null || contentArr === void 0 ? void 0 : contentArr.forEach((node) => {
            node.style.display = 'none';
        });
    }
}
export default Component;
//# sourceMappingURL=Component.js.map