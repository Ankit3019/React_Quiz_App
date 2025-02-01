import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import QuizStart from './components/QuizStart'
import QuestionCard from './components/QuestionCard'
import Results from './components/Results'
import Loader from './components/Loader'

export default function App() {
  const [quizData, setQuizData] = useState(null)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/proxy')
        // console.log(response.data.questions)
        if (response) {
          setQuizData(response.data)
        } else {
          throw new Error('Invalid data format')
        }
      } catch (err) {
        console.log(err);
        setError(`Failed to load quiz. ${err}`)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const restartQuiz = () => {
    setScore(0)
    setCurrentQuestion(0)
  }

  if (loading) return <Loader />
  if (error) return <div className="error-message p-8 text-red-500 text-xl">{error}</div>

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizStart />} />
        <Route path="/quiz" element={
          <QuestionCard
            questions={quizData.questions}
            score={score}
            setScore={setScore}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            title = {quizData.title}
            correct_marks={parseInt(quizData.correct_answer_marks)}
            wrong_marks={parseInt(quizData.negative_marks)}
            />
        } />
        <Route path="/results" element={
          <Results 
            score={score} 
            total={quizData.questions.length * 10}
            restartQuiz={restartQuiz}
          />
        } />
      </Routes>
    </Router>
  )
}