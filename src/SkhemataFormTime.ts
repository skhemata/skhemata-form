import { html, property } from '@skhemata/skhemata-base';

import { SkhemataFormInput } from './SkhemataFormInput';

export class SkhemataFormTime extends SkhemataFormInput {
  @property({ type: String }) min = '';

  @property({ type: String }) max = '';

  @property({ type: Boolean }) submitOnEnter = false;

  @property({ type: String }) type = 'text';


  constructor() {
    super();
    this.value = '';
  }

  handleInput(event: any) {
    this.clearError();
    this.setAttribute('value', event.target.value);
  }

  handleKeydown(event: any) {
    this.clearError();
    if (event.keyCode === '13' && this.submitOnEnter) {
      this.validate();
      if (!this.valid) {
        return;
      }
      this.dispatchEvent(new CustomEvent('submit'));
      event.preventDefault();
    }
  }

  render() {

    const field = html`
      <div class="field">
        ${this.label && !this.horizontal
          ? html`<label class="label">${this.label} ${this.required ? html`<span style="color: red">*</span>` : null}</label>`
          : null}
        <div
          class="control"
        >
          ${this.description && !this.horizontal
            ? html`<p>${this.description}</p>`
            : null}
            <input class="input" type="time" min=${this.min} max=${this.max} value=${this.value} @input=${this.handleInput}/>
        </div>
        ${!this.valid
          ? html`<p class="help ${this.helpClass}">${this.errorMessage}</p>`
          : ``}
      </div>
    `;

    const horizontalFieldLabel = html`
      <div class="field-label column is-one-quarter" style="text-align: left">
        ${this.label ? html`<label class="label">${this.label} ${this.required ? html`<span style="color: red">*</span>` : null}</label>` : null}
        ${this.description ? html`<p>${this.description}</p>` : null}
      </div>
    `;

    const horizontalField = html`
      <div class="field is-horizontal">
        ${this.label || this.description ? horizontalFieldLabel : null}
        <div class="field-body column">${field}</div>
      </div>
    `;

    return this.horizontal ? horizontalField : field;
  }
}
