import { Component, Host, h, Prop, Element, State } from '@stencil/core';

@Component({
  tag: 'error-label-group',
  shadow: false,
})
export class ErrorLabelGroup {

  @Element() el;

  @Prop() for: string;

  @Prop() on: string;

  @Prop() template: string;

  @State() hasError = false;

  connectedCallback() {
    if (this.template) {
      const template = document.getElementById(this.template) as HTMLTemplateElement;
      const clonedContent = template.content.cloneNode(true);
      this.el.appendChild(clonedContent);
    }
  }
  
  render() {
    return (
      <Host hidden="true">
        <slot></slot>
      </Host>
    );
  }

}
