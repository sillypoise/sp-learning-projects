import type { NextPage } from "next";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import Head from "next/head";
import Image from "next/image";
import { getNearbyCoffeeStores } from "../hooks/requests/getNearbyCoffeeStores";
import { CoffeeStoreCard } from "../components/CoffeeStoreCard";

const Home: NextPage = (props) => {
<<<<<<< HEAD
=======
    console.dir(props);

>>>>>>> 1424a6e (app/coffee-finder-next/foursquareAPI)
    return (
        <>
            <Head>
                <title>Coffe finder app</title>
                <meta
                    name="description"
                    content="A coffee finder app to find coffee shop close to you"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="mlb-xl">
                <article className="stack center [--center-width:theme(contentWidth.2)]">
                    <h2>
                        Coffee Finder <span>☕</span>
                    </h2>
                    <p>Disover your local coffee shops!</p>
                    <button
                        className="bg-light-red-6 text-scheme-light-on-background focus:ring-2 ring-scheme-light-neutral-surface-2 font-bold drop-shadow-sm hover:drop-shadow-md ring-offset-2 pli-m plb-xs rounded-lg self-start"
                        onClick={() => console.log("finding")}
                    >
                        Find Stores Near You!
                    </button>
                    <hr />
                    <CoffeeStoreCard />
                </article>
            </main>
        </>
    );
};

export async function getStaticProps() {
<<<<<<< HEAD
=======
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

>>>>>>> 1424a6e (app/coffee-finder-next/foursquareAPI)
    let nearbyCoffeeStoresData = await getNearbyCoffeeStores(
        "4.695562523190975,-74.0449747402204",
        6
    );

<<<<<<< HEAD
    console.dir(nearbyCoffeeStoresData, { depth: 3 });

=======
>>>>>>> 1424a6e (app/coffee-finder-next/foursquareAPI)
    return {
        props: {
            nearbyCoffeeStores: { nearbyCoffeeStoresData },
        },
    };
}

export default Home;
