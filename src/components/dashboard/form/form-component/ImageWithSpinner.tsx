import { createSignal } from "solid-js";
import Spinner from "../../Spinner";

export default function ImageWithSpinner({ src, alt }: { src: string, alt?: string }) {
    const [isLoading, setIsLoading] = createSignal(true);
    const [hasError, setHasError] = createSignal(false);

    const onLoad = () => setIsLoading(false);
    const onError = () => {
        setIsLoading(false);
        setHasError(true);
    };
    return (
        <div class="relative">
            {isLoading() && (
                <Spinner />
            )}
            {hasError() ? (
                <div class="text-red-500 text-center p-4">
                    Failed to load image.
                </div>
            ) : (
                <figure class="w-auto h-auto mx-auto">
                    <img
                        src={src}
                        alt={alt}
                        class={isLoading() ? "opacity-0" : "opacity-100 transition-opacity duration-300"}
                        onLoad={onLoad}
                        onError={onError}
                    />
                </figure>
            )}
        </div>
    )
}