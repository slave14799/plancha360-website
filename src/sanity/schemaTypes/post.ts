import { defineField, defineType } from "sanity";

export const postType = defineType({
	name: "post",
	title: "Blog Post",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "publishedAt",
			title: "Published at",
			type: "datetime",
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "string",
			options: {
				list: [
					{ title: "Recipe", value: "recipe" },
					{ title: "Tips & Tricks", value: "tips" },
					{ title: "General", value: "general" },
				],
				layout: "radio",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "language",
			title: "Language",
			type: "string",
			initialValue: "es",
			options: {
				list: [
					{ title: "English", value: "en" },
					{ title: "Spanish", value: "es" },
				],
				layout: "radio",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "excerpt",
			title: "Excerpt",
			type: "text",
			rows: 3,
			validation: (rule) => rule.max(200),
		}),
		defineField({
			name: "mainImage",
			title: "Main image",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: "alt",
					title: "Alt text",
					type: "string",
					validation: (rule) => rule.required(),
				}),
			],
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "array",
			of: [
				{ type: "block" },
				{
					type: "image",
					options: {
						hotspot: true,
					},
					fields: [
						defineField({
							name: "alt",
							title: "Alt text",
							type: "string",
						}),
					],
				},
			],
		}),
		defineField({
			name: "seoTitle",
			title: "SEO title",
			type: "string",
		}),
		defineField({
			name: "seoDescription",
			title: "SEO description",
			type: "text",
			rows: 3,
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "category",
			media: "mainImage",
		},
	},
});
