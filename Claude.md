# Claude Instructions for benjaminalt.github.io

## Writing News Items

News items are stored in `_news/` as Markdown files with the naming convention `YYYY-MM-DD-slug.md`.

### Front Matter

```yaml
---
layout: post
title: [Descriptive title including paper/talk name]
date: YYYY-MM-DD HH:MM:SS-0000
inline: false
related_posts: false
permalink: /news/[short-slug]/
---
```

**Important**: The site uses `/:collection/:title/` for permalinks by default, which generates URLs from the (long) title. Always add an explicit `permalink` field with a short, readable slug (e.g., `/news/semdt-grc/`) to get clean URLs.

### Title Guidelines

- Include the paper/talk title in the news title, not just "Paper accepted at X"
- Good: `Extended abstract on Bootstrapping Indoor Semantic Digital Twins from 2D Video accepted at German Robotics Conference 2026`
- Avoid: `Extended abstract accepted at German Robotics Conference 2026`

### Content Guidelines

1. **PDF Links**: When mentioning a paper, include a PDF icon link inline:
   ```markdown
   "Paper Title" [<i class="fas fa-file-pdf"></i>](/assets/pdf/filename.pdf)
   ```

2. **Vision and Context**: Don't just describe what the paper does technically. Explain the broader vision and motivation - why does this matter? What problem does it solve for people?

3. **Link to Related Work**: Reference related prior publications with links to IEEE/ArXiv/etc. to show how this work connects to the broader research agenda.

4. **Technical Details**: Include technical specifics but link to tools/methods (e.g., [SAM3](https://arxiv.org/abs/...)) so readers can learn more.

5. **Interesting Insights**: Highlight notable aspects that make the work unique or interesting (e.g., "the system effectively rewrites and evolves its own code at runtime").

6. **Co-authors**: List collaborators with "Joint work with..."

7. **Resources**: Link to GitHub repos, paper websites, videos where available.

### Example Structure

1. Opening: Paper/talk accepted at [Conference](link)
2. Vision/motivation paragraph: What's the big picture?
3. Technical approach paragraph: How does it work? (with links to methods/tools)
4. Co-authors line
5. Resource links (GitHub, paper website, etc.)

## Blog Post Writing Style

When writing or editing blog posts for this site, follow these style guidelines:

### Voice and Tone
- **First-person but analytical**: Use "I" when discussing personal experiences and work, but maintain an analytical, matter-of-fact tone
- **Direct and precise**: Avoid artificially casual or chatty language that sounds LLM-generated
- **No marketing speak**: Avoid superlatives, buzzwords, and promotional language
- **Technical but accessible**: Use technical terms when necessary, but explain them clearly

### Structure
- **Clear headers**: Use descriptive section headers to organize content
- **Concrete examples**: Ground abstract concepts in real-world examples or specific scenarios
- **Personal motivation**: Use personal experiences to motivate technical work (e.g., "When first entering the field of neurosymbolic AI, I was struck with how archaic the development environment felt")

### Formatting
- **Bold for key concepts**: Use **bold** to highlight important takeaways or technical terms
- **Italics for technical terms**: Use *italics* when introducing technical terminology
- **Inline links**: Link to references and citations inline rather than collecting them at the end
- **Code examples**: Include actual code snippets when discussing technical implementations
- **Figures with captions**: Use figures with descriptive captions to illustrate concepts

### Content Guidelines
- **Specific over vague**: Provide concrete numbers, results, and examples rather than hand-waving ("8.3s" not "fast", "2.4× slower than GraphDB" not "competitive performance")
- **Technical precision**: Be precise about technical details without drowning in jargon
- **Honest assessment**: Include limitations and trade-offs, not just benefits
- **Real comparisons**: Compare to specific alternatives with concrete metrics

## LLM Writing Antipatterns to AVOID

Based on [Carnegie Mellon research](https://www.cmu.edu/dietrich/news/news-stories/2025/february/large-language-models-writing-text.html) and [recent studies on AI-generated text](https://arxiv.org/html/2510.20810v1), avoid these telltale signs of LLM-generated writing:

### Formulaic Patterns (NEVER USE THESE)
- "This isn't just X—it Y" (e.g., "This isn't just syntactic sugar—it fundamentally changes...")
- "Let's dive in!", "Here's the thing:", "At the end of the day"
- "X is more than just Y—it's Z"
- "In today's world", "In an era of", "In the age of"
- Excessive use of em dashes in "punched up" sales-like writing

### Overused LLM Vocabulary (AVOID)
According to research, LLMs use these words at vastly higher rates than humans:
- "delve" (ChatGPT favorite, dropped off in 2025)
- "tapestry" (150× more than humans)
- "camaraderie" (150× more than humans)
- "intricate" (heavily overused)
- "palpable" (heavily overused)
- "unease" (60-100× more by Llama variants)

### Vague Intensifiers (AVOID)
- "fundamentally" (unless truly describing fundamental properties)
- "truly", "really", "simply", "just" (when used as filler)
- "seamlessly", "effortlessly", "easily" (unless demonstrating ease)
- "robust", "powerful", "significant" (without specifics)

### Structural Tells (AVOID)
- Present participial clauses at excessive rates (e.g., starting sentences with "-ing" verbs)
- Dense, noun-heavy nominalization style (converting verbs to nouns unnecessarily)
- Excessive use of passive voice
- Overly hedged statements: "It could be argued that...", "One might say..."
- Colon explanations: "X: Y" constructions (e.g., "The main benefit: it reduces latency"). Use separate sentences or rephrase instead

### Sales/Marketing Language (NEVER USE)
- "game-changer", "revolutionary", "cutting-edge"
- "unlock", "leverage", "harness" (when used as buzzwords)
- "seamless integration", "robust solution", "powerful capabilities"
- Superlatives without evidence: "best", "most advanced", "leading"

## What Good Writing Looks Like

**Good**: "When first entering the field of neurosymbolic AI, I was struck with how archaic the development environment felt."

**Bad (LLM-style)**: "In today's rapidly evolving landscape of neurosymbolic AI, it's clear that the development environment truly leaves something to be desired."

**Good**: "KRROOD achieves competitive reasoning performance (8.3s raw, 127.9s reasoned) while providing native integration with application logic—a capability absent in all compared systems."

**Bad (LLM-style)**: "KRROOD fundamentally transforms the landscape by delivering robust performance and seamlessly integrating with application logic in ways that other frameworks can only dream of."

**Good**: "The main challenge is that OWL allows non-disjoint sibling classes (an individual can belong to multiple siblings simultaneously), which conflicts with single-inheritance OOP."

**Bad (LLM-style)**: "This isn't just a minor issue—it's a fundamental paradigm shift that truly requires deep understanding of the intricate relationship between these powerful systems."

## Technical Writing Guidelines

### Do:
- State facts directly
- Use specific numbers and measurements
- Describe what something does, not how "powerful" or "innovative" it is
- Explain trade-offs and limitations
- Use personal experience to ground motivation
- Be precise about technical claims

### Don't:
- Use formulaic intensifiers
- Make vague claims about being "better" or "more robust"
- Describe things as "just" or "simply" working
- Use em dashes for fake emphasis
- Start with contextualizing fluff ("In the modern era of AI...")
- Convert verbs to nouns unnecessarily

## Python Code Style
- Format code with triple backticks and `python` language tag
- Use realistic, grounded examples from actual work
- Include comments only when they clarify non-obvious logic

## Citations and References
- Use BibTeX format for academic citations
- Link inline to relevant papers, tools, and resources
- Cite specific claims with sources

## Resources

Key research on LLM writing detection:
- [Carnegie Mellon LLM writing patterns study (2025)](https://www.cmu.edu/dietrich/news/news-stories/2025/february/large-language-models-writing-text.html)
- [On the Detectability of LLM-Generated Text (2025)](https://arxiv.org/html/2510.20810v1)
- [AARC study on AI in academic writing (2024)](https://www.mdpi.com/2304-6775/13/4/63)
