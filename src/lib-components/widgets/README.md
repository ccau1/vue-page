# Widgets

## alert

### Properties

```typescript
{
  type: "default" | "info" | "success" | "danger" | "warning" | "custom";
  customColor?: string;
  showCloseBtn?: boolean;
}
```

### Language Messages

```typescript
{
  __title: string;
  __text: string;
}
```

## header

### Header Properties

```typescript
{
  tagType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
```

### Header Language Messages

```typescript
{
  __label: string;
}
```

## html

### HTML Properties

```typescript
{
  from: "default" | "url";
  url?: string;
}
```

### HTML Language Messages

```typescript
{
  __html: string;
}
```

## pages

### Pages Properties

```typescript
{
  pages: Array<{
    labelKey: string;
    idx?: number;
    children: string[];
  }>;
  navigationVisible?: boolean;
  navigationIntegrateParentPage?: boolean;
  tabsVisible?: boolean;
  hasCompleteButton?: boolean;
  navigationIntegrateChildrenPages?: boolean;
  detachParentIntegration?: boolean;
}
```

### Pages Language Messages

```typescript
{
  [`page_${num}`]: string;
  __next: string;
  __previous: string;
  __complete: string;
}
```

## question

### Question Properties

```typescript
{
  responseType: string;
  hideLabel?: boolean;
  control: string;
  controlProperties: { [key: string]: any };
}
```

[Control properties](../questionControls/README.md) are specific to the control type

### Question Language Messages

```typescript
{
  __label: string;
  [questionControlMsgKey: string]: string;
}
```

## section

### Section Properties

```typescript
{
  children: string[];
}
```

### Section Language Messages

```typescript
{
  __label: string;
}
```

## separator

### Separator Properties

```typescript
{
  dir: "vertical" | "horizontal";
  hasLabel?: boolean;
  labelPosition: "start" | "center" | "end";
}
```

### Separator Language Messages

```typescript
{
  __label: string;
}
```
