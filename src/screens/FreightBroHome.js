import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    YellowBox,
    ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as allActions from '../actions/homeActions';
import { connect } from 'react-redux';


class FreightBroHome extends Component {
    constructor(props) {
        super(props);
        this.state= {
            result: []
        }
    }
    componentDidMount () {
        this.props.homeActions()
    }
    componentWillReceiveProps (nextProps) {
        this.setState({result: nextProps.home.home})
    }
    handleSearchAndFilter = () => {
        this.props.navigation.navigate('Search', {screenProps: this.props})
    }
    render (){
        const { navigation }= this.props;
        const sortFilter= navigation.getParam('lowestValue', '')

        console.log('sort is--------->>>>>>', sortFilter)
        // bug in react-navigation . to ignore i added this. :)
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
        const { home, isFetching } = this.props.home
        if (isFetching) {
            return(
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={'small'} /> 
                </View>
            )
        } else {
            return(
                <View style= {styles.container}>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 20,}}>
                <Text style= {styles.ocean_freigth}>Quotes</Text>
                <Text style= {styles.ocean_freigth} onPress= {this.handleSearchAndFilter}>Modify Search</Text>
            </View>
                <ScrollView>
                {

                    this.props.home.filterChoices.length > 0 ? 
                        this.state.result.filter( item => this.props.home.filterChoices.includes(item.sub_vendor.sub_vendor_name) ).map (
                            (item, idx) => {
                                originCharge= item.charges[1] ? item.charges[1].charge_cost: 0
                                destCharges= item.charges[2]? item.charges[2].charge_cost: 0
                                currencyOrigin= item.charges[1] ? item.charges[1].charge_currency: ''
                                currencyDest= item.charges[2] ? item.charges[2].charge_currency: ''
                                 // Rate card based on MainFreight. here MainFreight = 'l3_fcl'
                                 if (item.leg_code === 'l3_fcl' ) {
                                 return (
                                     <View style= {styles.view_container} key= {idx}>
                                         <Text style= {styles.vendor_name}>{item.sub_vendor.sub_vendor_name}</Text>
                                         <Text style= {styles.expiry}>Expires On: {item.expiry}</Text>
                                         <View style= {styles.row_container}>
                                             <Text style= {styles.ocean_freigth}>Ocean Freight</Text>
                                             <Text style= {styles.ocean_freigth}>{item.charges[0].charge_currency} {item.charges[0].charge_cost}</Text>
                                         </View>
                                         <View style= {styles.row_container}>
                                             <Text style= {styles.ocean_freigth}>Origin Charges</Text>
                                             <Text style= {styles.ocean_freigth}>{currencyOrigin} {originCharge}</Text>
                                         </View>
                                         <View style= {styles.row_container}>
                                             <Text style= {styles.ocean_freigth}>Destination Charges</Text>
                                             <Text style= {styles.ocean_freigth}>{currencyDest} {destCharges}</Text>
                                         </View>
                                         <View style= {styles.seperator}></View>
                                         <View style= {styles.row_container}>
                                             <Text style= {styles.ocean_freigth}>{item.schedule[0].transit_time}</Text>
                                             <Text style= {styles.ocean_freigth}>{item.schedule[0].via_port}</Text>
                                         </View>
                                         <View style= {styles.row_container}>
                                             <Text style= {styles.ocean_freigth}>{item.expiry}</Text>
                                             <Text style= {[styles.ocean_freigth, {color: '#FCB530', fontWeight: '500' }]}>MORE</Text>
                                         </View>
                                         <View style= {styles.seperator}></View>
                                         <View style= {styles.row_container}>
                                             <Text style= {[styles.ocean_freigth, {fontWeight: '500'}]}>Total COST</Text>
                                             <Text style= {styles.ocean_freigth}>{item.leg_currency} {item.leg_currency_cost}</Text>
                                         </View>
         
                                         <View style= {styles.row_container}>
                                             <TouchableOpacity style= {styles.touch_button}>
                                             <View style= {[styles.buttons_container, {backgroundColor: '#C3C3C3'}]}>
                                                 <Text style= {styles.button_text}>DETAILS</Text>
                                             </View>
                                             </TouchableOpacity>
                                             <TouchableOpacity style= {styles.touch_button}>
                                             <View style= {[styles.buttons_container, {backgroundColor: '#FCB530'}]}>
                                                 <Text style= {styles.button_text}>BOOK NOW</Text>
                                             </View>
                                             </TouchableOpacity>
                                         </View>
                                 </View>
                                 ) 
                             }
                             
                            }
                        ) :
                        sortFilter !== '' ? (
                            sortFilter === 'Lowest Price' ? (
                                this.state.result.sort(function(a,b) {return parseInt(a.leg_currency_cost, 10) - parseInt(b.leg_currency_cost, 10)}).map((item, idx)=>{   
                                    originCharge= item.charges[1] ? item.charges[1].charge_cost: 0
                                    destCharges= item.charges[2]? item.charges[2].charge_cost: 0
                                    currencyOrigin= item.charges[1] ? item.charges[1].charge_currency: ''
                                    currencyDest= item.charges[2] ? item.charges[2].charge_currency: ''
                                     // Rate card based on MainFreight. here MainFreight = 'l3_fcl'
                                     if (item.leg_code === 'l3_fcl' ) {
                                     return (
                                         <View style= {styles.view_container} key= {idx}>
                                             <Text style= {styles.vendor_name}>{item.sub_vendor.sub_vendor_name}</Text>
                                             <Text style= {styles.expiry}>Expires On: {item.expiry}</Text>
                                             <View style= {styles.row_container}>
                                                 <Text style= {styles.ocean_freigth}>Ocean Freight</Text>
                                                 <Text style= {styles.ocean_freigth}>{item.charges[0].charge_currency} {item.charges[0].charge_cost}</Text>
                                             </View>
                                             <View style= {styles.row_container}>
                                                 <Text style= {styles.ocean_freigth}>Origin Charges</Text>
                                                 <Text style= {styles.ocean_freigth}>{currencyOrigin} {originCharge}</Text>
                                             </View>
                                             <View style= {styles.row_container}>
                                                 <Text style= {styles.ocean_freigth}>Destination Charges</Text>
                                                 <Text style= {styles.ocean_freigth}>{currencyDest} {destCharges}</Text>
                                             </View>
                                             <View style= {styles.seperator}></View>
                                             <View style= {styles.row_container}>
                                                 <Text style= {styles.ocean_freigth}>{item.schedule[0].transit_time}</Text>
                                                 <Text style= {styles.ocean_freigth}>{item.schedule[0].via_port}</Text>
                                             </View>
                                             <View style= {styles.row_container}>
                                                 <Text style= {styles.ocean_freigth}>{item.expiry}</Text>
                                                 <Text style= {[styles.ocean_freigth, {color: '#FCB530', fontWeight: '500' }]}>MORE</Text>
                                             </View>
                                             <View style= {styles.seperator}></View>
                                             <View style= {styles.row_container}>
                                                 <Text style= {[styles.ocean_freigth, {fontWeight: '500'}]}>Total COST</Text>
                                                 <Text style= {styles.ocean_freigth}>{item.leg_currency} {item.leg_currency_cost}</Text>
                                             </View>
             
                                             <View style= {styles.row_container}>
                                                 <TouchableOpacity style= {styles.touch_button}>
                                                 <View style= {[styles.buttons_container, {backgroundColor: '#C3C3C3'}]}>
                                                     <Text style= {styles.button_text}>DETAILS</Text>
                                                 </View>
                                                 </TouchableOpacity>
                                                 <TouchableOpacity style= {styles.touch_button}>
                                                 <View style= {[styles.buttons_container, {backgroundColor: '#FCB530'}]}>
                                                     <Text style= {styles.button_text}>BOOK NOW</Text>
                                                 </View>
                                                 </TouchableOpacity>
                                             </View>
                                     </View>
                                     ) 
                                 }
                                 })
                            ) 
                             : sortFilter === 'Highest Price' && (
                                this.state.result.sort(function(a,b) {return parseInt(b.leg_currency_cost, 10) - parseInt(a.leg_currency_cost, 10)}).map((item, idx)=>{   
                                    originCharge= item.charges[1] ? item.charges[1].charge_cost: 0
                                    destCharges= item.charges[2]? item.charges[2].charge_cost: 0
                                    currencyOrigin= item.charges[1] ? item.charges[1].charge_currency: ''
                                    currencyDest= item.charges[2] ? item.charges[2].charge_currency: ''
                                     // Rate card based on MainFreight. here MainFreight = 'l3_fcl'
                                     if (item.leg_code === 'l3_fcl' ) {
                                     return (
                                         <View style= {styles.view_container} key= {idx}>
                                             <Text style= {styles.vendor_name}>{item.sub_vendor.sub_vendor_name}</Text>
                                             <Text style= {styles.expiry}>Expires On: {item.expiry}</Text>
                                             <View style= {styles.row_container}>
                                                 <Text style= {styles.ocean_freigth}>Ocean Freight</Text>
                                                 <Text style= {styles.ocean_freigth}>{item.charges[0].charge_currency} {item.charges[0].charge_cost}</Text>
                                             </View>
                                             <View style= {styles.row_container}>
                                                 <Text style= {styles.ocean_freigth}>Origin Charges</Text>
                                                 <Text style= {styles.ocean_freigth}>{currencyOrigin} {originCharge}</Text>
                                             </View>
                                             <View style= {styles.row_container}>
                                                 <Text style= {styles.ocean_freigth}>Destination Charges</Text>
                                                 <Text style= {styles.ocean_freigth}>{currencyDest} {destCharges}</Text>
                                             </View>
                                             <View style= {styles.seperator}></View>
                                             <View style= {styles.row_container}>
                                                 <Text style= {styles.ocean_freigth}>{item.schedule[0].transit_time}</Text>
                                                 <Text style= {styles.ocean_freigth}>{item.schedule[0].via_port}</Text>
                                             </View>
                                             <View style= {styles.row_container}>
                                                 <Text style= {styles.ocean_freigth}>{item.expiry}</Text>
                                                 <Text style= {[styles.ocean_freigth, {color: '#FCB530', fontWeight: '500' }]}>MORE</Text>
                                             </View>
                                             <View style= {styles.seperator}></View>
                                             <View style= {styles.row_container}>
                                                 <Text style= {[styles.ocean_freigth, {fontWeight: '500'}]}>Total COST</Text>
                                                 <Text style= {styles.ocean_freigth}>{item.leg_currency} {item.leg_currency_cost}</Text>
                                             </View>
             
                                             <View style= {styles.row_container}>
                                                 <TouchableOpacity style= {styles.touch_button}>
                                                 <View style= {[styles.buttons_container, {backgroundColor: '#C3C3C3'}]}>
                                                     <Text style= {styles.button_text}>DETAILS</Text>
                                                 </View>
                                                 </TouchableOpacity>
                                                 <TouchableOpacity style= {styles.touch_button}>
                                                 <View style= {[styles.buttons_container, {backgroundColor: '#FCB530'}]}>
                                                     <Text style= {styles.button_text}>BOOK NOW</Text>
                                                 </View>
                                                 </TouchableOpacity>
                                             </View>
                                     </View>
                                     ) 
                                 }
                                 })
                             )
                             
                        ) : 
                    this.state.result.map((item, idx)=>{   
                       originCharge= item.charges[1] ? item.charges[1].charge_cost: 0
                       destCharges= item.charges[2]? item.charges[2].charge_cost: 0
                       currencyOrigin= item.charges[1] ? item.charges[1].charge_currency: ''
                       currencyDest= item.charges[2] ? item.charges[2].charge_currency: ''
                        // Rate card based on MainFreight. here MainFreight = 'l3_fcl'
                        if (item.leg_code === 'l3_fcl' ) {
                        return (
                            <View style= {styles.view_container} key= {idx}>
                                <Text style= {styles.vendor_name}>{item.sub_vendor.sub_vendor_name}</Text>
                                <Text style= {styles.expiry}>Expires On: {item.expiry}</Text>
                                <View style= {styles.row_container}>
                                    <Text style= {styles.ocean_freigth}>Ocean Freight</Text>
                                    <Text style= {styles.ocean_freigth}>{item.charges[0].charge_currency} {item.charges[0].charge_cost}</Text>
                                </View>
                                <View style= {styles.row_container}>
                                    <Text style= {styles.ocean_freigth}>Origin Charges</Text>
                                    <Text style= {styles.ocean_freigth}>{currencyOrigin} {originCharge}</Text>
                                </View>
                                <View style= {styles.row_container}>
                                    <Text style= {styles.ocean_freigth}>Destination Charges</Text>
                                    <Text style= {styles.ocean_freigth}>{currencyDest} {destCharges}</Text>
                                </View>
                                <View style= {styles.seperator}></View>
                                <View style= {styles.row_container}>
                                    <Text style= {styles.ocean_freigth}>{item.schedule[0].transit_time}</Text>
                                    <Text style= {styles.ocean_freigth}>{item.schedule[0].via_port}</Text>
                                </View>
                                <View style= {styles.row_container}>
                                    <Text style= {styles.ocean_freigth}>{item.expiry}</Text>
                                    <Text style= {[styles.ocean_freigth, {color: '#FCB530', fontWeight: '500' }]}>MORE</Text>
                                </View>
                                <View style= {styles.seperator}></View>
                                <View style= {styles.row_container}>
                                    <Text style= {[styles.ocean_freigth, {fontWeight: '500'}]}>Total COST</Text>
                                    <Text style= {styles.ocean_freigth}>{item.leg_currency} {item.leg_currency_cost}</Text>
                                </View>

                                <View style= {styles.row_container}>
                                    <TouchableOpacity style= {styles.touch_button}>
                                    <View style= {[styles.buttons_container, {backgroundColor: '#C3C3C3'}]}>
                                        <Text style= {styles.button_text}>DETAILS</Text>
                                    </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style= {styles.touch_button}>
                                    <View style= {[styles.buttons_container, {backgroundColor: '#FCB530'}]}>
                                        <Text style= {styles.button_text}>BOOK NOW</Text>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                        </View>
                        ) 
                    }
                    })
                }
                </ScrollView>
                </View>
            )
        }
    }
}

const styles= StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#C3C3C3'
    },
    view_container: {
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 3,
        paddingVertical: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
        elevation: 5,
    },
    vendor_name: {
        fontSize: 17,
        alignItems: 'center',
        fontWeight: '600',
    },
    expiry: {
        fontStyle: 'italic',
        fontSize: 14,
        fontWeight: '200'
    },
    row_container: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ocean_freigth: {
        fontWeight: '400',
        fontSize: 15
    },
    charges: {
        fontWeight: '600',
        fontSize: 15
    },
    seperator: {
        flex: 1,
        padding: 1,
        marginTop: 10,
        backgroundColor: '#C3C3C3'
    },
    buttons_container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: -10,
        marginBottom: -5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'center',
    },
    touch_button: {
        flex: 1,
        marginHorizontal: -10,
        marginBottom: -5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    button_text: {
        padding: 10,
        fontSize: 16,
        color: 'white'
    }
})

function mapStateToProps(state) {
    return {
        home: state.home
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators( allActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (FreightBroHome);