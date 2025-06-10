
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const activities = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Redeemed 500 points',
    time: '2 minutes ago',
    type: 'redemption'
  },
  {
    id: 2,
    user: 'Sarah Smith',
    action: 'Earned 150 points',
    time: '5 minutes ago',
    type: 'earning'
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'Made reservation for 4',
    time: '12 minutes ago',
    type: 'booking'
  },
  {
    id: 4,
    user: 'Emma Wilson',
    action: 'Completed order #1847',
    time: '18 minutes ago',
    type: 'order'
  },
  {
    id: 5,
    user: 'David Brown',
    action: 'Joined loyalty program',
    time: '25 minutes ago',
    type: 'signup'
  }
];

const getActivityColor = (type: string) => {
  switch (type) {
    case 'redemption':
      return 'bg-red-100 text-red-800';
    case 'earning':
      return 'bg-green-100 text-green-800';
    case 'booking':
      return 'bg-blue-100 text-blue-800';
    case 'order':
      return 'bg-purple-100 text-purple-800';
    case 'signup':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function RecentActivity() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {activity.user}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.action}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary"
                  className={getActivityColor(activity.type)}
                >
                  {activity.type}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
