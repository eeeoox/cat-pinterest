import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPictures, setPictures } from "../store/picturesSlice";
import { CatPicture } from "./CatPicture";

export const MainPage = () => {
    const pictures = useSelector(state => state.pictures.all);
    const prevPictures = JSON.parse(
        sessionStorage.getItem('allPictures')
    );
    const dispatch = useDispatch();

    const fetchNewPictures = async () => {
        try {
            let res = await dispatch(fetchPictures(15)).unwrap();
            
            let entities = {};

            if (sessionStorage.getItem('allPictures')) {
                entities = JSON.parse(
                    sessionStorage.getItem('allPictures')
                );
            }

            res = res.filter(async picture => {
                if (entities[picture.id]) {
                    picture = await dispatch(fetchPictures(1)).unwrap();
                    return picture[0];
                }
                return picture
            })

            res.forEach(picture => {
                entities[picture.id] = {url: picture.url};
            });
            sessionStorage.setItem(
                'allPictures', JSON.stringify(entities)
            );

            dispatch(setPictures(entities));

        } catch (err) {
            alert(err);
        }
    }
    
    useEffect(() => {
        if (!prevPictures) {
            fetchNewPictures();
        } else {
            dispatch(setPictures( prevPictures ));
        }

        const listener = () => {
            sessionStorage.setItem(
                'scrollPositionMain', window.pageYOffset
            );

            const doc = document.documentElement;
            
            if (doc.scrollTop + doc.clientHeight === doc.scrollHeight) {
                fetchNewPictures()
            }
        }
        window.addEventListener('scroll', listener)

        return () => window.removeEventListener('scroll', listener);
    }, []);

    let images;

    if (pictures) {
        images = Object.keys(pictures).map(key => 
            <CatPicture key={key} imgId={key}/>
        )
    }

    return <>
        <main>
            {images}
        </main>

        <p 
            className="more-cats-msg" 
            onClick={() => fetchNewPictures()}>
            ... загружаем еще котиков ...
        </p>
    </>
}