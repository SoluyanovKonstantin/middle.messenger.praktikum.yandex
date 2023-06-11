import './style.css';

function setTemplateToPage(template: {template:string, style: string}) {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = template.template;
  var styleSheet = document.createElement("style");
  styleSheet.setAttribute('id', 'forComponent')
  styleSheet.innerText = template.style;
  document.head.appendChild(styleSheet);
}

if (document.URL.includes('registration')) {
  import('./components/registration/registration').then(page => {
    setTemplateToPage(page);
    console.log((window as any).foo);
  })
}

if (document.URL.includes('auth')) {
  import('./components/auth/auth').then(page => {
    setTemplateToPage(page);
  })
}

if (document.URL.includes('chat')) {
  import('./components/chats/chat').then(page => {
    setTemplateToPage(page);
  })
}
