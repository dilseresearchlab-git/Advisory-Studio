import { defineType, defineField } from "sanity";

export default defineType({
  name: "divider",
  title: "Section Divider",
  type: "object",

  fields: [
    defineField({
      name: "style",
      title: "Divider Style",
      type: "string",
      options: {
        list: [
          { title: "Subtle", value: "subtle" },
          { title: "Standard", value: "standard" },
        ],
        layout: "radio",
      },
      initialValue: "subtle",
    }),
  ],

  preview: {
    prepare() {
      return { title: "Section Divider" };
    },
  },
});