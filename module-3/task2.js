class EventEmitter {
	listeners = {};

	addListener(eventName, fn) {
		this.listeners[eventName] = this.listeners[eventName] || [];
		this.listeners[eventName].push(fn);
		return this;
	}

	on(eventName, fn) {
		return this.addListener(eventName, fn);
	}

	off(eventName, fn) {
		return this.removeListener(eventName, fn);
	}

	removeListener(eventName, fn) {
		let lis = this.listeners[eventName];
		if (!lis) return this;
		for (let i = lis.length; i > 0; i--) {
			if (lis[i] === fn) {
				lis.splice(i, 1);
				break;
			}
		}
		return this;
	}

	once(eventName, fn) {
		this.listeners[eventName] = this.listeners[eventName] || [];
		const onceWrapper = () => {
			fn();
			this.off(eventName, onceWrapper);
		};
		this.listeners[eventName].push(onceWrapper);
		return this;
	}

	emit(eventName, ...args) {
		let fns = this.listeners[eventName];
		if (!fns) return false;
		fns.forEach((f) => {
			f(...args);
		});
		return true;
	}

	listenerCount(eventName) {
		let fns = this.listeners[eventName] || [];
		return fns.length;
	}

	rawListeners(eventName) {
		return this.listeners[eventName];
	}
}

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
