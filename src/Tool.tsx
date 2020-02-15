import * as React from 'react';
import { IconButton } from '@storybook/components';
import { API, useAddonState } from '@storybook/api';
import { LOCALE_EVENT_NAME, ADDON_ID, PARAM_KEY } from './constants';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Language } from './icons';
import { LocaleData } from './typings';
import { Direction_SET_MODE_EVENT_NAME } from 'storybook-rtl-addon';

interface LocaleToolProps {
  api: API;
}

export const LocaleTool: React.FunctionComponent<LocaleToolProps> = props => {
  const [locale, setLocale] = useAddonState<string|undefined>(ADDON_ID,undefined);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [locales, setLocales] = React.useState<LocaleData[]>([]);
  const { api } = props;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    handleClose();
    const localeInfo = locales.find(x => x.locale === locale);

    if (!localeInfo) return;

    const chan = props.api.getChannel();

    chan.emit(LOCALE_EVENT_NAME, localeInfo);

    if (localeInfo.dir) {
      chan.emit(Direction_SET_MODE_EVENT_NAME, localeInfo.dir);
    }
  }, [locale, locales, props.api]);

  React.useEffect(() => {
    if (!locales || locale) return;

    const defaultLocale = locales.find(x => x.default === true);
    if(defaultLocale)
    setLocale(defaultLocale?.locale);

  }, [locale, locales, setLocale]);

  const handleLocales = React.useCallback(() => {
    const data = api.getCurrentStoryData();

    if (!data || !('parameters' in data)) {
      return;
    }

    const { parameters } = data;

    const localeParam = parameters[PARAM_KEY];

    if (Array.isArray(localeParam))
      setLocales(
        localeParam.map((l, i) => {
          return { locale: l, default: i === 0 };
        })
      );
    else {
      const localArr =    Object.keys(localeParam).map(loc => {
        return {
          locale: loc,
          ...localeParam[loc]
        };
      });
      if(!localArr)return;
      if(!localArr.find(x=>x.default))
       {
          localArr[0].default=true;
        }

      setLocales(localArr);
    }
  }, [api]);

  React.useEffect(() => {
    const channel = api.getChannel();
    channel.on('storiesConfigured', handleLocales);
    channel.on('docsRendered', handleLocales);
    channel.on('storyRender', handleLocales);
    return () => {
      channel.removeListener('storiesConfigured', handleLocales);
      channel.removeListener('docsRendered', handleLocales);
      channel.removeListener('storyRender', handleLocales);
    };
  }, [api, handleLocales]);

  const resetLocale = React.useCallback(() => {
    if(!locales){
      setLocale(undefined);
      return;
    }

    const def =locales.find(x=>x.default) ;
    if(!def) {
      setLocale(undefined);
      return
    }

    setLocale(def.locale);
  }, [locales, setLocale]);

  React.useEffect(() => {
    const channel = api.getChannel();
    channel.on('storyChanged', resetLocale);
    return () => {
      channel.removeListener('storyChanged', resetLocale);
    };
  }, [api, resetLocale]);

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
          {locale&&
          <small style={{ position: 'relative', bottom: 4 }}>
            {locale.toLocaleUpperCase()}
          </small>
          }
        </div>
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {locales.map(localData => {
          return (
            <MenuItem
              key={localData.locale}
              selected={localData.locale === locale}
              onClick={() => setLocale(localData.locale)}
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
