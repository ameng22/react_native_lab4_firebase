import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './Styles';
import { TransactionsContext } from './TransactionContainer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, getDocs } from 'firebase/firestore';
import firebase from './FirebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const TransactionListComponent = ({ navigation }) => {
  const { transactionsData, setTransactionsData } = useContext(TransactionsContext);
  const [loading, setLoading] = React.useState(true);

  const fetchTransactions = async () => {
    console.log("Fetching transactions...");
    try {
      const transactionsCollection = collection(firebase, 'transactions');
      const querySnapshot = await getDocs(transactionsCollection);
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({
          id: doc.id,
          ...doc.data()
        });
      });
      console.log("Fetched transactions:", transactions);
      setTransactionsData(transactions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTransactions();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
      style={styles.listItemContainer}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.itemPrice}>{item.amount}</Text>
        <Icon name="chevron-circle-right" size={20} color="#0077B6" style={{ marginLeft: 10 }} />
      </View>
    </TouchableOpacity>
  );

  const renderSeparator = () => <View style={styles.listItemSeparator} />;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0077B6" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={transactionsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

export default TransactionListComponent;
