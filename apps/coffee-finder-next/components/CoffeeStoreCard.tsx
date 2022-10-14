import Link from "next/link";
import { z } from "zod";
import { ImageWrapper } from "./ImageWrapper";

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
    let parsedImgUrl = z.string().parse(imgUrl);
    return (
        <Link href={`/coffee-store/${slug}`}>
            <a className="no-underline">
                <article className="rounded-lg overflow-hidden shadow-lg stack [--stack-gap:theme(spacing.xs)] plb-xs hover:bg-[color:var(--neutral-surface-2)]">
                    <div className="pli-xs">
                        <header className="stack [--stack-gap:theme(spacing.2xs)]">
                            <p className="text-1 font-bold">{name}</p>
                        </header>
                    </div>
                    <ImageWrapper
                        srcSet={[""]}
                        src={parsedImgUrl}
                        className="w-full object-cover max-bs-[10em]"
                        altText="default coffee shop"
                        lazyLoading={false}
                    />
                    <div className="pli-xs">
                        <p className="text-00 text-[color:var(--neutral-on-surface-1)] opacity-80">
                            {address}
                        </p>
                    </div>
                </article>
            </a>
        </Link>
    );
};

export { CoffeeStoreCard };
