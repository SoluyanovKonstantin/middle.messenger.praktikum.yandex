import{m as a}from"./block-67ee72f6-f6845175.js";const s=`
<main class="body">
    <section class="chat-preview__container">
        <div class="search__wrapper">
            <div class="sandwich__wrapper">
                <div class="sandwich"></div>
            </div>
            <input placeholder="Поиск" class="input search" type="search" name="" id="">
        </div>
    
        <ul class="chat-preview__list">
            <li class="chat-preview">
                <img class="chat-preview__image" src="/icon.svg" alt="">
                <div class="chat-preview__right-side">
                    <h1 class="chat-preview__text chat-preview__text--title">Название диалога</h1>
                    <p class="chat-preview__text">Последнее сообщение из ...</p>
                </div>
            </li>
            <li class="chat-preview">
                <img class="chat-preview__image" src="/icon.svg" alt="">
                <div class="chat-preview__right-side">
                    <h1 class="chat-preview__text chat-preview__text--title">Название диалога</h1>
                    <p class="chat-preview__text">Последнее сообщение из ...</p>
                </div>
            </li>
            <li class="chat-preview">
                <img class="chat-preview__image" src="/icon.svg" alt="">
                <div class="chat-preview__right-side">
                    <h1 class="chat-preview__text chat-preview__text--title">Название диалога</h1>
                    <p class="chat-preview__text">{{ message }}</p>
                </div>
            </li>
        </ul>
        <div class="buttons">
            <a href="/settings" class="buttons__item buttons__item--big" type="submit">Настройки</a>
        </div>
    </section>
    <section class="chat">
        <ul class="chat__feed">
            <li class="chat__message chat__message--left">
                <img class="chat-preview__image" src="/icon.svg" alt="">
                <p class="chat__text">{{ fullMessage }}</p>
            </li>
            <li class="chat__message chat__message--right">
                <img class="chat-preview__image" src="/icon.svg" alt="">
                <p class="chat__text">B частности, глубокий уровень погружения создаёт предпосылки для новых принципов формирования материально-технической и кадровой базы. Господа, перспективное планирование обеспечивает актуальность кластеризации усилий. Принимая во внимание показатели успешности, курс на социально-ориентированный национальный проект способствует повышению качества глубокомысленных рассуждений.</p>
            </li>
            <li class="chat__message chat__message--left">
                <img class="chat-preview__image" src="/icon.svg" alt="">
                <p class="chat__text">B частности, глубокий уровень погружения создаёт предпосылки для новых принципов формирования материально-технической и кадровой базы. Господа, перспективное планирование обеспечивает актуальность кластеризации усилий. Принимая во внимание показатели успешности, курс на социально-ориентированный национальный проект способствует повышению качества глубокомысленных рассуждений.</p>
            </li>
        </ul>
        <textarea type="text" placeholder="Писать сюда..." class="input chat__input" name="message"></textarea>
    </section>
</main>
`,e=`.chat-preview{display:flex;flex-direction:row;align-items:center;font-family:Inter,sans-serif;padding:5px}.chat-preview:hover{background-color:var(--orange);cursor:pointer}.chat-preview__image{width:50px;height:50px;border-radius:50%;object-fit:cover;object-position:50% 50%}.chat-preview__container{position:relative;width:337px;height:100vh;background-color:var(--bg-color);display:flex;flex-direction:column}.chat-preview__text{font-style:normal;font-weight:700;font-size:15px;margin:0}.chat-preview__text--title{margin-bottom:12px}.chat-preview__right-side{margin-left:10px}.chat-preview__list{padding-left:0}.input{margin-top:18px;margin-bottom:16px;width:263px;height:28px;border-radius:15px;border-width:0;padding-left:10px}.input:focus{outline:1px solid black}.search__wrapper{display:flex;flex-direction:row;align-items:center}.sandwich__wrapper{position:relative;width:30px;height:24px;margin-left:15px;margin-right:10px;cursor:pointer}.sandwich,.sandwich:after,.sandwich:before{display:block;background-color:var(--black);position:absolute;top:50%;height:4px;width:30px;transform:translateY(-50%);border-radius:2px}.sandwich:after{content:"";margin-top:-8px}.sandwich:before{content:"";margin-top:8px}.body{display:flex;flex-direction:row;width:100%}.chat{position:relative;flex-grow:1;padding-bottom:90px;display:flex;padding-right:40px}.chat__input{background-color:var(--bg-color);min-height:45px;position:absolute;bottom:25px;width:90%;left:50%;transform:translate(-50%);box-sizing:border-box;resize:none;overflow:hidden;margin-bottom:0;padding-top:14px}.chat__feed{display:flex;flex-direction:column;justify-content:flex-end;list-style-type:none;margin-bottom:0;flex-grow:1}.chat__text{margin-top:0;background-color:var(--bg-color);padding:20px 10px 20px 20px;border-radius:15px}.chat__message{width:400px;display:flex;gap:5px}.chat__message--left{align-self:flex-start;flex-direction:row}.chat__message--right{align-self:flex-end;flex-direction:row-reverse}.buttons{width:100%;justify-content:center;position:absolute;bottom:25px}.buttons__item{height:45px;line-height:45px}
`;class t extends a{constructor(i={}){super("chat-component",{fullMessage:"Полное сообщение",message:"Последнее сообщение из ...",events:i},s,e),t._style=e}}export{t as ChatComponent};
