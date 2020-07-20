import React from 'react';
import { Button } from './button';

export default {
  component: Button,
  title: 'Button',
  parameters: { locales: ['en', 'fr'], setLocaleToQuerystring: true },
};

export const Text = () => <Button>Hello Button</Button>;
