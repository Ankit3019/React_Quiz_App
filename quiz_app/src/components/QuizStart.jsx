import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function QuizStart() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100"
    >
      <div className="max-w-2xl w-full p-8 bg-white rounded-2xl shadow-xl text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to QuizMaster! 🚀
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Test your knowledge with our interactive quiz. Earn points for correct answers and track your progress!
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all"
          onClick={() => navigate('/quiz')}
        >
          Start Quiz Now!
        </motion.button>

        <div className="mt-8 flex justify-center items-center gap-4 text-gray-500">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
            <span>4 points per correct answer</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
            <span>Instant feedback</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}