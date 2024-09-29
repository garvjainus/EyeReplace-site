'use client';

import '../../../styles/globals.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const dynamic = 'force-dynamic'; 

const Home = () => {
  const [strugglingWords, setStrugglingWords] = useState([]);
  const [flashcards, setFlashcards] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected answers
  const [correctAnswers, setCorrectAnswers] = useState({}); // Track if an answer is correct
  const { data: session } = useSession(); // Access session and role
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState({}); // Track flipped flashcards

  // Fetch struggling words based on user role
  useEffect(() => {
    if (session?.user?.role === 'teacher') {
      const studentStrugglingWords = [
        { word: 'procrastinate', timesStruggled: 120 },
        { word: 'perseverance', timesStruggled: 83 },
        { word: 'elucidate', timesStruggled: 91 },
        { word: 'facetious', timesStruggled: 72 },
        { word: 'magnanimous', timesStruggled: 113 },
      ];
      setStrugglingWords(studentStrugglingWords);
    } else if (session?.user?.role === 'student') {
      const userStrugglingWords = [
        { word: 'procrastinate', timesStruggled: 5 },
        { word: 'perseverance', timesStruggled: 3 },
        { word: 'elucidate', timesStruggled: 4 },
        { word: 'facetious', timesStruggled: 2 },
        { word: 'magnanimous', timesStruggled: 6 },
      ];
      setStrugglingWords(userStrugglingWords);
    }
  }, [session]);

  // Predefined flashcards data
  const predefinedFlashcards = {
    procrastinate: {
      definition: "To delay or postpone action; to put off doing something.",
      question: "What does it mean to procrastinate?",
      choices: ["To work ahead", "To delay action", "To finish early", "To stop"],
    },
    perseverance: {
      definition: "Persistence in doing something despite difficulty or delay in achieving success.",
      question: "What does perseverance refer to?",
      choices: ["Giving up", "Staying persistent", "Taking a break", "Ignoring a problem"],
    },
    elucidate: {
      definition: "To make something clear; to explain.",
      question: "What is the meaning of elucidate?",
      choices: ["To make clear", "To confuse", "To hide", "To shorten"],
    },
    facetious: {
      definition: "Treating serious issues with deliberately inappropriate humor.",
      question: "What does it mean if someone is being facetious?",
      choices: ["Being serious", "Using humor inappropriately", "Being honest", "Showing empathy"],
    },
    magnanimous: {
      definition: "Generous or forgiving, especially toward a rival or less powerful person.",
      question: "What does magnanimous mean?",
      choices: ["Being selfish", "Being generous and forgiving", "Being angry", "Being cautious"],
    }
  };

  // Generate flashcards for all struggling words
  useEffect(() => {
    setLoading(true);
    const newFlashcards = {};
    strugglingWords.forEach((item) => {
      newFlashcards[item.word] = predefinedFlashcards[item.word] || {};
    });
    setFlashcards(newFlashcards);
    setLoading(false);
  }, [strugglingWords]);

  // Toggle card flip
  const toggleFlip = (word) => {
    setFlippedCards((prev) => ({
      ...prev,
      [word]: !prev[word],
    }));
  };

  // Handle answer selection
  const handleAnswerSelection = (word, choice, isCorrect) => {
    if (!selectedAnswers[word]) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [word]: choice,
      }));

      const correctChoice = flashcards[word].choices.find(c => c.toLowerCase().includes('persistent') || c.toLowerCase().includes('correct'));

      if (!isCorrect) {
        // Wrong answer: highlight it red and the correct answer green
        setCorrectAnswers((prev) => ({
          ...prev,
          [word]: false,
          [`${word}_correctChoice`]: correctChoice,
          [`${word}_wrongChoice`]: choice
        }));
      } else {
        // Correct answer: highlight it green
        setCorrectAnswers((prev) => ({
          ...prev,
          [word]: true
        }));
      }
    }
  };

  // If the session is loading or the user is not authenticated
  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full flex flex-col items-center justify-center text-center">
      {/* Conditional rendering based on user role */}
      <div>
        <span className="head_text green_gradient block">
          {session?.user?.role === 'teacher' ? "My Students' Statistics" : `${session?.user?.name}'s Statistics`}
        </span>
      </div>

      <div className="mt-6">
        {/* Conditional table heading based on user role */}
        <h2 className="text-lg font-bold">
          {session?.user?.role === 'teacher' ? "Words my students struggle with:" : "Words you struggle with:"}
        </h2>

        <table className="mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Word</th>
              <th className="px-4 py-2">Times Struggled</th>
            </tr>
          </thead>
          <tbody>
            {strugglingWords.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.word}</td>
                <td className="border px-4 py-2">{item.timesStruggled}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Flashcards Carousel */}
      {loading ? (
        <p>Loading flashcards...</p>
      ) : (
        <>
          <div className="flashcard-carousel mt-10 w-full max-w-2xl">
            <Carousel showArrows={true} showThumbs={false} infiniteLoop className="carousel-root">
              {Object.keys(flashcards).map((word, index) => (
                <div 
                  key={index} 
                  className="flashcard p-8 text-white"
                  style={{ backgroundColor: '#32CD32', height: '400px', width: '600px' }} // Green background for flashcards, larger height/width
                  onClick={() => toggleFlip(word)} // Flip the card on click
                >
                  {!flippedCards[word] ? (
                    <h3 className="text-5xl font-bold flex items-center justify-center" style={{ height: '100%' }}>{word}</h3> // Word filling card
                  ) : (
                    <div className="flex flex-col items-center justify-center" style={{ height: '100%' }}>
                      <h4 className="text-3xl mb-2">Definition:</h4> {/* Centering "Definition" */}
                      <p className="text-xl mt-2"><strong>{flashcards[word].definition}</strong></p>
                    </div>
                  )}
                </div>
              ))}
            </Carousel>
          </div>

          {/* Practice Questions Carousel */}
          <div className="practice-questions-carousel mt-10 w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Practice Questions</h2>
            <Carousel showArrows={true} showThumbs={false} infiniteLoop className="carousel-root">
              {Object.keys(flashcards).map((word, index) => (
                <div 
                  key={index} 
                  className="question-card p-8" 
                  style={{ backgroundColor: '#FFFFFF', height: '400px', width: '600px', marginBottom: '50px' }} // White background for practice questions, with margin below
                >
                  <h3 className="text-4xl font-bold mb-4">{flashcards[word].question}</h3>
                  <div className="choices text-left">
                    {flashcards[word].choices.map((choice, choiceIndex) => (
                      <div 
                        key={choiceIndex} 
                        className={`choice bg-gray-100 p-4 my-4 rounded cursor-pointer ${selectedAnswers[word] === choice ? (correctAnswers[word] ? 'bg-green-500' : 'bg-red-500') : ''} ${correctAnswers[`${word}_correctChoice`] === choice ? 'bg-green-500' : ''} ${correctAnswers[`${word}_wrongChoice`] === choice ? 'bg-red-500' : ''}`}
                        onClick={() => handleAnswerSelection(word, choice, choice === flashcards[word].choices.find(c => c.toLowerCase().includes('persistent') || c.toLowerCase().includes('correct')))} // Adjust logic for correct answer
                      >
                        <label className="ml-4 text-2xl cursor-pointer">{choice}</label>
                      </div>
                    ))}
                  </div>

                  {/* Show selected answer feedback */}
                  {selectedAnswers[word] && (
                    <div className="mt-4">
                      <strong>Your answer: {selectedAnswers[word]}</strong>
                    </div>
                  )}
                </div>
              ))}
            </Carousel>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
