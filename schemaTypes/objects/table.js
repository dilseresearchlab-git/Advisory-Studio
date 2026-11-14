import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "table",
  title: "Research Table",
  type: "object",

  fields: [
    defineField({
      name: "caption",
      title: "Table Caption",
      type: "string",
    }),

    defineField({
      name: "columns",
      title: "Column Headings",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.required().min(1).max(8),
    }),

    defineField({
      name: "rows",
      title: "Data Rows",
      type: "array",
      of: [
        defineArrayMember({
          name: "tableRow",
          title: "Row",
          type: "object",
          fields: [
            defineField({
              name: "cells",
              title: "Cell Values",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare({ cells }) {
              return {
                title: cells?.filter(Boolean).join(" | ") || "Empty row",
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "footnote",
      title: "Source / Footnote",
      type: "text",
      rows: 2,
    }),
  ],

  preview: {
    select: { title: "caption", columns: "columns" },
    prepare({ title, columns }) {
      return {
        title: title || "Research Table",
        subtitle: `${columns?.length || 0} columns`,
      };
    },
  },
});