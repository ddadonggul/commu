import { Card, CardContent } from "@/components/ui/card"
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
  return (
    <Card className="bg-primary-50/50 border-l-4 border-l-primary">
      <CardContent className="p-4">
        <div className="flex items-start gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {type === "telegram" ? "📱 텔레그램" : "📰 뉴스"}
          </Badge>
          <span className="text-sm font-semibold">{source}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
          {content}
        </p>
        <div className="flex items-center justify-between">
          {timestamp && (
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          )}
          {channelUrl && (
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              원문 보기 →
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

