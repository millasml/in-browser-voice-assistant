import rp  from 'request-promise';


export async function handleEastereggJoke() {
    try {
        let joke = "What kind of horse only goes out at night? Nightmares"

        var options = {
            method: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/http://icanhazdadjoke.com',
            headers:
            {
                'cache-control': 'no-cache',
                Connection: 'keep-alive',
                Referer: 'http://icanhazdadjoke.com/',
                'Accept-Encoding': 'gzip, deflate',
                'Cache-Control': 'no-cache',
                Accept: 'application/json'
            }
        };

        joke = await rp(options).then( res => {
            return JSON.parse(res).joke
        })

        return joke
        
    } catch (error) {
        console.log("error, ", error)
    }
}


