import './style.css';

if (document.URL.includes('registration')) {
  import('./components/registration/registration').then(page => {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = page.template;
    var styleSheet = document.createElement("style");
    styleSheet.setAttribute('id', 'forComponent')
    styleSheet.innerText = page.style;
    document.head.appendChild(styleSheet);
  })
}
