import z from 'zod';

export const configs = z
  .object({
    NEXT_PUBLIC_SYNTRAC_ENDPOINT: z.string(),
    NEXT_PUBLIC_SYNTRAC_KEY: z.string(),
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
  })
  .parse({
    NEXT_PUBLIC_SYNTRAC_ENDPOINT: process.env.NEXT_PUBLIC_SYNTRAC_ENDPOINT,
    NEXT_PUBLIC_SYNTRAC_KEY: process.env.NEXT_PUBLIC_SYNTRAC_KEY,
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  });
