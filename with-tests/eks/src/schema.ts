import { type ZodEffects, type ZodString, z } from 'zod';
import { Json } from './utils/schema-utils';

// https://github.com/colinhacks/zod

const stringIsBoolSchema: ZodEffects<ZodString, boolean, string> = z
  .string()
  .transform((value) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    } else {
      return false;
    }
  });

// added status

// Only one of the defaultOnly, clusterVersions, includeAll or status request parameters is accepted at a time.
// Only one of the defaultOnly, clusterVersions, includeAll or status request parameters is accepted at a time.
export const EksFilterSchema = z.object({
  default: z.oboolean().or(stringIsBoolSchema),
  region: z.string().optional(),
  profile: z.string().optional(),
});

export type EksFilter = z.infer<typeof EksFilterSchema>;
export const EksFilter = Json.pipe(EksFilterSchema);
