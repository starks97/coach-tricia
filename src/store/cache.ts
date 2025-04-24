import { atom, map } from "nanostores"

import type { PageSchemas } from "~/types"

export const cache = map<Record<string, PageSchemas>>({})
