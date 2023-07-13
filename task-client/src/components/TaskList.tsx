// @ts-nocheck
import React, { useContext } from 'react';
import TaskContext from '../contexts/TaskContext';
import { IonCheckbox, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader } from '@ionic/react';
import { trash } from 'ionicons/icons';
import '../styles/TaskList.css'

const TaskList: React.FC = () => {
    let { deleteTask, editTask } = useContext(TaskContext);

    const taskComplete = (task) => {
        editTask(task.id, {title: task.title, completed: true})
        .catch(error => console.log(error));
    }

    const taskIncomplete = (task) => {
        editTask(task.id, {title: task.title, completed: false})
        .catch(error => console.log(error));
    }

    const slideDelete = (id) => {
        deleteTask(id)
        .catch(error => console.log(error));
    }

    return (
    <div className='test'>
        <TaskContext.Consumer>
            {({tasks}) => {
                return (
                    <IonList>
                        <IonListHeader color='medium'>
                            <IonLabel className='task-label' color='light'>
                                Incomplete
                            </IonLabel>
                        </IonListHeader>
                        {tasks.map(task => {
                            if (!task.completed) {
                                return (
                                    <IonItemSliding key={task.id}>
                                        <IonItem>
                                            <IonLabel>{task.title}</IonLabel>
                                            <IonCheckbox onIonChange={() => taskComplete(task)} aria-label='Label' slot='end'></IonCheckbox>
                                        </IonItem>
                                        <IonItemOptions side='end'>
                                            <IonItemOption onClick={() => slideDelete(task.id)} color='danger'>
                                            <IonIcon slot='icon-only' icon={trash}></IonIcon>
                                            </IonItemOption>
                                        </IonItemOptions>
                                    </IonItemSliding>
                                )
                            }
                        })}
                    </IonList>
                )
            }}
        </TaskContext.Consumer>
        <TaskContext.Consumer>
                {({tasks}) => {
                    return (
                        <IonList>
                            <IonListHeader color='success'>
                                <IonLabel className='task-label' color='light'>
                                    Complete
                                </IonLabel>
                            </IonListHeader>
                            {tasks.map(task => {
                                if (task.completed) {
                                    return (
                                        <IonItemSliding key={task._id}>
                                            <IonItem>
                                                <IonLabel>{task.title}</IonLabel>
                                                <IonCheckbox onIonChange={() => taskIncomplete(task)} aria-label='Label' slot='end' checked={true}></IonCheckbox>
                                            </IonItem>
                                            <IonItemOptions side='end'>
                                                <IonItemOption color='danger' onClick={() => slideDelete(task.id)}>
                                                <IonIcon slot='icon-only' icon={trash}></IonIcon>
                                                </IonItemOption>
                                            </IonItemOptions>
                                        </IonItemSliding>
                                    )
                                }
                            })}
                        </IonList>
                    )
                }}
            </TaskContext.Consumer>
    </div>
    );
  };
  
  export default TaskList;
