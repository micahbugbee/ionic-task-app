// @ts-nocheck
import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import TaskList from '../components/TaskList';
import TaskContext from '../contexts/TaskContext';
import { useDialog } from '../hooks/useDialog';
import { useContext } from 'react';

const Home: React.FC = () => {
  const { addTask } = useContext(TaskContext);
  const { showPrompt } = useDialog();

  const prompt = async () => {
    showPrompt('New Task', 'Task Title')
    .then(task => {
      if (!task) {
        return;
      }
      addTask({title: task, completed: false})
      .catch(error => console.log(error))
    })
  }

  return (
    <IonPage>
      <IonHeader className='task-header'>
        <IonToolbar color='primary'>
          <IonTitle>Task List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TaskList />
        <IonButton onClick={prompt} class='ion-float-right' shape='round'>
              <IonIcon slot='' icon={addOutline} size='large'></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
