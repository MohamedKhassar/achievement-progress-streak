import { Loader, Loader2 } from 'lucide-react'
import React from 'react'
import { cn } from '../cn'

const CircleProgressbar = ({achievedDays, totalDays,loading=false}) => {
  const progress = (achievedDays/totalDays)*100
  return (
    <article className='mx-auto'>
      <div className='text-center mb-4 '>
        <h1 className='text-3xl text-amber-700 font-extrabold'>
          Achievements Progress
        </h1>
        <p className='text-gray-500'>
          {progress<=50?"You haven't completed your achievements yet.":progress<=99?'You\'re making good progress!':progress==100?"You've completed all achievements!":"bg-slate-600"}
        </p>
      </div>
      <div className={cn('rounded-full aspect-square p-4 w-80 mx-auto',
        progress<=50?'bg-red-500/70':progress<=75?'bg-yellow-500/70':progress<=100?"bg-green-600/70":"bg-slate-600/70"
      )}>
        <div className={cn('transition-colors duration-300 rounded-full aspect-square flex items-center justify-center text-5xl font-bold text-white',
          progress<=50?'bg-red-500':progress<=75?'bg-yellow-500':progress<=100?"bg-green-600":"bg-slate-600"
        )}>
          {loading?<Loader2 className='animate-spin size-15' />:`${achievedDays}/${totalDays}`}
        </div>
      </div>
    </article>
  )
}

export default CircleProgressbar