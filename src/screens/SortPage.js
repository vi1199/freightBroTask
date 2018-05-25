import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
class SortPage extends Component {
    constructor () {
        super()
        this.state= {
            prices: [
                'Lowest Price',
                'Highest Price',
                'Shortest Routes'
            ],
            selectedOption: '',
            selectedValue: ''
        }
    }
    static navigationOptions= {
        title: 'Sort'
    }
    handleButtonPress = () =>{
        this.props.navigation.navigate('Home', {lowestValue: this.state.selectedOption})
    }
    render() {
        console.log('some props', this.props.nagvigation)
        return (
            <View style= {styles.container}>

            {
                this.state.prices.map((prices, key)=>{
                  return(
                    <View key= {key}>
                    {
                      <TouchableOpacity
                        onPress= {()=> this.setState({selectedValue: key, selectedOption: prices})}
                        >
                        <View style= {styles.radioButtonViewStyle}>
                          <Icon
                            name= {`radiobox-${this.state.selectedValue === key ? 'marked' : 'blank'}`}
                            size= {24}
                            color={`${ this.state.selectedValue === key ? 'blue' : 'grey' }`}
                          />
                          <Text style= {styles.radioButtonTextStyle}>{prices}</Text>
                        </View>
                      </TouchableOpacity>
                    }
                    </View>
                  )
                })
              }
              <View style= {styles.container}>
              <Button 
              title= 'Apply'
              onPress= {() => this.handleButtonPress()}
              style= {{alignSelf: 'center', }}/>
              </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
    },
    radioButtonViewStyle: {
        flexDirection: 'row', 
        marginVertical: 7,
        marginLeft: 20,
        marginRight: 10,
        alignItems: 'center'
      },
      radioButtonTextStyle:{
        marginLeft: 10,
        color: 'black',
        fontSize: 14
      },
    row_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        alignItems: 'flex-start',
        padding: 30,
        backgroundColor: 'transparent'
      },
})

export default SortPage;