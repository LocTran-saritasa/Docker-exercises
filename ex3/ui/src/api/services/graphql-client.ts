import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, fromPromise } from '@apollo/client';

import { UserSecretStorageService } from './userSecretStorage';

const initClient = () => {
  const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_URL });

  const authMiddleware = new ApolloLink((operation, forward) =>
  fromPromise(UserSecretStorageService.get()).flatMap(secret => {
      if (secret == null) {
        return forward(operation);
      }

      // add the authorization to the headers
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          Authorization: `Bearer ${secret.token}`,
        },
      }));

      return forward(operation);
    }));

  return new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        nextFetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      },
    },
    link: concat(authMiddleware, httpLink),
  });
};

export const client = await initClient();
