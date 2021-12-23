import {extractIdsOfEntitlementProductsRequiredToPurchaseOffer} from './offer-utilities';
import {
  StrippedOffer,
  StrippedOfferSummary,
  StrippedOptionalProduct
} from './types';
import {
  Customer,
  OfferConfiguration
} from './types/__generated__/reserveOfferTypes';

/**
 * Returns a subset of the supplied customer array, containing only the elements
 * necessary to purchase the given offer as described by the supplied
 * offerConfiguration
 *
 * Important: Only customers whose customerId is present in
 * OfferConfiguration.selectedTravellerIds will be added. Knowing which IDs to
 * put in each offerConfiguration is often the hard part. See the links to
 * other packages below.
 *
 * How it works:
 *
 * - Keeps only the `customers` whose `customerId` matches an ID found in
 *   `offerConfiguration.selectedTravellerIds`.
 * - Keeps only the entitlements within each customer required to purchase
 *   `offer` with the supplement products specified by
 *   `offerConfiguration.selectableProductIds`
 * - Keeps only the first occurrence of any entitlement product (uniqueness is
 *   determined using a string comparison on the field
 *   `CustomerEntitlement.entitlementProductRef.id`
 *
 * If you need more control, you can use the functions that this function calls
 * individually.
 *
 * @see Recommended alternative for putting selectedTravellerIds in offerConfigurations: <a href="https://www.npmjs.com/package/@entur/create-offer-configurations-from-offer-to-buy">@entur/create-offer-configurations-from-offer-to-buy</a>
 * @see Complicated and buggy alternative for putting selectedTravellerIds in offerConfigurations: <a href="https://www.npmjs.com/package/https://www.npmjs.com/package/@entur/add-customers-to-offer-configurations">@entur/add-customers-to-offer-configurations</a>
 * @example
 * import { reduceCustomersForOfferConfiguration } from "@entur/reduce-customers-for-offer-configuration";
 * import offer from "./test/data/offerForFlexibleTicketWhichRequiresEntitlements.json";
 *
 * const threeCustomersWithLotsOfEntitlements = [
 *   {
 *     customerId: "3538975",
 *     entitlements: [
 *       {
 *         contractId: "72a71456-7508-4148-a25a-b0e9bea8f595",
 *         entitlementProductRef: {
 *           id: "ENT:EntitlementProduct:levelA2",
 *           version: "ENT:Version:EP-levelA2-1",
 *         },
 *       },
 *     ],
 *   },
 *   {
 *     customerId: "9000",
 *     entitlements: [
 *       {
 *         contractId: "72a71456-7508-4148-a25a-b0e9bea8f595",
 *         entitlementProductRef: {
 *           id: "ENT:EntitlementProduct:levelA2",
 *           version: "ENT:Version:EP-levelA2-1",
 *         },
 *       },
 *       {
 *         contractId: "c02f34e7-bb0c-4346-94db-4112c587a67b",
 *         entitlementProductRef: {
 *           id: "ENT:EntitlementProduct:levelB1",
 *           version: "ENT:Version:EP-levelB1-1",
 *         },
 *       },
 *     ],
 *   },
 *   {
 *     customerId: "313",
 *     entitlements: [
 *       {
 *         contractId: "c02f34e7-bb0c-4346-94db-4112c587a67b",
 *         entitlementProductRef: {
 *           id: "ENT:EntitlementProduct:levelB1",
 *           version: "ENT:Version:EP-levelB1-1",
 *         },
 *       },
 *       {
 *         contractId: "c02f34e7-bb0c-4346-94db-98739874897",
 *         entitlementProductRef: {
 *           id: "ENT:EntitlementProduct:levelC1",
 *           version: "ENT:Version:EP-levelC1-1",
 *         },
 *       },
 *     ],
 *   },
 * ];
 *
 * const offerConfiguration = {
 *   offerId: "aa004b4e-c539-4fd8-bc1f-82cc968f5d4d",
 *   selectedTravellerIds: ["3538975", "9000"],
 * };
 *
 * reduceCustomersForOfferConfiguration(
 *   threeCustomersWithLotsOfEntitlements,
 *   offerConfiguration
 *   offer,
 * );
 *
 * // [
 * //   {
 * //     customerId: "3538975",
 * //     entitlements: [
 * //       {
 * //         contractId: "72a71456-7508-4148-a25a-b0e9bea8f595",
 * //         entitlementProductRef: {
 * //           id: "ENT:EntitlementProduct:levelA2",
 * //           version: "ENT:Version:EP-levelA2-1",
 * //         },
 * //       },
 * //     ],
 * //   },
 * //   { customerId: "9000", entitlements: [] },
 * // ]
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
