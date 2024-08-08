import React, { useEffect, useState } from 'react';
import Logo from '#wf-local/components/logo';

import SettingButton from './setting-button';

export const HeaderSimple: React.FC = () => {
  return (
    <header className="flex h-16 w-full items-center justify-between px-6">
      <Logo size={30} />
      <SettingButton />
    </header>
  );
}

export default HeaderSimple;
