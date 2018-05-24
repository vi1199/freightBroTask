import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

class SearchAndFilter extends Component {
    static navigationOptions= {
        headerTitle: 'Filter',
        headerRight: (
            <View style= {{flexDirection: 'row', alignItems: 'center', marginRight: 10,}}>
                <Text 
                    style= {{color: 'blue', textAlign: 'center', fontWeight: '500', padding: 10}}
                    onPress= {() => alert('text')}>Clear </Text>
                <Button
                    onPress={() => alert('This is a button!')}
                    title="Apply"
                    color="blue"
                    style= {{}}
                />
            </View>
          )
    }
    render() {
        return (
            <View style= {styles.container}>
                <View style= {styles.row_container}>
                    <View style= {{flex: 1, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style= {{padding: 30, }}>SORT</Text>
                    </View>
                    <View style= {{flex: 1, backgroundColor: 'grey'}}>
                    <Text style= {{padding: 30, }}>hel</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
    },
    row_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default SearchAndFilter;