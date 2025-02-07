// Basic markdown parser using regex
interface MarkdownBlock {
  type: 'paragraph' | 'code' | 'list' | 'header' | 'hr';
  content: string;
  level?: number;
}

function splitIntoBlocks(text: string): MarkdownBlock[] {
  const lines = text.split('\n');
  const blocks: MarkdownBlock[] = [];
  let currentBlock: MarkdownBlock | null = null;
  let inCodeBlock = false;

  for (const line of lines) {
    // Code block handling
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        currentBlock = { type: 'code', content: '' };
        inCodeBlock = true;
      } else {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = null;
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) {
      if (currentBlock) currentBlock.content += line + '\n';
      continue;
    }

    // Header handling
    if (line.startsWith('##')) {
      if (currentBlock) blocks.push(currentBlock);
      const level = line.match(/^#{2,3}/)?.[0].length ?? 2;
      currentBlock = { type: 'header', content: line.slice(level).trim(), level };
      blocks.push(currentBlock);
      currentBlock = null;
      continue;
    }

    // List handling
    if (line.trim().startsWith('- ')) {
      if (currentBlock?.type !== 'list') {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'list', content: line + '\n' };
      } else {
        currentBlock.content += line + '\n';
      }
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      if (currentBlock) blocks.push(currentBlock);
      blocks.push({ type: 'hr', content: '' });
      currentBlock = null;
      continue;
    }

    // Paragraph handling
    if (line.trim()) {
      if (!currentBlock || currentBlock.type !== 'paragraph') {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'paragraph', content: line + '\n' };
      } else {
        currentBlock.content += line + '\n';
      }
    } else {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
    }
  }

  if (currentBlock) blocks.push(currentBlock);
  return blocks;
}

function parseInlineMarkdown(text: string): string {
  return text
    // Code inline
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 rounded">$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    // Escape HTML
    .replace(/[<>&]/g, (c) => ({
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;'
    }[c] || c));
}

// Rule: Use explicit return types for all functions
export function parseMarkdown(text: string): string {
  const blocks = splitIntoBlocks(text);
  
  return blocks.map(block => {
    switch (block.type) {
      case 'code':
        return `<pre class="bg-muted p-2 rounded-lg overflow-x-auto my-4"><code>${
          block.content.trim()
        }</code></pre>`;
      
      case 'list':
        const items = block.content
          .split('\n')
          .filter(line => line.trim())
          .map(line => `<li>${parseInlineMarkdown(line.slice(2))}</li>`)
          .join('');
        return `<ul class="list-disc pl-6 my-4">${items}</ul>`;
      
      case 'header':
        const Tag = `h${block.level}`;
        const className = block.level === 2 ? 'text-xl' : 'text-lg';
        return `<${Tag} class="${className} font-bold mt-6 mb-4">${
          parseInlineMarkdown(block.content)
        }</${Tag}>`;
      
      case 'hr':
        return '<hr class="my-6 border-t border-border" />';
      
      default:
        return `<p class="my-4">${parseInlineMarkdown(block.content.trim())}</p>`;
    }
  }).join('\n');
}
