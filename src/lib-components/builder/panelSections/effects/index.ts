import { default as Form } from "./Form.vue";
import { default as Header } from "./Header.vue";
import PanelSection from "../PanelSection";

export default new PanelSection({
  key: "effects",
  name: "Effects",
  form: Form,
  header: Header,
});
