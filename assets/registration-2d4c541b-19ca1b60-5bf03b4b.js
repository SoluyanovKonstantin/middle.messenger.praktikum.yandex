import{d as f}from"./block-67ee72f6-f6845175-8b95902b.js";import{u as p,l as n,h as t}from"./button-369258d7-e9cae574-40d8f027.js";const C=`
<main class="body">
    <form class="form">
        <firstNameComponent class="form__field" name="first_name"></firstNameComponent>
        <lastNameComponent class="form__field" name="second_name"></lastNameComponent>
        <loginComponent class="form__field" name="login"></loginComponent>
        <emailComponent class="form__field" name="email"></emailComponent>
        <passwordComponent class="form__field" name="password"></passwordComponent>
        <phoneComponent  class="form__field" name="phone"></phoneComponent>
        <div class="buttons">
            <buttonComponent class="buttons__item buttons__item--big" type="button">Зарегистрироваться</buttonComponent>
            <a href="/auth" class="buttons__item buttons__item--small" type="submit">Войти</a>
        </div>
    </form>
</main>
`,l=`.body{display:flex;flex-direction:row;justify-content:center;align-items:center;height:100vh;margin:0;box-sizing:border-box}
`;class i extends f{constructor(o={}){super("registration-component",o,C,l),this.initComponents(),i._style=l+p.getStyles()+n.getStyles()}initComponents(){const o=new n({placeholder:"Логин",type:"text",name:"login",regExp:t.login}).getContent(),s=new n({placeholder:"Пароль",type:"password",name:"password",regExp:t.password}).getContent(),m=new n({placeholder:"Почта",type:"email",name:"email",regExp:t.email}).getContent(),a=new n({placeholder:"Имя",type:"text",name:"first_name",regExp:t.name}).getContent(),e=new n({placeholder:"Фамилия",type:"text",name:"second_name",regExp:t.name}).getContent(),r=new n({placeholder:"Телефон",type:"phone",name:"phone",regExp:t.phone}).getContent(),c=new p({text:"Зарегистрироваться",events:{click:d=>this.onSubmit(d)}}).getContent();this.components={buttonComponent:c,loginComponent:o,passwordComponent:s,emailComponent:m,firstNameComponent:a,lastNameComponent:e,phoneComponent:r}}onSubmit(o){var s;if(o.preventDefault(),this.components){const m={};(s=Object.values(this.components))==null||s.forEach(a=>{const e=a.querySelector("input");e&&(e.focus(),e.blur(),m[e.name]=e.value)}),console.log(m)}}}export{i as RegistrationComponent};
