import { TemplateEngine } from './templateEngine';
import { EventBus } from './event-bus';

export type O = Record<string, string>;

export class Block {
    private _element: HTMLElement | undefined;
    private _templateEngine: TemplateEngine;
    private _meta: {
        tagName: string,
        props: Record<string, string>
    };
    private _style: string;

    public props: Record<string, string>;
    public eventBus: () => EventBus;

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update'
    };

    constructor(tagName = 'div', props = {}, template: string, style: string, components = {}) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this._templateEngine = new TemplateEngine(template, style, components);
        this._style = style;

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);

    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
    }

    _componentDidUpdate(oldProps: O | string, newProps: O | string) {
        const response = this.componentDidUpdate(oldProps, newProps);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: O | string, newProps: O | string) {
        return oldProps === newProps;
    }

    setProps = (nextProps: O) => {
        if (!nextProps) {
            return;
        }

        this._componentDidUpdate(this.props, nextProps);
        Object.assign(this.props, nextProps);
    };

    get element() {
        this._element = this._render();
        return this._element;
    }

    _render() {
        const block = this.render();
        if (this._element) {
            this._element.innerHTML = '';
            this._element.append(block.template);
        }
        return this._element;
    }

    render() {
        return this._templateEngine.compile(this.props);
    }

    getContent() {
        return this.element;
    }

    getStyles() {
        return this._style;
    }

    _makePropsProxy(props: O) {
        return new Proxy(props, {
            set: (target, prop: string, val) => {
                target[prop] = val;
                this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
                return true;
            },
            deleteProperty() { // перехватываем удаление свойства
                throw new Error('нет доступа');
            },
        });
    }

    _createDocumentElement(tagName: string): HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        const el = this.getContent();
        if (el)
            el.style.display = 'block';
    }

    hide() {
        const el = this.getContent();
        if (el) {
            el.style.display = 'none';
        }
    }
}
