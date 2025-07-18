import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'port-sanity-2025',

  projectId: 'f6yx7iyt',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: schema
})
