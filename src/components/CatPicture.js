import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import fav from '../images/favorite.png';
import favBorder from '../images/favorite_border.png';
import { setPictures, favPictureHandler } from "../store/picturesSlice";

export const CatPicture = ({imgId}) => {
    const pictures = useSelector(state => state.pictures.all);
    const dispatch = useDispatch();
    
    const imgSelected = pictures[imgId].selected;
    const imgUrl = pictures[imgId].url;

    const [dsiplayFavBorder, setDisplayFavBorder] = useState(false);

    const onContEnter = () => setDisplayFavBorder(true);
    const onContLeave = () => setDisplayFavBorder(false);
    const onFavEnter = (e) => e.target.src = fav;
    const onFavLeave = (e) => e.target.src = favBorder;

    const onFavClick = () => {
        const updatedPictures = {
            ...pictures,
            [imgId]: {
                ...pictures[imgId],
                selected: !imgSelected
            }
        }

        sessionStorage.setItem('allPictures', JSON.stringify(updatedPictures));
        dispatch(setPictures(updatedPictures));
        dispatch(favPictureHandler({imgId}))
    }

    return (
    <div className={`img-container ${imgSelected && 'img-container-selected'}`}
        onMouseEnter={onContEnter}
        onMouseLeave={onContLeave}
        >
        <img className="img-cat" src={imgUrl} alt="img-cat" />

        {dsiplayFavBorder && 
            <img 
                className="img-fav-border" 
                src={favBorder} 
                alt="img-fav-border"
                onMouseEnter={onFavEnter}
                onMouseLeave={onFavLeave}
                onClick={onFavClick}
            />
        }

        {imgSelected && 
            <img 
                className="img-fav" 
                src={fav} 
                alt="img-fav"
                onClick={onFavClick}
            />
        }
    </div>)
}