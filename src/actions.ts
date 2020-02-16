import { LocaleData } from './typings';
export type Action =
  | { type: 'setLocaleList'; items: LocaleData[] }
  | { type: 'setLocale'; locale: string }
  | { type: 'setDefaultLocale'; defaultLocal: string }
  | { type: 'setLockButtonEnabled'; enable: boolean }
  | { type: 'setLocaleDisabled'; disabled: boolean }
  | { type: 'setLocaleLock'; localeLocked: boolean };
