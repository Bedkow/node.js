import axios from "axios";
import { publicHolidays2023DE } from "../mockData/publicHolidays2023DE";
import {
	getListOfPublicHolidays,
	checkIfTodayIsPublicHoliday,
	getNextPublicHolidays,
} from "./public-holidays.service";

describe("public-holidays service test suite", () => {
	describe("getListOfPublicHolidays function test", () => {
		it("gets public holidays in DE in 2023", async () => {
			jest
				.spyOn(axios, "get")
				.mockImplementation(() =>
					Promise.resolve({ data: publicHolidays2023DE })
				);

			const holidaysResponse = await getListOfPublicHolidays(2023, "DE");

			expect(holidaysResponse).toEqual(publicHolidays2023DE);
		});
	});

	describe("checkIfTodayIsPublicHoliday function test", () => {
		it("should return only boolean value", async () => {
			const isPublicHoliday = await checkIfTodayIsPublicHoliday("DE");
			expect([true, false]).toContain(isPublicHoliday);
		});
	});

	describe("getNextPublicHolidays function test", () => {
		it("gets next public holidays in DE", async () => {
			const nextPublicHolidays = await getNextPublicHolidays("DE");
			expect(Array.isArray(nextPublicHolidays)).toBe(true);
			expect(nextPublicHolidays.length).toBeGreaterThan(0);
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
});
