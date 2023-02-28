import { Page, Widget } from '.';
import { PageState } from './models/PageState';
import WidgetsLayout from './WidgetsLayout.vue';
import { WidgetItem } from './models/WidgetItem';
import { PageConfig, WidgetItems } from "../entry.esm";
import { PageEventListener } from './models/PageEventListener';
import { TranslateKey, TranslateData, WidgetControls, WidgetError, PageConfigValidations } from './interfaces';
import { WidgetEffectControls } from './models';
import { QuestionControls } from './questionControls/QuestionControl';
import { Engine } from 'json-rules-engine';
import Validator from './models/Validator';
declare const _default: import("vue").ComponentOptions<WidgetsLayout, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & {
    widgetItems: WidgetItems;
    pageEventListener: PageEventListener;
}, {
    _onPageChange(newPage: Page): void;
    t(key: TranslateKey, data?: TranslateData | undefined): string;
    getConfig(): PageConfig | undefined;
    getValidator(): Validator;
    getRuleEngine(): Engine;
    excludeWidgets(widgetIdsOrCodes: string[]): void;
    emitEvent(name: string, value?: any, widget?: WidgetItem<any> | undefined): Promise<void>;
    validateAll(opts?: {
        setDirty?: boolean | undefined;
    } | undefined): Promise<{
        [widgetCodeOrId: string]: WidgetError[];
    }>;
}, {
    widgetItemsArr(): Widget[];
    combWidgetControls(): WidgetControls;
    combWidgetEffectControls(): WidgetEffectControls;
    combQuestionControls(): QuestionControls;
    validations(): PageConfigValidations;
    pageState(): PageState;
}, {
    languages: {
        type: () => {
            [widgetId: string]: string | {
                [key: string]: string;
            };
        };
        required: true;
    };
    page: {
        type: () => Page;
        required: true;
    };
    onPageChange: FunctionConstructor;
    state: {
        type: () => PageState;
        required: true;
    };
    widgetControls: () => WidgetControls;
    questionControls: () => QuestionControls;
    widgetEffectControls: () => WidgetEffectControls;
    plugins: () => Array<{
        widgetControls: Object;
        widgetEffectControls: Object;
        questionControls: Object;
    }>;
    view: StringConstructor;
    config: () => PageConfig;
}, {
    languages: {
        [widgetId: string]: string | {
            [key: string]: string;
        };
    };
    page: Page;
    state: PageState;
} & {
    onPageChange?: Function | undefined;
    view?: string | undefined;
    widgetControls?: WidgetControls | undefined;
    questionControls?: QuestionControls | undefined;
    widgetEffectControls?: WidgetEffectControls | undefined;
    plugins?: {
        widgetControls: Object;
        widgetEffectControls: Object;
        questionControls: Object;
    }[] | undefined;
    config?: PageConfig | undefined;
}> & Omit<import("vue").VueConstructor<WidgetsLayout>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    languages: {
        [widgetId: string]: string | {
            [key: string]: string;
        };
    };
    page: Page;
    state: PageState;
} & {
    onPageChange?: Function | undefined;
    view?: string | undefined;
    widgetControls?: WidgetControls | undefined;
    questionControls?: QuestionControls | undefined;
    widgetEffectControls?: WidgetEffectControls | undefined;
    plugins?: {
        widgetControls: Object;
        widgetEffectControls: Object;
        questionControls: Object;
    }[] | undefined;
    config?: PageConfig | undefined;
} & {
    onEvent?: ((_options: {
        name: string;
        value: any;
        widget: WidgetItem;
        pageState: PageState;
        widgetItems: WidgetItems;
    }) => any) | undefined;
    onOnStateChange?: ((_newState: PageState) => any) | undefined;
    onOnPageChange?: ((_newPage: Page) => any) | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, {
    widgetItems: WidgetItems;
    pageEventListener: PageEventListener;
}, {
    widgetItemsArr(): Widget[];
    combWidgetControls(): WidgetControls;
    combWidgetEffectControls(): WidgetEffectControls;
    combQuestionControls(): QuestionControls;
    validations(): PageConfigValidations;
    pageState(): PageState;
}, {
    _onPageChange(newPage: Page): void;
    t(key: TranslateKey, data?: TranslateData | undefined): string;
    getConfig(): PageConfig | undefined;
    getValidator(): Validator;
    getRuleEngine(): Engine;
    excludeWidgets(widgetIdsOrCodes: string[]): void;
    emitEvent(name: string, value?: any, widget?: WidgetItem<any> | undefined): Promise<void>;
    validateAll(opts?: {
        setDirty?: boolean | undefined;
    } | undefined): Promise<{
        [widgetCodeOrId: string]: WidgetError[];
    }>;
}, {}, {}, {
    event: (_options: {
        name: string;
        value: any;
        widget: WidgetItem;
        pageState: PageState;
        widgetItems: WidgetItems;
    }) => boolean;
    onStateChange: (_newState: PageState) => boolean;
    onPageChange: (_newPage: Page) => boolean;
}, {
    languages: {
        [widgetId: string]: string | {
            [key: string]: string;
        };
    };
    page: Page;
    state: PageState;
} & {
    onPageChange?: Function | undefined;
    view?: string | undefined;
    widgetControls?: WidgetControls | undefined;
    questionControls?: QuestionControls | undefined;
    widgetEffectControls?: WidgetEffectControls | undefined;
    plugins?: {
        widgetControls: Object;
        widgetEffectControls: Object;
        questionControls: Object;
    }[] | undefined;
    config?: PageConfig | undefined;
} & {
    onEvent?: ((_options: {
        name: string;
        value: any;
        widget: WidgetItem;
        pageState: PageState;
        widgetItems: WidgetItems;
    }) => any) | undefined;
    onOnStateChange?: ((_newState: PageState) => any) | undefined;
    onOnPageChange?: ((_newPage: Page) => any) | undefined;
}, {}, true>);
export default _default;
