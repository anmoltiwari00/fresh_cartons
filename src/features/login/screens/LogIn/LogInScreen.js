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
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SharedButton from '../../../../shared/SharedButton';
import SharedFacebookButton from '../../../../shared/SharedFacebookButton';
import SharedInput from '../../../../shared/SharedInput';

import { login } from '../../actions';

export class LogInScreen extends PureComponent {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
  }

  _submitData(values) {
    let o = {
      password: values.password,
      email: values.email
    }
    this.props.logIn(o);
  }

  componentDidUpdate(prevProps, props) {
    if(prevProps !== props) {
      Alert.alert(
        'Error',
        (this.props.shared && this.props.shared.error),
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  }

  render() {
    console.log(this.props);
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
          <Formik
            initialValues={{ email: '', password: ''}}
            onSubmit={values => this._submitData(values)}
            validationSchema={LoginSchema}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View>
                <SharedInput
                  label='email'
                  onChangeText={handleChange('email')}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                      <Text style={styles.error}>{errors.email}</Text>
                    ) : null}
                <SharedInput
                  label='Password'
                  onChangeText={handleChange('password')}
                  value={values.password}
                  secureTextEntry={true}
                />
                {errors.password && touched.password ? (
                      <Text style={styles.error}>{errors.password}</Text>
                    ) : null}
                <TouchableOpacity
                  style={styles.forgot}
                >
                  <Text style={styles.forgotText}>Forgot your password?</Text>
                </TouchableOpacity>
                <SharedButton
                  value='Sign In'
                  onPress={handleSubmit}
                />
                <SharedFacebookButton
                  value='Sign In with facebook'
                  imgSrc={require('../../../../assets/images/facebook-small.png')}
                  onPress={() => this.props.navigation.navigate('Home')}
                />
              </View>
            )}
          </Formik>
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
    flexDirection: 'row',
    justifyContent: 'center'
  },
  forgotText: {
    color: '#BEC2CE',
    fontSize: 15,
    paddingVertical: '4%'
  },
  error: {
    color: 'red',
    fontSize: 10
  }
});

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Not a valid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const mapDispatchToProps = dispatch => ({
  logIn: data => {
  	dispatch(login(data));
  }
});

const mapStateToProps = (state) => ({...state});

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);
