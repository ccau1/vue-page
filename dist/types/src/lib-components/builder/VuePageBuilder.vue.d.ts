import { Page, Widget } from '..';
import { PageState } from '../models/PageState';
import BuilderWidgetsLayout from './BuilderWidgetsLayout.vue';
import { WidgetItem } from '../models/WidgetItem';
import { BuilderWidgetLanguages, PageConfig, WidgetItems } from "../../entry.esm";
import { TranslateKey, TranslateData, WidgetError, WidgetControls, PageConfigValidations } from '../interfaces';
import { PageEventListener } from '../models/PageEventListener';
import { QuestionControls } from '../questionControls/QuestionControl';
import { WidgetEffectControls } from '../models';
import { Engine } from 'json-rules-engine';
import Validator from '../models/Validator';
declare const _default: import("vue").ComponentOptions<BuilderWidgetsLayout, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & {
    widgetItems: WidgetItems;
    pageEventListener: PageEventListener;
}, {
    _onPageChange(newPage: Page): void;
    t(key: TranslateKey, data?: TranslateData | undefined): string;
    getConfig(): PageConfig;
    getValidator(): Validator;
    getRuleEngine(): Engine;
    excludeWidgets(widgetIdsOrCodes: string[]): void;
    emitEvent(name: string, value?: any, widget?: WidgetItem<any> | undefined): Promise<void>;
    validateAll(opts?: {
        setDirty?: boolean | undefined;
    } | undefined): Promise<{
        [widgetCodeOrId: string]: WidgetError[];
    }>;
    setMessage({ id, locale, key, value, type, }: {
        id: string;
        locale: string;
        key: string;
        value: string;
        type?: string | undefined;
    }): void;
    updatePage(page: Page): void;
    updateWidget(widget: WidgetItem): void;
    removeWidget(widgetId: string): void;
}, {
    widgetItemsArr(): Widget[];
    combWidgetControls(): WidgetControls;
    combWidgetEffectControls(): WidgetEffectControls;
    combQuestionControls(): QuestionControls;
    validations(): PageConfigValidations;
    pageState(): PageState;
}, {
    languages: {
        type: () => BuilderWidgetLanguages;
        required: true;
    };
    locale: StringConstructor;
    page: {
        type: () => Page;
        required: true;
    };
    onPageChange: FunctionConstructor;
    state: {
        type: () => PageState;
        required: true;
    };
    onStateChange: FunctionConstructor;
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
    languages: BuilderWidgetLanguages;
    page: Page;
    state: PageState;
} & {
    locale?: string | undefined;
    onPageChange?: Function | undefined;
    onStateChange?: Function | undefined;
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
}> & Omit<import("vue").VueConstructor<BuilderWidgetsLayout>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    languages: BuilderWidgetLanguages;
    page: Page;
    state: PageState;
} & {
    locale?: string | undefined;
    onPageChange?: Function | undefined;
    onStateChange?: Function | undefined;
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
    getConfig(): PageConfig;
    getValidator(): Validator;
    getRuleEngine(): Engine;
    excludeWidgets(widgetIdsOrCodes: string[]): void;
    emitEvent(name: string, value?: any, widget?: WidgetItem<any> | undefined): Promise<void>;
    validateAll(opts?: {
        setDirty?: boolean | undefined;
    } | undefined): Promise<{
        [widgetCodeOrId: string]: WidgetError[];
    }>;
    setMessage({ id, locale, key, value, type, }: {
        id: string;
        locale: string;
        key: string;
        value: string;
        type?: string | undefined;
    }): void;
    updatePage(page: Page): void;
    updateWidget(widget: WidgetItem): void;
    removeWidget(widgetId: string): void;
}, {}, {}, {}, {
    languages: BuilderWidgetLanguages;
    page: Page;
    state: PageState;
} & {
    locale?: string | undefined;
    onPageChange?: Function | undefined;
    onStateChange?: Function | undefined;
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
}, {}, true>);
export default _default;
