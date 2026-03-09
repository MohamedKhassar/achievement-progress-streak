import axios from 'axios';
import React from 'react'

const ResetConfirmation = ({ setUserData, setShowResetConfirmation }) => {
    const handleReset = async() => {
        try {
            setUserData(prev => ({ ...prev, achievedDays: 0, totalDays: undefined, streak: 0 }));
            setShowResetConfirmation(false);
            await axios.put("https://achievement-progress-streak-json-server.onrender.com/achievement", { userData:{achievedDays: 0, totalDays: undefined, streak: 0,name:"Mohamed"} })
        } catch (error) {
            console.error("Error resetting progress:", error);
        }
    }
    return (
        <section className='absolute inset-0 bg-black/50 flex items-center' >
            <div className='bg-slate-800 p-6 rounded-lg shadow-lg mx-auto my-20 w-100'>
                <h2 className='text-xl font-bold mb-4'>Reset Progress</h2>
                <p className='mb-4'>Are you sure you want to reset your progress? This action cannot be undone.</p>
                <div className='flex justify-end gap-4'>
                    <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl' onClick={() => setShowResetConfirmation(false)}>
                        Cancel
                    </button>
                    <button className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl' onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ResetConfirmation