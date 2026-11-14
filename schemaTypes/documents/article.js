import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "article",
  title: "Article",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Article Details" },
    { name: "seo", title: "SEO" },
  ],

  fields: [
    // CONTENT

    defineField({
      name: "title",
      title: "Article Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(120),
    }),

    defineField({
      name: "subtitle",
      title: "Article Subtitle",
      type: "string",
      group: "content",
      description: "Optional secondary heading shown below the article title.",
      validation: (Rule) => Rule.max(180),
    }),

    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Article Excerpt",
      type: "text",
      group: "content",
      rows: 3,
      description: "Short description displayed on the Insights listing.",
      validation: (Rule) => Rule.required().max(250),
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Image Caption",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "body",
      title: "Article Body",
      type: "portableText",
      group: "content",
      validation: (Rule) => Rule.required().min(1),
    }),

    // ARTICLE DETAILS

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "details",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "details",
    }),

    defineField({
      name: "publishedAt",
      title: "Publication Date",
      type: "datetime",
      group: "details",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "updatedAt",
      title: "Last Updated",
      type: "datetime",
      group: "details",
      description: "Optional date when the research was substantially revised.",
    }),

    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      group: "details",
      description: "Can be calculated automatically by the frontend later.",
      validation: (Rule) => Rule.integer().min(1).max(120),
    }),

    defineField({
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      group: "details",
      initialValue: false,
      description: "Allows this article to appear in a featured listing position.",
    }),

    defineField({
      name: "tags",
      title: "Article Tags",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "string",
          validation: (Rule) => Rule.max(30),
        }),
      ],
      options: {
        layout: "tags",
      },
    }),

    // SEO

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(70),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) => Rule.max(170),
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "coverImage",
      featured: "featured",
    },

    prepare({ title, subtitle, media, featured }) {
      return {
        title: title || "Untitled Article",
        subtitle: [
          subtitle || "Uncategorised",
          featured ? "Featured" : null,
        ]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },

  orderings: [
    {
      title: "Publication Date — Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Publication Date — Oldest First",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Featured Articles First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
  ],
});