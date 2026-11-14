import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "keyTakeaways",
  title: "Key Takeaways",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Block Title",
      type: "string",
      initialValue: "Key Takeaways",
    }),

    defineField({
      name: "items",
      title: "Takeaway Points",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required().min(2).max(8),
    }),
  ],

  preview: {
    select: { title: "title", items: "items" },
    prepare({ title, items }) {
      return {
        title: title || "Key Takeaways",
        subtitle: `${items?.length || 0} points`,
      };
    },
  },
});