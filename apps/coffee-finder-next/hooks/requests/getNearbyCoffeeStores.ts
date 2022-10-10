async function getNearbyCoffeeStores(latlong: string, limit: number) {
    try {
        let options: RequestInit = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization:
                    typeof process.env.FSQ_PLACES_API_KEY === "string"
                        ? process.env.FSQ_PLACES_API_KEY
                        : "",
            },
        };
        let res = await fetch(
            `https://api.foursquare.com/v3/places/search?query=coffee&ll=${latlong}&limit=${limit.toString()}
       `,
            options
        );

        if (!res) throw new Error("error fetching data");
        let data = res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export { getNearbyCoffeeStores };
