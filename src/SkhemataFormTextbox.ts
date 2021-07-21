import { html, property } from '@skhemata/skhemata-base';
import {
  faExclamationTriangle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@riovir/wc-fontawesome';
import { SkhemataFormInput } from './SkhemataFormInput';
import validator from './validator/index';

export class SkhemataFormTextbox extends SkhemataFormInput {
  @property({ type: Number }) minlength = -1;

  @property({ type: Number }) maxlength = -1;

  @property({ type: Boolean }) submitOnEnter = false;

  @property({ type: String }) type = 'text';

  static get scopedElements() {
    return {
      'fa-icon': FontAwesomeIcon,
    };
  }

  constructor() {
    super();
    this.value = '';
  }

  validate() {
    this.helpClass = '';
    if (
      (this.minlength !== -1 && this.value.length < this.minlength) ||
      (this.maxlength !== -1 && this.value.length > this.maxlength) ||
      (this.required && this.value.length < 1) ||
      (this.type === 'email' && !validator.isEmail(this.value))
    ) {
      if (this.required && this.value.length < 1) {
        this.errorMessage = this.getStr('formErrorRequired');
      } else if (this.minlength !== -1 && this.value.length < this.minlength) {
        this.errorMessage = this.getStr('formErrorMinlength');
      } else if (this.maxlength !== -1 && this.value.length > this.maxlength) {
        this.errorMessage = this.getStr('formErrorMaxlength');
      } else if (this.type === 'email' && !validator.isEmail(this.value)) {
        this.errorMessage = this.getStr('formErrorEmail');
      }
      this.valid = false;
      this.helpClass = 'is-danger';
      this.requestUpdate();
    }

    this.dispatchEvent(
      new CustomEvent('is-valid', {
        detail: { valid: this.valid },
        bubbles: true,
        composed: true,
      })
    );
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
    const faTriangleIcon = html`
      <span class="icon is-small is-right">
        <fa-icon .icon=${faExclamationTriangle}></fa-icon>
      </span>
    `;

    const faSearchIcon = html`
      <span class="icon is-small is-right">
        <fa-icon .icon=${faSearch}></fa-icon>
      </span>
    `;

    let inputIcon = this.type === 'search' ? faSearchIcon : null;
    inputIcon = this.valid ? inputIcon : faTriangleIcon;

    const field = html`
      <div class="field">
        ${this.label && !this.horizontal
          ? html`<label class="label">${this.label}</label>`
          : null}
        <div
          class="control ${!this.valid || this.type === 'search'
            ? 'has-icons-right'
            : ''}"
        >
          ${this.description && !this.horizontal
            ? html`<p>${this.description}</p>`
            : null}
          <input
            class="input ${this.valid ? `` : `is-danger`}"
            name="${this.name}"
            type=${this.type === 'password' ? 'password' : 'text'}
            placeholder="${this.placeholder}"
            @keydown=${this.handleKeydown}
            @input=${this.handleInput}
            .value=${this.value}
          />
          ${inputIcon}
        </div>
        ${!this.valid
          ? html`<p class="help ${this.helpClass}">${this.errorMessage}</p>`
          : ``}
      </div>
    `;

    const horizontalFieldLabel = html`
      <div class="field-label column is-one-quarter" style="text-align: left">
        ${this.label ? html`<label class="label">${this.label}</label>` : null}
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
