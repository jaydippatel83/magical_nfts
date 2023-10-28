import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, } from "@solana/web3.js";
import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";
import {
    CslSplTokenPDAs,
    deriveMagicalNftMetadataPDA,
    getMagicalNftMetadata,
    initializeClient,
    mintSendAndConfirm,
    transferSendAndConfirm,
} from "./index";
import { getMinimumBalanceForRentExemptAccount, getMint, TOKEN_PROGRAM_ID, } from "@solana/spl-token";

async function main(feePayer: Keypair) {
    const args = process.argv.slice(2);
    const connection = new Connection("https://api.devnet.solana.com", {
        commitment: "confirmed",
    });

    const progId = new PublicKey(args[0]!);

    initializeClient(progId, connection);
    console.log(feePayer, "feePayer");


    /**
     * Create a keypair for the mint
     */
    const mint = Keypair.generate();
    console.info("+==== Mint Address  ====+");
    console.info(mint.publicKey.toBase58());

    /**
     * Create two wallets
     */
    const johnDoeWallet = Keypair.generate();
    console.info("+==== John Doe Wallet ====+");
    console.info(johnDoeWallet.publicKey.toBase58());

    const janeDoeWallet = Keypair.generate();
    console.info("+==== Jane Doe Wallet ====+");
    console.info(janeDoeWallet.publicKey.toBase58());

    const [gemPub] = deriveMagicalNftMetadataPDA(
        {
            mint: mint.publicKey,
        },
        progId,
    );

    const rent = await getMinimumBalanceForRentExemptAccount(connection);
    await sendAndConfirmTransaction(
        connection,
        new Transaction()
            .add(
                SystemProgram.createAccount({
                    fromPubkey: feePayer.publicKey,
                    newAccountPubkey: johnDoeWallet.publicKey,
                    space: 0,
                    lamports: rent,
                    programId: SystemProgram.programId,
                }),
            )
            .add(
                SystemProgram.createAccount({
                    fromPubkey: feePayer.publicKey,
                    newAccountPubkey: janeDoeWallet.publicKey,
                    space: 0,
                    lamports: rent,
                    programId: SystemProgram.programId,
                }),
            ),
        [feePayer, johnDoeWallet, janeDoeWallet],
    );

    /**
     * Derive the Gem Metadata so we can retrieve it later
     */

    /**
     * Derive the John Doe's Associated Token Account, this account will be
     * holding the minted NFT.
     */
    const [johnDoeATA] = CslSplTokenPDAs.deriveAccountPDA({
        wallet: johnDoeWallet.publicKey,
        mint: mint.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
    });
    console.info("+==== John Doe ATA ====+");
    console.info(johnDoeATA.toBase58());

    /**
     * Derive the Jane Doe's Associated Token Account, this account will be
     * holding the minted NFT when John Doe transfer it
     */
    const [janeDoeATA] = CslSplTokenPDAs.deriveAccountPDA({
        wallet: janeDoeWallet.publicKey,
        mint: mint.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
    });
    console.info("+==== Jane Doe ATA ====+");
    console.info(janeDoeATA.toBase58());

    /**
     * Mint a new NFT into John's wallet (technically, the Associated Token Account)
     */
    console.info("+==== Minting... ====+");
    const dd = {
        animationUrl: "animationUrl",
        assocTokenAccount: johnDoeATA,
        category: "category",
        description: "description",
        externalUrl: "externalUrl",
        image: "https://superfun.infura-ipfs.io/ipfs/",
        name: "title",
        symbol: "symbol",
        wallet: johnDoeWallet.publicKey,
        signers: {
            feePayer: feePayer,
            funding: feePayer,
            mint: mint,
            owner: johnDoeWallet,
        }
    }

    console.log(dd, "ddddd");
    await mintSendAndConfirm({
        // wallet: johnDoeWallet.publicKey,
        // assocTokenAccount: johnDoeATA,
        // color: "Purple",
        // rarity: "Rare",
        // shortDescription: "Only possible to collect from the lost temple event",
        // signers: {
        //     feePayer: feePayer,
        //     funding: feePayer,
        //     mint: mint,
        //     owner: johnDoeWallet,
        // },
        animationUrl: "animationUrl",
        assocTokenAccount: johnDoeATA,
        category: "category",
        description: "description",
        externalUrl: "externalUrl",
        image: "https://superfun.infura-ipfs.io/ipfs/",
        name: "title",
        symbol: "symbol",
        wallet: johnDoeWallet.publicKey,
        signers: {
            feePayer: feePayer,
            funding: feePayer,
            mint: mint,
            owner: johnDoeWallet,
        }
    });
    console.info("+==== Minted ====+");

    /**
     * Get the minted token
     */
    let mintAccount = await getMint(connection, mint.publicKey);
    console.info("+==== Mint ====+");
    console.info(mintAccount);

    /**
     * Get the Gem Metadata
     */
    let gem = await getMagicalNftMetadata(gemPub);
    console.info("+==== Gem Metadata ====+");
    console.info(gem);
    console.assert(gem!.assocAccount!.toBase58(), johnDoeATA.toBase58());


}

fs.readFile(path.join(os.homedir(), ".config/solana/id.json")).then((file) => {

    console.log(file, "file");

    main(Keypair.fromSecretKey(new Uint8Array(JSON.parse(file.toString()))));
}
);
