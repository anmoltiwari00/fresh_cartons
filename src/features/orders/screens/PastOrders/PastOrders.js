import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image
} from 'react-native';

import styles from './PastOrdersStyle';
import HeaderLeft from '../../../../shared/HeaderLeft';
import Order from '../../components/Order';

export default class PastOrders extends PureComponent {
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
      past: [
        {
          date: '14 dec 2019 1:03 pm',
          image: require('../../../../assets/images/s1.png'),
          total: '960',
          prods: [
            {
              name: 'Virgin Olive Oil',
              quant: '500ml'
            },
            {
              name: 'Domino Sugar',
              quant: '1kg'
            }
          ]
        },
        {
          date: '10 oct 2019 1:03 pm',
          image: require('../../../../assets/images/s2.png'),
          total: '960',
          prods: [
            {
              name: 'Virgin Olive Oil',
              quant: '500ml'
            },
            {
              name: 'Domino Sugar',
              quant: '1kg'
            }
          ]
        }
      ]
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} barStyle="light-content"/>
        <View style={styles.parent}>
          <View><Text style={styles.headingText}>Past Orders</Text></View>
          <Order orders={this.state.past} />
        </View>
      </View>
    )
  }
}
