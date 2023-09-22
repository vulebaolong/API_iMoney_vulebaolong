import { Body, Controller, Delete, Get, Param, Req, UseGuards } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransactionService } from "./transaction.service";

@Controller("transaction")
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    @Get()
    @UseGuards(AuthGuard("jwt"))
    getListTransaction(
        @Req()
        req
    ) {
        return this.transactionService.getListTransaction(req.user);
    }

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

    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    deleteTransaction(
        @Param("id")
        id: string,

        @Req()
        req
    ) {
        return this.transactionService.deleteTransaction(id, req.user);
    }
}
