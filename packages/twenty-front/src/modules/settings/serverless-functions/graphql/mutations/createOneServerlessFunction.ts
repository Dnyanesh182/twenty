import { gql } from '@apollo/client';
import { SERVERLESS_FUNCTION_FRAGMENT } from '@/settings/developers/serverless-functions/graphql/fragments/serverlessFunctionFragment';

export const CREATE_ONE_SERVERLESS_FUNCTION = gql`
  ${SERVERLESS_FUNCTION_FRAGMENT}
  mutation CreateOneServerlessFunctionItem(
    $input: CreateServerlessFunctionInput!
  ) {
    createOneServerlessFunction(input: $input) {
      ...ServerlessFunctionFields
    }
  }
`;
