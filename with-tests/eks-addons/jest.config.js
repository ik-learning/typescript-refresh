import crypto from 'node:crypto';
import os from 'node:os';
import { env } from 'node:process';
import v8 from 'node:v8';
import { minimatch } from 'minimatch';
import type { JestConfigWithTsJest } from 'ts-jest';

const ci = !!process.env.CI;

type JestConfig = JestConfigWithTsJest & {
  // https://github.com/renovatebot/renovate/issues/17034
  workerIdleMemoryLimit?: string;
};

const cpus = os.cpus();
const mem = os.totalmem();
const stats = v8.getHeapStatistics();

/**
 * https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources
 * Currently it seems the runner only have 4GB
 */
function jestGithubRunnerSpecs(): JestConfig {
  // if (os.platform() === 'darwin') {
  //   return {
  //     maxWorkers: 2,
  //     workerIdleMemoryLimit: '4GB',
  //   };
  // }

  return {
    maxWorkers: cpus.length,
    workerIdleMemoryLimit: '1500MB', // '2GB',
  };
}

/**
 * Configuration for single test shard.
 */
interface ShardConfig {
  /**
   * Path patterns to match against the test file paths, of two types:
   *
   * 1. Particular file, e.g. `lib/util/git/index.spec.ts`
   *
   *    - File pattern MUST end with `.spec.ts`
   *    - This will only search for the particular test file
   *    - It enables coverage for the `*.ts` file with the same name,
   *      e.g. `lib/util/git/index.ts`
   *    - You probably want to use directory pattern instead
   *
   * 2. Whole directory, e.g. `lib/modules/datasource`
   *
   *    - This will search for all `*.spec.ts` files under the directory
   *    - It enables coverage all `*.ts` files under the directory,
   *      e.g. `lib/modules/datasource/foo/bar/baz.ts`
   */
  matchPaths: string[];
}



const config: JestConfig = {
  ...configureShardingOrFallbackTo({
    coverageDirectory: './coverage',
  }),
  collectCoverageFrom: [
    'lib/**/*.{js,ts}',
    '!lib/**/*.{d,spec}.ts',
    '!lib/**/{__fixtures__,__mocks__,__testutil__,test}/**/*.{js,ts}',
    '!lib/**/types.ts',
  ],
  coveragePathIgnorePatterns: getCoverageIgnorePatterns(),
  cacheDirectory: '.cache/jest',
  collectCoverage: true,
  coverageReporters: ci
    ? ['lcovonly', 'json']
    : ['html', 'text-summary', 'json'],
  transform: {
    '\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        diagnostics: false,
        isolatedModules: true,
      },
    ],
  },
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '/__fixtures__/',
    '/__mocks__/',
  ],
  reporters: ci ? ['default', 'github-actions'] : ['default'],
  resetMocks: true,
  setupFilesAfterEnv: [
    'jest-extended/all',
    'expect-more-jest',
    '<rootDir>/test/setup.ts',
    '<rootDir>/test/to-migrate.ts',
  ],
  snapshotSerializers: ['<rootDir>/test/newline-snapshot-serializer.ts'],
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  watchPathIgnorePatterns: ['<rootDir>/.cache/', '<rootDir>/coverage/'],
  // We can play with that value later for best dev experience
  workerIdleMemoryLimit: '500MB',
  // add github runner specific limits
  ...(ci && jestGithubRunnerSpecs()),
};

export default config;

type RunsOn = 'ubuntu-latest' | 'windows-latest' | 'macos-latest';

interface ShardGroup {
  /**
   * Input for `runs-on` field.
   */
  os: RunsOn;

  /**
   * Controls whether coverage is collected for this shard group.
   */
  coverage: boolean;

  /**
   * Input for `name` field.
   */
  name: string;

  /**
   * Space-separated list of shard keys, it's
   * meant to be inserted into bash for-loop.
   */
  shards: string;

  /**
   * It's meant to be used for Jest caching.
   */
  'cache-key': string;

  /**
   * It's used to set test runner timeout.
   */
  'runner-timeout-minutes': number;

  /**
   * It's used to set `--test-timeout` Jest CLI flag.
   */
  'test-timeout-milliseconds': number;

  /**
   * It's used as the name for coverage artifact.
   */
  'upload-artifact-name': string;
}
