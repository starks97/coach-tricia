<<<<<<< HEAD
import { email } from "./email"
=======
import { defineAction, ActionError } from "astro:actions"
import { z } from "astro:schema"
import { sendEmail } from "../utils/email"
>>>>>>> cf2b7c4 (backend system)

export const server = {
	email,
}
