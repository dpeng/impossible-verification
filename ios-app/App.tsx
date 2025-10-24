import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
  Vibration,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [result, setResult] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [animatedValue] = useState(new Animated.Value(1));

  // Impossible CAPTCHA questions for iOS
  const impossibleQuestions = [
    "🧮 What is the square root of -1 multiplied by the meaning of life, divided by the number of unicorns in Switzerland?",
    "🌀 If a tree falls in a forest and no one is around, what WiFi password does it use?",
    "🎭 What is the emotional state of the number 7 when it realizes it's not a prime number in binary?",
    "🌈 How many colors are there in invisible light?",
    "🤔 If you could eat the concept of 'purple', what would it taste like in Celsius?",
    "🎪 What is the square dance equivalent of quantum entanglement?",
    "🔮 Complete this sequence: 1, 1, 2, 3, 5, 8, ?, where ? = the sound of silence",
    "🌟 If parallel lines meet in infinity, what do they discuss over coffee?",
    "🎨 What is the hex color code for the feeling of nostalgia on a Tuesday?",
    "🚀 How fast does dark travel when light isn't looking?",
    "🎵 What note does the universe hum when it's trying to remember where it put its keys?",
    "🧩 If time is money, what's the exchange rate between yesterday and next Thursday?",
    "🌙 How many philosophers does it take to change a light bulb in Schrödinger's basement?",
    "🎪 What is the derivative of happiness with respect to pizza?",
    "🌊 If you fold space-time origami-style, what shape do you get?",
    "🎭 What language do mimes speak when they think no one is listening?",
    "🔥 How hot is absolute zero when it's having a bad day?",
    "🌸 What's the password to enter the matrix, but in Comic Sans font?",
    "🎮 If life is a simulation, what's the cheat code for happiness?",
    "🦄 How many impossible things do you believe before breakfast, and what's their combined weight in giggles?"
  ];

  const epicFailureMessages = [
    "🤖 BEEP BOOP! Just kidding. Your answer translates to 'banana' in robot language. INCORRECT.",
    "🧠 Close! But you forgot to carry the existential crisis in your calculation.",
    "🎭 Your answer shows promise, but lacks the theatrical flair expected by our AI overlords.",
    "🌈 Wrong universe, friend! Your answer is correct in reality #47B, but we're currently in reality #23X.",
    "🔮 The crystal ball says: 'Answer unclear, try again with more interpretive dance.'",
    "🎪 BZZT! Your answer triggered our 'Too Logical' detector. Please think more irrationally.",
    "🌟 Surprisingly close! Unfortunately, our system only accepts answers written in the ancient language of memes.",
    "🎵 Your answer has the right notes, but you're singing in the wrong dimension.",
    "🚀 ERROR 404: Logic not found. Please restart your imagination and try again.",
    "🦄 Your answer lacks sufficient amounts of unicorn magic. Recommendation: Add more sparkles.",
    "🎨 Creative! But our AI art critic rated your answer 'Needs more cowbell/10'.",
    "🌙 Incorrect! The answer was obviously 'potato', but only on Wednesdays during a lunar eclipse.",
    "🎪 So close! You're thinking like a human, but we need you to think like a caffeinated squirrel.",
    "🔥 Your answer is fire! Literally. It set our servers ablaze. Please think cooler thoughts.",
    "🎮 GAME OVER! Insert 25¢ of existential dread to continue.",
    "🌊 Your answer created ripples in the space-time continuum. Our insurance doesn't cover that.",
    "🎭 Plot twist! There was never a correct answer. This is actually a test of your capacity for confusion.",
    "🦋 Your answer caused a butterfly effect that changed the outcome of a chess game in 1987. REJECTED."
  ];

  useEffect(() => {
    generateNewQuestion();
    startAnimation();
  }, []);

  const generateNewQuestion = () => {
    const randomQuestion = impossibleQuestions[Math.floor(Math.random() * impossibleQuestions.length)];
    setCaptchaQuestion(randomQuestion);
    setCaptchaAnswer('');
    setResult('');
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const verifyCaptcha = () => {
    if (!captchaAnswer.trim()) {
      Alert.alert('Hold Up!', 'Please enter an answer (any answer will do... spoiler: it won\'t work anyway) 😏');
      return;
    }

    // Haptic feedback for dramatic effect
    Vibration.vibrate([100, 50, 100]);

    setAttempts(attempts + 1);
    
    // Show loading state
    setResult('🔍 Analyzing answer through interdimensional philosophical matrix...');
    
    setTimeout(() => {
      const randomFailure = epicFailureMessages[Math.floor(Math.random() * epicFailureMessages.length)];
      setResult(randomFailure);
      
      // Generate new question after a delay
      setTimeout(() => {
        generateNewQuestion();
      }, 3000);
    }, 2000);
  };

  const shakeAnimation = {
    0: { transform: [{ translateX: 0 }] },
    0.25: { transform: [{ translateX: -10 }] },
    0.75: { transform: [{ translateX: 10 }] },
    1: { transform: [{ translateX: 0 }] },
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.header, { transform: [{ scale: animatedValue }] }]}>
          <Animatable.Text
            animation="bounce"
            iterationCount="infinite"
            style={styles.title}
          >
            🤖👤🔍 ULTIMATE HUMAN VERIFICATION 🔍👤🤖
          </Animatable.Text>
          
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            style={styles.warningBanner}
          >
            <Text style={styles.warningText}>
              ⚠️ ROBOTS DETECTED IN THE VICINITY ⚠️
            </Text>
          </Animatable.View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              🚨 <Text style={styles.bold}>CRITICAL SECURITY ALERT!</Text> 🚨{'\n'}
              Our advanced AI has detected suspicious bot-like activity! To proceed, you must prove your humanity 
              by solving this <Text style={styles.italic}>completely reasonable</Text> and <Text style={styles.italic}>totally solvable</Text> verification challenge.
              {'\n\n'}
              <Animatable.Text 
                animation="flash" 
                iterationCount="infinite" 
                style={styles.difficultyLevel}
              >
                ⭐ DIFFICULTY LEVEL: IMPOSSIBLE ⭐
              </Animatable.Text>
            </Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.captchaContainer}>
        <Animatable.View 
          animation="fadeIn" 
          style={styles.questionContainer}
        >
          <Text style={styles.questionText}>{captchaQuestion}</Text>
        </Animatable.View>

        <TextInput
          style={styles.answerInput}
          value={captchaAnswer}
          onChangeText={setCaptchaAnswer}
          placeholder="Type your answer here (good luck, human)"
          placeholderTextColor="#999"
          multiline
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.verifyButton} onPress={verifyCaptcha}>
            <LinearGradient
              colors={['#00b894', '#00cec9']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>🧠 VERIFY MY HUMANITY 🧠</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.refreshButton} onPress={generateNewQuestion}>
            <LinearGradient
              colors={['#fd79a8', '#e84393']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>🔄 NEW IMPOSSIBLE QUESTION 🔄</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {result !== '' && (
          <Animatable.View 
            animation={result.includes('Analyzing') ? 'pulse' : shakeAnimation}
            style={styles.resultContainer}
          >
            <Text style={styles.resultText}>{result}</Text>
          </Animatable.View>
        )}

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            🎯 Attempts Made: {attempts} | Success Rate: 0% (As Expected!)
          </Text>
        </View>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 HELPFUL HINTS FOR HUMANS:</Text>
        <Text style={styles.tipItem}>🤔 Think with your heart, not your mind</Text>
        <Text style={styles.tipItem}>🌟 The answer exists in a parallel dimension</Text>
        <Text style={styles.tipItem}>🔮 Consult your local fortune teller</Text>
        <Text style={styles.tipItem}>🎭 Remember: logic is just a social construct</Text>
        <Text style={styles.tipItem}>🌈 Try answering in the color purple</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerGradient: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  warningBanner: {
    backgroundColor: '#ff4757',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  warningText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#ff6b6b',
    borderStyle: 'dashed',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2d3436',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  difficultyLevel: {
    fontWeight: 'bold',
    color: '#ff4757',
    fontSize: 18,
  },
  captchaContainer: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 4,
    borderColor: '#4ecdc4',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  questionContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4ecdc4',
    marginBottom: 20,
    minHeight: 100,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    textAlign: 'center',
    fontFamily: 'Courier',
  },
  answerInput: {
    borderWidth: 3,
    borderColor: '#4ecdc4',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    minHeight: 60,
  },
  buttonContainer: {
    gap: 15,
  },
  verifyButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  refreshButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#ff7675',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#d63031',
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#74b9ff',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  statsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tipsContainer: {
    margin: 20,
    backgroundColor: '#ffeaa7',
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    borderColor: '#e17055',
    borderStyle: 'dashed',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d63031',
    textAlign: 'center',
    marginBottom: 15,
  },
  tipItem: {
    fontSize: 16,
    color: '#2d3436',
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#e17055',
  },
});

export default App;