import { defineArrayMember, defineField, defineType } from "sanity";

export const nonTreatmentsPage = defineType({
  name: "nonTreatmentsPage",
  title: "Non-treatments Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Non-treatments Page",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "NON-STANDARD PROJECTS",
    }),
    defineField({
      name: "works",
      title: "Works",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "client", title: "Client", type: "string" }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description: "Use a full URL or a relative path (e.g. /work/slug).",
            }),
            defineField({
              name: "coverAlt",
              title: "Cover alt text",
              type: "string",
            }),
            defineField({
              name: "hoverAlt",
              title: "Hover alt text",
              type: "string",
            }),
            defineField({
              name: "coverMedia",
              title: "Cover image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "hoverMedia",
              title: "Hover image/GIF",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "client",
              media: "coverMedia",
            },
          },
        }),
      ],
      validation: (rule) => rule.max(24),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
