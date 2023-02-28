export * from './alert';
export * from './header';
export * from './html';
export * from './pages';
export * from './question';
export * from './section';
export * from './separator';
export * from './text';
export declare const widgets: {
    alert: import("..").WidgetControl<import("./alert").AlertProperties>;
    header: import("..").WidgetControl<import("./header").HeaderProperties>;
    html: import("..").WidgetControl<import("./html").HtmlProperties>;
    pages: import("..").WidgetControl<import("./pages").PagesProperties>;
    question: import("..").WidgetControl<import("./question").QuestionProperties<{
        [key: string]: any;
    }>>;
    section: import("..").WidgetControl<import("./section").SectionProperties>;
    separator: import("..").WidgetControl<import("./separator").SeparatorProperties>;
    text: import("..").WidgetControl<import("./text").TextProperties>;
};
