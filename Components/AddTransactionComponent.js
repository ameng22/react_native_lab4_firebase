import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './Styles';
import firebase from './FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AddTransactionComponent = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [loc, setLoc] = useState('');

  const addTransaction = async () => {
    try {
      const transactionRef = collection(firebase, 'transactions');
      await addDoc(transactionRef, {
        name,
        amount,
        date,
        loc
      });
      console.log("Adding transaction with data:", { name, amount, date, loc });
      Alert.alert('Success', 'Transaction added successfully');
      setName('');
      setAmount('');
      setDate('');
      setLoc('');
    } catch (error) {
      console.error("Error adding transaction: ", error);
      Alert.alert('Error', 'Failed to add transaction');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Enter date"
      />

      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={loc}
        onChangeText={setLoc}
        placeholder="Enter location"
      />

      <TouchableOpacity style={styles.button} onPress={addTransaction}>
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTransactionComponent;
