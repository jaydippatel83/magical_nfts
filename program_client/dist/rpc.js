"use strict";
// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CslSplTokenGetters = exports.getMagicalNftMetadata = exports.transferSendAndConfirm = exports.transfer = exports.mintSendAndConfirm = exports.mint = exports.NftInstruction = exports.initializeClient = void 0;
const pda = __importStar(require("./pda"));
const T = __importStar(require("./types"));
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
let _programId;
let _connection;
const initializeClient = (programId, connection) => {
    _programId = programId;
    _connection = connection;
};
exports.initializeClient = initializeClient;
var NftInstruction;
(function (NftInstruction) {
    /**
     * Accounts:
     * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
     * 1. `[writable, signer]` mint: {@link Mint}
     * 2. `[writable]` metadata: {@link MagicalNftMetadata}
     * 3. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
     * 4. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
     * 5. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
     * 6. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
     * 7. `[]` token_program: {@link PublicKey} SPL Token program
     * 8. `[signer]` owner: {@link PublicKey} The mint's minting authority.
     * 9. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
     * 10. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
     *
     * Data:
     * - name: {@link string}
     * - symbol: {@link string}
     * - image: {@link string}
     * - animation_url: {@link string}
     * - external_url: {@link string}
     * - description: {@link string} type
     * - category: {@link string}
     */
    NftInstruction[NftInstruction["Mint"] = 0] = "Mint";
    /**
     * Accounts:
     * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
     * 1. `[]` mint: {@link Mint}
     * 2. `[writable]` metadata: {@link MagicalNftMetadata}
     * 3. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
     * 4. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
     * 5. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
     * 6. `[]` system_program: {@link PublicKey} System program
     * 7. `[]` token_program: {@link PublicKey} SPL Token program
     * 8. `[writable]` source: {@link PublicKey} The source account.
     * 9. `[writable]` destination: {@link PublicKey} The destination account.
     * 10. `[signer]` authority: {@link PublicKey} The source account's owner/delegate.
     * 11. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
     * 12. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
     */
    NftInstruction[NftInstruction["Transfer"] = 1] = "Transfer";
})(NftInstruction || (exports.NftInstruction = NftInstruction = {}));
/**
 * ### Returns a {@link TransactionInstruction}
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[writable, signer]` mint: {@link Mint}
 * 2. `[writable]` metadata: {@link MagicalNftMetadata}
 * 3. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 * 4. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 5. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 6. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 7. `[]` token_program: {@link PublicKey} SPL Token program
 * 8. `[signer]` owner: {@link PublicKey} The mint's minting authority.
 * 9. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 * 10. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 *
 * Data:
 * - name: {@link string}
 * - symbol: {@link string}
 * - image: {@link string}
 * - animation_url: {@link string}
 * - external_url: {@link string}
 * - description: {@link string} type
 * - category: {@link string}
 */
const mint = (args) => {
    const data = (0, borsh_1.serialize)({
        struct: {
            id: "u8",
            name: "string",
            symbol: "string",
            image: "string",
            animation_url: "string",
            external_url: "string",
            description: "string",
            category: "string",
        },
    }, {
        id: NftInstruction.Mint,
        name: args.name,
        symbol: args.symbol,
        image: args.image,
        animation_url: args.animationUrl,
        external_url: args.externalUrl,
        description: args.description,
        category: args.category,
    });
    const [metadataPubkey] = pda.deriveMagicalNftMetadataPDA({
        mint: args.mint,
    }, _programId);
    return new web3_js_1.TransactionInstruction({
        data: Buffer.from(data),
        keys: [
            { pubkey: args.feePayer, isSigner: true, isWritable: true },
            { pubkey: args.mint, isSigner: true, isWritable: true },
            { pubkey: metadataPubkey, isSigner: false, isWritable: true },
            { pubkey: new web3_js_1.PublicKey("11111111111111111111111111111111"), isSigner: false, isWritable: false },
            { pubkey: args.funding, isSigner: true, isWritable: true },
            { pubkey: args.assocTokenAccount, isSigner: false, isWritable: true },
            { pubkey: args.wallet, isSigner: false, isWritable: false },
            { pubkey: new web3_js_1.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false },
            { pubkey: args.owner, isSigner: true, isWritable: false },
            { pubkey: new web3_js_1.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false },
            { pubkey: new web3_js_1.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"), isSigner: false, isWritable: false },
        ],
        programId: _programId,
    });
};
exports.mint = mint;
/**
 * ### Returns a {@link TransactionSignature}
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[writable, signer]` mint: {@link Mint}
 * 2. `[writable]` metadata: {@link MagicalNftMetadata}
 * 3. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 * 4. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 5. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 6. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 7. `[]` token_program: {@link PublicKey} SPL Token program
 * 8. `[signer]` owner: {@link PublicKey} The mint's minting authority.
 * 9. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 * 10. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 *
 * Data:
 * - name: {@link string}
 * - symbol: {@link string}
 * - image: {@link string}
 * - animation_url: {@link string}
 * - external_url: {@link string}
 * - description: {@link string} type
 * - category: {@link string}
 */
const mintSendAndConfirm = async (args) => {
    const trx = new web3_js_1.Transaction();
    trx.add((0, exports.mint)({
        ...args,
        feePayer: args.signers.feePayer.publicKey,
        mint: args.signers.mint.publicKey,
        funding: args.signers.funding.publicKey,
        owner: args.signers.owner.publicKey,
    }));
    return await (0, web3_js_1.sendAndConfirmTransaction)(_connection, trx, [args.signers.feePayer, args.signers.mint, args.signers.funding, args.signers.owner,]);
};
exports.mintSendAndConfirm = mintSendAndConfirm;
/**
 * ### Returns a {@link TransactionInstruction}
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` mint: {@link Mint}
 * 2. `[writable]` metadata: {@link MagicalNftMetadata}
 * 3. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 4. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 5. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 6. `[]` system_program: {@link PublicKey} System program
 * 7. `[]` token_program: {@link PublicKey} SPL Token program
 * 8. `[writable]` source: {@link PublicKey} The source account.
 * 9. `[writable]` destination: {@link PublicKey} The destination account.
 * 10. `[signer]` authority: {@link PublicKey} The source account's owner/delegate.
 * 11. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 * 12. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 */
const transfer = (args) => {
    const data = (0, borsh_1.serialize)({
        struct: {
            id: "u8",
        },
    }, {
        id: NftInstruction.Transfer,
    });
    const [metadataPubkey] = pda.deriveMagicalNftMetadataPDA({
        mint: args.mint,
    }, _programId);
    return new web3_js_1.TransactionInstruction({
        data: Buffer.from(data),
        keys: [
            { pubkey: args.feePayer, isSigner: true, isWritable: true },
            { pubkey: args.mint, isSigner: false, isWritable: false },
            { pubkey: metadataPubkey, isSigner: false, isWritable: true },
            { pubkey: args.funding, isSigner: true, isWritable: true },
            { pubkey: args.assocTokenAccount, isSigner: false, isWritable: true },
            { pubkey: args.wallet, isSigner: false, isWritable: false },
            { pubkey: new web3_js_1.PublicKey("11111111111111111111111111111111"), isSigner: false, isWritable: false },
            { pubkey: new web3_js_1.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false },
            { pubkey: args.source, isSigner: false, isWritable: true },
            { pubkey: args.destination, isSigner: false, isWritable: true },
            { pubkey: args.authority, isSigner: true, isWritable: false },
            { pubkey: new web3_js_1.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"), isSigner: false, isWritable: false },
            { pubkey: new web3_js_1.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false },
        ],
        programId: _programId,
    });
};
exports.transfer = transfer;
/**
 * ### Returns a {@link TransactionSignature}
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` mint: {@link Mint}
 * 2. `[writable]` metadata: {@link MagicalNftMetadata}
 * 3. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 4. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 5. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 6. `[]` system_program: {@link PublicKey} System program
 * 7. `[]` token_program: {@link PublicKey} SPL Token program
 * 8. `[writable]` source: {@link PublicKey} The source account.
 * 9. `[writable]` destination: {@link PublicKey} The destination account.
 * 10. `[signer]` authority: {@link PublicKey} The source account's owner/delegate.
 * 11. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 * 12. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 */
const transferSendAndConfirm = async (args) => {
    const trx = new web3_js_1.Transaction();
    trx.add((0, exports.transfer)({
        ...args,
        feePayer: args.signers.feePayer.publicKey,
        funding: args.signers.funding.publicKey,
        authority: args.signers.authority.publicKey,
    }));
    return await (0, web3_js_1.sendAndConfirmTransaction)(_connection, trx, [args.signers.feePayer, args.signers.funding, args.signers.authority,]);
};
exports.transferSendAndConfirm = transferSendAndConfirm;
// Getters
const getMagicalNftMetadata = async (publicKey, commitmentOrConfig = "processed") => {
    const buffer = await _connection.getAccountInfo(publicKey, commitmentOrConfig);
    if (!buffer) {
        return undefined;
    }
    if (buffer.data.length <= 0) {
        return undefined;
    }
    return T.decodeMagicalNftMetadata((0, borsh_1.deserialize)(T.MagicalNftMetadataSchema, buffer.data));
};
exports.getMagicalNftMetadata = getMagicalNftMetadata;
var CslSplTokenGetters;
(function (CslSplTokenGetters) {
    CslSplTokenGetters.getMint = async (publicKey, commitmentOrConfig = "processed") => {
        const buffer = await _connection.getAccountInfo(publicKey, commitmentOrConfig);
        if (!buffer) {
            return undefined;
        }
        if (buffer.data.length <= 0) {
            return undefined;
        }
        return T.CslSplTokenTypes.decodeMint((0, borsh_1.deserialize)(T.CslSplTokenTypes.MintSchema, buffer.data));
    };
    CslSplTokenGetters.getAccount = async (publicKey, commitmentOrConfig = "processed") => {
        const buffer = await _connection.getAccountInfo(publicKey, commitmentOrConfig);
        if (!buffer) {
            return undefined;
        }
        if (buffer.data.length <= 0) {
            return undefined;
        }
        return T.CslSplTokenTypes.decodeAccount((0, borsh_1.deserialize)(T.CslSplTokenTypes.AccountSchema, buffer.data));
    };
})(CslSplTokenGetters || (exports.CslSplTokenGetters = CslSplTokenGetters = {}));
// Websocket Events
