export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

export const createArrayUpdated = (array, key, value, id, entry) => {
  const currentObject = array.find((item) => item.id === id);
  let entryUpdated;
  if (!entry) {
    const map = new Map();
    map.set(key, value);
    entryUpdated = Object.fromEntries(map);
  } else {
    entryUpdated = entry;
  }
  const updatedObject = Object.assign({}, currentObject, entryUpdated);
  const newArray = updateItem(array, updatedObject);
  return newArray;
};

export const countWorkers = (companies) => {
  const workers = [];
  for (let company of companies) {
    workers.push(...company.personal);
  }
  return workers;
};

export const findId = (array) => (array.length > 0 ? array.length + 1 : 1);

export const getDifference = (array1, array2) => {
  return array1.filter((object1) => {
    return !array2.some((object2) => {
      return object1.id === object2.id;
    });
  });
};
