import * as React from 'react';
import { useCallback, useEffect, useState, Dispatch } from 'react';
import { IconButton } from '@storybook/components';
import { API } from '@storybook/api';
import { PARAM_LOCK_BUTTON_ENABLED, LOCALE_EVENT_SET_LOCAL } from './constants';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Language, Lock } from './icons';
import { getLocales, getParamVal } from './utils';
import { Tooltip } from '@material-ui/core';
import { createReducer } from 'react-use';
import { reducer } from './reducer';
import { Action } from './actions';
import { defaultLocaleMiddleware } from './middleware';
import { ReducerState } from './typings';

type ReducerType = (
  r: typeof reducer,
  initializerArg: ReducerState
) => [ReducerState, Dispatch<Action>];
const useThunkReducer = (createReducer(
  defaultLocaleMiddleware
) as unknown) as ReducerType;

interface LocaleToolProps {
  api: API;
}

export const LocaleTool: React.FunctionComponent<LocaleToolProps> = props => {
  const { api } = props;

  const [state, dispatch] = useThunkReducer(reducer, {
    api,
    locales: [],
    lockButtonEnabled: false,
    localeDisabled: false
  });

  const {
    locales,
    locale,
    localeLocked,
    lockButtonEnabled,
    localeDisabled
  } = state;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLocaleChange = useCallback(
    (loc: string) => {
      handleClose();
      dispatch({ type: 'setLocale', locale: loc });
    },
    [dispatch, handleClose]
  );

  const handleLocalLocking = useCallback(() => {
    dispatch({ type: 'setLocaleLock', localeLocked: !localeLocked });
  }, [dispatch, localeLocked]);

  useEffect(() => {
    if (!locales || !locales.length) return;
    const def = locales.find(x => x.default)?.locale as string;
    dispatch({ type: 'setDefaultLocale', defaultLocal: def });
  }, [dispatch, locales]);

  const handleLocaleList = useCallback(() => {
    const data = api.getCurrentStoryData();

    const localeArr = getLocales(data);

    dispatch({ type: 'setLocaleDisabled', disabled: !localeArr });
    if (!localeArr) return;

    dispatch({ type: 'setLocaleList', items: localeArr });

    dispatch({
      type: 'setLockButtonEnabled',
      enable: getParamVal(data, PARAM_LOCK_BUTTON_ENABLED)
    });
  }, [api, dispatch]);

  useEffect(() => {
    const channel = api.getChannel();
    channel.on('docsRendered', handleLocaleList);
    channel.on('storyRendered', handleLocaleList);
    if (!localeLocked) channel.on(LOCALE_EVENT_SET_LOCAL, handleLocaleChange);
    return () => {
      channel.removeListener('storyRendered', handleLocaleList);
      channel.removeListener('docsRendered', handleLocaleList);
      channel.removeListener(LOCALE_EVENT_SET_LOCAL, handleLocaleChange);
    };
  }, [api, handleLocaleChange, handleLocaleList, localeLocked]);

  if (localeDisabled) return null;

  return (
    <>
      <IconButton
        key="locale-language"
        title="Click to change locale"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <div>
          <Language />
          {locale && (
            <small style={{ position: 'relative', bottom: 4 }}>
              {locale.toLocaleUpperCase()}
            </small>
          )}
        </div>
      </IconButton>
      {lockButtonEnabled && (
        <Tooltip title="lock to selected local">
          <IconButton active={localeLocked} onClick={handleLocalLocking}>
            <Lock />
          </IconButton>
        </Tooltip>
      )}

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        style={{ minWidth: 500 }}
        onClose={handleClose}
      >
        {locales.map(localData => {
          return (
            <MenuItem
              key={localData.locale}
              selected={localData.locale === locale}
              onClick={() => handleLocaleChange(localData.locale)}
            >
              {localData.name || localData.locale.toUpperCase()}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default LocaleTool;
