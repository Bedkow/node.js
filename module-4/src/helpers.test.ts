import {
	validateCountry,
	validateYear,
	validateInput,
	shortenPublicHoliday,
} from "./helpers";

describe("Helper functions work as intended", () => {
	it("validates country code 'DE'", () => {
		expect(validateCountry("DE")).toBe(true);
	});

	it("validates year '2023'", () => {
		expect(validateYear(2023)).toBe(true);
	});

	it("validates input of '2023', 'DE'", () => {
		expect(validateInput({ year: 2023, country: "DE" })).toBe(true);
		expect(() => {
			validateInput({ year: 2023, country: "XD" });
		}).toThrow(new Error(`Country provided is not supported, received: XD`));
		expect(() => {
			validateInput({ year: 5023, country: "DE" });
		}).toThrow(new Error(`Year provided not the current, received: 5023`));
	});

	it("shortens public holiday entry", () => {
		expect(
			shortenPublicHoliday({
				date: "2023-01-01",
				localName: "Neujahr",
				name: "New Year's Day",
				countryCode: "DE",
				fixed: true,
				global: true,
				counties: null,
				launchYear: 1967,
				types: ["Public"],
			})
		).toEqual({
			name: "New Year's Day",
			localName: "Neujahr",
			date: "2023-01-01",
		});
	});
});
