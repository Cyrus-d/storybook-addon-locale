import { ReducerState } from './typings';
import { Action } from './actions';

export function reducer(state: ReducerState, action: Action) {
  switch (action.type) {
    case 'setLocaleList':
      return { ...state, locales: action.items };
    case 'setLockButtonEnabled':
      return { ...state, lockButtonEnabled: action.enable };
    case 'setLocale':
      return { ...state, locale: action.locale };
    case 'setLocaleDisabled':
      return { ...state, localeDisabled: action.disabled };
    case 'setLocaleLock':
      return {
        ...state,
        localeLocked: action.localeLocked
      };
    case 'setDefaultLocale':
      return { ...state, locale: action.defaultLocal };
    default:
      throw new Error();
  }
}
