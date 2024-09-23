import RenderSteps from "./RenderSteps"

export default function AddCourse(){
    return (
        <div>
            <div>
                <div>
                    <h1>Add Course</h1>
                    <div>
                        <RenderSteps/>
                    </div>
                </div>

                <div>
                    <p>Code Upload Tips</p>

                    <ul>
                        <li>Set the course price option or make it free</li>
                        <li>Standard size of the thumbnail is 1024 x 576</li>
                        <li>Video Section controls the course overview video</li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}