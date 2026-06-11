/**
 * Single source of truth for every image path on the site.
 * When real photography arrives, swap paths here — nowhere else.
 */
export const images = {
	logo: "/images/logo/plancha360-logo.svg",
	logoPng: "/images/logo/plancha360-logo.png",

	heroMain: "/images/hero/hero-main.png",

	lifestyleCommunity: "/images/lifestyle/plancha360-community.png",
	lifestyle01: "/images/lifestyle/lifestyle-01.png",

	model700: "/images/products/model-700.png",
	model900: "/images/products/model-900.png",
	product01: "/images/products/product-01.png",

	renderFrontQuarter: "/images/renders/plancha360-render-front-quarter.png",
	renderLeftQuarter: "/images/renders/plancha360-render-left-quarter.png",
	renderRearQuarter: "/images/renders/plancha360-render-rear-quarter.png",
} as const;

export type ImageKey = keyof typeof images;
