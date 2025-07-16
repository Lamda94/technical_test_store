import { IsNumber, IsString } from "class-validator";
import { ArticleEntity } from "../../domain/entity/article.entity";

export class CreateArticleDto implements ArticleEntity{
    @IsString({ message: 'El nombre del articulo debe ser una cadena de texto' })
    article_name: string;

    @IsString({ message: 'La descripcion del articulo debe ser una cadena de texto' })
    article_description: string;

    @IsNumber({}, { message: 'El precio del articulo debe ser un numero' })
    article_price: number;

    @IsString({ message: 'La imagen del articulo debe ser una cadena de texto' })
    article_image: string;

    @IsNumber({}, { message: 'El stock del articulo debe ser un numero' })
    article_stock: number;

    @IsNumber({}, { message: 'El status del articulo debe ser un numero' })
    article_status: number;
}