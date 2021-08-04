import { html, property, render } from '@skhemata/skhemata-base';
import { SkhemataFormInput } from './SkhemataFormInput';
import {repeat} from 'lit-html/directives/repeat';

export class SkhemataFormRepeat extends SkhemataFormInput {
  @property({ type: Boolean }) checked: boolean = false;
  @property({ type: Array }) fieldNodes = [];
  @property({ type: Array }) repeaterRow = [];
  @property({ type: String }) rowName = "";
  @property({ type: Number }) rowCount = 0;

  get _slottedChildren() {
    const slot = this.shadowRoot.querySelector('slot');
    const childNodes = slot.assignedElements({flatten: true});
    return Array.prototype.filter.call(childNodes, (node) => node.nodeType == Node.ELEMENT_NODE);
  }

  // handleSlotchange(e) {
  //   this.fieldNodes = this._slottedChildren;
  // }

  constructor() {
    super();
    this.value = false;
  }

  async firstUpdated() {
    await super.firstUpdated(); 
    console.log(this.name);
    const nodes = Array.prototype.map.call(this._slottedChildren, (node) => {
      return node.cloneNode(true);
    });

    this.fieldNodes = this._slottedChildren;

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

  addRow(event: any) {

    const mainField = this.shadowRoot.querySelector('.repeater-field');
    const clonedNodes = this.fieldNodes.map(node => node.cloneNode(true));
    let row = document.createElement('div');

    row.setAttribute('data-row-index', `${this.rowCount}`);

    const rowTitle = `${this.rowName}-${this.rowCount + 1}`;
    row.setAttribute('data-row-title', rowTitle);

    const rowContent = html`${
          !this.valid
            ? html`<p class="help ${this.helpClass}">${this.errorMessage}</p>`
            : ``
        }
        <button @click="${this.removeRow}">Remove row</button>`;
    for (let i = 0; i< clonedNodes.length; i++){
      row.append(clonedNodes[i]);
    }
    render(rowContent, row);

    mainField.appendChild(row);
    // render(row, <HTMLElement>mainField);

    this.repeaterRow.push(this.fieldNodes)
    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent('add-row', {
        detail:{
          name: this.name,
          rowName: rowTitle,
          rowIndex: this.rowCount,
          nodes: clonedNodes
        },
        composed: true,
        bubbles: true,
      })
    );

    this.rowCount ++;
  }

  removeRow = (e: any) => {
    console.log(e);
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

    // reformat the titles
    const allInputs = this.shadowRoot.querySelectorAll('[data-row-title]');
    allInputs.forEach((input, i) => {
      console.log(input);
      input.setAttribute('data-row-title', `${this.rowName}-${i + 1}`);
      input.setAttribute('data-row-title', `${this.rowName}-${i}`);

    });

    // this.dispatchEvent(
    //   new CustomEvent('change', {
    //     detail: {
    //       data: 'test',
    //     },
    //     composed: true,
    //     bubbles: true,
    //   })
    // );

    this.requestUpdate();
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
       
        <button @click=${this.addRow}>Add row</button>
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
