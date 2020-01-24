import React from 'react';
import HotwordDetection from '../helpers/hotWordDetection.js';


class Waiting extends React.Component {

    constructor(props) {
        super(props);
        // initialising the Hotword Detector with the completion handler that changes the state from waiting to listening
        this.hotWordDetector = HotwordDetection(this.changeStateFromWaitingToListening) 
    }


    // changeStateToWaiting = () => {
    //     this.props.moodHandler("waiting")
    // }

    //mount function - supposed to do initialization but we'll get to it later
    componentDidMount = () => {
        console.log("component mounted")
        if (this.props.mood === "initializing") {
            this.props.moodHandler("waiting")
            console.log("*** MOOD : WAITING ***")
            this.startHotWordDetection()
        }
    }

    //this function is called whenever there is an update in state in any component
    componentDidUpdate = (prevProps) => {
        // if there is a change from any mood to "waiting"
        if (this.props.mood === "waiting" && prevProps.mood !== this.props.mood) {
            //prepare for a new conversation. that is, make sure that end of conversation is false since we are starting a new conversation
            this.props.prepareForNewConversation()
            console.log("*** MOOD : WAITING ***")
            // and since we are in the waiting mood, start hot word detection
            this.startHotWordDetection()
        }
        // if there is a change of mood from waiting --> off
        else if (this.props.mood === "off" && prevProps.mood === "waiting" ) {
            //it means that hotword detection is still on (because the waiting state starts hotword detection). We must turn it off since we are going to the off state
            this.stopHotWordDetection()
        }
        else if (this.props.mood === "listening" && prevProps.mood === "waiting" ) {
            //it means that hotword detection is still on (because the waiting state starts hotword detection). We must turn it off since we are going to the off state
            this.stopHotWordDetection()
        }

    }

    toggleDemo = () => {
        // puts up "demo screen" in debug mode. as of now, never used.
        if (this.props.mood === "off") {
            this.props.moodHandler("waiting")
            this.startHotWordDetection()
        }
        else {
            this.stopHotWordDetection()
            this.props.moodHandler("off")
        }
    }


    // toggleWait(){
    //     if (this.props.mood === "waiting"){
    //         console.log("*** MOOD : WAITING ***")
    //         this.props.moodHandler("listening")

    //     }

    // }

    //this is the completion handler passed to HotWordDetector
    changeStateFromWaitingToListening = () => {
        // completion handler for Hotword Detector
        this.props.moodHandler("listening")
    }

    //starts HotWordDetection only if you are in the waiting mood
    startHotWordDetection = () => {
        // TODO: implement stop() too
        if (this.props.mood === "waiting") {
            this.hotWordDetector.start()
        }
        else{
            console.log("Waiting.js startHotWordDetection(): you cant start hotword detection because you are not in the waiting mood!")
        }

    }

    //stopsHotWordDetection
    stopHotWordDetection = () => {
        // TODO: implement stop() too
        console.log("*** MOOD : OFF ***")
        this.hotWordDetector.stop()
        
    }


    render() {

        let button

        if (this.props.mood === "off") {
            button = <button onClick={this.toggleDemo}>On Demo</button>
        } else {
            button = <button onClick={this.toggleDemo}>Off Demo</button>
        }


        return (
            <>
                {/* <h2>Waiting</h2>
                {button} */}
            </>
        )
    }
}
// FUTURE: button styling


export default Waiting