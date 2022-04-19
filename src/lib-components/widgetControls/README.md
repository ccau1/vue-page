# Widgets

A widget is a component to display in the page. With this building block, we can piece different types of widgets to design a complete page. A widget container (ie. [pages](#pages-navigation), [section](#section)) can hold/points to children widgets

## Alert

type: `alert`

a container with text and color that catches user's attention

### Alert Properties

```typescript
interface AlertProperties {
  // what type of alert is this (effects colors)
  type: "default" | "info" | "success" | "danger" | "warning" | "custom";
  // if type is 'custom', what color to show
  customColor?: string;
  // whether close button is shown
  showCloseBtn?: boolean;
}
```

### Alert Language Messages

```typescript
{
  __title: string;
  __text: string;
}
```

## Header

type: `header`

show a header from h1 - h6

### Header Properties

```typescript
interface HeaderProperties {
  // the tag type to use
  tagType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
```

### Header Language Messages

```typescript
{
  __label: string;
}
```

## HTML Content

type: `html`

a block to show html content via string. This can be stored either in language messages or from an url

### HTML Properties

```typescript
interface HtmlProperties {
  // whether it is storing in default language messages or from a url
  from: "default" | "url";
  // if html is from url, define url path
  url?: string;
}
```

### HTML Language Messages

```typescript
{
  __html: string;
}
```

## Pages Navigation

type: `pages`

a navigation system to manage paging that also takes in account of errors and viewed pages

### Pages Properties

```typescript
interface PagesProperties {
  // a list of pages, holding each page's label and children
  pages: Array<{
    labelKey: string;
    idx?: number;
    children: string[];
  }>;
  // whether navigation (back/forward) is visible
  navigationVisible?: boolean;
  // whether the tabs/steps should show
  tabsVisible?: boolean;
  // whether to show complete button
  hasCompleteButton?: boolean;
  // whether navigation also navigates children when possible
  navigationIntegrateChildrenPages?: boolean;
  // whether to detach from parent's integration so parent won't trigger this pages' navigation
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

## Question

type: `question`

a question with label and question display based on question type. A list of pre-defined [question controls](../questionControls/README.md)

### Question Properties

```typescript
interface QuestionProperties {
  // the response data type (ie. BOOLEAN, TEXT)
  responseType: string;
  // whether to hide the label
  hideLabel?: boolean;
  // the control type
  control: string;
  // properties associated with the control type
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

## Section

type: `section`

a sub-contained area to show a separation of section

### Section Properties

```typescript
interface SectionProperties {
  // the children that this section holds
  children: string[];
}
```

### Section Language Messages

```typescript
{
  __label: string;
}
```

## Separator

type: `separator`

a line (vertical or horizontal) that is used for dividing sections

### Separator Properties

```typescript
interface SeparatorProperties {
  // direction of line
  dir: "vertical" | "horizontal";
  // whether to show label
  hasLabel?: boolean;
  // if show label, where does the label reside on the line
  labelPosition: "start" | "center" | "end";
}
```

### Separator Language Messages

```typescript
{
  __label: string;
}
```
