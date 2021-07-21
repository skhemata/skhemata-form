import {
  css,
  CSSResult,
  SkhemataBase,
  property,
  unsafeHTML,
} from '@skhemata/skhemata-base';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export abstract class SkhemataFormInput extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      css`
        .field {
          margin-bottom: 1rem;
        },
      `,
    ];
  }

  private _value: any = null;

  @property({ type: Object })
  faTriangle: any = unsafeHTML(
    icon(faExclamationTriangle, {
      transform: {
        size: 7,
      },
    }).html[0]
  );

  @property({ type: String, reflect: true })
  @property({ type: File, reflect: true })
  @property({ type: Boolean, reflect: true })
  get value() {
    return this._value;
  }

  set value(value: any) {
    const oldValue = this._value;
    this._value = value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          name: this.name,
          value,
        },
      })
    );
    this.requestUpdate('value', oldValue);
  }

  @property({ type: String }) label = '';

  @property({ type: Boolean }) horizontal = false;

  @property({ type: String }) description = '';

  @property({ type: Boolean }) required = false;

  @property({ type: String }) name = '';

  @property({ type: String }) placeholder = '';

  @property({ type: String }) errorMessage = '';

  @property({ type: Boolean }) valid = true;

  @property({ type: String }) helpClass = '';

  @property({ type: Object }) translationData = {
    eng: {
      formErrorMinlength: 'Text must be longer',
      formErrorMaxlength: 'Text must be shorter',
      formErrorEmail: 'Not a valid email',
      formErrorRequired: 'This is required',
    },
  };

  constructor() {
    super();
    this.addEventListener('validate', this.validate);
    this.addEventListener('reset', this.reset);
  }

  async firstUpdated() {
    super.firstUpdated();
  }

  reset() {
    this.clearError();
    this.setAttribute('value', '');
  }

  validate() {
    if (this.required && !this.value) {
      this.valid = false;
      this.requestUpdate();
    }
  }

  clearError() {
    this.helpClass = '';
    this.valid = true;
    this.requestUpdate();
  }
}
