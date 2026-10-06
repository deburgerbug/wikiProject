import { Router} from "express"
import {getCategory} from "./category.controller.js"

const router = Router()

router.get("/communities/:communitySlug/categories/:categorySlug", getCategory)

export default router;