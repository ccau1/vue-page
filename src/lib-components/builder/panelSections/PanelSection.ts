import { VueConstructor } from "vue";

export default class PanelSection {
  protected _form: VueConstructor;
  protected _header: VueConstructor;
  protected _name: string;
  protected _key: string;

  constructor({
    form,
    header,
    name,
    key,
  }: {
    form: VueConstructor;
    header: VueConstructor;
    name: string;
    key: string;
  }) {
    this._form = form;
    this._header = header;
    this._name = name;
    this._key = key;
  }

  get form() {
    return this._form;
  }

  get header() {
    return this._header;
  }

  get name() {
    return this._name;
  }

  get key() {
    return this._key;
  }
}
