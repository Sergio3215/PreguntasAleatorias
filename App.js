import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react'
import { Button, Dialog, Portal, PaperProvider, Text, TextInput} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => {
    setVisible(false);
    setAnswer(false);
  }

  const showAnswer = () => {
    const _answer = !answer;
    setAnswer(_answer);
  }

  // useEffect(() => {

  // }, []);

  const getQuestion = async () => {
    const ftch = await fetch("https://preguntas-aleartorias.vercel.app/api/preguntas");
    const result = await ftch.json();
    const numberData = result.data.length - 1;
    const numberRandom = Math.floor(Math.random() * numberData);
    setQuestion(await result.data[numberRandom]);
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Bienvenido a Pregunta Aleatoria!</Text>
        <Button style={styles.button} mode="elevated" onPress={() => {
          showDialog();
          getQuestion();
        }} >Comenzar</Button>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title >Pregunta Aleatoria</Dialog.Title>
            <Dialog.Content>
              <Text variant="titleLarge">{question.pregunta}</Text>
            </Dialog.Content>
            <Dialog.Actions style={styles.actions}>
              <Button mode='contained' onPress={() => showAnswer()}>Mostrar Mensaje</Button>
              {
                (!answer) ?
                  <TextInput style={styles.input} textContentType='password' value='********' disabled />
                  :
                  <Text variant="titleLarge">{question.respuesta}</Text>
              }
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    top: 325
  },
  text: {
    color: 'black',
    fontSize:25
  },
  button: {
    width: '50%',
    background:'linear-gradient(185deg, rgba(223,16,16,1) 0%, rgba(203,212,3,1) 50%, rgba(248,0,255,1) 100%)',
    color: 'white'
  },
  input:{
    backgroundColor:'transparent',
    borderWidth:0
  },
  actions:{
    display:'flex',
    flexDirection: 'column'
  }
});
