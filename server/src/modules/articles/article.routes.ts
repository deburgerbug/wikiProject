import { Router } from "express";
import {getArticle} from "./article.controller.js"

const router = Router();

router.get("/articleSlug", getArticle);

export default router;