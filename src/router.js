import { Router } from "express";
import Controller from "./controller.js";

const router = Router();

router.get("/start", Controller.start);

router.get("/refresh", Controller.refresh);

export default router;
