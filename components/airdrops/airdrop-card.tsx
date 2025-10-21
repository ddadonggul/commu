import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
    <Card variant="elevated" className="transition-smooth hover:scale-[1.02]">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={statusConfig[status].variant}>
            {statusConfig[status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">보상</span>
            <span className="text-sm font-bold text-primary">{reward}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">종료일</span>
            <span className="text-sm font-medium">{endDate}</span>
          </div>
          
          {participants && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">참여자</span>
              <span className="text-sm font-medium">{participants.toLocaleString()}명</span>
            </div>
          )}
        </div>

        {status === "active" && (
          <Button className="w-full rounded-xl" size="sm">
            참여하기
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

