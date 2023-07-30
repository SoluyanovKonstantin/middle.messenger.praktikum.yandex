import{m as n}from"./block-67ee72f6-f6845175.js";const t=`
<main class="body">
    <h1>{{ errorCode }}</h1>
</main>
`,o=`.body{display:flex;flex-direction:row;justify-content:center;align-items:center;height:100vh;margin:0;box-sizing:border-box;font-size:50px}
`;class e extends n{constructor(){const r=new URLSearchParams(window.location.search).get("errorCode")??"500";super("chat-component",{errorCode:r},t,o),e._style=o}}export{e as ErrorComponent};
