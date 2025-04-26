import {DocumentTextIcon} from '@sanity/icons'
import { defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Sub Title',
      name: 'sub_title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'project_images',
      title: 'Project Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'project_type',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Project', value: 'projects' },
          { title: 'Certificate', value: 'certificates' },
          { title: 'Blog', value: 'blogs' },
          { title: 'Work Experience', value: 'work-experience' },
        ],
      }
    }),
    defineField({
      name: 'tools_used',
      title: 'Tools & Frameworks',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'title_color',
      title: 'Title Color',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'secondary_color',
      title: 'Secondary Color',
      type: 'string',
    }),
    defineField({
      name: 'primary_color',
      title: 'Primary Color',
      type: 'string',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'url_link',
      title: 'URL Link',
      type: 'url',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'date_created',
      title: 'Date Created',
      type: 'datetime',
    })
  ]
})
