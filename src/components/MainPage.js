import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPictures, setPictures } from "../store/picturesSlice";
import { CatPicture } from "./CatPicture";

export const MainPage = () => {
    const [showBtn, setShowBtn] = useState(false)
    const pictures = useSelector(state => state.pictures.all);
    const prevPictures = JSON.parse(sessionStorage.getItem('allPictures'));
    const scroll = sessionStorage.getItem('scrollPosition');
    const dispatch = useDispatch();

    const fetchNewPictures = async () => {
        try {
            let res = await dispatch(fetchPictures(15)).unwrap();
            
            let entities = {};

            if (sessionStorage.getItem('allPictures')) {
                entities = JSON.parse(sessionStorage.getItem('allPictures'));
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
            sessionStorage.setItem('allPictures', JSON.stringify(entities));

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

        window.addEventListener('beforeunload', () => sessionStorage.setItem('scrollPosition', window.pageYOffset));
        
        
        window.addEventListener('scroll', () => {
            const doc = document.documentElement;
            
            if (doc.scrollTop + doc.clientHeight === doc.scrollHeight) {
                fetchNewPictures()
            }
        })
        
        setTimeout(function () {
            window.scrollTo({top: scroll, behavior: 'smooth'});
        }, 1);
        
    }, []);

    let images;

    if (pictures) {
        images = Object.keys(pictures).map(key => <CatPicture key={key} url={pictures[key].url}/>)
    }

    return <>
        <main>
            {images}
        </main>
        <p onClick={() => fetchNewPictures()}>Больше котиков!</p>
    </>
}