import { Module } from "@nestjs/common";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionSchema } from "./schema/transaction.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: "Transaction", schema: TransactionSchema }])],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
