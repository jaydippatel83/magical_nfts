import React, { useState } from "react";
import StandardDropdown from "../../standardDropdown/dropdown";
import { Button } from "@mui/material";
import axios from "axios";
import { SupercoolAuthContext } from "../../../context/supercoolContext";

const ProfileAvatarFeatures = () => {
    const superCoolContext = React.useContext(SupercoolAuthContext);
    const { setPrompt } = superCoolContext;
    const [gender, setGender] = useState('gender' );
    const [hairstyle, setHairstyle] = useState('hair style'  );
    const [hairColor, setHairColor] = useState('hair color'  );
    const [facialHair, setFacialHair] = useState('facial hair'  );
    const [facialExpression, setFacialExpression] = useState('Expression' );
    const [eyeColor, setEyeColor] = useState('eyes' );
    const [skinTone, setSkinTone] = useState('skin tone'  );
    const [clothingStyle, setClothingStyle] = useState('clothing style' );
    const [accessories, setAccessories] = useState('accessories' );
    const [imageStyle, setImageStyle] = useState('image style' );
    const [bodyType, setBodyType] = useState('body type' );
    const [age, setAge] = useState('age' );
    const [ethnicity, setEthnicity] = useState('ethnicity' );
    const [background, setBackground] = useState('background'  );


    let detailPrompt = `Rewrite the prompt and add some more lines from you, giving it greater emphasis with more details, to create a profile avatar based on this information:- make sure image style will be ${imageStyle}, gender:${gender}, hair style:${hairstyle},hair color:${hairColor}${gender == "Male" ? `,facial hair:${facialHair}` : ""},facial Expression:${facialExpression},eye color:${eyeColor},skin tone:${skinTone},clothing style:${clothingStyle},accessories:${accessories},body type:${bodyType},age:${age},ethnicity:${ethnicity}, and the background of this image should be ${background} and Remember to infuse the avatar with vitality and energy`
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


    const genderOptionsText = [
        {
            id: 1,
            text: 'Male',
        },
        {
            id: 2,
            text: 'Female',
        },
        {
            id: 3,
            text: 'Non-binary',
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
        }
    ];
    const hairColorOptionsText = [
        {
            id: 1,
            text: 'Blonde',
        },
        {
            id: 2,
            text: 'Brunette',
        },
        {
            id: 3,
            text: 'Black',
        },
        {
            id: 4,
            text: 'Red',
        },
        {
            id: 5,
            text: 'Grey',
        },
        {
            id: 6,
            text: 'Blue',
        },
        {
            id: 7,
            text: 'Pink',
        }
    ];
    const facialHairOptionsText = [
        {
            id: 1,
            text: 'Beard',
        },
        {
            id: 2,
            text: 'Mustache',
        },
        {
            id: 3,
            text: 'Clean-shaven',
        },
    ];
    const facialExpressionOptionsText = [
        {
            id: 1,
            text: 'Happy',
        },
        {
            id: 2,
            text: 'Sad',
        },
        {
            id: 3,
            text: 'Angry',
        },
        {
            id: 4,
            text: 'Surprised',
        },
        {
            id: 5,
            text: 'Neutral',
        },
        {
            id: 6,
            text: 'Smiling',
        },
    ];
    const eyeColorOptionsText = [
        {
            id: 1,
            text: 'Blue',
        },
        {
            id: 2,
            text: 'Brown',
        },
        {
            id: 3,
            text: 'Green',
        },
        {
            id: 4,
            text: 'Hazel',
        },
        {
            id: 5,
            text: 'Grey',
        },
    ];
    const skinToneOptionsText = [
        {
            id: 1,
            text: 'Light',
        },
        {
            id: 2,
            text: 'Medium',
        },
        {
            id: 3,
            text: 'Dark',
        },
    ];
    const clothingStyleOptionsText = [
        {
            id: 1,
            text: 'Casual',
        },
        {
            id: 2,
            text: 'Sporty',
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
    ];
    const accessoriesOptionsText = [
        {
            id: 1,
            text: 'Glasses',
        },
        {
            id: 2,
            text: 'Hat',
        },
        {
            id: 3,
            text: 'Headphone',
        },
        {
            id: 4,
            text: 'Necklaces',
        },
        {
            id: 5,
            text: 'Earrings',
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
    const bodyTypeOptionsText = [
        {
            id: 1,
            text: 'Insannely beautiful',
        },
        {
            id: 2,
            text: 'Slim',
        },
        {
            id: 3,
            text: 'Athletic',
        },
        {
            id: 4,
            text: 'Curvy',
        },
        {
            id: 5,
            text: 'Muscular',
        },
    ];
    const ageOptionsText = [
        {
            id: 1,
            text: 'Young',
        },
        {
            id: 2,
            text: 'Middle-aged',
        },
        {
            id: 3,
            text: 'Elderly',
        },
    ];
    const ethnicityOptionsText = [
        {
            id: 1,
            text: 'Asian',
        },
        {
            id: 2,
            text: 'African',
        },
        {
            id: 3,
            text: 'Caucasian',
        },
        {
            id: 4,
            text: 'Hispanic',
        },
    ];
    const backgroundOptionsText = [
        {
            id: 1,
            text: 'pain background',
        },
        {
            id: 2,
            text: 'beach',
        },
        {
            id: 3,
            text: 'ocean',
        },
        {
            id: 4,
            text: 'gym',
        },
        {
            id: 5,
            text: 'photo studio',
        },
        {
            id: 6,
            text: 'coffee place',
        },
        {
            id: 7,
            text: 'garden',
        },
        {
            id: 8,
            text: 'snow',
        },
        {
            id: 9,
            text: 'street',
        },
    ];

    return (
        <>
            <StandardDropdown
                dropdownItemText={genderOptionsText}
                state={gender}
                setState={setGender}
            />

            <StandardDropdown
                dropdownItemText={hairStyleOptionsText}
                state={hairstyle}
                setState={setHairstyle}
            />

            <StandardDropdown
                dropdownItemText={hairColorOptionsText}
                state={hairColor}
                setState={setHairColor}
            />

            {gender == "Male" ?
                <StandardDropdown
                    dropdownItemText={facialHairOptionsText}
                    state={facialHair}
                    setState={setFacialHair}
                />
                : ""}

            <StandardDropdown
                dropdownItemText={backgroundOptionsText}
                state={background}
                setState={setBackground}
            />

            <StandardDropdown
                dropdownItemText={facialExpressionOptionsText}
                state={facialExpression}
                setState={setFacialExpression}
            />
            <StandardDropdown
                dropdownItemText={eyeColorOptionsText}
                state={eyeColor}
                setState={setEyeColor}
            />


            <StandardDropdown
                dropdownItemText={skinToneOptionsText}
                state={skinTone}
                setState={setSkinTone}
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
                dropdownItemText={imageStyleOptionsText}
                state={imageStyle}
                setState={setImageStyle}
            />

            <StandardDropdown
                dropdownItemText={bodyTypeOptionsText}
                state={bodyType}
                setState={setBodyType}
            />

            <StandardDropdown
                dropdownItemText={ageOptionsText}
                state={age}
                setState={setAge}
            />

            <StandardDropdown
                dropdownItemText={ethnicityOptionsText}
                state={ethnicity}
                setState={setEthnicity}
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

        </>
    )
}

export default ProfileAvatarFeatures;