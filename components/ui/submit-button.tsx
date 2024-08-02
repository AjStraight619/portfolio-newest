'use client';

import React, { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './button';
import { Loader2 } from 'lucide-react';

const SubmitButton = ({ children }: { children: ReactNode }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <div className="w-full inline-flex">
          <span>Sending</span>
          <Loader2 className="animate-spin ml-2 w-4 h-4" />{' '}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
