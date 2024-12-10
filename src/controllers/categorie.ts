import { Request, Response } from "express";
import { Category, ICategory } from "../models/categorie";

export const categoryController = {
  // Create a new category
  create: async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const { userId, companyId } = req.user;
      const newCategory = new Category({
        name,
        description,
        companyId,
        userId,
      });
      const existingCategory = await Category.findOne({
        name: name,
        companyId: companyId,
      });
      if (existingCategory) {
        return res.status(400).json({ message: "Category already exists" });
      }
      const savedCategory = await newCategory.save();

      res.status(201).json(savedCategory);
    } catch (error) {
      res.status(400).json({ message: "Error creating category", error });
    }
  },

  // Get all categories
  getAll: async (req: Request, res: Response) => {
    try {
      const { companyId } = req.user; // Extract companyId from the authenticated user
      if (!companyId) {
        return res.status(400).json({ message: "Company ID is required" });
      }

      // Fetch categories that match the companyId
      const categories = await Category.find({ companyId });

      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ message: "Error fetching categories", error });
    }
  },

  // Get a single category by ID
  getById: async (req: Request, res: Response) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: "Error fetching category", error });
    }
  },

  // Update a category
  update: async (req: Request, res: Response) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(400).json({ message: "Error updating category", error });
    }
  },

  // Delete a category
  delete: async (req: Request, res: Response) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting category", error });
    }
  },
};
