import {
  AddonInfo,
  AddonVersionInfo,
  Compatibility,
  DescribeAddonVersionsCommand,
  DescribeAddonVersionsCommandInput,
  DescribeAddonVersionsCommandOutput,
  EKSClient
} from '@aws-sdk/client-eks';

import { logger } from './utils/logger';

import type { GetReleasesConfig, ReleaseResult } from './utils/types';

import { fromNodeProviderChain } from '@aws-sdk/credential-providers';

import { EksAddonsFilter } from './schema';

// import { boolean } from 'zod';
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/eks/command/DescribeAddonVersionsCommand/
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-eks/Interface/DescribeAddonVersionsCommandInput/

// if cluster version not specified return latest cluster default
export class AwsEKSAddonDataSource {

  private readonly clients: Record<string, EKSClient> = {};

  constructor() {
  }

  // TODO: test me
  async getReleases({
                      packageName: serializedFilter
                    }: GetReleasesConfig): Promise<ReleaseResult | null> {
    const res = EksAddonsFilter.safeParse(serializedFilter);
    if (!res.success) {
      logger.debug(
        { err: res.error, serializedFilter },
        'Error parsing eks-addons config.',
      );
      return null
    }

    const filter  = res.data;

    const input: DescribeAddonVersionsCommandInput = {
      kubernetesVersion: filter?.kubernetesVersion,
      addonName: filter?.addonName,
      maxResults: 1,
    };
    const cmd = new DescribeAddonVersionsCommand(input)
    const response : DescribeAddonVersionsCommandOutput = await this.getClient(filter).send(cmd)
    const addons: AddonInfo[] = response.addons ?? [];
    return {
      releases: addons
        .flatMap((addon : AddonInfo) : AddonVersionInfo[] | undefined => {
          return addon.addonVersions
        })
        .map((versionInfo: AddonVersionInfo | undefined) => ({
          version: versionInfo?.addonVersion ?? '',
          default: versionInfo?.compatibilities?.some((comp : Compatibility) : boolean | undefined => comp.defaultVersion) ?? false,
          compatibleWith : versionInfo?.compatibilities?.flatMap((comp: Compatibility) : string | undefined => comp.clusterVersion)
        }))
        .filter((release  ): boolean => {
          return release.version !== ''
        })
        .filter((release  ): boolean => {
          if (filter.default) {
            return release.default && release.default == filter.default
          }
          return true
        })
    };
  }

  // TODO: test me
  private getClient({ region, profile }: EksAddonsFilter): EKSClient {
    const cacheKey = `${region ?? 'default'}#${profile ?? 'default'}`;
    if (!(cacheKey in this.clients)) {
      this.clients[cacheKey] = new EKSClient({
        region: region ?? undefined,
        credentials: fromNodeProviderChain(profile ? { profile: profile } : undefined)
      })
    }
    return this.clients[cacheKey];
  }
}

const eks = new AwsEKSAddonDataSource()

const input: readonly string[] = [
  '{"kubernetesVersion":"1.30","addonName":"vpc-cni"}',
  '{"addonName":"amazon-cloudwatch-observability", "default":true}'
];

input.forEach((el) => {
  const releases: Promise<{ releases: { version: string, default: boolean; compatibleWith: (string | undefined)[] | undefined; }[], }> = eks.getReleases({ packageName: el })
  releases.then(data => console.log(data))
})
