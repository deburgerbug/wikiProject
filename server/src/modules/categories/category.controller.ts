import { Request, Response } from "express";
import { getPublishedCategory } from "./category.service";

export async function getCategory(req: Request, res: Response): Promise<void> {
    try {
        const { communitySlug, categorySlug }  = req.params;
        
        const category = await getPublishedCategory( communitySlug as string, categorySlug as string)

        res.status(200).json({
            success: true,
            data: category,
        })
    }catch(error){
        console.error(error);
    }

    res.status(400).json({
        success: false,
        message: "Category not found"
    });
}