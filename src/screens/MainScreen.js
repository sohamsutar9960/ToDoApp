import React, {useEffect, useMemo} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  setTodos,
  toggleComplete,
  deleteTodo,
  setFilter,
  setSort,
} from '../store/todosSlice';
import Toast from 'react-native-toast-message';

const MainScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {items, filter, sort} = useSelector(state => state.todos);

  console.log(items);

  // Fetch TODO items from API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => dispatch(setTodos(data.slice(0, 30)))) // Limit to 30 items
      .catch(error => console.error(error));
  }, [dispatch]);

  const totalTodos = items.length;
  const completedTodos = items.filter(item => item.completed).length;

  <View style={styles.header}>
    <Text style={styles.headerText}>
      Total: {totalTodos} | Completed: {completedTodos}
    </Text>
  </View>;

  // Memoized Filtered & Sorted TODO list
  const filteredItems = useMemo(() => {
    let sortedItems = [...items];
    if (sort === 'id') {
      sortedItems.sort((a, b) => a.id - b.id);
    } else if (sort === 'recent') {
      sortedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (filter === 'active') {
      return sortedItems.filter(item => !item.completed);
    } else if (filter === 'done') {
      return sortedItems.filter(item => item.completed);
    }
    return sortedItems;
  }, [items, filter, sort]);

  const handleDelete = id => {
    dispatch(deleteTodo(id));
    Toast.show({
      type: 'success',
      text1: 'Todo Deleted',
      text2: 'The todo has been removed successfully.',
    });
  };

  const handleToggleComplete = id => {
    dispatch(toggleComplete(id));
    const todo = items.find(item => item.id === id);
    const message = todo?.completed
      ? 'marked as Incomplete'
      : 'marked as Complete';
    Toast.show({
      type: 'info',
      text1: 'Todo Updated',
      text2: `The todo has been ${message}.`,
    });
  };

  return (
    <View style={styles.container}>
      {/* Total & Completed tasks count */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Total: {totalTodos} | Completed: {completedTodos}
        </Text>
      </View>

      {/* Filter & Sort Row */}
      <View style={styles.controls}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, filter === 'all' && styles.activeButton]}
              onPress={() => dispatch(setFilter('all'))}>
              <Text
                style={[
                  styles.buttonText,
                  filter === 'all' && styles.activeButtonText,
                ]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                filter === 'active' && styles.activeButton,
              ]}
              onPress={() => dispatch(setFilter('active'))}>
              <Text
                style={[
                  styles.buttonText,
                  filter === 'active' && styles.activeButtonText,
                ]}>
                Active
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, filter === 'done' && styles.activeButton]}
              onPress={() => dispatch(setFilter('done'))}>
              <Text
                style={[
                  styles.buttonText,
                  filter === 'done' && styles.activeButtonText,
                ]}>
                Done
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, sort === 'id' && styles.activeButton]}
              onPress={() => dispatch(setSort('id'))}>
              <Text
                style={[
                  styles.buttonText,
                  sort === 'id' && styles.activeButtonText,
                ]}>
                ID
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, sort === 'recent' && styles.activeButton]}
              onPress={() => dispatch(setSort('recent'))}>
              <Text
                style={[
                  styles.buttonText,
                  sort === 'recent' && styles.activeButtonText,
                ]}>
                Recent
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* TODO List */}
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={{width: '90%'}}
              onPress={() => handleToggleComplete(item.id)}>
              <Text
                numberOfLines={2}
                style={item.completed ? styles.completed : styles.active}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteButton}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTodoScreen')}>
        <Text style={styles.addButtonText}>+ Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444',
  },
  activeButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: '#000',
  },
  activeButtonText: {
    color: '#000',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#111',
    marginVertical: 5,
    borderRadius: 8,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  active: {
    color: '#fff',
  },
  deleteButton: {
    fontSize: 20,
    color: '#ff4444',
  },
  addButton: {
    backgroundColor: '#444',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MainScreen;
