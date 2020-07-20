import { API } from '@storybook/api';
import { LocaleData, ReducerState } from './typings';
import { Action } from './actions';
import { LOCALE_EVENT_NAME } from './constants';
import { Direction_SET_MODE_EVENT_NAME } from 'storybook-rtl-addon/dist/constants';
import { getDefault } from './utils';
import { StoryContext } from '@storybook/addons';

export const emitEvents = (api: API, locales: LocaleData[], loc: string) => {
  const localeInfo = locales.find((x) => x.locale === loc);

  if (!localeInfo) return;
  const chan = api.getChannel();
  chan.emit(LOCALE_EVENT_NAME, localeInfo);

  if (localeInfo.dir) {
    chan.emit(Direction_SET_MODE_EVENT_NAME, localeInfo.dir);
  }
};

export const defaultLocaleMiddleware = (store: any) => (
  next: (ac: Action) => void
) => (action: Action) => {
  const state = store.getState() as ReducerState;

  if (action.type === 'setLocale') {
    emitEvents(state.api, state.locales, action.locale);
  } else if (action.type === 'setDefaultLocale') {
    if (state.localeLocked && state.locale) {
      action.defaultLocal = state.locale;
    }

    emitEvents(state.api, state.locales, action.defaultLocal);
  } else if (action.type === 'setLocaleLock') {
    if (action.localeLocked === false)
      store.dispatch({
        type: 'setLocale',
        locale: getDefault(
          (state.api.getCurrentStoryData() as unknown) as StoryContext
        ),
      });
  }

  return next(action);
};
