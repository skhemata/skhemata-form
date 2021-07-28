import { html, css, CSSResult, SkhemataBase, property } from '@skhemata/skhemata-base';

export class SkhemataFormButton extends SkhemataBase {
  static get stlyes() {
    return <CSSResult[]>[
      ...super.styles,
      css`
        .field {
          margin-bottom: 1rem;
          display: block;
        }
      `,
    ];
  }

  @property({ type: String }) title = '';

  @property({ type: String }) type = '';

  @property({ type: Boolean }) isFullwidth = false;

  @property({ type: Boolean }) valid = true;

  @property({ type: String }) helpClass = '';

  handleClick() {
    if (this.type === 'submit') {
      this.dispatchEvent(new CustomEvent('submit'));
    } else {
      this.dispatchEvent(new Event('click'));
    }
  }

  render() {
    return html`
      <button
        class="button ${this.isFullwidth ? 'is-fullwidth' : '' } is-primary"
        style="background-color: var(--skhemata-form-button-background-color); color: var(--skhemata-form-button-text-color, #fff);"
        @click=${this.handleClick}
      >
        ${this.title}
      </button>
    `;
  }
}
