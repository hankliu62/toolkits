export const categories = { Choice: '选择题', QA: '问答题' };
export const getLevelStar = (level: number) => {
  let str = '';
  const roundLevel = Math.floor(level);
  for (let i = 0; i < roundLevel; i++) {
    str += '★';
  }

  if (level - roundLevel > 0) str += '☆';
  return str;
};
