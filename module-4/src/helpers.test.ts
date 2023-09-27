import {
	validateCountry,
	validateYear,
	validateInput,
	shortenPublicHoliday,
} from "./helpers";

describe("Helper functions work as intended", () => {
	describe("validateCoutry function test", () => {
		describe("function returns true when receives correct input", () => {
			it("validates country code 'DE' and returns true", () => {
				expect(validateCountry("DE")).toBe(true);
			});
		});

		describe("function returns false when receives incorrect input", () => {
			it("validates country code 'XZ' and returns false", () => {
				expect(validateCountry("XZ")).toBe(false);
			});
		});
	});

	describe("validateYear function test", () => {
		describe("function returns true when receives correct input", () => {
			it("validates current year and returns true", () => {
				expect(validateYear(new Date().getFullYear())).toBe(true);
			});
		});
		describe("function returns true when receives correct input", () => {
			it("validates current year and returns false", () => {
				expect(validateYear(1994)).toBe(false);
			});
		});
	});

	describe("validateInput function test", () => {
		describe("function returns true when receives correct input", () => {
			it("validates correct input of year and country code and returns true", () => {
				expect(validateInput({ year: 2023, country: "DE" })).toBe(true);
			});
		});
		describe("function throws Error when receives incorrect input", () => {
			it("validates incorrect input of country code and throws Error", () => {
				expect(() => {
					validateInput({ year: 2023, country: "XD" });
				}).toThrow(
					new Error(`Country provided is not supported, received: XD`)
				);
			});

			it("validates incorrect input of year and throws Error", () => {
				expect(() => {
					validateInput({ year: 5023, country: "DE" });
				}).toThrow(new Error(`Year provided not the current, received: 5023`));
			});
		});
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
