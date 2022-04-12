import { VueConstructor } from "vue";
export default class QuestionControl<_Options = {}> {
    form?: VueConstructor<Vue>;
    display: VueConstructor<Vue>;
    readOnly: VueConstructor<Vue>;
    tags: string[];
    constructor({ form, display, readOnly, }: {
        form?: VueConstructor<Vue>;
        display: VueConstructor<Vue>;
        readOnly: VueConstructor<Vue>;
    });
}
