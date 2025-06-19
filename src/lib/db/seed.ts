import MongoService from "./mongoService.ts"

import { HomePageSchema, type HomePageZodSchemaType } from "./models/home.ts"

const seedData = async () => {
	try {
		const mongoService = await MongoService.init<HomePageZodSchemaType>("home_page", HomePageSchema)

		const data = {
			_id: "home_page_id",
			page_name: "home",
			sections: {
				hero: {
					title: "I'm Tricia",
					subtitle:
						"Ready to partner with you on your path to healing after a breakup and moving on with your life!",
					description:
						"Taking you from the pain of the past to the amazing future waiting for you.",
					image: "/images/tricia-hero3.webp",
				},
				user_pain_points: {
					title:
						"You've just had the rug pulled out from under you, right? You want to move on but not sure how best to do so?",
					subtitle: "Let me guess, right now you're...",
					pain_points: [
						"Struggling with overwhelming emotions and the isolation that often accompanies them.",
						"Feeling you've lost a core part of your identity and purpose.",
						"Trying to figure out how to rebuild a life that feels whole and fulfilling.",
					],
					reviews: [
						{
							title: "The best coaching experience",
							quote:
								"I loved the feeling of working with Coach Tricia to find myself. Being rather dazed and confused after emerging from a difficult 30-year marriage, I wasn’t sure that the timing was right, as I felt I needed time to breathe a little. I now realize that it was the best possible undertaking, as I had someone taking my hand and guiding me through all the dark spaces because they knew the way.",
							author: "Sandy from Johannesburg, South Africa",
						},
						{
							title: "Second Quote and Review",
							quote:
								"Working with Tricia has been a transformative experience. Her compassion and expertise have guided me through the depths of grief and loss, helping me rediscover my sense of self and purpose. She has a remarkable ability to support healing and growth, and I’m truly grateful for the more whole and fulfilling life I’m building with her help.",
							author: "CEO Paco de Lucia",
						},
						{
							title: "Third Quote and Review",
							quote:
								"Tricia is an incredibly compassionate and insightful therapist. During one of the most difficult times in my life, she provided the support and guidance I needed to process my grief and begin healing. Her ability to help me reconnect with myself and find new meaning has been truly life-changing.",
							author: "Maria Antonieta de las Nieves",
						},
					],
				},
				benefits: {
					title: "I've been there and know how to help you move forward...",
					benefits: [
						"Together we’ll tackle those intense emotions like anger, sadness and fear, so you can process them in a way that brings you clarity and peace of mind.",
						"Heal the old patterns that kept you in toxic relationships and break free ready to create healthier, happier connections.",
						"Move beyond feeling stuck or defeated, finding renewed confidence and feeling empowered to create a fresh vision for your future.",
					],
					image: "/images/benefits.jpg",
				},
				coaching_info: {
					title: "Coaching Info",
					subtitle:
						"Breakups, separations, and divorces can be some of life’s most challenging moments, but they also hold the potential for profound transformation.",
					description:
						"My Conscious Uncoupling coaching program is built around a proven 5-step process designed to help you heal your heart, reclaim your personal power, and create a brighter, more fulfilling future. This journey is about more than just moving on—it’s about moving forward with intention, healing, and hope. Together, we’ll transform your pain into power and uncover the limitless potential that awaits on the other side of heartbreak.",
					image: "/images/coaching.jpg",
				},
				podcast: {
					title: "Learn & Listen",
					description:
						"Join Tricia as she shares her personal journey of healing and transformation after a heartbreak. Listen to her insights and strategies for moving forward with intention, healing, and hope. Discover how to transform your pain into power and uncover the limitless potential that awaits on the other side of heartbreak.",
					image: "/images/ipad.png",
				},
			},
		}

		//await mongoService.insertOne(data)
		console.log("Seed data inserted successfully.")
	} catch (error) {
		console.log(error)
	}
}

seedData()
