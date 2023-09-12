const os = require("os");
const childProcess = require("child_process");
const fs = require("fs");

const execProcess = (command, operatingSys) => {
    let roundCounter = 0;
	setInterval(() => {
		childProcess.exec(command, (error, stdout, stderr) => {
			operatingSys === "win32" ? childProcess.execSync('powershell "Clear"') : console.clear();
            process.stdout.write(`Process_Name - CPU Usage - RAM Usage\n`)
			process.stdout.write(`${stdout}`);
			stderr ? console.log(`stderr: ${stderr}`) : null;

			if (error !== null) {
				console.log(`error: ${error}`);
			}

            //assuming interval will stay 1000ms
            if (roundCounter === 0 || roundCounter % 60 === 0) {
                fs.appendFile('activityMonitor.log', `${Math.floor(Date.now() / 1000)}:\n Process_Name - CPU Usage - RAM Usage\n${stdout}\n`, (err)=>{
                    if (err) throw err;
                })
            }
            roundCounter++;
		});
	}, 1000); // cannot do 100ms - PC freezes
};

// check operating system (tested only on Windows 10)
let currentOS = os.platform();
if (currentOS === "win32") {
	execProcess(
		`powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' - ' + $_.CPU + ' - ' + $_.WorkingSet + ' bytes'}"`, `win32`
	);
} else if (currentOS === "darwin" || currentOS === "linux") {
	execProcess(`ps -A -o comm,%cpu,%mem | sort -nr | head -n 1`, currentOS);
} else {
	console.log("OS not supported!");
}
