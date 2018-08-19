import React from 'react';

import './DisplayTask.css';

const displayTask = props => {
    return(
        <div>
        {
                props.task.map((task, index) => {
                        return(
                            <div key={task.task_id} className="showTask">
                                <p className="task">
                                    <span className="task_inner">{index+1}. Title - </span> 
                                    {task.task} 
                                    <br />
                                    <span className="task_inner">&nbsp;&nbsp;&nbsp;&nbsp;Description - </span>
                                    <span className="normalText">{task.des}</span>
                                </p>
                                <button onClick={() => {props.edit_Task(task.task_id)}} className="edit">Edit</button>
                                <button onClick={() => {props.del_Task(task.task_id)}} className="remove">Remove</button>
                                <hr />
                            </div>
                        )
                })
        }    
        </div>        
    );
}

export default displayTask;


