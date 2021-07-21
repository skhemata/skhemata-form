import { html, css, CSSResult, SkhemataBase, property } from '@skhemata/skhemata-base';

export class SkhemataFormButton extends SkhemataBase {
  static get stlyes() {
    return <CSSResult[]>[
      ...super.styles,
      css`
        .field {
          margin-bottom: 1rem;
          display: block;
        },
      `,
    ];
  }

  @property({ type: String }) title = '';

  @property({ type: String }) color = '';

  @property({ type: String }) type = '';

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
        class="button is-fullwidth is-primary"
        style=${this.color ? `background-color: ${this.color}` : ''}
        @click=${this.handleClick}
      >
        ${this.title}
      </button>
    `;
  }
}
