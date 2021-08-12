import { html, property, css, CSSResult, } from '@skhemata/skhemata-base';
import { SkhemataFormInput } from './SkhemataFormInput';

export class SkhemataFormToggle extends SkhemataFormInput {
  @property({ type: Boolean }) checked: boolean = false;
  @property({ type: String }) onText = false;
  @property({ type: String }) offText = false;


  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      css`
      input[type=checkbox]{
        height: 0;
        width: 0;
        visibility: hidden;
      }
      
      label {
        cursor: pointer;
        text-indent: -9999px;
        width: 50px;
        height: 24px;
        background: grey;
        display: inline-block;
        border-radius: 100px;
        position: relative;
      }
      
      label:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 90px;
        transition: 0.3s;
      }
      
      label.checked {
        background: #bada55;
      }
      
      label.checked:after {
        left: calc(100% - 2px);
        transform: translateX(-100%);
      }
      .toggle-container {
        display:flex;
        align-items:center;
      }

      .toggle-text {
        margin-left: 5px;
      }
      `,
    ];
  }

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

  render() {
    const field = html`
      <div class="field">
        ${
          this.label && !this.horizontal
            ? html`<p class="label">${this.label}</p>`
            : null
        }
        ${
          this.description && !this.horizontal
            ? html`<p>${this.description}</p>`
            : null
        }
        <div class="toggle-container">
          <label class="${this.checked ? 'checked' : ''}">
            <input type="checkbox" @click=${this.handleClick}/>
          </label>
          ${
            this.onText || this.offText ?
            html`<span class="toggle-text">${this.checked ? this.onText : this.offText}</span>` : ''
          }
        </div>
        ${
          !this.valid
            ? html`<p class="help ${this.helpClass}">${this.errorMessage}</p>`
            : ``
        }
      </div>
    `;

    const horizontalFieldLabel = html`
      <div class="field-label column is-one-quarter" style="text-align: left">
        ${this.label ? html`<p class="label">${this.label}</p>` : null}
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
