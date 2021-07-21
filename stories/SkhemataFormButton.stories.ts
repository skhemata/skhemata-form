import { html } from '@skhemata/skhemata-base';
import '../skhemata-form';
import { ArgTypes, Story } from './argTypes';

interface ButtonArgTypes extends ArgTypes {
  title?: string;
}

export default {
  title: 'General/SkhemataForm/SkhemataFormButton',
  component: 'skhemata-blog',
  argTypes: {
    title: {
      control: 'text',
      description: 'Text to display on the button',
      table: {
        type: 'string',
        category: 'HTML Attributes',
      },
    },
  },
  submit: {
    description: 'Fires when button is clicked and type="submit"',
    table: {
      category: 'Events',
      type: 'event',
    },
  },
  click: {
    description: 'Fires when type is not submit',
    table: {
      category: 'Events',
      type: 'event',
    },
  },
};

const Template: Story<ButtonArgTypes> = ({
  title = 'My Button',
}: ButtonArgTypes) => html`
    <skhemata-form-button
      .title=${title}
    ></skhemata-form-button>
  </skhemata-form>
`;

export const Example = Template.bind({});
Example.args = {
  label: 'My Button',
};
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-form-button
  title="My Button"
></skhemata-form-button>
      `,
    },
  },
};
