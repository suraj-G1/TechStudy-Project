import React from 'react'
const statsData = [
    {count:"5k+",label:"Active Students"},
    {count:"10+",label:"Mentors"},
    {count:"200+",label:"Courses"},
    {count:"50+",label:"Awards"},

]
const Stats = () => {
  return (
    <div>
        {
            statsData.map((data,index)=>{
                <div key={index}>
                    <h1>{data.count}</h1>
                    <p>{data.label}</p>
                </div>
            })
        }
    </div>
  )
}

export default Stats