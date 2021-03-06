import { ApolloClient } from '@apollo/client';
import { cache } from './cache';

const uri = `/api/malware-detection/v1/graphql`;

const client = props => new ApolloClient({ cache, uri, ...props });

export { client };
