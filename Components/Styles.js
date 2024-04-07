// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0077B6',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0077B6',
  },
  listItemSeparator: {
    height: 1,
    backgroundColor: '#0077B6',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#0077B6',
  },
  input: {
    height: 40,
    borderColor: '#0077B6',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0077B6',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
});
