import Vue, { VueConstructor } from "vue";
export declare class WidgetEffectControl<_Properties = any> {
    protected _display: VueConstructor<Vue>;
    protected _form: VueConstructor<Vue>;
    protected _name: string;
    protected _key: string;
    protected _create: Function;
    constructor({ display, form, name, key, create, }: {
        display: VueConstructor<Vue>;
        form: VueConstructor<Vue>;
        name: string;
        key: string;
        create: Function;
    });
    get create(): Function;
    get display(): VueConstructor<Vue>;
    get form(): VueConstructor<Vue>;
    get name(): string;
    get key(): string;
}
