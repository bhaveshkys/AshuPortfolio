import { defineField, defineType } from "sanity";

export const aboutMePage = defineType({
  name: "aboutMePage",
  title: "About Me Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "About Me Page",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "About me",
    }),
    defineField({
      name: "intro",
      title: "Intro text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "description",
      title: "About me text",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "heading",
    },
  },
});
