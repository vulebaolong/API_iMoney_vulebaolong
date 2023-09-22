import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/v1/auth/schema/user.schema";

@Schema({
    timestamps: true,
    collection: "category",
})
export class Category extends Document {
    @Prop()
    title: string;

    @Prop()
    color: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user_Id: User;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
