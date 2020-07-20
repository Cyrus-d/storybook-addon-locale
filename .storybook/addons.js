import '../register';
import { addParameters } from '@storybook/react'; // or any other type of storybook

addParameters({
  locales: {
    en: { dir: 'ltr', name: 'English', text: 'English' },
    fa: { dir: 'rtl', name: 'Persian', text: 'فارسی' },
  },
  enableLocaleLockButton: true,
  setLocaleToQuerystring: true,
});
