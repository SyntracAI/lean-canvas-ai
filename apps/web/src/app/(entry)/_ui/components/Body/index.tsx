'use client';
import {
  Button,
  Input,
  Textarea,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@syntrac/frontend-web-ui';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { PieChartIcon } from '@radix-ui/react-icons';
import { syntracClient } from '@/modules/syntrac';
import { configs } from '@/modules/config';

const formSchema = z.object({
  market: z.string().min(2),
  problem: z.string().min(2),
});

const TASK_NAME = 'Generate Canvas';

export const Body = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      market: '',
      problem: '',
    },
  });

  const generate = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const res = await syntracClient.track(TASK_NAME, async (_, headers) => {
        return await fetch(`${configs.NEXT_PUBLIC_API_ENDPOINT}/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: JSON.stringify(data),
        });
      });
      return await res.json();
    },
    onSuccess: (data) => {
      setTimeout(() => {
        syntracClient.completeTask(TASK_NAME);
      }, 2000);
      router.push(`/canvas/${data.id}`);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    generate.mutate(values);
  };

  return (
    <div className="grid gap-3 w-full max-w-[500px]" id="html-body">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h4>Lean Canvas AI</h4>
          <FormField
            control={form.control}
            name="market"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Who are you targeting?</FormLabel>
                <FormControl>
                  <Input placeholder="Fastfood restaurant" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="problem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Which problem are you trying to solves?</FormLabel>
                <FormControl>
                  <Textarea placeholder="Wasted food" {...field} />
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
    </div>
  );
};
