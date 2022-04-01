export interface WidgetState {
  [widgetId: string]: object;
}

export interface FormStateCreate {
  widgetState?: WidgetState;
}

export class FormState {
  protected _widgetState: WidgetState = {};
  constructor(state: FormStateCreate) {
    const newState = this.setState(state);
  }

  get widgetState() {
    return this._widgetState;
  }

  setState(state: FormStateCreate) {
    if (state.widgetState) {
      this._widgetState = state.widgetState;
    }
  }
}
