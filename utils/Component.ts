import { EventManager } from './EventManager.js'
import { Nullable } from '../types/Types'
import Templator from './templator/Templator.js'

/* global HTMLElement, EventListenerOrEventListenerObject */

enum Event {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_RENDER = 'flow:render',
    FLOW_CDU = 'flow:component-did-update'
}

/*
 В отличие от реализации блока в тренажере, решил не использовать _meta.
 Теперь getContent() возвращает не один элемент, а массив элементов.
*/

class Component<T> {
    props: T
    eventManager: () => EventManager
    _elements: HTMLElement[] = []
    _templator: Templator

    constructor(props: T) {
        const eventManager = new EventManager()
        this.props = this._makePropsProxy(props)
        this._templator = new Templator(this.template())
        this.eventManager = () => eventManager
        this._registerEvents(eventManager)
        eventManager.emit(Event.INIT)
    }

    _registerEvents(eventManager: EventManager) {
        // console.log('_registerEvents')
        eventManager.on(Event.INIT, this.init.bind(this))
        eventManager.on(Event.FLOW_CDM, this._componentDidMount.bind(this))
        eventManager.on(Event.FLOW_RENDER, this._render.bind(this))
        eventManager.on(Event.FLOW_CDU, this._componentDidUpdate.bind(this))
    }

    template(): string {
        return ''
    }

    _createResources() {
        // console.log('_createResources')
        this._elements = this._templator.compile(this.props)
    }

    init() {
        this._createResources()
        this.eventManager().emit(Event.FLOW_CDM)
        // console.log('init', this.getContent())
    }

    _componentDidMount() {
        // console.log('_componentDidMount')
        this.componentDidMount(this.props)
    }

    componentDidMount(_oldProps: T) {}

    _componentDidUpdate(oldProps: T, newProps: T) {
        // console.log('_componentDidUpdate')
        const isEnabled = this.componentDidUpdate(oldProps, newProps)
        if (isEnabled) {
            this.props = Object.assign(oldProps, newProps)
        }
    }

    componentDidUpdate(oldProps: T, newProps: T) {
        // знаю, что это очень топорно, но до этого я просто в любом случае изменения пропсов делал рендер
        return JSON.stringify(oldProps) !== JSON.stringify(newProps)
    }

    setProps = (nextProps: Partial<T>) => {
        // console.log('setProps')
        if (!nextProps) {
            return
        }
        this.eventManager().emit(Event.FLOW_CDU, this.props, nextProps)
    };

    _render() {
        // console.log('_render', this.props)
        const newElements = this._templator.compile(this.props)
        this._elements?.forEach((oldNode, index) => {
            if (oldNode) {
                const parent = oldNode.parentNode
                oldNode.remove()
                if (parent != null) {
                    oldNode.remove()
                    const newNode = newElements[index]
                    parent.appendChild(newNode)
                }
            }
        })
        this._elements = newElements
    }

    getContent(): Nullable<HTMLElement[]> {
        // console.log('getContent')
        return this._elements
    }

    _makePropsProxy(props: any) {
        // console.log('_makePropsProxy')
        const self = this
        return new Proxy(props, {
            set(target: any, prorerty: PropertyKey, value: any): boolean {
                target[prorerty] = value
                self.eventManager().emit(Event.FLOW_RENDER)
                return true
            },
            deleteProperty(): boolean {
                throw new Error('Нет доступа')
            }
        })
    }

    addEventListener(listenerName: string, callback: EventListenerOrEventListenerObject): void {
        const contentArr = this.getContent()
        contentArr?.forEach((node) => {
            node.addEventListener(listenerName, callback)
        })
    }

    show(display: 'flex' | 'block'): void {
        const contentArr = this.getContent()
        contentArr?.forEach((node) => {
            node.style.display = display
        })
    }

    hide(): void {
        const contentArr = this.getContent()
        contentArr?.forEach((node) => {
            node.style.display = 'none'
        })
    }
}

export default Component