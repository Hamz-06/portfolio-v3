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
      validation: Rule => Rule.required()
    }),
    defineField({
      title: 'Sub Title',
      name: 'sub_title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'project_images',
      title: 'Project Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'project_type',
      title: 'Project Type',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Project', value: 'projects' },
          { title: 'Blog', value: 'blogs' },
          { title: 'Work Experience', value: 'work_experience' },
          {title: 'Education', value: 'education'}
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
      name: 'secondary_color',
      title: 'Secondary Color',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      validation: Rule => Rule.required(),
      name: 'primary_color',
      title: 'Primary Color',
      type: 'string',
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'github_url_link',
      title: 'Github URL Link',
      type: 'url',
    }),
    defineField({
      name: 'live_url_link',
      title: 'Live URL Link',
      type: 'url',
    }),
    defineField({
      validation: Rule => Rule.required(),
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      validation: Rule => Rule.required(),
      name: 'date_created',
      title: 'Date Created',
      type: 'datetime',
    })
  ]
})
