import { html, property } from '@skhemata/skhemata-base';
import { SkhemataFormInput } from './SkhemataFormInput';

export class SkhemataFormCheckbox extends SkhemataFormInput {
  @property({ type: Boolean }) checked: boolean = false;

  constructor() {
    super();
    this.value = false;
  }

  reset() {
    this.clearError();
    this.checked = false;
    this.value = false;
  }

  validate() {
    this.helpClass = '';
    if (this.required && this.checked === false) {
      this.valid = false;
      this.helpClass = 'is-danger';
      this.errorMessage = this.getStr('formErrorRequired');
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

  handleClick(event: any) {
    this.clearError();
    this.checked = event.target.checked;
    this.value = event.target.checked;
  }

  updated() {
    const checkbox = this.shadowRoot.querySelector('[type=checkbox]');
    checkbox['checked'] = this.value;
  }

  render() {
    const field = html`
      <div class="field">
        ${
          this.label && !this.horizontal
            ? html`<label class="label">${this.label}</label>`
            : null
        }
          ${
            this.description && !this.horizontal
              ? html`<p>${this.description}</p>`
              : null
          }
          <input type="checkbox" @click=${this.handleClick}/>
          <slot></slot>
        </label>
        ${
          !this.valid
            ? html`<p class="help ${this.helpClass}">${this.errorMessage}</p>`
            : ``
        }
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
