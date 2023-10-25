import React, { useState } from "react";
import StandardDropdown from "../../standardDropdown/dropdown";
import { Button } from "@mui/material";
import axios from "axios";
import { SupercoolAuthContext } from "../../../context/supercoolContext";

const SkritCostume = () => {
    const superCoolContext = React.useContext(SupercoolAuthContext);
    const { setPrompt } = superCoolContext;
    const [designStyle, setDesignStyle] = useState(  'design style');
    const [skritLength, setSkritLength] = useState(  'skrit length');
    const [skritColor, setSkritColor] = useState( 'color');


    let detailPrompt = `Rewrite the prompt and add some more lines from you, giving it greater emphasis with more details, to create Girl's costume Skrit based on this information:- make sure image style will be ${designStyle}, skrit color:${skritColor},shirt's length should be:${skritLength} and Remember to infuse the avatar with vitality and energy`

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


    const designStyleOptionsText = [
        {
            id: 1,
            text: 'Modern',
        },
        {
            id: 2,
            text: 'Futuristic',
        },

    ];

    const skritLengthOptionsText = [
        {
            id: 1,
            text: 'mini',
        },
        {
            id: 2,
            text: 'Knee-length',
        },
        {
            id: 3,
            text: 'Above-the-knee',
        },
        {
            id: 4,
            text: 'Floor-length',
        },
        {
            id: 5,
            text: 'maxi',
        },
    ];

    const skritColorOptionsText = [
        {
            id: 1,
            text: 'Red',
        },
        {
            id: 2,
            text: 'Blue',
        },
        {
            id: 3,
            text: 'Black',
        },
        {
            id: 4,
            text: 'Grey',
        },
        {
            id: 5,
            text: 'Pink',
        },
    ];

    return (
        <>

            <StandardDropdown
                dropdownItemText={designStyleOptionsText}
                state={designStyle}
                setState={setDesignStyle}
            />

            <StandardDropdown
                dropdownItemText={skritLengthOptionsText}
                state={skritLength}
                setState={setSkritLength}
            />

            <StandardDropdown
                dropdownItemText={skritColorOptionsText}
                state={skritColor}
                setState={setSkritColor}
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
        </>
    )
}

export default SkritCostume;