import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "metricHighlights",
  title: "Metric Highlights",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Block Title",
      type: "string",
      initialValue: "At a Glance",
    }),

    defineField({
      name: "description",
      title: "Supporting Description",
      type: "string",
    }),

    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        defineArrayMember({
          name: "metric",
          title: "Metric",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Metric Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "context",
              title: "Context / Period",
              type: "string",
              description: "Example: FY2025, 5-year average, Q2 FY2026.",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
  ],

  preview: {
    select: { title: "title", metrics: "metrics" },
    prepare({ title, metrics }) {
      return {
        title: title || "Metric Highlights",
        subtitle: `${metrics?.length || 0} metrics`,
      };
    },
  },
});