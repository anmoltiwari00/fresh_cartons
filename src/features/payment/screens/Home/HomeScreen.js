import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image
} from 'react-native';

import styles from './HomeScreenStyle';
import HeaderLeft from '../../../../shared/HeaderLeft';

export default class HomeScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      headerStyle: {
        marginTop: 20
      },
      headerLeft: () => <HeaderLeft back onBack={() => navigation.goBack()}/>
    };
  };
  constructor(props){
    super(props);
    this.state = {
      banks: [
        {
          name: 'HDFC',
          image: require('../../../../assets/images/hdfc.png')
        },
        {
          name: 'SBI',
          image: require('../../../../assets/images/sbi.png')
        },
        {
          name: 'ICICI',
          image: require('../../../../assets/images/icici.png')
        },
        {
          name: 'AXIS',
          image: require('../../../../assets/images/axis.png')
        }
      ],
      upi: [
        {
          name: 'GooglePay',
          image: require('../../../../assets/images/gpay.png')
        },
        {
          name: 'PhonePe',
          image: require('../../../../assets/images/phonepe.png')
        }
      ]
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} barStyle="light-content"/>
        <View style={styles.parent}>
          <View><Text style={styles.headingText}>Payment</Text></View>
          <View style={styles.bankContainer}>
            <View><Text style={styles.smallHeadingText}>Net Banking</Text></View>
            <View style={{flexDirection: 'row'}}>
              {
                this.state.banks.map(item =>
                  <View style={{justifyContent: 'center',alignItems: 'center', width: '25%'}}>
                    <Image source={item.image} style={styles.bankImage} resizeMode="contain"/>
                    <Text>{item.name}</Text>
                  </View>
                )
              }
            </View>
          </View>
          <View style={styles.upiContainer}>
            <View><Text style={styles.smallHeadingText}>UPI Apps</Text></View>
              <View style={{flexDirection: 'row'}}>
                {
                  this.state.upi.map(item =>
                    <View style={{justifyContent: 'center',alignItems: 'center', width: '25%'}}>
                      <Image source={item.image} style={styles.upiImage} resizeMode="contain"/>
                      <Text>{item.name}</Text>
                    </View>
                  )
                }
              </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View><Text style={styles.smallHeadingText}>Credit/Debit Cards</Text></View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCard')}>
                <Image source={require('../../../../assets/images/plus.png')} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image source={require('../../../../assets/images/card.png')} resizeMode="contain" style={styles.card}/>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
