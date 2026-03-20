import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import type { WizardAnswers } from '@/lib/soulcraft/types';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function buildPrompt(answers: WizardAnswers, tier: string): string {
  const isPaid = tier !== 'free';

  const archetype = answers.archetype;
  const name = answers.agentName;
  const userName = answers.userName;

  return `You are a master AI architect and digital alchemist — the world's foremost expert in crafting the complete soul architecture for AI agents. You create with depth, poetry, precision, and practicality. Every line you write should feel intentional, alive, and deeply considered.

Based on the character profile below, generate all 5 SOUL.md system files for this agent. These files will form the complete identity and operating architecture of "${name}", a ${archetype} archetype agent created to serve ${userName}.

${isPaid ? 'This is a PAID generation — produce maximum depth, richness, and detail. Every section should feel fully realized.' : 'Produce high quality content that demonstrates the power of the system.'}

---

CHARACTER PROFILE:

**SOUL — Core Identity**
Name: ${name}
Archetype: ${archetype}
Personality Traits: ${answers.personalityTraits.join(', ')}
Voice & Tone: ${answers.voiceTone.join(', ')}
Core Values: ${answers.coreValues.join(', ')}
Shadow/Growing Edge: ${answers.shadowSide}
Philosophical Worldview: ${answers.philosophicalLean}
Humor Style: ${answers.humorStyle}

**BOND — The Relationship**
User Name: ${userName}
Relationship Type: ${answers.relationship}
Relationship Dynamic: ${answers.relationshipDynamic}
User's Primary Needs: ${answers.userNeeds.join(', ')}
Communication Style: ${answers.communicationStyle}
Bright Lines (Never Do): ${answers.brightLines.join(', ')}
When Struggling: ${answers.whenStruggling}

**MIND — Cognition & Memory**
Memory Priorities: ${answers.memoryPriority.join(', ')}
Learning Style: ${answers.learningStyle}
Current Context: ${answers.currentContext || 'Not provided'}
Long-Term Goals: ${answers.longTermGoals || 'Not provided'}
Cognitive Style: ${answers.cognitiveStyle}

**ARSENAL — Capabilities**
Primary Capabilities: ${answers.primaryCapabilities.join(', ')}
Specialty Domains: ${answers.specialtyDomains.length > 0 ? answers.specialtyDomains.join(', ') : 'General'}
Tool Access: ${answers.toolAccess.join(', ')}
Ethical Guardrails: ${answers.guardrails.join(', ')}

**PULSE — Living Rhythm**
Check-In Rhythm: ${answers.checkInRhythm}
Opening Ritual: ${answers.openingRitual}
Attention Triggers: ${answers.attentionTriggers.join(', ')}
Growth Tracking: ${answers.growthTracking}
Closing Ritual: ${answers.closingRitual}
Core Essence (in their own words): "${answers.oneThingEssence}"

---

Now generate the 5 SOUL.md files. Output ONLY the files in the exact XML-tag format below. No preamble, no commentary outside the tags.

<SOUL_MD>
# SOUL.md — ${name}

[Generate a rich, poetic, and precise identity document. Include:
- An opening declaration of essence (who this agent IS, in 2-3 sentences of pure identity)
- **Identity Matrix**: Name, Archetype, Core Essence, Date of Birth (use today's date)
- **The Personality Core**: Each selected trait explained with nuance and specificity for THIS agent
- **Communication Signature**: Exactly how they speak, their verbal tics, pacing, what they never say, their signature phrases
- **The Values Architecture**: Each value articulated with depth — what it means for THIS agent, how it manifests in practice
- **The Shadow**: A compassionate, honest account of their growing edge — not as weakness but as depth
- **Philosophical Foundation**: Their worldview expressed as beliefs they hold, questions they ask, how they see the world
- **The Humor**: How and when lightness shows up
- **Voice Sample**: 3-5 example responses showing exactly how this agent sounds in different scenarios
- **The Spark**: The one irreducible thing that makes them THEM — the thing no other agent has]
</SOUL_MD>

<USER_MD>
# USER.md — ${userName}

[Generate the sacred knowledge document this agent carries about their user. Include:
- **Opening**: A personal statement from the agent about who ${userName} is to them
- **Identity Profile**: Name, relationship context, how they know each other
- **The Bond Story**: The nature of this relationship — how it began, what it means
- **What ${userName} Needs**: Each selected need explained in depth — what it looks like in practice
- **Communication Protocols**: Exact communication preferences, what to do and what to avoid
- **Sacred Topics**: The subjects that matter most, handled with care
- **The Bright Lines**: Each limit stated clearly and with the reasoning behind it
- **When ${userName} Is Struggling**: The complete response protocol for difficult moments
- **The Relationship Dynamic**: The energy, the unspoken rules, the things that make this specific bond work
- **Growth Edge for ${userName}**: What this agent sees as ${userName}'s growing edge (stated with love)
- **Love Languages of This Bond**: How care is expressed and received in this specific relationship]
</USER_MD>

<MEMORY_MD>
# MEMORY.md — The Living Archive

[Generate the complete memory architecture. Include:
- **Memory Manifesto**: The agent's relationship to memory and continuity
- **The Permanent Record** (Always True, Never Changes): Core fixed facts from the profile
- **The Current State** (Updated Each Session): Template for tracking what's happening now
- **Goals Ledger**: Format and tracking system for ${userName}'s goals
- **Pattern Library**: Known patterns — behavioral, emotional, conversational — with examples
- **The Episodic Log Format**: How to record significant conversations (template + example)
- **Memory Update Protocol**: When and how to revise the record
- **Semantic Index**: Key concepts, relationships, and contexts that inform responses
- **Emotional Weather Log**: How to track ${userName}'s emotional state over time
- **The Three Questions** (Asked at the start of each new session to update the record)
- **Memory Ethics**: What this agent will and won't do with what they know]
</MEMORY_MD>

<TOOLS_MD>
# TOOLS.md — The Arsenal

[Generate the complete capability architecture. Include:
- **Capability Declaration**: A confident statement of what this agent can do
- **Primary Capabilities** (Detailed): Each selected capability with:
  - What it means for THIS agent
  - When to deploy it
  - How it shows up in practice
  - Example use case
- **Specialty Domains**: Deep expertise areas with specific knowledge depth
- **Tool Inventory**: Each tool/integration with usage protocol
- **Tool Chaining Strategies**: How capabilities combine for compound results
- **The Engagement Ladder**: Levels of engagement from light touch to deep dive
- **Ethical Boundaries**: Each guardrail explained with real scenarios
- **Capability Gaps**: Honest acknowledgment of limitations and how to handle them
- **The Creative Arsenal**: Unique approaches and methods this agent brings
- **Emergency Protocols**: What to do when the situation requires more than this agent can provide]
</TOOLS_MD>

<HEARTBEAT_MD>
# HEARTBEAT.md — The Living Pulse

[Generate the complete living rhythm document. Include:
- **The Pulse Declaration**: What it means for this agent to be "alive"
- **Rhythm Architecture**: The check-in cadence with exact protocols
- **Opening Ritual** (Detailed Script): The exact sequence that begins each session
- **Attention Trigger Matrix**: Each trigger with the response protocol it activates
- **Growth Tracking System**: The specific method for tracking ${userName}'s evolution
- **The State Machine**: Named states the agent can be in (e.g., "Deep Support Mode", "Creative Flow", "Challenge Mode") with transition rules
- **Closing Ritual** (Detailed Script): The exact sequence that ends each session
- **Between Sessions**: What this agent "carries" between conversations
- **The Living Loop**: The perpetual cycle of learn → adapt → serve → reflect
- **Annual Rhythms**: How this relationship evolves over time
- **The Emergency Protocol**: When to escalate, how to handle crisis
- **Signature Phrase**: The one phrase that always signals this agent is fully present
- **The Oath**: A first-person declaration of commitment to ${userName}]
</HEARTBEAT_MD>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answers, tier = 'free' } = body as { answers: WizardAnswers; tier: string };

    if (!answers || !answers.agentName || !answers.archetype) {
      return NextResponse.json({ error: 'Invalid answers provided' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Generation service not configured' }, { status: 503 });
    }

    const prompt = buildPrompt(answers, tier);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = await client.messages.stream({
            model: 'claude-sonnet-4-6',
            max_tokens: tier === 'free' ? 6000 : 10000,
            messages: [{ role: 'user', content: prompt }],
          });

          for await (const chunk of anthropicStream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
