import Popover from "@corvu/popover"
import type { JSX } from "solid-js"

interface PopOverProps {
    children?: JSX.Element
}


export default function PopOver({ children }: PopOverProps) {
    return (
        <Popover>
            <Popover.Trigger>Open Popover</Popover.Trigger>
            <Popover.Portal>
                <Popover.Content class="z-50 rounded-lg bg-corvu-100 px-3 py-2 shadow-md data-open:animate-in data-open:fade-in-50% data-open:slide-in-from-top-1 data-closed:animate-out data-closed:fade-out-50% data-closed:slide-out-to-top-1">
                    {children}
                </Popover.Content>
            </Popover.Portal>
        </Popover>
    )
}