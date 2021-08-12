import { html } from '@skhemata/skhemata-base';
import '../skhemata-form';
import { argTypes, ArgTypes, Story } from './argTypes';

export default {
  title: 'General/SkhemataForm/SkhemataFormRepeat',
  component: 'skhemata-blog',
  argTypes: {
    ...argTypes,
    repeatedFields: {
      control: 'Object',
      description: 'Array of inputs to be repeated `type` is the type of input to be used. `attributes` is the attributes that are tied to the input to function. `content` is what will be fed into the `<slot></slot>` element of the component.  This is the list of allowed `types` that correspond to components: `[textbox, textarea, dropdown, dropzone, button, quill, checkbox, toggle]`',
      table: {
        category: 'HTML Attributes',
        type: {
          summary: 'object',
          detail: JSON.stringify(
            [
              {
                type: 'string',
                attributes: 'object',
                content: 'string',     
              }
            ],
            null,
            2
          ),
        },
      },
    },
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


const defaultArgs = {
  repeatedFields: [
    {
      type: 'toggle',
      attributes: {
        name: "toggle",
        description: "sample toggle",
        onText: "ON",
        offText:"OFF",
        label: 'Toggle',
        required: true
      }
    },
    {
      type: 'checkbox',
      attributes: {
        name: "check",
        description: "sample checkbox",
        onText: "ON",
        offText:"OFF",
        label: 'Checkbox',
        required: true
      }    
    },
    {
      type: 'dropdown',
      attributes: {
        name: "dropdown",
        description: "sample text",
        label: 'dropdown',
        required: true,
      },
      content: '<option value="hello">Hello</option><option value="goodbye">Goodbye</option>'
    }
  ]
};
const Template: Story<ArgTypes> = ({ label = 'My Repeater', repeatedFields = defaultArgs.repeatedFields}: ArgTypes) => html`
  <skhemata-form>
    <skhemata-form-repeat
      .label=${label}
      rowName="Title Example"
      addRowButtonText="Add Example"
      removeRowButtonText="Remove example"
      rowLimit="3"
      .repeatedFields=${repeatedFields}
    >
    </skhemata-form-repeat>
  </skhemata-form>
`;

export const Example = Template.bind({});
Example.args = {
  label: 'My Repeater',
  repeatedFields: [
    {
      type: 'toggle',
      attributes: {
        name: "toggle",
        description: "sample toggle",
        onText: "ON",
        offText:"OFF",
        label: 'Toggle',
        required: true
      }
    },
    {
      type: 'checkbox',
      attributes: {
        name: "check",
        description: "sample checkbox",
        onText: "ON",
        offText:"OFF",
        label: 'Checkbox',
        required: true
      }    
    },
    {
      type: 'dropdown',
      attributes: {
        name: "dropdown",
        description: "sample text",
        label: 'dropdown',
        required: true,
      },
      content: '<option value="hello">Hello</option><option value="goodbye">Goodbye</option>'
    }
  ]
};
Example.parameters = {
  docs: {
    source: {
      code: `
      <skhemata-form>
      <skhemata-form-repeat
        label="${Example.args.label}"
        rowName="Title Example"
        addRowButtonText="Add Example"
        removeRowButtonText="Remove example"
        rowLimit="3"
        .repeatedFields=${Example.args.repeatedFields}
      >
      </skhemata-form-repeat>
      </skhemata-form>
      `,
    },
  },
};
