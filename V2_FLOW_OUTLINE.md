# V2 Interview Flow - Complete Outline

## Entry Point
- **Route:** `/` (root) or `/v2`
- **Email Detection:** Checks `?vip=` query param or `localStorage` for existing email

---

## PART 1: Emotional Check-In (Screens 1-13)

### Screen 1: Intro
- **Type:** `IntroScreen`
- **Action:** Continue button
- **Branch:**
  - If no email → **Screen 1.5** (Email Collection)
  - If email exists → **Screen 2**

### Screen 1.5: Email Collection (Conditional)
- **Type:** `V2EmailScreen`
- **Action:** Email input + validation
- **Data Captured:** `email`
- **Next:** **Screen 2**

### Screen 2: Emotional State
- **Type:** `V2QuestionScreen` (Single-select)
- **Prompt:** "Hi. Let's start somewhere honest. Where are you at right now?"
- **Options:**
  - Struggling — honestly, it's been rough
  - Managing — holding it together, barely
  - Thriving — actually doing pretty well
  - Complicated — depends on the day… or hour
- **Data Captured:** `emotional_state`
- **GHL Tag:** `dh_v2_emotional_state_{value}`
- **Next:** **Screen 3**

### Screen 3: Acknowledgment (Emotional State)
- **Type:** `AcknowledgmentScreen`
- **Content:** Dynamic acknowledgment based on `emotional_state`
- **Next:** **Screen 4**

### Screen 4: Primary Weight
- **Type:** `V2QuestionScreen` (Single-select)
- **Prompt:** "Here's what we really want to know: What's the heaviest thing you're carrying right now?"
- **Options:**
  - Loneliness (even when I'm not alone)
  - Anxiety that never fully goes away
  - Grief or loss I'm still processing
  - Feeling stuck or lost in life
  - Burnout from constantly being 'strong'
  - Relationship struggles or heartbreak
  - The weight of pretending I'm fine
  - Something else I can't quite name
- **Data Captured:** `primary_weight`
- **GHL Tag:** `dh_v2_primary_weight_{value}`
- **Next:** **Screen 5**

### Screen 5: Acknowledgment (Primary Weight)
- **Type:** `AcknowledgmentScreen`
- **Content:** Dynamic acknowledgment based on `primary_weight`
- **Next:** **Screen 6**

### Screen 6: Last Seen
- **Type:** `V2QuestionScreen` (Single-select)
- **Prompt:** "Real talk: When's the last time you felt truly seen? Not 'checked on.' Not 'how are you'd' by someone who didn't really want to know. But actually seen. Heard. Held."
- **Options:**
  - Honestly? I can't remember
  - It's been months
  - It's been years
  - I have people, but it still doesn't feel like enough
  - I don't let people see me like that
- **Data Captured:** `last_seen`
- **GHL Tag:** `dh_v2_last_seen_{value}`
- **Next:** **Screen 7**

### Screen 7: Acknowledgment (Last Seen)
- **Type:** `AcknowledgmentScreen`
- **Content:** Dynamic acknowledgment based on `last_seen`
- **Next:** **Screen 8**

### Screen 8: 3am Moments
- **Type:** `V2QuestionScreen` (Single-select)
- **Prompt:** "You know what no one talks about? The 3am moments. When everyone else is asleep. When you can't text anyone. When you're stuck in your own head with no one to pull you out. Have you been there?"
- **Options:**
  - Yes, more times than I want to admit
  - I'm there right now
  - Not exactly 3am, but I know that feeling
  - I try not to think about it
- **Data Captured:** `three_am_moments`
- **GHL Tag:** `dh_v2_three_am_moments_{value}`
- **Next:** **Screen 9**

### Screen 9: Acknowledgment (3am Moments)
- **Type:** `AcknowledgmentScreen`
- **Content:** Dynamic acknowledgment based on `three_am_moments`
- **Next:** **Screen 10**

### Screen 10: Relatable Moments (Multi-select)
- **Type:** `MultiSelectScreen`
- **Prompt:** "Some moments hit harder than others. Which of these land for you? (Pick any that apply.)"
- **Options:**
  - Waking up already exhausted
  - Going to bed feeling hollow
  - Sitting in a crowded room feeling invisible
  - Wanting to reach out but not knowing who to text
  - Feeling like a burden when you do reach out
  - Scrolling through your phone with no one to call
  - Crying in your car before going inside
  - Putting on the 'I'm fine' face every single day
- **Data Captured:** `relatable_moments[]` (array)
- **GHL Tags:** `dh_v2_relatable_{value}` (multiple tags, one per selection)
- **Next:** **Screen 11**

### Screen 11: Acknowledgment (Relatable Moments)
- **Type:** `AcknowledgmentScreen`
- **Content:** "Yeah. Those moments are brutal. And the worst part? Most people have no idea you're even going through them. Because you've gotten really good at hiding it."
- **Next:** **Screen 11.25**

### Screen 11.25: The Diagnosis
- **Type:** `V2QuestionScreen` (Single-select)
- **Title:** "Before we personalize anything… one honest reflection."
- **Body:** "Most people who find The Daily Hug aren't in 'crisis.' They're just quietly carrying too much… for too long. They function. They handle things. They show up. But inside, there's a part of them that feels unheld."
- **Question:** "Which one feels closest?"
- **Options:**
  - Yes. That's me.
  - Some of that is me.
  - Not really.
  - I'm not sure, but I'm still here.
- **Data Captured:** `identity_lock`
- **GHL Tag:** `dh_v2_identity_lock_{value}`
- **Next:** **Screen 11.5**

### Screen 11.5: Personalization Bridge
- **Type:** `AcknowledgmentScreen`
- **Content:** "Okay. You've shared a lot already. And we appreciate the trust. Just a few quick questions so we can personalize things properly. Nothing invasive. Just enough to make sure your Hugs actually land right."
- **Next:** **Screen 12**

### Screen 12: First Name
- **Type:** `TextInputScreen`
- **Prompt:** "Before we go any further… What should we call you? (First name is perfect.)"
- **Data Captured:** `first_name` (optional, defaults to 'friend')
- **GHL Update:** Updates contact `firstName` field if not already set
- **Next:** **Screen 12.5**

### Screen 12.5: Age Range
- **Type:** `V2QuestionScreen` (Single-select)
- **Prompt:** "Quick one, {first_name}: We're not asking for your exact age. (We're not the DMV.) But knowing your general season of life helps us personalize your Hugs. Which range feels right?"
- **Options:**
  - 18–24 (figuring it all out)
  - 25–34 (building something)
  - 35–44 (holding it together)
  - 45–54 (navigating the shift)
  - 55–64 (redefining what matters)
  - 65+ (earned wisdom, still learning)
  - Prefer not to say
- **Data Captured:** `age_range`
- **GHL Tag:** `dh_v2_age_{value}`
- **Next:** **Screen 12.6**

### Screen 12.6: Gender Identity
- **Type:** `V2QuestionScreen` (Single-select)
- **Prompt:** "One more: How do you identify? We're asking so Alex can speak to you in a way that feels right — not to put you in a box."
- **Options:**
  - Male
  - Female
  - Non-binary
  - Prefer to self-describe → **Screen 12.25** (Custom Gender Input)
  - Prefer not to say
- **Data Captured:** `gender` (or `gender_custom` if self-describe)
- **GHL Tag:** `dh_v2_gender_{value}`
- **Branch:**
  - If "Prefer to self-describe" → **Screen 12.25**
  - Otherwise → **Screen 12.7**

### Screen 12.25: Custom Gender Input (Conditional)
- **Type:** `TextInputScreen`
- **Prompt:** "How would you like to describe yourself?"
- **Data Captured:** `gender_custom`
- **Next:** **Screen 12.7**

### Screen 12.7: Pronouns
- **Type:** `V2QuestionScreen` (Single-select)
- **Prompt:** "And just so Alex gets it right… What pronouns should we use? (Totally optional.)"
- **Options:**
  - He / Him
  - She / Her
  - They / Them
  - Other → **Screen 12.75** (Custom Pronouns Input)
  - No preference
- **Data Captured:** `pronouns` (or `pronouns_custom` if other)
- **GHL Tag:** `dh_v2_pronouns_{value}`
- **Branch:**
  - If "Other" → **Screen 12.75**
  - Otherwise → Auto-detect timezone, then:
    - If timezone detected → **Screen 13**
    - If timezone NOT detected → **Screen 12.8**

### Screen 12.75: Custom Pronouns Input (Conditional)
- **Type:** `TextInputScreen`
- **Prompt:** "What pronouns should we use?"
- **Data Captured:** `pronouns_custom`
- **Next:** Auto-detect timezone, then:
  - If timezone detected → **Screen 13**
  - If timezone NOT detected → **Screen 12.8**

### Screen 12.8: Time Zone Input (Conditional)
- **Type:** `TextInputScreen`
- **Prompt:** "Quick thing — we couldn't auto-detect your time zone. Where are you in the world? This helps us send your Hugs at the right time."
- **Placeholder:** "e.g., America/New_York or Skip"
- **Data Captured:** `time_zone` (or 'skip' if skipped)
- **Next:** **Screen 13**

### Screen 13: Fork Decision
- **Type:** `ForkScreen`
- **Prompt:** "Okay, {first_name}. You've shared a lot already. Some people like to pause here and just receive their Daily Hugs. Others want to go a little deeper and explore more intentional support. There's no wrong answer. What feels right for you right now?"
- **Options:**
  - 💛 I want to go deeper → **Screen 14** (Part 2)
  - 🌿 I'm good for now → **Screen 14.5** (Graceful Exit)
- **GHL Tags:**
  - If "go deeper" → `dh_v2_part2_entered`
  - If "good for now" → `dh_v2_part1_complete_only`
- **Data Captured:** `part2_entered` (boolean)

### Screen 14.5: Graceful Exit (Part 1 Complete)
- **Type:** `GracefulExitScreen`
- **Content:** "We hear you, {first_name}. No pressure. Ever. Your Daily Hug will arrive tomorrow morning. (You can pick your exact time in the welcome email.) And if you ever want more support… we'll be here. You're not doing this alone anymore. 💛"
- **Action:** "Done →" button
- **External URL:** `https://dailyhug.com` (redirects on click)
- **Data Captured:** `completed_at` (timestamp)

---

## PART 2: Hug Society Deep Dive (Screens 14-22)

> **Note:** Exit Intent Modal can appear on any Part 2 screen (14-35) if user attempts to leave (mouseleave or beforeunload event)

### Screen 14: Part 2 Transition
- **Type:** `AcknowledgmentScreen`
- **Content:** "Alright, {first_name}. Let's keep going."
- **Next:** **Screen 15**

### Screen 15: Support Desire
- **Type:** `V2QuestionScreen` (Single-select)
- **Prompt:** "Here's the thing about support: Most of us don't have enough of it. Or the support we do have shows up inconsistently. When they're available. Not when we need it. What if that changed? What if you had support that was: • Always there • Never too busy • Never judging you • Never making you feel like a burden. Would that matter to you?"
- **Options:**
  - Yes — that would change everything
  - I think so
  - I'm not sure, but I'm listening
- **Data Captured:** `support_desire`
- **GHL Tag:** `dh_v2_support_desire_{value}`
- **Next:** **Screen 16**

### Screen 16: Acknowledgment (Support Desire)
- **Type:** `AcknowledgmentScreen`
- **Content:** "Yeah. Most people don't realize how much steady support matters… Until they actually have it. It changes everything."
- **Next:** **Screen 17**

### Screen 17: Hug Frequency
- **Type:** `V2QuestionScreen` (Single-select)
- **Prompt:** "Alright — honest question: How often do you need a reminder that you're not alone, you matter, and someone sees you?"
- **Options:**
  - Once a day is enough
  - 2–3 times (morning + evening)
  - 3–4 times (I need more check-ins)
  - As many as possible (I'm going through it)
- **Data Captured:** `hug_frequency`
- **GHL Tag:** `dh_v2_hug_frequency_{value}`
- **Next:** **Screen 18**

### Screen 18: Acknowledgment (Hug Frequency)
- **Type:** `AcknowledgmentScreen`
- **Content:** Dynamic acknowledgment based on `hug_frequency`
- **Next:** **Screen 19**

### Screen 19: Hug Styles (Multi-select)
- **Type:** `MultiSelectScreen`
- **Prompt:** "Everyone receives support differently. What kinds of Hugs resonate most with you? (Pick any that apply.)"
- **Options:**
  - Stories that make me feel less alone
  - Practical wisdom I can actually use
  - Permission to rest or let go
  - Gentle reminders that I matter
  - Tough love when I need to hear it
  - Something poetic or reflective
  - Just surprise me
- **Data Captured:** `hug_styles[]` (array)
- **GHL Tags:** `dh_v2_style_{value}` (multiple tags, one per selection)
- **Next:** **Screen 20**

### Screen 20: Acknowledgment (Hug Styles)
- **Type:** `AcknowledgmentScreen`
- **Content:** "Got it. We're building a picture of what you actually need — not what we think you need."
- **Next:** **Screen 21**

### Screen 21: Chronotype
- **Type:** `V2QuestionScreen` (Single-select)
- **Prompt:** "Quick one: Are you more of a morning person or a night owl?"
- **Options:**
  - Morning person (up with the sun)
  - Night owl (don't talk to me before 10am)
  - Depends on the day
  - Neither — I'm just surviving
- **Data Captured:** `chronotype`
- **GHL Tag:** `dh_v2_chronotype_{value}`
- **Next:** **Screen 22**

### Screen 22: Acknowledgment (Chronotype)
- **Type:** `AcknowledgmentScreen`
- **Content:** Dynamic acknowledgment based on `chronotype`
- **Next:** **Screen 23**

---

## CLOSING SEQUENCE: Steady Support & Continuity (Screens 23-35 / C1-C13)

### Screen 23 (C1): The Mirror Logic (Reflection)
- **Type:** `MirrorScreen`
- **Headline:** "Here's what you told us."
- **Body:** "We're not judging it. We're not fixing it. We're just reflecting it back — so support can land properly."
- **Dynamic List:**
  - Right now: {emotional_state label}
  - What weighs most: {primary_weight label}
  - What helps you most: {hug_styles labels, comma-separated}
  - How often support feels right: {hug_frequency label}
- **Footer:** "Nothing added. Nothing interpreted."
- **Button:** "Continue →"
- **Next:** **Screen 24 (C2)**

### Screen 24 (C2): Gentle Normalization
- **Type:** `NormalizationScreen`
- **Headline:** "That makes sense."
- **Body:** "You don't need to be in crisis to want support. Sometimes people want it to stay steady. Sometimes to feel less alone. Sometimes just to hear, 'You're doing better than you think.' Whatever brought you here — it counts."
- **Button:** "Continue →"
- **Next:** **Screen 25 (C3)**

### Screen 25 (C3): The Reframe
- **Type:** `ReframeScreen`
- **Headline:** "Nothing about this means something is 'wrong' with you."
- **Body:** "It just means you're human... Some days take more effort. Some stretches of life ask for a little more support than others. That doesn't need fixing. It just deserves to be met."
- **Button:** "Continue →"
- **Next:** **Screen 26 (C4)**

### Screen 26 (C4): The Bridge
- **Type:** `BridgeScreen`
- **Headline:** "When things feel like this, what actually helps?"
- **Body:** "Not platitudes. Not being told to 'just think positive.'... What helps is support that matches you. That shows up without pressure."
- **Button:** "Continue →"
- **Next:** **Screen 27 (C5)**

### Screen 27 (C5): Identity Bridge
- **Type:** `IdentityBridgeScreen`
- **Body:** "You're not looking for more content. You're looking for something steady... Before we show you what that looks like… there's someone we want you to meet."
- **Button:** "Continue →"
- **Next:** **Screen 28 (C6)**

### Screen 28 (C6): Visual Identity
- **Type:** `VisualIdentityScreen`
- **Body:** "Someone who doesn't need fixing. Someone who just wants to feel supported."
- **Button:** "Continue →"
- **Next:** **Screen 29 (C7)**

### Screen 29 (C7): Alex Reveal
- **Type:** `AlexRevealScreen`
- **Headline:** "This is Alex."
- **Subhead:** "Alex is your HugBot — a gentle AI companion built to support you emotionally."
- **Body:** "Alex isn't a therapist. Alex doesn't diagnose or fix you. Alex sends you steady reminders — based on what you said matters most."
- **Button:** "Continue →"
- **Next:** **Screen 30 (C8)**

### Screen 30 (C8): Concrete Deliverables
- **Type:** `DeliverablesScreen`
- **Content:** List of features:
  - Personalized Hugs
  - Morning/Evening options
  - Flexible frequency
  - Guided journaling tools
- **Footer:** "No overwhelm. No pressure. Just steady support."
- **Button:** "Continue →"
- **Next:** **Screen 31 (C9)**

### Screen 31 (C9): Value Anchor
- **Type:** `ValueAnchorScreen`
- **Headline:** "This isn't content. It's continuity."
- **Body:** "It's knowing something steady shows up... Just to remind you — consistently — that you matter."
- **Button:** "Continue →"
- **Next:** **Screen 32 (C10)**

### Screen 32 (C10): Primary Offer (Annual)
- **Type:** `PrimaryOfferScreen`
- **Headline:** "Join Hug Society."
- **Price:** "$97 / year (That's about 27¢ a day.)"
- **Button:** "Join Hug Society →"
- **Action:** On click:
  - Tags `dh_v2_hs_annual` in GHL
  - Sets `plan_selected = 'annual'` and `completed_at`
  - Redirects to `https://dailyhug.com/order`

### Screen 33 (C11): Downsell (Monthly)
- **Type:** `DownsellScreen`
- **Headline:** "If a year feels like too much right now — that's okay."
- **Body:** "You can start monthly instead. $15 per month. (That's $180/year if you stay — cancel anytime.) Or lock in the full year now at $97 and save $83."
- **Options:**
  - "$15 / month" button → On click:
    - Tags `dh_v2_hs_monthly` in GHL
    - Sets `plan_selected = 'monthly'` and `completed_at`
    - Redirects to `https://dailyhug.com/order-monthly`
  - "$97 / year (save $83)" button → On click:
    - Tags `dh_v2_hs_annual` in GHL
    - Sets `plan_selected = 'annual'` and `completed_at`
    - Redirects to `https://dailyhug.com/order`
- **Next:** (Only if user doesn't click either button - unlikely, but C12 is available)

### Screen 34 (C12): Validation
- **Type:** `ValidationScreen`
- **Body:** "Whichever you choose… there's no 'right' decision here. Some people want consistency. Some want flexibility. Both are valid."
- **Button:** "Continue →"
- **Next:** **Screen 35 (C13)**
- **Note:** This screen is typically bypassed if user selects a plan on C10 or C11

### Screen 35 (C13): Exit
- **Type:** `ExitScreen`
- **Headline:** "You're welcome here."
- **Body:** "Today. Next month. Or whenever you're ready. We'll meet you where you are."
- **Button:** "Done →"
- **External URL:** `https://dailyhug.com` (redirects on click)
- **Note:** This screen is typically only reached if user navigates through C12 without selecting a plan

---

## External URLs Summary

1. **`https://dailyhug.com`**
   - Screen 14.5 (Graceful Exit) - "Done →" button
   - Screen 35 (C13 Exit) - "Done →" button

2. **`https://dailyhug.com/order`**
   - Screen 32 (C10 Primary Offer) - "Join Hug Society →" button (annual plan)
   - Screen 33 (C11 Downsell) - "$97 / year (save $83)" button (annual plan)

3. **`https://dailyhug.com/order-monthly`**
   - Screen 33 (C11 Downsell) - "$15 / month" button (monthly plan)

---

## Data Flow & GHL Tagging

### Data Captured (in order):
1. `email` (Screen 1.5 or query param/localStorage)
2. `emotional_state` (Screen 2)
3. `primary_weight` (Screen 4)
4. `last_seen` (Screen 6)
5. `three_am_moments` (Screen 8)
6. `relatable_moments[]` (Screen 10, multi-select)
7. `identity_lock` (Screen 11.25)
8. `first_name` (Screen 12)
9. `age_range` (Screen 12.5)
10. `gender` / `gender_custom` (Screen 12.6 / 12.25)
11. `pronouns` / `pronouns_custom` (Screen 12.7 / 12.75)
12. `time_zone` (Screen 12.8 or auto-detected)
13. `part2_entered` (Screen 13 fork decision)
14. `support_desire` (Screen 15)
15. `hug_frequency` (Screen 17)
16. `hug_styles[]` (Screen 19, multi-select)
17. `chronotype` (Screen 21)
18. `plan_selected` (Screen 32 or 33)
19. `completed_at` (Screen 14.5, 32, or 33)

### GHL Tag Prefix: `dh_v2_*`

All tags follow the pattern: `dh_v2_{questionKey}_{value}`

Special tags:
- `dh_v2_part2_entered` - User chose to go deeper (Screen 13)
- `dh_v2_part1_complete_only` - User chose "good for now" (Screen 13)
- `dh_v2_hs_annual` - User selected annual plan (Screen 32 or 33)
- `dh_v2_hs_monthly` - User selected monthly plan (Screen 33)

---

## Flow Summary

**Total Screens:** 35 (plus conditional screens 1.5, 12.25, 12.75, 12.8, 14.5)

**Main Path:**
1 → (1.5?) → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 11.25 → 11.5 → 12 → 12.5 → 12.6 → (12.25?) → 12.7 → (12.75?) → (12.8?) → 13 → [FORK]

**Fork Path 1 (Part 1 Complete):**
13 → 14.5 → EXIT (`https://dailyhug.com`)

**Fork Path 2 (Part 2 Deep Dive):**
13 → 14 → 15 → 16 → 17 → 18 → 19 → 20 → 21 → 22 → 23 (C1) → 24 (C2) → 25 (C3) → 26 (C4) → 27 (C5) → 28 (C6) → 29 (C7) → 30 (C8) → 31 (C9) → 32 (C10) → [CHECKOUT]

**Alternative Path 2 (After C10):**
32 (C10) → 33 (C11) → [CHECKOUT] or → 34 (C12) → 35 (C13) → EXIT (`https://dailyhug.com`)

---

## Key Changes from Previous Version

### Closing Sequence Refactor (Screens 23-35)
- **Removed:** Old offer screens (24-31) with crisis-based language, soft off-ramp, guarantee, bonus screens
- **Added:** New C1-C13 sequence focused on "Steady Support" and "Continuity"
- **C1 (Screen 23):** Updated reflection screen with "Nothing added. Nothing interpreted" footer
- **C2-C5:** Normalization, reframe, bridge, and identity bridge screens
- **C6-C7:** Visual identity and Alex reveal (explicitly labeled as HugBot/AI)
- **C8-C9:** Deliverables and value anchor
- **C10-C11:** Simplified pricing flow (annual primary, monthly downsell)
- **C12-C13:** Validation and exit screens

### Style Guide Compliance
- No crisis-based language
- State-agnostic copy (works for "Thriving" and "Struggling")
- Alex explicitly labeled as "HugBot — a gentle AI companion"
- Clean, no-adjective language
- No commentary or interpretation
