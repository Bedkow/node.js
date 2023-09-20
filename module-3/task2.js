import { EventEmitter } from "./task1.js";

class WithTime extends EventEmitter {
	async execute(asyncFunc, pageNumber) {
		this.emit("begin");

		console.time("asyncFunc()");

		try {
			let data = await asyncFunc(pageNumber);
			console.log(data);
		} catch (err) {
			console.log(err);
		}

		console.timeEnd("asyncFunc()");

		this.emit("end");
	}
}

async function asyncFunc(pageNumber = 1) {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${pageNumber}`
	);

	if (!response.ok) {
		throw new Error(`An exception occurred: ${response.status}`);
	}

	const data = await response.json();

	Object.keys(data).length < 1 ? console.log("The page is empty!") : null;

	return data;
}

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));

withTime.execute(asyncFunc, 5);
