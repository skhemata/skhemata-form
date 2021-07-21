import { html } from 'lit-html';
import '../skhemata-form';
import { argTypes, ArgTypes, Story } from './argTypes';

export default {
  title: 'General/SkhemataForm/SkhemataFormAutocomplete',
  component: 'skhemata-form-autocomplete',
  argTypes: {
    ...argTypes,
    api: {
      control: 'object',
      description: 'API endpoint for the automcomplete data',
      table: {
        category: 'HTML Attributes',
        type: {
          summary: 'object',
          detail: JSON.stringify(
            {
              url: 'string',
            },
            null,
            2
          ),
        },
      },
    },
    mapvalue: {
      control: 'string',
      description: 'The value from the API to map the value of select options',
      table: {
        type: 'string',
        category: 'HTML Attributes',
      },
    },
    maplabel: {
      control: 'string',
      description: 'The value from the API to map the label of select options',
      table: {
        type: 'string',
        category: 'HTML Attributes',
      },
    },
  },
};

interface API {
  url?: string;
}

interface AutocompleteArgTypes extends ArgTypes {
  api?: API;
  maplabel?: string;
  mapvalue?: string;
}

const Template: Story<AutocompleteArgTypes> = ({
  label = 'Autocomplete',
  api = {
    url: 'https:/coral.thrinacia.com/api/service/restv1/locale/city/',
  },
}: AutocompleteArgTypes) => html`
  <skhemata-form-autocomplete
    .label=${label}
    .api=${api}
    maplabel="name"
    mapvalue="id"
  ></skhemata-form-autocomplete>
`;

export const Example = Template.bind({});
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-form-autocomplete
  label="Autocomplete"
  api="${JSON.stringify({
    url: 'https:/coral.thrinacia.com/api/service/restv1/',
  }).replaceAll('"', '\\"')}"
></skhemata-form-autocomplete>
      `,
    },
  },
};
