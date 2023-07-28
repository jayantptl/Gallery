import { useEffect, useRef, useState } from "react";
import Loading from './Loading'


const Gallery = () => {

    // get all the api keys and google drive url 
    const FOLDER_ID = process.env.REACT_APP_FOLDER_ID;
    const GOOGLE_API_KEY = process.env.REACT_APP_API_KEY;
    const GOOGLE_DRIVE_URL_START = "https://www.googleapis.com/drive/v2/files?q=%27";
    const GOOGLE_DRIVE_URL_END = "%27+in+parents&key=";
    const GOOGLE_DRIVE_IMG_URL = "http://drive.google.com/uc?export=view&id=";

    // to store all the images
    var allImages;

    // state variables 
    const [images, setImages] = useState([]);   // stores all the images currently in the browser   
    const imageRef = useRef({});               // used to store the reference of the previous images array
    const [isLoading, setLoading] = useState(false);
    const [againFetch, setAgainFetch] = useState(true);
    const [previewing, setPreview] = useState(false);       // when a image is clicked on , preview component is loaded
    const [clickedId, setClickedId] = useState(0);          // id of the clicked image


    // async function to fetch images from drive
    const getimg = async () => {
        setLoading(true);
        const url = GOOGLE_DRIVE_URL_START + FOLDER_ID + GOOGLE_DRIVE_URL_END + GOOGLE_API_KEY;
        const response = await fetch(url);
        const jsonResp = await response.json();
        allImages = jsonResp.items;

         // console.log('url',url);
         console.log(Images Fetched);
        let tmp_images = [];
        for (let i = 0; i < 6; i++) {
            tmp_images.push(allImages[i]);
        }

        setImages(tmp_images);   // initialize the images array with starting 6 images 
    }

    // runs once on initial render and fetches the data
    useEffect(() => {
        getimg();
    }, [])


    // re-renders when images array state has new images added 
    useEffect(() => {
        if (images.length) {
            setLoading(false);
            imageRef.current = images;         // storing the refrence of the previous images array
        }

    }, [images])


    // handle function to check if user has scrolled down to the bottem and fetches 6 more images and adds to images array
    const handleInfiniteScroll = async () => {

        try {
            if ((window.innerHeight + document.documentElement.scrollTop + 1) >= document.documentElement.scrollHeight) {
                setAgainFetch(true);
                let tmp_images = [];
                let cur_index = imageRef.current.length - 1;
                const total_size = allImages.length;
                for (let i = 1; i <= 6; i++) {
                    tmp_images.push(allImages[(cur_index + i) % (total_size)]);

                }

                // adding 6 more images
                setImages([...imageRef.current, ...tmp_images]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => window.removeEventListener('scroll', handleInfiniteScroll);
    }, [])


    // when user scrolls and page height changes hence updating the position of the preview box using scroll top
    useEffect(() => {
        if (previewing) {
            const top_height = Math.floor(document.documentElement.scrollTop + 140);
            let h = top_height + 'px';
            console.log(h);
            document.getElementById('preview').style.top = h;
        }
    }, [previewing]);





    const shadow = document.querySelector(".shadow");
    // when user clicks on an image
    const handleClick = (ImgId) => {

        setClickedId(ImgId);
        setPreview(true);
        document.querySelector("body").style.overflow = "hidden";
        shadow.style.display = "block";

    }

    const handleCrossed = () => {
        setPreview(false);
        shadow.style.display = "none";
        document.querySelector("body").style.overflow = "scroll";
    }



    return (
        <>
            <div className="gal_container">

                <div className="wrapper">
                    <div className="gallery">

                        {!isLoading &&
                            images.map((photo) => {
                                return (
                                    <div className="image" onClick={() => handleClick(photo.id)}><span><img src={GOOGLE_DRIVE_IMG_URL + photo.id} style={{ height: "400px", width: "400px" }} /></span></div>
                                )
                            })

                        }
                    </div>
                </div>

                {previewing && (<div className="preview-box show" id="preview">
                    <div className="details">
                        <span className="title"> <p className="Img_title">#Image Title</p></span>
                        <span onClick={handleCrossed} className="icon"> <i className="fa-solid fa-circle-xmark"></i></span>
                    </div>
                    <div className="image-box">

                        <img src={GOOGLE_DRIVE_IMG_URL + clickedId} style={{ height: "600px" }} alt="" />
                    </div>
                </div>)}


                <div className="shadow"></div>

            </div>
            {againFetch && <Loading />}
        </>
    )
}

export default Gallery;
