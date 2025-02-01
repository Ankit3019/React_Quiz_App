import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Results({ score, restartQuiz }) {
  const navigate = useNavigate()
  const percentage = Math.round((score / 40) * 100)
  const both = () => {
    restartQuiz()
    navigate('/')
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          {percentage >= 80 ? '🎉 Amazing!' : 
           percentage >= 60 ? '👍 Good Job!' : 
           '💪 Keep Trying!'}
        </h1>
        
        <div className="relative inline-block">
          <svg className="w-48 h-48">
            <circle
              className="text-gray-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="80"
              cx="96"
              cy="96"
            />
            <circle
              className="text-green-500"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="80"
              cx="96"
              cy="96"
              strokeDasharray={`${(percentage/40) * 100} 502`}
              transform="rotate(-90 96 96)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{percentage}%</span>
            <span className="text-gray-500">{score}/{40} points</span>
          </div>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-full w-full text-lg font-semibold"
            onClick={() => both()}
          >
            Try Again
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full w-full text-lg font-semibold"
            onClick={() => both()}
          >
            Back to Home
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}