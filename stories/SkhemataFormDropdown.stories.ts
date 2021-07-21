import { html } from 'lit-html';
import '../skhemata-form';
import { argTypes, ArgTypes, Story } from './argTypes';

export default {
  title: 'General/SkhemataForm/SkhemataFormDropdown',
  component: 'skhemata-form-dropdown',
  argTypes,
};

const Template: Story<ArgTypes> = ({
  name = 'name',
  label = 'Dropdown',
  description = 'Example Dropdown',
  horizontal = false,
}: ArgTypes) => html`
  <skhemata-form-dropdown
    .name=${name}
    .label=${label}
    .description=${description}
    .horizontal=${horizontal}
  >
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </skhemata-form-dropdown>
`;

export const Example = Template.bind({});
Example.parameters = {
  docs: {
    source: {
      code: `
  <skhemata-form-dropdown
    label="Example Dropdown"
    description="Description"
  >
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </skhemata-form-dropdown>      `,
    },
  },
};
