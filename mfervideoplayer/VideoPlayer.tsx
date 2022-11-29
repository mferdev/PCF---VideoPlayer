import React = require('react');
import ReactPlayer from 'react-player'

import { IVideoPlayerProps } from './IVideoPlayer';

const VideoPlayer = (props:IVideoPlayerProps) => {

    console.log("VideoPlayer" + props.url)
    return (
        <div className='main'>
            <ReactPlayer url={props.url} width={props.width} height={props.height} />
        </div>
    )
}

export default VideoPlayer;