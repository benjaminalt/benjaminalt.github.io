# Claude.md - Project Guidelines

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
