const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};

const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const validTypes = ['personal', 'work', 'family'];
  if (validTypes.includes(type)) return type;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
