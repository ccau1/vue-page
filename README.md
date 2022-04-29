# Vue Page

A page builder and display

## Components

### Vue Page Component

```typescript
<template>
  <vue-page
    :page="page"
    :state="state"
    :languages="languages"
    :view="pageView"
    @onPageChange="onPageChange"
    @onStateChange="onStateChange"
  />
</template>

<script>
import {VuePage} from 'vue-page';
...
</script>
```

<!-- ### Vue Page Builder Component (FUTURE)

```typescript
<template>
  <vue-page-builder
    :page="page"
    :state="state"
    :languages="languages"
    @onPageChange="onPageChange"
    @onStateChange="onStateChange"
  />
</template>

<script>
import {VuePageBuilder} from 'vue-page';
...
</script>
``` -->

### Props

| Property             | Type                               | Default | Description                                                                |
| :------------------- | :--------------------------------- | :------ | :------------------------------------------------------------------------- |
| page                 | Page                               |         | The structure of the page including all the widgets and its configurations |
| state                | PageState                          |         | The state of the page and all its widgets                                  |
| languages            | Languages                          |         | A JSON containing all locale key-values for each widget                    |
| view                 | PageView                           |         | The view to display                                                        |
| widgetControls       | { [key: string]: WidgetControl }   | {}      | Import/Override widgets to be used in page                                 |
| widgetEffectControls | { [key: string]: QuestionControl } | {}      | Import/Override widget effects to be used in page                          |
| questionControls     | { [key: string]: QuestionControl } | {}      | Import/Override widgets to be used in page                                 |
| plugins              | Plugins                            | {}      | Import/Override widgets to be used in page                                 |
| onPageChange         | (newPage: Page) => void            |         |                                                                            |
| onStateChange        | (newState: PageState) => void      |         |                                                                            |

## Built-in Widget Controls

You can view the list of built-in widget controls [here](src/lib-components/widgetControls/README.md)

## Built-in Widget Effect Controls

You can view the list of built-in widget controls [here](src/lib-components/widgetEffectControls/README.md)

## Built-in Question Controls

You can view the list of built-in question controls [here](src/lib-components/questionControls/README.md)

## Models

### Plugins

```typescript
Array<{
  widgetControls: { [widgetType: string]: WidgetControl };
  widgetEffectControls: { [widgetEffectType: string]: WidgetEffectControl };
  questionControls: { [questionType: string]: QuestionControl };
}>
```

### Page

```typescript
{
  id: string;
  widgets: Widget[];
  configs: {};
  state: PageState;
}
```

### Widget

```typescript
{
  id: string;
  type: string;
  code?: string;
  parent?: string;
  style?: string;
  reflexiveRules?: ConditionProperties[];
  validationRules?: Array<{ conditions: ConditionProperties[]; error: string }>;
  order?: number;
  properties: WidgetProperties;
}
```

### PageState

```typescript
{
  widgetState: { [widgetId: string]: any; };
  widgetCodeToIdMap: { [widgetCode: string]: string };
  reflexCodeToIdsMap: { [widgetCode: string]: string };
}
```

### PageView

```typescript
"display" | "readOnly";
```

### WidgetControl

```typescript
{
  readOnly: VueConstructor<Vue>;
  display: VueConstructor<Vue>;
  widgetItem?: typeof WidgetItem;
}
```

### QuestionControl

```typescript
{
  page?: VueConstructor<Vue>;
  display: VueConstructor<Vue>;
  readOnly: VueConstructor<Vue>;
}
```

### Languages

```typescript
{
  [(pageId | widgetId | widgetEffectId): string]: {
    [localeKey: string]: string;
  }
}
```

## Folder Structure

```text
├── models
│   ├── PageState.ts
│   └── WidgetItem.ts
├── questionControls
│   ├── checkbox
│   ├── numberPicker
│   ├── radio
│   ├── PageControl.ts
│   └── index.ts
├── widgetControls
│   ├── header
│   ├── pages
│   ├── question
│   └── index.ts
├── widgetEffectControls
│   ├── anchor
│   ├── aspectRatio
│   ├── boxed
│   ├── gradient
│   ├── opacity
│   ├── reveal
├── index.ts
├── interfaces.ts
├── utils.ts
├── VuePage.vue
├── WidgetsLayout.vue
└── WidgetView.vue
```

## TODO

- [ ] widgetEffects to wrap widgets

- [ ] handle theming/styling

- [ ] outside triggers/event handlers programmatically

- [ ] separate question and widget locale messages (question messages should have prefix)
