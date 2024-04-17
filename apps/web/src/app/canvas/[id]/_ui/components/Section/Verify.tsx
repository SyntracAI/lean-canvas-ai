import { Switch } from '@syntrac/frontend-web-ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { syntracClient } from '@/modules/syntrac';
import { configs } from '@/modules/config';

interface VerifiyProps {
  jsonKey: string;
  verified: boolean;
  id?: string;
}
export const Verifiy = ({ id, jsonKey, verified }: VerifiyProps) => {
  const queryClient = useQueryClient();
  const verify = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${configs.NEXT_PUBLIC_API_ENDPOINT}/canvas/${id}/verified/${jsonKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return await res.json();
    },
    onSuccess: () => {
      syntracClient.completeTask(jsonKey);
      queryClient.refetchQueries({
        queryKey: ['canvas', id],
      });
    },
  });

  return <Switch checked={verified} onCheckedChange={() => verify.mutate()} />;
};
