import { VueConstructor } from 'vue';
import QuestionItem from './QuestionItem';

export default class QuestionControl<_Options = Record<string, unknown>> {
  public builder?: VueConstructor<Vue>;
  public display: VueConstructor<Vue>;
  public readOnly: VueConstructor<Vue>;
  public questionItem: typeof QuestionItem;
  // public meta: { platforms: ["web", "fb"] };
  public tags: string[];

  constructor({
    builder,
    display,
    readOnly,
    questionItem = QuestionItem,
  }: {
    builder?: VueConstructor<Vue>;
    display: VueConstructor<Vue>;
    readOnly: VueConstructor<Vue>;
    questionItem?: typeof QuestionItem;
  }) {
    this.builder = builder;
    this.display = display;
    this.readOnly = readOnly;
    this.tags = [];
    this.questionItem = questionItem;
  }
}

export interface QuestionControls {
  [key: string]: QuestionControl;
}
