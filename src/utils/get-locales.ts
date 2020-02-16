import { LocaleData } from '../typings';
import { LOCALES_PARAM_KEY } from '../constants';
import { getDefault } from './get-default';
import { getParamVal } from './params';

export const getLocales = (data: any) => {
  const locales = getParamVal(data, LOCALES_PARAM_KEY);

  if (!locales) return;

  const defaultLocale = getDefault(data);

  let localeArr: LocaleData[] = [];

  if (Array.isArray(locales))
    localeArr = locales.map(l => {
      return { locale: l, default: l === defaultLocale };
    });
  else {
    localeArr = Object.keys(locales).map(loc => {
      return {
        locale: loc,
        default: loc === defaultLocale,
        ...locales[loc]
      };
    });
  }

  if (!localeArr) return;

  return localeArr;
};
