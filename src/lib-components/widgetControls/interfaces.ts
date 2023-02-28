import { TranslateData, TranslateKey, WidgetError } from '../interfaces';

import { WidgetItem } from '../models';

export interface WidgetControlDisplayProps<
  WidgetProperties = any,
  Value = any
> {
  widget: WidgetItem<WidgetProperties>;
  properties: WidgetProperties;
  onChange: (newVal: Value) => void;
  value?: Value;
  setWidgetState: (key: string, value: any) => void;
  getWidgetState: (key: string) => any;
  view: string;
  errors: WidgetError[] | null;
  t: (key: TranslateKey, data?: TranslateData) => string;
}
