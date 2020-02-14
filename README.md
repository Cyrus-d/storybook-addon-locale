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

## Story integration

Use hook to get current locale:

```js
import { useLocale } from 'storybook-addon-locale';

const locale = useLocale();
return (
  <div>
    {locale === 'en' && <div>English</div>}
    {locale === 'fr' && <div>French</div>}
  </div>
);
```

You can also listen for the locale change event as follow:

```js
import addons from '@storybook/addons';
import { LOCALE_EVENT_NAME } from 'storybook-addon-locale';

// get channel to listen to event emitter
const channel = addons.getChannel();

// create a component that listens for the event change
function MyComponent({ children }) {
  // this example uses hook but you can also use class component as well
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    // listen to change
    channel.on(LOCALE_EVENT_NAME, setLocale);
    return () => channel.off(LOCALE_EVENT_NAME, setLocale);
  }, [channel, setLocale]);

  return (
    <div>
      {locale === 'en' && <div>English</div>}
      {locale === 'fr' && <div>French</div>}
    </div>
  );
}
```
