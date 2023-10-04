import db from "./database.js";

const user1 = db.addUser("John Doe", "john.doe@example.com");
db.addHobbyToUser(user1.id, "Reading");
db.addHobbyToUser(user1.id, "Cycling");