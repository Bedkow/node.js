const os = require("os");

// check operating system
console.log(os.type());

if (os.platform() === "win32") {
	console.log("windows code block");
} else if (os.platform() === "darwin" || os.platform() === "linux") {
	console.log("MacOS/Linux code block");
}
