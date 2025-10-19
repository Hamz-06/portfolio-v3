'use client';

import { useDisplayFooter } from '@/redux/slice/layoutSlice';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

type FooterClientProps = {
  children: React.ReactNode;
  className: string;
};

function FooterClient({ children, className }: FooterClientProps) {
  const footerValue = useDisplayFooter();
  return (
    <div
      id="footer"
      className={clsx(
        className,
        'transition-all duration-300',
        !footerValue ? 'hidden' : 'flex'
      )}
    >
      {children}
    </div>
  );
}

export { FooterClient };
