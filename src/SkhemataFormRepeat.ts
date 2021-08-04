import { html, property, render, css, CSSResult } from '@skhemata/skhemata-base';
import { SkhemataFormInput } from './SkhemataFormInput';
import {repeat} from 'lit-html/directives/repeat';

/**
 * Repeater component that repeats inputs passed in.
 */
export class SkhemataFormRepeat extends SkhemataFormInput {
  @property({ type: Array }) fieldNodes = [];
  // @property({ type: Array }) rows = [];
  @property({ type: String }) rowName = "";

  @property({ type: String }) addRowButtonText = "Add Row";
  @property({ type: String }) removeRowButtonText = "Remove Row";

  @property({ type: Number }) rowCount = 0;
  @property({ type: Number }) rowLimit = 10;


  get _slottedChildren() {
    const slot = this.shadowRoot.querySelector('slot');
    const childNodes = slot.assignedElements({flatten: true});
    return Array.prototype.filter.call(childNodes, (node) => node.nodeType == Node.ELEMENT_NODE && (node.nodeName !== 'SKHEMATA-FORM-REPEAT'));
  }

  constructor() {
    super();
    this.value = false;
  }

  async firstUpdated() {
    await super.firstUpdated(); 
    this.fieldNodes = this._slottedChildren;
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

    // Query for current repeater field and generate the nodes
    const mainField = this.shadowRoot.querySelector('.repeater-field');
    const clonedNodes = this.fieldNodes.map(node => node.cloneNode(true));
    let row = document.createElement('div');
  
    // Generate the index based on the amount of rows
    row.setAttribute('data-row-index', `${this.rowCount}`);

    // const rowTitle = `${this.rowName}-${this.rowCount + 1}`;
    // row.setAttribute('data-row-title', rowTitle);

    // Set the title markup for the row
    const rowTitle = document.createElement('h3');
    rowTitle.classList.add('row-title')
    rowTitle.innerHTML = `${this.rowName} #${this.rowCount + 1}`

    // Generate the remaining content to be appended at the end
    const rowContent = html`${
          !this.valid
            ? html`<p class="help ${this.helpClass}">${this.errorMessage}</p>`
            : ``
        }
        <button class="button is-danger" @click="${this.removeRow}">${this.removeRowButtonText}</button>
        <hr>
        `;

    row.append(rowTitle);

    for (let i = 0; i< clonedNodes.length; i++){
      row.append(clonedNodes[i]);
    }
    render(rowContent, row);

    mainField.appendChild(row);
    // render(row, <HTMLElement>mainField);

    this.requestUpdate();

    /**
     * Dispatch the add-row event
     * add-row attaches events to newly created inputs
     */
    this.dispatchEvent(
      new CustomEvent('add-row', {
        detail:{
          name: this.name,
          rowIndex: this.rowCount,
          nodes: clonedNodes
        },
        composed: true,
        bubbles: true,
      })
    );

    this.rowCount ++;
  }

  /**
   * Removes row based on the index of the row

   */
  removeRow = (e: any) => {
    const parentElement = e.originalTarget.parentElement;
    this.rowCount--;


    this.dispatchEvent(
      new CustomEvent('remove-row', {
        detail:{
          name: this.name,
          rowName: parentElement.dataset.rowTitle,
          rowIndex: parentElement.dataset.rowIndex
        },
        composed: true,
        bubbles: true,
      })
    );

    parentElement.remove();

    // reformat all row titles
    const allInputs = this.shadowRoot.querySelectorAll('[data-row-title]');
    allInputs.forEach((input, i) => {
      input.setAttribute('data-row-index', `${i}`);
      const rowTitle = input.querySelector('.row-title');
      rowTitle ? rowTitle.innerHTML = `${this.rowName} #${i+1}` : '';
    });

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
        <slot style="display: none"></slot>
        
        ${
          this.rowCount < this.rowLimit ?
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
