import React from 'react';
import addons from '@storybook/addons';
import { LOCALE_EVENT_NAME } from './constants';
import { LocaleData } from './typings';

/**
 * Returns locale data as object
 */
export function useLocaleData(def = 'en') {
  const [localeData, setLocaleData] = React.useState<LocaleData>({
    locale: def
  });

  React.useEffect(() => {
    const chan = addons.getChannel();
    chan.on(LOCALE_EVENT_NAME, setLocaleData);
    return () => chan.off(LOCALE_EVENT_NAME, setLocaleData);
  }, []);

  return localeData;
}

/**
 * Returns locale code
 */
export function useLocale(def = 'en') {
  const localData = useLocaleData(def);
  return localData.locale;
}

export * from './constants';
