export interface WidgetState {
    [widgetId: string]: any;
}
export interface FormStateCreate {
    widgetState?: WidgetState;
    interactiveState?: InteractiveState;
    widgetCodeToIdMap?: {
        [widgetCode: string]: string;
    };
    reflexCodeToIdsMap?: {
        [widgetCode: string]: string[];
    };
    widgetIdToCodeMap?: {
        [widgetId: string]: string;
    };
}
export interface FormStateRawObject {
    _widgetState: WidgetState;
    _interactiveState: InteractiveState;
    _widgetCodeToIdMap: {
        [widgetCode: string]: string;
    };
    _reflexCodeToIdsMap: {
        [widgetCode: string]: string[];
    };
    _widgetIdToCodeMap: {
        [widgetId: string]: string;
    };
}
export interface InteractiveState {
    hoveredWidgetId?: string;
    selectedWidgetId?: string;
    draggingWidgetId?: string;
}
export declare class FormState {
    protected _widgetState: WidgetState;
    protected _interactiveState: InteractiveState;
    protected _widgetCodeToIdMap: {
        [widgetCode: string]: string;
    };
    protected _reflexCodeToIdsMap: {
        [widgetCode: string]: string[];
    };
    protected _widgetIdToCodeMap: {
        [widgetId: string]: string;
    };
    static from(formState: FormState | FormStateRawObject): FormState;
    constructor({ widgetState, interactiveState, widgetCodeToIdMap, reflexCodeToIdsMap, widgetIdToCodeMap, }: FormStateCreate);
    get interactiveState(): InteractiveState;
    get widgetState(): WidgetState;
    get widgetCodeToIdMap(): {
        [widgetCode: string]: string;
    };
    get reflexCodeToIdsMap(): {
        [widgetCode: string]: string[];
    };
    get widgetIdToCodeMap(): {
        [widgetId: string]: string;
    };
    getWidgetIdByCode(code: string): string;
    getWidgetCodeById(widgetId: string): string;
    onUpdate(): void;
    getWidgetState(widgetId: string, key?: string): any;
    setWidgetState(widgetId: string, key: string, value?: any): void;
    clearWidgetState(widgetId: string, key: string): void;
    registerWidgetCode(widgetCode: string, widgetId: string): void;
    unregisterWidgetCode(widgetCode: string): void;
    getReflexWidgetIdsByCode(widgetCode: string): string[];
    registerReflexWatch(widgetId: string, reflexCodes: string[]): void;
    unregisterReflexWatch(widgetId: string, reflexCodes: string[]): void;
}
