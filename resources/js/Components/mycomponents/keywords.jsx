import React from 'react'

function keywords({keyword}) {


  return (
    <div>
        <h1>Keywords</h1>
        <div className='flex flex-wrap gap-1'>
            {keyword.map((keywo) => (
                <button key={keywo.id} className='bg-my_gray h-6 text-my_white text-sm font-bold p-2 rounded inline-flex items-center'>
                    <span className='mr-1'>{keywo.name}</span>
                </button>
            ))}
        </div>
    </div>
  )
}

export default keywords
