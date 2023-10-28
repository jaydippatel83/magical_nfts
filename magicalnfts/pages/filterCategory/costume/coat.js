import React, { useState } from "react";
import StandardDropdown from "../../standardDropdown/dropdown";
import { Button } from "@mui/material";
import { SupercoolAuthContext } from "../../../context/supercoolContext";
import axios from "axios";

const CoatCostume = () => {
    const superCoolContext = React.useContext(SupercoolAuthContext);
    const { setPrompt, generateText } = superCoolContext;
    const [designStyle, setDesignStyle] = useState('design style');
    const [coatType, setCoatType] = useState('coat type');
    const [coatColor, setCoatColor] = useState('color');
    const [coatLength, setCoatLength] = useState('coat length');
    const [collarType, setCollarType] = useState('collar type');
    const [sleeveLength, setSleeveLength] = useState('sleeve length');
    const [loading, setLoading] = useState(false);

    let detailPrompt = `Rewrite the prompt and add some more lines from you, giving it greater emphasis with more details, to create costume Coat based on this information:- make sure image style will be ${designStyle}, coat type:${coatType}, coat color:${coatColor},coat length:${coatLength}$,coat collar type:${collarType} and sleeves will be ${sleeveLength} and Remember to infuse the avatar with vitality and energy`




    const designStyleOptionsText = [
        {
            id: 1,
            text: 'Modern',
        },
        {
            id: 2,
            text: 'Futuristic',
        },
        {
            id: 3,
            text: 'Steampunk',
        },
        {
            id: 4,
            text: 'Ancient',
        },
        {
            id: 5,
            text: 'Robotic',
        },
        {
            id: 6,
            text: 'Fantasy',
        },
    ];

    const coatTypeOptionsText = [
        {
            id: 1,
            text: 'Trench coat',
        },
        {
            id: 2,
            text: 'Pea coat',
        },
        {
            id: 3,
            text: 'Overcoat',
        },
        {
            id: 4,
            text: 'Duster coat',
        },
        {
            id: 5,
            text: 'Cape coat',
        },
        {
            id: 6,
            text: 'Tailcoat',
        },
    ];
    const coatColorOptionsText = [
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
    const coatLengthOptionsText = [
        {
            id: 1,
            text: 'full length',
        },
        {
            id: 2,
            text: 'knee length',
        },
        {
            id: 3,
            text: 'short length',
        },

    ];

    const collarTypeOptionsText = [
        {
            id: 1,
            text: 'Notched collar',
        },
        {
            id: 2,
            text: 'Shawl collar',
        },
        {
            id: 3,
            text: 'Stand collar',
        },
        {
            id: 4,
            text: 'Mandarin collar',
        },

    ];

    const sleeveLengthOptionsText = [
        {
            id: 1,
            text: 'Full sleeves',
        },
        {
            id: 2,
            text: 'Three-quarter sleeves',
        },
        {
            id: 3,
            text: 'Short sleeves',
        },
    ];



    return (
        <>
            <div className="categories-scroll">
                <StandardDropdown
                    dropdownItemText={designStyleOptionsText}
                    state={designStyle}
                    setState={setDesignStyle}
                />

                <StandardDropdown
                    dropdownItemText={coatTypeOptionsText}
                    state={coatType}
                    setState={setCoatType}
                />

                <StandardDropdown
                    dropdownItemText={coatColorOptionsText}
                    state={coatColor}
                    setState={setCoatColor}
                />

                <StandardDropdown
                    dropdownItemText={coatLengthOptionsText}
                    state={coatLength}
                    setState={setCoatLength}
                />

                <StandardDropdown
                    dropdownItemText={collarTypeOptionsText}
                    state={collarType}
                    setState={setCollarType}
                />

                <StandardDropdown
                    dropdownItemText={sleeveLengthOptionsText}
                    state={sleeveLength}
                    setState={setSleeveLength}
                />

                <div style={{
                    textAlign: "center"
                }}>
                    <button color="secondary" className="mb-5 bg-accent-lighter rounded-full py-3 px-8 text-center font-semibold text-white transition-all" onClick={() => generateText(detailPrompt)} variant="outlined" style={{
                        width: "90%",
                        fontSize: "18px",
                        border: "none",

                    }} >{loading ? "Generating...!" : "Generate Prompt"}</button>
                </div>

            </div>

        </>
    )
}

export default CoatCostume;