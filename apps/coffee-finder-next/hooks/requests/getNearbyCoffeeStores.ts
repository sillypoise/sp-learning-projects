import { z } from "zod";
import slugify from "slugify";

let CoffeeStoreParser = z
    .object({
        fsq_id: z.string(),
        name: z.string(),
        link: z.string(),
        location: z.object({
            address: z.string(),
        }),
        distance: z.number(),
        imgUrl: z
            .string()
            .default(
                "https://unsplash.com/photos/3b2tADGAWnU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Nnx8Y29mZmVlJTIwc2hvcHxlbnwwfHx8fDE2NTIyNTUwMzk&force=true&w=640"
            ),
    })
    .transform((store) => ({
        ...store,
        address: store.location.address,
        slug: slugify(store.name, { lower: true }),
    }));

let PlacesAPIResultsParser = z.object({
    results: z.array(CoffeeStoreParser),
});

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
        let data = await res.json();
        let parsedData = PlacesAPIResultsParser.parse(data);

        return parsedData;
    } catch (error) {
        if (error instanceof Error)
            return {
                error: z.string().parse(error.stack),
                message: "There was a problem getting the data",
            };
    }
}

export type PlacesAPIResultsType = z.infer<typeof PlacesAPIResultsParser>;

export { getNearbyCoffeeStores, CoffeeStoreParser, PlacesAPIResultsParser };
