/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TariffZone {
  /** @example Ruter sone 1 */
  name?: string;

  /** @example RUT:TariffZone:1 */
  id: string;
}

/**
 * Reference to a group
 */
export interface UserProfileInGroupSummary {
  id: string;
  version?: string;
  numberOfPeople: number;
}

/**
 * A request used to search for fare products for a specified trip.
 */
export interface SearchTripPatternRequest {
  recommendationConfig?: RecommendationConfig;

  /** The travellers for the set trip */
  travellers: Traveller[];

  /** List of legs constituting a suggested sequence of rides and links for a specific trip. */
  tripPattern: TripPatternRequest;

  /** A configuration of how to group travellers in offers. */
  groupConfig?: GroupConfig;
}

/**
 * Representation of a repeatable ticket, with an optional duration for each instance and an amount of times the ticket can be used
 */
export interface Carnet {
  /**
   * @format duration
   * @example PT1H30M
   */
  duration?: string;

  /** @example 10 */
  amount: number;
}

/**
 * There are two supported algorithms for comparing offers; TOTAL_PRICE and BEFORE_SDR. TOTAL_PRICE: This is the default algorithm used if not specified, this only looks at the total price of the offers and finds the cheapest, if two offers have the same price, the one with the least amount of offers in the combination is chosen. BEFORE_SDR: This algorithm unapplies all sales discount rights in the offers before comparing prices, when the price of two combinations is the same, the combination containing the most amount of SDRs is chosen, thereafter if the amount is the same the combination with the least amount of offers in the combination is chosen.
 * @example TOTAL_PRICE
 */
export enum PriceComparisonAlgorithm {
  TOTAL_PRICE = "TOTAL_PRICE",
  BEFORE_SDR = "BEFORE_SDR",
}

/**
 * A discount might be given based on previous transactions if CappedDiscountRequest was specified.
 */
export interface CappedDiscountOption {
  cappedDiscountRightRef: RefType;
  alternatives?: CappingAlternative[];
  cappedDiscountRuleRef: RefType;
}

/**
 * Summary of a sale discount right that has been applied to the fare product.
 */
export interface DiscountRightSummary {
  /** @example ENT:EntitlementProduct:levelA1 */
  originatingFromProductId?: string;
  price: PriceSummary;

  /** @example Premiumrabatt */
  name: string;

  /** @example Premiumrabatt */
  description: string;

  /** @example SJN:SaleDiscountRight:Premium */
  id: string;

  /** @example SJN:Version:SDR-Premium-1 */
  version: string;
}

/**
 * A specification of a traveller.
 */
export interface Traveller {
  /** A filter for what kind of luggage the traveller wants offers for. The type is enum as string with the following possible values: HANDBAG, HAND_LUGGAGE, SMALL_SUITCASE, SUITCASE, TRUNK, OVERSIZE_ITEM, BICYCLE, SPORTING_EQUIPMENT, SKIS, MUSICAL_INSTRUMENT, PUSH_CHAIR, MOTORIZED_WHEELCHAIR,LARGE_MOTORIZED_WHEELCHAIR, WHEELCHAIR, SMALL_ANIMAL, ANIMAL, GAME, MOTORCYCLE, OTHER */
  luggageTypes?: LuggageAllowance[];

  /** A list of references to products that the traveller already owns */
  productIds?: string[];

  /** Contains information to look up transaction history for a traveller and what CappedDiscountRight-program he or she is a part of. */
  cappingSpecification?: CappingSpecification;

  /**
   * Identifier of the traveller. Only unique within an http-transaction with Products.
   * @example ID_A
   */
  id?: string;

  /** A user type */
  userType?: UserTypeEnum;
  age?: number;
}

/**
 * A request used to search for extension products valid between zones.
 */
export interface SearchExtensionZonesRequest {
  recommendationConfig?: RecommendationConfig;

  /**
   * The expected start time of travel.
   * @format date-time
   */
  travelDate: string;

  /**
   * The id of the origin zone.
   * @example RUT:TariffZone:1
   */
  from: string;

  /** A specification of an existing ticket. */
  existingTicket: ExistingTicket;

  /**
   * The id of the destination zone.
   * @example ENT:TariffZone:3N
   */
  to: string;

  /** A specification of a traveller. */
  traveller: Traveller;

  /** Optional sequence of via zones. */
  via?: string[];
}

/**
 * id and and name of an organisation
 */
export interface OrganisationSummary {
  /**
   * the name of the organisation
   * @example Go-Ahead Nordic
   */
  name: string;

  /**
   * the netex-id of organisation
   * @example GOA:Authority:GOA
   */
  id: string;
}

/**
 * A request used to search for extension products for a specified trip.
 */
export interface SearchExtensionTripRequest {
  /** List of legs constituting a suggested sequence of rides and links for a specific trip. */
  tripPattern: TripPatternRequest;

  /** A specification of an existing ticket. */
  existingTicket: ExistingTicket;

  /** A specification of a traveller. */
  traveller: Traveller;
}

/**
 * A reference to a group with price data.
 */
export interface PricedGroup {
  /** Reference to a group */
  userProfiles: UserProfileInGroup[];

  /** The description of the object. */
  description: TextInLanguage[];

  /** True if this configuration is optional to buy, false if it's required. */
  optional: boolean;

  /** Minimum number of persons in the group */
  minNumberOfPersons?: number;

  /** The price contribution shows how much this node contributes on the total price. */
  priceContributions: Price[];

  /**
   * The version of the object
   * @example NSB:Version:V1
   */
  version: string;

  /** Maximum number of persons in the group */
  maxNumberOfPersons?: number;

  /** The name of the object. */
  name: TextInLanguage[];

  /** Used for selecting a unique element in the configurations */
  selectableId: string;

  /**
   * Basis on which pricing is done - per whole group
   * or per member.
   */
  pricingBasis?: PricingBasis;

  /** The ID of the object on the format < context : type : instance name > */
  id: string;

  /** The type of this usage parameter. */
  typeOfUsageParameter?: string;

  /** The price(s) of the sub configurations below this node. Multiple prices is supported in case of prices in multiple currencies. */
  prices: Price[];
}

export interface RefType {
  id: string;
  version: string;
}

/**
 * The mode of transport or access (e.g., foot) used when traversing this leg.
 * @example rail
 */
export enum TransportModeEnum {
  Air = "air",
  Bicycle = "bicycle",
  Bus = "bus",
  Cableway = "cableway",
  Car = "car",
  Water = "water",
  Funicular = "funicular",
  Lift = "lift",
  Rail = "rail",
  Metro = "metro",
  Tram = "tram",
  Coach = "coach",
  Transit = "transit",
  Foot = "foot",
  CarPark = "car_park",
  CarPickup = "car_pickup",
  CarDropoff = "car_dropoff",
}

/**
 * A configuration of how to group travellers in offers.
 */
export interface GroupConfig {
  /** Number of compartments to group travellers in. */
  numberOfCompartments: number;
}

export enum UnavailableEnum {
  SOLD_OUT = "SOLD_OUT",
  CLOSED = "CLOSED",
  UNKNOWN = "UNKNOWN",
}

/**
 * A request used to search for fare products valid between zones.
 */
export interface SearchZonesRequest {
  recommendationConfig?: RecommendationConfig;

  /** The travellers. */
  travellers: Traveller[];

  /**
   * The expected start time of travel.
   * @format date-time
   */
  travelDate: string;

  /**
   * The id of the origin zone.
   * @example RUT:TariffZone:1
   */
  from: string;

  /**
   * The id of the destination zone.
   * @example RUT:TariffZone:3N
   */
  to: string;

  /** Optional sequence of via zones. */
  via?: string[];
}

/**
 * Start and stop places where the product is valid
 */
export interface PointToPointValidity {
  /**
   * Valid from place
   * @example NSR:StopPlace:398
   */
  fromPlace: string;

  /**
   * Valid to place
   * @example NSR:StopPlace:440
   */
  toPlace: string;
}

/**
 * @example SLEEPER
 */
export enum AccommodationFacilityForRecommendationsEnum {
  SLEEPER = "SLEEPER",
  SEATING = "SEATING",
  COUCHETTE = "COUCHETTE",
  ANY_FACILITY_SET = "ANY_FACILITY_SET",
}

export interface ServiceJourneySummary {
  /** @example NSB:ServiceJourney:56789 */
  serviceJourneyId: string;

  /** @example ENT:DatedServiceJourney:12345 */
  datedServiceJourneyId: string;
}

/**
 * List of legs constituting a suggested sequence of rides and links for a specific trip.
 */
export interface TripPatternRequest {
  /** Legs constituting a suggested sequence of rides and links for this trip */
  legs: LegRequest[];
}

/**
 * Used to specify that the vehicle used on this leg is the same that will be used on the next leg
 */
export interface InterchangeTo {
  toServiceJourney?: ServiceJourney;
  staySeated?: boolean;
  fromServiceJourney?: ServiceJourney;
}

/**
 * Reference to a group
 */
export interface UserProfileInGroup {
  /** The name of the object. */
  name: TextInLanguage[];

  /** The description of the object. */
  description: TextInLanguage[];

  /** The ID of the object on the format < context : type : instance name > */
  id: string;

  /**
   * The version of the object
   * @example NSB:Version:V1
   */
  version: string;

  /** @example NSB:TypeOfConcession:Student */
  typeOfConcession?: string;

  /**
   * The number of people in the group.
   * @format int32
   */
  numberOfPeople: number;
}

export enum AccommodationFacilityEnum {
  SLEEPER = "SLEEPER",
  SEATING = "SEATING",
  DOUBLE_SLEEPER = "DOUBLE_SLEEPER",
  SINGLE_SLEEPER = "SINGLE_SLEEPER",
  SPECIAL_SLEEPER = "SPECIAL_SLEEPER",
  COUCHETTE = "COUCHETTE",
  SINGLE_COUCHETTE = "SINGLE_COUCHETTE",
  DOUBLE_COUCHETTE = "DOUBLE_COUCHETTE",
  RECLINING_SEAT = "RECLINING_SEAT",
  BABY_COMPARTMENT = "BABY_COMPARTMENT",
  FAMILY_COMPARTMENT = "FAMILY_COMPARTMENT",
  PANORAMA_COACH = "PANORAMA_COACH",
  PULLMAN_COACH = "PULLMAN_COACH",
  STANDING = "STANDING",
}

/**
 * @example CHEAPEST
 */
export enum TypeOfRecommendationEnum {
  FLEXIBLE = "FLEXIBLE",
  SEMI_FLEXIBLE = "SEMI_FLEXIBLE",
  NON_FLEXIBLE = "NON_FLEXIBLE",
  CHEAPEST = "CHEAPEST",
  SPECIFIED_PRODUCT = "SPECIFIED_PRODUCT",
}

/**
 * A request used to search for fare products between stop places
 */
export interface SearchStopPlacesRequest {
  recommendationConfig?: RecommendationConfig;

  /** The travellers. */
  travellers: Traveller[];

  /**
   * The expected start time of travel.
   * @format date-time
   */
  travelDate: string;

  /**
   * The id of the origin stop place.
   * @example NSR:StopPlace:548
   */
  from: string;

  /**
   * The id of the destination stop place.
   * @example NSR:StopPlace:337
   */
  to: string;
  offersForWholeTripOnly?: boolean;
}

/**
 * A specification of which travellers can use an offer, along with limitations on the number of travellers that must be selected from the group for the OFFER to be valid.
 */
export interface TravellerMappingSummary {
  /**
   * The maximum number of travellers that can be selected from the group.
   * @format int32
   */
  maxNumberOfTravellers: number;

  /** The ids of the travellers. */
  travellerIds: string[];

  /**
   * The minimum number of travellers that can be selected from the group.
   * @format int32
   */
  minNumberOfTravellers: number;

  /** A user type */
  userType: UserTypeEnum;
}

/**
 * @example STANDARD_CLASS
 */
export enum FareClassEnum {
  FIRST_CLASS = "FIRST_CLASS",
  SECOND_CLASS = "SECOND_CLASS",
  THIRD_CLASS = "THIRD_CLASS",
  ECONOMY_CLASS = "ECONOMY_CLASS",
  BUSINESS_CLASS = "BUSINESS_CLASS",
  TURISTA = "TURISTA",
  PREFERENTE = "PREFERENTE",
  PREMIUM_CLASS = "PREMIUM_CLASS",
  ANY = "ANY",
  STANDARD_CLASS = "STANDARD_CLASS",
  UNKNOWN = "UNKNOWN",
}

/**
 * @example TRIP_CARNET
 */
export enum ProductType {
  TRIP_CARNET = "TRIP_CARNET",
  PASS_CARNET = "PASS_CARNET",
  UNIT_COUPONS = "UNIT_COUPONS",
  STORED_VALUE = "STORED_VALUE",
  OTHER = "OTHER",
}

/**
 * A reference to the resource that is priced in this offer, e.g. a specific 'TripPattern'.
 */
export interface PricedResourceRef {
  /** ID of the resource, e.g. an ID of a 'TripPattern'. */
  id: string;

  /** Name of the resource. */
  resourceType: string;
}

/**
 * Representation of a optional product that can be selected together with mandatory products in an offer
 */
export interface OptionalProduct {
  /** Summary of a sale discount right that has been applied to the fare product. */
  discountRight?: DiscountRightSummary;
  price: PriceSummary;

  /** @example Sykkel som bagasje */
  name: string;

  /**
   * Antallet valgfrie produkter som er tilgjengelig for å kjøpe
   * @example 4
   */
  available?: number;

  /** @example ZO9Qjn */
  selectableId: string;

  /** @example Sykkel som bagasje */
  description: string;

  /** Describes the geographical validity of a product */
  geographicalValidity: GeographicalValidity;

  /** @example NSB:SupplementProduct:BicycleReserving */
  id: string;
  supplementProductType?: SupplementProductType;

  /** @example NSB:Version:V1 */
  version: string;

  /** Summary of properties for a product */
  properties: PropertiesSummary;
}

/**
 * Reference to a Fare Structure Element and its configuration.
 */
export interface FareStructureElementConfiguration {
  /** A simple reference object containing enough information to lookup the object itself if needed. */
  qualityFactor?: DataManagedObjectData;

  /** Quotas for the configuration */
  quotas: Quota[];

  /** Reference to the legs this configuration is for. */
  serviceJourneyIds: string[];

  /** The description of the object. */
  description: TextInLanguage[];

  /** The price contribution shows how much this node contributes on the total price. */
  priceContributions: Price[];

  /**
   * The version of the object
   * @example NSB:Version:V1
   */
  version: string;

  /** Reference to the legs this configuration is for. */
  datedServiceJourneys?: DatedServiceJourney[];

  /** A simple reference object containing enough information to lookup the object itself if needed. */
  distanceMatrixElement?: DataManagedObjectData;

  /** The name of the object. */
  name: TextInLanguage[];

  /** The Geographical Interval with distance and zone data. */
  interval?: GeoIntervalData;

  /**
   * The ID of the object on the format < context : type : instance name >
   * @example NSB:FareStructureElement:TENInterval
   */
  id: string;

  /** The price(s) of the sub configurations below this node. Multiple prices is supported in case of prices in multiple currencies. */
  prices: Price[];

  /** Reference to different UsageParameters. */
  parameters?: UsageParameters;

  /** Container object for other properties. */
  properties?: Properties;
}

/**
 * Leg request describing a part of a journey
 */
export interface LegRequest {
  /**
   * Stop place id for the destination of the leg
   * @example NSR:StopPlace:640
   */
  toStopPlaceId: string;

  /**
   * The expected date and time this leg starts.
   * @format date
   * @example 2020-05-13
   */
  travelDate: string;

  /**
   * Stop place id for he origin of the leg
   * @example NSR:StopPlace:635
   */
  fromStopPlaceId: string;

  /**
   * Service journey id for the leg
   * @example NSB:ServiceJourney:1-232-1016-20201117132
   */
  serviceJourneyId: string;
}

/**
 * A planned vehicle journey with passengers.
 */
export interface DatedServiceJourney {
  /**
   * A unique departure ID.
   * @example ENT:DatedServiceJourney:151530
   */
  datedServiceJourneyId: string;

  /**
   * A reference to the original dated service journey ID.
   * @example ENT:DatedServiceJourney:151530
   */
  originalDatedServiceJourneyId: string;
}

/**
 * Determines what rules to apply when categorizing and recommending offers for travellers
 */
export interface RuleSpec {
  /**
   * There are three supported algorithms for organizing how we present each combination of journeys. Given three journeys in the trip pattern; SJ-1, SJ-2, SJ-3 the three algorithms will generate these combinations:
   * SUBSEQUENT_COMBINATIONS: (SJ-1), (SJ-2), (SJ-3), (SJ-1, SJ-2), (SJ-2, SJ-3), (SJ-1, SJ-2, SJ-3)
   * FOR_EACH_AND_GROUPED_COMBINATIONS: (SJ-1), (SJ-2), (SJ-3), (SJ-1, SJ-2, SJ-3)
   * COMBINATIONS_FROM_OFFERS: Will only organize by unique journey combinations covered by offers.
   */
  journeyOrganizeAlgorithm?: JourneyOrganizeAlgorithm;
  mixinOffersWithHigherFlexibility?: boolean;

  /** There are two supported algorithms for comparing offers; TOTAL_PRICE and BEFORE_SDR. TOTAL_PRICE: This is the default algorithm used if not specified, this only looks at the total price of the offers and finds the cheapest, if two offers have the same price, the one with the least amount of offers in the combination is chosen. BEFORE_SDR: This algorithm unapplies all sales discount rights in the offers before comparing prices, when the price of two combinations is the same, the combination containing the most amount of SDRs is chosen, thereafter if the amount is the same the combination with the least amount of offers in the combination is chosen. */
  priceComparisonAlgorithm?: PriceComparisonAlgorithm;
  onlyIncludeRecommendedOffers?: boolean;
  onlyIncludeRecommendationsWithOffersToBuy?: boolean;
}

/**
 * An alternative is based on previous transactions might have a discount at the expense of setting the start date in the past.
 */
export interface CappingAlternative {
  /**
   * The start date of this alternative.
   * @format date-time
   */
  startDateTime: string;

  /** A pseudo random string that is used to select what alternative to use when purchasing an offer. */
  selectableId: string;
  discount: PriceSummary;

  /**
   * The end date of this alternative.
   * @format date-time
   */
  endDateTime: string;
}

/**
 * @example RESERVATIONS_COMPULSORY
 */
export enum ReservingRequirement {
  RESERVATIONS_COMPULSORY = "RESERVATIONS_COMPULSORY",
  RESERVATIONS_COMPULSORY_FOR_GROUPS = "RESERVATIONS_COMPULSORY_FOR_GROUPS",
  RESERVATIONS_COMPULSORY_FOR_FIRST_CLASS = "RESERVATIONS_COMPULSORY_FOR_FIRST_CLASS",
  RESERVATIONS_COMPULSORY_FROM_ORIGIN_STATION = "RESERVATIONS_COMPULSORY_FROM_ORIGIN_STATION",
  RESERVATIONS_RECOMMENDED = "RESERVATIONS_RECOMMENDED",
  RESERVATIONS_POSSIBLE = "RESERVATIONS_POSSIBLE",
  RESERVATIONS_POSSIBLE_ONLY_IN_FIRST_CLASS = "RESERVATIONS_POSSIBLE_ONLY_IN_FIRST_CLASS",
  RESERVATIONS_POSSIBLE_ONLY_IN_SECOND_CLASS = "RESERVATIONS_POSSIBLE_ONLY_IN_SECOND_CLASS",
  RESERVATIONS_POSSIBLE_FOR_CERTAIN_CLASSES = "RESERVATIONS_POSSIBLE_FOR_CERTAIN_CLASSES",
  GROUP_BOOKING_RESTRICTED = "GROUP_BOOKING_RESTRICTED",
  NO_GROUPS_ALLOWED = "NO_GROUPS_ALLOWED",
  NO_RESERVATIONS_POSSIBLE = "NO_RESERVATIONS_POSSIBLE",
  WHEELCHAIR_ONLY_RESERVATIONS = "WHEELCHAIR_ONLY_RESERVATIONS",
  BICYCLE_RESERVATIONS_COMPULSORY = "BICYCLE_RESERVATIONS_COMPULSORY",
  RESERVATION_SUPPLEMENT_CHARGED = "RESERVATION_SUPPLEMENT_CHARGED",
}

export interface Recommendation {
  typeOfRecommendation: TypeOfRecommendationEnum;
  facilitySet?: AccommodationFacilityForRecommendationsEnum;
  fareClass?: FareClassEnum;

  /** @example ENT:PreassignedFareProduct:StandardFlexible */
  specifiedProduct?: string;
  offersToBuy: OfferToBuy[];

  /** Describes the geographical validity covered by the recommendation */
  geographicalValidityCovered: GeographicalValidityCovered;
  durationType?: DurationEnum;
}

/**
 * Reference to a Validable Element and its configuration.
 */
export interface ValidableElementConfiguration {
  /** Reference to a Fare Structure Element and its configuration. */
  fareStructureElements: FareStructureElementConfiguration[];

  /** Reference to the legs this configuration is for. */
  serviceJourneyIds: string[];

  /** The name of the object. */
  name: TextInLanguage[];

  /** The description of the object. */
  description: TextInLanguage[];

  /**
   * The ID of the object on the format < context : type : instance name >
   * @example NSB:ValidableElement:Ordinary
   */
  id: string;

  /** The price(s) of the sub configurations below this node. Multiple prices is supported in case of prices in multiple currencies. */
  prices: Price[];

  /** The price contribution shows how much this node contributes on the total price. */
  priceContributions: Price[];

  /**
   * How many repeatable validable elements
   * @format int32
   * @example 10
   */
  occurs?: number;

  /**
   * The version of the object
   * @example NSB:Version:V1
   */
  version: string;

  /** Reference to different UsageParameters. */
  parameters?: UsageParameters;

  /** Reference to the legs this configuration is for. */
  datedServiceJourneys?: DatedServiceJourney[];

  /** Container object for other properties. */
  properties?: Properties;
}

/**
 * Text in a specific language.
 */
export interface TextInLanguage {
  /**
   * Language code.
   * @example nob
   */
  lang: string;

  /**
   * The text.
   * @example Enkeltbillett sone 1
   */
  value: string;
}

export interface SearchResponse {
  offers: OfferSummary[];

  /** @example 5e7cbc83e58e6a00011cecc3 */
  tripPatternId?: string;
  unavailableProducts?: UnavailableProduct[];
  optionalProducts?: OptionalProduct[];
  recommendations?: Recommendation[];
}

/**
 * Describes the geographical validity covered by the recommendation
 */
export interface GeographicalValidityCovered {
  serviceJourneys?: string[];

  /** Describes zones where a product is valid */
  zonalValidity?: ZonalValidity;

  /** Start and stop places where the product is valid */
  pointToPointValidity?: PointToPointValidity;
}

/**
 * A group of routes which is generally known to the public by a similar name or number implements
 */
export interface Line {
  /**
   * ID of the Line
   * @example GJB:Line:R30
   */
  id: string;
}

/**
 * @example DAY_PASS
 */
export enum DurationEnum {
  SINGLE_TRIP = "SINGLE_TRIP",
  RETURN_TRIP = "RETURN_TRIP",
  CARNET = "CARNET",
  DAY_PASS = "DAY_PASS",
  WEEKLY_PASS = "WEEKLY_PASS",
  WEEKEND_PASS = "WEEKEND_PASS",
  MONTHLY_PASS = "MONTHLY_PASS",
  SEASON_TICKET = "SEASON_TICKET",
  PROFILE_MEMBERSHIP = "PROFILE_MEMBERSHIP",
  OPEN_ENDED = "OPEN_ENDED",
  OTHER = "OTHER",
}

export interface OfferSummary {
  /** A discount might be given based on previous transactions if CappedDiscountRequest was specified. */
  cappedDiscountOption?: CappedDiscountOption;
  preassignedProducts: PreassignedProduct[];
  optionalProductsSelectableIds?: string[];
  price: PriceSummary;

  /** @example Flex Refunderbar */
  name: string;

  /**
   * Antall tilbud tilgjengelig for å kjøpe
   * @example 14
   */
  available?: number;

  /** @example Flex Refunderbar */
  description: string;

  /** Describes the geographical validity of a product */
  geographicalValidity: GeographicalValidity;

  /** @example 00faf83-56c3-4f4e-8be9-e793c255a77b */
  id: string;
  travellerMapping?: TravellerMappingSummary[];
}

/**
 * References to different distribution parameters.
 */
export interface DistributionParameters {
  /** The name of the object. */
  name: TextInLanguage[];

  /** The description of the object. */
  description: TextInLanguage[];

  /**
   * Reference to a FullfillmentMethod with price information.
   * @example TRAVEL_CARD
   */
  fulfillmentMethod?: string;

  /**
   * The ID of the object on the format < context : type : instance name >
   * @example ENT:DistributionMethod:NOD
   */
  id: string;

  /** The price(s) of the sub configurations below this node. Multiple prices is supported in case of prices in multiple currencies. */
  prices: Price[];

  /** The price contribution shows how much this node contributes on the total price. */
  priceContributions: Price[];

  /**
   * Reference to a DistributionChannel with price information.
   * @example ENT:DistributionChannel:Online
   */
  distributionChannel?: string;

  /**
   * The version of the object
   * @example ENT:Version:V1
   */
  version: string;
}

/**
 * An identifiable SALES PACKAGE CONFIGURATION paired with information regarding which travellers can use it.
 */
export interface Offer {
  /** A reference to the resource that is priced in this offer, e.g. a specific 'TripPattern'. */
  pricedResource?: PricedResourceRef;

  /**
   * The requested distribution channel
   * @example ENT:DistributionChannel:Web
   */
  requestedByDistributionChannel?: string;

  /**
   * The ID of the OFFER.
   * @format uuid
   * @example f65c6b98-768f-4578-9c83-1a2ccfd2b7d7
   */
  id: string;

  /** Reference to a Sales Package and its configuration. */
  salesPackageConfig: SalesPackageConfiguration;

  /** Traveller limitations that applies to the SALES PACKAGE CONFIGURATION. */
  travellerMapping: TravellerMapping[];
}

/**
 * Price with VAT and currency information
 */
export interface Price {
  /**
   * The VAT group.
   * @example TRANSPORT_AND_TICKETS_VAT
   */
  vatGroup?: string;

  /**
   * The amount.
   * @example 100.00
   */
  amount: string;

  /**
   * The currency of the amount.
   * @example NOK
   */
  currency: string;
}

/**
 * Reference to different UsageParameters.
 */
export interface UsageParameters {
  /** Reference to round trip parameters with price information */
  roundTrip: PricedUsageParameter[];

  /** Reference to luggage allowance parameters with price information. */
  luggageAllowances: PricedUsageParameter[];

  /** A reference to a user parameter and price data. */
  usageValidityPeriod?: PricedUsageParameter;

  /** Reference to entitlement given parameters with price information. */
  entitlementGiven: PricedUsageParameter[];

  /** Reference to purchase window parameters with price information. */
  purchaseWindow: PricedUsageParameter[];

  /** Reference to reserving parameters with price information. */
  reserving: PricedUsageParameter[];

  /** Reference to replacing parameters with price information. */
  replacing: PricedUsageParameter[];

  /** A reference to a user profile and price data. */
  userProfile?: PricedUserProfile;

  /** Reference to exchanging parameters with price information. */
  exchanging: PricedUsageParameter[];

  /** Reference to transferability parameters with price information. */
  transferability: PricedUsageParameter[];

  /** Reference to a refund parameter with price information. */
  refunds: PricedUsageParameter[];

  /** A reference to a group with price data. */
  group?: PricedGroup;
}

/**
 * Reference to a Fare Product and its configuration.
 */
export interface FareProductConfiguration {
  /**
   * Amount of priced unit
   * @format int32
   */
  amount?: number;

  /**
   * A classification of this fare product
   * @example ENT:TypeOfFareProduct:update_product@single_operator
   */
  typeOfFareProduct?: string;

  /** A sale discount right that has been applied to the fare product. */
  discountRight?: DiscountRight;

  /**
   * The id of the entitlement product that allowed the sale discount right to be used. Only used if the fare product configuration contains a sale discount right, and the traveller had an entitlement product.
   * @example SJN:PreassignedFareProduct:StandardFullFlex
   */
  originatingFromProductId?: string;

  /** Reference to the legs this configuration is for. */
  serviceJourneyIds: string[];

  /** Describes zones where a product is valid */
  zonalValidity?: ZonalValidity;

  /** The description of the object. */
  description: TextInLanguage[];

  /** A request used to search for fare products for a specified trip. */
  organisation: OrganisationConfig;

  /** True if this configuration is optional to buy, false if it's required. */
  optional: boolean;

  /** Start and stop places where the product is valid */
  pointToPointValidity?: PointToPointValidity;
  supplementProductType?: SupplementProductType;

  /** The price contribution shows how much this node contributes on the total price. */
  priceContributions: Price[];

  /**
   * The version of the object
   * @example NSB:Version:V1
   */
  version: string;

  /** Reference to the legs this configuration is for. */
  datedServiceJourneys?: DatedServiceJourney[];

  /** Reference to a Validable Element and its configuration. */
  validableElements: ValidableElementConfiguration[];

  /** Lines where the product is valid */
  lineValidity?: LineValidity;

  /** The name of the object. */
  name: TextInLanguage[];

  /**
   * Used for selecting a unique element in the configurations
   * @example nhC7Jr
   */
  selectableId: string;

  /**
   * The ID of the object on the format < context : type : instance name >
   * @example NSB:SupplementProduct:ExtraLegSpace
   */
  id: string;

  /** A summary of the properties of a fare product or package that can be used to generate passenger information. */
  conditionSummary?: ConditionSummary;

  /** The price(s) of the sub configurations below this node. Multiple prices is supported in case of prices in multiple currencies. */
  prices: Price[];

  /** Reference to different UsageParameters. */
  parameters?: UsageParameters;

  /** Container object for other properties. */
  properties?: Properties;
  productType?: ProductType;
}

/**
 * Accommodation for service journey
 */
export interface AccommodationForServiceJourney {
  serviceJourney: ServiceJourneySummary;
  accommodation: AccommodationFacilityEnum[];
}

/**
 * Summary of properties for a product
 */
export interface PropertiesSummary {
  duration?: string;
  luggageAllowances?: LuggageAllowance[];
  accommodations?: AccommodationForServiceJourney[];
  fareClasses?: FareClassEnum[];

  /** Representation of a repeatable ticket, with an optional duration for each instance and an amount of times the ticket can be used */
  carnet?: Carnet;

  /** @example ENT:Version:V1 */
  userProfileVersion?: string;
  reservingRequirements?: ReservingRequirementForServiceJourney[];

  /** id and and name of an organisation */
  organisation: OrganisationSummary;

  /** @example ENT:UserProfile:Adult */
  userProfileId?: string;
  isExchangeable?: boolean;
  isRefundable?: boolean;
  group?: GroupSummary;
}

/**
 * A reference to a user parameter and price data.
 */
export interface PricedUsageParameter {
  /** The name of the object. */
  name: TextInLanguage[];

  /**
   * Used for selecting a unique element in the configurations
   * @example ypLDzG
   */
  selectableId: string;

  /** The description of the object. */
  description: TextInLanguage[];

  /** True if this configuration is optional to buy, false if it's required. */
  optional: boolean;

  /**
   * The ID of the object on the format < context : type : instance name >
   * @example NSB:UserProfile:Adult
   */
  id: string;

  /** The type of this usage parameter. */
  typeOfUsageParameter?: string;

  /** The price(s) of the sub configurations below this node. Multiple prices is supported in case of prices in multiple currencies. */
  prices: Price[];

  /** The price contribution shows how much this node contributes on the total price. */
  priceContributions: Price[];

  /**
   * The version of the object
   * @example NSB:Version:V1
   */
  version: string;
}

/**
 * EstimatedCall for the quay.
 */
export interface EstimatedCall {
  /**
   * The date the estimated call is valid for.
   * @example 2020-12-24T16:00:00Z
   */
  date: string;

  /** A place such as platform, stance, or quayside where passengers have access to PT vehicles. */
  quay?: Quay;
}

/**
 * The Geographical Interval with distance and zone data.
 */
export interface GeoIntervalData {
  /**
   * The distance in KM or TEN for this interval.
   * @format double
   * @example 120
   */
  distance?: number;

  /** The name of the object. */
  name: TextInLanguage[];

  /** The description of the object. */
  description: TextInLanguage[];

  /**
   * The number of zones in this interval.
   * @format int32
   * @example 4
   */
  zoneCount?: number;

  /**
   * The ID of the object on the format < context : type : instance name >
   * @example NSB:GeographicalInterval:60TEN
   */
  id: string;

  /** A list of the zones that exist in this interval. Empty if not relevant. */
  zones: string[];

  /**
   * The version of the object
   * @example NSB:Version:V1
   */
  version: string;
}

/**
 * Reference to different UsageParameters.
 */
export interface DiscountUsageParameters {
  /** Reference to entitlement given parameters with price information. */
  entitlementGiven: PricedUsageParameter[];

  /** Reference to reserving parameters with price information. */
  reserving: PricedUsageParameter[];
}

/**
 * Organisation providing public transport services.
 */
export interface Operator {
  /**
   * Name of Operator.
   * @example Sporveien T-banen AS
   */
  name?: string;

  /**
   * NeTEx-id of Operator.
   * @example RUT:Operator:210
   */
  id?: string;
}

export interface ServiceJourney {
  /** @example ENT:ServiceJourney:1-1605-1919 */
  id: string;

  /** @example 1919 */
  privateCode?: string;
}

/**
 * A stop place
 */
export interface StopPlace {
  /**
   * Latitude
   * @format double
   * @example 59.910925
   */
  latitude?: number;

  /**
   * Name of stop place.
   * @example Oslo S
   */
  name?: string;

  /** Tariff zones */
  tariffZones?: TariffZone[];

  /**
   * ID
   * @example NSR:StopPlace:337
   */
  id: string;

  /**
   * Longitude
   * @format double
   * @example 10.753276
   */
  longitude?: number;
}

/**
 * A specification of an existing ticket.
 */
export interface ExistingTicket {
  /** ServiceJourneys, not implemented */
  serviceJourneys?: string[];

  /**
   * The netex-id of the entity.
   * @example RUT:PreassignedFareProduct:SupplementaryTicket
   */
  id: string;

  /** The zones the existing ticket is valid for */
  zones?: string[];
}

/**
 * Describes zones where a product is valid
 */
export interface ZonalValidity {
  zones?: string[];
}

/**
 * Authority involved in public transportation. An organisation under which the responsibility of organising the transport service in a certain area is placed.
 */
export interface Authority {
  /**
   * Name of Authority.
   * @example ENT
   */
  name?: string;

  /**
   * NeTEx-id of Authority.
   * @example ENT:Authority:ENT
   */
  id: string;
}

/**
 * A user type
 * @example ADULT
 */
export enum UserTypeEnum {
  ANYONE = "ANYONE",
  ADULT = "ADULT",
  CHILD = "CHILD",
  INFANT = "INFANT",
  ANIMAL = "ANIMAL",
  SENIOR = "SENIOR",
  GUIDE_DOG = "GUIDE_DOG",
  YOUTH = "YOUTH",
  STUDENT = "STUDENT",
  MILITARY = "MILITARY",
}

/**
 * The transport sub mode (e.g., localBus or expressBus) used when traversing this leg. Null if leg is not a ride
 * @example local
 */
export enum TransportSubModeEnum {
  Unknown = "unknown",
  Undefined = "undefined",
  InternationalFlight = "internationalFlight",
  DomesticFlight = "domesticFlight",
  IntercontinentalFlight = "intercontinentalFlight",
  DomesticScheduledFlight = "domesticScheduledFlight",
  ShuttleFlight = "shuttleFlight",
  IntercontinentalCharterFlight = "intercontinentalCharterFlight",
  InternationalCharterFlight = "internationalCharterFlight",
  RoundTripCharterFlight = "roundTripCharterFlight",
  SightseeingFlight = "sightseeingFlight",
  HelicopterService = "helicopterService",
  DomesticCharterFlight = "domesticCharterFlight",
  SchengenAreaFlight = "SchengenAreaFlight",
  AirshipService = "airshipService",
  ShortHaulInternationalFlight = "shortHaulInternationalFlight",
  CanalBarge = "canalBarge",
  LocalBus = "localBus",
  RegionalBus = "regionalBus",
  ExpressBus = "expressBus",
  NightBus = "nightBus",
  PostBus = "postBus",
  SpecialNeedsBus = "specialNeedsBus",
  MobilityBus = "mobilityBus",
  MobilityBusForRegisteredDisabled = "mobilityBusForRegisteredDisabled",
  SightseeingBus = "sightseeingBus",
  ShuttleBus = "shuttleBus",
  HighFrequencyBus = "highFrequencyBus",
  DedicatedLaneBus = "dedicatedLaneBus",
  SchoolBus = "schoolBus",
  SchoolAndPublicServiceBus = "schoolAndPublicServiceBus",
  RailReplacementBus = "railReplacementBus",
  DemandAndResponseBus = "demandAndResponseBus",
  AirportLinkBus = "airportLinkBus",
  InternationalCoach = "internationalCoach",
  NationalCoach = "nationalCoach",
  ShuttleCoach = "shuttleCoach",
  RegionalCoach = "regionalCoach",
  SpecialCoach = "specialCoach",
  SchoolCoach = "schoolCoach",
  SightseeingCoach = "sightseeingCoach",
  TouristCoach = "touristCoach",
  CommuterCoach = "commuterCoach",
  Funicular = "funicular",
  StreetCableCar = "streetCableCar",
  AllFunicularServices = "allFunicularServices",
  UndefinedFunicular = "undefinedFunicular",
  Metro = "metro",
  Tube = "tube",
  UrbanRailway = "urbanRailway",
  CityTram = "cityTram",
  LocalTram = "localTram",
  RegionalTram = "regionalTram",
  SightseeingTram = "sightseeingTram",
  ShuttleTram = "shuttleTram",
  TrainTram = "trainTram",
  Telecabin = "telecabin",
  CableCar = "cableCar",
  Lift = "lift",
  ChairLift = "chairLift",
  DragLift = "dragLift",
  TelecabinLink = "telecabinLink",
  Local = "local",
  HighSpeedRail = "highSpeedRail",
  SuburbanRailway = "suburbanRailway",
  RegionalRail = "regionalRail",
  InterregionalRail = "interregionalRail",
  LongDistance = "longDistance",
  International = "international",
  SleeperRailService = "sleeperRailService",
  NightRail = "nightRail",
  CarTransportRailService = "carTransportRailService",
  TouristRailway = "touristRailway",
  AirportLinkRail = "airportLinkRail",
  RailShuttle = "railShuttle",
  ReplacementRailService = "replacementRailService",
  SpecialTrain = "specialTrain",
  CrossCountryRail = "crossCountryRail",
  RackAndPinionRailway = "rackAndPinionRailway",
  InternationalCarFerry = "internationalCarFerry",
  NationalCarFerry = "nationalCarFerry",
  RegionalCarFerry = "regionalCarFerry",
  LocalCarFerry = "localCarFerry",
  InternationalPassengerFerry = "internationalPassengerFerry",
  NationalPassengerFerry = "nationalPassengerFerry",
  RegionalPassengerFerry = "regionalPassengerFerry",
  LocalPassengerFerry = "localPassengerFerry",
  PostBoat = "postBoat",
  TrainFerry = "trainFerry",
  RoadFerryLink = "roadFerryLink",
  AirportBoatLink = "airportBoatLink",
  HighSpeedVehicleService = "highSpeedVehicleService",
  HighSpeedPassengerService = "highSpeedPassengerService",
  SightseeingService = "sightseeingService",
  SchoolBoat = "schoolBoat",
  CableFerry = "cableFerry",
  RiverBus = "riverBus",
  ScheduledFerry = "scheduledFerry",
  ShuttleFerryService = "shuttleFerryService",
  CommunalTaxi = "communalTaxi",
  CharterTaxi = "charterTaxi",
  WaterTaxi = "waterTaxi",
  RailTaxi = "railTaxi",
  BikeTaxi = "bikeTaxi",
  BlackCab = "blackCab",
  MiniCab = "miniCab",
  AllTaxiServices = "allTaxiServices",
  HireCar = "hireCar",
  HireVan = "hireVan",
  HireMotorbike = "hireMotorbike",
  HireCycle = "hireCycle",
  AllHireVehicles = "allHireVehicles",
}

export interface UpdateSearchTripPatternRequest {
  recommendationConfig?: RecommendationConfig;

  /** Travellers to be updated. */
  travellers: Traveller[];

  /** A configuration of how to group travellers in offers. */
  groupConfig?: GroupConfig;
}

/**
 * Determines what fields should be used to categorize the offers
 */
export interface CategorySpec {
  facilitySet?: AccommodationFacilityForRecommendationsEnum[];
  typesOfRecommendation: TypeOfRecommendationEnum[];
  fareClasses?: FareClassEnum[];
  specifiedProducts?: string[];
  durationTypes?: DurationEnum[];
}

/**
 * A sale discount right that has been applied to the fare product.
 */
export interface DiscountRight {
  /**
   * The id of the entitlement product that allowed the sale discount right to be used. Only used if the fare product configuration contains a sale discount right, and the traveller had an entitlement product.
   * @example ENT:EntitlementProduct:V1F1
   */
  originatingFromProductId?: string;

  /** The name of the object. */
  name: TextInLanguage[];

  /**
   * Used for selecting a unique element in the configurations
   * @example hlfmHy
   */
  selectableId: string;

  /** The description of the object. */
  description: TextInLanguage[];

  /** A request used to search for fare products for a specified trip. */
  organisation: OrganisationConfig;

  /** True if this configuration is optional to buy, false if it's required. */
  optional: boolean;

  /**
   * The ID of the object on the format < context : type : instance name >
   * @example SJN:SaleDiscountRight:Premium
   */
  id: string;

  /** The price(s) of the sub configurations below this node. Multiple prices is supported in case of prices in multiple currencies. */
  prices: Price[];

  /** The price contribution shows how much this node contributes on the total price. */
  priceContributions: Price[];

  /**
   * The version of the object
   * @example SJN:Version:SDR-Premium-1
   */
  version: string;

  /** Reference to different UsageParameters. */
  parameters?: DiscountUsageParameters;
}

/**
 * Container object for other properties.
 */
export interface Properties {
  /** Accommodation. Enum as string with the following values: SLEEPER, SEATING, DOUBLE_SLEEPER, SINGLE_SLEEPER, SPECIAL_SLEEPER, COUCHETTE, SINGLE_COUCHETTE, DOUBLE_COUCHETTE, RECLINING_SEAT, BABY_COMPARTMENT, FAMILY_COMPARTMENT, PANORAMA_COACH, PULLMAN_COACH, STANDING, ANY_FACILITY_SET */
  accommodations: AccommodationFacilityEnum[];

  /** FareClasses. Enum as string with the following values: FIRST_CLASS, SECOND_CLASS, THIRD_CLASS, ECONOMY_CLASS, BUSINESS_CLASS, TURISTA, PREFERENTE, STANDARD_CLASS, PREMIUM_CLASS, ANY, UNKNOWN */
  fareClasses: FareClassEnum[];
}

/**
 * Representation of a mandatory product that is included in an offer
 */
export interface PreassignedProduct {
  /** Summary of a sale discount right that has been applied to the fare product. */
  discountRight?: DiscountRightSummary;

  /** @example Standard refunderbar */
  name: string;

  /** @example Standard refunderbar */
  description: string;

  /** Describes the geographical validity of a product */
  geographicalValidity: GeographicalValidity;

  /** @example SJN:PreassignedFareProduct:StandardFullFlex */
  id: string;

  /** @example SJN:Version:V1 */
  version: string;

  /** Summary of properties for a product */
  properties: PropertiesSummary;
}

/**
 * Reference to a Sales Package and its configuration.
 */
export interface SalesPackageConfiguration {
  /** Reference to the legs this configuration is for. */
  serviceJourneyIds: string[];

  /** The name of the object. */
  name: TextInLanguage[];

  /** The description of the object. */
  description: TextInLanguage[];

  /**
   * The ID of the object on the format < context : type : instance name >
   * @example NSB:SalesPackage:Ordinary
   */
  id: string;

  /** Reference to a Fare Product and its configuration. */
  fareProducts: FareProductConfiguration[];

  /** The price(s) of the sub configurations below this node. Multiple prices is supported in case of prices in multiple currencies. */
  prices: Price[];

  /** The price contribution shows how much this node contributes on the total price. */
  priceContributions: Price[];

  /**
   * The version of the object
   * @example NSB:Version:V1
   */
  version: string;

  /** Reference to different UsageParameters. */
  parameters?: UsageParameters;

  /** Reference to the legs this configuration is for. */
  datedServiceJourneys: DatedServiceJourney[];

  /** Container object for other properties. */
  properties?: Properties;

  /** References to different distribution parameters. */
  distributions: DistributionParameters[];
}

/**
 * Contains information to look up transaction history for a traveller and what CappedDiscountRight-program he or she is a part of.
 */
export interface CappingSpecification {
  /** Contains enough information about a customer to look up transaction history. */
  customerRef: CustomerRef;

  /**
   * Specify a minimum alternative duration oo avoid alternatives that doesn't last long enough in the future to be useful.
   * @format duration
   */
  minimumAlternativeDuration?: string;

  /** Reference to the fare contract for this traveller. */
  fareContractId: string;

  /**
   * To avoid too many similar alternatives you can specify a minimum period between the start date of each alternative.
   * @format duration
   */
  minimumDurationBetweenAlternatives?: string;

  /** Reference to a CappedDiscountRight. */
  cappedDiscountRightId: string;
}

/**
 * Representation of a product that is unavailable, but would have been included in an offer if available.
 */
export interface UnavailableProduct {
  /**
   * Dated service journey id for the product
   * @example ENT:DatedServiceJourney:56769977
   */
  datedServiceJourneyId: string;

  /** @example SJN:PreassignedFareProduct:StandardFullFlex */
  id: string;
  status: UnavailableEnum;
}

/**
 * A request used to search for fare products for a specified trip.
 */
export interface OrganisationConfig {
  /**
   * The netexId for the organisation.
   * @example ENT:Organisation:ENT
   */
  id: string;

  /**
   * The privateCode for the organisation, used to integrate with the organisation register.
   * @format int64
   * @example 1
   */
  privateCode?: number;
}

/**
 * A specification of which travellers can use an offer, along with limitations on the number of travellers that must be selected from the group for the OFFER to be valid.
 */
export interface TravellerMapping {
  /**
   * The maximum number of travellers that can be selected from the group.
   * @format int32
   */
  maxNumberOfTravellers: number;

  /** The ids of the travellers. */
  travellerIds: string[];

  /**
   * The minimum number of travellers that can be selected from the group.
   * @format int32
   */
  minNumberOfTravellers: number;

  /** If there are a through fare with two operators more user profiles are needed, this list represents these */
  userProfileIds: string[];

  /** Version to the user profile associated with this offer. */
  userProfileVersion: string;

  /**
   * Reference to the user profile associated with this offer.
   * @example FLB:UserProfile:Adult
   */
  userProfileId: string;

  /** If the request uses traveller groups to specify the travellers this field holds the id of the group that the travellers belongs to. */
  travellerGroupId?: string;
}

/**
* There are three supported algorithms for organizing how we present each combination of journeys. Given three journeys in the trip pattern; SJ-1, SJ-2, SJ-3 the three algorithms will generate these combinations:
SUBSEQUENT_COMBINATIONS: (SJ-1), (SJ-2), (SJ-3), (SJ-1, SJ-2), (SJ-2, SJ-3), (SJ-1, SJ-2, SJ-3)
FOR_EACH_AND_GROUPED_COMBINATIONS: (SJ-1), (SJ-2), (SJ-3), (SJ-1, SJ-2, SJ-3)
COMBINATIONS_FROM_OFFERS: Will only organize by unique journey combinations covered by offers.
* @example FOR_EACH_AND_GROUPED_COMBINATIONS
*/
export enum JourneyOrganizeAlgorithm {
  SUBSEQUENT_COMBINATIONS = "SUBSEQUENT_COMBINATIONS",
  COMBINATIONS_FROM_OFFERS = "COMBINATIONS_FROM_OFFERS",
  FOR_EACH_AND_GROUPED_COMBINATIONS = "FOR_EACH_AND_GROUPED_COMBINATIONS",
}

/**
 * @example BICYCLE
 */
export enum LuggageAllowance {
  HANDBAG = "HANDBAG",
  HAND_LUGGAGE = "HAND_LUGGAGE",
  SMALL_SUITCASE = "SMALL_SUITCASE",
  SUITCASE = "SUITCASE",
  TRUNK = "TRUNK",
  OVERSIZE_ITEM = "OVERSIZE_ITEM",
  BICYCLE = "BICYCLE",
  SPORTING_EQUIPMENT = "SPORTING_EQUIPMENT",
  SKIS = "SKIS",
  MUSICAL_INSTRUMENT = "MUSICAL_INSTRUMENT",
  PUSH_CHAIR = "PUSH_CHAIR",
  MOTORIZED_WHEELCHAIR = "MOTORIZED_WHEELCHAIR",
  LARGE_MOTORIZED_WHEELCHAIR = "LARGE_MOTORIZED_WHEELCHAIR",
  WHEELCHAIR = "WHEELCHAIR",
  SMALL_ANIMAL = "SMALL_ANIMAL",
  ANIMAL = "ANIMAL",
  GAME = "GAME",
  MOTORCYCLE = "MOTORCYCLE",
  OTHER = "OTHER",
}

/**
 * Lines where the product is valid
 */
export interface LineValidity {
  /** Valid on lines */
  validOn: string[];

  /** Not valid on lines */
  notValidOn: string[];
}

/**
 * A place such as platform, stance, or quayside where passengers have access to PT vehicles.
 */
export interface Quay {
  /** A stop place */
  stopPlace?: StopPlace;

  /**
   * Name
   * @example Nydalen
   */
  name?: string;

  /** @example NSR:Quay:11151 */
  id?: string;
}

/**
 * A reference to a user profile and price data.
 */
export interface PricedUserProfile {
  /** The name of the object. */
  name: TextInLanguage[];

  /**
   * Used for selecting a unique element in the configurations
   * @example GtSlJQ
   */
  selectableId: string;

  /** True if this configuration is optional to buy, false if it's required. */
  optional: boolean;

  /**
   * The ID of the object on the format < context : type : instance name >
   * @example ENT:UserProfile:Anyone
   */
  id: string;

  /** The price(s) of the sub configurations below this node. Multiple prices is supported in case of prices in multiple currencies. */
  prices: Price[];

  /** The price contribution shows how much this node contributes on the total price. */
  priceContributions: Price[];

  /**
   * The version of the object
   * @example ENT:Version:V1
   */
  version: string;
  typeOfConcession?: string;
}

/**
 * Describes the geographical validity of a product
 */
export interface GeographicalValidity {
  serviceJourneys?: ServiceJourneySummary[];

  /** Describes zones where a product is valid */
  zonalValidity?: ZonalValidity;

  /** Start and stop places where the product is valid */
  pointToPointValidity?: PointToPointValidity;
}

export interface ReservingRequirementForServiceJourney {
  seatMapIsAvailable: boolean;
  reservingRequirement?: ReservingRequirement;
  serviceJourney: ServiceJourneySummary;
}

/**
 * @example BICYCLE
 */
export enum SupplementProductType {
  SEAT_RESERVATION = "SEAT_RESERVATION",
  BICYCLE = "BICYCLE",
  DOG = "DOG",
  ANIMAL = "ANIMAL",
  MEAL = "MEAL",
  WIFI = "WIFI",
  EXTRA_LUGGAGE = "EXTRA_LUGGAGE",
  PENALTY = "PENALTY",
  UPGRADE = "UPGRADE",
  JOURNEY_EXTENSION = "JOURNEY_EXTENSION",
  JOURNEY_ADD_ON = "JOURNEY_ADD_ON",
  EVENT_ADD_ON = "EVENT_ADD_ON",
  PARKING = "PARKING",
}

/**
 * List of legs constituting a suggested sequence of rides and links for a specific trip.
 */
export interface TripPattern {
  expired?: boolean;

  /** Legs constituting a suggested sequence of rides and links for this trip */
  legs?: Leg[];

  /**
   * ID of the trip pattern
   * @example 5e7cbc83e58e6a00011cecc3
   */
  id?: string;
  isPotentialRoundtrip?: boolean;
}

/**
 * Part of a trip pattern. Either a ride on a public transport vehicle or access or path link to/from/between places
 */
export interface Leg {
  /** Used to specify that the vehicle used on this leg is the same that will be used on the next leg */
  interchangeTo?: InterchangeTo;

  /** A list of coordinates encoded as a polyline string (see http://code.google.com/apis/maps/documentation/polylinealgorithm.html) */
  pointsOnLink?: PointsOnLink;

  /** Super type for all places (stop places, quays, car parks, bike parks and bike rental stations) */
  fromPlace: Place;

  /** A group of routes which is generally known to the public by a similar name or number implements */
  line?: Line;

  /** EstimatedCall for the quay. */
  fromEstimatedCall?: EstimatedCall;

  /**
   * The aimed date and time this leg ends.
   * @format date-time
   * @example 2020-05-13T09:19:30.389Z
   */
  aimedEndTime: string;

  /** The transport sub mode (e.g., localBus or expressBus) used when traversing this leg. Null if leg is not a ride */
  transportSubmode?: TransportSubModeEnum;
  serviceJourney?: ServiceJourney;

  /** EstimatedCall for the quay. */
  toEstimatedCall?: EstimatedCall;

  /** Whether this leg is a ride leg or not. */
  ride: boolean;

  /** Organisation providing public transport services. */
  operator?: Operator;

  /** The mode of transport or access (e.g., foot) used when traversing this leg. */
  mode: TransportModeEnum;

  /** A place such as platform, stance, or quayside where passengers have access to PT vehicles. */
  maybeToQuay?: Quay;
  hasToFromQuays?: boolean;

  /** A place such as platform, stance, or quayside where passengers have access to PT vehicles. */
  maybeFromQuay?: Quay;

  /**
   * The aimed date and time this leg starts.
   * @format date-time
   * @example 2020-05-13T07:19:30.389Z
   */
  aimedStartTime: string;

  /**
   * The expected date and time this leg starts.
   * @format date-time
   * @example 2020-05-13T07:19:30.389Z
   */
  expectedStartTime?: string;

  /** Authority involved in public transportation. An organisation under which the responsibility of organising the transport service in a certain area is placed. */
  authority?: Authority;

  /** For ride legs, intermediate quays between the Place where the leg originates and the Place where the leg ends. For non-ride legs, null. */
  intermediateQuays: Quay[];

  /** A planned vehicle journey with passengers. */
  datedServiceJourney?: DatedServiceJourney;

  /**
   * The expected date and time this leg ends.
   * @format date-time
   * @example 2020-05-13T09:19:30.389Z
   */
  expectedEndTime?: string;

  /** Super type for all places (stop places, quays, car parks, bike parks and bike rental stations) */
  toPlace: Place;
}

export interface RecommendationConfig {
  /** Determines what rules to apply when categorizing and recommending offers for travellers */
  ruleSpec?: RuleSpec;

  /** Determines what fields should be used to categorize the offers */
  categorySpec?: CategorySpec;
}

/**
 * Quota for the priceable object
 */
export interface Quota {
  /**
   * The corresponding service journey id for this stock
   * @example NSB:ServiceJourney:X
   */
  serviceJourneyId: string;

  /**
   * The amount of stock for this priceable object.
   * @format int32
   * @example 10
   */
  stock: number;
}

/**
* Basis on which pricing is done - per whole group
or per member.
* @example PER_OFFER
*/
export enum PricingBasis {
  PER_OFFER = "PER_OFFER",
  PER_PERSON = "PER_PERSON",
}

/**
 * A list of coordinates encoded as a polyline string (see http://code.google.com/apis/maps/documentation/polylinealgorithm.html)
 */
export interface PointsOnLink {
  /**
   * The encoded points of the polyline.
   * @example uhf_Jg~ahAu~oBye~@w~Ln~CqfkBtpaAelg@dejB
   */
  points: string;
}

/**
 * Describes which offer to buy and how many of this offer to buy to satisfy a recommendation
 */
export interface OfferToBuy {
  /** List of selectableIds of supplement products which upgrades a product */
  selectableProductIds: string[];

  /** One possible grouping of travellers for the number of offers to buy */
  possibleTravellerIds: string[][];

  /**
   * Id of the offer to buy
   * @example 00faf83-56c3-4f4e-8be9-e793c255a77b
   */
  id: string;

  /** DEPRECATED: Use selectable ids from selectableProductIds instead. This field contains netexIds of upgradable supplement products */
  withUpgradeProducts: string[];

  /**
   * Number of this offer to buy
   * @example 2
   */
  numberToBuy: number;
}

export interface GroupSummary {
  /** @example Familiebillett */
  name?: string;
  userProfiles: UserProfileInGroupSummary[];
  description: string;

  /** @example ENT:GroupTicket:Family */
  id: string;

  /** @example ENT:Version:V1 */
  version: string;
}

export interface PriceSummary {
  /** @example 100.00 */
  amount: string;

  /** @example NOK */
  currency: string;
}

/**
 * Contains enough information about a customer to look up transaction history.
 */
export interface CustomerRef {
  /** Reference to the account id within the account based ticketing module. */
  accountBasedTicketingCustomerRef?: string;
}

/**
 * A summary of the properties of a fare product or package that can be used to generate passenger information.
 */
export interface ConditionSummary {
  /**
   * Whether the ticket is exchangeable.
   * @example true
   */
  isExchangeable?: boolean;

  /**
   * Whether the ticket is refundable.
   * @example true
   */
  isRefundable?: boolean;
}

/**
 * Super type for all places (stop places, quays, car parks, bike parks and bike rental stations)
 */
export interface Place {
  /** @example Oslo S */
  name?: string;

  /** A place such as platform, stance, or quayside where passengers have access to PT vehicles. */
  quay?: Quay;
}

/**
 * A simple reference object containing enough information to lookup the object itself if needed.
 */
export interface DataManagedObjectData {
  /** The name of the object. */
  name: TextInLanguage[];

  /** The description of the object. */
  description: TextInLanguage[];

  /**
   * The ID of the object on the format < context : type : instance name >
   * @example ENT:PreassignedFareProduct:Sone1
   */
  id: string;

  /**
   * The version of the object
   * @example ENT:Version:V1
   */
  version: string;
}
