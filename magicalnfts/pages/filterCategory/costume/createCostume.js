import React, { useState } from "react";
import StandardDropdown from "../../standardDropdown/dropdown";
import { Button } from "@mui/material";
import axios from "axios";
import JacketCostume from "./jacket";
import PantCostume from "./pant";
import SkritCostume from "./skrit";
import CoatCostume from "./coat";
import ShirtCostume from "./shirt";
import JumpsuitCostume from "./jumpsuit";

const CreateCostume = () => {

    const [costumeType, setCostumeType] = useState('costume type');

    const costumeTypeOptionsText = [
        {
            id: 1,
            text: 'Jacket',
        },
        {
            id: 2,
            text: 'Pant',
        },
        {
            id: 3,
            text: 'Jumpsuit',
        },
        {
            id: 4,
            text: 'Shirt',
        },
        {
            id: 5,
            text: 'Coat',
        },
        {
            id: 6,
            text: 'Skirt',
        },
    ];



    return (
        <>

            <StandardDropdown
                dropdownItemText={costumeTypeOptionsText}
                state={costumeType}
                setState={setCostumeType}
                // className="categories-scroll"
            />

            {costumeType == "Jacket" ? <JacketCostume /> : ""}
            {costumeType == "Pant" ? <PantCostume /> : ""}
            {costumeType == "Skirt" ? <SkritCostume /> : ""}
            {costumeType == "Coat" ? <CoatCostume /> : ""}
            {costumeType == "Shirt" ? <ShirtCostume /> : ""}
            {costumeType == "Jumpsuit" ? <JumpsuitCostume /> : ""}
            
        </>
    )
}

export default CreateCostume;