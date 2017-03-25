// Copyright (c) Martin Costello, 2017. All rights reserved.
// Licensed under the Apache 2.0 license. See the LICENSE file in the project root for full license information.

declare namespace ApplePayJS {

    /**
     * Types that indicate a contact field.
     */
    enum ApplePayContactField {

        /**
         * The contact's postal address.
         */
        postalAddress,

        /**
         * The contact's name.
         */
        name,

        /**
         * The contact's telephone number.
         */
        phone,

        /**
         * The contact's email address.
         */
        email
    }

    /**
     * Defines a line item in a payment request - for example, total, tax, discount, or grand total.
     */
    class ApplePayLineItem {

        /**
         * A short, localized description of the line item.
         */
        public label: string;

        /**
         * The line item's amount.
         */
        public amount: string;

        /**
         * A value that indicates if the line item is final or pending.
         */
        public type?: ApplePayLineItemType | string;
    }

    /**
     * Types that indicate if a line item is final or pending.
     */
    enum ApplePayLineItemType {

        /**
         * A line item representing the known, final cost.
         */
        final,

        /**
         * A line item representing an estimated or unknown cost.
         */
        pending
    }

    /**
     * Types that represent payment merchant capabilities.
     */
    enum ApplePayMerchantCapability {

        /**
         * 3D Secure transactions are supported. This value is required.
         */
        supports3DS,

        /**
         * Only transactions that are categorized as credit cards are allowed.
         */
        supportsCredit,

        /**
         * Only transactions that are categorized as debit cards are allowed.
         */
        supportsDebit,

        /**
         * China Union Pay transactions are supported.
         */
        supportsEMV
    }

    /**
     * Represents the result of authorizing a payment request and contains encrypted payment information.
     */
    class ApplePayPayment {

        /**
         * The encrypted token for an authorized payment.
         */
        public token: ApplePayPaymentToken;

        /**
         * The billing contact selected by the user for this transaction.
         */
        public billingContact?: ApplePayPaymentContact;

        /**
         * The shipping contact selected by the user for this transaction.
         */
        public shippingContact?: ApplePayPaymentContact;
    }

    /**
     * The Apple​Pay​Payment​Authorized​Event class defines the attributes contained by the ApplePaySession.onpaymentauthorized callback function.
     */
    class ApplePayPaymentAuthorizedEvent extends Event {

        /**
         * The payment token used to authorize a payment.
         */
        public readonly payment: ApplePayPayment;
    }

    /**
     * Encapsulates contact information needed for billing and shipping.
     */
    class ApplePayPaymentContact {

        /**
         * An email address for the contact.
         */
        public emailAddress: string;

        /**
         * The contact's family name.
         */
        public familyName: string;

        /**
         * The contact's given name.
         */
        public givenName: string;

        /**
         * A phone number for the contact.
         */
        public phoneNumber: string;

        /**
         * The address for the contact.
         */
        public addressLines: string[];

        /**
         * The city for the contact.
         */
        public locality: string;

        /**
         * The state for the contact.
         */
        public administrativeArea: string;

        /**
         * The zip code, where applicable, for the contact.
         */
        public postalCode: string;

        /**
         * The colloquial country name for the contact.
         */
        public country: string;

        /**
         * The contact's ISO country code.
         */
        public countryCode: string;
    }

    /**
     * Contains information about an Apple Pay payment card.
     */
    class ApplePayPaymentMethod {

        /**
         * A string, suitable for display, that describes the card.
         */
        public displayName: string;

        /**
         * A string, suitable for display, that is the name of the payment network backing the card.
         * The value is one of the supported networks specified in the supported​Networks property of the Apple​Pay​Payment​Request.
         */
        public network: string;

        /**
         * A value representing the card's type of payment.
         */
        public type: ApplePayPaymentMethodType;

        /**
         * The payment pass object associated with the payment.
         */
        public paymentPass: ApplePayPaymentPass;
    }

    /**
     * The Apple​Pay​Payment​Method​Selected​Event class defines the attributes contained by the ApplePaySession.onpaymentmethodselected callback function.
     */
    class ApplePayPaymentMethodSelectedEvent extends Event {

        /**
         * The card used to complete a payment.
         */
        public readonly paymentMethod: ApplePayPaymentMethod;
    }

    /**
     * Types that indicate types of payment method.
     */
    enum ApplePayPaymentMethodType {

        /**
         * A debit card.
         */
        debit,

        /**
         * A credit card.
         */
        credit,

        /**
         * A card with pre-paid funds.
         */
        prepaid,

        /**
         * A store card, such as a loyalty card.
         */
        store
    }

    /**
     * Represents a provisioned payment card for Apple Pay payments.
     */
    class ApplePayPaymentPass {

        /**
         * The unique identifier for the primary account number for the payment card.
         */
        primaryAccountIdentifier: string;

        /**
         * A version of the primary account number suitable for display in your UI.
         */
        primaryAccountNumberSuffix: string;

        /**
         * The unique identifier for the device-specific account number.
         */
        deviceAccountIdentifier?: string;

        /**
         * A version of the device account number suitable for display in your UI.
         */
        deviceAccountNumberSuffix?: string;

        /**
         * The activation state of the pass.
         */
        activationState: ApplePayPaymentPassActivationState;
    }

    /**
     * Payment pass activation states.
     */
    enum ApplePayPaymentPassActivationState {

        /**
         * Active and ready to be used for payment.
         */
        activated,

        /**
         * Not active but may be activated by the issuer.
         */
        requiresActivation,

        /**
         * Not ready for use but activation is in progress.
         */
        activating,

        /**
         * Not active and can't be activated.
         */
        suspended,

        /**
         * Not active because the issuer has disabled the account associated with the device.
         */
        deactivated
    }

    /**
     * Encapsulates a request for payment, including information about payment processing capabilities, the payment amount, and shipping information.
     */
    class ApplePayPaymentRequest {

        /**
         * The merchant's two-letter ISO 3166 country code.
         */
        public countryCode: string;

        /**
         * The three-letter ISO 4217 currency code for the payment.
         */
        public currencyCode: string;

        /**
         * A set of line items that explain recurring payments and/or additional charges.
         */
        public lineItems?: ApplePayLineItem[];

        /**
         * The payment capabilities supported by the merchant.
         * The value must at least contain ApplePayMerchantCapability.supports3DS.
         */
        public merchantCapabilities: ApplePayMerchantCapability[] | string[];

        /**
         * The payment networks supported by the merchant.
         */
        public supportedNetworks: string[];

        /**
         * A line item representing the total for the payment.
         */
        public total: ApplePayLineItem;

        /**
         * Billing contact information for the user.
         */
        public billingContact?: ApplePayPaymentContact;

        /**
         * The billing information that you require from the user in order to process the transaction.
         */
        public requiredBillingContactFields?: ApplePayContactField[] | string[];

        /**
         * The shipping information that you require from the user in order to fulfill the order.
         */
        public requiredShippingContactFields?: ApplePayContactField[] | string[];

        /**
         * Shipping contact information for the user.
         */
        public shippingContact?: ApplePayPaymentContact;

        /**
         * A set of shipping method objects that describe the available shipping methods.
         */
        public shippingMethods?: ApplePayShippingMethod[] | string[];

        /**
         * How the items are to be shipped.
         */
        public shippingType?: ApplePayShippingType | string;

        /**
         * Optional user-defined data.
         */
        public applicationData?: string;
    }

    /**
     * Contains the user's payment credentials.
     */
    class ApplePayPaymentToken {

        /**
         * An object containing the encrypted payment data.
         */
        public paymentData: any;

        /**
         * Information about the card used in the transaction.
         */
        public paymentMethod: ApplePayPaymentMethod;

        /**
         * A unique identifier for this payment.
         */
        public transactionIdentifier: string;
    }

    /**
     * The Apple​Pay​Shipping​Contact​Selected​Event class defines the attributes contained by the ApplePaySession.onshippingcontactselected callback function.
     */
    class ApplePayShippingContactSelectedEvent extends Event {

        /**
         * The shipping address selected by the user.
         */
        public readonly shippingContact: ApplePayPaymentContact;
    }

    /**
     * Defines a shipping method for delivering physical goods.
     */
    class ApplePayShippingMethod {

        /**
         * A short description of the shipping method.
         */
        public label: string;

        /**
         * A further description of the shipping method.
         */
        public detail?: string;

        /**
         * The amount associated with this shipping method.
         */
        public amount: string;

        /**
         * A client-defined identifier.
         */
        public identifier?: string;
    }

    /**
     * The Apple​Pay​Shipping​Method​Selected​Event class defines the attribute contained by the ApplePaySession.onshippingmethodselected callback function.
     */
    class ApplePayShippingMethodSelectedEvent extends Event {

        /**
         * The shipping method selected by the user.
         */
        public readonly shippingMethod: ApplePayShippingMethod;
    }

    /**
     * Types that indicate how a purchase is shipped.
     */
    enum ApplePayShippingType {

        shipping,

        delivery,

        storePickup,

        servicePickup
    }

    /**
     * A session object for managing the payment process on the web.
     */
    class ApplePaySession extends EventTarget {

        /**
         * Creates a new instance of the ApplePaySession class.
         * @param version - The version of the ApplePay JS API you are using.
         * @param paymentRequest - An Apple​Pay​Payment​Request object that contains the information that is displayed on the Apple Pay payment sheet.
         */
        public constructor(version: number, paymentRequest: ApplePayPaymentRequest);

        /**
         * A callback function that is automatically called when the payment UI is dismissed with an error.
         */
        public oncancel: (event: Event) => void;

        /**
         * A callback function that is automatically called when the user has authorized the Apple Pay payment, typically via TouchID.
         */
        public onpaymentauthorized: (event: ApplePayPaymentAuthorizedEvent) => void;

        /**
         * A callback function that is automatically called when a new payment method is selected.
         */
        public onpaymentmethodselected: (event: ApplePayPaymentMethodSelectedEvent) => void;

        /**
         * A callback function that is called when a shipping contact is selected in the payment sheet.
         */
        public onshippingcontactselected: (event: ApplePayShippingContactSelectedEvent) => void;

        /**
         * A callback function that is automatically called when a shipping method is selected.
         */
        public onshippingmethodselected: (event: ApplePayShippingMethodSelectedEvent) => void;

        /**
         * A callback function that is automatically called when the payment sheet is displayed.
         */
        public onvalidatemerchant: (event: ApplePayValidateMerchantEvent) => void;

        /**
         * Indicates whether or not the device supports Apple Pay.
         * @returns true if the device supports making payments with Apple Pay; otherwise, false.
         */
        public static canMakePayments(): boolean;

        /**
         * Indicates whether or not the device supports Apple Pay and if the user has an active card in Wallet.
         * @param merchantIdentifier - The merchant ID received when the merchant enrolled in Apple Pay.
         * @returns true if the device supports Apple Pay and there is at least one active card in Wallet; otherwise, false.
         */
        public static canMakePaymentsWithActiveCard(merchantIdentifier: string): Promise<boolean>;

        /**
         * Displays the Set up Apple Pay button.
         * @param merchantIdentifier - The merchant ID received when the merchant enrolled in Apple Pay.
         * @returns A boolean value indicating whether setup was successful.
         */
        public static openPaymentSetup(merchantIdentifier: string): Promise<boolean>;

        /**
         * Verifies if a web browser supports a given Apple Pay JS API version.
         * @param version - A number representing the Apple Pay JS API version being checked. The initial version is 1.
         * @returns A boolean value indicating whether the web browser supports the given API version. Returns false if the web browser does not support the specified version.
         */
        public static supportsVersion(version: number): boolean;

        /**
         * Aborts the current Apple Pay session.
         */
        public abort(): void;

        /**
         * Begins the merchant validation process.
         */
        public begin(): void;

        /**
         * Call after the merchant has been validated.
         * @param merchantSession - An opaque message session object.
         */
        public completeMerchantValidation(merchantSession: any): void;

        /**
         * Call when a payment has been authorized.
         * @param status - The status of the payment.
         */
        public completePayment(status: number): void;

        /**
         * Call after a payment method has been selected.
         * @param newTotal - An Apple​Pay​Line​Item dictionary representing the total price for the purchase.
         * @param newLineItems - A sequence of Apple​Pay​Line​Item dictionaries.
         */
        public completePaymentMethodSelection(newTotal: ApplePayLineItem, newLineItems: ApplePayLineItem[]): void;

        /**
         * Call after a shipping contact has been selected.
         * @param status - The status of the shipping contact update.
         * @param newShippingMethods - A sequence of ApplePayShippingMethod dictionaries.
         * @param newTotal - An Apple​Pay​Line​Item dictionary representing the total price for the purchase.
         * @param newLineItems - A sequence of Apple​Pay​Line​Item dictionaries.
         */
        public completeShippingContactSelection(
            status: number,
            newShippingMethods: ApplePayShippingMethod[],
            newTotal: ApplePayLineItem,
            newLineItems: ApplePayLineItem[]): void;

        /**
         * Call after the shipping method has been selected.
         * @param status - The status of the shipping method update.
         * @param newTotal - An Apple​Pay​Line​Item dictionary representing the total price for the purchase.
         * @param newLineItems - A sequence of Apple​Pay​Line​Item dictionaries.
         */
        public completeShippingMethodSelection(status: number, newTotal: ApplePayLineItem, newLineItems: ApplePayLineItem[]): void;

        /**
         * The requested action succeeded.
         */
        public static readonly STATUS_SUCCESS: number;

        /**
         * The requested action failed.
         */
        public static readonly STATUS_FAILURE: number;

        /**
         * The billing address is not valid.
         */
        public static readonly STATUS_INVALID_BILLING_POSTAL_ADDRESS: number;

        /**
         * The shipping address is not valid.
         */
        public static readonly STATUS_INVALID_SHIPPING_POSTAL_ADDRESS: number;

        /**
         * The shipping contact information is not valid.
         */
        public static readonly STATUS_INVALID_SHIPPING_CONTACT: number;

        /**
         * The PIN information is not valid. Cards on the China Union Pay network may require a PIN.
         */
        public static readonly STATUS_PIN_INCORRECT: number;

        /**
         * The maximum number of tries for a PIN has been reached and the user has been locked out. Cards on the China Union Pay network may require a PIN.
         */
        public static readonly STATUS_PIN_LOCKOUT: number;

        /**
         * The required PIN information was not provided. Cards on the China Union Pay payment network may require a PIN to authenticate the transaction.
         */
        public static readonly STATUS_PIN_REQUIRED: number;
    }

    /**
     * The Apple​Pay​Validate​Merchant​Event class defines the attributes contained by the ApplePaySession.onvalidatemerchant callback function.
     */
    class ApplePayValidateMerchantEvent extends Event {

        /**
         * The URL used to validate the merchant server.
         */
        public readonly validationURL: string;
    }

    abstract class Event {

        public readonly bubbles: boolean;

        public cancelBubble: boolean;

        public readonly cancelable: boolean;

        public readonly composed: boolean;

        public readonly currentTarget: EventTarget;

        public readonly defaultPrevented: boolean;

        public readonly eventPhase: number;

        public readonly isTrusted: boolean;

        public returnValue: boolean;

        public readonly srcElement: EventTarget;

        public readonly target: EventTarget;

        public readonly timeStamp: string;

        public readonly type: string;

        public composedPath(): Node[];

        public initEvent(type?: string, bubbles?: boolean, cancelable?: boolean): void;

        public preventDefault(): void;

        public stopImmediatePropagation(): void;

        public stopPropagation(): void;

        public static readonly AT_TARGET: number;

        public static readonly BLUR: number;

        public static readonly BUBBLING_PHASE: number;

        public static readonly CAPTURING_PHASE: number;

        public static readonly CHANGE: number;

        public static readonly CLICK: number;

        public static readonly DBLCLICK: number;

        public static readonly DRAGDROP: number;

        public static readonly FOCUS: number;

        public static readonly KEYDOWN: number;

        public static readonly KEYPRESS: number;

        public static readonly KEYUP: number;

        public static readonly MOUSEDOWN: number;

        public static readonly MOUSEDRAG: number;

        public static readonly MOUSEMOVE: number;

        public static readonly MOUSEOUT: number;

        public static readonly MOUSEOVER: number;

        public static readonly MOUSEUP: number;

        public static readonly NONE: number;

        public static readonly SELECT: number;
    }
}
