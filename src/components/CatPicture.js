import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import fav from '../images/favorite.png';
import favBorder from '../images/favorite_border.png';
import spinner from '../images/spinner-icon.jpg'
import { 
    setPictures, 
    favPictureHandler 
} from "../store/picturesSlice";

export const CatPicture = ({imgId, extraClass}) => {
    const [containerClass, setContainerClass] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    const pictures = useSelector(state => state.pictures.all);

    let favotites = sessionStorage.getItem('favPictures');
    if (!favotites) {
        favotites = {}
    } else {
        favotites = JSON.parse(favotites);
    }

    const dispatch = useDispatch();
    
    const imgSelected = pictures[imgId].selected;
    const imgUrl = pictures[imgId].url;

    const [dsiplayFavBorder, setDisplayFavBorder] = useState(false);

    const onContEnter = () => {
        setDisplayFavBorder(true);
        setContainerClass(true);
    };
    const onContLeave = () => {
        setDisplayFavBorder(false)
        setContainerClass(false);
    };
    const onFavEnter = (e) => e.target.src = fav;
    const onFavLeave = (e) => {
        e.target.src = extraClass ? fav : favBorder
    };

    const onFavClick = () => {
        const updatedPictures = {
            ...pictures,
            [imgId]: {
                ...pictures[imgId],
                selected: !imgSelected
            }
        }

        if (!imgSelected) {
            sessionStorage.setItem('favPictures', JSON.stringify({
                ...favotites, 
                [imgId]: {
                    ...pictures[imgId],
                    selected: !imgSelected
                }
            }));
        } else {
            delete favotites[imgId];
            sessionStorage.setItem(
                'favPictures', JSON.stringify(favotites)
            );
        }

        sessionStorage.setItem(
            'allPictures', JSON.stringify(updatedPictures)
        );
        dispatch(setPictures(updatedPictures));
        dispatch(favPictureHandler({imgId}))
    }

    const addContainerClass = () => {
        let contClass = 'img-container';

        if ((imgSelected && !extraClass) || containerClass) {
            contClass += ' img-container-selected';
        }
        if (extraClass) {
            contClass += ` ${extraClass}`
        }
        return contClass;
    }

    const img = React.createElement('img', {
        src: imgUrl, 
        alt: 'img-cat',
        className: 'img-cat',
        hidden: true,
        onLoad: (e) => {
            e.target.hidden = false;
            setImgLoaded(true);
        }
    });


    return (
    <div className={addContainerClass()}
        onMouseEnter={onContEnter}
        onMouseLeave={onContLeave}
        >
        {img}
        {!imgLoaded && 
            <div className="img-spinner-container">
                <img 
                    className="img-spinner" 
                    src={spinner} 
                    alt='spinner'
                />
            </div>
        }

        {dsiplayFavBorder && 
            <img 
                className="img-fav-border" 
                src={extraClass? fav : favBorder} 
                alt="img-fav-border"
                onMouseEnter={onFavEnter}
                onMouseLeave={onFavLeave}
                onClick={onFavClick}
            />
        }

        {imgSelected && !extraClass && 
            <img 
                className="img-fav" 
                src={fav} 
                alt="img-fav"
                onClick={onFavClick}
            />
        }
    </div>)
}