# Changelog

## 3.0.0 (2023-05-15)

- BREAKING: Drop support for Offers v1.

## 2.1.2 (2023-05-11)

Changed from Offers 2.0 beta to release swagger url

## 2.1.1 (2023-05-11)

Regenerate types.

## 2.1.0 (2022-08-24)

Add full EcmaScript Module (ESM) support.

## 2.1.0 (2022-01-26)

Add CommonJS build.

## 2.0.1 (2022-01-25)

Add `"type": "module"` to `package.json`.

## 2.0.0 (2022-01-06)

### Breaking: reduceCustomersForOfferConfiguration signature changed

- Flipped the position of the parameters `offerConfiguration` and `offer`.
- Added fourth parameter `optionalProducts` to support the
  [Offers v2](https://developer.entur.org/pages-offers-docs-api-v2) offer
  structure.

Current signature:

```typescript
export function reduceCustomersForOfferConfiguration(
  customers: Customer[],
  offerConfiguration: OfferConfiguration,
  offer: StrippedOffer | StrippedOfferSummary,
  optionalProducts?: StrippedOptionalProduct[],
): Customer[];
```

Note that the types `StrippedOffer`, `StrippedOfferSummary` and
`StrippedOptionalProduct` are stripped down versions of the corresponding types
in [the Entur Offers API](https://developer.entur.org/pages-offers-docs-intro).

### Breaking: No longer exports `extractIdsOfEntitlementProductsRequiredToPurchaseOffer`

We have moved the helper function
`extractIdsOfEntitlementProductsRequiredToPurchaseOffer` to the file
`offer-utilities`. The module's main file no longer exports the function. We did
this because the main file had become uncomfortably large, and decided not to
export the function because we see no use for it outside this package.

If you need to use this function, you should still be able to import it from
`@entur/reduce-customers-for-offer-configuration/offer-utilities`. Hopefully,
both this package and its dependents will have to be updated less frequently in
the future to support type changes.

### New feature: Support Offers v2

With help from Kent Andersen, this version of the library supports the
in-progress [Offers v2](https://developer.entur.org/pages-offers-docs-api-v2)
offer structure. The package is still backward compatible with
[Offers v1](https://developer.entur.org/pages-offers-docs-api).

### Type improvements: Stripped the `offer` parameter type even further

With help from Kent Andersen, the `offer` parameter type has been stripped down
even further, and now only defines the properties that are used in the
`reduceCustomersForOfferConfiguration` function.

## 1.0.1 (2021-11-03)

- Throw error from `reduceCustomersForOfferConfiguration` if `offer.id` and
  `offerConfiguration.offerId` do not match

## 1.0.0 (2021-11-03)

- Initial version
