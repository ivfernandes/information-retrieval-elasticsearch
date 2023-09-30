import { Client } from '@elastic/elasticsearch';
import config from 'config';

const elastic = config.get('elastic') as {
  host: string;
  port: string;
  password: string;
};

export default class ElasticSearchService {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      node: `${elastic.host}:${elastic.port}`,
      auth: { username: 'elastic', password: elastic.password },
      tls: {
        rejectUnauthorized: false,
      },
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
