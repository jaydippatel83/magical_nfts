import React, { useEffect, useRef, useState } from "react";
import "tippy.js/dist/tippy.css"; // optional
import Meta from "../../components/Meta";
import OpenAI from "openai";
import { GAMESETS_NFT_CONTRACT, abi } from "../../constant/constant";
import { ethers } from "ethers";
import { SupercoolAuthContext } from "../../context/supercoolContext";
import { NFTStorage, File } from 'nft.storage'
import axios from "axios";
import Options from "../filterCategory/category";
import CircularProgress from '@mui/material/CircularProgress';
import ImageModal from "../modal/modal";
import RendersellNft from "../renderSellNft/renderSellNft";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, } from "@solana/web3.js";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import * as anchor from "@project-serum/anchor";
import idl from "../../constant/idl.json";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey"
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { useMemo } from "react";
import { deriveMagicalNftMetadataPDA, CslSplTokenPDAs } from "solana_magical_mint_nft/dist/pda";

import { getMagicalNftMetadata, initializeClient, mintSendAndConfirm, transferSendAndConfirm } from "solana_magical_mint_nft/dist/rpc";

import { getMinimumBalanceForRentExemptAccount, getMint, TOKEN_PROGRAM_ID, } from "@solana/spl-token";


const Create = () => {
  const { publicKey, connected } = useWallet();

  const superCoolContext = React.useContext(SupercoolAuthContext);
  const { uploadOnIpfs, loading, provider, setLoading, GenerateNum, prompt, setPrompt, genRanImgLoding, getAllNfts, storeDataInFirebase } = superCoolContext;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Profile avatar" || category);
  const [description, setDescription] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [chain, setChain] = useState("Solana Devnet" || chain);
  const [rendersellNFT, setrendersellNFT] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);
  const [animationUrl, setAnimationUrl] = useState("");
  const [symbol, setSymbol] = useState("");

  const [placeholder, setPlaceholder] = useState(
    "Search a lion with Paint Brushes painting the mona lisa painting..."
  );

  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);


  const NFT_STORAGE_TOKEN = process.env.NEXT_APP_NFT_STORAGE;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const generateImage = async () => {
    const openai = new OpenAI({ apiKey: process.env.NEXT_APP_apiKey_ai, dangerouslyAllowBrowser: true });
    setGenerateLoading(true);
    setLoading(true);

    setPlaceholder(`Search ${prompt}...`);
    try {
      const res = await openai.images.generate({
        prompt: prompt,
        n: 3,
        size: "512x512",
      });
      setLoading(false);
      let arry = [];
      for (let i = 0; i < res.data.length; i++) {
        const img_url = res.data[i].url;
        const api = await axios.create({
          baseURL:
            "https://open-ai-enwn.onrender.com",
        });
        const obj = {
          url: img_url
        }
        let response = await api
          .post("/image", obj)
          .then((res) => {
            return res;
          })
          .catch((error) => {
            console.error(error);
          });
        const arr = new Uint8Array(response.data.data);
        const blob = new Blob([arr], { type: 'image/jpeg' });
        const imageFile = new File(
          [blob],
          `data.png`,
          {
            type: "image/jpeg",
          }
        );
        const metadata = await client.store({
          name: "data",
          description: "data",
          image: imageFile
        });
        const imUrl = `https://ipfs.io/ipfs/${metadata.ipnft}/metadata.json`;
        console.log(imUrl, "imUrl");
        const data = (await axios.get(imUrl)).data;
        const rep = data.image.replace(
          "ipfs://",
          "https://superfun.infura-ipfs.io/ipfs/"
        );
        arry.push(rep);
      }
      setImages(arry);
      setGenerateLoading(false);

    } catch (error) {
      toast.error(`Error generating image: ${error}`);
      setGenerateLoading(false);
    }
  };

  const mintNft = async (_price, _metadataurl, _metaData) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      GAMESETS_NFT_CONTRACT,
      abi,
      signer
    );

    try {
      const tx = await contract.mintNFT(_price, _metadataurl);
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        toast("NFT Minted Sucessfully 🎉!!");
        await storeDataInFirebase(_metaData);
      } else {
        console.log("Transaction failed:");
      }

    } catch (e) {
      console.error("Failed to mint NFT: " + e.message);
    }
    await getAllNfts()
    setLoading(!loading);
    setMintLoading(false);
    setImages([]);
    setTitle('');
    setDescription('');
    setPrice('');
    setrendersellNFT(false);
  };


  const createNft = async () => {
    const feePayer = publicKey;
    const programId = "GeeHuDkFx6idRFYu6n2mmc4eUGFKtbnh6WNRS7jT1BVg";
    const connection = new Connection("https://api.devnet.solana.com", {
      commitment: "confirmed",
    });

    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const progId = new PublicKey(programId);

    initializeClient(progId, connection);

    const fromWallet = Keypair.generate();
    const mint = Keypair.generate();

    const rent = await getMinimumBalanceForRentExemptAccount(connection);
    const transaction = new Transaction()
      .add(
        SystemProgram.createAccount({
          fromPubkey: feePayer,
          newAccountPubkey: fromWallet.publicKey,
          space: 0,
          lamports: rent,
          programId: SystemProgram.programId,
        })
      );

    const signers = [feePayer, fromWallet];
    await sendAndConfirmTransaction(connection, transaction, signers);


    const [nftMetadata] = deriveMagicalNftMetadataPDA(
      {
        mint: mint.publicKey,
      },
      progId,
    );

    const [ownerATA] = CslSplTokenPDAs.deriveAccountPDA({
      wallet: feePayer,
      mint: mint.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
    });

    // wallet: feePayer.publicKey,
    //   assocTokenAccount: johnDoeATA,
    //   color: "Purple",
    //   rarity: "Rare",
    //   shortDescription: "Only possible to collect from the lost temple event",
    //   signers: {
    //       feePayer: feePayer,
    //       funding: feePayer,
    //       mint: mint,
    //       owner: johnDoeWallet,
    //   },

    await mintSendAndConfirm({
      animationUrl: animationUrl,
      assocTokenAccount: ownerATA,
      category: category,
      description: description,
      externalUrl: externalUrl,
      image: "https://superfun.infura-ipfs.io/ipfs/",
      name: title,
      symbol: symbol,
      wallet: feePayer,
      signers: {
        feePayer: feePayer,
        funding: feePayer,
        mint: mint,
        owner: feePayer,
      }
    });


    // Program Id: BVDdEviu7f1GzqtvYuV9dQBWft7toFQYM8vFeEHnH7ME
    // const metadata = {
    //   name: "Custom NFT #1",
    //   symbol: "CNFT",
    //   description: "A description about my custom NFT #1",
    //   seller_fee_basis_points: 500,
    //   external_url: "https://www.customnft.com/",
    //   attributes: [
    //     {
    //       trait_type: "NFT type",
    //       value: "Custom",
    //     },
    //   ],
    //   collection: {
    //     name: "Test Collection",
    //     family: "Custom NFTs",
    //   },
    //   properties: {
    //     files: [
    //       {
    //         uri: imageUrl,
    //         type: "image/png",
    //       },
    //     ],
    //     category: "image",
    //     maxSupply: 0,
    //     creators: [
    //       {
    //         address: "CBBUMHRmbVUck99mTCip5sHP16kzGj3QTYB8K3XxwmQx",
    //         share: 100,
    //       },
    //     ],
    //   },
    //   image: imageUrl,
    // };

    // const metadataRequest = JSON.stringify(metadata);
    const nftData = {
      name: title,
      symbol: symbol,
      description: description,
      chain: chain,
      image: selectedImage,
      animation_url: animationUrl,
      externalUrl: externalUrl,
      category: category,
      owner: publicKey.toBase58()
    }

    console.log(nftData);
    // setMintLoading(true);
    // let metadataurl = await uploadOnIpfs(nftData);
    // await mintNft(ethers.utils.parseUnits(nftData.price?.toString(), "ether"), metadataurl, nftData);
  }

  function handleSelectedImg(url) {
    setrendersellNFT(false);
    setSelectedImage(url);
    setModalOpen(true);
  }

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-12 ">
          <div className="col-span-3">
            <div
              className="categories-scroll"
              style={{ marginTop: "160px" }}
            >
              <p className="dark:text-jacarta-300 text-4xs mb-3">
                Experiment and train modal as per your preference
              </p>
              <Options />
            </div>
          </div>
          <div className="col-span-9">
            <Meta title="MAgical NFTs" />

            <section className="relative py-24 nft-sections fixed">
              <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
                <img
                  src="/images/gradient_light.jpg"
                  alt="gradient"
                  className="h-full w-full"
                />
              </picture>

              <div className="container nft-sections">
                <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
                  Let your creativity shine and give us a clear picture with your words
                </h1>

                <div className="mx-auto max-w-[48.125rem]">

                  <div className="mb-6">
                    <p className="dark:text-jacarta-300 text-4xs mb-3">
                      We're excited to bring your NFT to life, but we need your input. Please provide us with a brief description of what you want it to look like. Or
                      <span>
                        <a
                          className="hover:text-accent dark:hover:text-white text-jacarta-700 font-bold font-display mb-6 text-center text-md dark:text-white md:text-left lg:text-md xl:text-md animate-gradient"
                          style={{ cursor: "pointer" }} onClick={GenerateNum}
                        > {
                            genRanImgLoding ?
                              "generating random prompt..." : "generate random image."
                          }  </a>
                      </span>
                    </p>

                    <textarea
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={placeholder}
                      value={prompt}
                      id="item-description"
                      className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                      rows="6"
                      required
                    >
                    </textarea>

                    <div className="generate-btn">
                      {generateLoading ?
                        <CircularProgress />
                        :
                        <button
                          className="bg-accent-lighter hover:bg-accent rounded-full py-3 px-8 text-center font-semibold text-white transition-all  "
                          style={{ marginBottom: "15px" }}
                          onClick={generateImage}
                        >
                          Generate
                        </button>
                      }
                    </div>
                    <br />

                    {
                      images.length > 0 ?
                        <>
                          <div className="row main-row">
                            {images && images.map((url, i) => (

                              <div
                                className="col-lg-4 mb-4 mb-lg-0 cursor-pointer"
                                onClick={() => handleSelectedImg(url)}
                              >
                                <div
                                  className="bg-image hover-overlay ripple shadow-1-strong rounded col-4"
                                  data-ripple-color="light"
                                >
                                  <div className="img-nft">
                                    <img
                                      src={url}
                                      alt='nft-images'
                                    />
                                  </div>
                                  <div className="radio-img cursor-pointer">
                                    <input
                                      type="radio"
                                      id={`huy${i}`}
                                      name="drone"
                                      value="huey"
                                      checked={url == selectedImage}
                                      className="mt-3"
                                    />
                                  </div>
                                </div>
                              </div>

                            ))}

                          </div>
                          <div>
                            <p style={{ textAlign: "center" }} className="dark:text-jacarta-300 text-4xs mb-3"
                            >Select the image you wish to mint.</p>
                          </div>
                        </>
                        : ""
                    }

                  </div>
                  {modalOpen &&
                    <div className="img-overlay">
                      <ImageModal setModalOpen={setModalOpen}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        createNft={createNft}
                        setrendersellNFT={setrendersellNFT}
                      />
                    </div>
                  }

                </div>
                <RendersellNft
                  rendersellNFT={true}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  setExternalUrl={setExternalUrl}
                  setAnimationUrl={setAnimationUrl}
                  setSymbol={setSymbol}
                  createNft={createNft}
                  mintLoading={mintLoading}
                  category={category}
                  setCategory={setCategory}
                  chain={chain}
                  setChain={setChain}
                />
              </div >
            </section >
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
