import { defineArrayMember, defineField, defineType } from "sanity";

const collageDefaults = [
  { top: 6, left: 4, width: 18, rotate: -6, zIndex: 4 },
  { top: 2, left: 34, width: 22, rotate: 4, zIndex: 6 },
  { top: 10, left: 62, width: 16, rotate: -3, zIndex: 5 },
  { top: 28, left: 12, width: 20, rotate: 7, zIndex: 7 },
  { top: 32, left: 45, width: 18, rotate: -8, zIndex: 8 },
  { top: 24, left: 72, width: 20, rotate: 5, zIndex: 6 },
  { top: 52, left: 4, width: 22, rotate: -4, zIndex: 6 },
  { top: 58, left: 34, width: 16, rotate: 6, zIndex: 5 },
  { top: 50, left: 60, width: 18, rotate: -2, zIndex: 7 },
  { top: 70, left: 18, width: 20, rotate: 3, zIndex: 5 },
  { top: 72, left: 50, width: 22, rotate: -5, zIndex: 6 },
  { top: 68, left: 74, width: 16, rotate: 4, zIndex: 4 },
];

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Home Page",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "introLabel",
      title: "Intro label",
      type: "string",
      initialValue: "AWARDED",
    }),
    defineField({
      name: "menuItems",
      title: "Menu items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "serviceCallouts",
      title: "Service callouts",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "leadingText",
              title: "Leading text",
              type: "string",
            }),
            defineField({
              name: "highlightText",
              title: "Highlight text",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "leadingText",
              subtitle: "highlightText",
            },
          },
        }),
      ],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "noteLabel",
      title: "Note label",
      type: "string",
      initialValue: "PLEASE NOTE:",
    }),
    defineField({
      name: "notice",
      title: "Notice copy",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "foundedPrefix",
      title: "Founded prefix",
      type: "string",
      initialValue: "Founded IN",
    }),
    defineField({
      name: "foundedYear",
      title: "Founded year",
      type: "string",
      initialValue: "2020",
    }),
    defineField({
      name: "foundedSuffix",
      title: "Founded suffix",
      type: "string",
      initialValue: "by Ukrainians",
    }),
    defineField({
      name: "contactLabel",
      title: "Contact label",
      type: "string",
      initialValue: "CONTACT US",
    }),
    defineField({
      name: "contactHref",
      title: "Contact link",
      type: "string",
      initialValue: "/4/",
    }),
    defineField({
      name: "heroScrollImages",
      title: "Hero scroll images",
      description: "Images revealed as the hero scrolls down (up to 2).",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({
              name: "media",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "media",
            },
          },
        }),
      ],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "collageImages",
      title: "Collage section images",
      description: "Draggable collage images shown in the scroll section (up to 12).",
      type: "array",
      initialValue: collageDefaults.map((layout, index) => ({
        title: `Slot ${index + 1}`,
        ...layout,
      })),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({
              name: "media",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "top",
              title: "Top (%)",
              type: "number",
              description: "Percent from top (0-100).",
              validation: (rule) => rule.min(0).max(100),
            }),
            defineField({
              name: "left",
              title: "Left (%)",
              type: "number",
              description: "Percent from left (0-100).",
              validation: (rule) => rule.min(0).max(100),
            }),
            defineField({
              name: "width",
              title: "Width (%)",
              type: "number",
              description: "Percent width (5-60).",
              validation: (rule) => rule.min(5).max(60),
            }),
            defineField({
              name: "rotate",
              title: "Rotate (deg)",
              type: "number",
              description: "Rotation in degrees (-30 to 30).",
              validation: (rule) => rule.min(-30).max(30),
            }),
            defineField({
              name: "zIndex",
              title: "Layer (z-index)",
              type: "number",
              description: "Higher numbers sit on top.",
              validation: (rule) => rule.min(1).max(20),
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "media",
            },
          },
        }),
      ],
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: "aboutMeVideo",
      title: "About me video",
      description: "Upload the video that should appear on the About Me page.",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "mediaWidgets",
      title: "Media widgets",
      description:
        "These replace the coded home-page media in order. Layout is controlled in code.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({
              name: "media",
              title: "Image or GIF",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "media",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "socialImage",
          title: "Social image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
