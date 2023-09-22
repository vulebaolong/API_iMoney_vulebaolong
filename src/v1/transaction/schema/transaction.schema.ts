import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/v1/auth/schema/user.schema";
import { Category } from "./../../category/schema/category.schema";

@Schema({
    timestamps: true,
    collection: "transaction",
})
export class Transaction extends Document {
    @Prop()
    total: number;

    @Prop()
    note: string;

    @Prop()
    createDay: string;

    @Prop({ default: "location" })
    location: string;

    @Prop({ default: "with me" })
    withPerson: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
    category_Id: Category;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user_Id: User;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
