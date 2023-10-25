import React, { useState } from "react";
import ProfileAvatarFeatures from "./profileAvatar/createProfileAvatar";
import StandardDropdown from "../standardDropdown/dropdown";
import GamingAssetOption from "./gamingAsset/createGamingAsset";
import CreateCostume from "./costume/createCostume";
const Options = () => {

  const [category, setCategory] = useState('profile avatar');
  const [dropdownItemActive, setDropdownItemActive] = useState(null);
  const [dropdownShow, setDropdownShow] = useState(false);
  const dropdownItemText = [
    {
      id: 1,
      text: 'profile avatar',
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
  return (
    <>
      <StandardDropdown
        dropdownItemText={dropdownItemText}
        state={category}
        setState={setCategory}
      />
      {category == "profile avatar" ? <ProfileAvatarFeatures /> : ""}
      {category == "gaming asset" ? <GamingAssetOption /> : ""}
      {category == "costume" ? <CreateCostume /> : ""}
    </>
  );
}

export default Options;