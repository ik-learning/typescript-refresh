# How To Fetch EKS addons with typescript

- [DescribeClusterCommand how to sdk](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/eks/command/DescribeClusterCommand/)
- [EKS Client nodejs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-eks/)
- [Npm EKS client](https://www.npmjs.com/package/@aws-sdk/client-eks)
- [AWS EKS cli](https://docs.aws.amazon.com/cli/latest/reference/eks/#cli-aws-eks)

```sh
npm install @aws-sdk/client-eks
yarn add @aws-sdk/client-eks
pnpm add @aws-sdk/client-eks
npm i -g run-s
```

Can be added to package.json
```js
"build:docker": "ts-node tools/docker.ts",
"build:docs": "ts-node tools/generate-docs.ts",
"clean": "rimraf dist tmp",
"clean-cache": "node tools/clean-cache.mjs",
"compile:ts": "tsc -p tsconfig.app.json",
"config-validator": "ts-node lib/config-validator.ts",
"create-json-schema": "ts-node tools/generate-schema.ts && prettier --write --cache 'renovate-schema.json'",
"debug": "NODE_OPTIONS=--inspect-brk ts-node lib/renovate.ts",
"doc-fence-check": "node tools/check-fenced-code.mjs",
"lint-documentation": "jest --coverage false test/documentation.spec.ts",
"eslint": "eslint . --cache --cache-location .cache/eslint --report-unused-disable-directives",
"eslint-fix": "eslint --cache --cache-location .cache/eslint --fix . --report-unused-disable-directives",
"eslint-ci": "eslint . --cache --cache-strategy content --cache-location .cache/eslint --format gha",
"generate:imports": "node tools/generate-imports.mjs",
"git-check": "node tools/check-git-version.mjs",
"jest": "GIT_ALLOW_PROTOCOL=file LOG_LEVEL=fatal node --experimental-vm-modules node_modules/jest/bin/jest.js --logHeapUsage",
"lint": "run-s ls-lint type-check eslint prettier markdown-lint git-check doc-fence-check",
"lint-fix": "run-s eslint-fix prettier-fix markdown-lint-fix",
"ls-lint": "ls-lint",
"markdown-lint": "markdownlint-cli2",
"markdown-lint-fix": "markdownlint-cli2 --fix",
"mkdocs": "ts-node tools/mkdocs.ts",
"prepare": "run-s 'prepare:*'",
"prepare:husky": "husky",
"prepare:generate": "run-s 'generate:*'",
"prepare:deps": "node tools/prepare-deps.mjs",
"prestart": "run-s 'generate:*'",
"pretest": "run-s 'generate:*'",
"prettier": "prettier --cache --check '**/*.{ts,js,mjs,json,md,yml}'",
"prettier-fix": "prettier --write --cache '**/*.{ts,js,mjs,json,md,yml}'",
"release:prepare": "ts-node tools/prepare-release.ts",
"release:publish": "ts-node tools/publish-release.ts",
"test": "run-s lint test-schema jest",
"test-dirty": "git diff --exit-code",
"test-e2e": "run-s 'test-e2e:*'",
"test-e2e:pack": "npm pack",
"test-e2e:install": "cd test/e2e && npm install --no-package-lock --prod",
"test-e2e:run": "cd test/e2e && npm test",
"test-schema": "run-s create-json-schema",
"test:docs": "node --test tools/docs/test/**/*.mjs",
"schedule-test-shards": "SCHEDULE_TEST_SHARDS=true ts-node jest.config.ts",
"tsc": "tsc",
"type-check": "run-s 'generate:*' 'tsc --noEmit {@}' --",
"update-static-data": "run-s 'update-static-data:*'",
"update-static-data:distro-info": "node tools/static-data/generate-distro-info.mjs",
"update-static-data:node-schedule": "node tools/static-data/generate-node-schedule.mjs"
```


Errors

```sh
error: Uncaught (in promise) AccessDeniedException: User: arn:aws:sts::048958980748:assumed-role/AWSReservedSSO_PaasLimited_1e6f3b4b8eedd01d/IvanKatliarchuk@hollandandbarrett.com is not authorized to perform: eks:DescribeClusterVersions on resource: arn:aws:eks:eu-west-1:048958980748:*
```

```sh
aws eks list-addons --cluster-name eks-cluster-sandbox
aws eks describe-addon-versions --addon-name amazon-cloudwatch-observability --kubernetes-version 1.31
aws eks describe-addon-versions --addon-name amazon-cloudwatch-observability
```

## TODO:

- [ ] If no cluster version specified, fetch all cluster versions
- [ ] Only provide `defaultVersion`
