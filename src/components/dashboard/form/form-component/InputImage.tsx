import { Cloudinary as cloudOptm } from "@cloudinary/url-gen"

import { createSignal } from "solid-js";

import type { BaseInputProps } from "../types";


export default function InputImage({ ...props }: BaseInputProps) {
    const [localValue, setLocalValue] = createSignal(props.value);

}