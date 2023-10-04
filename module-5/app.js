import http from "http";
import url from "url";
import users from "./data.js";

// get data and calc next user id
let takenIDs = [];
for(let user of users) {
	takenIDs.push(user.id);
}
takenIDs.sort((a, b) => b - a);
let highestID = takenIDs[0];
let nextUserID = ++highestID;

const port = 3000;

function getUsers(req, res) {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify(users.map(({ id, name, email }) => ({ id, name, email })))
	);
}

function getUserById(req, res) {
	const id = parseInt(req.url.split("/")[2]);
	const user = users.find((u) => u.id === id);

	if (user) {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({ id: user.id, name: user.name, email: user.email, getHobbies: `http://localhost:3000/users/${user.id}/hobbies` })
		);
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "User not found" }));
	}
}

function createUser(req, res) {
	let body = "";

	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name, email, hobbies } = JSON.parse(body);

		if (name && email && hobbies) {
			const newUser = {
				id: nextUserID++,
				name,
				email,
				hobbies,
			};
			users.push(newUser);
			res.writeHead(201, { "Content-Type": "application/json" });
			res.end(JSON.stringify(newUser));
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Insufficient User Data" }));
		}
	});
}

function updateUser(req, res) {
	const id = parseInt(req.url.split("/")[2]);
	const user = users.find((u) => u.id === id);

	if (user) {
		let body = "";

		req.on("data", (chunk) => {
			body += chunk.toString();
		});
			req.on("end", () => {
                // remove trailing comma from json if present
                body = body.replace(/,\s*([\]}])/g, '$1');
				const { name, email } = JSON.parse(body);
				if (name) user.name = name;
				if (email) user.email = email;

				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify(user));
			});
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "User not found" }));
	}
}

function deleteUser(req, res) {
	const id = parseInt(req.url.split("/")[2]);
	const userIndex = users.findIndex((u) => u.id === id);

	if (userIndex !== -1) {
		users.splice(userIndex, 1);
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "User deleted" }));
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "User not found" }));
	}
}

function getUserHobbies(req, res) {
	const id = parseInt(req.url.split("/")[2]);
	const user = users.find((u) => u.id === id);

	if (user) {
		res.writeHead(200, {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600"
    });
		res.end(JSON.stringify(user.hobbies));
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "User not found" }));
	}
}

function addUserHobby(req, res) {
	const id = parseInt(req.url.split("/")[2]);
	const user = users.find((u) => u.id === id);

	if (user) {
		let body = "";

		req.on("data", (chunk) => {
			body += chunk.toString();
		});

		req.on("end", () => {
			const { hobby } = JSON.parse(body);
			user.hobbies.push(hobby);
			res.writeHead(201, { "Content-Type": "application/json" });
			res.end(JSON.stringify(user.hobbies));
		});
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "User not found" }));
	}
}

function deleteUserHobby(req, res) {
	const id = parseInt(req.url.split("/")[2]);
	const hobby = req.url.split("/")[4];
	const user = users.find((u) => u.id === id);

	if (user) {
		const hobbyIndex = user.hobbies.indexOf(hobby);

		if (hobbyIndex !== -1) {
			user.hobbies.splice(hobbyIndex, 1);
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Hobby deleted" }));
		} else {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Hobby not found" }));
		}
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "User not found" }));
	}
}

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.pathname;
	const method = req.method.toLowerCase();

	if (path === "/users" && method === "get") {
		getUsers(req, res);
	} else if (path.match(/\/users\/\d+\/hobbies$/) && method === "get") {
		getUserHobbies(req, res);
	} else if (path.match(/\/users\/\d+$/) && method === "get") {
		getUserById(req, res);
	} else if (path === "/users" && method === "post") {
		createUser(req, res);
	} else if (path.match(/\/users\/\d+$/) && method === "patch") {
		updateUser(req, res);
	} else if (path.match(/\/users\/\d+$/) && method === "delete") {
		deleteUser(req, res);
	} else if (path.match(/\/users\/\d+\/hobbies$/) && method === "post") {
		addUserHobby(req, res);
	} else if (path.match(/\/users\/\d+\/hobbies\/\w+$/) && method === "delete") {
		deleteUserHobby(req, res);
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "Route not found" }));
	}
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
