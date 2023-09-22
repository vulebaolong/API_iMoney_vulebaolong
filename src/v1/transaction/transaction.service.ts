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
    async createTransaction(transaction: CreateTransactionDto, user: User): Promise<Transaction> {
        const data = Object.assign(transaction, { user_Id: user._id });

        return await this.transactionModel.create(data);
    }
}
