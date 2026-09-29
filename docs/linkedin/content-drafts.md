# LinkedIn engineering content

Drafts for Sahil Kadam. These have not been published or scheduled.

## Case study: reducing video-generation time by 80%

At LetsUpgrade, I led development of a video-generation system for an AI learning platform. The system had three parts: a web editor, job orchestration, and a programmatic renderer.

The initial workflow took around 15 minutes to generate a video. Resource-heavy rendering also caused memory bottlenecks.

I moved the heavy rendering work into asynchronous serverless jobs. This separated rendering from the interactive application and improved reliability and failure recovery. Generation time fell to around 3 minutes—an 80% reduction.

I also integrated the production service and admin editor with the LMS, resolved production issues, and documented deployment for engineering handover.

The lesson I took from this: improving a user-facing workflow can require changing where work runs, as well as optimizing the work itself.

This result belongs to my August 2025–May 2026 LetsUpgrade internship. It is separate from my September 2026 open-source training video generator.

## Four-week content plan

1. Share the video-generation case study above. Add a public-safe architecture diagram or demonstration if available.
2. Demonstrate the open-source training video generator. Use the repository link; the previously listed demo returned HTTP 404 during this audit.
3. Explain interruption handling in the voice inference engine. Label the project as in development and avoid unmeasured latency claims.
4. Discuss how configurable workflows support different roles, using a generic case-management example without customer data.

## Four-week review

Baseline observed on LinkedIn: 191 profile views, 71 search appearances, and 74 post impressions (the post-impressions card specified the past seven days; the other cards did not expose their periods).

At the next review, record the displayed reporting period alongside each metric. Track relevant recruiter conversations, B2B enquiries, and portfolio visits separately. Do not treat changes in reactions or followers alone as evidence of useful opportunities.
