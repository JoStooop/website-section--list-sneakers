export const getElementIdInArray = ((state, item) => state.find((el) => Number(el.id) === Number(item.id)));

export const getItemsCatalog = ((state) => state.catalog.data);

export const getItemsBasket = ((state) => state.basket.data);
export const getTotalPriceBasket = ((state) => state.basket.data.reduce((sum, obj) => obj.price + sum, 0));

export const getItemsFavorites = ((state) => state.favorites.data);
export const getLengthOfArrayElements = ((state) => state.favorites.data.length);
