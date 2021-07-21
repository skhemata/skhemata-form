# \<skhemata-form>

Skhemata Form Web Component. This web component can be used as base web component when working with forms and inputs.

## Installation
```bash
npm i @skhemata/skhemata-form
```

## Usage
```js
import { LitElement, html } from 'lit-element';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';

import {
  SkhemataForm,
  SkhemataFormTextbox,
  SkhemataFormTextarea,
  SkhemataFormDropdown,
  SkhemataFormCheckbox,
  SkhemataFormButton
} from '@skhemata/skhemata-form';

export class MyForm extends ScopedElementsMixin(LitElement){

  static get scopedElements() {
    return {
      'skhemata-form': SkhemataForm,
      'skhemata-form-textbox': SkhemataFormTextbox,
      'skhemata-form-textarea': SkhemataFormTextarea,
      'skhemata-form-dropdown': SkhemataFormDropdown,
      'skhemata-form-checkbox': SkhemataFormCheckbox,
      'skhemata-form-button': SkhemataFormButton,
    };
  }

  handleSubmit(event){
    const formData  = event.detail.data;
    console.log(formData);
  }

  handleChange(event){
    const formData = event.detail.data;
    console.log(formData)
  }

  handleInputChange(event){
    const inputName = event.detail.name;
    const inputValue = evenent.detail.value;
    console.log(inputName);
    console.log(inputValue);
  }

  render(){
    return html`
      <skhemata-form @submit=${this.handleSubmit} @change=${this.handleChange}>

        <!-- form components -->
        <skhemata-form-textbox 
          label="Text Box" 
          name="mytextbox" 
          @change=${this.handleInputChange}
        >
        </skhemata-form-textbox>

        <skhemata-form-textarea label="Text Area" name="mytextarea"></skhemata-form-textarea>

        <skhemata-form-dropdown label="Dropdown" name="mydropdown" placeholder="Select One" required>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </skhemata-form-dropdown> 

        <skhemata-form-checkbox 
          label="checkbox" 
          name="mycheckbox" 
          required
         >
          Sample checkbox
        </skhemata-form-checkbox>

        <skhemata-form-autocomplete 
          label="Auto Complete" 
          name="autocomplete" 
          api="https://my.api.com/cities" 
          maplabel="name" 
          mapvalue="id">
        </skhemata-form-autocomplete>

        <skhemata-form-button type="submit" title="Submit"></skhemata-form-button>

      </skhemata-form> `
    )
  }
}
```
Each component has the properties `required`, `error-message`, `label`, `name`, `horizontal`, `description` and `placeholder`. Each form input also fires a `change` event, that includes the data `event.detail.name` and `event.detail.value`. Additionally these form components have the following unique properties:
### Textbox
`minlength`

Number, minimum length of input. Default is none.

`maxlength`

Number, maximum length of input. Default is none.

`submit-on-enter`

Boolean, fire a submit event when enter is pressed. Default is `false`

### Textarea
`minlength`

Number, minimum length of input. Default is none.

`maxlength`

Number, maximum length of input. Default is none.

`submit-on-enter`

Boolean, fire a submit event when enter is pressed. Default is `false`

`rows`

Default number of rows of the textarea. Default is `4`

## Dropdown

`submit-on-select`

Boolean, fire a submit event when an item is selected. Default is `false`

## Autocomplete

`api`

String, the API endpoint to retrieve data from, expects an array of objects.

`maplabel`

The value to map to the label of the option element from the API data

`mapvalue` 

The value to map value of the option element from the API data

## Button

`type`

String, sets behaviour of button. `type="submit"` will trigger the form submit event on click. Default is none.


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`

## License

Skhemata Form is distributed under [Commercial Skhemata Licence Agreement v1](https://www.skhemata.com/license/csla-1.0) (CSLA-1.0). For license terms, see LICENSE file
