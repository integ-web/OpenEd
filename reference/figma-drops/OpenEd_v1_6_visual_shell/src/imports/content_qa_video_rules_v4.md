# Content QA Video Rules V4

## Replace current media QA with these rules

### Fail states
- Duplicate video URL across lessons.
- Same generic AI video used for multiple lessons.
- Missing authored course script.
- External video shown as official course media.
- No fallback when embed fails.
- No progress tracking state.
- No manual watched/reflection flow for blocked embeds.
- Video title does not map to lesson objective.
- Third-party transcript copied into the product without permission.

### Warning states
- External reference video unverified.
- No timestamp chapters yet.
- Provider is not YouTube and cannot support embedded tracking.
- External video is long; chapter guidance missing.

### Pass states
- Unique, lesson-aligned reference media OR explicit `no external video yet` state.
- Runtime embed check included.
- Fallback state included.
- Authored course script included.
- Transcript drawer clearly labels script as course-authored.
- Learner progress is tracked through embedded playback or manual fallback confirmation.

## QA board summary cards
Show these metrics:
- Total lessons
- Unique reference media count
- Duplicate URL count
- Embed verified count
- Embed blocked count
- No external video yet count
- Authored script coverage
- Lessons ready for publish
