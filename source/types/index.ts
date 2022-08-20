import {FareProductConfiguration, Offer} from './__generated__/offers-v1.js';
import {
  OfferSummary,
  OptionalProduct,
  PreassignedProduct
} from './__generated__/offers-v2.js';

/**
 * This is a stripped down version of the Offer types,
 * containing only the root keys that we need.
 * The hope is that this will lead to fewer updates because
 * the type has changed.
 */
export type StrippedFareProductConfiguration = Pick<
  FareProductConfiguration,
  'selectableId' | 'optional' | 'discountRight'
>;

export type StrippedOffer = Pick<Offer, 'id'> & {
  salesPackageConfig: {
    fareProducts: StrippedFareProductConfiguration[];
  };
};
export type StrippedPreassignedProduct = Pick<
  PreassignedProduct,
  'discountRight'
>;
export type StrippedOptionalProduct = Pick<
  OptionalProduct,
  'selectableId' | 'discountRight'
>;

export type StrippedOfferSummary = Pick<OfferSummary, 'id'> & {
  preassignedProducts: StrippedPreassignedProduct[];
};
