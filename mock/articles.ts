import { generateArticle } from "./latest-articles";

export default new Array(10000).fill(0).map((number, idx) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - 5);
  // now.setSeconds(now.getSeconds() - 40)

  const item = generateArticle(idx);

  if (number === 3) {
    item.createdAt = now;
  }

  return item;
});
