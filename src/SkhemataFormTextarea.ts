import { html, css, CSSResult, property } from '@skhemata/skhemata-base';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@riovir/wc-fontawesome';
import { SkhemataFormInput } from './SkhemataFormInput';

export class SkhemataFormTextarea extends SkhemataFormInput {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      css`
        .field {
          margin-bottom: 1rem;
        }
      `,
    ];
  }

  static get scopedElements() {
    return {
      'fa-icon': FontAwesomeIcon,
    };
  }

  @property({ type: String }) label = '';

  @property({ type: String }) description = '';

  @property({ type: Boolean }) horizontal = false;

  @property({ type: Number }) rows = 4;

  @property({ type: Number }) minlength = -1;

  @property({ type: Number }) maxlength = -1;

  @property({ type: Boolean }) required = false;

  @property({ type: String }) name = 'name';

  @property({ type: String }) placeholder = '';

  @property({ type: String }) errorMessage = 'Text is invalid';

  @property({ type: Boolean }) submitOnEnter = false;

  @property({ type: Boolean }) valid = true;

  @property({ type: String }) helpClass = '';

  reset() {
    this.clearError();
    this.setAttribute('value', '');
  }

  validate() {
    this.helpClass = '';
    if (
      (this.minlength !== -1 && this.value.length < this.minlength) ||
      (this.maxlength !== -1 && this.value.length > this.maxlength) ||
      (this.required && this.value.length < 1)
    ) {
      this.valid = false;
      this.helpClass = 'is-danger';
      this.errorMessage = 'text is invalid';
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

  clearError() {
    this.helpClass = '';
    this.errorMessage = '';
    this.valid = true;
    this.requestUpdate();
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
        <div class="control ${this.valid ? '' : 'has-icons-right'}">
          ${this.description && !this.horizontal
            ? html`<p>${this.description}</p>`
            : null}
          <textarea
            class="textarea ${this.valid ? `` : `is-danger`}"
            name="${this.name}"
            rows="${this.rows}"
            placeholder="${this.placeholder}"
            @keydown=${this.handleKeydown}
            @input=${this.handleInput}
            .value=${this.value}
          ></textarea>
          ${!this.valid
            ? html` <span class="icon is-small is-right">
                <fa-icon .icon=${faExclamationTriangle}></fa-icon>
              </span>`
            : null}
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
