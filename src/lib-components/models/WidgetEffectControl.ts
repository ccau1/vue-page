import Vue, { VueConstructor } from "vue";

export class WidgetEffectControl<_Properties = any> {
  protected _display: VueConstructor<Vue>;
  protected _form: VueConstructor<Vue>;
  protected _name: string;
  protected _key: string;
  protected _create: Function;

  constructor({
    display,
    form,
    name,
    key,
    create,
  }: {
    display: VueConstructor<Vue>;
    form: VueConstructor<Vue>;
    name: string;
    key: string;
    create: Function;
  }) {
    this._create = create;
    this._key = key;
    this._name = name;
    this._display = display;
    this._form = form;
  }

  get create() {
    return this._create;
  }

  get display() {
    return this._display;
  }

  get form() {
    return this._form;
  }

  get name() {
    return this._name;
  }

  get key() {
    return this._key;
  }
}
