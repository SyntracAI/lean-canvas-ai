import { Syntrac } from '@syntrac/js-sdk';
import { configs } from './config';

export const syntracClient = new Syntrac();

if (typeof window !== 'undefined') {
  syntracClient.init(
    configs.NEXT_PUBLIC_SYNTRAC_KEY || '',
    configs.NEXT_PUBLIC_SYNTRAC_ENDPOINT || '',
  );
  syntracClient.subscribeToNewIssue(() => {
    //syntracClient.openWidget();
  });
}
