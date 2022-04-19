# Question Controls

## buttonGroup

### Button Group Properties

```typescript
{
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
['opt{num}']: string;
```

## checkbox

### Checkbox Properties

```typescript
{
}
```

### Checkbox Language Messages

```typescript
__checkboxLabel: string;
```

## datePicker

### Date Picker Properties

```typescript
{
export interface DatePickerProperties {
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

## dropdown

### Dropdown Picker Properties

```typescript
{
  options: Array<{
    labelKey: string;
    value: string;
  }>;
}
```

### Dropdown Picker Language Messages

```typescript
{
  __label: string;
  // option labels
  ['opt{num}']: string;
}
```

## numberPicker

### Number Picker Properties

```typescript
{
  min?: number;
  max?: number;
  step?: number;
  default?: number;
}
```

### Number Picker Language Messages

```typescript
{
}
```

## radio

### Radio Properties

```typescript
{
  values: Array<{ labelKey: string; value: string }>;
}
```

### Radio Language Messages

```typescript
{
  [`opt${num}`]: string;
}
```

## text

### Text Properties

```typescript
{
  multiline?: boolean;
  maxLen?: number;
}
```

### Text Language Messages

```typescript
{
  __placeholder: string;
}
```