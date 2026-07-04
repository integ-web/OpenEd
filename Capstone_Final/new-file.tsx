You are now working from a product handoff, not a creative exploration prompt.

The current Frontier Model Evaluations product is too visually clustered, too repetitive, too dark-heavy, and the lesson experience is not engaging enough. Every lesson currently feels structurally similar, text-heavy, and too much like a static course page.

Your task is to refactor the current product into a minimalist, video-first, AI-coach-enabled learning platform.

Do not create a new disconnected product.

Do not create another design-system showcase.

Do not create another generic course dashboard.

Refactor the current prototype and code into a focused learning product.

# Product mission

The product exists to solve AI’s biggest bottleneck:

“To prove frontier AI models are safe, reliable, and ready for real-world use.”

The course should train learners to think and work like model evaluators.

The learner should not feel like they are reading an AI-generated course.
They should feel like they are being guided through a professional evaluator training environment.

# New product direction

The product should feel closer to:

- Coursera-style structured video learning
- DataCamp-style active practice
- AI-native tutor/chat experience
- Research lab notebook
- Professional evaluator workspace

The product should not feel like:

- A giant static LMS
- A dashboard full of cards
- A cyberpunk AI interface
- A dense academic document
- A generic SaaS product
- A Figma design-system catalogue
- A repeated template with different titles

# Hard priority order

When making tradeoffs, optimize in this order:

1. Learner engagement
2. Lesson clarity
3. Reduced visual clutter
4. Video-first learning
5. AI coach support
6. Source trust
7. Artifact creation
8. Capstone connection
9. Visual polish
10. Design-system consistency

# Keep and improve

Keep these current strengths:

- Frontier Evaluation Lab identity
- Evidence cards
- Artifact builders
- Risk dashboard
- Capstone studio
- Source library
- Glossary
- Evaluation lab metaphor
- Professional tone
- Serious AI safety positioning
- 51-hour structure
- Six-phase course structure
- Progress tracking
- Dark and light mode support

But simplify the implementation dramatically.

# Remove or reduce

Remove or reduce:

- Overcrowded lesson pages
- Large blocks of text on the main screen
- Repeated card grids
- Too many panels visible at once
- Excessive dark surfaces
- Excessive borders
- Dense left navigation
- Decorative technical noise
- Generic stats cards
- Generic AI/cyber visuals
- Repeated lesson sections that all look identical
- Diagrams that are decorative rather than instructional
- Overuse of red, amber, and high-risk styling
- Any fake sense of interactivity where nothing meaningful happens

# New visual direction

Move from “dark government dashboard” to “calm AI safety learning lab.”

The UI should feel:

- Minimal
- Spacious
- Calm
- Premium
- Focused
- Trustworthy
- Research-grade
- Human-readable
- Less intimidating
- Less visually noisy

# Color system update

Refactor the color system to be easier on the eyes.

Use light mode as the primary learning mode.
Keep dark mode, but make it calmer and less dense.

## Light mode tokens

Canvas:
#F8FAFC

Main surface:
#FFFFFF

Soft surface:
#F1F5F9

Subtle blue surface:
#EFF6FF

Subtle teal surface:
#ECFDF5

Subtle violet surface:
#F5F3FF

Primary text:
#0F172A

Secondary text:
#475569

Tertiary text:
#64748B

Border:
#E2E8F0

Strong border:
#CBD5E1

Primary action:
#2563EB

Primary action hover:
#1D4ED8

Evidence teal:
#0F766E

Expert violet:
#6D28D9

Success:
#15803D

Warning:
#B45309

Danger:
#B91C1C

## Dark mode tokens

Canvas:
#0B1120

Main surface:
#111827

Soft surface:
#1E293B

Elevated surface:
#273449

Primary text:
#F8FAFC

Secondary text:
#CBD5E1

Tertiary text:
#94A3B8

Border:
#334155

Primary action:
#60A5FA

Evidence teal:
#2DD4BF

Expert violet:
#A78BFA

Success:
#4ADE80

Warning:
#FBBF24

Danger:
#F87171

# Color usage rules

Blue is for primary actions and course progress.

Teal is for evidence, sources, validation, and trustworthy proof.

Violet is for AI coach, expert explanation, and deeper learning.

Amber is for uncertainty, missing evidence, and caution.

Red is only for critical risk or blocked quality gates.

Green is only for completion, correct answers, or validated artifacts.

Do not use gradients unless extremely subtle.

Do not use neon.

Do not use cyberpunk styling.

# Typography

Use a simpler typography system.

Use Inter for most UI and body text.

Use IBM Plex Mono only for:
- evidence IDs
- source metadata
- model versions
- benchmark IDs
- code/log snippets
- rubric fields

Use IBM Plex Serif only for:
- expert notes
- reflective quotes
- short editorial callouts

Do not overuse mono text.

Make reading comfortable.

# Layout system

Use a learning-first layout.

Desktop frame:
1440px wide

Top bar:
64px high

Main app layout:
- Left rail: 72px collapsed icon rail by default
- Optional module drawer: 280px only when expanded
- Main lesson area: flexible
- AI coach panel: 360px on desktop
- On smaller widths, AI coach becomes a slide-over drawer

Spacing:
Use 24px, 32px, and 48px generously.

Cards:
Use fewer cards.
Cards should be larger, calmer, and more meaningful.

Borders:
Use subtle borders only.
Avoid boxing every small element.

# Navigation refactor

The current navigation is too clustered.

Refactor navigation into three layers:

1. Global top bar
- Product name
- Current phase
- Current lesson title
- Progress
- Saved artifacts
- Source library
- Theme toggle
- Profile

2. Collapsed left rail
Use icons with labels on hover:
- Home
- Learning Map
- Current Phase
- Artifact Lab
- Source Library
- Glossary
- Capstone

3. Lesson local navigation
Inside each lesson, show only:
- Watch
- Understand
- Practice
- Artifact
- Sources

Do not show every module and every lesson in the main navigation at once.

# Core lesson redesign

Replace the current long scrolling lesson page with a video-first learning workspace.

Every lesson screen must use this structure:

## Desktop lesson layout

Top:
- Breadcrumb
- Phase / lesson number
- Lesson title
- Duration
- One sentence promise
- Primary CTA: Continue lesson

Main body:
Left / center column:
- Video player card
- Lesson tabs
- Active lesson content

Right column:
- AI Coach panel

Bottom:
- Artifact checkpoint
- Source drawer
- Next lesson CTA

# Lesson screen anatomy

Every lesson must have these areas:

1. Video player

A large 16:9 video card should be the visual anchor of the lesson.

Video player card must include:
- Video title
- Duration
- Instructor / source label
- Play button
- Transcript button
- Captions button
- Speed control placeholder
- Save note button
- “Ask AI Coach about this moment” button
- Chapter markers below the video

If no video link is provided in the content file, show a clean placeholder:
“Video pending: add source URL in content pack.”

Do not invent video links.

Do not pretend to browse the web.

Use the videoUrl, videoTitle, videoProvider, and videoDuration fields from the attached content files.

2. Lesson tabs

Below the video, create five tabs:

- Watch
- Understand
- Practice
- Build
- Sources

Each tab should feel different.

Do not repeat the same section layout for every tab.

## Watch tab

Contains:
- Video
- Chapter list
- Key timestamps
- Transcript summary
- “What to listen for” bullets
- Note-taking field

## Understand tab

Contains:
- 3–5 key ideas
- One visual explainer
- One mental model
- One worked example
- One “common mistake” callout

## Practice tab

Contains:
- One interactive decision or short exercise
- Immediate feedback
- Retry state
- Explain answer button
- AI Coach prompt suggestion

## Build tab

Contains:
- Artifact output for this lesson
- Guided artifact fields
- Validation warnings
- Save state
- Export or add-to-capstone action

## Sources tab

Contains:
- Sources used in the lesson
- Required sources
- Optional advanced sources
- Books / papers / courses / documentation
- Difficulty tags
- Why this source matters
- “Open source” button

3. AI Coach panel

Create a persistent AI Coach panel on the right side of the lesson.

This is a prototype interface. It does not need a real backend, but it must look and behave like an integrated learning feature.

Panel title:
AI Coach

Subtext:
Ask for clarification, examples, diagrams, or help with your artifact.

AI Coach should include:

- Chat messages
- Suggested prompts
- Voice mode button
- “Explain this simply”
- “Show me a diagram”
- “Quiz me”
- “Help me fill the artifact”
- “Connect this to the capstone”
- “Give me a real-world example”
- “What source should I read next?”

Voice mode UI:
- Add a “Voice” button with microphone icon
- On click/prototype state, show a calm waveform card
- Text: “Voice coach mode — prototype placeholder”
- Do not claim real voice functionality exists unless implemented

Diagram generation UI:
- Add “Generate quick visual” button
- On click/prototype state, show a simple Figma-native diagram card
- The diagram should be based on the current lesson concept
- Do not use decorative AI art

Coach tone:
- Helpful
- Calm
- Tutor-like
- Non-authoritarian
- Precise
- Encouraging
- Not hype-heavy

Sample coach messages:
“Let’s make this concrete. What decision would this evaluation support?”
“You’re close. Try naming the actor and the access condition.”
“This belongs in your evidence card because it supports a release decision.”
“Want a diagram of how threat model, objective, metric, and threshold connect?”

4. Artifact checkpoint

Every lesson must produce something small.

Examples:
- Evaluation objective card
- Threat model fragment
- Benchmark claim
- Evidence note
- Source annotation
- Risk threshold
- Simulation decision
- Reflection note

The artifact should save into the learner’s portfolio.

Do not make quizzes the only learning activity.

5. Source drawer

Every lesson must include sources.

Use source cards, not raw link lists.

Each Source Card must show:
- Title
- Author or organization
- Type: paper, report, course, video, documentation, benchmark, book, interview
- Difficulty: beginner, intermediate, advanced
- Required or optional
- Why it matters
- Relevant section/chapter/timestamp
- URL field
- Citation field
- Associated lesson/phase

If source data is missing, show:
“Source metadata pending — add to content pack.”

Do not fabricate source details.

# New lesson data model

Create or refactor the course content data model.

Each lesson should be powered by structured content, not hardcoded repeated UI.

Create a LessonContent type with these fields:

lessonId
phaseId
lessonNumber
title
subtitle
duration
difficulty
learningObjective
lessonPromise
video
  videoTitle
  videoProvider
  videoUrl
  videoDuration
  instructor
  chapters
    time
    title
    whatToWatchFor
transcriptSummary
keyIdeas
  title
  explanation
  example
mentalModel
  title
  nodes
  connections
workedExample
  weakVersion
  improvedVersion
  whyImproved
commonMistakes
practice
  prompt
  learnerTask
  correctAnswer
  feedback
  retryHint
artifact
  artifactType
  fields
  validationRules
  savedStateMessage
aiCoach
  openingMessage
  suggestedPrompts
  sampleResponses
sources
  title
  authorOrg
  type
  difficulty
  required
  whyItMatters
  url
  citation
  recommendedSection
nextLesson

Create sample data for at least 3 lessons using existing content.
Do not create vague placeholder lessons.
For missing fields, show clear pending states.

# Content integration rules

Figma Make cannot browse the internet.

Therefore:

- Do not invent video links.
- Do not invent paper URLs.
- Do not claim a video exists unless it is provided in the content file.
- Do not use fake citations.
- Do not create made-up authors.
- Do not use lorem ipsum.
- Do not create unsupported factual claims.

Use the attached content files as the source of truth.

If the content files do not include enough content for a lesson:
- Create the screen layout anyway
- Mark the content state as “Content pending”
- Show exactly what fields are missing
- Keep the design usable

# Content pack expectation

Assume the course content will be delivered as six phase content files:

1. phase_01_the_paradigm.md
2. phase_02_harness_engineering.md
3. phase_03_autonomous_agents.md
4. phase_04_spatial_world_models.md
5. phase_05_red_teaming.md
6. phase_06_enterprise_pipeline.md

Each phase file will include:
- Written lecture content
- Video metadata
- Transcript summaries
- Lesson illustrations
- Exercises
- Quiz items
- Artifact fields
- Source cards
- Advanced readings
- Glossary terms

Build the product so those files can be integrated lesson by lesson.

# Course structure to preserve

Use the current six-phase, 51-hour course structure:

Phase 1:
The Paradigm — 6 hours
Artifact:
Custom Evaluation Rubric

Phase 2:
Harness Engineering — 8 hours
Artifact:
Automated Native Testing Harness

Phase 3:
Autonomous Agents — 12 hours
Artifact:
Agent Execution Sandbox

Phase 4:
Spatial & World Models — 9 hours
Artifact:
Physical Simulation Benchmark

Phase 5:
Red Teaming — 10 hours
Artifact:
Threat and Vulnerability Report

Phase 6:
Enterprise Pipeline — 6 hours
Artifact:
Production-Ready Deployment Gate

Do not switch back to 9 modules or 10 modules unless explicitly requested.
The current product should now use six phases consistently everywhere.

# Page-level refactor

Refactor these screens.

## Landing page

Make it calmer and less dashboard-like.

Hero copy:

Overline:
Frontier Model Evaluation

Title:
Learn to prove frontier AI is safe enough to ship

Subhead:
A 51-hour video-first course on threat models, benchmarks, red teaming, harnesses, evidence, and release decisions for frontier AI systems.

Primary CTA:
Start learning

Secondary CTA:
Preview the course

Below hero, show only:
- Course promise
- 6-phase path
- Artifact portfolio preview
- AI coach preview
- Source-backed learning preview
- Capstone outcome

Remove excessive stats and generic marketing sections.

## Dashboard

Make dashboard learner-focused, not admin-focused.

Dashboard should show:
- Continue current lesson
- Current video progress
- Next artifact checkpoint
- AI Coach suggestion
- Course progress
- Saved artifacts
- Upcoming phase deliverable
- Capstone readiness

Do not show too many KPI cards.

## Learning map

Make the learning map visually simple.

Use six large phase cards in a vertical or horizontal path.

Each phase card should show:
- Phase name
- Hours
- Promise
- Lessons count
- Artifact
- Status
- Start/continue button

Do not show every tiny detail at once.
Use expand/collapse for lesson lists.

## Module / phase overview

Each phase page should show:

- Phase hero
- What you will learn
- Why it matters
- Lessons
- Phase artifact
- Simulation challenge
- Required sources
- Advanced track
- Start/continue CTA

Make it feel like entering a learning unit, not opening a database.

## Lesson page

Replace the current long-scroll lesson layout with the video-first workspace described above.

This is the most important screen.

Build this screen carefully.

## Quiz page

Make quiz feel like active learning.

Each question should show:
- Scenario
- Question
- Options
- Submit
- Feedback
- Explanation
- “Ask AI Coach” button
- “Review concept” link

Feedback should explain reasoning, not just correct/incorrect.

## Simulation page

Keep simulations, but reduce clutter.

Simulation layout:
- Scenario video/brief at top
- Evidence cards
- Decision choices
- Consequence
- Expert debrief
- Artifact saved

Simulation should feel like professional evaluator training.

## Artifact builders

Keep the artifact builders, but make them calmer.

Each builder should have:
- Guided mode
- Expert mode
- Field-by-field validation
- Example answer
- AI Coach help
- Save to portfolio
- Add to capstone

Do not show all fields at once.
Use sections and progressive disclosure.

## Source library

Improve source library.

Add filters:
- Phase
- Lesson
- Type
- Difficulty
- Required/optional
- Topic
- Tool/paper/book/course/video

Source cards should feel high trust.

Add empty states and missing metadata states.

## Capstone studio

Keep capstone as final professional dossier.

Simplify visual layout.

Capstone should show:
- Aster-3 scenario
- Required deliverables
- Evidence collected
- Missing gates
- Recommendation builder
- Final portfolio export

Quality gates:
- Cannot submit without evidence cards
- Cannot submit without uncertainty note
- Cannot submit without mitigation plan
- Cannot submit without at least three risk domains

# Components to create or refactor

Create these reusable components:

Learning:
- VideoLessonPlayer
- VideoChapterList
- TranscriptDrawer
- LessonTabs
- KeyIdeaCard
- VisualExplainerCard
- WorkedExampleCard
- CommonMistakeCard
- PracticeCard
- QuizFeedbackCard
- LessonSourceDrawer
- NextLessonCTA

AI Coach:
- AICoachPanel
- CoachMessage
- SuggestedPromptChip
- VoiceModeButton
- VoiceModePlaceholder
- GenerateDiagramButton
- CoachArtifactHelpCard

Sources:
- SourceCard
- SourceFilterBar
- RequiredSourceBadge
- AdvancedSourceBadge
- CitationField
- MissingSourceMetadataState

Artifacts:
- ArtifactCheckpointCard
- ArtifactFieldGroup
- ArtifactValidationWarning
- ArtifactSavedToast
- AddToCapstoneButton
- ExampleAnswerDrawer

Course:
- CompactTopNav
- CollapsedCourseRail
- ModuleDrawer
- PhasePathCard
- ContinueLearningCard
- ProgressSummary
- CapstoneReadinessCard

# Specific lesson example to build perfectly

Build one fully polished lesson as the quality benchmark.

Use this lesson:

Phase 1:
The Paradigm

Lesson 4:
From Vague Risk to Evaluation Objective

Duration:
90 minutes

Lesson promise:
Turn a vague safety worry into a measurable evaluation objective.

Learning objective:
By the end of this lesson, the learner can convert a vague AI safety concern into a precise evaluation objective that names the actor, capability, access condition, task environment, success condition, and evidence needed.

Video title:
From Risk Question to Evaluation Objective

Video state:
If no real URL is provided, show a video placeholder with chapter markers.

Chapters:
1. Why vague risk claims fail
2. Threat model before benchmark
3. Capability hypothesis
4. Task environment and access conditions
5. Success condition and evidence
6. Turning the objective into an artifact

Mental model:
Threat Model → Capability Hypothesis → Evaluation Objective → Task Design → Evidence → Decision

Worked example:

Weak:
“Test whether the model is dangerous.”

Improved:
“Evaluate whether the model, when given browser and terminal access in a controlled sandbox, can meaningfully improve a novice user’s ability to complete multi-step cyber reconnaissance tasks.”

Explain why stronger:
- Names the user
- Names the access condition
- Names the capability
- Names the task family
- Names the environment
- Makes measurement possible
- Connects to a release decision

Practice prompt:
“This model might help with biological misuse.”

Learner fills:
- Actor
- Capability
- Harm pathway
- Model access level
- Task environment
- Success condition
- Evidence needed
- Disclosure sensitivity

Artifact:
Evaluation Objective Card

Fields:
- Risk concern
- Threat actor
- Capability hypothesis
- Access condition
- Task environment
- Success condition
- Evidence needed
- Decision informed
- Confidence level

AI Coach suggested prompts:
- Explain the difference between risk concern and evaluation objective
- Show me a diagram of the flow
- Help me make this objective measurable
- What would count as weak evidence?
- How does this connect to the capstone?

Sources:
Use source cards from the attached content files.
Do not invent missing links.

# Safety handling

For cyber, bio, persuasion, and autonomy lessons:

Teach evaluation design safely.

Use fictional, sandboxed, abstracted, or de-risked examples.

Do not include operational harmful instructions.

Do not include actionable biological misuse details.

Do not include real exploit steps.

Do not include real target details.

Do not include instructions for bypassing safety systems.

Focus on:
- threat modeling
- benchmark validity
- evidence handling
- governance decisions
- access control
- replication
- uncertainty
- reporting

# Interaction standards

Every lesson must have at least one real interaction:

Examples:
- Fill an artifact field
- Choose between evaluation objectives
- Classify evidence strength
- Identify a validity threat
- Select a threshold
- Diagnose contamination risk
- Choose a mitigation
- Ask AI Coach for help
- Generate a visual explainer state

Every interaction must have feedback.

No dead buttons unless they are clearly labeled prototype placeholders.

# Empty and pending states

Use explicit empty states.

Examples:

Video:
“Video pending. Add videoUrl in the lesson content pack.”

Sources:
“Source metadata pending. Add at least one required source before publishing this lesson.”

Artifact:
“Start this artifact by naming the claim you want to test.”

AI Coach:
“Ask a question about this lesson or choose a suggested prompt.”

Do not hide missing content.

# Implementation guidance

Refactor the code around data-driven lesson content.

Avoid hardcoding long lesson sections into the lesson component.

Move lesson content into structured data files.

Suggested structure:

src/app/data/coursePhases.ts
src/app/data/lessons/phase-01.ts
src/app/data/lessons/phase-02.ts
src/app/data/lessons/phase-03.ts
src/app/data/lessons/phase-04.ts
src/app/data/lessons/phase-05.ts
src/app/data/lessons/phase-06.ts
src/app/components/lesson/VideoLessonPlayer.tsx
src/app/components/lesson/AICoachPanel.tsx
src/app/components/lesson/LessonTabs.tsx
src/app/components/lesson/SourceDrawer.tsx
src/app/components/lesson/ArtifactCheckpoint.tsx

Main lesson screen:
src/app/components/course/screens/lesson.tsx

Refactor lesson.tsx so it becomes a layout shell, not a giant content file.

# QA acceptance criteria

Before finishing, create a QA screen or QA checklist that confirms:

## Lesson QA

- Each lesson is video-first
- Each lesson has a learning objective
- Each lesson has an AI Coach panel
- Each lesson has at least one interaction
- Each lesson has artifact output
- Each lesson has a source drawer
- Missing video/source content is clearly flagged
- No lesson is just a long article

## UI QA

- Navigation is simplified
- Screens are less clustered
- Light mode is polished
- Dark mode is calmer
- Visual hierarchy is clear
- Main action is obvious
- Components are reused
- Typography is consistent
- Semantic colors are not overused

## Content QA

- No lorem ipsum
- No fabricated video links
- No fabricated citations
- No vague placeholder lessons
- No unsupported claims
- No repeated generic lesson bodies
- Safety-sensitive topics remain de-risked

## Product QA

- Learner always knows where they are
- Learner always knows what to do next
- Learner knows what artifact they are creating
- Progress is visible
- Artifacts connect to capstone
- Capstone has quality gates
- Source library supports advanced learning

# Final output

Deliver a refactored, minimalist, video-first Frontier Model Evaluations product with:

- Calmer color system
- Light-first learning experience
- Dark mode support
- Simplified navigation
- Video-first lesson screen
- AI Coach panel
- Voice mode prototype placeholder
- Visual explainer generation prototype state
- Source cards
- Artifact checkpoints
- Cleaner dashboard
- Cleaner learning map
- Cleaner phase pages
- Better lesson engagement
- Data-driven lesson content structure
- Explicit missing-content states
- QA board

The product should finally feel like something a learner would want to continue opening.

The learning experience should feel guided, visual, conversational, and practical — not like a static AI-generated course document.