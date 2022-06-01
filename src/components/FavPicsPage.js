import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CatPicture } from "./CatPicture";
import { setFavPictures, setPictures } from "../store/picturesSlice";

export const FavPicsPage = () => {
    const dispatch = useDispatch();
    const pictures = useSelector(state => state.pictures.favorite);

    const favorite = JSON.parse(
        sessionStorage.getItem('favPictures')
    );
    const allPictures = JSON.parse(
        sessionStorage.getItem('allPictures')
    );

    useEffect(() => {
        if (allPictures) {
            dispatch(setPictures(allPictures));
        }
        if (favorite) {
            dispatch(setFavPictures(favorite));
        }

        const listener = () => {
            sessionStorage.setItem(
                'scrollPositionFav', window.pageYOffset
            );
        }
        window.addEventListener('scroll', listener);

        return () => window.removeEventListener('scroll', listener);
    }, []);

    let images;

    if (pictures) {
        images = Object.keys(pictures).reverse().map(key => 
            <CatPicture 
                key={key} 
                imgId={key} 
                extraClass='img-container-fav'
            />
        )
    }

    return <>
        <main>
            {images}
        </main>
    </>
}