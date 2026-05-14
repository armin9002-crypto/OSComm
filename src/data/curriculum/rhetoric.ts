import type { LessonSpec, PathSeed, PrincipleSeed } from "./types";

export const paths = [
] satisfies PathSeed[];

export const lessonSpecs = [
] satisfies LessonSpec[];

export const principleSeeds = [
  { id: "logos-pathos-ethos", title: "Logos, Pathos, Ethos", summary: "Persuasion blends logic, emotional relevance, and speaker credibility.", category: "Rhetoric", difficulty: "Intermediate", detail: "Reason alone may not move people if they do not trust the speaker or feel the stakes.", application: "Audit whether your message has proof, relevance, and credibility.", lessonHints: ["trust-speaker", "framing"] },
  { id: "kairos-timing", title: "Kairos", summary: "Timing changes whether a message feels urgent, premature, or obvious.", category: "Rhetoric", difficulty: "Advanced", detail: "The right message at the wrong moment can fail because the audience is not ready for that decision.", application: "Link your ask to why now.", lessonHints: ["cta-design", "loss-aversion"] },
  { id: "antithesis", title: "Antithesis", summary: "Contrasting phrases clarify distinctions and make ideas memorable.", category: "Rhetoric", difficulty: "Intermediate", detail: "Balanced contrast helps audiences hear what is being rejected and what is being asserted.", application: "Use 'not this, but that' to sharpen a central distinction.", lessonHints: ["contrast-effects", "emphasis"] },
  { id: "anaphora", title: "Anaphora", summary: "Purposeful repetition creates rhythm and recall.", category: "Rhetoric", difficulty: "Intermediate", detail: "Repeated sentence openings can give complex points a memorable structure when used sparingly.", application: "Repeat the stem only for ideas that deserve equal status.", lessonHints: ["rule-of-three", "vocal-variety"] },
  { id: "concession-turn", title: "Concession and Turn", summary: "Conceding a fair point can make the counterpoint more credible.", category: "Rhetoric", difficulty: "Advanced", detail: "A concession reduces defensiveness by proving the speaker understands the opposing case.", application: "Use 'That concern is real; the reason I still recommend this is...'.", lessonHints: ["objection-handling", "reducing-resistance"] },
  { id: "definition-control", title: "Definition Control", summary: "Defining key terms prevents debate from drifting.", category: "Rhetoric", difficulty: "Advanced", detail: "Many disagreements persist because people use the same word for different ideas.", application: "Define contested terms before arguing about them.", lessonHints: ["structure-reduces-confusion", "decision-oriented-messaging"] }
] satisfies PrincipleSeed[];
