import { gql } from '@apollo/client';
import { SERVERLESS_FUNCTION_FRAGMENT } from '@/settings/developers/serverless-functions/graphql/fragments/serverlessFunctionFragment';

export const FIND_MANY_SERVERLESS_FUNCTIONS = gql`
  ${SERVERLESS_FUNCTION_FRAGMENT}
  query GetManyServerlessFunctions {
    serverlessFunctions(paging: { first: 100 }) {
      edges {
        node {
          ...ServerlessFunctionFields
        }
      }
    }
  }
`;
