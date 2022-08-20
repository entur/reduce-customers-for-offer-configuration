import {expect} from 'expect';

import {extractIdsOfEntitlementProductsRequiredToPurchaseOffer} from '../source/offer-utilities.js';
import {StrippedOffer} from '../source/types/index.js';
import {readJSON} from './helper';

describe('extractIdsOfEntitlementProductsRequiredToPurchaseOffer', () => {
  describe('Returns no IDs when no entitlements are required', () => {
    it('Offers v1', async () => {
      const data = await readJSON<StrippedOffer>(
        './data/offerForFlexibleTicketWhichRequiresNoEntitlements.json'
      );

      expect(
        extractIdsOfEntitlementProductsRequiredToPurchaseOffer([], data)
      ).toEqual(new Set());
    });

    it('Offers v2', async () => {
      const data = await readJSON<StrippedOffer>(
        './data/offer2ForFlexibleTicketWhichRequiresNoEntitlements.json'
      );

      expect(
        extractIdsOfEntitlementProductsRequiredToPurchaseOffer([], data)
      ).toEqual(new Set());
    });
  });

  describe('Returns the IDs required by mandatory products when no selectableProductIds are supplied', () => {
    it('Offers v1', async () => {
      const data = await readJSON<StrippedOffer>(
        './data/offerForFlexibleTicketWhichRequiresEntitlements.json'
      );

      expect(
        extractIdsOfEntitlementProductsRequiredToPurchaseOffer([], data)
      ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
    });

    it('Offers v2', async () => {
      const data = await readJSON<StrippedOffer>(
        './data/offer2ForFlexibleTicketWhichRequiresEntitlements.json'
      );

      expect(
        extractIdsOfEntitlementProductsRequiredToPurchaseOffer([], data)
      ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
    });
  });

  describe('Returns the IDs required by mandatory products and selectable products when selectableProductIds for products that require entitlements are supplied', () => {
    it('Offers v1', async () => {
      const data = await readJSON<StrippedOffer>(
        './data/offerForSeatReservationSeasonTicket.json'
      );

      expect(
        extractIdsOfEntitlementProductsRequiredToPurchaseOffer(['94dPB3'], data)
      ).toEqual(new Set(['ENT:EntitlementProduct:levelA3']));
    });

    it('Offers v2', async () => {
      const data = await readJSON<StrippedOffer>(
        './data/offer2ForFlexibleTicketWhichRequiresEntitlements.json'
      );

      expect(
        extractIdsOfEntitlementProductsRequiredToPurchaseOffer(['6nbdNy'], data)
      ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
    });
  });
});
