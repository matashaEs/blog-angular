import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { User } from "./User";

@Table
export class Token extends Model<Token>{

    @Column({
        allowNull: false
    })
    token?: string;

    @Column({
        type: DataType.ENUM('activation', 'reset'),
        allowNull: false
    })
    type?: 'activation' | 'reset';

    @ForeignKey(()=>User)
    @Column
    userId?: number;

    @BelongsTo(()=>User)
    user?: User;
}