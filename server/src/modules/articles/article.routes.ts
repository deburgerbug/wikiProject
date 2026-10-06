import { Router } from "express";
import {getArticle} from "./article.controller.js"

const router = Router();

router.get("/communities/:communitySlug/articles/:articleSlug", getArticle);

export default router;