import {extractIdsOfEntitlementProductsRequiredToPurchaseOffer} from './offer-utilities.js';
import {
  Customer,
  OfferConfiguration
} from './types/__generated__/reserve-offer.js';
import {
  StrippedOffer,
  StrippedOfferSummary,
  StrippedOptionalProduct
} from './types/index.js';

/**
 * Returns a subset of the supplied customer array containing only the customers
 * and entitlements necessary to purchase the offer and selectable products
 * specified in the offer configuration.
 *
 * <h2>
 *   The supplied offer/offer summary determines which entitlements are required
 * </h2>
 * The function uses the offer or offer summary as well as the specified optional
 * products (if supplied) to determine which entitlements are required by the
 * offer.
 *
 * <h2>
 *   Keeps only the customers present in offerConfiguration.selectedTravellerIds
 * </h2>
 * A customer is only kept if a matching customer ID is found in the offer
 * configuration's selectedTravellerIds.
 *
 * <h2>Removes all but the first occurrence of an entitlement</h2>
 * Keeps only the first occurrence of any entitlement product (uniqueness is
 * determined using a string comparison on the field
 * `CustomerEntitlement.entitlementProductRef.id`)
 *
 * <h2>Packages that can help with creating the offer configurations</h2>
 * This package does not help with assigning the correct travellers to an
 * offerConfiguration, which is often the hard part of preparing an offer for
 * reservation. The following packages can help with this.
 *
 * <ul>
 *   <li>
 *     Recommended alternative for putting selectedTravellerIds in
 *     offerConfigurations:
 *     <a
 *       href="https://www.npmjs.com/package/@entur/create-offer-configurations-from-offer-to-buy"
 *       >@entur/create-offer-configurations-from-offer-to-buy</a
 *     >
 *   </li>
 *   <li>
 *     Complicated and buggy alternative for putting selectedTravellerIds in
 *     offerConfigurations:
 *     <a
 *       href="https://www.npmjs.com/package/https://www.npmjs.com/package/@entur/add-customers-to-offer-configurations"
 *       >@entur/add-customers-to-offer-configurations</a
 *     >
 *   </li>
 * </ul>
 */
export function reduceCustomersForOfferConfiguration(
  customers: Customer[],
  offerConfiguration: OfferConfiguration,
  offer: StrippedOffer | StrippedOfferSummary,
  optionalProducts?: StrippedOptionalProduct[]
): Customer[] {
  if (offer.id !== offerConfiguration.offerId) {
    throw new Error(
      'offer.id and offerConfiguration.offerId do not match; they must be the same'
    );
  }

  const selectedCustomers = getCustomersThatMatchSelectedTravellerIds(
    customers,
    offerConfiguration.selectedTravellerIds ?? []
  );

  const idsOfEntitlementProductsRequiredForPurchase =
    extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
      offerConfiguration.selectableProductIds ?? [],
      offer,
      optionalProducts
    );

  const customersWithOnlyNecessaryEntitlements = selectedCustomers.map(
    (customer) => {
      const necessaryEntitlements = customer.entitlements?.filter(
        ({entitlementProductRef: {id}}) =>
          idsOfEntitlementProductsRequiredForPurchase.has(id)
      );
      return {...customer, entitlements: necessaryEntitlements};
    }
  );

  return removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers(
    customersWithOnlyNecessaryEntitlements
  );
}

export function getCustomersThatMatchSelectedTravellerIds(
  customers: Customer[],
  selectedTravellerIds: string[]
) {
  return customers.filter(({customerId}) =>
    selectedTravellerIds.includes(customerId)
  );
}

/**
 * Makes a copy of `customers` in which no two customers have an entitlement
 * with the same ID. Only the first occurrence of any entitlement is kept.
 *
 * <h2>Background</h2>
 * If two customers have supply same entitlement, they will <em>both</em> be
 * taxed the same amount as if only one of them had supplied the entitlement.
 * In effect, they will be doubly taxed.
 *
 * There is some hope that the benefits service may, at some point in the
 * future, share the burden between the travellers.
 *
 * @see <a href="https://entur.slack.com/archives/C01BNGQ8LM6/p1632298229281100?thread_ts=1632293883.270800&cid=C01BNGQ8LM6">
 *  The Slack message in which we were told that customers would be taxed doubly
 * </a>
 * @param customers The customers
 * @returns customers A copy of `customers` in which no two customers have an entitlement with the same ID
 */
export function removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers(
  customers: Customer[]
): Customer[] {
  const updatedCustomers: Customer[] = [];
  const alreadyUsedEntitlementIds: Set<string> = new Set();

  for (const customer of customers) {
    const newEntitlements = [];

    for (const entitlement of customer.entitlements ?? []) {
      const seenBefore = alreadyUsedEntitlementIds.has(
        entitlement.entitlementProductRef.id
      );
      if (!seenBefore) {
        newEntitlements.push(entitlement);
        alreadyUsedEntitlementIds.add(entitlement.entitlementProductRef.id);
      }
    }

    updatedCustomers.push({...customer, entitlements: newEntitlements});
  }

  return updatedCustomers;
}
