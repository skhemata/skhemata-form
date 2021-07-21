import { html, TemplateResult } from 'lit-html';
import '../skhemata-form';

export default {
  title: 'General/SkhemataForm/SkhemataForm',
  component: 'skhemata-blog',
  argTypes: {
    textBoxLabel: { control: 'text' },
    textAreaLabel: { control: 'text' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  textBoxLabel?: string;
  textAreaLabel?: string;
}

const Template: Story<ArgTypes> = ({
  textBoxLabel = 'Text Box',
  textAreaLabel = 'Text Area',
}: ArgTypes) => html`
  <skhemata-form
    @submit=${(e: any) => console.log(e.detail.data)}
    resetonsubmit
  >
    <skhemata-form-textbox
      label="${textBoxLabel}"
      name="textbox"
    ></skhemata-form-textbox>
    <skhemata-form-textarea label="${textAreaLabel}"></skhemata-form-textarea>
    <skhemata-form-button title="Submit"></skhemata-form-button>
  </skhemata-form>
`;

export const Example = Template.bind({});
Example.args = {
  textBoxLabel: 'Text Box',
  textAreaLabel: 'Text Area',
};
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-form
  resetonsubmit
>
  <skhemata-form-textbox
    label="${Example.args.textBoxLabel}"
    name="textbox"
  ></skhemata-form-textbox>
  <skhemata-form-textarea label="${Example.args.textAreaLabel}"></skhemata-form-textarea>
  <skhemata-form-button title="Submit"></skhemata-form-button>
</skhemata-form>
      `,
    },
  },
};
