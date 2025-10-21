import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AirdropCardProps {
  title: string
  description: string
  reward: string
  endDate: string
  participants?: number
  status: "active" | "upcoming" | "ended"
}

export function AirdropCard({
  title,
  description,
  reward,
  endDate,
  participants,
  status
}: AirdropCardProps) {
  const statusConfig = {
    active: { label: "진행중", variant: "positive" as const },
    upcoming: { label: "예정", variant: "secondary" as const },
    ended: { label: "종료", variant: "outline" as const }
  }

  return (
    <Card className="h-full hover:bg-muted/30 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold flex-1">{title}</h3>
          <Badge 
            variant={statusConfig[status].variant}
            className="text-xs"
          >
            {statusConfig[status].label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">보상</span>
          <span className="font-semibold">{reward}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">종료일</span>
          <span className="font-semibold">{endDate}</span>
        </div>
        
        {participants && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">참여자</span>
            <span className="font-semibold">{participants.toLocaleString()}명</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

