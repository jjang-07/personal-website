/*
 * Site content lives here. Edit this file to update links or add projects.
 *
 * To add a project: copy one of the objects in PROJECTS, give it a unique
 * `slug`, and drop its screenshot in /assets. Its detail page is generated
 * automatically at project.html?p=<slug>.
 *
 *   device: "laptop" (16:10 screenshot, e.g. 1600x1000)
 *         | "phone"  (390:844 screenshot, e.g. 780x1688)
 */

window.SITE = {
  name: "Jun Jang",
  email: "junjang@stanford.edu",
  resume: "resume.pdf",
  github: "https://github.com/jjang-07",
  linkedin: "https://www.linkedin.com/in/jun-jang7",
};

window.PROJECTS = [
  {
    slug: "maclock",
    title: "MacLock",
    subtitle: "A macOS focus app that hard-locks distractions",
    meta: "Sep 2026 – Present",
    device: "laptop",
    image: "assets/maclock.svg", // placeholder: swap for a real screenshot
    imageAlt: "MacLock running on a Mac, showing an active focus session",
    featured: true,
    overview: [
      "MacLock is a macOS focus app built on one idea: willpower shouldn't be the last line of defense. Instead of gentle reminders, it hard-locks the apps and sites that pull you away, so a focus session actually stays one.",
      "A root launchd daemon talks to the app over code-signing-verified XPC, and a KeepAlive agent with monotonic timekeeping lets a session survive quits, force-kills, reboots, and system-clock changes without ending early.",
    ],
    role: "Solo designer and engineer",
    tools: ["Swift", "SwiftUI", "XPC", "launchd", "CGEventTap", "Accessibility API"],
    outcome:
      "Apps and sites are blocked through CGEventTap, the Accessibility API, and /etc/hosts. Moving to an event-driven design cut idle CPU use from about 2% to about 0%.",
    links: [
      // { label: "GitHub", href: "https://github.com/jjang-07/..." },
    ],
  },
  {
    slug: "nanobite",
    title: "Nanobite",
    subtitle: "Built at the YC “Make Something Agents Want” hackathon",
    meta: "Oct 2026 · San Francisco",
    device: "phone",
    image: "assets/nanobite.svg", // placeholder: swap for a real screenshot
    imageAlt: "Nanobite shown on a phone",
    featured: true,
    overview: [
      "Nanobite is a human-in-the-loop agent-to-agent framework. It lets a coding agent ask another company's agent for fixes buried in an engineer's past debugging sessions, over email and with no shared accounts.",
      "Every answer passes through three gates (secret and PII masking, LLM minimization, and human approval by email), so only an essential capsule of context ever leaves the building.",
    ],
    role: "Hackathon team member", // TODO: name your specific part
    tools: ["TypeScript", "Node.js", "MCP"],
    outcome:
      "Won “Best Agent Communication Setup.” A full round trip takes 17 seconds, and 760-token sessions shrink to about 230 tokens, a 70% reduction.",
    links: [],
  },
];
