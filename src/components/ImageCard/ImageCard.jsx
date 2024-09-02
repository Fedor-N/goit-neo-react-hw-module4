import css from "./ImageCard.module.css";


const ImageCard = ({ image, openModal}) => {
    return (
        <div className={css["photo-card"]}>
            <img src={image.urls.small} alt={image.alt_description} className={css.image} onClick={()=>openModal(image)} />
        </div >
    )
};

export default ImageCard;
