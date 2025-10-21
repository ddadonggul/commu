import { Badge } from "@/components/ui/badge"
import { QuoteCard } from "./quote-card"

interface PostCardProps {
  title: string
  content: string
  author: string
  timestamp: string
  category: string
  likes: number
  comments: number
  views?: number
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
  views,
  isHot,
  hasQuote,
  quoteSource
}: PostCardProps) {
  return (
    <div className="px-4 py-4 hover:bg-muted/30 transition-colors cursor-pointer">
      {/* 상단: 닉네임 + 카테고리 + 시간 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold">{author}</span>
        <span className="text-muted-foreground">·</span>
        <Badge 
          variant="outline" 
          className="text-xs px-2 py-0"
        >
          {category}
        </Badge>
        <span className="text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      </div>
      
      {/* 제목 */}
      <h3 className="text-base font-bold mb-2 leading-snug">
        {title}
      </h3>
      
      {/* 내용 */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
        {content}
      </p>
      
      {/* 인용된 출처 */}
      {hasQuote && quoteSource && (
        <div className="mb-3">
          <QuoteCard {...quoteSource} />
        </div>
      )}
      
      {/* 하단: 좋아요, 댓글, 조회수 */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>좋아요 {likes}</span>
        <span>·</span>
        <span>댓글 {comments}</span>
        {views !== undefined && (
          <>
            <span>·</span>
            <span>조회 {views}</span>
          </>
        )}
      </div>
    </div>
  )
}

