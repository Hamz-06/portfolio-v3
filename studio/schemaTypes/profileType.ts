import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const profileType = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'github_link',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'linkedin_link',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email_address',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'project_versions',
      title: 'Project Versions',
      type: 'array',
      validation: Rule => Rule.required(),
      of: [{
        type: 'object', fields: [
          defineField({
            name: 'version_number',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'version_url',
            type: 'string',
            validation: Rule => Rule.required()
          })
        ]
      }]
    })
  ]
})
