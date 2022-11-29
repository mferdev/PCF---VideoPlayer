import React = require("react");
import { IVideoPlayerProps } from "./IVideoPlayer";

const EmptyUrl = (props:IVideoPlayerProps) => {
    var bodyMessage;
    if(props.empty) bodyMessage = <h4>Rellenar campo url</h4>
    else if(props.badformat) bodyMessage = <><h4>El campo url no tiene un formato de youtube correcto</h4><h5 style={{color:'red'}}>{props.url}</h5></>
    return (
        <>
            {bodyMessage}
        </>
    )
}

export default EmptyUrl;