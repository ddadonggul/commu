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
  thumbnail?: string
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
  thumbnail,
  quoteSource
}: PostCardProps) {
  return (
    <div className="px-3 py-2.5 md:px-4 md:py-4 hover:bg-muted/30 active:bg-muted/50 transition-colors cursor-pointer touch-target">
      {/* 상단: 닉네임 + 카테고리 + 시간 */}
      <div className="flex items-center gap-1 md:gap-2 mb-1.5 md:mb-3 flex-wrap">
        <span className="text-xs md:text-sm font-semibold">{author}</span>
        <span className="text-muted-foreground text-xs hidden md:inline">·</span>
        <Badge 
          variant="outline" 
          className="text-[10px] md:text-xs px-1 md:px-2 py-0"
        >
          {category}
        </Badge>
        <span className="text-muted-foreground text-xs hidden md:inline">·</span>
        <span className="text-[10px] md:text-xs text-muted-foreground">{timestamp}</span>
      </div>
      
      {/* 제목과 썸네일 */}
      <div className="flex gap-2 md:gap-3 mb-1 md:mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm md:text-base font-bold leading-tight line-clamp-2">
            {title}
          </h3>
        </div>
        {thumbnail && (
          <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-muted">
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}
      </div>
      
      {/* 내용 */}
      <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2 leading-relaxed">
        {content}
      </p>
      
      {/* 인용된 출처 */}
      {hasQuote && quoteSource && (
        <div className="mb-2 md:mb-3">
          <QuoteCard {...quoteSource} />
        </div>
      )}
      
      {/* 하단: 좋아요, 댓글, 조회수 */}
      <div className="flex items-center gap-1.5 md:gap-3 text-[10px] md:text-xs text-muted-foreground flex-wrap">
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

