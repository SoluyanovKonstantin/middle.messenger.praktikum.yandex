import './style.css';

function setTemplateToPage(template: { template: string | HTMLElement | undefined; style: string }) {
    const appNode = document.querySelector<HTMLDivElement>('#app');
    if (appNode && typeof template.template === 'string') {
        appNode.innerHTML = template.template;
    } else if (template.template) {
        appNode?.append(template.template);
    }
    const styleSheet = document.createElement('style');
    styleSheet.setAttribute('id', 'forComponent');
    styleSheet.innerText = template.style;
    document.head.appendChild(styleSheet);
}

if (document.URL.includes('registration')) {
    import('./pages/registration/registration').then(({ RegistrationComponent } ) => {
        const component = new RegistrationComponent();
        if (component.getContent()) {
            setTemplateToPage({ template: component.getContent(), style: RegistrationComponent.getStyles() });
        }
    });
} else if (document.URL.includes('auth')) {
    import('./pages/auth/auth').then(( { AuthComponent } ) => {
        const component = new AuthComponent();
        if (component.getContent()) {
            setTemplateToPage({ template: component.getContent(), style: AuthComponent.getStyles() });
        }
    });
} else if (document.URL.includes('chat')) {
    import('./pages/chats/chat').then(({ ChatComponent } ) => {
        const component = new ChatComponent();
        if (component.getContent()) {
            setTemplateToPage({ template: component.getContent(), style: ChatComponent.getStyles() });
        }
    });
} else if (document.URL.includes('error')) {
    import('./pages/error/error').then(({ ErrorComponent } ) => {
        const component = new ErrorComponent();
        if (component.getContent()) {
            setTemplateToPage({ template: component.getContent(), style: ErrorComponent.getStyles() });
        }
    });
} else if (document.URL.includes('settings')) {
    import('./pages/settings/settings').then(({ SettingsComponent } ) => {
        const component = new SettingsComponent();
        if (component.getContent()) {
            setTemplateToPage({ template: component.getContent(), style: SettingsComponent.getStyles() });
        }
    });
} else {
    window.location.href = '/auth';
}
