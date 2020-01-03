import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';

import SharedButton from '../../../../shared/SharedButton';
import SharedFacebookButton from '../../../../shared/SharedFacebookButton';
import SharedInput from '../../../../shared/SharedInput';

export default class SignInScreen extends PureComponent {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
  }

  render() {
    const dummy = ['Username', 'Phone', 'Password', 'Confirm Password'];
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
        <ImageBackground
          source={require('../../../../assets/images/signup-back.png')}
          style={{width: '100%', height: '65%', marginTop: '-7%'}}
        >
        </ImageBackground>
        <View style={styles.loginContainer}>
          <Text style={styles.signUp}>Sign Up</Text>
          {
            dummy.map((item, index) =>
              <SharedInput
                label={item}
                key={index}
              />
            )
          }
          <SharedButton
            value='Sign Up'
            onPress={() => this.props.navigation.navigate('LogIn')}
          />
          <SharedFacebookButton
            value='Connect with facebook'
            imgSrc={require('../../../../assets/images/facebook-small.png')}
            onPress={() => this.props.navigation.navigate('LogIn')}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5A623',
    width: '100%',
    position: 'relative'
  },
  loginContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: '6%',
    paddingHorizontal: '5%'
  },
  signUp: {
    fontSize: 24,
    marginBottom: '4%'
  },
  facebookButton: {
    width: '100%',
    height: '10%',
    backgroundColor: 'white',
    borderColor: '#FF8900',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 15
  }
});
