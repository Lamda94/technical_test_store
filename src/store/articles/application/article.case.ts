import { HttpException, HttpStatus } from "@nestjs/common";
import { ArticleEntity } from "../domain/entity/article.entity";
import { ArticlePort } from "../domain/ports/article.port";

export class ArticleCaseUse {
    constructor(private readonly articlePort: ArticlePort) { }

    async listArticles(): Promise<ArticleEntity[]> {
        try {
            const articles = await this.articlePort.getArticles();
            if(!articles) throw new HttpException('No se encontraron articulos', HttpStatus.NOT_FOUND)
            return articles;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    async getDetailArticle(id: string): Promise<ArticleEntity> {
        try {
            const article = await this.articlePort.articleDetail(id);
            if(!article) throw new HttpException('No se encontro el articulo', HttpStatus.NOT_FOUND)
            return article; 
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

}