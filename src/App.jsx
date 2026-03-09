import React, { useEffect, useState } from 'react'
import './App.css'
import CircleProgressbar from './components/CircleProgressbar'
import StreakCircleProgressbar from './components/StreakCircleProgressbar'
import axios from 'axios'
import { RefreshCcw } from 'lucide-react'
import ResetConfirmation from './UI/ResetConfirmation'
import StartNewAchievement from './components/StartNewAchievement'
const App = () => {
  const [userData, setUserData] = useState({
    name: "",
  })
  const [loading, setLoading] = useState(true)
  const [showResetConfirmation, setShowResetConfirmation] = useState(false)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const res = await axios.get("https://achievement-progress-streak-json-server.onrender.com/achievement")
        setUserData(res.data.userData)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page refresh
    if (userData.lastCheckIn === new Date().toISOString().split("T")[0]) return; // prevent multiple check-ins in the same day
    const updatedData = {
      totalDays: userData.totalDays,
      achievedDays: userData.achievedDays + 1,
      streak: userData.streak,
      lastCheckIn: new Date().toISOString().split("T")[0],
      name: "Mohamed"
    };

    try {
      await axios.put("http://localhost:8080/achievement", {
        userData: updatedData
      });

      // update React state so UI updates without reload
      setUserData(updatedData);

    } catch (error) {
      console.error("Error updating achievement:", error);
    }
  };

  useEffect(() => {
    const handleStreak = async () => {
      const today = new Date();
      const lastCheck = new Date(userData.lastCheckIn);

      const diffTime = today - lastCheck;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let newStreak = userData.streak;

      if (diffDays === 1) {
        newStreak += 1; // continue streak
      } else if (diffDays > 1) {
        newStreak = 0; // reset streak
      } else {
        return; // already checked today
      }

      const updatedData = {
        ...userData,
        streak: newStreak,
        lastCheckIn: today.toISOString().split("T")[0]
      };

      await axios.patch("http://localhost:8080/achievement", {
        userData: updatedData
      });

      setUserData(updatedData);
      console.log(userData)
    }
    handleStreak()
  }, [userData])
  return (
    <main className='max-w-7xl mx-auto'>
      <article className='py-20'>
        <h1 className='text-3xl font-bold text-center'>Welcome back {userData.name}</h1>
      </article>
      {(userData.totalDays == undefined && !loading) ?
        <StartNewAchievement />
        :
        <>
          <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20'>
            <CircleProgressbar loading={loading} achievedDays={userData.achievedDays} totalDays={userData.totalDays} />
            <StreakCircleProgressbar loading={loading} streak={userData.streak} />
          </section>
          <section className='mx-auto grid grid-cols-2 mt-10 place-items-end-safe'>
            {
              (userData.achievedDays !== userData.totalDays) &&
                (userData.lastCheckIn !== new Date().toISOString().split("T")[0]) ?

                <button
                  onClick={handleSubmit}
                  className='text-center outline-none bg-slate-600 hover:bg-slate-700 text-white font-bold cursor-pointer py-3 px-6 rounded-xl text-2xl'
                >
                  Check In
                </button>

                :

                <p className='bg-yellow-300 text-yellow-800 px-5 py-2 rounded-2xl '>You've already checked in today.</p>
            }
            <button className='text-center outline-none bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer py-3 px-6 rounded-xl text-2xl flex items-center justify-center gap-2' onClick={() => setShowResetConfirmation(true)}>
              Reset
              <RefreshCcw />
            </button>
          </section>
          {showResetConfirmation && <ResetConfirmation setShowResetConfirmation={setShowResetConfirmation} setUserData={setUserData} />}
        </>
      }
    </main >
  )
}

export default App