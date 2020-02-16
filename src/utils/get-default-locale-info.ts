import { StoryContext } from '@storybook/addons';
import { getLocales } from './get-locales';

export const getDefaultLocaleInfo = (context?: StoryContext) => {
  const locales = getLocales(context);
  if (!locales) return;
  return locales.find(x => x.default);
};
