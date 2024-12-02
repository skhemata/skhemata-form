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
import { SkhemataFormDatePicker } from './src/SkhemataFormDatePicker';
import { SkhemataFormTime } from './src/SkhemataFormTime';

if (!customElements.get('skhemata-form')) {
  window.customElements.define('skhemata-form', SkhemataForm);
}
if (!customElements.get('skhemata-form-textbox')) {
  window.customElements.define('skhemata-form-textbox', SkhemataFormTextbox);
}
if (!customElements.get('skhemata-form-textarea')) {
  window.customElements.define('skhemata-form-textarea', SkhemataFormTextarea);
}
if (!customElements.get('skhemata-form-checkbox')) {
  window.customElements.define('skhemata-form-checkbox', SkhemataFormCheckbox);
}
if (!customElements.get('skhemata-form-toggle')) {
  window.customElements.define('skhemata-form-toggle', SkhemataFormToggle);
}
if (!customElements.get('skhemata-form-repeat')) {
  window.customElements.define('skhemata-form-repeat', SkhemataFormRepeat);
}
if (!customElements.get('skhemata-form-date-picker')) {
  window.customElements.define(
    'skhemata-form-date-picker',
    SkhemataFormDatePicker
  );
}
if (!customElements.get('skhemata-form-time')) {
  window.customElements.define('skhemata-form-time', SkhemataFormTime);
}
if (!customElements.get('skhemata-form-dropdown')) {
  window.customElements.define('skhemata-form-dropdown', SkhemataFormDropdown);
}
if (!customElements.get('skhemata-form-dropzone')) {
  window.customElements.define('skhemata-form-dropzone', SkhemataFormDropzone);
}
if (!customElements.get('skhemata-form-quill')) {
  window.customElements.define('skhemata-form-quill', SkhemataFormQuill);
}
if (!customElements.get('skhemata-form-button')) {
  window.customElements.define('skhemata-form-button', SkhemataFormButton);
}
if (!customElements.get('skhemata-form-autocomplete')) {
  window.customElements.define(
    'skhemata-form-autocomplete',
    SkhemataFormAutocomplete
  );
}
