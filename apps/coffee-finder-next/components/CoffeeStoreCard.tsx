import Link from "next/link";

interface CoffeeStoreCardProps {}

let CoffeeStoreCard: React.FC<CoffeeStoreCardProps> = () => {
    return (
        <Link href={`/`}>
            <article className="box">
                <header>Store name</header>
                <p>Store address</p>
                <p>store URL</p>
            </article>
        </Link>
    );
};

export { CoffeeStoreCard };
