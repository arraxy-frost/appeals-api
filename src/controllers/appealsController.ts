import { Request, Response } from "express";
import * as appealsService from "../services/appealsService";
import SearchAppealsDto from "../shared/dto/search-appeals.dto";
import CreateAppealDto from "../shared/dto/create-appeal.dto";
import {AppealStatus} from "../shared/enums/AppealStatus";

export const createAppeal = async (req: Request, res: Response): Promise<any> => {
    const { title, description} = req.body;

    if (!req.body || !title || !description) {
        throw new Error('Title and description are required to create an appeal.');
    }

    const createDto: CreateAppealDto = {
        title: title,
        description: description,
    }

    try {
        return res.json(await appealsService.createAppeal(createDto));
    } catch (err) {
        throw new Error(err.message);
    }
};
export const startAppeal = async (req: Request, res: Response): Promise<any> => {
    const {id} = req.params;

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
    const {id} = req.params;
    const {completionComment} = req.body;

    if (!id && !completionComment) {
        throw new Error('ID and completion comment are required to complete an appeal.');
    }

    try {
        return res.json(await appealsService.completeAppeal(parseInt(id), completionComment));
    } catch (err) {
        throw new Error(err.message);
    }
};
export const cancelAppeal = async (req: Request, res: Response): Promise<any> => {
    const {id} = req.params;
    const {cancellingComment} = req.body;

    if (!id && !cancellingComment) {
        throw new Error('ID and cancelling comment are required to cancel an appeal.');
    }

    try {
        return res.json(await appealsService.cancelAppeal(parseInt(id), cancellingComment));
    } catch (err) {
        throw new Error(err.message);
    }
};

export const searchAppeals = async (req: Request, res: Response): Promise<any> => {
    const { limit, page = 1, status, dateFrom, dateTo} = req.body;

    const searchDto: SearchAppealsDto = {
        limit: limit ? Number(limit) : 10,
        page: page ? Number(page) : 1,
        status: status ? status : Object.values(AppealStatus) as AppealStatus[],
        dateFrom: dateFrom ? new Date(dateFrom as string) : null,
        dateTo: dateTo ? new Date(dateTo as string) : null,
    };

    const searchResult = await appealsService.searchAppeals(searchDto);

    res.json(searchResult);
};
export const cancelAllStartedAppeals = async (req: Request, res: Response): Promise<any> => {
    const updateResult = await appealsService.cancelAllInProgressAppeals();

    res.json({
        message: "Cancelled all started appeals",
        result: updateResult
    });
};