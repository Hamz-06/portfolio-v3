import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const playlistType = defineType({
  name: 'playlists',
  title: 'playlists',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'playlist_name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'playlist_cover_image',
      title: 'Playlist Cover Image',
      type: 'image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'pinned',
      title: 'Pinned Playlist',
      type: 'boolean',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: Rule => Rule.max(20).warning('Description should be less than 20 characters')
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      validation: Rule => Rule.max(20).warning('Description should be less than 20 characters')
    }),
    defineField({
      validation: Rule => Rule.required(),
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'playlist_name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'playlist',
      title: 'Projects in Playlist',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'projects' }]
        }
      ],
      validation: Rule => Rule.required().min(1)
    })
  ]
})
