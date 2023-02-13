import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
import { LocalStorageService } from './localStorage';
import { UserSecretStorageService } from './userSecretStorage';

const initClient = async () => {
  const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_URL });
  const secret = await UserSecretStorageService.get();

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${secret?.token}`,
      }
    }));

    return forward(operation);
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });
}

export const client = await initClient();
