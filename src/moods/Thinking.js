import React from 'react';
import axios from 'axios';
import mainIntentHandler from '../helpers/intentHandler.js'


class Thinking extends React.Component {

    //this function is called whenever there is an update in state in any component
    componentDidUpdate = (prevProps) => {
        // if there is a change from any mood to "thinking"
        if (this.props.mood === "thinking" && prevProps.mood !== this.props.mood) {
            console.log("*** MOOD : THINKING ***")
            //call the handleIntent() function
            this.handleIntent()
        }

    }

    // in handle intent, we first send the query to dialogflow and then get the response. we then send the response to "mainIntentHandler", a helper function, who does the intent handling
    handleIntent = async () => {

        // first send the query to dialogflow as a HTTP request. The endpoint is a cloud function we created. it can be found in enciq-cloundfunc
        let query = this.props.query

        console.log("sending query: ", query)
        let language = "en-US"
        let params = {
            "query": query,
            "languageCode": language
        }
        await axios.post('https://us-central1-in-browser-voice-assistant-twb.cloudfunctions.net/dfReq', params).then(
            res => {
                //fulfillment messages in dialogflow can be found in one of two places in the response. Hence, what we do here is check which one to use. 
                //by default, we use the fulfillmentText in the response here, assigned to fulfillmentMessage
                let fulfillmentMessage = res.data[0].queryResult.fulfillmentText
                //TODO: test this if condition
                //however, sometimes, there is no fulfillmentText which would render fulfillmentMessage as a empty string. 
                //In the case where fulfillmentMessage is empty, we look to another area of the response for the message
                if (res.data[0].queryResult.fulfillmentText === ""){
                    console.log("thinking: standard fulfillment message not available")
                    //the fulfillment message that we get in this part of the response is given in an array. Hence, we append each element of the array to create one fulfillmentMessage
                    res.data[0].queryResult.fulfillmentMessages.forEach( message => {
                        //concat means adding strings together
                        fulfillmentMessage.concat(message.text.text[0])
                        console.log(fulfillmentMessage)
                    })
                }


                //here, we break the response into the components we use for intentHandling. intent, endConversation and entities
                let intent = res.data[0].queryResult.intent.displayName
                let endConversation = res.data[0].queryResult.diagnosticInfo
                let entities = res.data[0].queryResult.parameters.fields
                console.log("intent, ", intent)
                console.log("entities, ", JSON.stringify(entities))

                //we send the params into the mainIntentHandler, who will do the intent handling. We also pass the fulfillmentHandler down so that the intentHandler can set the fulfillment text of the controller upon finishing its handling
                mainIntentHandler(fulfillmentMessage, intent, endConversation, entities, this.props.fulfillmentHandler) // TODO: await this?
            }
        ).catch( err => {
            console.log("err", err)
            // enciq will say this if something goes wrong with dialogflow request
            this.props.fulfillmentHandler("sorry babe, I didnt hear anything. Plase say that again")
        })
        
    }


    render() {
        return (
            <>
                {/* <h2>Thinking</h2>
                <button className='btn' onClick={this.handleIntent}>Send</button> */}
            </>
        )
    }
}



export default Thinking