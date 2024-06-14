import BaseComponent from '../components/BaseComponent';
import AboutCard from '../components/AboutCard';

export default class AboutPage extends BaseComponent {
  constructor() {
    super({ tag: 'section', classes: ['about', 'container'] });

    const aboutCard = new AboutCard({
      name: 'Dmitrii Kushchenko',
      githubUrl: 'https://github.com/dikushch',
      role: 'developer',
      school: 'Student of the RSSchool',
      works: ['login page', 'catalog page', 'work with Api'],
    });

    this.append(aboutCard);
  }
}
