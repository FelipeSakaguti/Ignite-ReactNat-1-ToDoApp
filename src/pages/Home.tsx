import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    const taskWithSameTitle = tasks.find(item => item.title === newTaskTitle )

    if (taskWithSameTitle){
      return Alert.alert("Task já cadastrada","Você não pode cadastrar uma task com o mesmo nome");
    }

    setTasks(oldState => [ ...oldState, data ])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}))

    const foundItem = updatedTasks.find(item => item.id === id )

    if (!foundItem)
      return;
    
    foundItem.done = !foundItem.done

    setTasks(updatedTasks)
    
  }

  function handleRemoveTask(id: number) {

    // const updatedTasks = tasks.filter(task => task.id !== id )

    // setTasks(updatedTasks)

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => {
            setTasks(oldState => oldState.filter(
              task => task.id !== id
            ))
          }
        },
        {
          text: "Nao"
        }
      ]
    )

  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs){
    const updatedTasks = tasks.map(task => ({...task}))

    const taskToBeUpdated = updatedTasks.find(item => item.id === taskId )

    if (!taskToBeUpdated)
      return;
    
    taskToBeUpdated.title = taskNewTitle

    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})