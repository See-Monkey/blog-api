import slugify from "slugify";

export default function generateBaseSlug(title) {
	return slugify(title, {
		lower: true,
		strict: true,
		trim: true,
	});
}
