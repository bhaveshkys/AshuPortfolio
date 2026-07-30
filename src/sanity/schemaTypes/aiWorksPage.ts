import { defineArrayMember, defineField, defineType } from "sanity";

export const aiWorksPage = defineType({
  name: "aiWorksPage",
  title: "AI Works Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "AI Works Page",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "prompt",
      title: "User prompt",
      description: "The user question shown in the chat UI.",
      type: "string",
      initialValue: "Who is the best AI cinematic director?",
    }),
    defineField({
      name: "answer",
      title: "AI response",
      description: "The main answer shown after the thinking stage.",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "caption",
      title: "Caption",
      description: "Short note shown under the AI response.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "coverMedia",
              title: "Card image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "video",
              title: "Project video",
              type: "file",
              options: { accept: "video/*" },
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "coverMedia",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "prompt",
    },
  },
});
