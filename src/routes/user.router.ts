import { Router } from "express";
import { getByIdOrToken } from "../controllers/user.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getByIdOrToken);

router.use(authMiddleware);
export default router;
