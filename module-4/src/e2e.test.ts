import request from "supertest";
import { PUBLIC_HOLIDAYS_API_URL } from "./config";

const API = PUBLIC_HOLIDAYS_API_URL;

describe("Holidays API", () => {
	describe("/IsTodayPublicHoliday/DE", () => {
		it("should return status 200 or 204", async () => {
			const { status } = await request(API).get("/IsTodayPublicHoliday/DE");
			expect([204, 200]).toContain(status);
		});
	});
	describe("/NextPublicHolidaysWorldwide", () => {
		it("should return an array of upcoming public holidays for the next 7 days", async () => {
			const { status, body } = await request(API).get(
				"/NextPublicHolidaysWorldwide"
			);
			expect(status).toEqual(200);
			expect(body.length).toBeGreaterThan(0);
			expect(Array.isArray(body)).toStrictEqual(true);

			const expectedFields = [
				"date",
				"localName",
				"name",
				"countryCode",
				"fixed",
				"global",
				"counties",
				"launchYear",
				"types",
			];

			for (const item of body) {
				expect(expectedFields).toEqual(Object.keys(item));
			}
		});
	});
});
