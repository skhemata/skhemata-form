import { html } from '@skhemata/skhemata-base';
import '../skhemata-form';
import { argTypes, ArgTypes, Story } from './argTypes';

export default {
  title: 'General/SkhemataForm/SkhemataFormToggle',
  component: 'skhemata-blog',
  argTypes: {
    ...argTypes,
    onText: {
      control: 'text',
      description: 'Text display beside the toggle when checked',
      table: {
        category: 'HTML Attributes',
        type: 'text',
      },
    },
    offText: {
      control: 'text',
      description: 'Text display beside the toggle when not checked',
      table: {
        category: 'HTML Attributes',
        type: 'string',
      },
    },
  },
};

const Template: Story<ArgTypes> = ({ label = 'My Toggle' }: ArgTypes) => html`
    <skhemata-form-toggle
      .label=${label}
      onText="ON example" offText="OFF example"
    ></skhemata-form-toggle>
  </skhemata-form>
`;

export const Example = Template.bind({});
Example.args = {
  label: 'My Toggle',
};
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-form-toggle
  label="${Example.args.label}"
></skhemata-form-toggle>
      `,
    },
  },
};
