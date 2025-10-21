import { Card, CardContent } from "@/components/ui/card"

interface MindshareStatsProps {
  totalChannels: number
  totalScore: number
  topGainer?: {
    name: string
    scoreChange: number
  }
  avgScore: number
}

export function MindshareStats({
  totalChannels,
  totalScore,
  topGainer,
  avgScore
}: MindshareStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground mb-1">총 채널 수</div>
          <div className="text-2xl font-bold text-primary">{totalChannels}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground mb-1">총 마인드쉐어</div>
          <div className="text-2xl font-bold">{totalScore.toLocaleString()}</div>
        </CardContent>
      </Card>

      {topGainer && (
        <Card className="bg-primary-50">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">최대 상승</div>
            <div className="text-base font-bold text-green-600 truncate">
              {topGainer.name}
            </div>
            <div className="text-sm text-green-600">
              +{topGainer.scoreChange.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground mb-1">평균 점수</div>
          <div className="text-2xl font-bold">{avgScore.toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  )
}

