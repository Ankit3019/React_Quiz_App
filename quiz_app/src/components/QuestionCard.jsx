import { motion } from 'framer-motion'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function QuestionCard({ questions, score, setScore, currentQuestion, setCurrentQuestion, title, correct_marks, wrong_marks }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [timeLeft, setTimeLeft] = useState(15)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      navigate('/results')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAnswer(false)
          return 15
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion])

  const handleAnswer = (isCorrect) => {
    clearTimeout()
    setSelectedAnswer(isCorrect)
    if (isCorrect) setScore(prev => prev + correct_marks)
    else setScore(prev =>  Math.max(0, prev - wrong_marks))

    setTimeout(() => {
      setSelectedAnswer(null)
      setCurrentQuestion(prev => prev + 1)
      setTimeLeft(15)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <span className="text-xl font-bold text-blue-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md ">
            <div className='text-gray-800 font-bold text-2xl'>{title}</div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-2">
            <span className="text-xl font-bold text-purple-600">Score:</span>
            <span className="text-2xl font-bold">{score}</span>
            <div className="text-yellow-500">
              {Array(Math.floor(score/50)).fill('⭐').join('')}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center flex-col">
              <div>⏳</div> 
              <div>{timeLeft}s</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {questions[currentQuestion]?.description}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion]?.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 text-left rounded-xl transition-all ${
                  selectedAnswer !== null
                    ? option.is_correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-blue-100 hover:bg-blue-200'
                } ${
                  selectedAnswer === null ? 'cursor-pointer' : 'cursor-default'
                }`}
                onClick={() => handleAnswer(option.is_correct)}
                disabled={selectedAnswer !== null}
              >
                {option.description}
                {selectedAnswer !== null && option.is_correct && (
                  <CheckCircleIcon className="w-6 h-6 ml-2 inline-block" />
                )}
                {selectedAnswer !== null && !option.is_correct && (
                  <XCircleIcon className="w-6 h-6 ml-2 inline-block" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}