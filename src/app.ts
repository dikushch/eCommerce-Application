import RegistrationPage from './modules/pages/RegPage';
import './styles.scss';

const regPage = new RegistrationPage();

document.body.append(regPage.getNode());
