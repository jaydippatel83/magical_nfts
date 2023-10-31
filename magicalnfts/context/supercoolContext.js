import React, { useState, createContext, useEffect, useRef, useMemo } from "react";
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';
import { RandomPrompts } from "../components/RandomImgs";
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import idl from '../constant/idl.json'
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";


export const SupercoolAuthContext = createContext(undefined);

export const SupercoolAuthContextProvider = (props) => {

  const [walletConnected, setWalletConnected] = useState(false);
  const [allNfts, setAllNfts] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [genRanImgLoding, setGenRanImgLoding] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const [nftData, setNftData] = useState();
  const [loading, setLoading] = useState(false);

  const PROGRAM_KEY = new PublicKey(idl.metadata.address);
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions);
      return new anchor.Program(idl, PROGRAM_KEY, provider);
    }
  }, [collection, anchorWallet])


  useEffect(() => {
    const start = async () => {
      if (program && publicKey) {
        try {
          const [nftPda] = await findProgramAddressSync([utf8.encode('nft'), publicKey.toBuffer()], program.programId);
          setNftData(nftData);
          console.log(nftData, "nftData");
        } catch (error) {
          console.log(error);
        }
      }
    }
    start()
  }, [])
  useEffect(() => {
    getSignerFromProvider();
  }, [])

  const firebaseConfig = {
    apiKey: process.env.NEXT_APP_apiKey,
    authDomain: process.env.NEXT_APP_authDomain,
    databaseURL: process.env.NEXT_APP_databaseURL,
    projectId: process.env.NEXT_APP_projectId,
    storageBucket: process.env.NEXT_APP_storageBucket,
    messagingSenderId: process.env.NEXT_APP_messagingSenderId,
    appId: process.env.NEXT_APP_appId,
    measurementId: process.env.NEXT_APP_measurementId,
  };


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const firestore = getFirestore();
  const collectionRef = collection(firestore, "TokenUri");
  const UserProfileRef = collection(firestore, "UserProfile");

  async function storeDataInFirebase(metadata) {
    const docRef = await addDoc(collectionRef, metadata);
    console.log("Data stored successfully! Document ID:", docRef.id);
  }

  const updateForPurchase = async (tokenId) => {
    const q = query(
      collection(db, "TokenUri"),
      where("tokenId", "==", tokenId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((fire) => {
      const data = {
        owner: localStorage.getItem('address'),
      };
      const dataref = doc(db, "TokenUri", fire.id);
      updateDoc(dataref, data);
    })
  }

  async function getSignerFromProvider() {
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      const signer = provider.getSigner();
      setSigner(signer);
    } else {
      console.log('No wallet connected or logged out');
    }
  }

  const getProfileData = async () => {
    try {
      const q = collection(db, "UserProfile");
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("First create profile!!");
      } else {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setProfileData(data);
      }

    } catch (error) {
      console.error("Error fetching user profile: ", error);
    }
  }




  const login = async () => {
    // if (window.ethereum) {
    //   try {
    //     const networkId = await window.ethereum.request({ method: 'net_version' });
    //     console.log(networkId);
    //     if (Number(networkId) !== 5611) {
    //       alert("Please switch to the correct network.");
    //       return;
    //     }

    //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    //   } catch (error) {
    //     console.error("Error while logging in:", error);
    //   }
    // }
  };




  const logout = async () => {
    localStorage.removeItem('address');
    setWalletConnected(false);
  }

  const auth =
    "Basic " +
    Buffer.from(
      process.env.NEXT_APP_infuraProjectKey + ":" + process.env.NEXT_APP_infuraSecretKey
    ).toString("base64");

  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });


  const GenerateNum = () => {
    const index = Math.floor(Math.random() * RandomPrompts.length);
    setPrompt(RandomPrompts[index])
  };


  async function getAllNfts() {
    try {
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map((doc) => doc.data());
      let allnfts = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        allnfts.push(item);
        setAllNfts(allnfts);
      }
      console.log('all nfts--', allnfts);
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  }

  useState(() => {
    setTimeout(() => {
      // getAllNfts()
    }, 5000);
  }, [loading])

  const uploadOnIpfs = async (e) => {
    let dataStringify = JSON.stringify(e);
    const ipfsResult = await client.add(dataStringify);
    const contentUri = `https://superfun.infura-ipfs.io/ipfs/${ipfsResult.path}`;

    return contentUri;
  }

  const handleImgUpload = async (file) => {
    const added = await client.add(file);
    const hash = added.path;
    const ipfsURL = `https://superfun.infura-ipfs.io/ipfs/${hash}`;
    return ipfsURL;
  };



  const generateText = async (detailPrompt) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: detailPrompt,
          max_tokens: 700,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_APP_apiKey_ai}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setLoading(false);
      setPrompt(response.data.choices[0].text);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }
  };

  return (
    <SupercoolAuthContext.Provider
      value={{
        login,
        logout,
        uploadOnIpfs,
        allNfts,
        handleImgUpload,
        getProfileData,
        profileData,
        client,
        loading,
        setLoading,
        GenerateNum,
        prompt,
        setPrompt,
        genRanImgLoding,
        getAllNfts,
        generateText,
        storeDataInFirebase,
        provider,
        updateForPurchase,
        UserProfileRef,
        db,
        walletConnected,
        nftData,
        program
      }}
      {...props}
    >
      {props.children}
    </SupercoolAuthContext.Provider>
  );
};
