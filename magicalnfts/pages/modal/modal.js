import { useState } from "react"

const ImageModal = ({ setModalOpen, selectedImage, setSelectedImage, setrendersellNFT }) => {
    const [error, setError] = useState(null);
    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage(null)
        setrendersellNFT(false)
    }
    const  handleGenerate = () => {
        setrendersellNFT(true)
        setModalOpen(false);
    }
    return (
        <div className="img-modal">
            <button
                style={{right:"0.5rem" }}
                type="button"
                className="btn-close"
                onClick={closeModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                </svg>
            </button>
            <div className="img-container">
                {selectedImage && <img height="400px" width="400px" src={selectedImage} alt="imgg" />}
            </div>


            <div className="create-nftimg-btn row">
                <button
                      onClick={handleGenerate}
                    className="bg-accent-lighter rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                >
                    Create NFT
                </button>
            </div>
        </div>
    )
}
export default ImageModal;