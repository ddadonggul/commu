import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TelegramChannel } from "@/types"

interface ChannelCardProps extends TelegramChannel {
  showRank?: boolean
}

export function ChannelCard({
  rank,
  name,
  channelUrl,
  score,
  subscribers,
  category,
  scoreChange,
  rankChange,
  showRank = true
}: ChannelCardProps) {
  const getRankBadge = () => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return null
  }

  const getRankChangeIcon = () => {
    if (!rankChange) return null
    if (rankChange > 0) return <span className="text-green-600 text-xs">↑ {rankChange}</span>
    if (rankChange < 0) return <span className="text-red-600 text-xs">↓ {Math.abs(rankChange)}</span>
    return <span className="text-muted-foreground text-xs">-</span>
  }

  return (
    <Link href={channelUrl} target="_blank" rel="noopener noreferrer">
      <Card variant="elevated" className="transition-smooth hover:scale-[1.02] active:scale-[0.98]">
        <CardContent className="p-2.5 md:p-4 touch-target">
          <div className="flex items-start gap-2 md:gap-3">
            {/* Rank */}
            {showRank && (
              <div className="flex flex-col items-center min-w-[40px] md:min-w-[60px]">
                <div className="text-lg md:text-2xl font-bold text-primary">
                  {getRankBadge() || `#${rank}`}
                </div>
                <div className="text-[10px] md:text-xs">
                  {getRankChangeIcon()}
                </div>
              </div>
            )}

            {/* Channel Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1 md:mb-2">
                <h3 className="font-bold text-xs md:text-base line-clamp-1">{name}</h3>
                {category && (
                  <Badge variant="outline" className="text-[10px] md:text-xs whitespace-nowrap px-1.5 py-0">
                    {category}
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-[10px] md:text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">점수</span>
                  <span className="font-bold text-primary">
                    {score.toLocaleString()}
                  </span>
                  {scoreChange && scoreChange > 0 && (
                    <span className="text-green-600 text-[10px]">
                      +{scoreChange.toLocaleString()}
                    </span>
                  )}
                </div>

                {subscribers && (
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">구독자</span>
                    <span className="font-medium">
                      {subscribers.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Telegram Link */}
              <div className="mt-1 md:mt-2 text-[10px] md:text-xs text-primary hover:underline truncate">
                {channelUrl}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

