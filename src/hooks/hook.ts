import React, { useState } from 'react';
import addons, { StoryContext } from '@storybook/addons';
import { LOCALE_EVENT_NAME, SET_LOCALE_TO_QUERYSTRING } from '../constants';
import { LocaleData } from '../typings';
import { getDefault, getParamVal } from '../utils';
import { getDefaultLocaleInfo } from '../utils';
import deepEqual from 'deep-equal';

/**
 * Returns locale data as object
 */
export function useLocaleData(context?: StoryContext) {
  const [localeData, setLocaleData] = React.useState<LocaleData | undefined>(
    getDefaultLocaleInfo(context)
  );

  React.useEffect(() => {
    const chan = addons.getChannel();

    const handleEvent = (data: LocaleData) => {
      if (getParamVal(context, SET_LOCALE_TO_QUERYSTRING)) {
      }

      if (!localeData || !deepEqual(data, localeData)) setLocaleData(data);
    };

    chan.on(LOCALE_EVENT_NAME, handleEvent);
    return () => chan.off(LOCALE_EVENT_NAME, handleEvent);
  }, [localeData]);

  return localeData;
}

/**
 * Returns locale code
 */
export function useLocale(context?: StoryContext) {
  const [locale, setLocale] = useState(getDefault(context));
  React.useEffect(() => {
    const chan = addons.getChannel();

    const handleEvent = (data: LocaleData) => {
      setLocale(data.locale);
    };

    chan.on(LOCALE_EVENT_NAME, handleEvent);

    return () => chan.off(LOCALE_EVENT_NAME, handleEvent);
  }, []);

  return locale;
}
