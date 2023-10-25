import React, { useState } from "react";
import StandardDropdown from "../../standardDropdown/dropdown";
import { Button } from "@mui/material";
import axios from "axios";
import { SupercoolAuthContext } from "../../../context/supercoolContext";
const GamingCharacterFeatures = () => {
    const superCoolContext = React.useContext(SupercoolAuthContext);
    const { setPrompt } = superCoolContext;
    const [characterType, setCharacterType] = useState(  'character type');
    const [clothingStyle, setClothingStyle] = useState(  'clothing style');
    const [accessories, setAccessories] = useState( 'accessories');
    const [footwear, setFootwear] = useState( 'footwear');
    const [hairstyle, setHairstyle] = useState(  'hair style');
    const [imageStyle, setImageStyle] = useState(  'image style');



    let detailPrompt = `Rewrite the prompt and add some more lines from you, giving it greater emphasis with more details, to create a Gaming Character based on this prompt:- so create a gaming character who will be ${characterType}, with clothing style:${clothingStyle}, with ${accessories} accessory, with ${footwear} footwear, with ${hairstyle} hair style lastly make sure to generate image with ${imageStyle} and Remember to infuse the avatar with vitality and energy`;

    const generateText = async () => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: detailPrompt,
                    max_tokens: 700,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setPrompt(response.data.choices[0].text);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const characterOptionsText = [
        {
            id: 1,
            text: 'Hero',
        },
        {
            id: 2,
            text: 'Villain',
        },
        {
            id: 3,
            text: 'robot',
        },
        {
            id: 4,
            text: 'alien',
        },
    ];

    const clothingStyleOptionsText = [
        {
            id: 1,
            text: 'Sporty',
        },
        {
            id: 2,
            text: 'futuristic',
        },
        {
            id: 3,
            text: 'Retro',
        },
        {
            id: 4,
            text: 'Fantasy',
        },
        {
            id: 5,
            text: 'Sci-fi',
        },
        {
            id: 6,
            text: 'medieval',
        },
        {
            id: 7,
            text: 'cyberpunk',
        },
        {
            id: 8,
            text: 'fantasy-inspired',
        },
    ];
    const accessoriesOptionsText = [
        {
            id: 1,
            text: 'Glasses',
        },
        {
            id: 2,
            text: 'Tattoos',
        },
        {
            id: 3,
            text: 'hat',
        },
        {
            id: 4,
            text: 'belts',
        },
        {
            id: 5,
            text: 'Headphone',
        },
        {
            id: 6,
            text: 'helmets',
        },

    ];

    const hairStyleOptionsText = [
        {
            id: 1,
            text: 'short',
        },
        {
            id: 2,
            text: 'long',
        },
        {
            id: 3,
            text: 'Curly',
        },
        {
            id: 4,
            text: 'Straight',
        },
        {
            id: 5,
            text: 'Wavy',
        },
        {
            id: 6,
            text: 'Braided',
        },
        {
            id: 7,
            text: 'Mohawk',
        },
        {
            id: 8,
            text: 'ponytail',
        }
    ];
    const footwearOptionsText = [
        {
            id: 1,
            text: 'sneakers',
        },
        {
            id: 2,
            text: 'uturistic boots',
        },
        {
            id: 3,
            text: 'sandals',
        },
        {
            id: 4,
            text: 'combat boots',
        },
        {
            id: 5,
            text: 'high heels',
        },
    ];
    const imageStyleOptionsText = [
        {
            id: 1,
            text: 'Clay Art Style',
        },
        {
            id: 2,
            text: 'Aesthetic Style',
        },
        {
            id: 3,
            text: 'Realistic Style',
        },
        {
            id: 4,
            text: 'Cartoonish Style',
        },
        {
            id: 5,
            text: 'Pixel Art Style',
        },
        {
            id: 6,
            text: 'Retro Style',
        },
        {
            id: 7,
            text: 'Pop Art Style',
        },
        {
            id: 8,
            text: 'Watercolor Style',
        },
        {
            id: 9,
            text: 'Minimalist Style',
        },
        {
            id: 10,
            text: 'Graffiti Style',
        },
        {
            id: 11,
            text: 'Anime Style',
        },
        {
            id: 12,
            text: 'Fantasy Style',
        },
    ];




    return (
        <>
            <div className="categories-scroll">
                <StandardDropdown
                    dropdownItemText={characterOptionsText}
                    state={characterType}
                    setState={setCharacterType}
                />

                <StandardDropdown
                    dropdownItemText={clothingStyleOptionsText}
                    state={clothingStyle}
                    setState={setClothingStyle}
                />

                <StandardDropdown
                    dropdownItemText={accessoriesOptionsText}
                    state={accessories}
                    setState={setAccessories}
                />

                <StandardDropdown
                    dropdownItemText={hairStyleOptionsText}
                    state={hairstyle}
                    setState={setHairstyle}
                />

                <StandardDropdown
                    dropdownItemText={footwearOptionsText}
                    state={footwear}
                    setState={setFootwear}
                />

                <StandardDropdown
                    dropdownItemText={imageStyleOptionsText}
                    state={imageStyle}
                    setState={setImageStyle}
                />

                <div style={{
                    textAlign: "center"
                }}>
                    <button color="secondary" className="mb-5 bg-accent-lighter rounded-full py-3 px-8 text-center font-semibold text-white transition-all" onClick={generateText} variant="outlined" style={{
                        width: "90%",
                        fontSize: "18px",
                        border: "none",

                    }} >Submit</button>
                </div>
                {/* <Button onClick={generateText}>Submit</Button> */}

            </div>

        </>
    )
}

export default GamingCharacterFeatures;