import { useState } from "react"

export const CatPicture = ({url}) => {
    const [dsiplayLike, setDisplayLike] = useState(false);
    const [dsiplayFav, setDisplayFav] = useState(false);


    return <div className="img-container">
        <img className="img-cat" src={url} alt="img-cat" />

        {dsiplayLike && <img className="img-like" src="" alt=""/>}
        

        {dsiplayFav && <img className="img-fav" src="" alt=""/>}
    </div>
}