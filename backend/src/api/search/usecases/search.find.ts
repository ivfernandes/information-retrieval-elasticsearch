import ElasticSearchService from '../../services/elasticsearch';

export default class SearchFind {
  async findAll() {
    const elasticSearchService = new ElasticSearchService();
    return elasticSearchService.findAll('documents');
  }

  async search(query: string) {
    const elasticSearchService = new ElasticSearchService();
    if (!query) return elasticSearchService.findAll('documents');
    return elasticSearchService.search('documents', query);
  }
}
