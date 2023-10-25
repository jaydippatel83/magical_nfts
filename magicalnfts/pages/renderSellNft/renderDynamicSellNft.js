import React, { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import ChainDropdown from "../standardDropdown/chainDropdown";
import CityListDropdown from "../standardDropdown/cityListDropdown";

const RenderDynamicsellNft = ({ StoreDyanamicNftsMetadata, rendersellNFT, rendersellNFTAgain, setTitle, setDescription, city,setCity, setPrice, mintLoading, category, setCategory, chain, setChain }) => {
    const blockChainOptionsText = [
        {
            id: 1,
            text: 'Ethereum',
        },
        {
            id: 2,
            text: 'Polygon',
        },

    ];
    const categoryOptionsText = [
        {
            id: 1,
            text: 'Profile avatar',
        },
        {
            id: 2,
            text: 'gaming asset',
        },
        {
            id: 3,
            text: 'costume',
        },

    ];
    const cityOptionsText = [
        {
            id: 1,
            text: 'Ahmedabad',
        },
        {
            id: 2,
            text: 'Gandhinagar',
        },
        {
            id: 3,
            text: 'Bengaluru',
        },
        ,
        {
            id: 4,
            text: 'Dubai',
        },
        {
            id: 5,
            text: 'Mumbai',
        },
        ,
        {
            id: 6,
            text: 'Berlin',
        },
        {
            id: 7,
            text: 'Bangkok',
        },
        ,
        {
            id: 8,
            text: 'Toronto',
        },
        {
            id: 9,
            text: 'Istanbul',
        },
        ,
        {
            id: 10,
            text: 'Sydney',
        },
        {
            id: 11,
            text: 'Moscow',
        },
        ,
        {
            id: 12,
            text: 'Cape Town',
        },
        {
            id: 13,
            text: 'London',
        },
        {
            id: 14,
            text: 'Paris',
        },
        {
            id: 15,
            text: 'Rome',
        },

    ];
    if (rendersellNFT === true && rendersellNFTAgain === true) {
        return (
            <div className="mx-auto max-w-[48.125rem]">
                <div className="mb-6">
                    <label
                        htmlFor="Title of NFT"
                        className="font-display text-jacarta-700 mb-2 block dark:text-white"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="item-name"
                        className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                        placeholder="Item name"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="item-description"
                        className="font-display text-jacarta-700 mb-2 block dark:text-white"
                    >
                        Description
                    </label>
                    <p className="dark:text-jacarta-300 text-2xs mb-3">
                        The description will be included on the {"item's"} detail page
                        underneath its image. Markdown syntax is supported.
                    </p>
                    <textarea
                        id="item-description"
                        className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                        rows="4"
                        required
                        placeholder="Provide a detailed description of your item."
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="Price of NFT"
                        className="font-display text-jacarta-700 mb-2 block dark:text-white"
                    >
                        Price
                    </label>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        id="item-name"
                        className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                        placeholder="Item name"
                        required
                    />
                </div>

               
                <div className="mb-6">
                    <label
                        htmlFor="Price of NFT"
                        className="font-display text-jacarta-700 mb-2 block dark:text-white"
                    >
                        city
                    </label>
                    <CityListDropdown
                                dropdownItemText={cityOptionsText}
                                state={city}
                                setState={setCity}
                            />
                    </div>

               

                <div className="grid grid-cols-12">
                    <div className="mb-6 col-span-6">
                        <label
                            htmlFor="item-supply"
                            className="font-display text-jacarta-700 mb-2 block dark:text-white"
                        >
                            category
                        </label>
                        <div className="dropdown relative mb-4 cursor-pointer ">
                            <ChainDropdown
                                dropdownItemText={categoryOptionsText}
                                state={category}
                                setState={setCategory}

                            />
                        </div>
                    </div>
                    <div className="mb-6 col-span-6">
                        <label
                            htmlFor="item-supply"
                            className="font-display text-jacarta-700 mb-2 block dark:text-white"
                        >
                            chain
                        </label>
                        <div className="dropdown relative mb-4 cursor-pointer ">
                            <ChainDropdown
                                dropdownItemText={blockChainOptionsText}
                                state={chain}
                                setState={setChain}
                            />
                        </div>
                    </div>
                </div>

                <div className="create-btn">
                    {
                        mintLoading ? <CircularProgress /> :
                            <button
                                // onClick={() => createNft()}
                                onClick={() => StoreDyanamicNftsMetadata()}
                                className="bg-accent-lighter rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                            >
                                Create
                            </button>
                    }
                </div>
            </div>
        );
    } else {
        "nothing..."
    }
}

export default RenderDynamicsellNft;