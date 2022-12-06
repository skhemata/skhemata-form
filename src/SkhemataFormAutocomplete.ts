import { html, css, CSSResult, property } from '@skhemata/skhemata-base';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@riovir/wc-fontawesome';
import { SkhemataFormInput } from './SkhemataFormInput';

export class SkhemataFormAutocomplete extends SkhemataFormInput {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      css`
        .field {
          margin-bottom: 1rem;
        }
        option {
          text-align: left;
          padding: 0.5rem 0rem 0.5rem 1rem;
          white-space: nowrap;
        }
        option:hover {
          background-color: whitesmoke;
          color: rgb(10, 10, 10);
          cursor: pointer;
        }
        option.is-active {
          background-color: rgb(50, 115, 220);
          color: rgb(255, 255, 255);
        }
        .results.dropdown-content {
          max-height: 15em;
          overflow-y: auto;
        }
        .dropdown,
        .dropdown-trigger,
        .dropdown button {
          width: 100%;
        }
        .dropdown button span {
          margin-right: auto;
        }
        .selected-dropdown {
          color: rgb(54, 54, 54);
        }
        .dropdown .button {
          color: #d0d0d0;
        }
        #dropdown-menu {
          width: 100%;
          padding-top: 0px;
        }
        #dropdown-menu .dropdown-content {
          padding: 0;
        }
        #dropdown-menu .dropdown-content .dropdown-item {
          padding: 5px;
        }
      `,
    ];
  }

  static get scopedElements() {
    return {
      'fa-icon': FontAwesomeIcon,
    };
  }

  @property({ type: String }) description = '';

  @property({ type: String }) selected = '';

  @property({ type: String }) mapValue = '';

  @property({ type: String }) mapLabel = '';

  @property({ type: String }) search = '';

  @property({ type: Array }) results: any = [];

  @property({ type: String }) label = '';

  @property({ type: Boolean }) menuOpen = false;

  @property({ type: Boolean }) required = false;

  @property({ type: String }) name = 'name';

  @property({ type: String }) placeholder = 'Select One';

  @property({ type: String }) errorMessage = 'Select one';

  @property({ type: Boolean }) submitOnSelect = false;

  @property({ type: Boolean }) valid = true;

  @property({ type: String }) helpClass = '';

  private _active: number = 0;

  @property({ type: Boolean, reflect: true })
  get active(): number {
    return this._active;
  }

  set active(value: number) {
    const oldValue = this._active;
    this._active = value;
    this.requestUpdate('active', oldValue);
    this.shadowRoot
      ?.querySelector('.dropdown-item.is-active')
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  reset() {
    this.clearError();
    this.value = '';
    this.selected = '';
    this.results = [];
  }

  validate() {
    this.helpClass = '';
    if (this.required && this.value.length < 1) {
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

  handleKeydown(event: any) {
    if (event.target.value.length < 2) {
      this.reset();
    } else {
      switch (event.keyCode) {
        case 13:
          this.value = this.results[this.active].value;
          this.selected = this.results[this.active].label;
          this.menuOpen = false;
          break;
        case 40:
          this.active =
            this.active < this.results.length - 1
              ? this.active + 1
              : this.active;
          break;
        case 38:
          this.active = this.active > 0 ? this.active - 1 : this.active;
          break;
        default:
          this.active = 0;
      }
    }
  }

  handleInput(event: any) {
    this.clearError();
    this.setAttribute('search', event.target.value);
    if (this.search.length > 2) {
      this.getResults();
    }
  }

  handleSelectValue(selected: string, value: any) {
    this.clearError();
    this.selected = selected;
    this.value = value;
    this.menuOpen = false;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.requestUpdate();
  }

  handleFocusOut() {
    this.toggleMenu();
    this.results = [];
    if (!this.selected) {
      this.search = '';
    }
  }

  getResults() {
    if (this.api?.url) {
      fetch(`${this.api.url}/locale/city/${this.search}`)
        .then(data => data.json())
        .then(results => {
          const mapped =
            this.mapLabel && this.mapValue
              ? results.map((result: any) => ({
                  value: result[this.mapValue],
                  label: result[this.mapLabel],
                }))
              : results;
          this.results = mapped;
          this.requestUpdate();
        });
    }
  }

  async firstUpdated() {
    // document.addEventListener('click', e=>this.clickOffDropdown(e));
  }

  render() {
    const field = html`
      <div class="field">
        ${this.label && !this.horizontal
          ? html`<label class="label">${this.label}</label>`
          : null}
        <div class="control ${this.valid ? '' : 'has-icons-right'}">
          ${this.description && !this.horizontal
            ? html`<p>${this.description}</p>`
            : null}
          <div class="dropdown ${this.menuOpen ? 'is-active' : ''}">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                @click=${this.toggleMenu}
                @keydown=${(event: any) => {
                  if (event.keyCode === '13') this.toggleMenu();
                }}
              >
                <span class="${this.selected ? 'selected-dropdown' : ''}">${this.selected || this.placeholder}</span>
                <span class="icon is-small">
                  <fa-icon .icon=${faAngleDown}></fa-icon>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <div class="control has-icons-right">
                    <input
                      class="input ${this.valid ? `` : `is-danger`}"
                      name="${this.name}"
                      type="text"
                      placeholder=""
                      @input=${this.handleInput}
                      @keydown=${this.handleKeydown}
                      .value=${this.search}
                    />
                    <span class="icon is-small is-right">
                      <fa-icon .icon=${faSearch}></fa-icon>
                    </span>
                  </div>
                </div>
              </div>
              <div class="dropdown-content results">
                ${this.results.map(
                  (result: any, index: number) =>
                    html`
                      <option
                        class="dropdown-item ${index === this.active
                          ? 'is-active'
                          : ''}"
                        value=${result.value}
                        @click=${() =>
                          this.handleSelectValue(result.label, result.value)}
                        @keydown=${(e: any) => {
                          if (e.keyCode === '13')
                            this.handleSelectValue(result.label, result.value);
                        }}
                      >
                        ${result.label}
                      </option>
                    `
                )}
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
