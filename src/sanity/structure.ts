import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
	S.list()
		.title("Content")
		.items([
			S.documentTypeListItem("post").title("All posts"),
			S.divider(),
			S.listItem()
				.title("Recipes")
				.child(S.documentList().title("Recipes").filter('_type == "post" && category == "recipe"')),
			S.listItem()
				.title("Tips & Tricks")
				.child(S.documentList().title("Tips & Tricks").filter('_type == "post" && category == "tips"')),
			S.listItem()
				.title("General")
				.child(S.documentList().title("General").filter('_type == "post" && category == "general"')),
		]);
