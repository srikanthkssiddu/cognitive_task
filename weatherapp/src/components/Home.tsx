import React,{ FC, useState, FormEvent } from 'react';
import { useNavigation } from '@react-navigation/native';
import {  TextInput } from 'react-native';
import { Button, StyleSheet, Text, View } from 'react-native';





export const Home: React.FC = () => {
    const [countryName, setCountryName] = useState('');
    const navigation = useNavigation();

const getCuntryName = async(e: FormEvent) => {
    e.preventDefault();
    navigation(`/details/${countryName}`);
};

return (
    <View style={styles.container}>
        
            <Text style={styles.greeting}>Weather App</Text>
            <TextInput style={styles1.input}
                id="outlined-basic"
                fullWidth
                value={countryName}
                placeholder="Enter country Name"
                variant="outlined"
                data-testid="inputbox-test-id"
                onChange={(e) => setCountryName(e.target.value)}
                
                 
                 
            />
        <View>
        <Button size="medium" variant="contained" data-testid="button-testid" disabled={countryName===''} onClick={getCuntryName}
            title = "Submit">
        </Button>
        </View>
        
    </View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    greeting: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 16
    }
  });
  const styles1 = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

