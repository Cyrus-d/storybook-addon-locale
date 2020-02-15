export type Direction = 'ltr' | 'rtl';

export interface LocaleData {
  locale: string;
  default?: boolean;
  name?: string;
  dir?: Direction;
  [key: string]: any;
}
