import { useImageState } from "../handlers/useImageState"
import CustomDialog from "./Dialog"


interface WidgetProps {
    src: string
    height?: number
    width?: number
}


export default function WidgetImage({ src, height, width }: WidgetProps) {
    const imgState = useImageState();
    return (
        <>
            {imgState.isEditing() ? (
                <div>
                    <h1>Welcome to edit mode</h1>
                    <button onClick={() => imgState.closeEditToggle()}>Close</button>
                </div>
            ) : (<div>
                <figure class="w-auto h-auto mx-auto">
                    <img src={imgState.optimizeImageDisplay(src)}
                        alt="Widget Diagram" />
                </figure >
                <button onClick={() => imgState.handleEditToggle(src)}>Edit</button>
                <CustomDialog />
            </div>)}
        </>
    )
}