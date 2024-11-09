// components/features/profile/activity-list.tsx
interface ActivityItem {
  type: string
  title: string
  date: string
  status: string
}

interface ActivityListProps {
  activities: ActivityItem[]
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div 
          key={index} 
          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <div className="font-medium">{activity.title}</div>
            <div className="text-sm text-muted-foreground">{activity.type}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{activity.status}</div>
            <div className="text-sm text-muted-foreground">{activity.date}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
