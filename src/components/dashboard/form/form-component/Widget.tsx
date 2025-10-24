import { Cloudinary as cloudOptm } from "@cloudinary/url-gen"
import { scale } from "@cloudinary/url-gen/actions/resize"

import { PUBLIC_CLOUDINARY_CLOUD_NAME } from "astro:env/server"


const cld = new cloudOptm({
    cloud: {
        cloudName: PUBLIC_CLOUDINARY_CLOUD_NAME
    }
})

interface WidgetProps {
    src: string
    height?: number
    width?: number
}

export default function Widget({ src, height, width }: WidgetProps) {
    return (
        <figure class="w-auto h-auto mx-auto">
            <img src={cld.image(src)
                .quality('auto')
                .format('auto')
                .resize(scale()
                    .width(width || 300)
                    .height(height || 300))
                .toURL()}
                alt="Widget Diagram" />
        </figure>
    )
}