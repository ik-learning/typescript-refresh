import { EKSClient } from '@aws-sdk/client-eks';
import { mockClient } from 'aws-sdk-client-mock';
import { AwsEKSAddonDataSource } from './app';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';

const eksClientMock = mockClient(EKSClient);

describe('AwsEKSAddonDataSource', () => {
  it('should create a new EKSClient if not cached', async () => {

  });
})

// describe('AwsEKSAddonDataSource', () => {
//   let dataSource: AwsEKSAddonDataSource;
//
//   beforeEach(() => {
//     eksClientMock.reset();
//     dataSource = new AwsEKSAddonDataSource();
//   });
//
//   it('should create a new EKSClient if not cached', async () => {
//     const region = 'us-west-2';
//     const profile = 'default';
//     const client = dataSource['getClient']({ region, profile });
//
//     expect(client).toBeInstanceOf(EKSClient);
//     expect(eksClientMock.calls()).toHaveLength(1);
//     expect(eksClientMock.calls()[0].args[0]).toEqual({
//       region,
//       credentials: fromNodeProviderChain({ profile }),
//     });
//   });
//
//   it('should return cached EKSClient if already created', async () => {
//     const region = 'us-west-2';
//     const profile = 'default';
//     const client1 = dataSource['getClient']({ region, profile });
//     const client2 = dataSource['getClient']({ region, profile });
//
//     expect(client1).toBe(client2);
//     expect(eksClientMock.calls()).toHaveLength(1);
//   });
// });
