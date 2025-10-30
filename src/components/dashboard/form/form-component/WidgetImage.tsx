import { useImageState } from "../handlers/useImageState"
import CustomDialog from "./Dialog"
import ImageWithSpinner from "./ImageWithSpinner"
import PopOver from "./PopOver"
import { createMemo } from "solid-js"


interface WidgetProps {
    src: string
    height?: number
    width?: number
    path: string
}


export default function WidgetImage({ src, height, width, path }: WidgetProps) {
    const imgState = useImageState();
    const optimizedSrc = createMemo(() => imgState.optimizeImageDisplay(src));
    const previewSrc = createMemo(() => imgState.optimizeImageDisplay(src, 600, 400));
    return (
        <>
            {imgState.isEditing() ? (
                <div>
                    <h1>Welcome to edit mode</h1>
                    <button onClick={() => imgState.closeEditToggle()}>Close</button>
                </div>
            ) : (<div>
                <figure class="w-auto h-auto mx-auto">
                    <ImageWithSpinner src={optimizedSrc()} alt={`${path}-image`} />
                </figure >
                <PopOver>
                    <div>This is the popover content!</div>
                </PopOver>
                <CustomDialog btnName="Preview">
                    <ImageWithSpinner src={previewSrc()} alt={`${path}-preview`} />
                </CustomDialog>
            </div>)}
        </>
    )
}

//<button onClick={() => imgState.handleEditToggle(src, path)}>Edit</button>