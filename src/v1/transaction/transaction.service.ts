import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { User } from "../auth/schema/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Transaction } from "./schema/transaction.schema";
import { Model } from "mongoose";

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name)
        private transactionModel: Model<Transaction>
    ) {}

    async getListTransaction(user: User): Promise<Transaction[]> {
        return await this.transactionModel.find({ user_Id: user._id }).populate("category_Id");
    }

    async createTransaction(transaction: CreateTransactionDto, user: User): Promise<Transaction> {
        const data = Object.assign(transaction, { user_Id: user._id });

        if (data.location?.trim() === "") data.location = "location"

        if (data.withPerson?.trim() === "") data.withPerson = "me"

        return await this.transactionModel.create(data);
    }

    async deleteTransaction(id: string, user: User): Promise<Transaction> {
        return await this.transactionModel.findOneAndDelete({ _id: id, user_Id: user._id });
    }
}
