const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method.toLowerCase();
  
    // Regular Expressions
    const userIdPattern = /\/users\/(\d+)$/;
    const userHobbiesPattern = /\/users\/\d+\/hobbies$/;
    const userSpecificHobbyPattern = /\/users\/\d+\/hobbies\/\w+$/;
  
    // Route Map
    const routes = {
      "/users": {
        get: getUsers,
        post: createUser,
      },
      [userIdPattern.source]: {
        get: getUserById,
        patch: updateUser,
        delete: deleteUser,
      },
      [userHobbiesPattern.source]: {
        get: getUserHobbies,
        post: addUserHobby,
      },
      [userSpecificHobbyPattern.source]: {
        delete: deleteUserHobby,
      },
    };
  
    // Find Route and Execute
    const matchedRoute = Object.keys(routes).find((pattern) =>
      pattern.startsWith("/") ? pattern === path : new RegExp(pattern).test(path)
    );
  
    if (matchedRoute && routes[matchedRoute][method]) {
      routes[matchedRoute][method](req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  });