import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

interface CoffeeStoreCardProps {
    id?: string;
    name: string;
    address: string;
    distance?: number;
    slug: string;
    imgUrl?: string;
    className?: string;
}

let CoffeeStoreCard: React.FC<CoffeeStoreCardProps> = ({
    name,
    slug,
    address,
    imgUrl,
}) => {
    return (
        <Link href={`/coffee-store/${slug}}`}>
            <a>
                <article className="box">
                    <header>{name}</header>
                    <Image
                        src={z.string().parse(imgUrl)}
                        alt="default coffee store"
                        width={640 * 0.5}
                        height={426 * 0.5}
                    />
                    <p>{address}</p>
                </article>
            </a>
        </Link>
    );
};

export { CoffeeStoreCard };
