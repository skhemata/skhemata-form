import { html, css, CSSResult, property } from '@skhemata/skhemata-base';
import { Dropzone } from '@spectrum-web-components/dropzone';
import { IllustratedMessage } from '@spectrum-web-components/illustrated-message';

import { SkhemataFormInput } from './SkhemataFormInput';

export class SkhemataFormDropzone extends SkhemataFormInput {
  
  @property({type: String }) imageurl = "";

  static get scopedElements() {
    return {
      'sp-dropzone': Dropzone,
      'sp-message': IllustratedMessage,
    };
  }

  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      css`
        button.dropzone {
          cursor: pointer;
          border: none;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          background: transparent;
        }
    
        #dropzone {
          border: none;
        }
        img {
          max-height: 15rem;
        }
        #sp-message {
          padding: 1rem;
        }
        .description {
          margin-bottom: 1rem;
        }
      `,
    ];
  }

  @property({ type: Object, attribute: false })
  dropzone: any;

  @property({ type: HTMLElement })
  fileInput: any;

  @property({ type: String })
  helpMessage = 'Drag and Drop, or Click to Upload Your File';

  async firstUpdated() {
    this.fileInput = this.shadowRoot?.getElementById('file-input');
  }

  handleClick = () => {
    this.fileInput.click();
  };

  handleFileUpload(e: any) {
    if (e.detail?.dataTransfer?.files) {
      [this.value] = e.detail.dataTransfer.files;
    } else {
      [this.value] = this.fileInput.files;
    }
  }

  render() {
    const field = html`
      <div>
        ${this.label && !this.horizontal
          ? html`<label class="label">${this.label}</label>`
          : null}
        <div>
          ${this.description && !this.horizontal
            ? html`<p class="description">${this.description}</p>`
            : null}
          <div class="message">
            ${this.value || this.imageurl
              ? html`
                  <div class="message-header">
                    ${this.value ? this.value.name : ''}
                    <button
                      class="delete"
                      @click=${() => {
                        this.value = null;
                        this.imageurl = null;
                      }}
                    ></button>
                  </div>
                `
              : null}
            <button class="dropzone" @click=${this.handleClick}>
              <sp-dropzone
                id="dropzone"
                tabindex="0"
                @sp-dropzone-drop=${this.handleFileUpload}
              >
                ${this.value || this.imageurl
                  ? html`<img
                      src=${this.value ? URL.createObjectURL(this.value) : this.imageurl}
                      alt=${this.name}
                    />`
                  : html`
                      <sp-message id="sp-message" heading=${this.helpMessage}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 150 103"
                          width="150"
                          height="103"
                        >
                          <path
                            d="M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z"
                          ></path>
                        </svg>
                      </sp-message>
                    `}
                <input
                  type="file"
                  id="file-input"
                  style="display: none"
                  @change=${this.handleFileUpload}
                />
              </sp-dropzone>
            </button>
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
