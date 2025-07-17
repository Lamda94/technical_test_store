import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../repository/article.service';

@Injectable()
export class ArticleSeeder {
  constructor(private readonly articleService: ArticleRepository) {}

  async run() {
    const articles = [
      {
        article_name: 'Camiseta de Algodón Pima',
        article_description:
          'Camiseta básica de corte clásico, fabricada con el algodón pima más suave para máxima comodidad. Perfecta para cualquier ocasión.',
        article_price: 85000,
        article_image:
          'https://via.placeholder.com/600x400.png?text=Camiseta+Pima',
        article_stock: 120,
        article_status: 1,
      },
      {
        article_name: 'Jean Slim Fit',
        article_description:
          'Vaquero de corte slim con un toque de elasticidad para mayor confort y libertad de movimiento. Tono azul medio desgastado.',
        article_price: 220000,
        article_image:
          'https://via.placeholder.com/600x400.png?text=Jean+Slim+Fit',
        article_stock: 75,
        article_status: 1,
      },
      {
        article_name: "Buzo con Capucha 'Cartagena'",
        article_description:
          "Buzo de tela perchada con capucha y estampado exclusivo 'Cartagena'. Ideal para las tardes frescas y con mucho estilo.",
        article_price: 180000,
        article_image:
          'https://via.placeholder.com/600x400.png?text=Buzo+Cartagena',
        article_stock: 50,
        article_status: 1,
      },
      {
        article_name: 'Vestido de Lino',
        article_description:
          'Vestido fresco de lino con tirantes ajustables y corte a media pierna. El tejido perfecto para el clima cálido.',
        article_price: 250000,
        article_image:
          'https://via.placeholder.com/600x400.png?text=Vestido+Lino',
        article_stock: 40,
        article_status: 1,
      },
      {
        article_name: 'Bermuda de Jean',
        article_description:
          'Bermuda clásica de 5 bolsillos con dobladillo. Cómoda y versátil para un look de fin de semana.',
        article_price: 135000,
        article_image:
          'https://via.placeholder.com/600x400.png?text=Bermuda+Jean',
        article_stock: 90,
        article_status: 1,
      },
      {
        article_name: 'Camisa de Lino Manga Larga',
        article_description:
          'Camisa elegante y transpirable de lino 100%. Un básico imprescindible en el guardarropa masculino para climas cálidos.',
        article_price: 195000,
        article_image:
          'https://via.placeholder.com/600x400.png?text=Camisa+Lino',
        article_stock: 65,
        article_status: 1,
      },
      {
        article_name: "Gorra Trucker 'Corales'",
        article_description:
          'Gorra estilo camionero con malla transpirable en la parte trasera y un parche bordado inspirado en los corales.',
        article_price: 75000,
        article_image:
          'https://via.placeholder.com/600x400.png?text=Gorra+Corales',
        article_stock: 200,
        article_status: 0,
      },
    ];
    const articlesList = await this.articleService.getArticles();
    if (articlesList && articlesList.length > 0) return;
    for (const article of articles) {
      await this.articleService.creteArticle(article);
    }
  }
}
