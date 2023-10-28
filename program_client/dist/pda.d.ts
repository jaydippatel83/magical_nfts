import { PublicKey } from "@solana/web3.js";
export type MagicalNftMetadataSeeds = {
    mint: PublicKey;
};
export declare const deriveMagicalNftMetadataPDA: (seeds: MagicalNftMetadataSeeds, programId: PublicKey) => [PublicKey, number];
export declare namespace CslSplTokenPDAs {
    type AccountSeeds = {
        wallet: PublicKey;
        tokenProgram: PublicKey;
        mint: PublicKey;
    };
    const deriveAccountPDA: (seeds: AccountSeeds) => [PublicKey, number];
}
