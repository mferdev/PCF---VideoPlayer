import * as React from "react";
import * as ReactDOM from "react-dom";
import EmptyUrl from "./EmptyUrl";

import {IInputs, IOutputs} from "./generated/ManifestTypes";

import { IVideoPlayerProps } from "./IVideoPlayer";
import VideoPlayer from "./VideoPlayer";

export class mfervideoplayer implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _context:ComponentFramework.Context<IInputs>
    private _notifyOutputChanged:()=>void;
    private props: IVideoPlayerProps ={
        url:"",
        width:650,
        height:400,
        badformat:false,
        empty:false
    }
    
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this._container = container;
        this._notifyOutputChanged = notifyOutputChanged;
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        this._context = context;
        this.props.url = this._context.parameters.url.raw || "";
        this.props.width = this._context.parameters.width.raw || 650;
        this.props.height = this._context.parameters.height.raw || 400;
        
        console.log(this.props);
        if(this.props.url && this.props.url.includes("https://www.youtube.com/watch?v=")){
            ReactDOM.render(
                React.createElement(
                    VideoPlayer,
                    this.props
                ),
                this._container
            );
        }
        else
        {
            if(!this.props.url) this.props.empty = true;
            else if(!this.props.url.includes("https://www.youtube.com/watch?v=")) this.props.badformat = true;

            ReactDOM.render(
                React.createElement(
                    EmptyUrl,
                    this.props
                ),
                this._container
            );
        }
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {
            url: this.props.url
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
    }
}
