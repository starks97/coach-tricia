import { Cloudinary as cloudOptm } from "@cloudinary/url-gen"
import { scale } from "@cloudinary/url-gen/actions/resize"

//import { PUBLIC_CLOUDINARY_CLOUD_NAME } from "astro:env/server"


const cld = new cloudOptm({
    cloud: {
        cloudName: "dyrtdhsl0"
    }
})

interface WidgetProps {
    src: string
    height?: number
    width?: number
}

function extractPublicID(url: string) {
    if (!url.startsWith("http")) return url;
    try {
        const urlObj = new URL(url);
        if (!urlObj.hostname.includes(("cloudinary.com"))) {
            return url
        }

        const pathParts = urlObj.pathname.split("/upload/");
        if (pathParts.length < 2) {
            return url
        }

        const uploadPart = pathParts[1];
        const withoutQuery = uploadPart.split('?')[0];

        const withoutVersion = withoutQuery.replace(/^v\d+\//, '');

        const decodedPublicId = decodeURIComponent(withoutVersion);

        return decodedPublicId

    } catch (e) {
        console.warn('Could not parse URL, using original value:', e);
        return url;

    }

}

export default function WidgetImage({ src, height, width }: WidgetProps) {
    const publicId = extractPublicID(src);
    return (
        <figure class="w-auto h-auto mx-auto">
            <img src={cld.image(publicId)
                .quality('auto')
                .format('auto')
                .resize(scale()
                    .width(width || 100)
                    .height(height || 100))
                .toURL()}
                alt="Widget Diagram" />
        </figure>
    )
}