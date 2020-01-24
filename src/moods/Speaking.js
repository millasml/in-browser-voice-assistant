import React from 'react';
// import { tts } from "../helpers/TextToSpeech.js"

class Speaking extends React.Component {

    //this component has a
    constructor(props) {
        super(props);
        this.state = {
            audiosrc: null
        }

        const speechSynthesis = window.speechSynthesis
        
    }

    //this function is called whenever there is an update in state in any component
    componentDidUpdate = (prevProps) => {
        // if there is a change from any mood to "speaking"
        if (this.props.mood === "speaking" && prevProps.mood !== this.props.mood) {
            console.log("*** MOOD : SPEAKING ***")
            //do text to speech
            // tts(this.props.fulfillmentText, this.audioHandler)
            var msg = new window.SpeechSynthesisUtterance(this.props.fulfillmentText)
            window.speechSynthesis.speak(msg)
            this.endAudio()
        }

    }

    //when audio is done playing, change state to either listening or waiting depending on value of "end"
    endAudio = () => {
        console.log("The audio has ended");
        // console.log(this.props.end)
        // if it is end of conversation, go back to waiting state
        if (this.props.end === true) {
            this.props.moodHandler("waiting")
        }
        // if its not end of conversation, go to listening state
        else {
            this.props.moodHandler("listening")
        }

    }

    //this is passed as a completion handler to tts(). it sets the audio source in this compoennt
    audioHandler = (audio) => {
        // console.log("audioHandler()")
        this.setState({
            audiosrc: audio
        })
    }

    //the getAudio() function is purely for debugging purposes
    getAudio = () => {
        console.log("getAudio()")
        // tts("Standard Fulfillment for debug", this.audioHandler)
    }

    render() {
        return (
            <>

                {/* <div id="fulfillment" className="mysterybox">{this.props.fulfillment}</div>
                <h2>Speaking</h2>
                <button onClick={this.getAudio}>Debug Button: Send Debug fulfillment</button>
                <br />
                <p>audio is: {this.state.audiosrc}</p>
                <br /> */}
                <audio src={this.state.audiosrc} onEnded={this.endAudio} autoPlay />
            </>
        )
    }
}



export default Speaking