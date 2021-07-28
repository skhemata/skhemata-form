import { html } from '@skhemata/skhemata-base';
import '../skhemata-form';
import { ArgTypes, Story } from './argTypes';

interface ButtonArgTypes extends ArgTypes {
  title?: string;
  isFullwidth?: boolean;
  skhemataFormButtonBackgroundColor?: string;
  skhemataFormButtonTextColor?: string;
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
    isFullwidth: {
      control: 'boolean',
      name: 'isfullwidth',
      description: 'Sets the width of the button',
      table: {
        type: 'boolean',
        category: 'HTML Attributes',
      },
    },
    skhemataFormButtonBackgroundColor: {  
      control: 'color',
      name: '--skhemata-form-button-background-color',
      description: 'Background color of the form buttons',
      defaultValue: '#00d1b2',
      table: {
        type: 'string',
        category: 'CSS Properties',
      },
    },
    skhemataFormButtonTextColor: {  
      control: 'color',
      name: '--skhemata-form-button-text-color',
      description: 'Text color of the form buttons',
      defaultValue: '#ffffff',
      table: {
        type: 'string',
        category: 'CSS Properties',
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
}
};

const Template: Story<ButtonArgTypes> = ({
  title = 'My Button',
  isFullwidth = false,
  skhemataFormButtonBackgroundColor,
  skhemataFormButtonTextColor,
}: ButtonArgTypes) => html`
    <style>
      body {
        --skhemata-form-button-background-color: ${skhemataFormButtonBackgroundColor};
        --skhemata-form-button-text-color: ${skhemataFormButtonTextColor};
      }
    </style>
    <skhemata-form-button
      .title=${title}
      .isFullwidth=${isFullwidth}
    ></skhemata-form-button>
`;

export const Example = Template.bind({});
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
