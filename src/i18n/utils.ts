import en from "./en.json";
import es from "./es.json";

export const defaultLang = "en";

const translations = { en, es } as const;

export type Lang = keyof typeof translations;

function lookup(lang: Lang, key: string): string | undefined {
	let value: unknown = translations[lang];
	for (const part of key.split(".")) {
		if (typeof value !== "object" || value === null) return undefined;
		value = (value as Record<string, unknown>)[part];
	}
	return typeof value === "string" ? value : undefined;
}

/** Returns a t() function that resolves dot-separated keys, falling back to English. */
export function useTranslations(lang: Lang) {
	return function t(key: string): string {
		return lookup(lang, key) ?? lookup(defaultLang, key) ?? key;
	};
}

/** Path to the same page in the other language (homepage only for now). */
export function alternatePath(lang: Lang): string {
	return lang === "en" ? "/es/" : "/";
}
