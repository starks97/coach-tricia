import Dialog from '@corvu/dialog'
import type { JSX } from 'solid-js'

interface DialogProps {
    btnName: string;
    label?: string;
    children: JSX.Element;

}

export default function CustomDialog({ btnName, label, children }: DialogProps) {
    return (
        <Dialog>
            <Dialog.Trigger class="rounded-lg px-4 py-3 text-lg font-medium">
                {btnName}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay class="fixed inset-0 z-50 bg-black/50 data-open:animate-in data-open:fade-in-0% data-closed:animate-out data-closed:fade-out-0%" />
                <Dialog.Content class="fixed left-1/2 top-1/2 z-50 min-w-80 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-taupe p-5 data-open:animate-in data-open:fade-in-0% data-open:zoom-in-95% data-open:slide-in-from-top-10% data-closed:animate-out data-closed:fade-out-0% data-closed:zoom-out-95% data-closed:slide-out-to-top-10%">
                    <div class="flex justify-end"><Dialog.Close>X</Dialog.Close></div>
                    {label && <Dialog.Label class="text-lg font-bold">
                        {label}
                    </Dialog.Label>}
                    <div>
                        {children}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    )

}