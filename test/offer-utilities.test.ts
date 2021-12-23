import {extractIdsOfEntitlementProductsRequiredToPurchaseOffer} from '../source/offer-utilities';
import offer2ForFlexibleTicketWhichRequiresEntitlements from './data/offer2ForFlexibleTicketWhichRequiresEntitlements.json';
import offer2ForFlexibleTicketWhichRequiresNoEntitlements from './data/offer2ForFlexibleTicketWhichRequiresNoEntitlements.json';
import offerForFlexibleTicketWhichRequiresEntitlements from './data/offerForFlexibleTicketWhichRequiresEntitlements.json';
import offerForFlexibleTicketWhichRequiresNoEntitlements from './data/offerForFlexibleTicketWhichRequiresNoEntitlements.json';
import offerForSeatReservationSeasonTicket from './data/offerForSeatReservationSeasonTicket.json';

describe('extractIdsOfEntitlementProductsRequiredToPurchaseOffer', () => {
  test('Returns no IDs when no entitlements are required', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        [],
        offerForFlexibleTicketWhichRequiresNoEntitlements
      )
    ).toEqual(new Set());
  });

  test('Offer 2.0 Returns no IDs when no entitlements are required', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        [],
        offer2ForFlexibleTicketWhichRequiresNoEntitlements
      )
    ).toEqual(new Set());
  });

  test('Returns the IDs required by mandatory products when no selectableProductIds are supplied', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        [],
        offerForFlexibleTicketWhichRequiresEntitlements
      )
    ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
  });

  test('Offer 2.0 Returns the IDs required by mandatory products when no selectableProductIds are supplied', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        [],
        offer2ForFlexibleTicketWhichRequiresEntitlements
      )
    ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
  });

  test('Returns the IDs required by mandatory products and selectable products when selectableProductIds for products that require entitlements are supplied', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        ['94dPB3'],
        offerForSeatReservationSeasonTicket
      )
    ).toEqual(new Set(['ENT:EntitlementProduct:levelA3']));
  });

  test('Returns only the IDs required by mandatory products when only selectableProductIds for products that do not require entitlements are supplied', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        ['IZnkFy'],
        offerForFlexibleTicketWhichRequiresEntitlements
      )
    ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
  });

  test('Offer 2.0 Returns only the IDs required by mandatory products when only selectableProductIds for products that do not require entitlements are supplied', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        ['6nbdNy'],
        offer2ForFlexibleTicketWhichRequiresEntitlements
      )
    ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
  });
});
