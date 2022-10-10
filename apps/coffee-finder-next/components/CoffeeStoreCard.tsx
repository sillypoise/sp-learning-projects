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
            <a className="no-underline">
                <article className="box rounded-md stack [--stack-gap:theme(spacing.2xs)]">
                    <header className="font-semibold">{name}</header>
                    <div className="[&>span]:drop-shadow-md">
                        <Image
                            src={z.string().parse(imgUrl)}
                            alt="default coffee store"
                            width={640 * 0.5}
                            height={426 * 0.5}
                        />
                    </div>
                    <p className="text-00  tracking-2">{address}</p>
                </article>
            </a>
        </Link>
    );
};

export { CoffeeStoreCard };
