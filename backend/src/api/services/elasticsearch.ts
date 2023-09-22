import { Client } from '@elastic/elasticsearch';
import config from 'config';

const elastic = config.get('elastic') as {
  cloudId: string;
  username: string;
  password: string;
};

export default class ElasticSearchService {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      cloud: { id: elastic.cloudId },
      auth: { username: elastic.username, password: elastic.password },
    });
  }

  async search(index: string, query: string) {
    const result = await this.client.search({
      index: index,
      body: {
        query: {
          multi_match: {
            query: query,
            fields: ['title', 'body'],
          },
        },
      },
    });

    return result.hits.hits;
  }


}
