import { html, css, CSSResult, property } from '@skhemata/skhemata-base';
import { SkhemataEditorQuill } from '@skhemata/skhemata-editor-quill';
import { SkhemataFormInput } from './SkhemataFormInput';

export class SkhemataFormQuill extends SkhemataFormInput {
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
        .message {
          width: max-content;
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

  static get scopedElements() {
    return {
      'sk-quill': SkhemataEditorQuill,
    };
  }

  @property({ type: Object, attribute: false })
  dropzone: any;

  @property({ type: HTMLElement })
  editor: any;

  @property({ type: String })
  helpMessage = '';

  async firstUpdated() {
    await super.firstUpdated();
    this.editor = this?.shadowRoot?.getElementById('editor');
    this.editor.updateComplete.then(() => {
      this.initQuill();
    });
  }

  initQuill() {
    if(this.value) {
      const delta = JSON.parse(this.value)?.ops;
      this.editor.setContents(delta);
    }
    this.editor.quill.on('text-change', () => {
      this.value = JSON.stringify(this.editor.quill.getContents());
      console.log(this.value);
    });
  }

  render() {
    const horizontalFieldLabel = html`
      <div class="field-label column is-one-quarter" style="text-align: left">
        ${this.label ? html`<label class="label">${this.label} ${this.required ? html`<span style="color: red">*</span>` : null}</label>` : null}
        ${this.description ? html`<p>${this.description}</p>` : null}
      </div>
    `;

    const field = html`
      <div class="field  ${this.horizontal ? 'is-horizontal' : ''}">
        ${(this.label || this.description) && this.horizontal ? horizontalFieldLabel : null}
        <div class="field-body column">
          <div class="field">
            ${this.label && !this.horizontal
              ? html`<label class="label">${this.label} ${this.required ? html`<span style="color: red">*</span>` : null}</label>`
              : null}
            <div class="control ${this.valid ? '' : 'has-icons-right'}">
              ${this.description && !this.horizontal
                ? html`<p>${this.description}</p>`
                : null}
              <sk-quill id="editor"></sk-quill>
            </div>
            ${!this.valid
              ? html`<p class="help ${this.helpClass}">${this.errorMessage}</p>`
              : ``}
          </div>
        </div>
      </div>
    `;

    return field;
  }
}
