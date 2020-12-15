import { InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                rulesList: { ...offsetLimitPagination(),
                    read(existing, { variables: { offset, limit } }) {

                        if (!existing) {return;} //We have no data at all

                        if (existing.length < (offset + limit)) {return;} //We don't have enough data

                        const sliced = existing.slice(offset, offset + limit);

                        if (sliced.includes(undefined)) {return;} //Some of our data is null

                        return sliced;
                    }
                }
            }
        }
    }
});
