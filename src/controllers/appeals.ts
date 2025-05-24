import { Request, Response } from "express";

export const createAppeal = async (req: Request, res: Response) => {
    res.json({
        message: "Create an appeal",
    });
};
export const startAppeal = async (req: Request, res: Response) => {
    res.json({
        message: "Start an appeal",
    });
};
export const completeAppeal = async (req: Request, res: Response) => {
    res.json({
        message: "Complete an appeal",
    });
};
export const cancelAppeal = async (req: Request, res: Response) => {
    res.json({
        message: "Cancel an appeal",
    });
};
export const fetchAppeals = async (req: Request, res: Response) => {
    res.json({
        message: "Get all appeals",
    });
};
export const cancelAllStartedAppeals = async (req: Request, res: Response) => {
  res.json({
    message: "Cancel all started appeals",
  });
};