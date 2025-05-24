import { Column, DataType, Model, Table } from "sequelize-typescript";
import { AppealStatus } from "../shared/enums/AppealStatus";

@Table({ tableName: 'appeals' })
export class Appeal extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'Appeal title',
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
        type: DataType.ENUM(...Object.values(AppealStatus)),
        allowNull: false,
        defaultValue: AppealStatus.NEW,
        validate: {
            notEmpty: true,
            isIn: [Object.values(AppealStatus)],
        }
    })
    status!: AppealStatus;
}