import React, { useState } from 'react';
import addons, { StoryContext } from '@storybook/addons';
import { LOCALE_EVENT_NAME, SET_KNOB } from '../constants';
import { LocaleData } from '../typings';
import { getDefault, getParamVal } from '../utils';
import { getDefaultLocaleInfo } from '../utils';
import deepEqual from 'deep-equal';
import { CHANGE } from '@storybook/addon-knobs/dist/shared';

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
      if (getParamVal(context, SET_KNOB)) {
        chan.emit(CHANGE, { name: 'locale', value: data.locale });
      }

      if (!localeData || !deepEqual(data, localeData)) setLocaleData(data);
    };

    chan.on(LOCALE_EVENT_NAME, handleEvent);
    return () => chan.off(LOCALE_EVENT_NAME, handleEvent);
  }, [context, localeData]);

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
      if (getParamVal(context, SET_KNOB)) {
        chan.emit(CHANGE, { name: 'locale', value: data.locale });
      }

      setLocale(data.locale);
    };

    chan.on(LOCALE_EVENT_NAME, handleEvent);

    return () => chan.off(LOCALE_EVENT_NAME, handleEvent);
  }, [context]);

  return locale;
}
