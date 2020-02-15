# storybook-addon-locale

A storybook addons that lets you select locale from the list.

![Example](./example.gif)

## Installation

Install the following npm module:

```sh
npm i --save-dev storybook-addon-locale
```

or with yarn:

```sh
yarn add -D storybook-addon-locale
```

Then, add following content to .storybook/addons.js

```js
import 'storybook-addon-locale/register';
```

## Configuration

Set locales in your `config.js` file:

```js
import { addParameters } from '@storybook/react';

addParameters({
  locales: ['en', 'fr']
});
```

configuration can also take object of data:

```js
import { addParameters } from '@storybook/react';

addParameters({
  locales: {
    en: { dir: 'ltr', name: 'English', text: 'English' },
    fa: { dir: 'rtl', name: 'Persian', text: 'فارسی' }
  }
});
```

To apply ltr-rtl direction to the story, the [storybook-rtl-addon](https://www.npmjs.com/package/storybook-rtl-addon) must be installed. and `dir` prop must be supplied as it shown above.

## Story integration

This addon come with two type of hooks:

- useLocale
- useLocaleData

useLocale will return locale code:

```js
import { useLocale } from 'storybook-addon-locale';

function MyComponent() {
  const locale = useLocale();

  return (
    <div>
      {locale === 'en' && <div>English</div>}
      {locale === 'fr' && <div>French</div>}
    </div>
  );
}
```

useLocaleData will return locale data as an object:

```js
import { useLocaleData } from 'storybook-addon-locale';

function MyComponent() {
  const localeData = useLocaleData();

  return (
    <div>
      {localeData && localeData.locale === 'en' && <div>{localeData.text}</div>}
      {localeData && localeData.locale === 'fa' && <div>{localeData.text}</div>}
    </div>
  );
}
```

You can also listen for the locale change event as follow:

```js
import addons from '@storybook/addons';
import { LOCALE_EVENT_NAME } from 'storybook-addon-locale';

// get channel to listen to event emitter
const channel = addons.getChannel();

// create a component that listens for the event change
function MyComponent() {
  // this example uses hook but you can also use class component as well
  const [localeData, setLocale] = useState();

  useEffect(() => {
    // listen to change
    channel.on(LOCALE_EVENT_NAME, setLocale);
    return () => channel.off(LOCALE_EVENT_NAME, setLocale);
  }, [channel, setLocale]);

  return (
    <div>
      {localeData && localeData.locale === 'en' && <div>{localeData.text}</div>}
      {localeData && localeData.locale === 'fa' && <div>{localeData.text}</div>}
    </div>
  );
}
```
