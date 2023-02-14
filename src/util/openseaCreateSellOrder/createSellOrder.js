import {BigNumber} from "bignumber.js";
import {WyvernProtocol} from "wyvern-js";
import {
    CK_ADDRESS,
    CONDUIT_KEYS_TO_CONDUIT,
    DEFAULT_BUYER_FEE_BASIS_POINTS,
    DEFAULT_GAS_INCREASE_FACTOR,
    DEFAULT_MAX_BOUNTY,
    DEFAULT_SELLER_FEE_BASIS_POINTS,
    DEFAULT_WRAPPED_NFT_LIQUIDATION_UNISWAP_SLIPPAGE_IN_BASIS_POINTS,
    EIP_712_ORDER_TYPES,
    EIP_712_WYVERN_DOMAIN_NAME,
    EIP_712_WYVERN_DOMAIN_VERSION,
    ENJIN_COIN_ADDRESS,
    INVERSE_BASIS_POINT,
    MANA_ADDRESS,
    MIN_EXPIRATION_MINUTES,
    NULL_ADDRESS,
    NULL_BLOCK_HASH,
    CROSS_CHAIN_DEFAULT_CONDUIT_KEY,
    OPENSEA_FEE_RECIPIENT,
    OPENSEA_SELLER_BOUNTY_BASIS_POINTS,
    DEFAULT_ZONE_BY_NETWORK,
    ORDER_MATCHING_LATENCY_SECONDS,
    RPC_URL_PATH,
    UNISWAP_FACTORY_ADDRESS_MAINNET,
    UNISWAP_FACTORY_ADDRESS_RINKEBY,
    WETH_ADDRESS_BY_NETWORK,
    WRAPPED_NFT_FACTORY_ADDRESS_MAINNET,
    WRAPPED_NFT_FACTORY_ADDRESS_RINKEBY,
    WRAPPED_NFT_LIQUIDATION_PROXY_ADDRESS_MAINNET,
    WRAPPED_NFT_LIQUIDATION_PROXY_ADDRESS_RINKEBY,
    OPENSEA_LEGACY_FEE_RECIPIENT,
} from "opensea-js/lib/constants";
import {
    CanonicalWETH,
    ERC20,
    ERC721,
    getMethod,
    UniswapFactory,
    WrappedNFT,
    WrappedNFTFactory,
    WrappedNFTLiquidationProxy,
    UniswapExchange,
} from "opensea-js/lib/contracts";
import {
    MAX_ERROR_LENGTH,
    requireOrderCalldataCanMatch,
    requireOrdersCanMatch,
} from "opensea-js/lib/debugging";
import {
    constructPrivateListingCounterOrder,
    getPrivateListingConsiderations,
    getPrivateListingFulfillments,
} from "opensea-js/lib/orders/privateListings";
import {
    Asset,
    ComputedFees,
    ECSignature,
    EventData,
    EventType,
    Fees,
    FeeMethod,
    HowToCall,
    Network,
    OpenSeaAPIConfig,
    OpenSeaAsset,
    OpenSeaFungibleToken,
    Order,
    OrderSide,
    PartialReadonlyContractAbi,
    RawWyvernOrderJSON,
    SaleKind,
    TokenStandardVersion,
    UnhashedOrder,
    UnsignedOrder,
    WyvernAsset,
    WyvernAtomicMatchParameters,
    WyvernFTAsset,
    WyvernNFTAsset,
    WyvernSchemaName,
} from "opensea-js/lib/types";
import {
    encodeAtomicizedBuy,
    encodeAtomicizedSell,
    encodeAtomicizedTransfer,
    encodeBuy,
    encodeCall,
    encodeProxyCall,
    encodeSell,
    encodeTransferCall,
} from "opensea-js/lib/utils/schema";
import {
    annotateERC20TransferABI,
    annotateERC721TransferABI,
    assignOrdersToSides,
    confirmTransaction,
    delay,
    estimateCurrentPrice,
    estimateGas,
    getCurrentGasPrice,
    getNonCompliantApprovalAddress,
    getTransferFeeSettings,
    getWyvernAsset,
    makeBigNumber,
    merkleValidatorByNetwork,
    onDeprecated,
    rawCall,
    sendRawTransaction,
    signTypedDataAsync,
    validateAndFormatWalletAddress,
    getMaxOrderExpirationTimestamp,
    hasErrorCode,
    getAssetItemType,
    BigNumberInput,
    getAddressAfterRemappingSharedStorefrontAddressToLazyMintAdapterAddress,
    feesToBasisPoints,
} from "opensea-js/lib/utils/utils";
import {OrderType} from "@opensea/seaport-js/lib/constants";

export class createSellOrderSDK {
    constructor(openseaSDK, web3) {
        // this.openseaSDK = openseaSDK
        this.seaport = openseaSDK.seaport
        this.api = openseaSDK.api
        this.web3 = web3
    }

    /**
     * Create a sell order to auction an asset.
     * @param options Options for creating the sell order
     * @param options.asset The asset to trade
     * @param options.accountAddress Address of the maker's wallet
     * @param options.startAmount Price of the asset at the start of the auction. Units are in the amount of a token above the token's decimal places (integer part). For example, for ether, expected units are in ETH, not wei.
     * @param options.endAmount Optional price of the asset at the end of its expiration time. Units are in the amount of a token above the token's decimal places (integer part). For example, for ether, expected units are in ETH, not wei.
     * @param options.quantity The number of assets to sell (if fungible or semi-fungible). Defaults to 1. In units, not base units, e.g. not wei.
     * @param options.domain An optional domain to be hashed and included in the first four bytes of the random salt.
     * @param options.salt Arbitrary salt. If not passed in, a random salt will be generated with the first four bytes being the domain hash or empty.
     * @param options.listingTime Optional time when the order will become fulfillable, in UTC seconds. Undefined means it will start now.
     * @param options.expirationTime Expiration time for the order, in UTC seconds.
     * @param options.paymentTokenAddress Address of the ERC-20 token to accept in return. If undefined or null, uses Ether.
     * @param options.buyerAddress Optional address that's allowed to purchase this item. If specified, no other address will be able to take the order, unless its value is the null address.
     */
    async createSellOrder({
                                     asset,
                                     accountAddress,
                                     startAmount,
                                     endAmount,
                                     quantity = 1,
                                     domain,
                                     salt,
                                     listingTime,
                                     expirationTime,
                                     paymentTokenAddress = NULL_ADDRESS,
                                     buyerAddress,
                                 }
    //                              : {
    //     asset: Asset;
    //     accountAddress: string;
    //     startAmount: BigNumberInput;
    //     endAmount?: BigNumberInput;
    //     quantity?: BigNumberInput;
    //     domain?: string;
    //     salt?: string;
    //     listingTime?: string;
    //     expirationTime?: BigNumberInput;
    //     paymentTokenAddress?: string;
    //     buyerAddress?: string;
    // }
    ){
        if (!asset.tokenId) {
            throw new Error("Asset must have a tokenId");
        }

        const openseaAsset = await this.api.getAsset(asset);
        console.log(openseaAsset)
        const offerAssetItems = this.getAssetItems(
            [openseaAsset],
            [makeBigNumber(quantity)]
        );

        const {basePrice, endPrice} = await this._getPriceParameters(
            OrderSide.Sell,
            paymentTokenAddress,
            makeBigNumber(expirationTime ?? getMaxOrderExpirationTimestamp()),
            makeBigNumber(startAmount),
            endAmount !== undefined ? makeBigNumber(endAmount) : undefined
        );

        const {
            sellerFee,
            openseaSellerFee,
            collectionSellerFees: collectionSellerFees,
        } = await this.getFees({
            asset: openseaAsset,
            paymentTokenAddress,
            startAmount: basePrice,
            endAmount: endPrice,
        });
        const considerationFeeItems = [
            sellerFee,
            openseaSellerFee,
            ...collectionSellerFees,
        ];

        if (buyerAddress) {
            considerationFeeItems.push(
                ...getPrivateListingConsiderations(offerAssetItems, buyerAddress)
            );
        }
        console.log({
            offer: offerAssetItems,
            consideration: considerationFeeItems,
            startTime: listingTime,
            endTime:
              expirationTime?.toString() ??
              getMaxOrderExpirationTimestamp().toString(),
            zone: DEFAULT_ZONE_BY_NETWORK[process.env.VUE_APP_NETWORKNAME],
            domain,
            salt,
            restrictedByZone: true,
            allowPartialFills: true,
        })
        const order1 = await this.seaport.createOrder(
            {
                offer: offerAssetItems,
                consideration: considerationFeeItems,
                startTime: listingTime,
                orderType: OrderType.FULL_OPEN,
                endTime:
                    expirationTime?.toString() ??
                    getMaxOrderExpirationTimestamp().toString(),
                zone: DEFAULT_ZONE_BY_NETWORK[process.env.VUE_APP_NETWORKNAME],
                domain,
                salt,
                restrictedByZone: true,
                allowPartialFills: true,
            },
            accountAddress
        );
        console.log(order1)
        const order = await order1.executeAllActions();
        console.log(order)
        // return order
        return this.api.postOrder(order, {protocol: "seaport", side: "ask"});
    }

    // useing
    getAssetItems(
        assets,
        quantities,
        fallbackSchema
    ) {
        return assets.map((asset, index) => ({
            itemType: getAssetItemType(this._getSchemaName(asset) ?? fallbackSchema),
            token:
                getAddressAfterRemappingSharedStorefrontAddressToLazyMintAdapterAddress(
                    asset.tokenAddress
                ),
            identifier: asset.tokenId ?? undefined,
            amount: quantities[index].toString() ?? "1",
        }));
    }

    // useing
    _getSchemaName(asset) {
        if (asset.schemaName) {
            return asset.schemaName;
        } else if ("assetContract" in asset) {
            return asset.assetContract.schemaName;
        }

        return undefined;
    }

    /**
     * useing
     * Compute the `basePrice` and `extra` parameters to be used to price an order.
     * Also validates the expiration time and auction type.
     * @param orderSide
     * @param tokenAddress Address of the ERC-20 token to use for trading.
     * Use the null address for ETH
     * @param expirationTime When the auction expires, or 0 if never.
     * @param startAmount The base value for the order, in the token's main units (e.g. ETH instead of wei)
     * @param endAmount The end value for the order, in the token's main units (e.g. ETH instead of wei). If unspecified, the order's `extra` attribute will be 0
     * @param waitingForBestCounterOrder
     * @param englishAuctionReservePrice
     */
    async _getPriceParameters(
        orderSide,
        tokenAddress,
        expirationTime,
        startAmount,
        endAmount,
        waitingForBestCounterOrder = false,
        englishAuctionReservePrice
    ) {
        const priceDiff =
            endAmount != null ? startAmount.minus(endAmount) : new BigNumber(0);
        const paymentToken = tokenAddress.toLowerCase();
        const isEther = tokenAddress == NULL_ADDRESS;
        const { tokens } = await this.api.getPaymentTokens({
            address: paymentToken
        });
        const token = tokens[0];

        // Validation
        if (startAmount.isNaN() || startAmount == null || startAmount.lt(0)) {
            throw new Error(`Starting price must be a number >= 0`);
        }
        if (!isEther && !token) {
            throw new Error(`No ERC-20 token found for '${paymentToken}'`);
        }
        if (isEther && waitingForBestCounterOrder) {
            throw new Error(
                `English auctions must use wrapped ETH or an ERC-20 token.`
            );
        }
        if (isEther && orderSide === OrderSide.Buy) {
            throw new Error(`Offers must use wrapped ETH or an ERC-20 token.`);
        }
        if (priceDiff.lt(0)) {
            throw new Error(
                "End price must be less than or equal to the start price."
            );
        }
        if (priceDiff.gt(0) && expirationTime.eq(0)) {
            throw new Error(
                "Expiration time must be set if order will change in price."
            );
        }
        if (
            englishAuctionReservePrice &&
            !englishAuctionReservePrice.isZero() &&
            !waitingForBestCounterOrder
        ) {
            throw new Error("Reserve prices may only be set on English auctions.");
        }
        if (
            englishAuctionReservePrice &&
            !englishAuctionReservePrice.isZero() &&
            englishAuctionReservePrice < startAmount
        ) {
            throw new Error(
                "Reserve price must be greater than or equal to the start amount."
            );
        }

        // Note: WyvernProtocol.toBaseUnitAmount(makeBigNumber(startAmount), token.decimals)
        // will fail if too many decimal places, so special-case ether
        const basePrice = isEther
            ? makeBigNumber(
                this.web3.utils.toWei(startAmount.toString(), "ether")
            ).integerValue()
            : WyvernProtocol.toBaseUnitAmount(startAmount, token.decimals);

        const endPrice = endAmount
            ? isEther
                ? makeBigNumber(
                    this.web3.utils.toWei(endAmount.toString(), "ether")
                ).integerValue()
                : WyvernProtocol.toBaseUnitAmount(endAmount, token.decimals)
            : undefined;

        const extra = isEther
            ? makeBigNumber(
                this.web3.utils.toWei(priceDiff.toString(), "ether")
            ).integerValue()
            : WyvernProtocol.toBaseUnitAmount(priceDiff, token.decimals);

        const reservePrice = englishAuctionReservePrice
            ? isEther
                ? makeBigNumber(
                    this.web3.utils.toWei(
                        englishAuctionReservePrice.toString(),
                        "ether"
                    )
                ).integerValue()
                : WyvernProtocol.toBaseUnitAmount(
                    englishAuctionReservePrice,
                    token.decimals
                )
            : undefined;

        return { basePrice, extra, paymentToken, reservePrice, endPrice };
    }
    async getFees({
                      asset,
                              paymentTokenAddress,
                              startAmount,
                              endAmount,
                          }){
        // Seller fee basis points
        const openseaSellerFeeBasisPoints = DEFAULT_SELLER_FEE_BASIS_POINTS;
        const collectionSellerFeeBasisPoints = feesToBasisPoints(
            asset.collection.fees?.sellerFees
        );

        // Seller basis points
        const sellerBasisPoints =
            INVERSE_BASIS_POINT -
            openseaSellerFeeBasisPoints -
            collectionSellerFeeBasisPoints;

        const getConsiderationItem = (basisPoints, recipient) => {
            return {
                token: paymentTokenAddress,
                amount: this.getAmountWithBasisPointsApplied(startAmount, basisPoints),
                endAmount: this.getAmountWithBasisPointsApplied(
                    endAmount ?? startAmount,
                    basisPoints
                ),
                recipient,
            };
        };

        const getConsiderationItemsFromSellerFees = (
            fees
        ) => {
            const sellerFees = fees.sellerFees;
            return Array.from(sellerFees.entries()).map(
                ([recipient, basisPoints]) => {
                    return getConsiderationItem(basisPoints, recipient);
                }
            );
        };

        return {
            sellerFee: getConsiderationItem(sellerBasisPoints),
            openseaSellerFee: getConsiderationItem(
                openseaSellerFeeBasisPoints,
                OPENSEA_FEE_RECIPIENT
            ),
            collectionSellerFees:
                collectionSellerFeeBasisPoints > 0 && asset.collection.fees
                    ? getConsiderationItemsFromSellerFees(asset.collection.fees)
                    : [],
        };
    }

    getAmountWithBasisPointsApplied = (
        amount,
        basisPoints
    ) => {
        return amount
            .multipliedBy(basisPoints)
            .dividedBy(INVERSE_BASIS_POINT)
            .toString();
    };
}
