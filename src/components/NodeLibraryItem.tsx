import { LucideIcon } from 'lucide-react';

interface NodeLibraryItemProps {
  node: {
    id: string;
    name: string;
    icon: LucideIcon;
  };
  category: string;
  color: string;
}

export default function NodeLibraryItem({ node, category, color }: NodeLibraryItemProps) {
  const Icon = node.icon;

  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      nodeType: category,
      nodeId: node.id,
      nodeName: node.name,
      icon: node.icon.name,
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    yellow: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
    green: 'bg-green-50 border-green-200 hover:bg-green-100',
  };

  const iconColorClasses = {
    blue: 'text-blue-600',
    yellow: 'text-yellow-600',
    green: 'text-green-600',
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`p-3 border rounded-lg cursor-grab active:cursor-grabbing transition-colors ${colorClasses[color as keyof typeof colorClasses]}`}
    >
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${iconColorClasses[color as keyof typeof iconColorClasses]}`} />
        <span className="text-sm text-gray-700">{node.name}</span>
      </div>
    </div>
  );
}
