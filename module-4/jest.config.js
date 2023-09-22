module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["./src"],
	passWithNoTests: true,
	moduleNameMapper: {
		"axios": "axios/dist/axios.js",
	},
	testMatch: ["**/?(*.)test.ts"],
	collectCoverageFrom: ["src/**/*.{ts}"],
	coverageReporters: ["text-summary"],
};
