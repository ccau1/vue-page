import { VueConstructor } from 'vue';
import QuestionItem from './QuestionItem';
export default class QuestionControl<_Options = Record<string, unknown>> {
    builder?: VueConstructor<Vue>;
    display: VueConstructor<Vue>;
    readOnly: VueConstructor<Vue>;
    questionItem: typeof QuestionItem;
    tags: string[];
    constructor({ builder, display, readOnly, questionItem, }: {
        builder?: VueConstructor<Vue>;
        display: VueConstructor<Vue>;
        readOnly: VueConstructor<Vue>;
        questionItem?: typeof QuestionItem;
    });
}
export interface QuestionControls {
    [key: string]: QuestionControl;
}
