import { ArticleEntity } from "../entity/article.entity";

export interface ArticlePort {
    creteArticle(article: ArticleEntity): Promise<ArticleEntity | null>;
    getArticles(): Promise<ArticleEntity[] | null>
    searchArticle(query: string): Promise<ArticleEntity[] | null>
    articleDetail(id: string): Promise<ArticleEntity | null>
    updateArticle(id: string, article: ArticleEntity): Promise<ArticleEntity | null>
    deleteArticle(id: string): Promise<ArticleEntity | null>
}