import { html } from '@skhemata/skhemata-base';
import '../skhemata-form';
import { argTypes, ArgTypes, Story } from './argTypes';

export default {
  title: 'General/SkhemataForm/SkhemataFormQuill',
  component: 'skhemata-form-quill',
  argTypes: {
    ...argTypes,
  },
};

const Template: Story<ArgTypes> = ({ 
  label = 'Quill Editor', 
  horizontal = false, 
  description = 'Visual Editor',
  valid = true,
}: ArgTypes) => html`
    <skhemata-form-quill
      .label=${label}
      .horizontal=${horizontal}
      .description=${description}
      .valid=${valid}
    ></skhemata-form-quill>
  </skhemata-form>
`;

export const Example = Template.bind({});
Example.args = {
  label: 'Quill Edtior',
  description: 'Visual Editor',
};