import './style.css';
import router from '../utils/router';
import { RegistrationComponent } from './pages/registration/registration';
import { AuthComponent } from './pages/auth/auth';
import { ChatComponent } from './pages/chats/chat';
import { ErrorComponent } from './pages/error/error';
import { SettingsComponent } from './pages/settings/settings';

router
    .use('', AuthComponent)
    .use('/sign-up', RegistrationComponent)
    .use('/auth', AuthComponent)
    .use('/messenger', ChatComponent)
    .use('/error', ErrorComponent)
    .use('/settings', SettingsComponent)
    .start();
