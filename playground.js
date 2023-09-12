// old code from tutorials and exercises - do not check/grade

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const http = require('https');
const url = require('url');
const fs = require('fs');

console.time("SSL");

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

console.timeEnd("SSL");

const port = 5000;

const server = http.createServer(options, (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);

    const { query } = url.parse(req.url, true);

    if (query.year && query.month) {
        // https://localhost:5000/?year=2023&month=August
        const date = query.year + " " + query.month;
        res.end(`<h1>Hello</h1><br><div>${date}</div>`);
    } else {
        res.end(`<h1>Hello, no date</h1>`)
    }
    
});

server.listen(port, () => {
    console.log(`Server running at :${port}`)
});

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const http = require('http');
const fs = require('fs');

const port = 5000;

const server = http.createServer((req, res) => {
    fs.readFile('page.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);

        return res.end();
    });
});

server.listen(port, () => {
    console.log(port)
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const cluster = require('cluster');
const http = require('http');
const os = require('os');

const port = 6006;

const requestHandler = (request, response) => {
  response.writeHead(200);
  if (request.url === '/error') {
    throw new Error('Oh no!'); // Uncaught exception
  } else {
    response.end(`<h1 style="text-align:center;margin-top:40px;">It runs &#128640;</h1>`);
    process.send({ cmd: 'notifyRequest' }); // Notify master about the request
  }
};

const server = http.createServer(requestHandler);

console.log(`✅ ${cluster.isMaster ? 'I am Master' : `I am worker, my id is ${cluster.worker.id}`}`);

// Check is cluster master or not
if (cluster.isMaster) {
  const cpuCount = os.cpus().length; // CPU LOGICAL cores (threads) amount

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork(); // Forks worker for each CPU core
  }

  cluster.on('fork', (worker) => {
    console.log(`Worker #${worker.id} is online 👍`);
  });

  cluster.on('listening', (worker, address) => {
    console.log(`The worker #${worker.id} is now connected to port #${JSON.stringify(address.port)}`);
    // Worker is waiting for Master's message
    worker.on('message', messageHandler);
  });

  cluster.on('disconnect', (worker) => {
    console.log(`The worker #${worker.id} has disconnected 🥲`);
  });

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.id} is dead 😵`);
    cluster.fork(); // Create another worker instead of dead one
  });

  let numRequests = 0; // Number of incoming requests

  function messageHandler(message) {
    if (message.cmd && message.cmd === 'notifyRequest') {
      numRequests += 1;
      console.log(`Requests received: ${numRequests}`);
    }
  }
} else {
  server.listen(port + cluster.worker.id, (error) => {
    if (error) {
      return console.log(`Server error ${error}`);
    }

    console.log(`Server running 🚀 at http://localhost:${port + cluster.worker.id}/`);
  });

  process.on('uncaughtException', (error) => {
    console.error(`${(new Date).toUTCString()} uncaught exception: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  });
}