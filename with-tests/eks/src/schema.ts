import { type ZodEffects, type ZodString, z } from 'zod';
import { Json } from './utils/schema-utils';

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

// declare const ClusterVersionStatus: {
//   readonly extended_support: "extended-support";
//   readonly standard_support: "standard-support";
// };

// added status

export const EksFilterSchema = z.object({
  default: z.oboolean().or(stringIsBoolSchema),
  region: z.string().optional(),
  profile: z.string().optional(),
});

export type EksFilter = z.infer<typeof EksFilterSchema>;
export const EksFilter = Json.pipe(EksFilterSchema);
