export default function LevelIndicator({ level, title }) {
    return (
        <div className="flex flex-col items-end">
            <div className="text-cyan-400 text-sm">YOU ARE LEVEL {level}:</div>
            <div className="text-cyan-300 text-xl font-bold tracking-wider">{title}</div>
        </div>
    );
  }