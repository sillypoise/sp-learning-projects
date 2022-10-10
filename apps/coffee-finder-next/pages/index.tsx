import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
    getNearbyCoffeeStores,
    PlacesAPIResultsParser,
    PlacesAPIResultsType,
} from "../hooks/requests/getNearbyCoffeeStores";
import { CoffeeStoreCard } from "../components/CoffeeStoreCard";

type HomeProps = {
    nearbyCoffeeStores: PlacesAPIResultsType;
};

const Home: NextPage<HomeProps> = ({ nearbyCoffeeStores }) => {
    let stores = nearbyCoffeeStores["results"];
    console.log(stores);

    let test = stores[0];
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
                    <CoffeeStoreCard
                        name={test.name}
                        address={test.address}
                        slug={test.slug}
                        imgUrl={test.imgUrl}
                    />
                </article>
            </main>
        </>
    );
};

export async function getStaticProps() {
    let nearbyCoffeeStoresData = await getNearbyCoffeeStores(
        "4.695562523190975,-74.0449747402204",
        6
    );

    let parsedNearbyCoffeeeStoresData = PlacesAPIResultsParser.parse(
        nearbyCoffeeStoresData
    );

    return {
        props: {
            nearbyCoffeeStores: parsedNearbyCoffeeeStoresData,
        },
    };
}

export default Home;
