"use strict";
// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CslSplTokenPDAs = exports.deriveMagicalNftMetadataPDA = void 0;
const web3_js_1 = require("@solana/web3.js");
const deriveMagicalNftMetadataPDA = (seeds, programId) => {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from("metadata"),
        seeds.mint.toBuffer(),
    ], programId);
};
exports.deriveMagicalNftMetadataPDA = deriveMagicalNftMetadataPDA;
var CslSplTokenPDAs;
(function (CslSplTokenPDAs) {
    CslSplTokenPDAs.deriveAccountPDA = (seeds) => {
        return web3_js_1.PublicKey.findProgramAddressSync([
            seeds.wallet.toBuffer(),
            seeds.tokenProgram.toBuffer(),
            seeds.mint.toBuffer(),
        ], new web3_js_1.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"));
    };
})(CslSplTokenPDAs || (exports.CslSplTokenPDAs = CslSplTokenPDAs = {}));
