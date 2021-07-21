import { html } from '@skhemata/skhemata-base';
import '../skhemata-form';
import { argTypes, ArgTypes, Story } from './argTypes';

export default {
  title: 'General/SkhemataForm/SkhemataFormTextarea',
  component: 'skhemata-blog',
  argTypes: {
    ...argTypes,
    rows: {
      control: 'number',
      description: 'Default number of rows to display',
      table: {
        category: 'HTML Attributes',
        type: 'number',
      },
    },
  },
};

const Template: Story<ArgTypes> = ({ label = 'My Textarea' }: ArgTypes) => html`
    <skhemata-form-textarea
      .label=${label}
    ></skhemata-form-textarea>
  </skhemata-form>
`;

export const Example = Template.bind({});
Example.args = {
  label: 'My Textarea',
};
