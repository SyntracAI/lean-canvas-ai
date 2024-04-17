'use client';
import { Button } from '@syntrac/frontend-web-ui';
import { syntracClient } from '@/modules/syntrac';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

export const Widget = () => {
  return (
    <div className="fixed bottom-[10px] right-[10px]">
      <Button
        onClick={() => {
          syntracClient.openWidget();
        }}
        variant={'ghost'}
        className="w-10 h-10 p-2"
      >
        <DotsVerticalIcon />
      </Button>
    </div>
  );
};
