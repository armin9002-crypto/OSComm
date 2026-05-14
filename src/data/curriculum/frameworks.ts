import type { FrameworkTemplate } from "@/types";

export const frameworkTemplates = [
  { id: "wswnw", title: "What, So What, Now What", description: "Move from information to meaning to action.", bestFor: "Updates, analysis, decision conversations", xp: 90, sections: [
    { id: "what", label: "What", guidance: "State the fact, event, or observation without interpretation overload.", placeholder: "Enterprise activation reached 82% in week two." },
    { id: "so-what", label: "So What", guidance: "Explain why the information matters to the audience's priorities.", placeholder: "This suggests onboarding friction is lower than expected for complex accounts." },
    { id: "now-what", label: "Now What", guidance: "Name the action, owner, or decision needed next.", placeholder: "Approve expansion to the next cohort by Friday." }
  ] },
  { id: "prep", title: "Point, Reason, Example, Point", description: "Make a concise argument clear, supported, and memorable.", bestFor: "Q&A, interviews, coaching, brief arguments", xp: 90, sections: [
    { id: "point", label: "Point", guidance: "Lead with the claim you want remembered.", placeholder: "We should simplify the launch message." },
    { id: "reason", label: "Reason", guidance: "Explain the logic behind the claim.", placeholder: "Buyers are currently comparing too many value propositions." },
    { id: "example", label: "Example", guidance: "Make the reason concrete with evidence or a scenario.", placeholder: "In testing, prospects repeated the cost story but missed the adoption story." },
    { id: "return", label: "Point", guidance: "Return to the point with greater force.", placeholder: "A simpler message will be easier to remember and easier to sell." }
  ] },
  { id: "psb", title: "Problem, Solution, Benefit", description: "Create persuasive movement from tension to value.", bestFor: "Proposals, sales narratives, change communication", xp: 90, sections: [
    { id: "problem", label: "Problem", guidance: "Name the tension in terms the audience recognizes.", placeholder: "Managers spend hours translating strategy into team priorities." },
    { id: "solution", label: "Solution", guidance: "Present the intervention as the natural answer.", placeholder: "A weekly priority brief turns strategy into three ranked operating choices." },
    { id: "benefit", label: "Benefit", guidance: "Translate the solution into a valued outcome.", placeholder: "Teams move faster with fewer conflicting interpretations." }
  ] },
  { id: "scr", title: "Situation, Complication, Resolution", description: "Explain change through context, tension, and response.", bestFor: "Strategic narratives, transformation updates, case studies", xp: 105, sections: [
    { id: "situation", label: "Situation", guidance: "Establish the baseline reality.", placeholder: "Our renewal process worked while expansion was founder-led." },
    { id: "complication", label: "Complication", guidance: "Name the pressure that makes the old approach insufficient.", placeholder: "Enterprise volume now exceeds what informal handoffs can support." },
    { id: "resolution", label: "Resolution", guidance: "Show the new response or required decision.", placeholder: "We need a formal renewal operating rhythm before Q3." }
  ] },
  { id: "executive-briefing", title: "Executive Briefing", description: "Compress a complex situation into decision-ready signal.", bestFor: "Leadership meetings, board updates, risk reviews", xp: 120, sections: [
    { id: "situation", label: "Situation", guidance: "Give relevant context in one clean line.", placeholder: "The vendor migration is on track, but security found one unresolved dependency." },
    { id: "insight", label: "Insight", guidance: "Explain what the situation means.", placeholder: "The dependency affects launch sequencing, not migration feasibility." },
    { id: "recommendation", label: "Recommendation", guidance: "State the decision you recommend.", placeholder: "Proceed with phase one and hold the affected workflow." },
    { id: "next", label: "Next Step", guidance: "Define action, owner, and timing.", placeholder: "Security confirms remediation by Wednesday; approval is needed today." }
  ] },
  { id: "past-present-future", title: "Past, Present, Future", description: "Show trajectory and why the next stage is different.", bestFor: "Vision narratives, transformations, strategy shifts", xp: 95, sections: [
    { id: "past", label: "Past", guidance: "Describe the prior operating reality.", placeholder: "Growth was driven by bespoke enterprise wins." },
    { id: "present", label: "Present", guidance: "Name what has changed now.", placeholder: "Pipeline is broader, but onboarding variance is slowing conversion." },
    { id: "future", label: "Future", guidance: "Show the required next state.", placeholder: "We need repeatable onboarding before expanding acquisition spend." }
  ] },
  { id: "oir", title: "Observation, Interpretation, Recommendation", description: "Turn evidence into judgment without hiding the inference.", bestFor: "Analysis, research synthesis, advisory updates", xp: 100, sections: [
    { id: "observation", label: "Observation", guidance: "State what was seen or measured.", placeholder: "Small teams complete setup 35% less often than enterprise teams." },
    { id: "interpretation", label: "Interpretation", guidance: "Explain what the observation suggests.", placeholder: "The setup path assumes admin capacity small teams do not have." },
    { id: "recommendation", label: "Recommendation", guidance: "Name the action implied by the interpretation.", placeholder: "Create a guided setup path before expanding small-team acquisition." }
  ] },
  { id: "crr", title: "Challenge, Response, Result", description: "Tell a compact story of pressure, action, and outcome.", bestFor: "Case studies, interviews, project retrospectives", xp: 95, sections: [
    { id: "challenge", label: "Challenge", guidance: "Name the pressure or constraint.", placeholder: "The team had to recover trust after two missed rollout dates." },
    { id: "response", label: "Response", guidance: "Describe the disciplined action taken.", placeholder: "We moved to weekly risk briefings with owner, mitigation, and date." },
    { id: "result", label: "Result", guidance: "Show the measurable or meaningful outcome.", placeholder: "Escalations dropped and the customer approved phased rollout." }
  ] },
  { id: "iei", title: "Idea, Evidence, Implication", description: "Make a concept credible and useful.", bestFor: "Thought leadership, teaching, strategy explanation", xp: 95, sections: [
    { id: "idea", label: "Idea", guidance: "State the concept clearly.", placeholder: "Retention is being shaped earlier than we thought." },
    { id: "evidence", label: "Evidence", guidance: "Support the idea with concrete proof.", placeholder: "Users who fail setup by day three are four times more likely to churn." },
    { id: "implication", label: "Implication", guidance: "Explain what must change because of the evidence.", placeholder: "Onboarding deserves roadmap priority over new reporting filters." }
  ] },
  { id: "cpa", title: "Context, Priority, Action", description: "Create alignment around what matters now.", bestFor: "Team direction, operating updates, management communication", xp: 90, sections: [
    { id: "context", label: "Context", guidance: "Name the reality shaping the moment.", placeholder: "Q3 pipeline depends on enterprise expansion." },
    { id: "priority", label: "Priority", guidance: "Identify the highest-leverage focus.", placeholder: "The priority is reducing onboarding variance in enterprise accounts." },
    { id: "action", label: "Action", guidance: "Define the immediate coordinated behavior.", placeholder: "Sales and success will review activation risk every Monday." }
  ] },
  { id: "risk-brief", title: "Risk Brief", description: "Bound uncertainty so leaders can act.", bestFor: "Escalations, incident updates, governance reviews", xp: 110, sections: [
    { id: "scope", label: "Scope", guidance: "Define where the risk applies and where it does not.", placeholder: "The issue affects reporting exports, not core data capture." },
    { id: "impact", label: "Impact", guidance: "Name the consequence if unmanaged.", placeholder: "It could delay enterprise reporting commitments by one week." },
    { id: "mitigation", label: "Mitigation", guidance: "State what is being done and by whom.", placeholder: "Engineering is building a manual export path by Thursday." },
    { id: "ask", label: "Ask", guidance: "Name the decision or support needed.", placeholder: "Approve customer messaging if the manual path is needed." }
  ] }
] satisfies FrameworkTemplate[];
