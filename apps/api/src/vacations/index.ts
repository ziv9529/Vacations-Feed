import express from "express";
import verifyAdminMiddleWare from "../middleware/admin";
import { addVacationLogic, deleteVacationLogic, followVacationLogic, getAllFollowedVacationsByUserLogic, getVacationsLogic, isVacationInDBLogic, replaceImagePath, unfollowVacationLogic, updateVacationLogic } from "./businessLogic";
import { isValidAddVacationData } from "./validations";

const router = express.Router();
const upload = require('../middleware/upload');

router.get("/", getAllVacationsHandler);
router.get("/reports", verifyAdminMiddleWare, getAllVacationsHandler);
router.get("/following/:user_id", getAllFollowedVacationsHandler);
router.post("/follow/:vacation_id", followVacationsHandler);
router.post("/unfollow/:follow_id", unfollowVacationsHandler);

router.post("/", verifyAdminMiddleWare, upload.single('vacation_image'), addVacationHandler);
router.put("/update/:vacation_id", verifyAdminMiddleWare, upload.single('vacation_image'), updateVacationHandler);
router.delete("/delete/:vacation_id", verifyAdminMiddleWare, deleteVacationHandler);

async function getAllVacationsHandler(req, res, next) {
  try {
    const vacations = await getVacationsLogic();
    if (vacations) return res.status(200).json({ vacations, message: "ok" });
  } catch (error) {
    return next(new Error("getAllVacationsHandler api error"));
  }

}
async function getAllFollowedVacationsHandler(req, res, next) {
  try {
    const user_id = req?.params?.user_id;
    const followedVacations = await getAllFollowedVacationsByUserLogic(user_id);
    if (followedVacations) return res.status(200).json({ followedVacations, message: "followd - ok" });
  } catch (error) {
    return next(new Error("getAllFollowedVacationsHandler api error"));
  }

}


async function followVacationsHandler(req, res, next) {
  try {
    const userId = req?.userData?.user_id;
    const vacationId = req?.params?.vacation_id;
    if (!userId || !vacationId) return res.status(400).json({ message: "bad follow request" });
    if (req?.userData?.user_role === "admin") return res.status(403).json({ message: "Forbidden" });
    const result = await followVacationLogic(userId, vacationId)
    if (result) return res.status(201).json({ followId: result, message: "follow done" });
  } catch (error) {
    return next(new Error("followVacationsHandler api error"));
  }
}
async function unfollowVacationsHandler(req, res, next) {
  try {
    const { follow_id } = req?.params
    if (!follow_id) return res.status(400).json({ message: "bad unfollow request" });
    if (req?.userData?.user_role === "admin") return res.status(403).json({ message: "Forbidden" });
    const result = await unfollowVacationLogic(follow_id);
    if (result) res.status(201).json({ message: "unfollow done" });
  } catch (error) {
    return next(new Error("unfollowVacationsHandler api error"));
  }
}
async function addVacationHandler(req, res, next) {
  try {
    const { path: image } = req.file;
    const { vacation_destination, vacation_description, vacation_start_date, vacation_end_date, vacation_cost } = req.body;
    const updatedImagePath = replaceImagePath(image)
    const data = { vacation_destination, vacation_description, vacation_start_date, vacation_end_date, vacation_cost, vacation_image: updatedImagePath }
    if (!isValidAddVacationData(data)) return res.status(403).json({ message: `invalid data insertion please check again` })
    const result = await addVacationLogic(data);
    res.status(201).json({ vacationId: result, message: "vacation added" });
  } catch (error) {
    return next(new Error("addVacationHandler api error"));
  }
}

async function updateVacationHandler(req, res, next) {
  try {
    const vacationId = req?.params?.vacation_id;
    if (!vacationId) return res.status(400).json({ message: " bad request! " });
    const isVacationInDB = await isVacationInDBLogic(vacationId);
    if (!isVacationInDB) return res.status(400).json({ message: " vacation dont found " });
    const { path: image } = req.file;
    const updatedImagePath = replaceImagePath(image)
    const result = await updateVacationLogic(req.body, vacationId, updatedImagePath);
    if (result) return res.status(200).json({ result, message: "vacation updated" });
  } catch (error) {
    return next(new Error("updateVacationHandler api error"));
  }
}
async function deleteVacationHandler(req, res, next) {
  try {
    const vacationId = req?.params?.vacation_id;
    if (!vacationId) return res.status(400).json({ message: " bad request! " });
    const isVacationInDB = await isVacationInDBLogic(vacationId);
    if (!isVacationInDB) return res.status(400).json({ message: " vacation dont found " })
    const result = await deleteVacationLogic(vacationId);
    if (result) return res.status(200).json({ message: "vacation deleted" });
  } catch (error) {
    return next(new Error("deleteVacationHandler api error"));
  }
}



export default router;
