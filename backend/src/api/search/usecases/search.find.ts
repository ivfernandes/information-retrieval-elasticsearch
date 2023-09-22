import { BadRequestException } from '../../../shared/exceptions/bad.request.exception';
import ElasticSearchService from '../../services/elasticsearch';

export default class SearchFind {
  async search(query: string) {
    const elasticSearchService = new ElasticSearchService();
    if (!query) throw new BadRequestException('Termo de busca não informado');
    return elasticSearchService.search('documents', query);
  }
}
