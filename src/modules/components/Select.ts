import BaseComponent from './BaseComponent';

export default class Select extends BaseComponent<HTMLSelectElement> {
  constructor(
    options: { value: string; text: string }[],
    props?: { classes?: string[]; id?: string },
  ) {
    super({ tag: 'select', classes: props?.classes });
    const id = props?.id;
    if (id) {
      this.setAttribute('id', id);
    }

    // Add provided options to the select element
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.text;
      this.node.appendChild(optionElement);
    });
  }

  // Method to get the selected value
  getValue(): string {
    return this.node.value;
  }

  // Method to set the selected value
  setValue(value: string): void {
    this.node.value = value;
  }

  // Method to add an option to the selector
  addOption(option: { value: string; text: string }): void {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    this.node.appendChild(optionElement);
  }

  // Method to remove an option from the selector by value
  removeOption(value: string): void {
    Array.from(this.node.options).forEach((option) => {
      if (option.value === value) {
        option.remove();
      }
    });
  }

  disable(): void {
    this.node.disabled = true;
  }

  enable(): void {
    this.node.disabled = false;
  }
}
