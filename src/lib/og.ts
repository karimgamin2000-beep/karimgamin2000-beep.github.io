import sharp from 'sharp';

interface OgCardOptions {
  title: string;
  description?: string;
  category?: string;
  lang?: string;
  tags?: string[];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function wrapText(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    }
  }

  if (current && lines.length < maxLines) {
    lines.push(current);
  }

  const consumedWords = lines.join(' ').split(/\s+/).length;
  if (consumedWords < words.length && lines.length > 0) {
    const last = lines[lines.length - 1];
    lines[lines.length - 1] = last.length > maxChars - 3 ? `${last.slice(0, maxChars - 3)}...` : `${last}...`;
  }

  return lines;
}

export async function generateOgPng(options: OgCardOptions): Promise<Buffer> {
  const titleLines = wrapText(options.title, 34, 3);
  const descLines = options.description ? wrapText(options.description, 68, 2) : [];
  const badgeParts = [options.category?.toUpperCase(), options.lang?.toUpperCase()].filter(Boolean);
  const badgeText = badgeParts.length > 0 ? badgeParts.join(' · ') : 'AI & DEV TOOLS';
  const tagsText = (options.tags || [])
    .slice(0, 4)
    .map((t) => `#${t}`)
    .join('   ');

  const titleStartY = 235;
  const titleLineHeight = 58;
  const descStartY = titleStartY + titleLines.length * titleLineHeight + 24;

  const titleSvg = titleLines
    .map(
      (line, idx) =>
        `<text x="96" y="${titleStartY + idx * titleLineHeight}" fill="#f4f4f5" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="46" font-weight="700" letter-spacing="-0.8">${escapeXml(line)}</text>`
    )
    .join('\n  ');

  const descSvg = descLines
    .map(
      (line, idx) =>
        `<text x="96" y="${descStartY + idx * 34}" fill="#a1a1aa" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="22" font-weight="400">${escapeXml(line)}</text>`
    )
    .join('\n  ');

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="85%" cy="15%" r="60%">
      <stop offset="0%" stop-color="#27272a" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#111113" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#111113" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <!-- Editorial inner frame -->
  <rect x="44" y="44" width="1112" height="542" rx="24" fill="#18181b" stroke="#27272a" stroke-width="2" />

  <!-- Top row: KAK brand + category/lang badge -->
  <text x="96" y="122" fill="#f4f4f5" font-family="Georgia, serif" font-style="italic" font-size="46" letter-spacing="1.5">KAK</text>
  <rect x="920" y="88" width="184" height="38" rx="19" fill="#202024" stroke="#3f3f46" stroke-width="1.5" />
  <text x="1012" y="113" text-anchor="middle" fill="#e4e4e7" font-family="monospace" font-size="16" font-weight="600" letter-spacing="1.2">${escapeXml(badgeText)}</text>

  <!-- Title & description -->
  ${titleSvg}
  ${descSvg}

  <!-- Bottom divider & metadata -->
  <line x1="96" y1="504" x2="1104" y2="504" stroke="#27272a" stroke-width="1.5" />
  <text x="96" y="544" fill="#a1a1aa" font-family="monospace" font-size="18">${escapeXml(tagsText || 'Konaté Abdoul Karim')}</text>
  <text x="1104" y="544" text-anchor="end" fill="#f4f4f5" font-family="monospace" font-size="18" font-weight="600">karimgamin2000-beep.github.io</text>
</svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
}
