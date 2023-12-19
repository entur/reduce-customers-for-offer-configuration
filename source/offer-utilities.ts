import {
  type StrippedFareProductConfiguration,
  type StrippedOffer,
  type StrippedOfferSummary,
  type StrippedOptionalProduct,
  type StrippedPreassignedProduct,
} from './types/index.js';

export function extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
  selectableProductIds: string[],
  offer: StrippedOffer | StrippedOfferSummary,
  optionalProducts: StrippedOptionalProduct[] = [],
): Set<string> {
  const selectedProducts = isOfferSummary(offer)
    ? extractSelectedProductsFromOfferSummary(
        selectableProductIds,
        offer,
        optionalProducts,
      )
    : extractSelectedProductsFromOffer(selectableProductIds, offer);

  return new Set(
    compact(
      selectedProducts.map(
        (product) => product.discountRight?.originatingFromProductId,
      ),
    ),
  );
}

function isOfferSummary(
  offer: StrippedOffer | StrippedOfferSummary,
): offer is StrippedOfferSummary {
  return !('salesPackageConfig' in offer);
}

function extractSelectedProductsFromOfferSummary(
  selectableProductIds: string[],
  offer: StrippedOfferSummary,
  optionalProducts: StrippedOptionalProduct[],
): Array<StrippedOptionalProduct | StrippedPreassignedProduct> {
  const selectableProductIdsAsSet = new Set(selectableProductIds);
  return [
    ...offer.preassignedProducts,
    ...optionalProducts.filter((product) =>
      isOptionalProductToBePurchased(selectableProductIdsAsSet, product),
    ),
  ];
}

function extractSelectedProductsFromOffer(
  selectableProductIds: string[],
  offer: StrippedOffer,
): StrippedFareProductConfiguration[] {
  const selectableProductIdsAsSet = new Set(selectableProductIds);
  return offer.salesPackageConfig.fareProducts.filter((fareProduct) =>
    isFareProductToBePurchased(selectableProductIdsAsSet, fareProduct),
  );
}

function isFareProductToBePurchased(
  selectableProductIds: Set<string>,
  fareProduct: StrippedFareProductConfiguration,
): boolean {
  const buyingThisProductIsMandatory = !fareProduct.optional;
  return (
    buyingThisProductIsMandatory ||
    selectableProductIds.has(fareProduct.selectableId)
  );
}

function isOptionalProductToBePurchased(
  selectableProductIds: Set<string>,
  product: StrippedOptionalProduct,
): boolean {
  return selectableProductIds.has(product.selectableId);
}

function compact<T>(array?: Array<T | false | 0 | undefined>): T[] {
  if (!array) {
    return [];
  }

  // eslint-disable-next-line unicorn/no-array-callback-reference -- Typescript needs us to pass this callback directly to have type safety
  return array.filter(isNotNil);
}

function isNotNil<T>(s: T | 0 | false | undefined): s is T {
  if (s === 0) {
    return false;
  }

  if (s === false) {
    return false;
  }

  return Boolean(s);
}
