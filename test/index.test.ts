import {expect} from 'expect';

import {
  reduceCustomersForOfferConfiguration,
  removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers
} from '../source/index.js';
import offerForFlexibleTicketWhichRequiresEntitlements from './data/offerForFlexibleTicketWhichRequiresEntitlements.json' assert {type: 'json'};

describe('reduceCustomersForOfferConfiguration', () => {
  describe('Throws error if offerConfiguration.offerId is not the same as offer.id', () => {
    expect(() =>
      reduceCustomersForOfferConfiguration(
        [],
        {offerId: 'aa004b4e-c539-4fd8-bc1f'},
        offerForFlexibleTicketWhichRequiresEntitlements
      )
    ).toThrow(
      'offer.id and offerConfiguration.offerId do not match; they must be the same'
    );
  });
});

describe('removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers', () => {
  describe('Cases where input should equal output', () => {
    it('No customers', () => {
      expect(
        removeAllButTheFirstOccurrenceOfEachEntitlementFromCustomers([])
      ).toEqual([]);
    });

    it('One customer, one entitlement', () => {
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

    it('One customer, two entitlements', () => {
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
    it('Removes subsequent occurrences from within the same customer', () => {
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

    it('Removes subsequent occurrences from subsequent customers', () => {
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

    it('Removes subsequent occurrences even if Entitlement.entitlementProductRef.version is different', () => {
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

    it('Removes subsequent occurrences even if Entitlement.contractId is different', () => {
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
    it('Leaves first occurrences within the same customer', () => {
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

    it('Removes subsequent occurrences from subsequent customers', () => {
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
