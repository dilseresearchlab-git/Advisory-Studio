import { defineType, defineField } from "sanity";

export default defineType({
  name: "relatedArticles",
  title: "Related Articles",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Block Title",
      type: "string",
      initialValue: "Related Research",
    }),

    defineField({
      name: "articles",
      title: "Select Articles",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "article" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
  ],

  preview: {
    select: { title: "title", articles: "articles" },
    prepare({ title, articles }) {
      return {
        title: title || "Related Articles",
        subtitle: `${articles?.length || 0} selected`,
      };
    },
  },
});