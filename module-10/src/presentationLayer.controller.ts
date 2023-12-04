import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import {
  createUser,
  findUserByEmail,
  findUserById
} from "./user.repository.ts";
import { userModel } from "./models/user.model.ts";
import {
  hashPassword,
  comparePasswords,
  signToken,
  verifyToken
} from "./auth.service.ts";
import { AuthenticatedRequest } from "./types.ts";
import { getMongoClient } from "../../module-10/mongo.ts"
import debug from "debug";

const logger = debug("app:presentationLayer");

const router = Router();

// Sign up a new user
router.post("/register", async (req: Request, res: Response) => {
  logger("Handling POST /register");
  try {
    const password = req.body.password;
    const hashedPassword = await hashPassword(password);

    const newUser = new userModel({
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    });

    await createUser(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
  logger("Finished handling POST /register");
});

// Sign in an existing user
router.post("/login", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await comparePasswords(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user);

    res.status(200).json({ token: token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Authentication middleware
const authenticate: RequestHandler = async (req: Request, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const payload = verifyToken(token);
    const user = await findUserById(payload.id);

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    (req as AuthenticatedRequest).user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

// Sample protected route
// @ts-ignore
router.get("/protected", authenticate, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ message: "You have accessed a protected route" });
});

//health check
router.get("/health", async (_req: Request, res: Response) => {
  try {
    const mongoClient = await getMongoClient();
    await mongoClient.db("test").command({ ping: 1 });
    mongoClient.close();
    res.status(200).send("Connection to DB successful");
  } catch (err) {
    res.status(500).send("DB connection failed");
  }
});

export default router;