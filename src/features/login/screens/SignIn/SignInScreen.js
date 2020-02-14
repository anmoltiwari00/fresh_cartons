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

import { signup } from '../../actions';

export class SignInScreen extends PureComponent {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
  }

  _submitData(values) {
    let o = {
      name: values.username,
      password: values.password,
      email: values.email,
      roles: ["deliveryboy"]
    }
    this.props.signUp(o);
  }

  componentDidUpdate(prevProps, props) {
    if(prevProps !== props) {
      if(props && props.shared && props.shared.error) {
        Alert.alert(
          'Error',
          (this.props.shared.error),
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
    }
  }

  render() {
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
          <Formik
            initialValues={{ username: '', email: '', password: '', confirm: '' }}
            onSubmit={values => this._submitData(values)}
            validationSchema={SignupSchema}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View>
                <SharedInput
                  label='Username'
                  onChangeText={handleChange('username')}
                  value={values.username}
                />
              {errors.username && touched.username ? (
                  <Text style={styles.error}>{errors.username}</Text>
                ) : null}
                <SharedInput
                  label='Email'
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
                <SharedInput
                  label='Confirm Password'
                  onChangeText={handleChange('confirm')}
                  value={values.confirm}
                  secureTextEntry={true}
                />
              {errors.confirm && touched.confirm ? (
                    <Text style={styles.error}>{errors.confirm}</Text>
                  ) : null}
                <SharedButton
                  value='Sign Up'
                  onPress={handleSubmit}
                />
                <SharedFacebookButton
                  value='Connect with facebook'
                  imgSrc={require('../../../../assets/images/facebook-small.png')}
                  onPress={() => this.props.navigation.navigate('LogIn')}
                />
              </View>
            )}
          </Formik>
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
  },
  error: {
    color: 'red',
    fontSize: 10
  }
});

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username has to be atleast 3 characters')
    .max(15, 'Username can take maximum 15 characters')
    .required('Required'),
  email: Yup.string()
    .email('Not a valid email')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Password has to be atleast 5 characters')
    .max(15, 'Password can take maximum 15 characters')
    .required('Required'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const mapDispatchToProps = dispatch => ({
 signUp: data => {
 	dispatch(signup(data));
 }
});

const mapStateToProps = (state) => ({...state});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
