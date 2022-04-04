import { VueConstructor } from "vue";

export default class FormControl<_Options = {}> {
  public form: VueConstructor<Vue>;
  public display: VueConstructor<Vue>;
  public readOnly: VueConstructor<Vue>;
  // public meta: { platforms: ["web", "fb"] };
  public tags: string[] = [];

  constructor({
    form,
    display,
    readOnly,
  }: {
    form: VueConstructor<Vue>;
    display: VueConstructor<Vue>;
    readOnly: VueConstructor<Vue>;
  }) {
    this.form = form;
    this.display = display;
    this.readOnly = readOnly;
  }
}
