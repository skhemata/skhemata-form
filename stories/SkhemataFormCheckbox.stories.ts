import { html } from '@skhemata/skhemata-base';
import '../skhemata-form';
import { argTypes, ArgTypes, Story } from './argTypes';

export default {
  title: 'General/SkhemataForm/SkhemataFormCheckbox',
  component: 'skhemata-blog',
  argTypes,
};

const Template: Story<ArgTypes> = ({ label = 'My Checkbox' }: ArgTypes) => html`
    <skhemata-form-checkbox
      .label=${label}
    ></skhemata-form-checkbox>
  </skhemata-form>
`;

export const Example = Template.bind({});
Example.args = {
  label: 'My Checkbox',
};
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-form-checkbox
  label="${Example.args.label}"
></skhemata-form-checkbox>
      `,
    },
  },
};
