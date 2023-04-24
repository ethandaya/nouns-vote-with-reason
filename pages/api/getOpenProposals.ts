import { NextApiRequest, NextApiResponse } from 'next';
import { gql } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const endBlock = (req.query.endBlock as string) || '0';
  const { data } = await apolloClient.query({
    query: gql`
      query GetOpenProposals($endBlock: String!) {
        openProposals: proposals(
          where: { status: "ACTIVE", endBlock_gt: $endBlock }
          orderBy: endBlock
          orderDirection: desc
        ) {
          id
          title
          forVotes
          againstVotes
          endBlock
        }
      }
    `,
    variables: { endBlock },
  });

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(data.openProposals);
}