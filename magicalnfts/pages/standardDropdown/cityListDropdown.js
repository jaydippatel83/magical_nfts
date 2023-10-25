import React, { useState } from "react";

const CityListDropdown = ({ dropdownItemText, state, setState }) => {
    const [dropdownItemActive, setDropdownItemActive] = useState(null);
    const [dropdownShow, setDropdownShow] = useState(false);

    const handleDropdown = () => {
        setDropdownShow(!dropdownShow);
    };

    const handleDropdownItemClick = (id, text) => {
        setState(text);
        setDropdownItemActive(id);
        setDropdownShow(false);
    };


    return (
        <>
            <div className="mb-8 flex flex-wrap items-start justify-between">
                <div className="dropdown relative my-1 cursor-pointer">
                    <button
                        className={`dark:bg-jacarta-700 dropdown-toggle border-jacarta-100 dark:border-jacarta-600 inline-flex w-100 items-center justify-between rounded-lg border bg-white py-2 px-3 text-sm dark:text-white text-base`}
                        onClick={handleDropdown}
                    >
                        <span className="font-display">{state}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="fill-jacarta-500 h-4 w-4 dark:fill-white"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                        </svg>
                    </button>

                    <div
                        style={{ width: "100% !important" }}
                        className={
                            dropdownShow
                                ? ' dark:bg-jacarta-800 z-10 max-w-sm w-[23rem] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl absolute top-full show'
                                : ' dark:bg-jacarta-800 z-10 max-w-sm w-[23rem] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl absolute top-full hidden'
                        }
                    >
                        {dropdownItemText && dropdownItemText.map(({ id, text }) => {
                            return (
                                <button
                                    key={id}
                                    className="dropdown-item font-display text-jacarta-700 dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
                                    onClick={() => handleDropdownItemClick(id, text)}
                                >
                                    {text}
                                    {dropdownItemActive === id && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            className="fill-accent h-4 w-4"
                                        >
                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                            <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CityListDropdown;