import React from 'react';
import './App.css';


import Waiting from './moods/Waiting'
import Listening from './moods/Listening'
import Thinking from './moods/Thinking'
import Speaking from './moods/Speaking'

import Face from './containers/Face'
import Button from '@material-ui/core/Button';
import styled from 'styled-components'

class Controller extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      mood: "initializing", // TODO: refactor as "initializing" for setState({mood: 'waiting'}) onMount after init all basic connections (i.e. speech token etc.)
      query: null, // STT_query
      fulfillmentText: null, // what enciq replies to user
      end : false, // boolean demarking end of conversation

      // eyeball states, default personOfInterest is roy. showInhubitants is not used
      showInhubitants: false,
      showRecentSightings: false,
      showTickertape: false,
      personOfInterest: 'roy'
    }

  }

  //this is passed to all the mood components so that they can update the controller's mood state
  moodHandler = (x) => {
    // if mood is off, can only change to mood: waiting 
    if(this.state.mood === "off" && x !== "waiting"){
      console.log("not allowed to change state")
    }
    // if mood is anything but off, you have free reign to change it to anything
    else{
      this.setState({
        mood: x
      })
    }

  }

  //passed to the listening component so that it can store the query in the controller
  queryHandler = (query) => {
    // completion handler for speech to text 
    this.setState({
      query: query
    })
  }

  //passed to the thinking component so that it can update fulfillment 
  fulfillmentHandler = (fulfillmentText, boolval, person, showRecentSightings, showTickertape) => {

    // default - will always need to set end of conversation and fulfillment text
    this.setState({
      fulfillmentText: fulfillmentText,
      end : boolval
    })

    //however, if values are passed in for showRecentSightings / showTickerTape, update the state here accordingly. this is for eyeball stuff
    if (showRecentSightings !== null || undefined){
      this.setState({
        showRecentSightings: showRecentSightings,
        personOfInterest: person
      })
    }

    if (showTickertape !== null || undefined){
      this.setState({
        showTickertape: showTickertape
      })
    }

    //TODO: make sure mood handling occurs in thinking instead
    this.moodHandler("speaking")
  }


  //When a conversation ends, "this.state.end" will be equal to true. Hence, when starting a new conversation, we need to re-initialize "this.state.end" to false
  prepareForNewConversation = () => {
    this.setState({
      end: false
    })
  }

  //this is the onClick function for the demo button. It allows the change of this.state.mood from [whateeverstate] --> off and from off --> waiting
  toggleDemo = () => {
    if (this.state.mood === "off") {
        this.moodHandler("waiting")
    }
    else {
        this.moodHandler("off")
    }
} 

  startListening = () => {
    if (this.state.mood === "waiting") {
      this.moodHandler("listening")
    }
    else {
      console.log("not allowed to change state unless in waiting")
    }
  }

// the onClick function for the recent sightings button. Is purely for debug purposes
  onClickRecentSightings = () => {
    this.state.showRecentSightings ? this.setState({ showRecentSightings: false, showInhubitants: false }) :
      this.state.showInhubitants ?
        this.setState({ showRecentSightings: true }) :
        this.setState({ showRecentSightings: true, showInhubitants: true })
  }


  forceHideRecentSightings = () => {
    this.setState({ showRecentSightings: false })
  } 




  render() {

    return (
      <>
        {/* picovoice */}
        <Waiting mood={this.state.mood} moodHandler={this.moodHandler} prepareForNewConversation={this.prepareForNewConversation} /> 
        {/* SST */}
        <Listening mood={this.state.mood} moodHandler={this.moodHandler} queryHandler={this.queryHandler} />
        {/* Dialogflow */}
        <Thinking mood={this.state.mood} moodHandler={this.moodHandler} query={this.state.query}  fulfillmentHandler={this.fulfillmentHandler} />
        {/* TTS */}
        <Speaking mood={this.state.mood} moodHandler={this.moodHandler} end={this.state.end} fulfillmentText={this.state.fulfillmentText} />


        <Button
          style={{ zIndex: '+2', position: 'absolute', right: 80, top: 0, color: '#6C3BFF' }}
          onClick={this.startListening}>
          Start Listening
        </Button>


        <Button
          style={{ zIndex: '+2', position: 'absolute', right: 0, top: 0, color: '#6C3BFF' }}
          onClick={this.toggleDemo}>
          {this.state.mood}
        </Button>

        <Face
          status={this.state.mood}
          offsetX={this.state.showRecentSightings}
          offsetY={this.state.showTickertape}
        />

      </>
    )
  }
}

// const Wrapper = styled.main`
//   display: flex;
//   flex-basis: 100%;
//   // position: relative;
//   background-color: black;
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center center;
// `

export default Controller;
