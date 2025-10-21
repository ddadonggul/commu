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
    <Card 
      variant="elevated" 
      className="group h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 border-2 hover:border-primary/30 cursor-pointer overflow-hidden relative"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {category && (
              <Badge 
                variant="outline" 
                className="text-xs font-semibold border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
              >
                {category}
              </Badge>
            )}
            {trend && (
              <Badge 
                variant={trend === "up" ? "positive" : "negative"} 
                className="text-xs font-semibold gap-1 flex items-center"
              >
                {trend === "up" ? (
                  <>
                    <TrendingUp className="w-3 h-3" />
                    상승
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3 h-3" />
                    하락
                  </>
                )}
              </Badge>
            )}
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {content}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="font-semibold text-xs text-foreground/80 px-2 py-1 rounded-md bg-muted/50">
            {source}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {timestamp}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

