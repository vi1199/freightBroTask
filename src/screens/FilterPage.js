import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    CheckBox
} from 'react-native';
//ANL
//CMA CGM
//MAERSK
//SAFMARINE
//Yang Ming Line

const checkBoxValues = [
    {
        id: 'CMA CGM',
        label: 'CMA CGM'
    },
    {
        id: 'MAERSK',
        label: 'MAERSK'
    },
    {
        id: 'SAFMARINE',
        label: 'SAFMARINE'
    },
    {
        id: 'Yang Ming Line',
        label: 'Yang Ming Line'
    },
    {
        id: 'ANL',
        label: 'ANL'
    },
]

class FilterPage extends Component {
        constructor() {
            super();
            this.state= {
                linersFilter : checkBoxValues.slice(),
                linersFilterArray: [].slice(),
            checkboxChecked: false,        
            }
            this.filterOptions = { linersFilterArray: [] }
        }

        componentWillMount(){
            let {linersFilter} = this.state;
                linersFilter.forEach(item => item.checked = false);
                this.setState({linersFilter})
        }

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
    handleButtonPress = () => {
        this.props.navigation.state.params.screenProps.filterLinersData(this.state.linersFilterArray)
        this.props.navigation.navigate('Home')
    }
    handleCheckbox(value) {
        let {linersFilter} = this.state;
        let {linersFilterArray} = this.state;
        let activeObject = linersFilter.find( item => item.label === value )
            activeObject.checked = !activeObject.checked;
        this.setState( {linersFilter} )
        if(linersFilterArray.includes(value)) {
            linersFilterArray.splice( linersFilterArray.findIndex(item => item === value), 1 );            
        } else {
            linersFilterArray.push(value);
        }
        this.setState( {linersFilterArray} )
    }
    render() {
        console.log('state|||', this.state.linersFilter, 'filterOptions|||', this.state.linersFilterArray)
        return (
            <View style= {styles.container}>

                {
                    this.state.linersFilter.map( (item, idx) => {
                        return (
                            <View key={idx} style= {{flexDirection: 'row', alignItems: 'center', padding: 5,}}>
                                <CheckBox
                                    value= {item.checked}
                                    onValueChange= {() => this.handleCheckbox(item.label)}/>
                                <Text> {item.label} </Text>
                            </View>                            
                        )
                    } )
                }
                <View style= {styles.container}>
                <Button 
                    title= 'Apply'
                    onPress= {() => this.handleButtonPress()}/>
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
    },
    container: {
        alignItems: 'flex-start',
        padding: 20,
        backgroundColor: 'transparent'
      },
})

export default FilterPage;