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

### Vue Page Builder Component

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
```

### Props

| Property      | Type                          | Default | Description                                                                |
| :------------ | :---------------------------- | :------ | :------------------------------------------------------------------------- |
| form          | Form                          |         | The structure of the page including all the widgets and its configurations |
| state         | FormState                     |         | The state of the form and all its widgets                                  |
| languages     | Languages                     |         | A JSON containing all locale key-values for each widget                    |
| view          | FormView                      |         | The view to display                                                        |
| onFormChange  | (newForm: Form) => void       |         |                                                                            |
| onStateChange | (newState: FormState) => void |         |                                                                            |

## Models

### Form

```typescript
id: string;
widgets: Widget[];
configs: {};
state: FormState;
```

### Widget

```typescript
id: string;
type: string;
code?: string;
parent?: string;
style?: string;
reflexiveRules?: ConditionProperties[];
validationRules?: Array<{ conditions: ConditionProperties[]; error: string }>;
order?: number;
properties: WidgetProperties;
```

### FormState

```typescript
widgetState: { [widgetId: string]: any; };
widgetCodeToIdMap: { [widgetCode: string]: string };
reflexCodeToIdsMap: { [widgetCode: string]: string };
```

### FormView

```typescript
"display" | "readOnly";
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
├── widgetEffects
│   ├── anchor
│   ├── aspectRatio
│   ├── boxed
│   ├── gradient
│   ├── opacity
│   ├── reveal
├── widgets
│   ├── header
│   ├── pages
│   ├── question
│   └── index.ts
├── DynamicForm.vue
├── index.ts
├── utils.vue
├── WidgetsLayout.vue
└── WidgetView.vue
```

## TODO

- [ ] widgetEffects to wrap widgets

- [ ] handle theming/styling

- [ ] outside triggers/event handlers programmatically
