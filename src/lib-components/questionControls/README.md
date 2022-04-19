# Question Controls

Question controls are controls that helps render a question based on the type. This is only used for widget type `question`. This can be extended by passing via props `plugins` or `questionControls` on `<vue-page />`

## Button Group

type: `buttonGroup`

a selection of buttons to toggle

### Button Group Properties

```typescript
interface ButtonGroupQuestionProperties {
  // an array of options with label + value
  options: Array<{
    labelKey: string;
    value: string;
  }>;
}
```

### Button Group Language Messages

```typescript
__label: string;
// option labels
[labelKey: string]: string;
```

## Checkbox

type: `checkbox`

a single checkbox for true | false

### Checkbox Properties

```typescript

```

### Checkbox Language Messages

```typescript
__checkboxLabel: string;
```

## Date Picker

type: `datePicker`

a date picker to select a single date

### Date Picker Properties

```typescript
export interface DatePickerQuestionProperties {
  // string can be a date string or one of the following:
  // - Date.now()
  // - new Date()
  // - a dayjs chain function. Examples:
  //    - dayjs().add(7, 'day') --- (long way)
  //    - add(7, 'day')         --- (short way)
  defaultDate: string | Date;
  minDate: string | Date;
  maxDate: string | Date;
}
```

### Date Picker Language Messages

```typescript

```

## Dropdown

type: `dropdown`

a dropdown list to select

### Dropdown Properties

```typescript
{
  // an array of options with label + value
  options: Array<{
    labelKey: string;
    value: string;
  }>;
}
```

### Dropdown Language Messages

```typescript
{
  __label: string;
  // option labels
  [labelKey: string]: string;
}
```

## Number Picker

type: `numberPicker`

a number picker to select

### Number Picker Properties

```typescript
{
  // minimum amount the picker can go down to
  min?: number;
  // maximum amount the picker can go up to
  max?: number;
  // an incremental step for each up/down
  step?: number;
  // default number to start if no value given
  default?: number;
}
```

### Number Picker Language Messages

```typescript

```

## Radio

type: `radio`

an array of radio buttons to select from

### Radio Properties

```typescript
{
  // can select multiple
  multiple?: boolean;
  // an array of options with label + value
  options: Array<{ labelKey: string; value: string }>;
}
```

### Radio Language Messages

```typescript
{
  // option labels
  [labelKey: string]: string;
}
```

## Text

type: `text`

a text area to enter text, can be single line or multi-line

### Text Properties

```typescript
{
  // whether text input will be multiline
  multiline?: boolean;
  // the max length the input allows
  maxLen?: number;
}
```

### Text Language Messages

```typescript
{
  __placeholder: string;
}
```
