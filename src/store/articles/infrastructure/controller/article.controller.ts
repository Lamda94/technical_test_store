import { Controller, Get, Query } from '@nestjs/common';
import { ArticleCaseUse } from '../../application/article.case';
import { ArticleRepository } from '../repository/article.service';

@Controller('article')
export class ArticleController {
    private readonly articleCase: ArticleCaseUse;
    constructor(articleRepository: ArticleRepository) {
        this.articleCase = new ArticleCaseUse(articleRepository);
    }

    @Get('list')
    async listArticles() {
        return await this.articleCase.listArticles();
    }

    @Get('detail')
    async detailArticles(@Query('id') id: string) {
        return await this.articleCase.getDetailArticle(id);
    }
}
