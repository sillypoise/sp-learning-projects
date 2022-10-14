import { GetStaticPropsContext, NextPage } from "next";
import { z } from "zod";
import {
    CoffeeStoreType,
    getNearbyCoffeeStores,
    PlacesAPIResultsParser,
} from "../../hooks/requests/getNearbyCoffeeStores";

type StoreProps = {
    store: CoffeeStoreType;
};

const Store: NextPage<StoreProps> = ({ store }) => {
    console.log(store);
    return (
        <article>
            <h1>Dyanamic coffee store page!</h1>
            <pre>{JSON.stringify(store, null, 4)}</pre>
        </article>
    );
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
    let storeParam = z.string().parse(params?.store);

    let nearbyCoffeeStoresData = await getNearbyCoffeeStores(
        "4.695562523190975,-74.0449747402204",
        6
    );

    let parsedNearbyCoffeeeStoresData = PlacesAPIResultsParser.parse(
        nearbyCoffeeStoresData
    );

    let filteredStoreArray = parsedNearbyCoffeeeStoresData["results"].filter(
        (store) => {
            let compoundId = `${store.slug}_${store.fsq_id}`;
            return compoundId === storeParam;
        }
    );

    let filteredStore = filteredStoreArray.length
        ? filteredStoreArray[0]
        : { message: "no store found " };

    return {
        props: {
            store: filteredStore,
        },
    };
}

export async function getStaticPaths() {
    let nearbyCoffeeStoresData = await getNearbyCoffeeStores(
        "4.695562523190975,-74.0449747402204",
        6
    );

    let parsedNearbyCoffeeeStoresData = PlacesAPIResultsParser.parse(
        nearbyCoffeeStoresData
    );

    let storePaths = parsedNearbyCoffeeeStoresData["results"];
    let storePathsParser = z.array(
        z
            .object({
                fsq_id: z.string(),
                slug: z.string(),
            })
            .transform((s) => ({
                params: {
                    store: `${s.slug}_${s.fsq_id}`,
                },
            }))
    );

    let parsedStorePaths = storePathsParser.parse(storePaths);

    return {
        paths: parsedStorePaths,
        fallback: true,
    };
}

// export async function getStaticProps() {
//     let nearbyCoffeeStoresData = await getNearbyCoffeeStores(
//         "4.695562523190975,-74.0449747402204",
//         6
//     );

//     let parsedNearbyCoffeeeStoresData = PlacesAPIResultsParser.parse(
//         nearbyCoffeeStoresData
//     );

//     return {
//         props: {
//             nearbyCoffeeStores: parsedNearbyCoffeeeStoresData,
//         },
//     };
// }

export default Store;
