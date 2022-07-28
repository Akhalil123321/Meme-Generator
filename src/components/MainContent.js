import React from 'react';
import Data from './Data'
export default function MainContent(){
        const [memeImage, setMemeImage] = React.useState({
            img:"http://i.imgflip.com/1bij.jpg",
            topText:'',
            bottomText:''
        })
        function getRandomImage(event){
        event.preventDefault()
        const memeArray=Data.data.memes
        const randomNumber =Math.floor(Math.random() * memeArray.length)
        // setMemeImage(memeArray[randomNumber].url)
        setMemeImage(prevMemeImage=>{
            return{
                ...prevMemeImage,
                img :memeArray[randomNumber].url
            }
        })

    }
    return(
        <main className='body-container'>
            <form className='form'>
                <input type='text' placeholder='Top text' className='input-form1' />
                <input type='text' placeholder='Bottom text' className='input-form2'/>
            <button 
            className='meme-btn'
            onClick={getRandomImage}
            >Get a new meme image</button>
            </form>
            <img 
            src={memeImage.img} 
            className='meme-pack' 
            alt=''
            />
        </main>
    )
}