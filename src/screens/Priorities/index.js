/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const PrioritiesScreen = props => {

  return (
    <View style={styles.container}>
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => console.log('Add Priorities!')}
                >
                <Text style={styles.buttonText}>Add Priorities</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default PrioritiesScreen;