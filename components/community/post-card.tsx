import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { QuoteCard } from "./quote-card"

interface PostCardProps {
  title: string
  content: string
  author: string
  timestamp: string
  category: string
  likes: number
  comments: number
  isHot?: boolean
  hasQuote?: boolean
  quoteSource?: {
    type: "telegram" | "news"
    source: string
    content: string
    timestamp?: string
    channelUrl?: string
  }
}

export function PostCard({
  title,
  content,
  author,
  timestamp,
  category,
  likes,
  comments,
  isHot,
  hasQuote,
  quoteSource
}: PostCardProps) {
  return (
    <Card variant="elevated" className="transition-smooth hover:scale-[1.01]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isHot && (
                <span className="text-lg">🔥</span>
              )}
              <h3 className="text-lg font-bold leading-tight">{title}</h3>
            </div>
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* 인용된 출처 */}
        {hasQuote && quoteSource && (
          <div className="mb-4">
            <QuoteCard {...quoteSource} />
          </div>
        )}
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {content}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-medium">{author}</span>
            <span>•</span>
            <span>{timestamp}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              👍 {likes}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              💬 {comments}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

