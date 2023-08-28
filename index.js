const crypto = require("crypto");

const getRandomNumber = () => {
	const myArray = new Int8Array(1);
	crypto.getRandomValues(myArray);
	for (const num of myArray) {
		console.log(`getRandomNumber() output: ${num}`);
	};
};

getRandomNumber();