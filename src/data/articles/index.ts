import { ArticleMetadata, Article } from './types'

// Metadados dos artigos (para listagens e navega��o)
export const articlesMetadata: ArticleMetadata[] = [
  {
    id: "5",
    title: "TesteDeArtigo22",
    excerpt: "ResumoDoArtigo",
    author: "Dr. Marcelo Peixoto",
    date: "2025-09-13",
    category: "Direito Imobili�rio",
    readTime: "1 min",
    slug: "testedeartigo22",
    contentFile: "testedeartigo22"
  }
]

// Fun��o para carregar artigo completo (lazy loading)
export async function loadArticleContent(slug: string): Promise<Article | undefined> {
  const metadata = articlesMetadata.find(article => article.slug === slug)
  if (!metadata) return undefined

  try {
    const contentModule = await import(`./content/${metadata.contentFile}`)
    const content = contentModule.articleContent.content

    return {
      ...metadata,
      content
    }
  } catch (error) {
    console.error(`Erro ao carregar conte�do do artigo ${slug}:`, error)
    return undefined
  }
}

// Fun��o para obter artigo por ID
export async function loadArticleById(id: string): Promise<Article | undefined> {
  const metadata = articlesMetadata.find(article => article.id === id)
  if (!metadata) return undefined

  return loadArticleContent(metadata.slug)
}

// Para compatibilidade com c�digo existente
export async function loadAllArticles(): Promise<Article[]> {
  const articles: Article[] = []
  
  for (const metadata of articlesMetadata) {
    const article = await loadArticleContent(metadata.slug)
    if (article) {
      articles.push(article)
    }
  }
  
  return articles
}

// Export para compatibilidade com a estrutura antiga
export const articles = articlesMetadata.map(metadata => ({
  ...metadata,
  content: '' // Ser� carregado dinamicamente quando necess�rio
})) as Article[]