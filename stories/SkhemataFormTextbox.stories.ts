import { html } from '@skhemata/skhemata-base';
import '../skhemata-form';
import { argTypes, ArgTypes, Story } from './argTypes';

export default {
  title: 'General/SkhemataForm/SkhemataFormTextbox',
  component: 'skhemata-blog',
  argTypes,
};

const Template: Story<ArgTypes> = ({ label = 'My Textbox' }: ArgTypes) => html`
    <skhemata-form-textbox
      .label=${label}
    ></skhemata-form-textbox>
  </skhemata-form>
`;

export const Example = Template.bind({});
Example.args = {
  label: 'My Textbox',
};
