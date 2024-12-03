import { Router } from "express";
import { createSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmiin } from "../middleware/auth.middleware.js";

const router = Router()

router.get("/", protectRoute, requireAdmiin, createSong)

export default router