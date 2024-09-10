import { INestApplication } from '@nestjs/common';

import request from 'supertest';

import setup from './utils/global-setup';

describe('peopleResolver (e2e)', () => {
  let app: INestApplication;
  let accessToken: string | undefined;

  beforeAll(async () => {
    const setupData = await setup();

    app = setupData.app;
    accessToken = setupData.accessToken;
  });

  it('should find many people', () => {
    const queryData = {
      query: `
        query people {
          people {
            edges {
              node {
                email
                jobTitle
                phone
                city
                avatarUrl
                position
                id
                createdAt
                updatedAt
                deletedAt
                companyId
                intro
                whatsapp
                workPrefereance
                performanceRating
              }
            }
          }
        }
      `,
    };

    return request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(queryData)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBeDefined();
        expect(res.body.errors).toBeUndefined();
      })
      .expect((res) => {
        const data = res.body.data.people;

        expect(data).toBeDefined();
        expect(Array.isArray(data.edges)).toBe(true);

        const edges = data.edges;

        expect(edges.length).toBeGreaterThan(0);

        const people = edges[0].node;

        expect(people).toHaveProperty('email');
        expect(people).toHaveProperty('jobTitle');
        expect(people).toHaveProperty('phone');
        expect(people).toHaveProperty('city');
        expect(people).toHaveProperty('avatarUrl');
        expect(people).toHaveProperty('position');
        expect(people).toHaveProperty('id');
        expect(people).toHaveProperty('createdAt');
        expect(people).toHaveProperty('updatedAt');
        expect(people).toHaveProperty('deletedAt');
        expect(people).toHaveProperty('companyId');
        expect(people).toHaveProperty('intro');
        expect(people).toHaveProperty('whatsapp');
        expect(people).toHaveProperty('workPrefereance');
        expect(people).toHaveProperty('performanceRating');
      });
  });
});