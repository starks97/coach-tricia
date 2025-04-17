// This file is generated by Astro DB
declare module 'astro:db' {
	export const Home: import("@astrojs/db/runtime").Table<
		"Home",
		{"id":{"type":"number","schema":{"unique":true,"deprecated":false,"name":"id","collection":"Home","primaryKey":true}},"createdAt":{"type":"date","schema":{"optional":false,"unique":false,"deprecated":false,"name":"createdAt","collection":"Home","default":{"__serializedSQL":true,"sql":"CURRENT_TIMESTAMP"}}},"updatedAt":{"type":"date","schema":{"optional":false,"unique":false,"deprecated":false,"name":"updatedAt","collection":"Home","default":{"__serializedSQL":true,"sql":"CURRENT_TIMESTAMP"}}}}
	>;
	export const Hero: import("@astrojs/db/runtime").Table<
		"Hero",
		{"id":{"type":"number","schema":{"unique":true,"deprecated":false,"name":"id","collection":"Hero","primaryKey":true}},"title":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"title","collection":"Hero","primaryKey":false,"optional":false}},"subtitle":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"subtitle","collection":"Hero","primaryKey":false,"optional":false}},"description":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"description","collection":"Hero","primaryKey":false,"optional":false}},"image":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"image","collection":"Hero","primaryKey":false,"optional":false}},"home_id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"home_id","collection":"Hero","primaryKey":false,"optional":false}}}
	>;
	export const PainPoints: import("@astrojs/db/runtime").Table<
		"PainPoints",
		{"id":{"type":"number","schema":{"unique":true,"deprecated":false,"name":"id","collection":"PainPoints","primaryKey":true}},"point":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"point","collection":"PainPoints","primaryKey":false,"optional":false}},"user_pain_point_id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"user_pain_point_id","collection":"PainPoints","primaryKey":false,"optional":false}}}
	>;
	export const UserPainPoints: import("@astrojs/db/runtime").Table<
		"UserPainPoints",
		{"id":{"type":"number","schema":{"unique":true,"deprecated":false,"name":"id","collection":"UserPainPoints","primaryKey":true}},"title":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"title","collection":"UserPainPoints","primaryKey":false,"optional":false}},"subtitle":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"subtitle","collection":"UserPainPoints","primaryKey":false,"optional":false}},"home_id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"home_id","collection":"UserPainPoints","primaryKey":false,"optional":false}}}
	>;
	export const BenefitItems: import("@astrojs/db/runtime").Table<
		"BenefitItems",
		{"id":{"type":"number","schema":{"unique":true,"deprecated":false,"name":"id","collection":"BenefitItems","primaryKey":true}},"benefit":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"benefit","collection":"BenefitItems","primaryKey":false,"optional":false}},"benefit_id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"benefit_id","collection":"BenefitItems","primaryKey":false,"optional":false}}}
	>;
	export const Benefits: import("@astrojs/db/runtime").Table<
		"Benefits",
		{"id":{"type":"number","schema":{"unique":true,"deprecated":false,"name":"id","collection":"Benefits","primaryKey":true}},"title":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"title","collection":"Benefits","primaryKey":false,"optional":false}},"home_id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"home_id","collection":"Benefits","primaryKey":false,"optional":false}}}
	>;
	export const CoachingInfo: import("@astrojs/db/runtime").Table<
		"CoachingInfo",
		{"id":{"type":"number","schema":{"unique":true,"deprecated":false,"name":"id","collection":"CoachingInfo","primaryKey":true}},"title":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"title","collection":"CoachingInfo","primaryKey":false,"optional":false}},"subtitle":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"subtitle","collection":"CoachingInfo","primaryKey":false,"optional":false}},"description":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"description","collection":"CoachingInfo","primaryKey":false,"optional":false}},"image":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"image","collection":"CoachingInfo","primaryKey":false,"optional":false}},"home_id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"home_id","collection":"CoachingInfo","primaryKey":false,"optional":false}}}
	>;
	export const Reviews: import("@astrojs/db/runtime").Table<
		"Reviews",
		{"id":{"type":"number","schema":{"unique":true,"deprecated":false,"name":"id","collection":"Reviews","primaryKey":true}},"title":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"title","collection":"Reviews","primaryKey":false,"optional":false}},"quote":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"quote","collection":"Reviews","primaryKey":false,"optional":false}},"author":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"author","collection":"Reviews","primaryKey":false,"optional":false}},"user_pain_point_id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"user_pain_point_id","collection":"Reviews","primaryKey":false,"optional":false}}}
	>;
	export const Podcast: import("@astrojs/db/runtime").Table<
		"Podcast",
		{"id":{"type":"number","schema":{"unique":true,"deprecated":false,"name":"id","collection":"Podcast","primaryKey":true}},"title":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"title","collection":"Podcast","primaryKey":false,"optional":false}},"description":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"description","collection":"Podcast","primaryKey":false,"optional":false}},"image":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"image","collection":"Podcast","primaryKey":false,"optional":false}},"home_id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"home_id","collection":"Podcast","primaryKey":false,"optional":false}}}
	>;
}
