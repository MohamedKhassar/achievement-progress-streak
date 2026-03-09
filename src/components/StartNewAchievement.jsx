import axios from 'axios';
import React, { useState } from 'react'

const StartNewAchievement = () => {
    const [totalDays, setTotalDays] = useState(1);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("https://achievement-progress-streak-json-server.onrender.com/achievement", {
                userData: {
                    totalDays, achievedDays: 0, streak: 0, name: "Mohamed",
                    // lastCheckIn: new Date().toISOString().split("T")[0],

                }
            })
        } catch (error) {
            console.error("Error starting new achievement:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <section className='bg-slate-800 p-6 rounded-lg shadow-lg mx-auto my-20 w-100'>
                <h2 className='text-xl font-bold mb-4'>Start New Achievement</h2>
                <div className='grid gap-3'>
                    <label htmlFor="totalDays" className='font-semibold'>Total Days:</label>
                    <input type="number" id="totalDays" min={1} value={totalDays} onChange={(e) => setTotalDays(Number(e.target.value))} name="totalDays" className='bg-slate-500/30 py-2 px-4 rounded-lg outline-none invalid:bg-red-400/30 invalid:text-red-400' placeholder='Enter total days' required />
                </div>
                <button type='submit' className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 w-full rounded-xl mt-6'>
                    Start
                </button>
            </section>
        </form>
    )
}

export default StartNewAchievement