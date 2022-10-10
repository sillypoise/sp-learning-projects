import Link from "next/link";

interface CoffeeStoreCardProps {
    id: string;
    name: string;
    address: string;
    distance: number;
    slug: string;
    imgUrl: string;
    className: string;
}

let CoffeeStoreCard: React.FC<CoffeeStoreCardProps> = ({
    name,
    slug,
    address,
}) => {
    return (
        <Link href={`/coffee-store/${slug}}`}>
            <article className="box">
                <header>{name}</header>
                <p>{address}</p>
            </article>
        </Link>
    );
};

export { CoffeeStoreCard };
