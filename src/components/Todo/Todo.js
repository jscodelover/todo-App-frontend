import React, { Component } from 'react';
import axios from 'axios';
import Spinner from './Spinner/Spinner';
import rn from 'random-number';

import './Todo.css';
import TaskInput from './TaskInput/TaskInput';
import DisplayTask from './DisplayTask/DisplayTask';

class Todo extends Component{
  constructor(props){
    super(props);
    this.state = {
      hours : '',
      minutes : '',
      task : '',
      des : '',
      error : false,
      allTask : [],
      loading : false,
      addTask_btn : true,
      editTask_btn : false,
      task_id : '',
      error_msg : ''
    }
  }

  setRemainder(time, task){
    console.log(time,task)
    setTimeout(() => {
        alert(task);
    },time*60*1000);
  }
  
  getAllTask() {
    this.setState({loading : true})
    axios.get('http://localhost:5000/getTask')
      .then(response => {
          let result = [...response.data];
          this.setState({allTask : result, loading : false});
          if(result.length > 0){
              result.forEach(taskInfo => {
                  if(taskInfo.hours || taskInfo.minutes)
                  {
                      let date = new Date();
                      let hours = taskInfo.hours ? +taskInfo.hours : 0;
                      let minutes = taskInfo.minutes ? +taskInfo.minutes : 0;
                      let time = Math.abs(hours-date.getHours())*60 + Math.abs(minutes-date.getMinutes());
                      this.setRemainder(time, taskInfo.task);
                  }
              })
          }    
      })
      .catch(error => {
        this.setState({loading : false})
        alert(error);
    });
  }

  clearTaskData(){
      this.setState({
                      task : '',
                      des : '',
                      hours : '',
                      minutes : ''
                    });

  }

  changeToAddTask(){
      this.setState({
                      addTask_btn : true,
                      editTask_btn : false,
                    });
      this.clearTaskData();
  }

  componentDidMount(){
    this.getAllTask();    
  }

  addTask = () => {
    if(this.state.task !== '' && this.state.des !== '')
    {

        this.state.error ? this.setState({error : false}) : null;
        
        this.clearTaskData();

        let OTP_gen = rn.generator({
          min:  1000,
          max:  9999,
          integer: true
        });
        
        this.setState({loading : true})
        axios.post('http://localhost:5000/addTask', {
            task_id : OTP_gen(),
            task : this.state.task,
            des : this.state.des,
            hours : this.state.hours,
            minutes : this.state.minutes
        })
        .then(response => {
            console.log(response.data);
            this.getAllTask();
        })
        .catch(error => {
          this.setState({loading : false})
          alert(error);
        });
    }   
    else
    {
        this.setState({error : true, error_msg : 'Fill the Field(s) that is/are missing !!!'})
    } 
  }

  editTask = index => {
      var pos = this.state.allTask.findIndex(task => index === task.task_id);
      let getTaskInfo = this.state.allTask[pos];

      this.setState({
                      task : getTaskInfo.task,
                      des : getTaskInfo.des,
                      hours : getTaskInfo.hours,
                      minutes : getTaskInfo.minutes,
                      addTask_btn : false,
                      editTask_btn : true,
                      task_id : pos
                    });
      
      console.log(`Edit Task : ${index}, put data in form for editing and update database `);
  }

  send_EditedTask = () => {

      this.state.error ? this.setState({error : false}) : null;

      let edited_task_data = {};
      let getTaskInfo = this.state.allTask[this.state.task_id];

      let keys = ['task', 'des', 'hours', 'minutes'];
      let todo_state = {...this.state};

      console.log(todo_state)
      console.log(getTaskInfo)

      for(let key of keys)
      {
          console.log("in for loop")
          if(todo_state[key] !== getTaskInfo[key]){
            console.log(`${todo_state[key]} !== ${getTaskInfo[key]}`)
            edited_task_data[key]=todo_state[key];
          }
      }
      
      console.log(edited_task_data)
      if(Object.keys(edited_task_data).length === 0 )
      {
          this.setState({error : true, error_msg : "No field is edited !!"});
      }
      else{
          edited_task_data['task_id'] = getTaskInfo['task_id'];
          this.setState({loading : true})
          axios.post('http://localhost:5000/updateTask', edited_task_data)
          .then(response => {
              console.log(response.data);

              this.changeToAddTask();
              
              this.getAllTask();
          })
          .catch(error => {
            this.setState({loading : false})
            alert(error);
          });  
      }

  }

  cancel_EditTask = () => {
      this.state.error ? this.setState({error : false}) : null;
      this.changeToAddTask();
  }

  delTask = index => {
     this.setState({loading : true})
      
     axios.post('http://localhost:5000/delTask', {
            task_id : index,
        })
        .then(response => {
            console.log(response.data);

            this.changeToAddTask();
            
            this.getAllTask();
        })
        .catch(error => {
          this.setState({loading : true})
          alert(error);
        });
      console.log(`Remove Task : ${index} and remove from database`);
  }

  getTask = e => {
    this.setState({task : e.target.value});  
  }

  getDes = e => {
    this.setState({des : e.target.value})
  }

  taskTime = (e, completedTime) => {

    if(completedTime === 'hours'){
      this.setState({ hours : e.target.value});  
    }
    else{
          this.setState({minutes : e.target.value});
      }
  }

  render(){
    return(
      <div className="todo-form">
        {
          this.state.error ? <h3>{this.state.error_msg}</h3> : null 
        }   
        {
          this.state.loading ? <Spinner /> : null
        }
        <DisplayTask task={this.state.allTask} 
                     edit_Task={this.editTask} 
                     del_Task={this.delTask} 
        />
                 
        <TaskInput task={this.state.task} get_Task={this.getTask}
                   des={this.state.des} get_Des={this.getDes}
                   hours={this.state.hours} task_time={this.taskTime}
                   minutes={this.state.minutes}
                   add_Task={this.addTask} show_addtask={this.state.addTask_btn} 
                   send_Edited_Task={this.send_EditedTask} cancel_edit={this.cancel_EditTask} 
                   show_edittask={this.state.editTask_btn} 
        />
      </div>
    );
  }
}

export default Todo;  






