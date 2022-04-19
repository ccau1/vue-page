# Vue Page

A page builder and display

## Components

### Vue Page Component

```typescript
<template>
  <vue-page
    :form="form"
    :state="state"
    :languages="languages"
    :view="formView"
    @onFormChange="onFormChange"
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
    :form="form"
    :state="state"
    :languages="languages"
    @onFormChange="onFormChange"
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
| form                 | Form                               |         | The structure of the page including all the widgets and its configurations |
| state                | FormState                          |         | The state of the form and all its widgets                                  |
| languages            | Languages                          |         | A JSON containing all locale key-values for each widget                    |
| view                 | FormView                           |         | The view to display                                                        |
| widgetControls       | { [key: string]: WidgetControl }   | {}      | Import/Override widgets to be used in form                                 |
| widgetEffectControls | { [key: string]: QuestionControl } | {}      | Import/Override widget effects to be used in form                          |
| questionControls     | { [key: string]: QuestionControl } | {}      | Import/Override widgets to be used in form                                 |
| plugins              | Plugins                            | {}      | Import/Override widgets to be used in form                                 |
| onFormChange         | (newForm: Form) => void            |         |                                                                            |
| onStateChange        | (newState: FormState) => void      |         |                                                                            |

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

### Form

```typescript
{
  id: string;
  widgets: Widget[];
  configs: {};
  state: FormState;
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

### FormState

```typescript
{
  widgetState: { [widgetId: string]: any; };
  widgetCodeToIdMap: { [widgetCode: string]: string };
  reflexCodeToIdsMap: { [widgetCode: string]: string };
}
```

### FormView

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
  form?: VueConstructor<Vue>;
  display: VueConstructor<Vue>;
  readOnly: VueConstructor<Vue>;
}
```

### Languages

```typescript
{
  [(formId | widgetId | widgetEffectId): string]: {
    [localeKey: string]: string;
  }
}
```

## Folder Structure

```text
├── models
│   ├── FormState.ts
│   └── WidgetItem.ts
├── questionControls
│   ├── checkbox
│   ├── numberPicker
│   ├── radio
│   ├── FormControl.ts
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
