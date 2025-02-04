import React, { useEffect, useState } from 'react';
import { YOUTUBE_VEDIO_API } from '../utils/constant';
import VideoCard, {AdVideoCard} from './VideoCard';
import { Link } from 'react-router-dom';

const VedioConatiner = () => {
  
  const[videos, setvideos] = useState([]);

  useEffect(()=>{

    getVedios();
  },[]);

  const getVedios = async () =>{
    const data = await fetch(YOUTUBE_VEDIO_API)
    const json = await data.json()
    console.log(json.data);
    

    setvideos(json.items)
  }
  return (
    <div className='flex flex-wrap'>
      {videos[0] && <AdVideoCard info={videos[0]}/>}
      {videos.map((video) =>(
       <Link key={video.id} to={"/watch?v="+video.id}> 
       <VideoCard info={video}/>
       </Link>
        ))}
   
    </div>
  )
}

export default VedioConatiner
