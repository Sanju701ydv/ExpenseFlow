import { Response } from "express";
import DashboardService from "../services/dashboard.service";

// Dashboard Summary
export const getSummary = async (req: any, res: Response) => {
  try {

    const summary = await DashboardService.getSummary(req.user.id);

    res.json({
      success: true,
      data: summary,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Category Analytics
export const getCategoryData = async (req: any, res: Response) => {
  try {

    const data = await DashboardService.getCategoryData(req.user.id);

    res.json({
      success: true,
      data,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Monthly Analytics
export const getMonthlyData = async (req: any, res: Response) => {
  try {

    const data = await DashboardService.getMonthlyData(req.user.id);

    res.json({
      success: true,
      data,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};