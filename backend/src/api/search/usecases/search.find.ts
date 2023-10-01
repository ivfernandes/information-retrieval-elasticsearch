import ElasticSearchService from '../../services/elasticsearch';

export default class SearchFind {
  async search(query: string) {
    const elasticSearchService = new ElasticSearchService();
    if (!query) return elasticSearchService.findAll('documents');
    return elasticSearchService.search('documents', query);
  }

  async searchV2(query: string) {
    const elasticSearchService = new ElasticSearchService();
    if (!query) return elasticSearchService.findAll('documents');
    return elasticSearchService.searchV2('documents', query);
  }
}
