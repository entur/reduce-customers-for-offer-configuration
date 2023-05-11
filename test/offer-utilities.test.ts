import {describe, expect, it} from 'vitest';

import {extractIdsOfEntitlementProductsRequiredToPurchaseOffer} from '../source/offer-utilities.js';
import offerForFlexibleTicketWhichRequiresEntitlements from './data/offerForFlexibleTicketWhichRequiresEntitlements.json' assert {type: 'json'};
import offerForFlexibleTicketWhichRequiresNoEntitlements from './data/offerForFlexibleTicketWhichRequiresNoEntitlements.json' assert {type: 'json'};

describe('extractIdsOfEntitlementProductsRequiredToPurchaseOffer', () => {
  it('Returns no IDs when no entitlements are required', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        [],
        offerForFlexibleTicketWhichRequiresNoEntitlements
      )
    ).toEqual(new Set());
  });

  it('Returns the IDs required by mandatory products when no selectableProductIds are supplied', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        [],
        offerForFlexibleTicketWhichRequiresEntitlements
      )
    ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
  });

  it('Returns the IDs required by mandatory products and selectable products when selectableProductIds for products that require entitlements are supplied', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        ['6nbdNy'],
        offerForFlexibleTicketWhichRequiresEntitlements
      )
    ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
  });
});
