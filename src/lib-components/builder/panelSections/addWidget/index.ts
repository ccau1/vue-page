import { default as Form } from "./Form.vue";
import { default as Header } from "./Header.vue";
import PanelSection from "../PanelSection";

export default new PanelSection({
  key: "addWidget",
  name: "Add Widget",
  form: Form,
  header: Header,
});
