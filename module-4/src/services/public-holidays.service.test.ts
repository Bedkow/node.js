import axios from "axios";
import { publicHolidays2023DE } from "../mockData/publicHolidays2023DE";
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from "./public-holidays.service";

// unit tests

describe("Get a list of public holidays", () => {
	it("gets public holidays in DE in 2023", async () => {
		jest
			.spyOn(axios, "get")
			.mockImplementation(() =>
				Promise.resolve({ data: publicHolidays2023DE })
			);

		const holidaysResponse = await getListOfPublicHolidays(2023, "DE");

		expect(holidaysResponse).toEqual(publicHolidays2023DE);
	});

	it("checks if today is public holiday in DE", async () => {
		const isPublicHoliday = await checkIfTodayIsPublicHoliday("DE");
		expect([true, false]).toContain(isPublicHoliday);
	});

	it("gets next public holidays in DE", async () => {
		const nextPublicHolidays = await getNextPublicHolidays("DE");
		expect(Array.isArray(nextPublicHolidays)).toBe(true);
		expect(nextPublicHolidays.length).toBeGreaterThan(0);
	});

	afterEach(() => {
		jest.clearAllMocks();
	  });
});

// integration tests