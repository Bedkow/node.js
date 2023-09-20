module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["./src"],
	passWithNoTests: true,
	moduleNameMapper: {
		"^axios$": "axios/dist/node/axios.cjs",
	},
	testMatch: ["**/?(*.)test.ts"],
	collectCoverageFrom: ["src/**/*.{ts}"],
	coverageReporters: ["text-summary"],
};
