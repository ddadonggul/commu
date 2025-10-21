import { Badge } from "@/components/ui/badge"

interface QuoteCardProps {
  type: "telegram" | "news"
  source: string
  content: string
  timestamp?: string
  channelUrl?: string
}

export function QuoteCard({
  type,
  source,
  content,
  timestamp,
  channelUrl
}: QuoteCardProps) {
  const isTelegram = type === "telegram"
  
  return (
    <div className={`border-l-2 pl-3 py-2 ${
      isTelegram 
        ? "border-l-primary/50 bg-primary/5" 
        : "border-l-secondary/50 bg-secondary/5"
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <Badge 
          variant="outline" 
          className="text-xs"
        >
          {isTelegram ? "텔레그램" : "뉴스"}
        </Badge>
        <span className="text-xs font-semibold">{source}</span>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
        {content}
      </p>
      {timestamp && (
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      )}
    </div>
  )
}

