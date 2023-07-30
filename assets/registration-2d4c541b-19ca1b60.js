import{m as d}from"./block-67ee72f6-f6845175.js";import{u as p,l as n,b as o}from"./button-369258d7-e9cae574.js";const f=`
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
`;class i extends d{constructor(t={}){super("registration-component",t,f,l),this.initComponents(),i._style=l+p.getStyles()+n.getStyles()}initComponents(){const t=new n({placeholder:"Логин",type:"text",name:"login",regExp:o.login}).getContent(),s=new n({placeholder:"Пароль",type:"password",name:"password",regExp:o.password}).getContent(),m=new n({placeholder:"Почта",type:"email",name:"email",regExp:o.email}).getContent(),a=new n({placeholder:"Имя",type:"text",name:"first_name",regExp:o.name}).getContent(),e=new n({placeholder:"Фамилия",type:"text",name:"second_name",regExp:o.name}).getContent(),r=new n({placeholder:"Телефон",type:"phone",name:"phone",regExp:o.phone}).getContent(),c=new p({text:"Зарегистрироваться",events:{click:C=>this.onSubmit(C)}}).getContent();this.components={buttonComponent:c,loginComponent:t,passwordComponent:s,emailComponent:m,firstNameComponent:a,lastNameComponent:e,phoneComponent:r}}onSubmit(t){var s;if(t.preventDefault(),this.components){const m={};(s=Object.values(this.components))==null||s.forEach(a=>{const e=a.querySelector("input");e&&(e.focus(),e.blur(),m[e.name]=e.value)}),console.log(m)}}}export{i as RegistrationComponent};
