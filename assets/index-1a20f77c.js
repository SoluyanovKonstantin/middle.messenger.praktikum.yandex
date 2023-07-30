(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const y="modulepreload",_=function(t){return"/"+t},h={},d=function(n,o,s){if(!o||o.length===0)return n();const e=document.getElementsByTagName("link");return Promise.all(o.map(r=>{if(r=_(r),r in h)return;h[r]=!0;const l=r.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(!!s)for(let a=e.length-1;a>=0;a--){const p=e[a];if(p.href===r&&(!l||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${c}`))return;const i=document.createElement("link");if(i.rel=l?"stylesheet":y,l||(i.as="script",i.crossOrigin=""),i.href=r,document.head.appendChild(i),l)return new Promise((a,p)=>{i.addEventListener("load",a),i.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>n())};(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const e of s)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const e={};return s.integrity&&(e.integrity=s.integrity),s.referrerPolicy&&(e.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?e.credentials="include":s.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(s){if(s.ep)return;s.ep=!0;const e=n(s);fetch(s.href,e)}})();const L="modulepreload",E=function(t){return"/"+t},g={},f=function(t,n,o){if(!n||n.length===0)return t();const s=document.getElementsByTagName("link");return Promise.all(n.map(e=>{if(e=E(e),e in g)return;g[e]=!0;const r=e.endsWith(".css"),l=r?'[rel="stylesheet"]':"";if(o)for(let u=s.length-1;u>=0;u--){const i=s[u];if(i.href===e&&(!r||i.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${l}`))return;const c=document.createElement("link");if(c.rel=r?"stylesheet":L,r||(c.as="script",c.crossOrigin=""),c.href=e,document.head.appendChild(c),r)return new Promise((u,i)=>{c.addEventListener("load",u),c.addEventListener("error",()=>i(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>t())};function m(t){const n=document.querySelector("#app");n&&typeof t.template=="string"?n.innerHTML=t.template:t.template&&(n==null||n.append(t.template));const o=document.createElement("style");o.setAttribute("id","forComponent"),o.innerText=t.style,document.head.appendChild(o)}document.URL.includes("registration")?f(()=>d(()=>import("./registration-2d4c541b-19ca1b60.js"),["assets/registration-2d4c541b-19ca1b60.js","assets/block-67ee72f6-f6845175.js","assets/button-369258d7-e9cae574.js"]),["assets/registration-2d4c541b.js","assets/block-67ee72f6.js","assets/button-369258d7.js"]).then(({RegistrationComponent:t})=>{const n=new t;n.getContent()&&m({template:n.getContent(),style:t.getStyles()})}):document.URL.includes("auth")?f(()=>d(()=>import("./auth-59a90255-2044eab2.js"),["assets/auth-59a90255-2044eab2.js","assets/block-67ee72f6-f6845175.js","assets/button-369258d7-e9cae574.js"]),["assets/auth-59a90255.js","assets/block-67ee72f6.js","assets/button-369258d7.js"]).then(({AuthComponent:t})=>{const n=new t;n.getContent()&&m({template:n.getContent(),style:t.getStyles()})}):document.URL.includes("chat")?f(()=>d(()=>import("./chat-fbf802de-aeb90629.js"),["assets/chat-fbf802de-aeb90629.js","assets/block-67ee72f6-f6845175.js"]),["assets/chat-fbf802de.js","assets/block-67ee72f6.js"]).then(({ChatComponent:t})=>{const n=new t;n.getContent()&&m({template:n.getContent(),style:t.getStyles()})}):document.URL.includes("error")?f(()=>d(()=>import("./error-61a6a032-7aa92cc2.js"),["assets/error-61a6a032-7aa92cc2.js","assets/block-67ee72f6-f6845175.js"]),["assets/error-61a6a032.js","assets/block-67ee72f6.js"]).then(({ErrorComponent:t})=>{const n=new t;n.getContent()&&m({template:n.getContent(),style:t.getStyles()})}):document.URL.includes("settings")?f(()=>d(()=>import("./settings-cdfcdb48-b6af4858.js"),["assets/settings-cdfcdb48-b6af4858.js","assets/block-67ee72f6-f6845175.js","assets/button-369258d7-e9cae574.js"]),["assets/settings-cdfcdb48.js","assets/block-67ee72f6.js","assets/button-369258d7.js"]).then(({SettingsComponent:t})=>{const n=new t;n.getContent()&&m({template:n.getContent(),style:t.getStyles()})}):window.location.href="/auth";
