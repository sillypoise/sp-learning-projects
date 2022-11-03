import { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import { z } from "zod";
import { ImageWrapper } from "../../components/ImageWrapper";
import {
    CoffeeStoreType,
    getNearbyCoffeeStores,
    PlacesAPIResultsParser,
} from "../../hooks/requests/getNearbyCoffeeStores";

type StoreProps = {
    store: CoffeeStoreType;
};

const Store: NextPage<StoreProps> = ({ store }) => {
    let { name, address, imgUrl, distance } = store;
    if (store.hasOwnProperty("message")) {
        return <p>oopsie we got an error</p>;
    }

    return (
        <article className="center stack mlb-l">
            <h1>{name}</h1>
            <Link href="/">
                <a href="" className="cluster gap-2xs">
                    <span className="with-icon [--icon-space:theme(spacing.3xs)]">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            className="icon"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </span>
                    home
                </a>
            </Link>
            <div className="switcher">
                <div className="">
                    <ImageWrapper
                        srcSet={[""]}
                        src={imgUrl}
                        className="object-cover drop-shadow-md rounded-md"
                        altText="default coffee shop"
                        lazyLoading={false}
                    />
                </div>
                <div className="grow-[1.5]">
                    <p>{address}</p>
                    <p>{distance}</p>
                </div>
            </div>
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
        fallback: false,
    };
}

export default Store;
