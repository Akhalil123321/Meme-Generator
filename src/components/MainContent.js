import React from 'react';
import domtoimage from 'dom-to-image';
export default function MainContent(){
        const [meme, setMeme] = React.useState({
            img:"http://i.imgflip.com/1bij.jpg",
            topText:'',
            bottomText:''
        })
        const [allMemes, setAllMemes] = React.useState([])
        const [downloadImg, setdownloadImg] = React.useState('')
        
        React.useEffect(() => {
            async function getmemes(){
                const res = await fetch("https://api.imgflip.com/get_memes")
                const data  = await res.json() 
                setAllMemes(data.data.memes)
            }
            getmemes()
        }, [])

        function getRandomImage(event){
            event.preventDefault()
            const randomNumber =Math.floor(Math.random() * allMemes.length)
            document.querySelector('.input-form1').value=''
            document.querySelector('.input-form2').value=''
        setMeme(prevMeme=>{
            return{
                img :allMemes[randomNumber].url
            }
        })}
        
        function handleChange(event){
            const {name, value}=event.target
            setMeme(prevMeme => ({...prevMeme, [name] : value}))
        }

        // download meme function
        const boxRef=React.useRef(null)
        const downloadImage = (dom) => {
            domtoimage.toPng(dom).then(function(dataURL){
                let img = new Image()
                img.src =dataURL
                setdownloadImg(img.src)
            })
        }
    return(
        <main className='body-container'>
            <form className='form'>
                <input 
                type='text' 
                placeholder='Top text' 
                className='input-form1'
                onChange={handleChange}
                name='topText' 
                />
                <input 
                type='text' 
                placeholder='Bottom text' 
                className='input-form2'
                onChange={handleChange}
                name='bottomText'  
                />
                </form>
            <button 
            className='meme-btn'
            onClick={getRandomImage}
            >Get a new meme image 🖼</button>
            <main className='meme-cont' ref={boxRef}>
            <h1 className='meme--text top'>{meme.topText}</h1>
            <h1 className='meme--text bottom'>{meme.bottomText}</h1>
            <img 
            src={meme.img} 
            className='meme-img' 
            alt=''
            />
            </main>

            {/* download meme */}
            <div className='download-btn-cont'>
            <button 
            className='export-btn' 
            onClick={()=>downloadImage(boxRef.current)}
            >
                Export Meme
            </button>
            <a 
            href={downloadImg} 
            className='download-btn' 
            download='Your Meme'
            >
                Download Meme
            </a>
            </div>
            <p className='instruction'>press export then press download</p>
        </main>
    )
}


