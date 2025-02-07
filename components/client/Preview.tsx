'use client';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { micromark } from 'micromark';

interface PreviewProps {
  content: string;
}

export function Preview({ content }: PreviewProps) {
  const [showRaw, setShowRaw] = useState(false);
  const [copied, setCopied] = useState(false);
  const htmlContent = micromark(content, {
    allowDangerousHtml: true
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rules.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between gap-4 p-4 border-b">
        <div className="flex items-center gap-4">
          <Label
            htmlFor="preview-mode"
            className={`text-sm ${!showRaw ? 'font-medium' : 'text-muted-foreground'}`}
          >
            Preview
          </Label>
          <Switch
            id="preview-mode"
            checked={showRaw}
            onCheckedChange={setShowRaw}
          />
          <Label
            htmlFor="preview-mode"
            className={`text-sm ${showRaw ? 'font-medium' : 'text-muted-foreground'}`}
          >
            Raw
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {showRaw ? (
          <pre className="font-mono text-sm whitespace-pre-wrap">{content}</pre>
        ) : (
          <div
            className="prose prose-sm dark:prose-invert [&_hr]:my-8 [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_h4]:font-bold [&_h5]:font-bold [&_h6]:font-bold [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_h1]:leading-tight [&_h2]:leading-snug [&_h3]:leading-normal [&_h4]:leading-normal [&_h5]:leading-normal [&_h6]:leading-normal"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}
      </div>
    </div>
  );
}
