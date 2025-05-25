import {sequelize} from "../config/sequelize";
import {AppealStatus} from "../shared/enums/AppealStatus";
import {Appeal} from "../models/Appeal";
import SearchAppealsDto from "../shared/dto/search-appeals.dto";
import {Op} from "sequelize";
import CreateAppealDto from "../shared/dto/create-appeal.dto";

export const createAppeal = async (createDto: CreateAppealDto): Promise<any> => {
    const { title, description } = createDto;

    return await sequelize.models.Appeal.create({
        title,
        description,
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

export const cancelAllInProgressAppeals = async () => {
    return Appeal.update(
        {
            status: AppealStatus.CANCELLED,
            cancellingComment: 'Cancelled automatically. Please contact support for more information.',
        }, {
            where: {
                status: AppealStatus.IN_PROGRESS,
            }
        }
    );
}

export const searchAppeals = async (searchDto: SearchAppealsDto): Promise<{
    limit: number;
    page: number;
    offset: number;
    totalCount: number;
    data: Appeal[]
}> => {
    const { limit = 10, page = 1, dateFrom, dateTo } = searchDto;

    const where = {};
    const offset = (page - 1) * limit;

    if (dateFrom && dateTo) {
        where['createdAt'] = {
            [Op.between]: [dateFrom, dateTo],
        };
    } else if (dateFrom) {
        where['createdAt'] = {
            [Op.gte]: dateFrom,
        }
    } else if (dateTo) {
        where['createdAt'] = {
            [Op.lte]: dateTo,
        }
    }

    if (searchDto.status) {
        where['status'] = Array.isArray(searchDto.status)
            ? { [Op.in]: searchDto.status }
            : searchDto.status;
    }

    const { rows: appeals, count: totalCount } = await Appeal.findAndCountAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
    });

    return {
        limit,
        page,
        offset,
        totalCount,
        data: appeals
    }
}