import { html, property, render, css, CSSResult, unsafeHTML } from '@skhemata/skhemata-base';
import { SkhemataFormInput } from './SkhemataFormInput';
import { SkhemataFormTextbox } from './SkhemataFormTextbox';
import { SkhemataFormTextarea } from './SkhemataFormTextarea';
import { SkhemataFormDropdown } from './SkhemataFormDropdown';

import { SkhemataFormDropzone } from './SkhemataFormDropzone';
import { SkhemataFormButton } from './SkhemataFormButton';
import { SkhemataFormQuill } from './SkhemataFormQuill';
import { SkhemataFormCheckbox } from './SkhemataFormCheckbox';
import { SkhemataFormToggle } from './SkhemataFormToggle';


/**
 * Repeater component that repeats inputs passed in.
 */
export class SkhemataFormRepeat extends SkhemataFormInput {
  fieldNodes = [];
  rowData = [];
  @property({ type: String }) rowName = "";
  @property({ type: String }) addRowButtonText = "Add Row";
  @property({ type: String }) removeRowButtonText = "Remove Row";
  @property({ type: Number }) rowLimit = 10;
  @property({ type: Array }) repeatedFields = [];

  allowedComponents = {
    textbox: 'skhemata-form-textbox', 
    textarea: 'skhemata-form-textarea', 
    dropdown: 'skhemata-form-dropdown', 
    dropzone: 'skhemata-form-dropzone', 
    button: 'skhemata-form-button', 
    quill: 'skhemata-form-quill', 
    checkbox: 'skhemata-form-checkbox', 
    toggle: 'skhemata-form-toggle', 
  };

  static get scopedElements(){
    return {
      'skhemata-form-textbox': SkhemataFormTextbox,
      'skhemata-form-textarea': SkhemataFormTextarea,
      'skhemata-form-dropdown': SkhemataFormDropdown,
      'skhemata-form-dropzone': SkhemataFormDropzone,
      'skhemata-form-button': SkhemataFormButton,
      'skhemata-form-quill': SkhemataFormQuill,
      'skhemata-form-checkbox': SkhemataFormCheckbox,
      'skhemata-form-toggle': SkhemataFormToggle,
    }
  }

  constructor() {
    super();
    this.value = false;

    this.addEventListener('update-data', (e: any) => {
      this.rowData = e.detail.data[this.name];
      console.log(this.rowData);
    });
  }

  async firstUpdated() {
    await super.firstUpdated(); 
  }

  reset() {
    this.clearError();
    this.value = false;
  }

  validate() {
    this.helpClass = '';
    if (this.required) {
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


  /**
   * Appends a new row of inputs to the end of the component
   * 
   * Will need additional refactoring when a better method is found for rendering these
   */
  addRow() {
    this.rowData.push({});
  
    this.requestUpdate();
  }

  
  updated() {
    const currentNodes = this.shadowRoot.querySelectorAll('[skhemata-input]');

    if(currentNodes.length > this.fieldNodes.length) {
      // Filter out previous nodes from currentNodes
      const newNodes = Array.from(currentNodes).filter(node => !this.fieldNodes.includes(node));
      /**
       * Dispatch the add-row event
       * add-row attaches events to newly created inputs
      */
      this.dispatchEvent(
        new CustomEvent('add-row', {
          detail:{
            name: this.name,
            rowIndex: this.rowData.length - 1,
            nodes: newNodes
          },
          composed: true,
          bubbles: true,
        })
      );
    }

    this.fieldNodes = Array.from(currentNodes);
  }

  /**
   * Removes row based on the index of the row
   */
  removeRow(event: any) {
    console.log(event.originalTarget.parentNode.dataset.rowNum);
    // this.rowData.splice(index, 1);
    // console.log(this.rowData);

    this.dispatchEvent(
      new CustomEvent('remove-row', {
        detail:{
          name: this.name,
          rowIndex: event.originalTarget.parentNode.dataset.rowNum
        },
        composed: true,
        bubbles: true,
      })
    );

    this.requestUpdate();
  }

  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      css`
      h3 {
        font-size: 1.5rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        font-weight: bold;
    }`
    ];
  }

  renderComponent (name: String, attributes: Object, value: any = null) {
    const templateString = `<${name} ${Object.keys(attributes).map(key => {
      return `${key}=${attributes[key]}`;
    }).join(' ')} value=${value} skhemata-input></${name}>`;
    return html`${unsafeHTML(templateString)}`;
  }

  render() {
    const field = html`
      <div class="repeater-field field">
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

        ${
          this.rowData.map((data, i) => html`<div data-row-num=${i}>
            <h3>${this.rowName} #${i + 1}</h3>
          ${
            this.repeatedFields.map( (field, j) =>  
              html`${field.type in this.allowedComponents ? this.renderComponent(this.allowedComponents[field.type], field.attributes, data[field.attributes.name]) : ''}`
            )
          }<button class="button is-danger" @click=${(e) => this.removeRow(e)}>${this.removeRowButtonText}</button><hr></div>`)
        }

        ${
          this.rowData.length < this.rowLimit ?
            html`<button class="button is-success" @click=${this.addRow}>${this.addRowButtonText}</button>`
            : ''
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
