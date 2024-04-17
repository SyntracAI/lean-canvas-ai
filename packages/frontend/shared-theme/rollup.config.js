import { getConfig } from '@syntrac/rig-rollup-config/configs/reactPackage';

export default getConfig({
  input: {
    index: './src/index.ts',
  },
  preserveModules: false,
  extraFormats: ['cjs'],
});
