//we import the fulfillmentHandlers from the different files in fulfillment. If there is a way to automate this such that it automatically imports all functions in fulfillment, that would be great!
import {handleEastereggJoke} from '../fulfillment/EasterEggsFulfillment'

//with all the fulfillmentHandlers we import above, we create an intent map, mapping each intent to each handler
const intentMap = new Map();
intentMap.set('Jokes', handleEastereggJoke);


async function mainIntentHandler(standardFulfillment, intent, endCoversation, entities, fulfillmentHandler){

    //if the intent is found in the intent map, we handle the intent locally
    if (intentMap.has(intent)){
        console.log("intentHandler: intent handled locally")
        //*** */handle intent locally

        // TODO: clean this up
        //get the intent from the intentmap, and then pass the entities into the function. the function should return a fulfillment
        intentMap.get(intent)(entities).then( fulfillment => {
                //there will be two types of fulfillment that might from this. one takes the form of a string, and the other an array
                if (typeof fulfillment == "string"){
                    //if it is a string, just send the fulfillment into the fulfillmentHandler
                    fulfillmentHandler(fulfillment, false)
                }
                else{
                    //else, it means that its a handler that controls the UI of enciq (eyeball stuff). pass all the elements in the array as arguments to fulfillmentHandler to update the controller's state accordingly
                    const [fulfillmentText, name, showRecentSightings, showTickerTape] = fulfillment
                    fulfillmentHandler(fulfillmentText, false, name, showRecentSightings, showTickerTape)
                }
                //if you forgot, fulfillmentHandler is a completion handler passed down here from App.js (Controller) --> Thinking.js (Thinking) --> mainIntentHandler (here!)
                //hence, it updates the fulfillmentText in the controller
            
        })
        

    }
    // if the intent is not found in the intent map, we use the fulfillment that was given by dialogflow
    else{
        console.log("intentHandler: intent handled by dialogflow")
        //*** */do normal dialogflow fulfillment    

        let boolval = true
        // console.log("endCoversation, " + JSON.stringify(endCoversation))
        // console.log("fulfillment, " + JSON.stringify(fulfillment))

        //check for end of conversation. The structure of endConversation varies based on response so we check for the different type of structures that all correspond to "its not the end of conversation"
        if (endCoversation === null || endCoversation.fields === undefined || endCoversation.fields.end_conversation === undefined){
            boolval = false
          }
          // if endConversation.fields.end_conversation does exist, use the boolValue that is stored there to determine whether it is the end of conversation or not
          else{
            boolval = endCoversation.fields.end_conversation.boolValue
          }
        

        //send fulfillment to controller
        fulfillmentHandler(standardFulfillment, boolval)
    }
    
}



export default mainIntentHandler