import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ Section",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Frequently Asked Questions",
    }),

    defineField({
      name: "items",
      title: "Questions and Answers",
      type: "array",
      of: [
        defineArrayMember({
          name: "faqItem",
          title: "FAQ Item",
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
            prepare({ title }) {
              return { title: title || "Untitled question" };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    select: { title: "title", items: "items" },
    prepare({ title, items }) {
      return {
        title: title || "FAQ Section",
        subtitle: `${items?.length || 0} questions`,
      };
    },
  },
});