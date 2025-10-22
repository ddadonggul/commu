import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Clock, ExternalLink } from "lucide-react"

interface NewsCardProps {
  title: string
  content: string
  source: string
  timestamp: string
  category?: string
  trend?: "up" | "down"
  thumbnail?: string
}

export function NewsCard({ 
  title, 
  content, 
  source, 
  timestamp, 
  category,
  trend,
  thumbnail 
}: NewsCardProps) {
  return (
    <Card 
      variant="elevated" 
      className="group h-full md:h-auto transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:shadow-primary/10 border-2 hover:border-primary/30 cursor-pointer overflow-hidden relative touch-target"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Thumbnail Image */}
      {thumbnail && (
        <div className="relative w-full h-36 md:h-48 overflow-hidden bg-muted">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        </div>
      )}
      
      <CardHeader className="pb-2 px-3 pt-3 md:pb-3 md:px-6 md:pt-6 relative z-10">
        <div className="flex items-start justify-between gap-2 mb-1.5 md:mb-3">
          <div className="flex items-center gap-1 md:gap-2 flex-wrap">
            {category && (
              <Badge 
                variant="outline" 
                className="text-[10px] md:text-xs font-semibold border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors px-1.5 py-0"
              >
                {category}
              </Badge>
            )}
            {trend && (
              <Badge 
                variant={trend === "up" ? "positive" : "negative"} 
                className="text-[10px] md:text-xs font-semibold gap-0.5 md:gap-1 flex items-center px-1.5 py-0"
              >
                {trend === "up" ? (
                  <>
                    <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    상승
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    하락
                  </>
                )}
              </Badge>
            )}
          </div>
          <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </div>
        <h3 className="text-sm md:text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="relative z-10 px-3 pb-3 md:px-6 md:pb-6">
        <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4 line-clamp-2 leading-relaxed">
          {content}
        </p>
        <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-border/50">
          <span className="font-semibold text-[10px] md:text-xs text-foreground/80 px-1.5 py-0.5 md:px-2 md:py-1 rounded-md bg-muted/50 truncate max-w-[100px] md:max-w-none">
            {source}
          </span>
          <span className="flex items-center gap-0.5 md:gap-1.5 text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">
            <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
            {timestamp}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

