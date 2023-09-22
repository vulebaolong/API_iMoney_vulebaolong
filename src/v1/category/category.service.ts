import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { User } from "../auth/schema/user.schema";
import { Category } from "./schema/category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "../transaction/schema/transaction.schema";

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<Category>,

        @InjectModel(Transaction.name)
        private transactionModel: Model<Transaction>
    ) {}

    async createCategory(category: CreateCategoryDto, user: User): Promise<Category> {
        const data = Object.assign(category, { user_Id: user._id });
        return await this.categoryModel.create(data);
    }

    async getAllCategory(user: User) {
        return await this.categoryModel.find({ user_Id: user._id });
    }

    async deleteCategory(id: string, user: User): Promise<Category> {
        const categoryDelete = await this.categoryModel.findOneAndDelete({ user_Id: user._id, _id: id });

        if (!categoryDelete) throw new NotFoundException("Not Found category Should Delete");

        const transactionDelete = await this.transactionModel.deleteMany({ category_Id: id, user_Id: user._id });

        if (!transactionDelete) throw new NotFoundException("Not Found category Should Delete");

        return categoryDelete;
    }
}
