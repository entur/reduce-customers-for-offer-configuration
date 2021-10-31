import {
  extractIdsOfEntitlementProductsRequiredToPurchaseOffer,
  removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers
} from '../source';
import offerForFlexibleTicketWhichRequiresEntitlements from './data/offerForFlexibleTicketWhichRequiresEntitlements.json';
import offerForFlexibleTicketWhichRequiresNoEntitlements from './data/offerForFlexibleTicketWhichRequiresNoEntitlements.json';
import offerForSeatReservationSeasonTicket from './data/offerForSeatReservationSeasonTicket.json';

describe('extractIdsOfEntitlementProductsRequiredToPurchaseOffer', () => {
  test('Returns no IDs when no entitlements are required', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        // @ts-expect-error
        offerForFlexibleTicketWhichRequiresNoEntitlements,
        []
      )
    ).toEqual(new Set());
  });

  test('Returns the IDs required by mandatory products when no selectableProductIds are supplied', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        // @ts-expect-error
        offerForFlexibleTicketWhichRequiresEntitlements,
        []
      )
    ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
  });

  test('Returns the IDs required by mandatory products and selectable products when selectableProductIds for products that require entitlements are supplied', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        // @ts-expect-error
        offerForSeatReservationSeasonTicket,
        ['94dPB3']
      )
    ).toEqual(new Set(['ENT:EntitlementProduct:levelA3']));
  });

  test('Returns only the IDs required by mandatory products when only selectableProductIds for products that do not require entitlements are supplied', () => {
    expect(
      extractIdsOfEntitlementProductsRequiredToPurchaseOffer(
        // @ts-expect-error
        offerForFlexibleTicketWhichRequiresEntitlements,
        ['IZnkFy']
      )
    ).toEqual(new Set(['ENT:EntitlementProduct:levelA2']));
  });
});

describe('removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers', () => {
  describe('Cases where input should equal output', () => {
    test('No customers', () => {
      expect(
        removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers([])
      ).toEqual([]);
    });

    test('One customer, one entitlement', () => {
      expect(
        removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers([
          {
            customerId: '3569901',
            entitlements: [
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-1'
                }
              }
            ]
          }
        ])
      ).toEqual([
        {
          customerId: '3569901',
          entitlements: [
            {
              contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelA1',
                version: 'ENT:Version:EP-levelA1-1'
              }
            }
          ]
        }
      ]);
    });

    test('One customer, two entitlements', () => {
      expect(
        removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers([
          {
            customerId: '3569901',
            entitlements: [
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-1'
                }
              },
              {
                contractId: 'c02f34e7-bb0c-4346-94db-4112c587a67b',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelB1',
                  version: 'ENT:Version:EP-levelB1-1'
                }
              }
            ]
          }
        ])
      ).toEqual([
        {
          customerId: '3569901',
          entitlements: [
            {
              contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelA1',
                version: 'ENT:Version:EP-levelA1-1'
              }
            },
            {
              contractId: 'c02f34e7-bb0c-4346-94db-4112c587a67b',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelB1',
                version: 'ENT:Version:EP-levelB1-1'
              }
            }
          ]
        }
      ]);
    });
  });

  describe('Removes subsequent occurrences of entitlements with identical Entitlement.entitlementProductRef.id', () => {
    test('Removes subsequent occurrences from within the same customer', () => {
      expect(
        removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers([
          {
            customerId: '3569901',
            entitlements: [
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-1'
                }
              },
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-1'
                }
              }
            ]
          }
        ])
      ).toEqual([
        {
          customerId: '3569901',
          entitlements: [
            {
              contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelA1',
                version: 'ENT:Version:EP-levelA1-1'
              }
            }
          ]
        }
      ]);
    });

    test('Removes subsequent occurrences from subsequent customers', () => {
      expect(
        removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers([
          {
            customerId: '3569901',
            entitlements: [
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-1'
                }
              }
            ]
          },
          {
            customerId: '9000',
            entitlements: [
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-1'
                }
              }
            ]
          }
        ])
      ).toEqual([
        {
          customerId: '3569901',
          entitlements: [
            {
              contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelA1',
                version: 'ENT:Version:EP-levelA1-1'
              }
            }
          ]
        },
        {
          customerId: '9000',
          entitlements: []
        }
      ]);
    });

    test('Removes subsequent occurrences even if Entitlement.entitlementProductRef.version is different', () => {
      expect(
        removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers([
          {
            customerId: '3569901',
            entitlements: [
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-1'
                }
              }
            ]
          },
          {
            customerId: '9000',
            entitlements: [
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-2'
                }
              }
            ]
          }
        ])
      ).toEqual([
        {
          customerId: '3569901',
          entitlements: [
            {
              contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelA1',
                version: 'ENT:Version:EP-levelA1-1'
              }
            }
          ]
        },
        {
          customerId: '9000',
          entitlements: []
        }
      ]);
    });

    test('Removes subsequent occurrences even if Entitlement.contractId is different', () => {
      expect(
        removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers([
          {
            customerId: '3569901',
            entitlements: [
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-1'
                }
              }
            ]
          },
          {
            customerId: '9000',
            entitlements: [
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-1'
                }
              }
            ]
          }
        ])
      ).toEqual([
        {
          customerId: '3569901',
          entitlements: [
            {
              contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelA1',
                version: 'ENT:Version:EP-levelA1-1'
              }
            }
          ]
        },
        {
          customerId: '9000',
          entitlements: []
        }
      ]);
    });
  });

  describe('Leaves first cases of new entitlements (unseen Entitlement.entitlementProductRef.id) alone', () => {
    test('Leaves first occurrences within the same customer', () => {
      expect(
        removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers([
          {
            customerId: '3538975',
            entitlements: [
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-1'
                }
              },
              {
                contractId: 'c02f34e7-bb0c-4346-94db-4112c587a67b',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelB1',
                  version: 'ENT:Version:EP-levelB1-1'
                }
              },
              {
                contractId: 'c02f34e7-bb0c-4346-94db-98739874897',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelC1',
                  version: 'ENT:Version:EP-levelC1-1'
                }
              }
            ]
          }
        ])
      ).toEqual([
        {
          customerId: '3538975',
          entitlements: [
            {
              contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelA1',
                version: 'ENT:Version:EP-levelA1-1'
              }
            },
            {
              contractId: 'c02f34e7-bb0c-4346-94db-4112c587a67b',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelB1',
                version: 'ENT:Version:EP-levelB1-1'
              }
            },
            {
              contractId: 'c02f34e7-bb0c-4346-94db-98739874897',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelC1',
                version: 'ENT:Version:EP-levelC1-1'
              }
            }
          ]
        }
      ]);
    });

    test('Removes subsequent occurrences from subsequent customers', () => {
      expect(
        removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers([
          {
            customerId: '3538975',
            entitlements: [
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-1'
                }
              }
            ]
          },
          {
            customerId: '9000',
            entitlements: [
              {
                contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelA1',
                  version: 'ENT:Version:EP-levelA1-1'
                }
              },
              {
                contractId: 'c02f34e7-bb0c-4346-94db-4112c587a67b',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelB1',
                  version: 'ENT:Version:EP-levelB1-1'
                }
              }
            ]
          },
          {
            customerId: '313',
            entitlements: [
              {
                contractId: 'c02f34e7-bb0c-4346-94db-4112c587a67b',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelB1',
                  version: 'ENT:Version:EP-levelB1-1'
                }
              },
              {
                contractId: 'c02f34e7-bb0c-4346-94db-98739874897',
                entitlementProductRef: {
                  id: 'ENT:EntitlementProduct:levelC1',
                  version: 'ENT:Version:EP-levelC1-1'
                }
              }
            ]
          }
        ])
      ).toEqual([
        {
          customerId: '3538975',
          entitlements: [
            {
              contractId: '72a71456-7508-4148-a25a-b0e9bea8f595',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelA1',
                version: 'ENT:Version:EP-levelA1-1'
              }
            }
          ]
        },
        {
          customerId: '9000',
          entitlements: [
            {
              contractId: 'c02f34e7-bb0c-4346-94db-4112c587a67b',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelB1',
                version: 'ENT:Version:EP-levelB1-1'
              }
            }
          ]
        },
        {
          customerId: '313',
          entitlements: [
            {
              contractId: 'c02f34e7-bb0c-4346-94db-98739874897',
              entitlementProductRef: {
                id: 'ENT:EntitlementProduct:levelC1',
                version: 'ENT:Version:EP-levelC1-1'
              }
            }
          ]
        }
      ]);
    });
  });
});
