import * as url from 'url';
import { program } from 'commander';
import path from 'path';
import process from 'process';

import { runBash, logger } from '@syntrac/tool-cli-helper';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const init = async () => {
  const rollupPath = path.join(__dirname, '../node_modules/.bin/rollup');
  const typescriptPath = path.join(__dirname, '../node_modules/.bin/tsc');
  const resolveLocalModule = name => path.join(process.cwd(), name);

  program
    .name('st-build-ts-package')
    .option('-w, --watch', 'Watch for change')
    .option('--skip-typecheck', 'skip typechecking');

  program.parse(process.argv);

  const options = program.opts();

  if (options.watch) {
    logger.info('Watching package...');

    const cmds = [
      runBash(
        `${rollupPath} -c ${resolveLocalModule('rollup.config.js')} --bundleConfigAsCjs --watch`
      ),
      runBash(
        `${typescriptPath} --emitDeclarationOnly --skipLibCheck --watch --declarationDir dist`
      )
    ];

    await Promise.all(cmds);
  } else {
    logger.info('Building package...');

    const cmds = [
      runBash(
        `${rollupPath} -c ${resolveLocalModule('rollup.config.js')} --bundleConfigAsCjs --silent`
      ),
      options.skipTypecheck ? Promise.resolve(undefined) :
        runBash(`${typescriptPath} --emitDeclarationOnly --skipLibCheck --declarationDir ./dist`),
    ];

    await Promise.all(cmds);
  }
};
