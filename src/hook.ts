import React from 'react';
import addons from '@storybook/addons';
import { LOCALE_EVENT_NAME } from './constants';
import { LocaleData } from './typings';

/**
 * Returns locale data as object
 */
export function useLocaleData() {
  const [localeData, setLocaleData] = React.useState<LocaleData>();

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
export function useLocale() {
  const localData = useLocaleData();
  return localData && localData.locale;
}

export * from './constants';
