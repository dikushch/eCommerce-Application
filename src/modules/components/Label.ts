import BaseComponent from './BaseComponent';

export default class Label extends BaseComponent<HTMLButtonElement> {
  constructor(props: {
    forStr: string;
    text?: string;
    id?: string;
    classes?: string[];
  }) {
    super({ tag: 'label', text: props.text, classes: props.classes });
    const { forStr, id } = props;
    this.setAttribute('for', forStr);
    if (id) {
      this.setAttribute('id', id);
    }
  }
}
