'use client'

import '/Users/garvjain/Downloads/eyereplace/styles/globals.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export const dynamic = 'force-dynamic'; 

const Home = () => {
  const [strugglingWords, setStrugglingWords] = useState([]);
  const { data: session } = useSession(); // Access session and role

  // Simulating fetching struggling words data for both students and teachers
  useEffect(() => {
    if (session?.user?.role === 'teacher') {
      // Simulate higher numbers for the teacher's students
      const studentStrugglingWords = [
        { word: 'procrastinate', timesStruggled: 120 },
        { word: 'perseverance', timesStruggled: 83 },
        { word: 'elucidate', timesStruggled: 91 },
        { word: 'facetious', timesStruggled: 72 },
        { word: 'magnanimous', timesStruggled: 113 },
      ];
      setStrugglingWords(studentStrugglingWords);
    } else {
      // Default struggling words for the student
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
        <h2 className="text-lg font-bold">Words my students' struggle with:</h2>
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
    </section>
  );
}

export default Home;
