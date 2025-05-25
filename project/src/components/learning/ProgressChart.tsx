import React from 'react';
import { Progress } from '../../types';

interface ProgressChartProps {
  progressData: Progress[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ progressData }) => {
  // Sort progress by date
  const sortedData = [...progressData].sort((a, b) => 
    new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
  );

  const maxScore = 100; // Assuming max score is 100%
  const chartHeight = 200;

  // Calculate the width of each bar
  const barWidth = `calc(${100 / Math.max(sortedData.length, 1)}% - 8px)`;

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Progress</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Track your learning journey over time
        </p>
      </div>

      <div className="relative h-[260px]">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        {/* Chart container */}
        <div className="absolute left-12 right-0 top-0 bottom-20 border-l border-b border-gray-300 dark:border-gray-700">
          {/* Horizontal grid lines */}
          <div className="absolute left-0 right-0 top-0 border-t border-gray-200 dark:border-gray-800 h-0"></div>
          <div className="absolute left-0 right-0 top-1/4 border-t border-gray-200 dark:border-gray-800 h-0"></div>
          <div className="absolute left-0 right-0 top-2/4 border-t border-gray-200 dark:border-gray-800 h-0"></div>
          <div className="absolute left-0 right-0 top-3/4 border-t border-gray-200 dark:border-gray-800 h-0"></div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-around p-2">
            {sortedData.length > 0 ? (
              sortedData.map((item, index) => {
                const scorePercentage = (item.score / maxScore) * 100;
                const barHeight = (scorePercentage / 100) * chartHeight;
                
                return (
                  <div 
                    key={index} 
                    className="flex flex-col items-center"
                    style={{ width: barWidth }}
                  >
                    <div 
                      className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-sm transition-all duration-500 ease-out"
                      style={{ height: `${barHeight}px` }}
                      title={`Score: ${item.score}%`}
                    ></div>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-400">
                No progress data available
              </div>
            )}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-12 right-0 bottom-0 h-20 flex justify-around">
          {sortedData.map((item, index) => (
            <div key={index} className="flex flex-col items-center" style={{ width: barWidth }}>
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {new Date(item.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-1 truncate max-w-full">
                {item.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;