import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsNumber()
    total: number;

    @IsNotEmpty()
    @IsString()
    note: string;

    @IsNotEmpty()
    @IsString()
    createDay: string;

    @IsNotEmpty()
    @IsString()
    category_Id: string;

    @IsOptional()
    @IsString()
    location: string;

    @IsOptional()
    @IsString()
    withPerson: string;
}
