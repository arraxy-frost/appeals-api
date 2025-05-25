import {AppealStatus} from "../enums/AppealStatus";

export default class SearchAppealsDto {
    limit?: number;
    page?: number;
    status?: AppealStatus | AppealStatus[];
    dateFrom?: Date;
    dateTo?: Date;
}