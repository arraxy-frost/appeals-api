import { sequelize } from "../config/sequelize";
import { AppealStatus } from "../shared/enums/AppealStatus";
import { Appeal } from "../models/Appeal";

export const createAppeal = async (title: string, text: string): Promise<any> => {
    return await sequelize.models.Appeal.create({
        title,
        text,
        status: AppealStatus.NEW,
    });
};

export const startAppeal = async (id: number): Promise<Appeal> => {
    const appeal = await Appeal.findByPk(id);

    if (!appeal) {
        throw new Error(`Appeal with ID ${id} not found.`);
    }

    appeal.status = AppealStatus.IN_PROGRESS;

    return await appeal.save();
};

export const completeAppeal = async (id: number, completionComment: string): Promise<Appeal> => {
    const appeal = await Appeal.findByPk(id);

    if (!appeal) {
        throw new Error(`Appeal with ID ${id} not found.`);
    }

    appeal.completionComment = completionComment;
    appeal.status = AppealStatus.COMPLETED;

    return await appeal.save();
};

export const cancelAppeal = async (id: number, cancellingComment: string): Promise<Appeal> => {
    const appeal = await Appeal.findByPk(id);

    if (!appeal) {
        throw new Error(`Appeal with ID ${id} not found.`);
    }

    appeal.cancellingComment = cancellingComment;
    appeal.status = AppealStatus.CANCELLED;

    return await appeal.save();
};