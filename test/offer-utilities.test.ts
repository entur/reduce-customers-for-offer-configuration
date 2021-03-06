import {extractIdsOfEntitlementProductsRequiredToPurchaseOffer} from '../source/offer-utilities';
import offer2ForFlexibleTicketWhichRequiresEntitlements from './data/offer2ForFlexibleTicketWhichRequiresEntitlements.json';
import offer2ForFlexibleTicketWhichRequiresNoEntitlements from './data/offer2ForFlexibleTicketWhichRequiresNoEntitlements.json';
import offerForFlexibleTicketWhichRequiresEntitlements from './data/offerForFlexibleTicketWhichRequiresEntitlements.json';
import offerForFlexibleTicketWhichRequiresNoEntitlements from './data/offerForFlexibleTicketWhichRequiresNoEntitlements.json';
import offerForSeatReservationSeasonTicket from './data/offerForSeatReservationSeasonTicket.json';

describe('extractIdsOfEntitlementProductsRequiredToPurchaseOffer', () => {
  describe('Returns no IDs when no entitlements are required', () => {
    test('Offers v1', () => {
      expect(
        extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
          [],
          offerForFlexibleTicketWhichRequiresNoEntitlements
        )
      ).toEqual(new Set());
    });

    test('Offers v2', () => {
      expect(
        extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
          [],
          offer2ForFlexibleTicketWhichRequiresNoEntitlements
        )
      ).toEqual(new Set());
    });
  });

  describe('Returns the IDs required by mandatory products when no selectableProductIds are supplied', () => {
    test('Offers v1', () => {
      expect(
        extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
          [],
          offerForFlexibleTicketWhichRequiresEntitlements
        )
      ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
    });

    test('Offers v2', () => {
      expect(
        extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
          [],
          offer2ForFlexibleTicketWhichRequiresEntitlements
        )
      ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
    });
  });

  describe('Returns the IDs required by mandatory products and selectable products when selectableProductIds for products that require entitlements are supplied', () => {
    test('Offers v1', () => {
      expect(
        extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
          ['94dPB3'],
          offerForSeatReservationSeasonTicket
        )
      ).toEqual(new Set(['ENT:EntitlementProduct:levelA3']));
    });

    test('Offers v2', () => {
      expect(
        extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
          ['6nbdNy'],
          offer2ForFlexibleTicketWhichRequiresEntitlements
        )
      ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
    });
  });
});
