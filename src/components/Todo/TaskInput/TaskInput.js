import React from 'react';

import './TaskInput.css';
import SelectOption from '../SelectOption/SelectOption';
import Button from './Button/Button';

const taskInput = props => {
    return (
        <div>
            <div className="group">
                <label className="label">Task Title :</label>
                <input type="text" className="inputTask" value={props.task} onChange={e => {props.get_Task(e)}}/>
            </div>
            <div className="group">
                <label className="label">Task Description :</label>
                <textarea className="inputDes" value={props.des} onChange={e => {props.get_Des(e)}} />
            </div>
            <div className="group">
                <label className="label">Remainder :</label>
                <select value={props.hours} onChange={e => {props.task_time(e,'hours')}}>  
                    <option value=''>-- Hours --</option>
                    <SelectOption option={['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']}/> 
                </select>
                <select value={props.minutes} onChange={e => {props.task_time(e,'minutes')}}>
                    <option value=''>-- Minutes --</option>
                    <SelectOption option={['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59']} />
                </select> 
            </div>
            {
                props.show_addtask ? <Button func={props.add_Task} btnName={"Add Task"} /> : null
            }
            {   
                props.show_edittask ? 
                        <div className="editBtns">
                            <Button func={props.send_Edited_Task} btnName={"Edit Task"} />
                            <Button func={props.cancel_edit} btnName={"Cancel"} />
                        </div>    
                   : 
                        null
            }
        </div>    
    );
}

export default taskInput;