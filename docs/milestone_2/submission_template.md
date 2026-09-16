# Milestone 2: Data, Evaluation, and Baselines

**Course:** CIS-5980 AI Capstone
**Track:** AI Engineering
**Project name:** [TODO]
**Team:** Will Liu, Guadalupe Cantera, Bryan Yang
**Repository:** https://github.com/BryanDYang/ai-capstone
**Canvas deadline:** sept 28, 2026
**Last updated:** sept 16, 2026
**Status:** Collaborative draft; Milestone 1 TA/professor feedback pending.

## How to use this draft

Copy this document into Google Docs for team editing, then bring the revised text back into this file. Replace each `[TODO]` with an answer or an explicit limitation. Keep proposed plans separate from completed work and measured results. Owners below are proposed until the team confirms them.

The assignment's questions are guidance, not a requirement to answer every prompt individually. This template organizes the required AI Engineering deliverables and adds project-specific questions to make the answers concrete. Remove drafting instructions before exporting the final report.

**Submission:** One PDF containing the report, with a repository URL. The repository must contain the milestone artifacts and README instructions for running the evaluation. A mandatory TA check-in is also required. The assignment does not separately request a new pitch deck, demo video, Google Doc submission, or a finished application.

**Grading:** Dataset readiness and Data Card: 40 points. Runnable evaluation, qualitative rubric, baselines, results, and error analysis: 60 points. Team contributions and next-milestone ownership must be included, although the team section is non-graded.

## 1. Project summary and changes since Milestone 1

**Draft summary:** We are building a research meeting follow-through assistant that extracts evidence-backed commitments, decisions, and suggestions and maintains task state across recurring meetings. Our central question is whether persistent meeting history improves task tracking over processing meetings independently, without introducing unsupported updates.

**What does this milestone actually implement and evaluate?**

[TODO: Describe the runnable slice, its inputs and outputs, and what is deferred. A transcript-to-predictions-to-scores workflow is the proposed starting point.]

**What changed after Milestone 1, and why?**

[TODO: Record confirmed changes, or state that feedback is still pending.]

**Architecture decision to reconcile:** The submitted proposal specifies an iOS client and PostgreSQL/pgvector; the Markdown proposal and pitch deck describe a CLI/local service with SQLite. The submitted proposal also mentions SQLite in its budget. Confirm the intended final architecture and distinguish it from the evaluation-only tooling needed now.

**Agreed direction:** [TODO]
**Decision date and participants:** [TODO]

### Pending Milestone 1 feedback

We are awaiting TA and professor input on the Milestone 1 submission. The following decisions remain provisional until the team reviews that feedback.

| Feedback or question                                                               | Response received | Resulting decision or action | Owner  |
| ---------------------------------------------------------------------------------- | ----------------- | ---------------------------- | ------ |
| Is the proposed dataset size and coverage sufficient for our intended claims?      | Pending           | [TODO]                       | [TODO] |
| Is independent-meeting extraction an appropriate primary baseline?                 | Pending           | [TODO]                       | [TODO] |
| Can timestamped imports/sponsor transcription remain upstream for this checkpoint? | Pending           | [TODO]                       | [TODO] |
| What application scope and reminder behavior should we prioritize?                 | Pending           | [TODO]                       | [TODO] |
| Additional submission feedback                                                     | Pending           | [TODO]                       | [TODO] |

## 2. Dataset and Data Card

**Proposed lead:** Guadalupe; second label reviewer: [TODO]

### Data sourcing and access

**What inputs have we actually assembled, and how can a reviewer access them?**

[TODO: Identify synthetic transcripts, consenting team recordings, and/or specific public dataset subsets actually used. Candidate sources alone do not establish data readiness.]

| Source/subset | Actual size: projects, sequences, meetings | Format and annotation coverage | Access method or repository path |
| ------------- | ------------------------------------------ | ------------------------------ | -------------------------------- |
| [TODO]        | [TODO]                                     | [TODO]                         | [TODO]                           |

### Provenance, licensing, and permissions

**Where did each source come from, and what usage constraints apply?**

| Source | Creator/version or collection method | License/permission and supporting reference | Access, processing, and redistribution restrictions |
| ------ | ------------------------------------ | ------------------------------------------- | --------------------------------------------------- |
| [TODO] | [TODO]                               | [TODO]                                      | [TODO]                                              |

**For self-created data:** [TODO: Describe authorship, whether AI assisted creation, human review, and whether any real/private meeting content was used.]

**For participant data:** [TODO: Describe consent, permitted external model processing, exclusion/deletion, retention, and who can access it. Mark not applicable if using only synthetic data.]

### Annotation design and quality

**What is labeled?** [TODO: Commitments, owners, deadlines, source segments, suggestions, decisions, links between mentions, and expected task state after each meeting, as applicable.]

**Labeling rules:** [TODO: Define acceptance of suggestions, explicit completion versus partial progress, ambiguous ownership/references, and tasks not mentioned again.]

**Review and disagreement resolution:** [TODO: Who labeled, who reviewed, how disagreements were resolved, and any unresolved cases.]

**Annotation guide and schema location:** [TODO]

### Training/development, validation, and test splits

**How are the splits constructed, and why?**

[TODO: Split by whole sequence/project to prevent leakage across related meetings. If no model training is performed, say so and explain the role of development data for prompts/rules. Do not report tuned-on examples as held-out results.]

| Split                | Sequence/project IDs and counts | Purpose | Has it influenced prompts or rules? |
| -------------------- | ------------------------------- | ------- | ----------------------------------- |
| Training/development | [TODO]                          | [TODO]  | [TODO]                              |
| Validation           | [TODO]                          | [TODO]  | [TODO]                              |
| Test                 | [TODO]                          | [TODO]  | [TODO]                              |

**Split manifest/version and any seed:** [TODO]
**If a split is not yet available:** [TODO: State what is missing and how that limits current results.]

### Known limitations

[TODO: Address sample size, synthetic versus natural conversation, domain mismatch, speaker/language coverage, missing labels, annotation noise, and scenario coverage. Explain which claims the dataset cannot support.]

## 3. Evaluation harness

**Proposed lead:** Bryan, with Will on prediction contracts and Guadalupe on labels.

### Test design

**What does the custom suite measure?**

[TODO: Describe the path from timestamped inputs to baseline predictions to scored outputs. State which components actually run and which remain deferred.]

| Scenario                     | Expected behavior                                      | Fixture ID | Implemented/scored? |
| ---------------------------- | ------------------------------------------------------ | ---------- | ------------------- |
| Explicit completion          | Update the correct existing task to done with evidence | [TODO]     | [TODO]              |
| Deadline change              | Update the supported date on the correct task          | [TODO]     | [TODO]              |
| Unaccepted suggestion        | Keep separate from an owned commitment                 | [TODO]     | [TODO]              |
| Ambiguous reference          | Flag uncertainty rather than invent a match            | [TODO]     | [TODO]              |
| Task not mentioned again     | Preserve the previous state                            | [TODO]     | [TODO]              |
| Partial progress or negation | Avoid unsupported completion                           | [TODO]     | [TODO]              |

### Metrics and scoring rules

**Why do the chosen metrics reflect success?** [TODO]

The rows below are proposed metrics. Confirm which are implemented, define their denominators and matching rules, and explicitly mark deferred metrics.

| Metric                                            | Exact scoring definition and denominator                                   | Why it matters                             | Implemented? |
| ------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------ | ------------ |
| Task precision/recall (and F1 if used)            | [TODO: Define a correct match, including owner and semantic equivalence]   | Measures correct and missed commitments    | [TODO]       |
| Owner accuracy                                    | [TODO: Define the scored population and unknown owners]                    | Detects attribution errors                 | [TODO]       |
| Duplicate task count/rate                         | [TODO: Define a duplicate and rate denominator if used]                    | Detects repeated creation of existing work | [TODO]       |
| Unsupported completion count/rate                 | [TODO: Define evidence support and denominator]                            | Detects false done transitions             | [TODO]       |
| Citation validity/support                         | [TODO: Separate existing source IDs from evidence that supports the claim] | Measures traceability and grounding        | [TODO]       |
| Cross-meeting state/link accuracy, if implemented | [TODO]                                                                     | Measures maintained task state             | [TODO]       |

**Matching and adjudication:** [TODO: Explain paraphrase matching, one-to-one assignment, partial matches, and human adjudication.]

**Empty denominators and missing/invalid predictions:** [TODO: Explain scoring behavior; do not silently count missing outputs as correct.]

### Reproducibility and README instructions

**Environment and dependencies:** [TODO]
**Dataset/prediction versions and code revision:** [TODO]
**Model versions, prompt versions, settings, and seeds where supported:** [TODO]
**Credentials or hardware needed for live runs:** [TODO]

Replace these placeholders with tested commands and also place the instructions in the repository README:

```text
[TODO: setup command]
[TODO: command to generate baseline predictions]
[TODO: command to score saved predictions without API calls]
[TODO: command to run offline scorer tests]
```

**Example output from an actual run:**

```text
[TODO: paste output, report path, dataset size, and measured scores]
```

**Scorer validation:** [TODO: Show that correct predictions receive expected scores and wrong owners, duplicates, unsupported completions, and invalid citations are detected. Keep live model generation separate from deterministic CI checks.]

## 4. Qualitative evaluation rubric

**Proposed lead:** Guadalupe; reviewers: [TODO]

**Which outputs are assessed, how are they sampled, and who scores them?** [TODO]

Use application-specific anchors rather than only generic numeric scores. The dimensions below are suggestions to finalize. Define intermediate scores if using a 1-5 scale.

| Dimension                                | 1: poor | 3: needs substantial correction | 5: high quality |
| ---------------------------------------- | ------- | ------------------------------- | --------------- |
| Faithfulness/evidence support            | [TODO]  | [TODO]                          | [TODO]          |
| Owner and speaker attribution            | [TODO]  | [TODO]                          | [TODO]          |
| Coverage of relevant commitments/updates | [TODO]  | [TODO]                          | [TODO]          |
| Ambiguity and suggestion handling        | [TODO]  | [TODO]                          | [TODO]          |
| Clarity and usefulness                   | [TODO]  | [TODO]                          | [TODO]          |

**Concrete input/output examples and grading rationale:** [TODO: Include a good output and at least one failure.]

**Review disagreements and any LLM-judge role:** [TODO: State whether grading is human, automated, or assisted. An LLM judge is not explicitly required by the assignment.]

## 5. Baselines and initial results

**Proposed lead:** Will; scoring: Bryan; review: Guadalupe.

### Simple baseline

**Method and rationale:** [TODO: For example, independent-meeting extraction. Describe the actual implemented method.]
**Model/rules, version, prompts, settings, and code path:** [TODO]
**Information available to this baseline:** [TODO: State whether it sees prior meetings or task state.]

### Off-the-shelf open-source reference baseline

**Model/system, source, version, and license:** [TODO]
**How it is run and adapted to the same evaluation contract:** [TODO]
**Why it is a relevant reference:** [TODO]

The assignment requires an open-source reference baseline when applicable. If claiming it is not applicable, explain why and raise that interpretation with the TA. A proprietary model alone does not supply this reference.

### Measured results

Use the same evaluation inputs for comparable rows. Include actual sample counts and numerators/denominators where appropriate. Use `not measured` rather than zero for missing results. Add or remove columns to match the implemented metrics.

| Method/version                | Split and sample count | Task P/R/F1  | Owner accuracy | Duplicates   | Unsupported completions | Citation validity/support |
| ----------------------------- | ---------------------- | ------------ | -------------- | ------------ | ----------------------- | ------------------------- |
| Simple baseline: [TODO]       | [TODO]                 | Not measured | Not measured   | Not measured | Not measured            | Not measured              |
| Open-source reference: [TODO] | [TODO]                 | Not measured | Not measured   | Not measured | Not measured            | Not measured              |

**Qualitative scores and sample count:** [TODO]
**Run date, report/prediction paths, and any measured latency/cost:** [TODO]
**Interpretation and limitations:** [TODO: Distinguish initial development results from held-out evidence; targets are not results.]

## 6. Initial error analysis

Analyze observed baseline failures rather than only anticipated risks. Separate observations from hypotheses about causes.

| Example/source ID | Expected output | Actual output and baseline | Error category | Likely cause | Proposed change and verification |
| ----------------- | --------------- | -------------------------- | -------------- | ------------ | -------------------------------- |
| [TODO]            | [TODO]          | [TODO]                     | [TODO]         | [TODO]       | [TODO]                           |

**Most frequent or consequential failures:** [TODO]
**What we will change next and why:** [TODO]
**What these initial results do not establish:** [TODO]

## 7. Mandatory TA check-in

**Status:** [TODO: not scheduled / scheduled / completed]
**Date and attendees:** [TODO]

### Preparation checklist

- [ ] Data Card summary with actual inputs, splits, and limitations.
- [ ] Working evaluation command and README instructions.
- [ ] Baseline results table.
- [ ] Top risks and blockers.

### Questions for discussion

1. What Milestone 1 feedback should change our scope or evaluation priorities?
2. Is our actual dataset size, sequence coverage, and split strategy sufficient for this checkpoint?
3. Are the simple baseline and selected open-source reference appropriate?
4. Is a transcript-first evaluation appropriate while sponsor audio/data access is unresolved?
5. How should we reconcile the differing application architectures in the Milestone 1 artifacts?

**Additional questions:** [TODO]

### Notes and follow-up

| Advice or decision | Required action | Owner  | Target date |
| ------------------ | --------------- | ------ | ----------- |
| [TODO]             | [TODO]          | [TODO] | [TODO]      |

Do not mark the check-in complete until it occurs. These notes are a collaboration aid; the assignment explicitly requires the meeting but does not prescribe a separate meeting-notes submission.

## 8. Weekly progress, blockers, and next steps

**Progress made:** [TODO: Summarize completed work, with artifact links where useful.]

**Top blockers or risks:** [TODO: Include pending Milestone 1 feedback, unresolved data permissions, and unconfirmed choices as applicable.]

**Planned next steps:** [TODO]

The [weekly journal](../weekly_journal.md) contains the ongoing record. Include the relevant progress in this report so the PDF is self-contained.

## 9. Team contributions and next-milestone work plan

Record actual contributions separately from proposed ownership. This section is required for teams and is non-graded.

| Member            | Actual Milestone 2 contributions | Artifact or evidence |
| ----------------- | -------------------------------- | -------------------- |
| Guadalupe Cantera | [TODO]                           | [TODO]               |
| Will Liu          | [TODO]                           | [TODO]               |
| Bryan Yang        | [TODO]                           | [TODO]               |

| Task for the next milestone | Confirmed owner | Completion check | Dependencies/blockers | Target date |
| --------------------------- | --------------- | ---------------- | --------------------- | ----------- |
| [TODO]                      | [TODO]          | [TODO]           | [TODO]                | [TODO]      |

## 10. Final submission checklist

- [ ] AI Engineering track and team declared.
- [ ] Actual dataset/inputs assembled with a complete Data Card.
- [ ] Provenance, licensing/permissions, splits, and limitations documented.
- [ ] Evaluation harness runs using documented README commands and includes example output.
- [ ] Qualitative rubric defined with concrete anchors/examples.
- [ ] Simple baseline implemented and evaluated.
- [ ] Applicable open-source reference baseline implemented and evaluated, or non-applicability explained.
- [ ] Measured results table and initial error analysis included.
- [ ] Mandatory TA check-in completed.
- [ ] Weekly progress, blockers, team contributions, and next-milestone owners included.
- [ ] Repository URL included; milestone artifacts and instructions available to teaching staff.
- [ ] Pending feedback addressed or clearly identified; scope changes documented.
- [ ] Drafting instructions and unresolved placeholders replaced with answers or explicit limitations.
- [ ] Report exported as one PDF and checked for readable tables and working links.
- [ ] Submission completed by the Canvas deadline.
