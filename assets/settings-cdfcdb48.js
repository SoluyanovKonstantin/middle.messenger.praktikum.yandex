import{B as g}from"./block-67ee72f6.js";import{I as o,B as m,r as t}from"./button-369258d7.js";const _=`
<main class="body">
    <form class="form form--without-gap">
        <img class="form__icon" src="/icon.svg" alt="">
        <label class="input-file">
            <input class="input-file__input" type="file" name="avatar">
            <span class="input-file__button">Поменять аватар</span>           
        </label>
    </form>
    <form class="form">
        <firstNameComponent placeholder="Имя" type="text" class="form__field" name="first_name"></firstNameComponent>
        <lastNameComponent placeholder="Фамилия" type="text" class="form__field" name="second_name"></lastNameComponent>
        <displayNameComponent placeholder="Отображаемое имя" type="text" class="form__field" name="display_name"></displayNameComponent>
        <loginComponent placeholder="Логин" type="text" class="form__field" name="login"></loginComponent>
        <emailComponent placeholder="Почта" type="email" class="form__field" name="email"></emailComponent>
        <phoneComponent placeholder="Телефон" type="phone" class="form__field" name="phone"></phoneComponent>
        <div class="buttons">
            <saveDataButtonComponent class="buttons__item buttons__item--small" type="submit">Сохранить</saveDataButtonComponent>
        </div>
    </form>
    <hr class="hr-line">
    <form class="form">
        <oldPasswordComponent placeholder="Старый пароль" type="text" class="form__field" name="oldPassword"></oldPasswordComponent>
        <newPasswordComponent placeholder="Новый пароль" type="password" class="form__field" name="newPassword"></newPasswordComponent>
        <div class="buttons">
            <savePasswordButtonComponent class="buttons__item buttons__item--small" type="submit">Сохранить</savePasswordButtonComponent>
        </div>
    </form>
</main>
`,r=`.body{background-color:var(--bg-color);height:calc(100vh - 72px);width:calc(100vw - 72px);gap:26px;display:flex;flex-direction:column;padding:36px}.form{width:100%;border-radius:0;padding:0;gap:21px;box-shadow:none}.form__field{height:45px}.form--without-gap{gap:0}.buttons{justify-content:center}.buttons__item{height:33px;line-height:33px}.input-file{position:relative;display:inline-block}.input-file__button{position:relative;display:inline-block;cursor:pointer;outline:none;font-size:14px;vertical-align:middle;color:#4965d6;text-align:center;border-radius:4px;line-height:14px;height:14px;box-sizing:border-box;border:none;margin:0;transition:background-color .2s;padding:0;text-decoration:underline}.input-file__input{position:absolute;z-index:-1;opacity:0;display:block;width:0;height:0}
`;class c extends g{constructor(){super("chat-component",{},_,r),this.initComponents(),c._style=r+o._style+m._style}initComponents(){const l=new o({placeholder:"Имя",type:"text",name:"first_name",regExp:t.name}).getContent(),n=new o({placeholder:"Фамилия",type:"text",name:"second_name",regExp:t.name}).getContent(),s=new o({placeholder:"Отображаемое имя",type:"text",name:"display_name",regExp:t.name}).getContent(),a=new o({placeholder:"Логин",type:"text",name:"login",regExp:t.login}).getContent(),p=new o({placeholder:"Почта",type:"email",name:"email",regExp:t.email}).getContent(),e=new o({placeholder:"Телефон",type:"phone",name:"phone",regExp:t.phone}).getContent(),d=new m({text:"Сохранить",events:{click:i=>this.onSubmit(i,"data")}}).getContent(),h=new o({placeholder:"Пароль",type:"password",name:"oldPassword",regExp:t.password}).getContent(),f=new o({placeholder:"Пароль",type:"password",name:"newPassword",regExp:t.password}).getContent(),u=new m({text:"Сохранить",events:{click:i=>this.onSubmit(i,"password")}}).getContent();this.components={saveDataButtonComponent:d,savePasswordButtonComponent:u,loginComponent:a,oldPasswordComponent:h,newPasswordComponent:f,emailComponent:p,firstNameComponent:l,lastNameComponent:n,phoneComponent:e,displayNameComponent:s}}onSubmit(l,n){var s;if(l.preventDefault(),this.components){const a={};(s=Object.values(this.components))==null||s.forEach(p=>{const e=p.querySelector("input");e&&(n==="password"&&e.type===n||n==="data"&&e.type!=="password")&&(e.focus(),e.blur(),a[e.name]=e.value)}),console.log(a)}}}export{c as SettingsComponent};
