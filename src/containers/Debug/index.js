import React from 'react'

class Debug extends React.Component{
    render(){
        return(
            <>
                <h1>Enc.IQ is Online</h1>
                <p>mood is: {this.state.mood}</p>
                <p>query is: {this.state.query}</p>
                <p>fulfillment is: {this.state.fulfillment}</p>
                <p>end is: {this.state.end.toString()}</p>
            </>
        )
    }

}