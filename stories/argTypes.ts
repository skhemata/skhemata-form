import { TemplateResult } from '@skhemata/skhemata-base';

export interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

export interface ArgTypes {
  value?: string;
  label?: string;
  horizontal?: boolean;
  description?: string;
  required?: boolean;
  name?: string;
  placeholder?: string;
  errorMessage?: string;
  valid?: boolean;
  translationData?: any;
}

export const argTypes = {
  value: {
    control: 'text',
    description: 'Input Lable',
    table: {
      type: 'string',
      category: 'HTML Attributes',
    },
  },
  label: {
    control: 'text',
    description: 'Input Lable',
    table: {
      type: 'string',
      category: 'HTML Attributes',
    },
  },
  horizontal: {
    control: 'boolean',
    description: 'Display the field and label in horizontal or vertical format',
    defaultValue: false,
    table: {
      type: 'boolean',
      category: 'HTML Attributes',
    },
  },
  description: {
    control: 'text',
    description: 'Description to display under the label',
    table: {
      type: 'string',
      category: 'HTML Attributes',
    },
  },
  required: {
    control: 'boolean',
    description: 'Specify if the field is required when validating',
    defaultValue: false,
    table: {
      type: 'boolean',
      category: 'HTML Attributes',
    },
  },
  name: {
    control: 'string',
    description:
      'The name of the input, required to use with the skhemata-form component',
    table: {
      type: 'string',
      category: 'HTML Attributes',
    },
  },
  placeholder: {
    control: 'string',
    description: 'Placeholder value to display on the input',
    table: {
      type: 'string',
      category: 'HTML Attributes',
    },
  },
  errorMessage: {
    control: 'string',
    name: 'errormessage',
    description:
      'Error message to display if the input is invalid, set to override default messages',
    table: {
      type: 'string',
      category: 'HTML Attributes',
    },
  },
  valid: {
    control: 'boolean',
    description: 'validation status of the input',
    table: {
      type: 'boolean',
      category: 'HTML Attributes',
    },
  },
  change: {
    description: 'Fires when value of input changes',
    table: {
      type: {
        summary: 'object',
        detail: JSON.stringify(
          {
            name: 'string',
            value: 'string',
          },
          null,
          2
        ),
      },
      category: 'Events',
    },
  },
};
