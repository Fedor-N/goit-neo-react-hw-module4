import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ imageList, openModal }) => {
    return (
        <ul className={css.gallery}>
            {imageList.map(image => {
                return (
                    <li key={image.id} >
                        <ImageCard
                            image={image}
                            openModal={openModal}
                        />
                    </li>
                )
            })}
            
        </ul>
    );
};

export default ImageGallery;
