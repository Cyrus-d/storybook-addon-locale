export type Direction = 'ltr' | 'rtl';

export interface LocaleData {
  locale: string;
  name?: string;
  dir?: Direction;
  [key: string]: any;
}
