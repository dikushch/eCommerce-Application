import BaseComponent from './BaseComponent';

export default class AboutCard extends BaseComponent {
  name: string;

  githubUrl: string;

  role: string;

  school: string;

  works: string[];

  constructor(data: {
    name: string;
    githubUrl: string;
    role: string;
    school: string;
    works: string[];
  }) {
    super({ tag: 'div', classes: ['card'] });

    this.name = data.name;
    this.githubUrl = data.githubUrl;
    this.role = data.role;
    this.school = data.school;
    this.works = data.works;

    const nameElement = new BaseComponent({
      tag: 'h2',
      text: this.name,
      classes: ['card-name'],
    });

    const githubElement = new BaseComponent({
      tag: 'a',
      text: 'github',
      classes: ['card-github'],
    });
    githubElement.setAttribute('href', this.githubUrl);
    githubElement.setAttribute('target', '_blank');
    githubElement.setAttribute('rel', 'noopener noreferrer');

    const avatarElement = new BaseComponent({
      tag: 'div',
      classes: ['avatar'],
    });

    const roleElement = new BaseComponent({
      tag: 'p',
      text: this.role,
    });

    const schoolElement = new BaseComponent({
      tag: 'p',
      text: this.school,
    });

    const workTitle = new BaseComponent({
      tag: 'p',
      text: 'my work:',
    });

    const workList = new BaseComponent({ tag: 'ul', classes: ['work-list'] });
    this.works.forEach((work) => {
      const workItem = new BaseComponent({
        tag: 'li',
        text: work,
      });
      workList.append(workItem);
    });

    this.append(nameElement);
    this.append(githubElement);
    this.append(avatarElement);
    this.append(roleElement);
    this.append(schoolElement);
    this.append(workTitle);
    this.append(workList);
  }
}
