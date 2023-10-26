import React, { useState } from "react";
import StandardDropdown from "../../standardDropdown/dropdown";
import { Button } from "@mui/material";
import axios from "axios";
import { SupercoolAuthContext } from "../../../context/supercoolContext";

const WeaponFeatures = () => {
    const superCoolContext = React.useContext(SupercoolAuthContext);
    const { setPrompt, loading, generateText } = superCoolContext;
    const [weaponType, setWeaponType] = useState('weapon type');
    const [designStyle, setDesignStyle] = useState('design style');

    let detailPrompt = `Rewrite the prompt and add some more lines from you, giving it greater emphasis with more details, to create an image of Weapon based on this information:- create a dangerous ${weaponType} and make sure it's design style will be ${designStyle} and Remember to infuse the weapon image with vitality and energy`


    const weaponTypeOptionsText = [
        {
            id: 1,
            text: 'Gun',
        },
        {
            id: 2,
            text: 'Rifle',
        },
        {
            id: 3,
            text: 'Bows',
        },
        {
            id: 4,
            text: 'Shot gun',
        },
        {
            id: 5,
            text: 'Rocket launcher',
        },
        {
            id: 6,
            text: 'sword',
        },
    ];

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


    return (
        <>
            <StandardDropdown
                dropdownItemText={weaponTypeOptionsText}
                state={weaponType}
                setState={setWeaponType}
            />

            <StandardDropdown
                dropdownItemText={designStyleOptionsText}
                state={designStyle}
                setState={setDesignStyle}
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
        </>
    )
}

export default WeaponFeatures;