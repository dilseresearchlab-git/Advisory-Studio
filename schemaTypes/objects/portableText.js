import { defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "portableText",
  title: "Article Content",
  type: "array",

  of: [
    // STANDARD RICH TEXT
    defineArrayMember({
      type: "block",

      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Blockquote", value: "blockquote" },
      ],

      lists: [
        { title: "Bullet List", value: "bullet" },
        { title: "Numbered List", value: "number" },
      ],

      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Code", value: "code" },
        ],

        annotations: [
          {
            name: "link",
            title: "External Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
                validation: (Rule) =>
                  Rule.required().uri({
                    scheme: ["http", "https", "mailto"],
                  }),
              },
              {
                name: "blank",
                title: "Open in new tab",
                type: "boolean",
                initialValue: true,
              },
            ],
          },

          {
            name: "internalLink",
            title: "Internal Article Link",
            type: "object",
            fields: [
              {
                name: "reference",
                title: "Select Article",
                type: "reference",
                to: [{ type: "article" }],
                validation: (Rule) => Rule.required(),
              },
            ],
          },
        ],
      },
    }),

    // IMAGES
    defineArrayMember({
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          title: "Image Caption",
          type: "string",
        },
      ],
    }),

    // CUSTOM CONTENT OBJECTS
    defineArrayMember({ type: "table" }),
    defineArrayMember({ type: "checklist" }),
    defineArrayMember({ type: "callout" }),
    defineArrayMember({ type: "faq" }),
    defineArrayMember({ type: "keyTakeaways" }),
    defineArrayMember({ type: "prosCons" }),
    defineArrayMember({ type: "metricHighlights" }),
    defineArrayMember({ type: "relatedArticles" }),
    defineArrayMember({ type: "divider" }),
  ],
});