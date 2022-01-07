import {
  StrippedFareProductConfiguration,
  StrippedOffer,
  StrippedOfferSummary,
  StrippedOptionalProduct,
  StrippedPreassignedProduct
} from './types';

export function extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
  selectableProductIds: string[],
  offer: StrippedOffer | StrippedOfferSummary,
  optionalProducts: StrippedOptionalProduct[] = []
): Set<string> {
  const selectedProducts = isOfferSummary(offer)
    ? extractSelectedProductsFromOfferSummary(
        selectableProductIds,
        offer,
        optionalProducts
      )
    : extractSelectedProductsFromOffer(selectableProductIds, offer);

  return new Set(
    compact(
      selectedProducts.map((product) =>
        extractOriginatingFromProductId(product)
      )
    )
  );
}

function isOfferSummary(
  offer: StrippedOffer | StrippedOfferSummary
): offer is StrippedOfferSummary {
  return !('salesPackageConfig' in offer);
}

function extractSelectedProductsFromOfferSummary(
  selectableProductIds: string[],
  offer: StrippedOfferSummary,
  optionalProducts: StrippedOptionalProduct[]
): StrippedOptionalProduct[] | StrippedPreassignedProduct[] {
  const selectableProductIdsAsSet = new Set(selectableProductIds);
  return [
    ...offer.preassignedProducts,
    ...optionalProducts.filter((product) =>
      isOptionalProductToBePurchased(selectableProductIdsAsSet, product)
    )
  ];
}

function extractSelectedProductsFromOffer(
  selectableProductIds: string[],
  offer: StrippedOffer
): StrippedFareProductConfiguration[] {
  const selectableProductIdsAsSet = new Set(selectableProductIds);
  return offer.salesPackageConfig.fareProducts.filter((fareProduct) =>
    isFareProductToBePurchased(selectableProductIdsAsSet, fareProduct)
  );
}

function isFareProductToBePurchased(
  selectableProductIds: Set<string>,
  fareProduct: StrippedFareProductConfiguration
): boolean {
  const buyingThisProductIsMandatory = !fareProduct.optional;
  return (
    buyingThisProductIsMandatory ||
    selectableProductIds.has(fareProduct.selectableId)
  );
}

function isOptionalProductToBePurchased(
  selectableProductIds: Set<string>,
  product: StrippedOptionalProduct
): boolean {
  return selectableProductIds.has(product.selectableId);
}

/**
 * Extracts the ID of the entitlement product which is required to purchase a given product
 */
function extractOriginatingFromProductId(
  product:
    | StrippedPreassignedProduct
    | StrippedOptionalProduct
    | StrippedFareProductConfiguration
) {
  return product.discountRight?.originatingFromProductId;
}

function compact<T>(array?: Array<T | false | 0 | null | undefined>): T[] {
  if (!array) return [];
  return array.filter((item): item is T => Boolean(item));
}
