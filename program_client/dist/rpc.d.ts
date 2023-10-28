import * as T from "./types";
import { Commitment, Connection, GetAccountInfoConfig, Keypair, PublicKey, TransactionInstruction, TransactionSignature } from "@solana/web3.js";
export declare const initializeClient: (programId: PublicKey, connection: Connection) => void;
export declare enum NftInstruction {
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
    Mint = 0,
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
    Transfer = 1
}
export type MintArgs = {
    feePayer: PublicKey;
    mint: PublicKey;
    funding: PublicKey;
    assocTokenAccount: PublicKey;
    wallet: PublicKey;
    owner: PublicKey;
    name: string;
    symbol: string;
    image: string;
    animationUrl: string;
    externalUrl: string;
    description: string;
    category: string;
};
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
export declare const mint: (args: MintArgs) => TransactionInstruction;
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
export declare const mintSendAndConfirm: (args: Omit<MintArgs, "feePayer" | "mint" | "funding" | "owner"> & {
    signers: {
        feePayer: Keypair;
        mint: Keypair;
        funding: Keypair;
        owner: Keypair;
    };
}) => Promise<TransactionSignature>;
export type TransferArgs = {
    feePayer: PublicKey;
    mint: PublicKey;
    funding: PublicKey;
    assocTokenAccount: PublicKey;
    wallet: PublicKey;
    source: PublicKey;
    destination: PublicKey;
    authority: PublicKey;
};
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
export declare const transfer: (args: TransferArgs) => TransactionInstruction;
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
export declare const transferSendAndConfirm: (args: Omit<TransferArgs, "feePayer" | "funding" | "authority"> & {
    signers: {
        feePayer: Keypair;
        funding: Keypair;
        authority: Keypair;
    };
}) => Promise<TransactionSignature>;
export declare const getMagicalNftMetadata: (publicKey: PublicKey, commitmentOrConfig?: Commitment | GetAccountInfoConfig | undefined) => Promise<T.MagicalNftMetadata | undefined>;
export declare namespace CslSplTokenGetters {
    const getMint: (publicKey: PublicKey, commitmentOrConfig?: Commitment | GetAccountInfoConfig | undefined) => Promise<T.CslSplTokenTypes.Mint | undefined>;
    const getAccount: (publicKey: PublicKey, commitmentOrConfig?: Commitment | GetAccountInfoConfig | undefined) => Promise<T.CslSplTokenTypes.Account | undefined>;
}
