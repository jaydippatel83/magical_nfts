import React, { useState } from "react";
import StandardDropdown from "../../standardDropdown/dropdown";
import GamingCharacterFeatures from "./gamingCharacter";
import WeaponFeatures from "./weapon";
const GamingAssetOption = () => {

  const [category, setCategory] = useState('select');
  const dropdownItemText = [
    {
      id: 1,
      text: 'gaming character',
    },
    {
      id: 2,
      text: 'weapon',
    },
  ];
  return (
    <>
    <StandardDropdown 
    dropdownItemText={dropdownItemText}
    state={category}
    setState={setCategory}
    
    />
    {category == "gaming character" ? <GamingCharacterFeatures/> : ""}
    {category == "weapon" ? <WeaponFeatures/> : ""}
    </>
  );
}

export default GamingAssetOption;