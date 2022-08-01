import express from "express";
import { isPasswordMatch, isUserExist, registerUser } from "./businessLogic";
import { signToken } from "./jwt-helper";
import { validateRegisterMiddleware } from "./validations";
const router = express.Router();

router.post("/login", loginHandler);
router.post("/register", validateRegisterMiddleware, registerHandler);
router.get("/logout", logoutHandler);


function logoutHandler(req, res, next) {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) return res.status(400).json({ message: "Logout error please try again" });
    else res.status(200).json({ message: "user logged out" });
  } catch (error) {
    return next(new Error("logoutHandler api error"));
  }
}

async function loginHandler(req, res, next) {
  try {
    const { user_site_username, user_password } = req.body;
    const currentUser = await isUserExist(user_site_username);
    if (!currentUser) return res.status(404).send("User not found");
    if (!isPasswordMatch(currentUser, user_password)) return res.status(401).send("User not authorized");
    const { user_first_name, user_id, user_role } = currentUser;
    const token = signToken({
      user_first_name,
      user_id,
      user_role,
    });
    return res.status(200).json({ user_id, user_role, user_first_name, message: `Login Success`, token });
  } catch (error) {
    return next(new Error("loginHandler api error"));
  }
}

async function registerHandler(req, res, next) {
  try {
    const { user_first_name,
      user_last_name,
      user_email,
      user_site_username,
      user_password
    } = req.body;
    const currentUser = await isUserExist(user_site_username);
    if (currentUser) return res.status(404).send("User already exists");
    const result = await registerUser(user_first_name, user_last_name, user_email, user_site_username, user_password);
    if(result) return res.status(201).json({ user_id: result, message: `Register Success` });
  } catch (error) {
    return next(new Error("registerHandler api error"));
  }
}


export default router;
