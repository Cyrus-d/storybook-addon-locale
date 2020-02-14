import * as React from 'react';
import { IconButton } from '@storybook/components';
import { API, useAddonState } from '@storybook/api';
import { LOCALE_EVENT_NAME, ADDON_ID, PARAM_KEY } from './constants';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Language } from './icons';

interface LocaleToolProps {
  api: API;
}

export const LocaleTool: React.FunctionComponent<LocaleToolProps> = props => {
  const { api } = props;
  const [locale, setLocale] = useAddonState<string>(ADDON_ID, 'en');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [locales, setLocales] = React.useState<string[]>([]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    handleClose();
    props.api.getChannel().emit(LOCALE_EVENT_NAME, locale);
  }, [locale, props.api]);

  const handleLocales = () => {
    const data = api.getCurrentStoryData();

    if (!('parameters' in data)) {
      return;
    }

    const { parameters } = data;

    setLocales(parameters[PARAM_KEY]);
  };

  React.useEffect(() => {
    const channel = props.api.getChannel();
    channel.on('storyChanged', handleLocales);
    channel.on('storiesConfigured', handleLocales);
    channel.on('docsRendered', handleLocales);

    return () => {
      channel.removeListener('storyChanged', handleLocales);
      channel.removeListener('storiesConfigured', handleLocales);
      channel.removeListener('docsRendered', handleLocales);
    };
  });

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
          <small style={{ position: 'relative', bottom: 4 }}>
            {locale.toLocaleUpperCase()}
          </small>
        </div>
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {locales.map(l => {
          return (
            <MenuItem key={l} onClick={() => setLocale(l)}>
              {l.toUpperCase()}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default LocaleTool;
