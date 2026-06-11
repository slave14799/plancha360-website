import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
    name: 'plancha360',
    title: 'Plancha360',
    projectId: 'aa47lzwl',
    dataset: 'production',
    plugins: [
        structureTool(),
        visionTool(),
    ],
    schema: {
        types: schemaTypes,
    },
})