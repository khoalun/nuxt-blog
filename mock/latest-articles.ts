import { faker } from '@faker-js/faker';
import type { ArticleItem } from "~/types";

export default [1, 2, 3].map((number) => {

  const now = new Date()
  now.setMinutes(now.getMinutes() - 5)
//   now.setSeconds(now.getSeconds() - 40)
  
  const item: ArticleItem = {
    id: faker.number.int({ min: 10000, max: 50000 }),
    title: faker.lorem.sentence(5),
    thumbnail: faker.image.url({ width: 348, height: 452 }),
    slug: faker.internet.url(), // article.slug
    author: {
      slug: faker.internet.url(), // article.author.slug
      avatar: faker.image.avatar(),
      fullName: faker.person.fullName(),
    },
    createdAt:
      number === 3 ? now : faker.date.past({ years: Math.random() }),
  };

  return item;
});
