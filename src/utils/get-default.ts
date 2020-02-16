import { LOCALES_PARAM_KEY, PARAM_KEY_DEFAULT } from '../constants';
import { StoryContext } from '@storybook/addons';
import { getParamVal } from './params';

export const getDefault = (data?: StoryContext) => {
  if (!data) return undefined;
  const defaultLocale = getParamVal(data, PARAM_KEY_DEFAULT);
  if (defaultLocale) return defaultLocale;

  const locales = getParamVal(data, LOCALES_PARAM_KEY);

  if (Array.isArray(locales)) return locales[0];

  return Object.keys(locales)[0];
};
