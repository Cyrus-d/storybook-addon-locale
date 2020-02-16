import { LocaleData } from '../typings';
import { API } from '@storybook/api';

export interface ReducerState {
  locales: LocaleData[];
  locale?: string;
  localeLocked?: boolean;
  defaultLocal?: string;
  api: API;
  lockButtonEnabled: boolean;
  localeDisabled: boolean;
}
