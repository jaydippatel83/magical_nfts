import type { Schema } from 'borsh';
import type { Decoded } from "./utils";
import { PublicKey } from "@solana/web3.js";
export interface MagicalNftMetadata {
    name: string;
    symbol: string;
    image: string;
    animationUrl: string;
    externalUrl: string;
    description: string;
    category: string;
    mint: PublicKey;
    authority: PublicKey;
    assocAccount: PublicKey | undefined;
}
export declare const decodeMagicalNftMetadata: (decoded: Decoded) => MagicalNftMetadata;
export declare const MagicalNftMetadataSchema: Schema;
export declare namespace CslSplTokenTypes {
    interface Mint {
        mintAuthority: PublicKey;
        supply: bigint;
        decimals: number;
        isInitialized: boolean;
        freezeAuthority: PublicKey;
    }
    const decodeMint: (decoded: Decoded) => Mint;
    const MintSchema: Schema;
    interface Account {
        mint: PublicKey;
        owner: PublicKey;
        amount: bigint;
        delegate: PublicKey;
        state: number;
        isNative: bigint;
        delegatedAmount: bigint;
        closeAuthority: PublicKey;
    }
    const decodeAccount: (decoded: Decoded) => Account;
    const AccountSchema: Schema;
}
