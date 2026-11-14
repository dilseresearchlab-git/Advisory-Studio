import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "checklist",
  title: "Research Checklist",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Checklist Title",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),

    defineField({
      name: "items",
      title: "Checklist Items",
      type: "array",
      of: [
        defineArrayMember({
          name: "checklistItem",
          title: "Checklist Item",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Item",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "detail",
              title: "Additional Detail",
              type: "string",
            }),
            defineField({
              name: "checked",
              title: "Initially Checked",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "detail" },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
  ],

  preview: {
    select: { title: "title", items: "items" },
    prepare({ title, items }) {
      return {
        title: title || "Research Checklist",
        subtitle: `${items?.length || 0} items`,
      };
    },
  },
});