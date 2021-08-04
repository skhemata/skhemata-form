import { SkhemataForm } from './src/SkhemataForm';
import { SkhemataFormTextbox } from './src/SkhemataFormTextbox';
import { SkhemataFormTextarea } from './src/SkhemataFormTextarea';
import { SkhemataFormDropdown } from './src/SkhemataFormDropdown';
import { SkhemataFormDropzone } from './src/SkhemataFormDropzone';
import { SkhemataFormQuill } from './src/SkhemataFormQuill';
import { SkhemataFormButton } from './src/SkhemataFormButton';
import { SkhemataFormCheckbox } from './src/SkhemataFormCheckbox';
import { SkhemataFormAutocomplete } from './src/SkhemataFormAutocomplete';
import { SkhemataFormToggle } from './src/SkhemataFormToggle';
import { SkhemataFormRepeat } from './src/SkhemataFormRepeat';



window.customElements.define('skhemata-form', SkhemataForm);
window.customElements.define('skhemata-form-textbox', SkhemataFormTextbox);
window.customElements.define('skhemata-form-textarea', SkhemataFormTextarea);
window.customElements.define('skhemata-form-checkbox', SkhemataFormCheckbox);
window.customElements.define('skhemata-form-toggle', SkhemataFormToggle);
window.customElements.define('skhemata-form-repeat', SkhemataFormRepeat);


window.customElements.define('skhemata-form-dropdown', SkhemataFormDropdown);
window.customElements.define('skhemata-form-dropzone', SkhemataFormDropzone);
window.customElements.define('skhemata-form-quill', SkhemataFormQuill);
window.customElements.define('skhemata-form-button', SkhemataFormButton);
window.customElements.define(
  'skhemata-form-autocomplete',
  SkhemataFormAutocomplete
);
