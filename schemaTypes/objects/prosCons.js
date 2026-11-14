import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "prosCons",
  title: "Pros and Cons",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Comparison Title",
      type: "string",
    }),

    defineField({
      name: "pros",
      title: "Advantages",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),

    defineField({
      name: "cons",
      title: "Limitations",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],

  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Pros and Cons" };
    },
  },
});