import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Body } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoryService } from "./category.service";

@Controller("category")
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    @UseGuards(AuthGuard("jwt"))
    getAllCategory(
        @Req()
        req
    ) {
        return this.categoryService.getAllCategory(req.user);
    }

    @Post()
    @UseGuards(AuthGuard("jwt"))
    createCategory(
        @Body()
        category: CreateCategoryDto,

        @Req()
        req
    ) {
        return this.categoryService.createCategory(category, req.user);
    }

    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    deleteCategory(
        @Param("id")
        id: string,

        @Req()
        req
    ) {
        return this.categoryService.deleteCategory(id, req.user);
    }
}
