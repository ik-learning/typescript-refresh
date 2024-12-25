export interface ManagerData<T> {
  managerData?: T;
}

export type ReleaseType = "major" | "premajor" | "minor" | "preminor" | "patch" | "prepatch" | "prerelease";
const CustomDatasourceFormats = ['json', 'plain', 'yaml', 'html'] as const;
export type CustomDatasourceFormats = (typeof CustomDatasourceFormats)[number];

/**
 * @property {string} depName - Display name of the package. See #16012
 * @property {string} packageName - The name of the package, used in comparisons. depName is used as fallback if this is not set. See #16012
 */
export interface PackageDependency<T = Record<string, any>>
  extends ManagerData<T> {
  currentValue?: string | null;
  currentDigest?: string;
  depName?: string;
  depType?: string;
  fileReplacePosition?: number;
  groupName?: string;
  lineNumber?: number;
  packageName?: string;
  target?: string;
  versioning?: string;
  dataType?: string;
  enabled?: boolean;
  bumpVersion?: ReleaseType;
  npmPackageAlias?: boolean;
  packageFileVersion?: string;
  gitRef?: boolean;
  sourceUrl?: string | null;
  pinDigests?: boolean;
  currentRawValue?: string;
  major?: { enabled?: boolean };
  prettyDepType?: string;
  newValue?: string;
  warnings?: ValidationMessage[];
  commitMessageTopic?: string;
  currentDigestShort?: string;
  datasource?: string;
  deprecationMessage?: string;
  digestOneAndOnly?: boolean;
  fixedVersion?: string;
  currentVersion?: string;
  lockedVersion?: string;
  propSource?: string;
  registryUrls?: string[] | null;
  // rangeStrategy?: RangeStrategy;
  // skipReason?: SkipReason;
  // skipStage?: StageName;
  sourceLine?: number;
  newVersion?: string;
  // updates?: LookupUpdate[];
  replaceString?: string;
  autoReplaceStringTemplate?: string;
  editFile?: string;
  separateMinorPatch?: boolean;
  extractVersion?: string;
  isInternal?: boolean;
  variableName?: string;
  indentation?: string;
}

export interface ValidationMessage {
  topic: string;
  message: string;
}

export interface GetReleasesConfig {
  customDatasources?: Record<string, CustomDatasourceConfig>;
  datasource?: string;
  packageName: string;
  registryUrl?: string;
  currentValue?: string;
}

export interface CustomDatasourceConfig {
  defaultRegistryUrlTemplate?: string;
  format?: CustomDatasourceFormats;
  transformTemplates?: string[];
}

export interface ReleaseResult {
  deprecationMessage?: string;
  isPrivate?: boolean;
  releases: Release[];
  tags?: Record<string, string> | undefined;
  // URL metadata
  changelogUrl?: string;
  dependencyUrl?: string;
  homepage?: string | undefined;
  gitRef?: string;
  sourceUrl?: string | null;
  sourceDirectory?: string;
  registryUrl?: string;
  replacementName?: string;
  replacementVersion?: string;
  lookupName?: string;
  packageScope?: string;
}

export interface Release {
  changelogUrl?: string;
  checksumUrl?: string;
  downloadUrl?: string;
  gitRef?: string;
  isDeprecated?: boolean;
  isStable?: boolean;
  releaseTimestamp?: string | null;
  version: string;
  /** The original value to which `extractVersion` was applied */
  versionOrig?: string;
  newDigest?: string | undefined;
  constraints?: Record<string, string[]>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  registryUrl?: string;
  sourceUrl?: string | undefined;
  sourceDirectory?: string;
  currentAge?: string;
  isLatest?: boolean;
}

