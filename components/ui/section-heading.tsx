import React, { ReactNode } from 'react';

const SectionHeading = ({ children }: { children: ReactNode }) => {
  return <div className="h1 pb-16 text-center">{children}</div>;
};

export default SectionHeading;
