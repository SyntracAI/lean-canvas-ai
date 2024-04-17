import { join } from 'path';

import { getConfig } from '@syntrac/rig-rollup-config/configs/reactPackage';

export default getConfig({
  tsconfig: join(__dirname, 'tsconfig.json'),
});
