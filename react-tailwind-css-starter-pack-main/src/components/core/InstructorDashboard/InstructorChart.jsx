import React, { useState } from 'react'
import {Chart,registerables} from 'chart.js'
import {Pie} from 'react-chartjs-2'

Chart.register(...registerables);
const InstructorChart = ({courses}) => {
    const [currentChart,setCurrentChart] = useState("students");

    //function will generate random colors
    const getRandomColors=(numColors)=>{
        const colors=[];
        for(let i=0;i<numColors;i++){
            const color = `rgb(${Math.floor(Math.random()*256)},
                               ${Math.floor(Math.random()*256)},
                               ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create a data for the chart for displaying student info
    const chartDataForStudent = {
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalStudentsEnrolled),
                backgroundcolor:getRandomColors(courses.length)
            }
        ]
    }

    //create data for a chart to display Income

    const chartDataForIncome = {
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalAmountGenerated),
                backgroundcolor:getRandomColors(courses.length)
            }
        ]
    }

    const options={

    }


  return (
    <div>
        <p>Visualize</p>
        <div>
            <button onClick={()=>setCurrentChart('students')}>Student</button>
            <button onClick={()=>setCurrentChart('income')}>Income</button>
        </div>
        <div>
            <Pie
                data={currentChart === 'students'?chartDataForStudent:chartDataForIncome}
                options={options}
            />
        </div>
    </div>
  )
}

export default InstructorChart