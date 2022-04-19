import Vue, { VueConstructor } from "vue";

export default class WidgetEffectControl<_Properties = any> {
  protected _display: VueConstructor<Vue>;

  constructor({ display }: { display: VueConstructor<Vue> }) {
    this._display = display;
  }

  get display() {
    return this._display;
  }
}
