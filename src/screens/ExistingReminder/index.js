import React, { useState } from 'react'
import { Text, TextInput, View, Pressable, Alert } from 'react-native'
import styles from './styles'
import { openDatabase } from "react-native-sqlite-storage";
import { useNavigation } from '@react-navigation/native';

// use hook to create database
const myRemindersDB = openDatabase({name: 'MyReminders.db'});
const remindersTableName = 'reminders';
const reminderPrioritiesTableName = 'reminder_priorities';

const ExistingReminderScreen = props => {
    
    const post = props.route.params.post
    const navigation = useNavigation()

    console.log(post);

    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [date, setDate] = useState(post.date);

    const onReminderUpdate = () => {
        if (!title){
            alert('Please enter a reminder title.');
            return;
        }
        if (!description){
            alert('Please enter a reminder description.');
            return;
        }
        if (!date){
            alert('Please enter a reminder date in format MM-DD-YYYY.');
            return;
        }

        myRemindersDB.transaction(txn => {
            txn.executeSql(
                `UPDATE ${remindersTableName} SET title = '${title}', description = '${description}', date = '${date}' WHERE id = ${post.id}`,
                [],
                () => {
                    console.log(`${title} updated successfully`)
                },
                error => {
                    console.log('Error on updating reminder' + error.message);
                }
            );
        });

        alert(title + ' updated!')
        navigation.navigate('Reminders')
    }
    const onReminderDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this Reminder",
        [
            {
                text: "yes",
                onPress: () => {
                    myRemindersDB.transaction(txn => {
                        txn.executeSql(
                            `Delete FROM ${remindersTableName} WHERE id = ${post.id}`,
                            [],
                            () => {
                                console.log(`${title} deleted successfully`)
                            },
                            error => {
                                console.log('Error on deleting reminder' + error.message);
                            }
                        );
                    });
                    myRemindersDB.transaction(txn => {
                        txn.executeSql(
                            `Delete FROM ${reminderPrioritiesTableName} WHERE reminder = ${post.id}`,
                            [],
                            () => {
                                console.log('Reminder priorities deleted successfully')
                            },
                            error => {
                                console.log('Error on deleting reminder priorities' + error.message);
                            }
                        );
                    });
                    alert('Reminder Deleted!')
                    navigation.navigate('Get Reminders!')
                }
            },
            {
                text: "no"
            }
        ])
    }
    const onAddPrioriry = () => {
        navigation.navigate("Add Reminder Priority", {post: post})
    }
    const onViewPriorities = () => {
        navigation.navigate("View Reminder Priorities", {post: post})
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TextInput 
                    value={title}
                    onChangeText={value => setTitle(value)}
                    style={styles.title}
                    clearButtonMode={'while-editing'}
                    placeholder={'Enter Reminder Title'}
                    placeholderTextColor={'grey'}
                />
                <TextInput 
                    value={description}
                    onChangeText={value => setDescription(value)}
                    style={styles.description}
                    clearButtonMode={'while-editing'}
                    placeholder={'Enter Reminder Description'}
                    placeholderTextColor={'grey'}
                />
                <TextInput 
                    value={date}
                    onChangeText={value => setDate(value)}
                    style={styles.date}
                    clearButtonMode={'while-editing'}
                    placeholder={'Enter Reminder Date in format MM-DD-YYYY'}
                    placeholderTextColor={'grey'}
                />
            </View>
            <View style={styles.bottomContainer}>
                <Pressable 
                    style={styles.deleteButton}
                    onPress={onReminderDelete}
                    >
                    <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
            </View>
            <View style={styles.bottomContainer}>
                <Pressable 
                    style={styles.updateButton}
                    onPress={onReminderUpdate}
                    >
                    <Text style={styles.buttonText}>Update</Text>
                </Pressable>
            </View>
            <View style={styles.bottomContainer}>
                <Pressable 
                    style={styles.addButton}
                    onPress={onAddPrioriry}
                    >
                    <Text style={styles.buttonText}>Add Priority</Text>
                </Pressable>
            </View>
            <View style={styles.bottomContainer}>
                <Pressable 
                    style={styles.viewButton}
                    onPress={onViewPriorities}
                    >
                    <Text style={styles.buttonText}>View Prioriries</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default ExistingReminderScreen