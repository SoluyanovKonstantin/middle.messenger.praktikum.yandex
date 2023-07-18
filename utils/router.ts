import { Block, Props } from './block';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(query: string, block: Block, styles: string) {
    const root = document.querySelector(query);
    if (root) {
        root.textContent = '';
        root.append(block.getContent());
    }
    
    document.querySelector('#forComponent')?.remove();
    const styleSheet = document.createElement('style');
    styleSheet.setAttribute('id', 'forComponent');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return root;
}

class Route {
    private _pathname: string;
    private _blockClass: { new() : Block, getStyles(): string } ;
    private _block: Block | null;
    private _props: Props;
    constructor(pathname: string, view:  { new() : Block, getStyles(): string }, props: Props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
        }

        render('#app', this._block as Block, this._blockClass.getStyles());
        this._block.show();
    }
}

class Router {
    routes: Route[];
    history: History;
    private _currentRoute: Route | undefined;
    private _rootQuery: string;
    static __instance: Router;
    constructor(rootQuery: string) {
        this.routes = [];
        this.history = window.history;
        this._currentRoute = undefined;
        this._rootQuery = rootQuery;

        if (Router.__instance) {
            return Router.__instance;
        }

        Router.__instance = this;
    }

    use(pathname: string, block:  { new() : Block, getStyles(): string }) {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
        });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event) => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        (route as Route).render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}

export default new Router('#app');
