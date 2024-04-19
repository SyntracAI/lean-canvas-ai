import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Textarea,
} from '@syntrac/frontend-web-ui';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckIcon, PieChartIcon } from '@radix-ui/react-icons';
import { syntracClient } from '@/modules/syntrac';
import { configs } from '@/modules/config';

const formSchema = z.object({
  prompt: z.string().min(2),
});

interface EditProps {
  onClose: () => void;
  jsonKey: string;
  id?: string;
}
export const Edit = ({ id, jsonKey, onClose }: EditProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const queryClient = useQueryClient();
  const generate = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      /*
         When user interact with AI, track their interaction with a task label
         This will generate a unique action id which we need to send to backend
         for correlation
       */
      const { headers, actionId } = syntracClient.track(jsonKey, {
        domId: 'edit',
      });
      const res = await fetch(
        `${configs.NEXT_PUBLIC_API_ENDPOINT}/canvas/${id}/template/${jsonKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: JSON.stringify(values),
        },
      );
      return {
        json: await res.json(),
        actionId,
      };
    },
    onSuccess: (data) => {
      /*
         Optional if you need to detect dom mutation
      */
      syntracClient.completeAction(data.actionId);
    },
  });

  const { list, description } = useMemo(() => {
    const isArray = Array.isArray(generate?.data?.[jsonKey]);
    const value = generate?.data?.[jsonKey];
    return {
      list: isArray ? value : [],
      description: !isArray ? value : undefined,
      value,
    };
  }, [generate.data]);

  const update = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${configs.NEXT_PUBLIC_API_ENDPOINT}/canvas/${id}/template/${jsonKey}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            value: generate?.data?.[jsonKey],
          }),
        },
      );
      return await res.json();
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['canvas', id],
      });
      onClose();
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    generate.mutate(values);
  };

  return (
    <div id="edit" className="grid gap-4 w-full max-w-[500px]">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ask</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Explain what do you want to achieve"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">
            Generate
            {generate.isPending ? (
              <PieChartIcon className="h-6 w-6 animate-spin ml-2" />
            ) : null}
          </Button>
        </form>
      </FormProvider>
      {!generate?.isPending && generate?.data ? (
        <div className="bg-background-shade p-4 rounded-md">
          {description ? <p>{description}</p> : null}
          {(list || []).map((metric) => (
            <p key={metric}>- {metric}</p>
          ))}
          <div className="inline-flex w-full justify-end">
            <Button
              className="w-9 h-9 rounded-full p-2"
              variant="outline"
              onClick={() => update.mutate()}
            >
              <CheckIcon />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
