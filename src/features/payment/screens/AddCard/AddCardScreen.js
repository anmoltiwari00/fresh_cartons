import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';

import styles from './AddCardScreenStyle';
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
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} barStyle="light-content"/>
        <View style={styles.parent}>
          <View><Text style={styles.headingText}>Add Credit/Debit Cards</Text></View>
          <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
            <Image source={require('../../../../assets/images/addcard.png')} />
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Card Number</Text>
              <TextInput style={styles.fullInput} />
            </View>
            <View style={styles.inputContainerHalf}>
              <Text style={styles.labelText}>Cvv</Text>
              <TextInput style={styles.fullInput} />
            </View>
            <View style={styles.inputContainerHalf}>
              <Text style={styles.labelText}>Expiry Date</Text>
              <TextInput style={styles.fullInput} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Owner's Name</Text>
              <TextInput style={styles.fullInput} />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: '3%'}}>
            <TouchableOpacity style={styles.addButton}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Add Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
