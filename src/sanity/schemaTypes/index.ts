import { type SchemaTypeDefinition } from 'sanity'

import { projectType } from './projectType'
import { profileType } from './profileType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, profileType],
}
