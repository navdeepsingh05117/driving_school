import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">{title}</p>
          <p className={`text-xl sm:text-2xl lg:text-3xl ${color}`}>{value}</p>
        </div>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 ${color.replace('text-', 'bg-').replace('-600', '-100')} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
        </div>
      </div>
    </div>
  );
}
