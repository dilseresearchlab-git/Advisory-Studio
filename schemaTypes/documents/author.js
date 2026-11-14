import { defineType, defineField } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 60,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "designation",
      title: "Designation",
      type: "string",
    }),

    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 4,
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "designation",
      media: "profileImage",
    },
  },
});