import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AirdropCardProps {
  title: string
  description: string
  reward: string
  endDate: string
  participants?: number
  status: "active" | "upcoming" | "ended"
  thumbnail?: string
  tokenSymbol?: string
}

export function AirdropCard({
  title,
  description,
  reward,
  endDate,
  participants,
  status,
  thumbnail,
  tokenSymbol
}: AirdropCardProps) {
  const statusConfig = {
    active: { label: "진행중", variant: "positive" as const },
    upcoming: { label: "예정", variant: "secondary" as const },
    ended: { label: "종료", variant: "outline" as const }
  }

  return (
    <Card className="h-full md:h-auto hover:bg-muted/30 active:bg-muted/50 transition-colors cursor-pointer touch-target">
      <CardHeader className="px-3 pt-3 pb-2 md:px-6 md:pt-6 md:pb-4">
        <div className="flex items-start gap-3 mb-1.5 md:mb-3">
          {/* Token Thumbnail */}
          {thumbnail && (
            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
              <img 
                src={thumbnail} 
                alt={tokenSymbol || title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement!.innerText = tokenSymbol?.[0] || '?'
                }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-sm md:text-lg font-bold leading-tight line-clamp-2">{title}</h3>
              <Badge 
                variant={statusConfig[status].variant}
                className="text-[10px] md:text-xs shrink-0 px-1.5 py-0.5"
              >
                {statusConfig[status].label}
              </Badge>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-1 md:space-y-2 px-3 pb-3 md:px-6 md:pb-6">
        <div className="flex items-center justify-between text-[10px] md:text-sm">
          <span className="text-muted-foreground">보상</span>
          <span className="font-semibold">{reward}</span>
        </div>
        
        <div className="flex items-center justify-between text-[10px] md:text-sm">
          <span className="text-muted-foreground">종료일</span>
          <span className="font-semibold">{endDate}</span>
        </div>
        
        {participants && (
          <div className="flex items-center justify-between text-[10px] md:text-sm">
            <span className="text-muted-foreground">참여자</span>
            <span className="font-semibold">{participants.toLocaleString()}명</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

