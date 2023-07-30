import{m as a}from"./block-67ee72f6-f6845175.js";import{u as l,l as i,b as m}from"./button-369258d7-e9cae574.js";const c=`
<main 
    class="body">
    <form class="form">
        <loginComponent placeholder="Логин" 
               type="text" 
               class="form__field" 
               name="login"></loginComponent>
        <passwordComponent placeholder="Пароль" type="password" class="form__field" name="password"></passwordComponent>
        <div class="buttons">
            <buttonComponent class="buttons__item buttons__item--small"></buttonComponent>
            <a href="/registration" class="buttons__item buttons__item--big" type="submit">Зарегистрироваться</a>
        </div>
    </form>
</main>
`,p=`.body{display:flex;flex-direction:row;justify-content:center;align-items:center;height:100vh;margin:0;box-sizing:border-box}
`;class r extends a{constructor(t={},o){t.events=o,super("auth-component",t,c,p),this.initComponents(),r._style=p+l.getStyles()+i.getStyles()}initComponents(){const t=new i({placeholder:"Логин",type:"text",name:"login",regExp:m.login}).getContent(),o=new i({placeholder:"Пароль",type:"password",name:"password",regExp:m.password}).getContent(),n=new l({text:"Войти",events:{click:s=>this.onSubmit(s)}}).getContent();this.components={buttonComponent:n,loginComponent:t,passwordComponent:o}}onSubmit(t){var o;if(t.preventDefault(),this.components){const n={};(o=Object.values(this.components))==null||o.forEach(s=>{const e=s.querySelector("input");e&&(e.focus(),e.blur(),n[e.name]=e.value)}),console.log(n)}}}export{r as AuthComponent};
