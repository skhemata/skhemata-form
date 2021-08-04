import { html } from '@skhemata/skhemata-base';
import '../skhemata-form';
import { argTypes, ArgTypes, Story } from './argTypes';

export default {
  title: 'General/SkhemataForm/SkhemataFormRepeat',
  component: 'skhemata-blog',
  argTypes: {
    ...argTypes,
    rowName: {
      control: 'text',
      description: 'Base title of a new row.  Whenever a new row is added, the title will be "rowName" #number',
      table: {
        category: 'HTML Attributes',
        type: 'text',
      },
    },
    addRowButtonText: {
      control: 'text',
      description: 'Text display for the add row button',
      table: {
        category: 'HTML Attributes',
        type: 'string',
      },
    },
    removeRowButtonText: {
      control: 'text',
      description: 'Text display for remove row button',
      table: {
        category: 'HTML Attributes',
        type: 'string',
      },
    },
    rowLimit: {
      control: 'number',
      description: 'Number determining max amount of rows',
      table: {
        category: 'HTML Attributes',
        type: 'number',
      },
    },
  },
};

const Template: Story<ArgTypes> = ({ label = 'My Repeater' }: ArgTypes) => html`
    <skhemata-form-repeat
      .label=${label}
      rowName="Title Example"
      addRowButtonText="Add Example"
      removeRowButtonText="Remove example"
      rowLimit="3"
    >
      <skhemata-form-checkbox label="checkbox" name="check" description="describe" required >Sample checkbox</skhemata-form-checkbox>
      <skhemata-form-toggle label="toggle" name="toggle" onText="ON" offText="OFF" required >Sample toggle</skhemata-form-toggle>
    </skhemata-form-repeat>
  </skhemata-form>
`;

export const Example = Template.bind({});
Example.args = {
  label: 'My Repeater',
};
Example.parameters = {
  docs: {
    source: {
      code: `
      <skhemata-form-repeat
        label="${Example.args.label}"
        rowName="Title Example"
        addRowButtonText="Add Example"
        removeRowButtonText="Remove example"
        rowLimit="3"

      >
      <skhemata-form-checkbox label="checkbox" name="check" description="describe" required >Sample checkbox</skhemata-form-checkbox>
      <skhemata-form-toggle label="toggle" name="toggle" onText="ON" offText="OFF" required >Sample toggle</skhemata-form-toggle>
      </skhemata-form-repeat>
      `,
    },
  },
};
