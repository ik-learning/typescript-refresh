import {
  EKSClient,
  DescribeClusterVersionsCommand,
  type DescribeClusterVersionsCommandInput,
  type DescribeClusterVersionsCommandOutput,
} from "@aws-sdk/client-eks";

import type { GetReleasesConfig, ReleaseResult } from './utils/types';

// import { fromNodeProviderChain } from '@aws-sdk/credential-providers';

import { EksFilter } from './schema';
import { logger } from './utils/logger';

import { ClusterVersionInformation } from '@aws-sdk/client-eks/dist-types/models/models_0';

export class AwsEKSDataSource {

  // private readonly clients: Record<string, EKSClient> = {};

  async getReleases({
    packageName: serializedFilter
  }: GetReleasesConfig): Promise<ReleaseResult | null> {
    const res = EksFilter.safeParse(serializedFilter);
    if (!res.success) {
      console.log("UPS ERROR")
      logger.debug(
        { err: res.error, serializedFilter },
        'Error parsing eks-addons config.',
      );
      return null
    }

    const input: DescribeClusterVersionsCommandInput = {
      defaultOnly: res.data.default ?? undefined,
    };
    console.log(input)
    const cmd = new DescribeClusterVersionsCommand(input)
    const response: DescribeClusterVersionsCommandOutput = await this.getClientS().send(cmd)
    const addons: ClusterVersionInformation[] = response.clusterVersions ?? [];
    // console.log(addons)
    const result = {
      releases: addons
        .filter((info): info is ClusterVersionInformation & { clusterVersion: string } =>
          Boolean(info.clusterVersion))
        .map((info) => ({
          version: info.clusterVersion,
          default: info.defaultVersion ?? false,
          status: info.status,
        }))
    }
    // console.log(addons)
    return result
    // return {
    //   releases: addons
    //     .filter((release) : boolean => release.clusterVersion && release.clusterVersion !== '')
    //     .flatMap((el: ClusterVersionInformation): ClusterVersionInformation[] | undefined => {
    //       return el.clusterVersion
    //     })
    //     .map((versionInfo: ClusterVersionInformation | undefined) => ({
    //       version: versionInfo?.clusterVersion ?? '',
    //       default: versionInfo?.defaultVersion ?? false,
    //       status: versionInfo?.status
    //     }))
    //     .filter((release) : boolean | '' => release.version && release.version !== '')
    //     .filter((release): boolean => {
    //       if (filter.default) {
    //         return release.default && release.default == filter.default
    //       }
    //       return true
    //     })
    // };
  }

  // private getClient({ region, profile }: EksFilter): EKSClient {
  //   const cacheKey = `${region ?? 'default'}#${profile ?? 'default'}`;
  //   if (!(cacheKey in this.clients)) {
  //     this.clients[cacheKey] = new EKSClient({
  //       region: region ?? undefined,
  //       credentials: fromNodeProviderChain(profile ? { profile: profile } : undefined)
  //     })
  //   }
  //   return this.clients[cacheKey];
  // }

  private getClientS(): EKSClient {
    return new EKSClient()
  }
}

const eks = new AwsEKSDataSource()

const input: readonly string[] = [
  '{}',
  '{"default":true}',
  '{"default":false}',
  // '{"status":"standard-support", "default":true}',
  // '{"status":"standard_support"}',
];

input.forEach((el) => {
  const releases : Promise<ReleaseResult | null> = eks.getReleases({ packageName: el })
  releases.then(data => console.log(data))
})
