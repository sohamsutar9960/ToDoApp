import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTodo} from '../store/todosSlice';
import Toast from 'react-native-toast-message';

const AddTodoScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (title.trim()) {
      dispatch(
        addTodo({
          id: Date.now(),
          title,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      );

      Toast.show({
        type: 'success',
        text1: 'Todo Added',
        text2: 'Your new todo has been added successfully.',
      });

      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Todo title cannot be empty.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Todo</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter todo title..."
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
        <Text style={styles.addButtonText}>+ Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 20,
    backgroundColor: '#111',
    fontSize: 16,
  },
  addButton: {
    width: '100%',
    backgroundColor: '#444',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTodoScreen;
