/**
 * rehype-external-links only visits hast `element` nodes. Raw <a> written inside
 * MDX — including inside a component's slot — is parsed as an MDX JSX node
 * instead, which that plugin never sees. This applies the same rule on the mdast
 * side so the "external links open in a new tab" guarantee holds everywhere.
 *
 * A no-op for plain .md: those trees contain no MDX JSX nodes.
 */
export function remarkExternalJsxLinks({ internalPrefix }) {
  if (!internalPrefix) throw new Error('remarkExternalJsxLinks needs internalPrefix');

  const isJsxAnchor = (node) =>
    (node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') && node.name === 'a';

  return (tree) => {
    const walk = (node) => {
      if (isJsxAnchor(node)) {
        const attrs = (node.attributes ??= []);
        const named = (name) => attrs.find((a) => a.type === 'mdxJsxAttribute' && a.name === name);
        const href = named('href')?.value;
        /* Only plain string hrefs; an expression value is not ours to judge. */
        const external =
          typeof href === 'string' && /^https?:\/\//i.test(href) && !href.startsWith(internalPrefix);

        if (external && !named('target')) {
          attrs.push({ type: 'mdxJsxAttribute', name: 'target', value: '_blank' });
          if (!named('rel')) {
            attrs.push({ type: 'mdxJsxAttribute', name: 'rel', value: 'noopener' });
          }
        }
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
