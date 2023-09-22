import { Body, Controller, Req, UseGuards } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransactionService } from "./transaction.service";

@Controller("transaction")
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    @Post()
    @UseGuards(AuthGuard("jwt"))
    createTransaction(
        @Body()
        transaction: CreateTransactionDto,

        @Req()
        req
    ) {
        return this.transactionService.createTransaction(transaction, req.user);
    }
}
