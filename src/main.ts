import './style.css';
import router from '../utils/router';
import { RegistrationComponent } from './pages/registration/registration';
import { AuthComponent } from './pages/auth/auth';
import { ChatComponent } from './pages/chats/chat';
import { ErrorComponent } from './pages/error/error';
import { SettingsComponent } from './pages/settings/settings';

router
    .use('/', RegistrationComponent)
    .use('/registration', RegistrationComponent)
    .use('/auth', AuthComponent)
    .use('/chat', ChatComponent)
    .use('/error', ErrorComponent)
    .use('/settings', SettingsComponent)
    .start();
