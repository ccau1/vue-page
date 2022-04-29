import { VueConstructor } from "vue";
export default class QuestionControl<_Options = {}> {
    builder?: VueConstructor<Vue>;
    display: VueConstructor<Vue>;
    readOnly: VueConstructor<Vue>;
    tags: string[];
    constructor({ builder, display, readOnly, }: {
        builder?: VueConstructor<Vue>;
        display: VueConstructor<Vue>;
        readOnly: VueConstructor<Vue>;
    });
}
