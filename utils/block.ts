import { TemplateEngine } from './templateEngine';
import { EventBus } from './event-bus';

export type Props = {
    events?: Record<string, (event?: Event) => void>,
    arrays?: Record<string, unknown[]>,
    [index: string]: string | RegExp | Record<string, (event?: Event) => void> | Record<string, unknown[]> | undefined,
}

export type Events = Record<string, (event?: Event) => void>;

export class Block {
    protected _element: HTMLElement | undefined;
    private _templateEngine: TemplateEngine;
    private _meta: {
        tagName: string,
        props: Props
    };
    private events: Events | undefined;
    protected static _style: string;

    public props: Props;
    public eventBus: () => EventBus;

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update'
    };
    components: Record<string, HTMLElement> | undefined;

    constructor(tagName = 'div', props: Props = {}, template: string, style: string) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this._templateEngine = new TemplateEngine(template, style);
        Block._style = style;

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);

    }

    _removeEvents() {
        let eventKeys: string[] = [];
        if (this.events) {
            eventKeys = Object.keys(this.events);
        }

        eventKeys.forEach((eventName: string) => {
            const ev = this.events?.[eventName];
            if (this._element && ev) {
                this._element.removeEventListener(eventName, ev);
            }
        });
    }

    _addEvents() {
        const { events } = this.props;
        if (!events) return;
        const eventKeys = Object.keys(events);
        this.events = events;

        eventKeys.forEach((eventName: string) => {
            const ev = events?.[eventName];
            if (this._element && ev) {
                this._element.addEventListener(eventName, ev);
            }
        });
    }

    protected initComponents(components: Record<string, HTMLElement>) {
        this.components = components;
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        return oldProps === newProps;
    }

    setProps = (nextProps: Props) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        this._render();
        return this._element as HTMLElement;
    }

    _render() {
        this._removeEvents();
        const block = this.render();
        if (this._element) {
            this._element.innerHTML = '';
            this._element.append(block.template);
            this._addEvents();
        }
    }

    render() {
        return this._templateEngine.compile(this.props, this.components);
    }

    getContent() {
        return this.element;
    }

    static getStyles() {
        return this._style;
    }

    _makePropsProxy(props: Props) {
        return new Proxy(props, {
            set: (target, prop: string, val) => {
                target[prop] = val;
                this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
                return true;
            },
            deleteProperty() {
                throw new Error('нет доступа');
            },
        });
    }

    _createDocumentElement(tagName: string): HTMLElement {
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
