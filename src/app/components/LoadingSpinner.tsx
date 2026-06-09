interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 animate-in fade-in duration-300">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-[#0071E3] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
      {text && (
        <p className="text-[#6E6E73] text-sm animate-pulse">{text}</p>
      )}
    </div>
  );
}
