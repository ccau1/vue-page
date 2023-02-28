import PanelSection from '../PanelSection';
import { default as Form } from './Form.vue';
import { default as Header } from './Header.vue';

export default new PanelSection({
  key: 'reflexives',
  name: 'Reflexives',
  form: Form,
  header: Header,
});
