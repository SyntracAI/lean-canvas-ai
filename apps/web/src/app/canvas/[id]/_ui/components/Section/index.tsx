import { useMemo, useState } from 'react';
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@syntrac/frontend-web-ui';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Verifiy } from './Verify';
import { Edit } from './Edit';

interface SectionProps {
  jsonKey: string;
  title: string;
  data?: {
    id: string;
    template: Record<string, any>;
    verified: Record<string, boolean>;
  };
}
export const Section = ({ title, data, jsonKey }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { list, description, verified } = useMemo(() => {
    const isArray = Array.isArray(data?.template?.[jsonKey]);
    const value = data?.template?.[jsonKey];
    return {
      list: isArray ? value : [],
      description: !isArray ? value : undefined,
      verified: data?.verified?.[jsonKey],
    };
  }, [data]);
  return (
    <div className="p-4">
      <div className="inline-flex w-full items-center pb-2 gap-2">
        <h5 className="underline font-bold flex-1">{title}</h5>
        <Verifiy id={data?.id} jsonKey={jsonKey} verified={!!verified} />
        {verified ? null : (
          <Button
            className="w-8 h-8 rounded-full p-2"
            variant={'outline'}
            onClick={() => setIsOpen(true)}
          >
            <Pencil1Icon />
          </Button>
        )}
      </div>
      {description ? <p>{description}</p> : null}
      {(list || []).map((metric) => (
        <p key={metric}>- {metric}</p>
      ))}
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit {title}</SheetTitle>
          </SheetHeader>
          <Edit
            id={data?.id}
            jsonKey={jsonKey}
            onClose={() => setIsOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};
