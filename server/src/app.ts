import express from "express"
import articleRoutes from "./modules/articles/article.routes.js"
import categoryRoutes from "./modules/categories/category.routes.js"
const app =express()

app.use(express.json())

app.use("/api", articleRoutes)
app.use("/api", categoryRoutes)
export default app;