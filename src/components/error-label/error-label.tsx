import { Component, Host, h, Prop, State, Element } from '@stencil/core';

@Component({
  tag: 'error-label',
  shadow: true,
})
export class ErrorLabel {

  @Element() el: HTMLElement;

  @Prop({
    mutable: true,
    reflect: true
  }) for!: string;

  @Prop() type!: string;

  @Prop({
    mutable: true,
    reflect: true
  }) on: string;

  @State() forTarget: HTMLInputElement;

  @State() hidden: boolean = true;

  @State() parentForm: HTMLFormElement;

  @State() errorLabelGroup: HTMLErrorLabelGroupElement;

  connectedCallback() {
    this.extendErrorLabelGroup();

    this.modifyParentForm();

    if (!this.el.id) {
      this.el.id = `error-label-${this.for}-${this.type}-${this.on}`;
    }

    this.forTarget = document.getElementById(this.for) as HTMLInputElement;
    this.forTarget.setAttribute('aria-errormessage', this.el.id);
    this.validateForTarget = this.validateForTarget.bind(this);
    this.forTarget.addEventListener(this.on, this.validateForTarget);
  }

  disconnectionCallback() {
    this.forTarget.removeEventListener(this.on, this.validateForTarget);
  }

  private modifyParentForm() {
    this.parentForm = this.el.closest('form');
    if (this.parentForm !== null) {
      this.parentForm.noValidate = true;
      this.parentForm.addEventListener('submit', (ev: Event) => {
        if (!this.hidden) {
          ev.preventDefault();
        }
      });
    }
  }

  private extendErrorLabelGroup() {
    this.errorLabelGroup = this.el.closest('error-label-group');

    if (this.errorLabelGroup) {
      this.for ??= this.errorLabelGroup.for;
      this.on ??= this.errorLabelGroup.on;
    }

    this.on ??= 'change'
  }

  private validateForTarget() {
    let hasCustomError;

    if (this.parentForm.dataset.errors && window[this.parentForm.dataset.errors] && window[this.parentForm.dataset.errors][this.type]) {
      hasCustomError = window[this.parentForm.dataset.errors][this.type].handler(this.forTarget);
    }

    this.hidden = (hasCustomError !== undefined) ? !hasCustomError : !this.forTarget.validity[this.type];

    if (!this.hidden) {
      this.forTarget.setAttribute('aria-invalid', (!this.hidden).toString());
      this.forTarget.setCustomValidity(this.type);
      this.errorLabelGroup && (this.errorLabelGroup.hidden = false);

      this.replaceLabelPlaceholders();
    }
  }

  private replaceLabelPlaceholders() {
    const value = this.forTarget.value;
    const valueContainer = this.el.querySelector('.error-value-var');
    valueContainer && (valueContainer.textContent = value);
    this.el.innerHTML = this.el.innerHTML.replace('{{value}}', `<span class="error-value-var">${value}</span>`);

    const lengthContainer = this.el.querySelector('.error-length-var');
    lengthContainer && (lengthContainer.textContent = value.length.toString());
    this.el.innerHTML = this.el.innerHTML.replace('{{length}}', `<span class="error-length-var">${value.length}</span>`);
  }

  render() {
    return (
      <Host hidden={this.hidden}>
        <label
          hidden={this.hidden}
          role="alert"
          aria-role="alert"
        >
          <slot></slot>
        </label>
      </Host>
    );
  }
}
