import BaseComponent from '../components/BaseComponent';
import AboutCard from '../components/AboutCard';

export default class AboutPage extends BaseComponent {
  constructor() {
    super({ tag: 'section', classes: ['about', 'container'] });

    const textLogoContainer = new BaseComponent({
      tag: 'div',
      classes: ['text-logo-container'],
    });

    const textContainer = new BaseComponent({
      tag: 'div',
      classes: ['text-container'],
    });

    const greetingText = new BaseComponent({
      tag: 'p',
      text: 'Hey!',
    });

    const descriptionText = new BaseComponent({
      tag: 'p',
      text: 'We are students of an awesome school - RSSchool',
    });

    const teamText = new BaseComponent({
      tag: 'p',
      text: 'This is our development team:',
    });

    const logoElement = new BaseComponent({
      tag: 'a',
      classes: ['rs-logo'],
    });

    logoElement.setAttribute('alt', 'RSSchool logo');
    logoElement.setAttribute('href', 'https://rs.school/');
    logoElement.setAttribute('target', '_blank');

    textContainer.append(greetingText);
    textContainer.append(descriptionText);
    textContainer.append(teamText);

    textLogoContainer.append(textContainer);
    textLogoContainer.append(logoElement);

    const cardsContainer = new BaseComponent({
      tag: 'div',
      classes: ['cards-container'],
    });

    const aboutCard = new AboutCard({
      name: 'Dmitrii Kushchenko',
      githubUrl: 'https://github.com/dikushch',
      role: 'developer',
      school: 'Student of the RSSchool',
      works: ['login page', 'catalog page', 'work with Api'],
    });

    const aboutCard2 = new AboutCard({
      name: 'Dzmitry Boris',
      githubUrl: 'https://github.com/BorisDmitriy',
      role: 'developer',
      school: 'Student of the RSSchool',
      works: ['register page', 'profile page', 'cart page'],
    });

    const aboutCard3 = new AboutCard({
      name: 'Jamol Kenjaev',
      githubUrl: 'https://github.com/Kenjaeff',
      role: 'developer',
      school: 'Student of the RSSchool',
      works: ['main page', 'product page', 'about page'],
    });

    cardsContainer.append(aboutCard);
    cardsContainer.append(aboutCard2);
    cardsContainer.append(aboutCard3);

    this.append(textLogoContainer);
    // this.append(textContainer);
    this.append(cardsContainer);
  }
}
