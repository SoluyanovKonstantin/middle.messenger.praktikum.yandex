var u=Object.defineProperty;var f=(o,e,t)=>e in o?u(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var i=(o,e,t)=>(f(o,typeof e!="symbol"?e+"":e,t),t);class y{constructor(e,t){i(this,"template","");i(this,"style","");this.template=e,this.style=t}compile(e,t={}){var p;const s=/\{\{.*?\}\}/g;let n=this.template;(p=this.template.match(s))==null||p.forEach(c=>{const a=c.replaceAll(/\{\{ | \}\}/g,""),r=e[a];r&&typeof r=="string"&&(n=n.replaceAll(c,r))});const h=document.createElement("div");h.innerHTML=n;const E=h.firstElementChild;return Object.keys(t).forEach(c=>{const a=E.querySelectorAll(c.toLowerCase());a.length&&a.forEach(r=>{var _;const d=t[c];d.classList.add(...r.classList.values()),(_=r.parentNode)==null||_.insertBefore(d,r),r.remove()})}),{template:E,style:this.style}}}class v{constructor(){i(this,"listeners");this.listeners={}}on(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}off(e,t){if(!this.listeners[e])throw new Error(`Нет события: ${e}`);this.listeners[e]=this.listeners[e].filter(s=>s!==t)}emit(e,...t){if(!this.listeners[e])throw new Error(`Нет события: ${e}`);this.listeners[e].forEach(function(s){s(...t)})}}const l=class{constructor(e="div",t={},s,n){i(this,"_element");i(this,"_templateEngine");i(this,"_meta");i(this,"events");i(this,"props");i(this,"eventBus");i(this,"components");i(this,"setProps",e=>{e&&Object.assign(this.props,e)});const h=new v;this._meta={tagName:e,props:t},this._templateEngine=new y(s,n),l._style=n,this.props=this._makePropsProxy(t),this.eventBus=()=>h,this._registerEvents(h),h.emit(l.EVENTS.INIT)}_removeEvents(){let e=[];this.events&&(e=Object.keys(this.events)),e.forEach(t=>{var n;const s=(n=this.events)==null?void 0:n[t];this._element&&s&&this._element.removeEventListener(t,s)})}_addEvents(){const{events:e}=this.props;if(!e)return;const t=Object.keys(e);this.events=e,t.forEach(s=>{const n=e==null?void 0:e[s];this._element&&n&&this._element.addEventListener(s,n)})}initComponents(e){this.components=e}_registerEvents(e){e.on(l.EVENTS.INIT,this.init.bind(this)),e.on(l.EVENTS.FLOW_RENDER,this._render.bind(this))}_createResources(){const{tagName:e}=this._meta;this._element=this._createDocumentElement(e)}init(){this._createResources()}componentDidUpdate(e,t){return e===t}get element(){return this._render(),this._element}_render(){this._removeEvents();const e=this.render();this._element&&(this._element.innerHTML="",this._element.append(e.template),this._addEvents())}render(){return this._templateEngine.compile(this.props,this.components)}getContent(){return this.element}static getStyles(){return this._style}_makePropsProxy(e){return new Proxy(e,{set:(t,s,n)=>(t[s]=n,this.eventBus().emit(l.EVENTS.FLOW_RENDER),!0),deleteProperty(){throw new Error("нет доступа")}})}_createDocumentElement(e){return document.createElement(e)}show(){const e=this.getContent();e&&(e.style.display="block")}hide(){const e=this.getContent();e&&(e.style.display="none")}};let m=l;i(m,"_style"),i(m,"EVENTS",{INIT:"init",FLOW_CDM:"flow:component-did-mount",FLOW_RENDER:"flow:render",FLOW_CDU:"flow:component-did-update"});export{m as B};