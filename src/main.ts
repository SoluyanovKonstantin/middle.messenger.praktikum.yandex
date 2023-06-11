import './style.css';

function setTemplateToPage(template: {template:string, style: string}) {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = template.template;
  var styleSheet = document.createElement("style");
  styleSheet.setAttribute('id', 'forComponent')
  styleSheet.innerText = template.style;
  document.head.appendChild(styleSheet);
}

if (document.URL.includes('registration')) {
  import('./pages/registration/registration').then(page => {
    setTemplateToPage(page);
    console.log((window as any).foo);
  })
} else if (document.URL.includes('auth')) {
  import('./pages/auth/auth').then(page => {
    setTemplateToPage(page);
  })
} else if (document.URL.includes('chat')) {
  import('./pages/chats/chat').then(page => {
    setTemplateToPage(page);
  })
} else if (document.URL.includes('error')) {
  import('./pages/error/error').then(page => {
    setTemplateToPage(page);
  })
} else {
  window.location.href = '/auth';
}
