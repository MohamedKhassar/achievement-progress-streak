import { Flame, Loader2 } from 'lucide-react'
import React from 'react'

const StreakCircleProgressbar = ({ streak, loading = false }) => {
    return (
        <article className='mx-auto'>
            <div className='text-center mb-4'>
                <h1 className='text-3xl text-amber-700 font-extrabold'>Streak</h1>
                <p className='text-gray-500'>{streak > 0 ? "You are discipline, you didn't give up!" : "Keep going, you're doing great!"}</p>
            </div>
            <div className='bg-amber-600/60 rounded-full aspect-square p-4 w-80 mx-auto'>
                <div className='bg-amber-600 rounded-full aspect-square flex items-center justify-center text-8xl font-bold  text-amber-200'>
                    {loading ? <Loader2 className='animate-spin size-15' /> :
                        <>
                            <p>{streak}</p>
                            <Flame className='size-20' />
                        </>
                    }
                </div>
            </div>
        </article>
    )
}

export default StreakCircleProgressbar