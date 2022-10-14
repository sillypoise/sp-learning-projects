import { GetStaticPropsContext, NextPage } from "next";
import { z } from "zod";
import {
    getNearbyCoffeeStores,
    PlacesAPIResultsParser,
    PlacesAPIResultsType,
} from "../../hooks/requests/getNearbyCoffeeStores";

type StoreProps = {
    nearbyCoffeeStores: PlacesAPIResultsType;
};

const Store: NextPage<StoreProps> = ({ nearbyCoffeeStores }) => {
    // console.log(nearbyCoffeeStores);
    return (
        <article>
            <h1>Dyanamic coffee store page!</h1>
        </article>
    );
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
    let param = z.string().parse(params?.store);

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
                name: z.string(),
            })
            .transform((s) => ({
                params: {
                    store: `${s.name}_${s.fsq_id}`,
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
