import React from 'react';
import addons from '@storybook/addons';
import { LOCALE_EVENT_NAME } from './constants';

/**
 * Returns the current state of storybook's locale
 */
export function useLocale(): string {
  const [locale, setLocale] = React.useState<string>('en');

  React.useEffect(() => {
    const chan = addons.getChannel();
    chan.on(LOCALE_EVENT_NAME, setLocale);
    return () => chan.off(LOCALE_EVENT_NAME, setLocale);
  }, []);

  return locale.toLowerCase();
}

export * from './constants';
