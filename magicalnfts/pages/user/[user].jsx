import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import Auctions_dropdown from "../../components/dropdown/Auctions_dropdown";
import User_items from "../../components/user/User_items";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SupercoolAuthContext } from "../../context/supercoolContext";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import moment from "moment/moment";

const User = () => {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const pid = router.query.user;
  const [coverePhoto, setCoverePhoto] = useState();
  const [username, setUsername] = useState();
  const [bio, setBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState();
  const [join, setJoin] = useState("");
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState([]);
  const superCoolContext = React.useContext(SupercoolAuthContext);
  const { allNfts, db } = superCoolContext;
  const [walletAddress, setWalletAddress] = useState();

  useEffect(() => {
    if (connected) {
      setWalletAddress(publicKey.toBase58());
      getProfileData(publicKey.toBase58());
      getUserData(publicKey.toBase58())
    }
  }, [])

  const getUserData = async (address) => {
    const dataa = [];
    for (let i = 0; i < allNfts.length; i++) {
      const element = allNfts[i];
      if (element.owner.toLowerCase() == address.toLowerCase()) {
        dataa.push(element)
      }
    }
    setData(dataa);
  }

  const getProfileData = async (add) => {
    try {
      const q = query(
        collection(db, "UserProfile"),
        where("walletAddress", "==", add)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("First create profile!!");
      } else {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setUsername(data[0].username)
        setBio(data[0].bio)
        setCoverePhoto(data[0].coverimage);
        console.log(data[0], "data");
        setJoin(data[0].createdAt)
        setProfilePhoto(data[0].profilephoto)
      }

    } catch (error) {
      console.error("Error fetching user profile: ", error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);



  return (
    <>
      <div className="pt-[5.5rem] lg:pt-24" >
        {/* <!-- Banner --> */}
        <div className="relative h-[18.75rem]">
          <img
            src={coverePhoto}
            alt="banner"
            layout="fill"
            className="h-[18.75rem] w-full object-cover"

          />
        </div>
        {/* <!-- end banner --> */}
        <section className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28">
          {/* <!-- Avatar --> */}
          <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-xl border-[5px] border-white">
              <img
                src={profilePhoto}
                alt={username}
                layout="fill"
                objectFit="contain"
                className="dark:border-jacarta-600 rounded-xl border-[5px] border-white"
              />

            </figure>
          </div>

          <div className="container">
            <div className="text-center">
              <h4 className="font-display text-jacarta-700 mt-4 mb-2 text-2xl font-medium dark:text-white">
                {username ? username : "username"}
              </h4>
              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
                <Tippy content="ETH">
                  <svg className="icon icon-ETH mr-1 h-5 w-5">
                    <use xlinkHref="/icons.svg#icon-ETH"></use>
                  </svg>
                </Tippy>

                <Tippy
                  hideOnClick={false}
                  content={
                    copied ? <span>copied</span> : <span>copy</span>
                  }
                >
                  <button className="js-copy-clipboard dark:text-jacarta-200 max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap">
                    <CopyToClipboard
                      text={walletAddress}
                      onCopy={() => setCopied(true)}
                    >
                      <span>{walletAddress}</span>
                    </CopyToClipboard>
                  </button>
                </Tippy>
              </div>

              <p className="dark:text-jacarta-300 mx-auto mb-2 max-w-xl text-lg">
                {bio}
              </p>
              <span className="text-jacarta-400">
                Joined: {moment.unix(join.seconds).milliseconds(join.nanoseconds / 1e6).format('LL')}
              </span>
            </div>
          </div>
        </section>
        {/* <!-- end profile --> */}
        <User_items data={data} />
      </div>
    </>
  );
};

export default User;
