import { Column, DataType, Model, Table } from "sequelize-typescript";
import { RequestStatus } from "../shared/enums/RequestStatus";

@Table({ tableName: 'requests' })
export class Request extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'Request title',
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    })
    title!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    })
    text!: string;

    @Column({
        type: DataType.ENUM(...Object.values(RequestStatus)),
        allowNull: false,
        defaultValue: RequestStatus.NEW,
        validate: {
            notEmpty: true,
            isIn: [Object.values(RequestStatus)],
        }
    })
    status!: RequestStatus;
}