import { html, css, CSSResult, property } from '@skhemata/skhemata-base';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@riovir/wc-fontawesome';
import { SkhemataFormInput } from './SkhemataFormInput';

export class SkhemataFormDropdown extends SkhemataFormInput {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      css`
        .field {
          margin-bottom: 1rem;
        }

        ::slotted(*),
        .placeholder {
          text-align: left;
          padding: 0.5rem 0rem 0.5rem 1rem;
          white-space: nowrap;
        }
        ::slotted(*:hover),
        .placeholder:hover {
          background-color: whitesmoke;
          color: rgb(10, 10, 10);
          cursor: pointer;
        }
        .dropdown,
        .dropdown-trigger,
        .dropdown button {
          width: 100%;
        }
        .dropdown button span {
          margin-right: auto;
        }
        .dropdown .button {
          color: #d0d0d0;
        }
      `,
    ];
  }

  static get scopedElements() {
    return {
      'fa-icon': FontAwesomeIcon,
    };
  }

  @property({ type: Boolean }) horizontal = false;

  @property({ type: String }) description = '';

  @property({ type: String }) selected = '';

  @property({ type: String }) label = '';

  @property({ type: Boolean }) menuOpen = false;

  @property({ type: Boolean }) required = false;

  @property({ type: String }) name = 'name';

  @property({ type: String }) placeholder = 'Select One';

  @property({ type: String }) errorMessage = 'Select one';

  @property({ type: Boolean }) submitOnSelect = false;

  @property({ type: Boolean }) valid = true;

  @property({ type: String }) helpClass = '';

  reset() {
    this.clearError();
    this.setDefaultValue();
  }

  validate() {
    this.helpClass = '';
    if (this.required && (!this.value || this.value.length < 1)) {
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

  clearError() {
    this.helpClass = '';
    this.valid = true;
    this.requestUpdate();
  }

  setDefaultValue(value?: string) {
    const slot: any = this.shadowRoot?.querySelector(
      'slot:not([name="placeholder"])'
    );
    const childNodes = slot?.assignedNodes({ flatten: true });
    const children = childNodes
      ? Array.prototype.filter.call(
          childNodes,
          node => node.nodeType === Node.ELEMENT_NODE
        )
      : [];

    if (children && children.length > 0 && !this.placeholder) {
      this.placeholder = '';
      if (value) {
        const initialOption = children.filter(
          child => child.value == value
        )[0];
        this.value = initialOption?.value;
        this.selected = initialOption?.innerHTML;
      } else {
        this.selected = children[0].innerHTML;
        this.value = children[0].value;
      }
    } else if (value) {
      const initialOption = children.filter(child => child.value == value)[0];
      this.value = initialOption?.value;
      this.selected = initialOption?.innerHTML;
    } else {
      this.selected = this.placeholder || '';
      this.value = '';
    }
    this.requestUpdate();
  }

  async firstUpdated() {
    this.setDefaultValue(this.value);
    await super.firstUpdated();

  }

  handleKeydown(event: any) {
    if (event.keyCode === '13') {
      if (!event.target.value) {
        this.reset();
      } else {
        this.handleSelectValue(event);
      }
    }
  }

  handleSelectValue(event: any) {
    this.clearError();
    this.selected = event.target.innerHTML;
    this.value = event.target.value;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.requestUpdate();
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
          <div
            class="dropdown ${this.menuOpen ? 'is-active' : ''}"
            @click=${this.toggleMenu}
            @keydown=${(event: any) => {
              if (event.keyCode === '13') this.toggleMenu();
            }}
          >
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>${this.selected}</span>
                <span class="icon is-small">
                  <fa-icon .icon=${faAngleDown}></fa-icon>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                ${this.placeholder
                  ? html`<option
                      class="placeholder"
                      @click=${this.reset}
                      @keydown=${this.handleKeydown}
                    >
                      ${this.placeholder}
                    </option>`
                  : ``}
                <slot
                  @click=${this.handleSelectValue}
                  @keydown=${this.handleKeydown}
                ></slot>
              </div>
            </div>
          </div>
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
