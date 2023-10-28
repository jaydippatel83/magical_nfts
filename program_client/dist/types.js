"use strict";
// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CslSplTokenTypes = exports.MagicalNftMetadataSchema = exports.decodeMagicalNftMetadata = void 0;
const web3_js_1 = require("@solana/web3.js");
const decodeMagicalNftMetadata = (decoded) => ({
    name: decoded["name"],
    symbol: decoded["symbol"],
    image: decoded["image"],
    animationUrl: decoded["animation_url"],
    externalUrl: decoded["external_url"],
    description: decoded["description"],
    category: decoded["category"],
    mint: new web3_js_1.PublicKey(decoded["mint"]),
    authority: new web3_js_1.PublicKey(decoded["authority"]),
    assocAccount: decoded["assoc_account"] ? new web3_js_1.PublicKey(decoded["assoc_account"]) : undefined,
});
exports.decodeMagicalNftMetadata = decodeMagicalNftMetadata;
exports.MagicalNftMetadataSchema = {
    struct: {
        name: "string",
        symbol: "string",
        image: "string",
        animation_url: "string",
        external_url: "string",
        description: "string",
        category: "string",
        mint: { array: { type: "u8", len: 32 } },
        authority: { array: { type: "u8", len: 32 } },
        assoc_account: { option: { array: { type: "u8", len: 32 } } },
    }
};
var CslSplTokenTypes;
(function (CslSplTokenTypes) {
    CslSplTokenTypes.decodeMint = (decoded) => ({
        mintAuthority: new web3_js_1.PublicKey(decoded["mint_authority"]),
        supply: decoded["supply"],
        decimals: decoded["decimals"],
        isInitialized: decoded["is_initialized"],
        freezeAuthority: new web3_js_1.PublicKey(decoded["freeze_authority"]),
    });
    CslSplTokenTypes.MintSchema = {
        struct: {
            mint_authority: { array: { type: "u8", len: 32 } },
            supply: "u64",
            decimals: "u8",
            is_initialized: "bool",
            freeze_authority: { array: { type: "u8", len: 32 } },
        }
    };
    CslSplTokenTypes.decodeAccount = (decoded) => ({
        mint: new web3_js_1.PublicKey(decoded["mint"]),
        owner: new web3_js_1.PublicKey(decoded["owner"]),
        amount: decoded["amount"],
        delegate: new web3_js_1.PublicKey(decoded["delegate"]),
        state: decoded["state"],
        isNative: decoded["is_native"],
        delegatedAmount: decoded["delegated_amount"],
        closeAuthority: new web3_js_1.PublicKey(decoded["close_authority"]),
    });
    CslSplTokenTypes.AccountSchema = {
        struct: {
            mint: { array: { type: "u8", len: 32 } },
            owner: { array: { type: "u8", len: 32 } },
            amount: "u64",
            delegate: { array: { type: "u8", len: 32 } },
            state: "u8",
            is_native: "u64",
            delegated_amount: "u64",
            close_authority: { array: { type: "u8", len: 32 } },
        }
    };
})(CslSplTokenTypes || (exports.CslSplTokenTypes = CslSplTokenTypes = {}));
