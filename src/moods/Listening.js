import React from 'react';

class Listening extends React.Component {

  constructor(props) {
    super(props)

    //here we get the SpeechRecognition interface from the web speech api
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    // using the SpeechRecognition interface, we create an instance of SpeechRecognition called recognition. This was done in the constructor so that in the future, you can set the language of the recognition service
    this.recognition = new SpeechRecognition()

    //following this is just a bunch of parameteres that are set 
    this.recognition.continous = true
    this.recognition.interimResults = true
    // language of recognition english
    this.recognition.lang = 'en-US'
  }


   //this function is called whenever there is an update in state in any component
  componentDidUpdate = (prevProps) => {
     // if there is a change from any mood to "listening"
    if (this.props.mood === "listening" && prevProps.mood !== this.props.mood) {
      console.log("*** MOOD : LISTENING ***")
        
      this.handleListen()

    }
    else {
      // if there is a change in state to any other mood that is not listening, ensure that you turn off the speech recognition
      this.recognition.stop()
      // console.log("Listening: do nothing")
    }
  }

  //handles Listening - from getting the speech to text to setting the query in the controller using queryHandler
  handleListen = () => {

    //starts voice recognition
    this.recognition.start()
    console.log("start of voice recognition")

    let finalTranscript = ''

    //event handler for results. Everything the recognition object detects speech, this will fire with the results of the speech to text stored in event.results
    this.recognition.onresult = event => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        // console.log("transcript, " + transcript)

        //this if condition is only met when end of utterance is detected. Hence, this bunch of code only runs after the entire speech to text is complete
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';

          //upon end of utterance, set the controller's state.query to the query and change the mood
          this.props.queryHandler(finalTranscript)
          this.props.moodHandler("thinking")

        }

        else interimTranscript += transcript;
      }

      // document.getElementById('interim').innerHTML = interimTranscript
      // document.getElementById('final').innerHTML = finalTranscript

    }

    //event handler when the recognition service ends
    this.recognition.onend = event => {
      console.log('Speech recognition service disconnected');
      //if the mood is still listening, it means that the speech service hasnt detected any speech for 5 seconds which causes the recognition to end without getting any query. 
      //Hence, the if condition in recognition.onresult is never met and mood is never changed. we need to account for this case
      if (this.props.mood === "listening") {

        //this sends the query "" and changes the mood to thinking. the fulfillment would be a prompt to get them to say something else.
        this.props.queryHandler("")
        this.props.moodHandler("thinking")
      }
    }

  }

  render() {
    return (
      <>
        {/* <h2>Listening</h2>
        <button className='btn' onClick={this.toggleListen}>Listen</button>
        <div id="interim" className="mysterybox" ></div>
        <div id="final" className="mysterybox"></div> */}
      </>
    )
  }
}



export default Listening