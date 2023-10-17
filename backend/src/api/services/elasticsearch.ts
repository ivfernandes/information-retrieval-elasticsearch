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

  async findAll(index: string) {
    const result = await this.client.search({
      index: index,
      body: {
        query: {
          match_all: {},
        },
      },
    });

    return result.hits.hits;
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
        highlight: {
          fields: {
            body: {
              fragment_size: 500,
              number_of_fragments: 3,
              max_analyzed_offset: 1000000,
              pre_tags: ['<b>'],
              post_tags: ['</b>'],
            },
          },
          boundary_chars: '.,!?\t\n',
        },
      },
    });

    return result.hits.hits;
  }

  async searchV2(index: string, query: string) {
    const result = await this.client.search({
      index: index,
      body: {
        query: {
          multi_match: {
            query: this.repeatSearchTerms(query),
            fields: ['title^10', 'body^5'],
            analyzer: 'portuguese',
          },
        },
        highlight: {
          fields: {
            body: {
              fragment_size: 500,
              number_of_fragments: 3,
              max_analyzed_offset: 1000000,
              pre_tags: ['<b>'],
              post_tags: ['</b>'],
            },
          },
          boundary_chars: '.,!?\t\n',
        },
      },
    });

    return result.hits.hits;
  }

  repeatSearchTerms(query: string): string {
    const words = query.split(' ').reverse();
    let newQuery = '';
    words.forEach((word, index) => {
      newQuery += `${word} `.repeat(index + 1);
    });
    newQuery = newQuery.split(' ').reverse().join(' ');
    return newQuery;
  }
}
