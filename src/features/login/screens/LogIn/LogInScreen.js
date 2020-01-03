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

export default class LogInScreen extends PureComponent {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
        <ImageBackground
          source={require('../../../../assets/images/signup-back.png')}
          style={{width: '100%', height: '65%', marginTop: '17%'}}
        >
        </ImageBackground>
        <View style={styles.loginContainer}>
          <Text style={styles.signUp}>Login</Text>
          <SharedInput
            label='Username'
          />
          <SharedInput
            label='Password'
          />
          <TouchableOpacity
            style={styles.forgot}
          >
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>
          <SharedButton
            value='Sign In'
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <SharedFacebookButton
            value='Sign In with facebook'
            imgSrc={require('../../../../assets/images/facebook-small.png')}
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </View>
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
    height: '60%',
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
  },
  forgot: {
    width: '100%',
    marginTop: '8%',
    marginBottom: '4%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  forgotText: {
    color: '#BEC2CE',
    fontSize: 15
  }
});
