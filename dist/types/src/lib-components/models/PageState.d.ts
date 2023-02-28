export interface WidgetState {
    [widgetId: string]: any;
}
export interface PageStateCreate {
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
export interface PageStateRawObject {
    _widgetState: WidgetState;
    _interactiveState: InteractiveState;
    _widgetCodeToIdMap: {
        [widgetCode: string]: string;
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
export declare class PageState {
    protected _widgetState: WidgetState;
    protected _interactiveState: InteractiveState;
    protected _widgetCodeToIdMap: {
        [widgetCode: string]: string;
    };
    protected _widgetIdToCodeMap: {
        [widgetId: string]: string;
    };
    static from(pageState: PageState | PageStateRawObject): PageState;
    constructor({ widgetState, interactiveState, widgetCodeToIdMap, widgetIdToCodeMap, }: PageStateCreate);
    get interactiveState(): InteractiveState;
    get widgetState(): WidgetState;
    get widgetCodeToIdMap(): {
        [widgetCode: string]: string;
    };
    get widgetIdToCodeMap(): {
        [widgetId: string]: string;
    };
    getWidgetIdByCode(code: string): string;
    getWidgetCodeById(widgetId: string): string;
    onUpdate(): void;
    getWidgetState(widgetId: string, key?: string): any;
    setWidgetState(widgetId: string, key: string | Object, value?: any): void;
    clearWidgetState(widgetId: string, key: string): void;
    registerWidgetCode(widgetCode: string, widgetId: string): void;
    unregisterWidgetCode(widgetCode: string): void;
}
