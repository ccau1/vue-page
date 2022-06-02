import { VueConstructor } from "vue";
export default class PanelSection {
    protected _form: VueConstructor;
    protected _header: VueConstructor;
    protected _name: string;
    protected _key: string;
    constructor({ form, header, name, key, }: {
        form: VueConstructor;
        header: VueConstructor;
        name: string;
        key: string;
    });
    get form(): VueConstructor<import("vue").default>;
    get header(): VueConstructor<import("vue").default>;
    get name(): string;
    get key(): string;
}
