import Header from './modules/components/Header';
import RegistrationPage from './modules/pages/RegPage';
import './styles.scss';

const headPage = new Header();
const regPage = new RegistrationPage();

document.body.append(headPage.getNode());
document.body.append(regPage.getNode());
