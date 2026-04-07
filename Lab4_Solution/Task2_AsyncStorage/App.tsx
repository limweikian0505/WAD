import { View, Alert, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import {
  InputWithLabel,
  PickerWithLabel,
  SwitchWithLabel,
  AppButton,
} from './UI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [educationLevel, setEducationLevel] = useState('01');
  const [gender, setGender] = useState('01');
  const [receivePromos, setReceivePromos] = useState(false);

  // Options
  const EducationLevel = [
    { key: '01', value: 'High School' },
    { key: '02', value: 'Undergraduate' },
    { key: '03', value: 'Postgraduate' },
  ];

  const Gender = [
    { key: '01', value: 'Male' },
    { key: '02', value: 'Female' },
  ];

  // Load settings on mount
  useEffect(() => {
    _loadSettings();
  }, []);

  // Save all settings as one JSON object
  const _saveSettings = async () => {
    try {
      const settings = {
        name,
        email,
        educationLevel,
        gender,
        receivePromos,
      };
      await AsyncStorage.setItem('@settings', JSON.stringify(settings));
      Alert.alert('Settings saved!');
    } catch (e) {
      console.error('Saving error:', e);
    }
  };

  // Load settings
  const _loadSettings = async () => {
    try {
      const data = await AsyncStorage.getItem('@settings');
      if (data) {
        const settings = JSON.parse(data);
        setName(settings.name || '');
        setEmail(settings.email || '');
        setEducationLevel(settings.educationLevel || '01');
        setGender(settings.gender || '01');
        setReceivePromos(settings.receivePromos ?? false);
      }
    } catch (e) {
      console.error('Loading error:', e);
    }
  };

  // Reset settings
  const _resetSettings = () => {
    setName('');
    setEmail('');
    setEducationLevel('01');
    setGender('01');
    setReceivePromos(false);
  };

  return (
    <View>
      <InputWithLabel
        label="Name"
        placeholder="Enter your name"
        onChangeText={(text: string) => setName(text)}
        value={name}
      />
      <InputWithLabel
        label="Email"
        placeholder="Enter your email, i.e. xxx@gmail.com"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />
      <PickerWithLabel
        label="Gender"
        items={Gender}
        selectedValue={gender}
        onValueChange={value => setGender(value)}
      />
      <PickerWithLabel
        label="Education Level"
        items={EducationLevel}
        selectedValue={educationLevel}
        onValueChange={value => setEducationLevel(value)}
      />
      <SwitchWithLabel
        label="Receive Promotional Emails"
        value={receivePromos}
        onValueChange={(value: boolean) => setReceivePromos(value)}
      />
      <AppButton
        title="Save Settings"
        theme="primary"
        onPress={_saveSettings}
      />
      <Pressable
        onPress={() =>
          Alert.alert(
            'Reset Settings',
            'Are you sure you want to reset settings?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'OK', onPress: _resetSettings },
            ]
          )
        }
      >
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: '#a2abab' }}>RESET</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default App;