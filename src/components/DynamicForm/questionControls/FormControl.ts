import { VueConstructor } from "vue";

export default class FormControl<Options = {}> {
  public form: VueConstructor<Vue>;
  public display: VueConstructor<Vue>;
  // public meta: { platforms: ["web", "fb"] };
  public tags: string[] = [];

  constructor({
    form,
    display,
  }: {
    form: VueConstructor<Vue>;
    display: VueConstructor<Vue>;
  }) {
    this.form = form;
    this.display = display;
  }
}
