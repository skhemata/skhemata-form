import { html, TemplateResult } from 'lit-html';
import '../skhemata-form';

export default {
  title: 'General/SkhemataForm/SkhemataFormDropzone',
  component: 'skhemata-form-dropzone',
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    description: { control: 'text' },
    horitontal: { control: 'boolean' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  name?: string;
  label?: string;
  description?: string;
  horizontal?: boolean;
}

const Template: Story<ArgTypes> = ({
  name = 'name',
  label = 'Dropzone',
  description = 'Drop an image here',
}: ArgTypes) => html`
  <skhemata-form-dropzone
    name=${name}
    label=${label}
    description=${description}
    horizontal
  >
  </skhemata-form-dropzone>
`;

export const Example = Template.bind({});
