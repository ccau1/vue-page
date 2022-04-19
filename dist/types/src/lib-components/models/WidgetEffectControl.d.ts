import Vue, { VueConstructor } from "vue";
export default class WidgetEffectControl<_Properties = any> {
    protected _display: VueConstructor<Vue>;
    constructor({ display }: {
        display: VueConstructor<Vue>;
    });
    get display(): VueConstructor<Vue>;
}
