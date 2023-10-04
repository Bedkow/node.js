class User {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.hobbies = [];
    }
  
    static validateCreationData(name, email) {
      return (
        typeof name === "string" &&
        name.length > 0 &&
        typeof email === "string" &&
        email.includes("@")
      );
    }
  
    static validateUpdateData(name, email) {
      return (
        (typeof name === "string" && name.length > 0) ||
        (typeof email === "string" && email.includes("@"))
      );
    }
  }
  
  class Database {
    constructor() {
      this.users = [];
      this.nextId = 1;
    }
  
    getUserById(userId) {
      return this.users.find((user) => user.id === userId);
    }
  
    addUser(name, email) {
      if (!User.validateCreationData(name, email)) {
        console.error("Invalid user creation data");
        return null;
      }
  
      const user = new User(this.nextId++, name, email);
      this.users.push(user);
      return user;
    }
  
    updateUser(userId, name, email) {
      if (!User.validateUpdateData(name, email)) {
        console.error("Invalid user update data");
        return null;
      }
  
      const user = this.getUserById(userId);
      if (user) {
        if (name) user.name = name;
        if (email) user.email = email;
      } else {
        console.error(`User with ID ${userId} not found.`);
        return null;
      }
    }
  
    addHobbyToUser(userId, hobby) {
      const user = this.getUserById(userId);
      if (user) {
        user.hobbies.push(hobby);
      } else {
        console.error(`User with ID ${userId} not found.`);
      }
    }
  
    deleteHobbyFromUser(userId, hobby) {
      const user = this.getUserById(userId);
      if (user) {
        user.hobbies = user.hobbies.filter((h) => h !== hobby);
      } else {
        console.error(`User with ID ${userId} not found.`);
      }
    }
  
    listHobbies(userId) {
      const user = this.getUserById(userId);
      if (user) {
        return user.hobbies;
      } else {
        console.error(`User with ID ${userId} not found.`);
        return null;
      }
    }
  }
  
  const db = new Database();
  
  export default db;