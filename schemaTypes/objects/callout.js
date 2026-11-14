import { defineType, defineField } from "sanity";

export default defineType({
  name: "callout",
  title: "Research Callout",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "text",
      title: "Content",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tone",
      title: "Callout Style",
      type: "string",
      options: {
        list: [
          { title: "Information", value: "info" },
          { title: "Important", value: "important" },
          { title: "Risk", value: "risk" },
          { title: "Definition", value: "definition" },
        ],
        layout: "radio",
      },
      initialValue: "info",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: { title: "title", subtitle: "tone" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Research Callout",
        subtitle: subtitle ? `${subtitle} callout` : "Callout",
      };
    },
  },
});