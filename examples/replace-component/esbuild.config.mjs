// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import esbuild from 'esbuild';
import {replace} from 'esbuild-plugin-replace';
import copyPlugin from 'esbuild-plugin-copy';
import {config as dotenvConfig} from 'dotenv';

import process from 'node:process';
import fs from 'node:fs';
import {spawn} from 'node:child_process';
import {join, resolve} from 'node:path';
import {createRequire} from 'node:module';
import {copyFileSync, existsSync} from 'node:fs';
import {execSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {reactVirtualizedPlugin} from './react-virtualized-plugin.mjs';
import KeplerPackage from '../../package.json' assert {type: 'json'};

const args = process.argv;
const LIB_DIR = resolve('../../');
const NODE_MODULES_DIR = resolve(LIB_DIR, 'node_modules');
const SRC_DIR = resolve(LIB_DIR, 'src');

// Load environment variables from .env file
dotenvConfig({path: resolve(LIB_DIR, '.env')});

const port = 8080;
const NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'production');

// Add alias to serve from kepler src, resolve libraries so there is only one copy of them
const RESOLVE_LOCAL_ALIASES = {
  react: `${NODE_MODULES_DIR}/react`,
  'react-dom': `${NODE_MODULES_DIR}/react-dom`,
  'react-redux': `${NODE_MODULES_DIR}/react-redux/lib`,
  'styled-components': `${NODE_MODULES_DIR}/styled-components`,
  'react-intl': `${NODE_MODULES_DIR}/react-intl`,
  'react-palm': `${NODE_MODULES_DIR}/react-palm`,
  // Fix react-virtualized import issues
  'react-virtualized': `${NODE_MODULES_DIR}/react-virtualized`,
  // Kepler.gl modules - resolve from source
  '@kepler.gl/actions': `${SRC_DIR}/actions/src`,
  '@kepler.gl/components': `${SRC_DIR}/components/src`,
  '@kepler.gl/constants': `${SRC_DIR}/constants/src`,
  '@kepler.gl/reducers': `${SRC_DIR}/reducers/src`,
  '@kepler.gl/schemas': `${SRC_DIR}/schemas/src`,
  '@kepler.gl/utils': `${SRC_DIR}/utils/src`,
  '@kepler.gl/layers': `${SRC_DIR}/layers/src`,
  '@kepler.gl/processors': `${SRC_DIR}/processors/src`,
  '@kepler.gl/tasks': `${SRC_DIR}/tasks/src`,
  '@kepler.gl/table': `${SRC_DIR}/table/src`,
  '@kepler.gl/types': `${SRC_DIR}/types/src`,
  // Suppress useless warnings from react-date-picker's dep
  'tiny-warning': `${SRC_DIR}/utils/src/noop.ts`,
  // kepler.gl and loaders.gl need to use same apache-arrow
  'apache-arrow': `${NODE_MODULES_DIR}/apache-arrow`
};

const config = {
  platform: 'browser',
  format: 'iife',
  logLevel: 'info',
  loader: {
    '.js': 'jsx',
    '.jsx': 'jsx',
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css',
    '.ttf': 'file',
    '.woff': 'file',
    '.woff2': 'file'
  },
  entryPoints: ['src/main.tsx'],
  outfile: 'dist/bundle.js',
  bundle: true,
  alias: RESOLVE_LOCAL_ALIASES,
  external: [],
  define: {
    NODE_ENV,
    'process.env.MapboxAccessToken': JSON.stringify(process.env.MapboxAccessToken || ''),
    'process.env.DropboxClientId': JSON.stringify(process.env.DropboxClientId || ''),
    'process.env.MapboxExportToken': JSON.stringify(process.env.MapboxExportToken || ''),
    'process.env.CartoClientId': JSON.stringify(process.env.CartoClientId || ''),
    'process.env.FoursquareClientId': JSON.stringify(process.env.FoursquareClientId || ''),
    'process.env.FoursquareDomain': JSON.stringify(process.env.FoursquareDomain || ''),
    'process.env.FoursquareAPIURL': JSON.stringify(process.env.FoursquareAPIURL || ''),
    'process.env.FoursquareUserMapsURL': JSON.stringify(process.env.FoursquareUserMapsURL || ''),
    'process.env.NODE_DEBUG': JSON.stringify(false)
  },
  plugins: [
    // Custom plugin to fix react-virtualized missing export
    reactVirtualizedPlugin,
    // automatically injected kepler.gl package version into the bundle
    replace({
      __PACKAGE_VERSION__: KeplerPackage.version,
      include: /constants\/src\/default-settings\.ts/
    }),
    copyPlugin({
      resolveFrom: 'cwd',
      assets: {
        from: ['index.html'],
        to: ['dist/index.html']
      }
    })
  ]
};

function openURL(url) {
  const cmd = {
    darwin: ['open'],
    linux: ['xdg-open'],
    win32: ['cmd', '/c', 'start']
  };
  const command = cmd[process.platform];
  if (command) {
    spawn(command[0], [...command.slice(1), url]);
  }
}

(async () => {
  if (args.includes('--build')) {
    await esbuild
      .build({
        ...config,
        minify: true,
        sourcemap: false,
        define: {
          ...config.define,
          'process.env.NODE_ENV': '"production"'
        },
        drop: ['console', 'debugger'],
        treeShaking: true
      })
      .catch(e => {
        console.error(e);
        process.exit(1);
      });
  }

  if (args.includes('--start')) {
    await esbuild
      .context({
        ...config,
        minify: false,
        sourcemap: true,
        banner: {
          js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`
        }
      })
      .then(async ctx => {
        await ctx.watch();
        await ctx.serve({
          servedir: 'dist',
          port,
          fallback: 'dist/index.html',
          onRequest: ({remoteAddress, method, path, status, timeInMS}) => {
            console.info(remoteAddress, status, `"${method} ${path}" [${timeInMS}ms]`);
          }
        });
        console.info(
          `kepler.gl demo app running at http://localhost:${port}, press Ctrl+C to stop`
        );
        openURL(`http://localhost:${port}`);
      })
      .catch(e => {
        console.error(e);
        process.exit(1);
      });
  }
})();
