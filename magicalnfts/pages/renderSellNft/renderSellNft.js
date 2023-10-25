import React, { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import ChainDropdown from "../standardDropdown/chainDropdown";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RendersellNft = ({ rendersellNFT, setTitle, setDescription, setPrice, createNft, mintLoading, category, setCategory, chain, setChain }) => {
    const blockChainOptionsText = [
        {
            id: 1,
            text: 'Patex Sepolia',
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
    if (rendersellNFT === true) {
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
                                onClick={() => createNft()}
                                className="bg-accent-lighter rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                            >
                                Create
                            </button>
                    }
                            <ToastContainer/>

                </div>
            </div>
        );
    } else {
        "nothing..."
    }
}

export default RendersellNft;