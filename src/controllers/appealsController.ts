import { Request, Response } from "express";
import * as appealsService from "../services/appealsService";

export const createAppeal = async (req: Request, res: Response): Promise<any> => {
    const { title, description } = req.body;

    if (!req.body || !title || !description) {
        throw new Error('Title and text are required to create an appeal.');
    }

    try {
        return res.json(await appealsService.createAppeal(title, description));
    } catch (err) {
        throw new Error(err.message);
    }
};
export const startAppeal = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    if (!id) {
        throw new Error('ID are required to start an appeal.');
    }

    try {
        return res.json(await appealsService.startAppeal(parseInt(id)));
    } catch (err) {
        throw new Error(err.message);
    }
};
export const completeAppeal = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { completionComment } = req.body;

    if (!id || !completionComment) {
        throw new Error('ID and completion comment are required to complete an appeal.');
    }

    try {
        return res.json(await appealsService.completeAppeal(parseInt(id), completionComment));
    } catch (err) {
        throw new Error(err.message);
    }
};
export const cancelAppeal = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { cancellingComment } = req.body;

    if (!id || !cancellingComment) {
        throw new Error('ID and cancelling comment are required to cancel an appeal.');
    }

    try {
        return res.json(await appealsService.cancelAppeal(parseInt(id), cancellingComment));
    } catch (err) {
        throw new Error(err.message);
    }
};

export const fetchAppeals = async (req: Request, res: Response): Promise<any> => {
    res.json({
        message: "Get all appeals",
    });
};
export const cancelAllStartedAppeals = async (req: Request, res: Response): Promise<any> => {
    res.json({
        message: "Cancel all started appeals",
    });
};