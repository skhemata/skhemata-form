import { html, SkhemataBase, property } from '@skhemata/skhemata-base';

export class SkhemataForm extends SkhemataBase {
  @property({ type: Boolean }) resetOnSubmit = false;

  @property({ type: Boolean }) columns = false;

  @property({ type: Object }) data: any = {};

  @property({ type: Boolean }) valid = true;

  @property({ type: Boolean }) horizontal = false;

  @property({ type: String }) translations = '';

  /**
   * getter for form elements (ie inputs and buttons)
   */
  get inputs() {
    const elements: any[] = [];
    let children = [];
    const slot = this.shadowRoot ? this.shadowRoot.querySelector('slot') : null;
    const childNodes = slot ? slot.assignedNodes({ flatten: true }) : null;
    children = childNodes
      ? Array.prototype.filter.call(
          childNodes,
          node => node.nodeType === Node.ELEMENT_NODE
        )
      : [];
    const getChildren = (element: any) => {
      const elementChildren = element.childNodes
        ? Array.prototype.filter.call(
            element.childNodes,
            node => node.nodeType === Node.ELEMENT_NODE
          )
        : [];

      if (element.name || (!element.name && elementChildren.length < 1)) {
        if (element.tagName && element.tagName !== 'SLOT') {
          elements.push(element);
        }
      } else if (elementChildren.length > 0) {
        for (const child of element.childNodes) {
          getChildren(child);
        }
      }
    };
    for (const child of children) {
      getChildren(child);
    }
    return elements;
  }

  reset() {
    this.inputs.forEach(input => {
      input.reset();
    });
    this.valid = true;
  }

  validate = () => {
    for (const input of this.inputs) {
      if (input.name) {
        input.validate();
        this.valid = this.valid ? input.valid : this.valid;
      }
    }
    this.requestUpdate();
  };

  handleSubmit() {
    this.validate();

    if (!this.valid) {
      return;
    }

    for (const input of this.inputs) {
      if (input.name) {
        this.data[input.name] = input.value;
      }
    }

    this.dispatchEvent(
      new CustomEvent('submit', {
        detail: {
          data: this.data,
        },
        composed: true,
        bubbles: true,
      })
    );

    if (this.resetOnSubmit) {
      this.reset();
    }
  }

  async firstUpdated() {
    await super.firstUpdated(); 
    for (const input of this.inputs) {
      // input.horizontal = this.horizontal;
      input.translations = this.translations;
      input.addEventListener('submit', () => {
        this.handleSubmit();
      });
      input.addEventListener('change', (e: any) => {
        const { name, value } = e.detail;
        const oldValue = this.data;
        this.data[name] = value;
        this.valid = true;
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: {
              data: this.data,
            },
          })
        );
        this.requestUpdate('data', oldValue);
      });

      // add-row event for skhemata-form-repeat inputs
      if(input.type == 'SKHEMATA-FORM-REPEAT') {
        
        input.addEventListener('add-row', (e: any) => {
          const repeaterName = e.detail.name;
          const rowIndex = e.detail.rowIndex;

          if(!this.data.hasOwnProperty(repeaterName)) {
            this.data[repeaterName] = [];
          }

          if(!this.data[repeaterName][rowIndex]) {
            this.data[repeaterName][rowIndex] = {};
          }

          // attaches 'change' event listeners to all the child elements of repeater
          for (const repeatInput of e.detail.nodes) {
            repeatInput.addEventListener('change', (event: any) => {
              const { name, value } = event.detail;
              const oldValue = this.data;

              this.data[repeaterName][rowIndex][name] = value;
              this.valid = true;
              input.dispatchEvent(
                new CustomEvent('update-data', {
                  detail: {
                    data: this.data,
                  },
                })
              );

              this.dispatchEvent(
                new CustomEvent('change', {
                  detail: {
                    data: this.data,
                  },
                })
              );
              this.requestUpdate('data', oldValue);
            });
          }

        });

        input.addEventListener('remove-row', (e: any) => {
          const repeaterName = e.detail.name;
          const rowIndex = e.detail.rowIndex;

          const oldValue = this.data;
  
          if(this.data.hasOwnProperty(repeaterName)) {
            if(this.data[repeaterName][rowIndex]) {
              this.data[repeaterName].splice(rowIndex, 1);
            }
          }

          this.valid = true;
          input.dispatchEvent(
            new CustomEvent('update-data', {
              detail: {
                data: this.data,
              },
            })
          );
          this.dispatchEvent(
            new CustomEvent('change', {
              detail: {
                data: this.data,
              },
            })
          );
          this.requestUpdate('data', oldValue);

        });
      }
    }
  }

  render() {
    return html`
      <div class="${this.columns ? 'columns' : ''}">
        <slot form-data=${this.data}> </slot>
      </div>
    `;
  }
}
