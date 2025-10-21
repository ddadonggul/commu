import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NewsCardProps {
  title: string
  content: string
  source: string
  timestamp: string
  category?: string
  trend?: "up" | "down"
}

export function NewsCard({ 
  title, 
  content, 
  source, 
  timestamp, 
  category,
  trend 
}: NewsCardProps) {
  return (
    <Card variant="elevated" className="transition-smooth hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-bold leading-tight mb-2">{title}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {category && (
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              )}
              {trend && (
                <Badge variant={trend === "up" ? "positive" : "negative"} className="text-xs">
                  {trend === "up" ? "↗ 상승" : "↘ 하락"}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {content}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium">{source}</span>
          <span>{timestamp}</span>
        </div>
      </CardContent>
    </Card>
  )
}

