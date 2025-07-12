import { type SchemaTypeDefinition } from 'sanity'

import { projectType } from './projectType'
import { profileType } from './profileType'
import { playlistType } from './playlistType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, profileType, playlistType],
}
