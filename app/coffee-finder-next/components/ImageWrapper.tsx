type ImageWrapperProps = {
    src: string;
    srcSet: Array<string>;
    sizes?: Array<string> | string;
    altText: string;
    title?: string;
    width?: number;
    height?: number;
    className?: string;
    lazyLoading: boolean;
};

function ImageWrapper({
    src,
    srcSet = [""],
    sizes = "(min-width: 50rem) 50rem,(min-width: 80rem) 80rem, 100vw",
    altText,
    width,
    height,
    title,
    className = "",
    lazyLoading = false,
}: ImageWrapperProps) {
    let srcSetString = srcSet.join(", ");
    let sizesString = typeof sizes === "object" ? sizes.join(", ") : sizes;

    return (
        <img
            src={src}
            srcSet={srcSetString}
            sizes={sizesString}
            width={`${width}px`}
            height={`${height}px`}
            alt={altText}
            title={title}
            className={className}
            loading={lazyLoading ? "lazy" : "eager"}
        />
    );
}

export { ImageWrapper };
