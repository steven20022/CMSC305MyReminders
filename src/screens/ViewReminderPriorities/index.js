import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";
import { FlatList } from 'react-native-gesture-handler';
import Priority from '../../components/Priority';
import styles from '../Home/styles';

// use hook to create database
const myRemindersDB = openDatabase({name: 'MyReminders.db'});
const prioritiesTableName = 'priorities';
const reminderPrioritiesTableName = 'reminder_priorities';

const ViewReminderPriority = props => {

  const post = props.route.params.post;

  const navigation = useNavigation();

  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare an empty array to store the results from the SELECT
      let results = []
      // declare a transaction that will execute the SELECT
      myRemindersDB.transaction(txn => {
        // execute SELECT
        txn.executeSql(
          `SELECT priorities.id, title, description FROM ${prioritiesTableName}, 
          ${reminderPrioritiesTableName} WHERE priorities.id = priority AND reminder = ${post.id}`,
          [],
          // callback function to handle the results from the
          // SELECT s
          (_, res) => {
            // get number of rows of data selected
            let len = res.rows.length;
            console.log('Length of priorities ' + len);
            // if more than one row was returned
            if (len > 0){
              // loop through the rows
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto the
                // results array
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  title: item.title,
                  description: item.description,
                });
              }
              // assign results array to lists state variable
              setPriorities(results);
            } else {
              // if no rows of data were returned,
              // set lists state variable to an empty array
              setPriorities([]);
            }
          },
          error => {
            console.log('Error getting priorities ' + error.message);
          },
        )
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
          data={priorities}
          renderItem={({item}) => <Priority post={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default ViewReminderPriority;