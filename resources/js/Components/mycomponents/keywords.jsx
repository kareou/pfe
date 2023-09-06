import React from 'react'
import { Link } from '@inertiajs/react'

function keywords({keyword,type}) {

  return (
    <div>
        <h1>Keywords</h1>
        <div className='flex flex-wrap gap-1'>
            {keyword.map((keywo) => (
                <Link href={`/shows/${keywo.id}-${type}-${keywo.name}`}
                 key={keywo.id} className='bg-my_gray h-6 text-my_white text-sm font-bold p-2 rounded inline-flex items-center'>
                    <span className='mr-1'>{keywo.name}</span>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default keywords
