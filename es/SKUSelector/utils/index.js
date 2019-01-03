import { clone } from 'ramda';

/**
 * Return the maximum sku price
 * @param {array of sku's} items
 */
export var getMaxSkuPrice = function getMaxSkuPrice(items) {
  if (!items) return 0;

  return items.reduce(function (max, sku) {
    var _sku$sellers = sku.sellers,
        Price = _sku$sellers[0].commertialOffer.Price;


    return Math.max(max, Price);
  });
};

/**
 * Remove the 'https' from the given url
 * @param {string} url
 */
export var stripUrl = function stripUrl(url) {
  return url.replace(/^https?:/, '');
};

/**
 * Parse the variations field in the sku object
 * @param {sku} sku
 */
export var parseSku = function parseSku(sku) {
  var result = clone(sku);

  var variations = sku.variations.map(function (variation) {
    result[variation.name] = variation.values[0];
    return variation.name;
  });

  result.variations = variations;

  return result;
};

/**
 * Retrieves a list of unique options of a given variation
 * @param {string} variation
 * @param {skus} skus
 */
export var getVariationOptions = function getVariationOptions(variation, skus) {
  var hTable = {};

  skus.map(function (sku) {
    var value = sku[variation];
    hTable[value] = sku;
  });

  return Object.values(hTable).sort(function (a, b) {
    if (a[variation] < b[variation]) return -1;
    if (a[variation] > b[variation]) return 1;
    return 0;
  });
};

/**
 * Verifies if the variation is color
 * @param {string} variation
 */
export var isColor = function isColor(variation) {
  if (!variation) return false;

  return variation.toLowerCase() === 'cor' || variation.toLowerCase() === 'color';
};

/**
 * Choose wich variation will be the main one.
 * @param {Array[string]} variations
 */
export var getMainVariationName = function getMainVariationName(variations) {
  for (var i = 0; i < variations.length; i++) {
    if (isColor(variations[i])) return variations[i];
  }

  return variations[0];
};