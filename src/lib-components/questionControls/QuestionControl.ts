import { VueConstructor } from "vue";

export default class QuestionControl<_Options = {}> {
  public builder?: VueConstructor<Vue>;
  public display: VueConstructor<Vue>;
  public readOnly: VueConstructor<Vue>;
  // public meta: { platforms: ["web", "fb"] };
  public tags: string[];

  constructor({
    builder,
    display,
    readOnly,
  }: {
    builder?: VueConstructor<Vue>;
    display: VueConstructor<Vue>;
    readOnly: VueConstructor<Vue>;
  }) {
    this.builder = builder;
    this.display = display;
    this.readOnly = readOnly;
    this.tags = [];
  }
}
