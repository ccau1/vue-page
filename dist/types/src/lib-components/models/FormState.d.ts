export interface WidgetState {
    [widgetId: string]: any;
}
export interface FormStateCreate {
    widgetState?: WidgetState;
    widgetCodeToIdMap?: {
        [widgetCode: string]: string;
    };
    reflexCodeToIdsMap?: {
        [widgetCode: string]: string[];
    };
}
export interface FormStateRawObject {
    _widgetState: WidgetState;
    _widgetCodeToIdMap: {
        [widgetCode: string]: string;
    };
    _reflexCodeToIdsMap: {
        [widgetCode: string]: string[];
    };
}
export declare class FormState {
    protected _widgetState: WidgetState;
    protected _widgetCodeToIdMap: {
        [widgetCode: string]: string;
    };
    protected _reflexCodeToIdsMap: {
        [widgetCode: string]: string[];
    };
    static from(formState: FormState | FormStateRawObject): FormState;
    constructor({ widgetState, widgetCodeToIdMap, reflexCodeToIdsMap, }: FormStateCreate);
    get widgetState(): WidgetState;
    get widgetCodeToIdMap(): {
        [widgetCode: string]: string;
    };
    get reflexCodeToIdsMap(): {
        [widgetCode: string]: string[];
    };
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
