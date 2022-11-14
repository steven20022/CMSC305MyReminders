import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
const database = require('../../components/Handlers/database.js');

const Priority = props => {

    const post = props.post;
    const navigation = useNavigation();

    const onPress = () => {
        if (post.reminder_id) {
            try {
                database.addReminderPriority(post.reminder_id, post.id);
            } catch (error) {
                console.log('Error adding Reminder Priority', + error);
            }
            alert('Priority assigned to Reminder!');
            navigation.navigate('Get Reminders!');
        } else {
        console.log(post.title);
        }
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={{flex: 2}}>
                <Text style={styles.title} numberOfLines={1}>{post.title}</Text>
                <Text style={styles.description} numberOfLines={1}>{post.description}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default Priority;