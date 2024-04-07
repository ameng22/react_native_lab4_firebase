import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { TransactionsContext } from './TransactionContainer';
import { collection, getDocs } from 'firebase/firestore';
import db from './FirebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const SummaryComponent = () => {
  const { transactionsData } = useContext(TransactionsContext);
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSummaryData = async () => {
    try {
      const transactionsCollection = collection(db, 'transactions');
      const querySnapshot = await getDocs(transactionsCollection);
      const data = querySnapshot.docs.map(doc => doc.data());
  
      const parsedAmounts = data.map(t => {
        const amount = t.amount ? parseFloat(t.amount.replace('$', '')) : 0;
        return { ...t, amount };
      });
  
      const highestTransaction = Math.max(...parsedAmounts.map(t => t.amount));
      const lowestTransaction = Math.min(...parsedAmounts.map(t => t.amount));
  
      const highSpending = parsedAmounts.find(t => t.amount === highestTransaction);
      const lowSpending = parsedAmounts.find(t => t.amount === lowestTransaction);
  
      const summary = [
        { title: 'Transactions', value: parsedAmounts.length },
        { title: 'Balance', value: `$${parsedAmounts.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}` },
        { title: 'High Spending', transaction: highSpending?.name, amount: highestTransaction },
        { title: 'Low Spending', transaction: lowSpending?.name, amount: lowestTransaction },
      ];
  
      setSummaryData(summary);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSummaryData();
    }, [transactionsData])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#023E8A" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  const renderItem = ({ item }) => {
    if (item.title === 'High Spending' || item.title === 'Low Spending') {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <View style={styles.transactionContainer}>
            <Text style={styles.transactionName}>{item.transaction}</Text>
            <Text style={styles.transactionAmount}>${item.amount}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    );
  };

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  return (
    <FlatList
      data={summaryData}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      keyExtractor={(item) => item.title}
      style={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionContainer: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023E8A', // Blue color
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: '#023E8A', // Blue color
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionName: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
    color: '#023E8A', // Blue color
  },
  separator: {
    height: 1,
    backgroundColor: '#023E8A', // Blue color
    marginVertical: 5,
  },
});

export default SummaryComponent;
