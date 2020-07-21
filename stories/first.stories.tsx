import React from 'react';
import { useDirection } from 'storybook-rtl-addon';
import { text, withKnobs } from '@storybook/addon-knobs';
import { useLocale } from '../src';

export default {
  component: 'direction',
  decorators: [withKnobs],
  parameters: {
    setDirectionKnob: true,
    locales: {
      en: { dir: 'ltr', name: 'English', text: 'English' },
      fa: { dir: 'rtl', name: 'Persian', text: 'فارسی' },
    },
    setLocaleKnob: true,
  },
  title: 'direction',
};

export function WithDirection(context) {
  const dir = useDirection(context);
  const loc = useLocale(context);
  console.log(context);
  return (
    <div>
      {text('direction', 'ltr')}-{dir}
      <br />
      {text('locale', 'en')}-{loc}
    </div>
  );
}
