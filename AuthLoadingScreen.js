import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AsyncStorage.getItem('@user')
      .then(res => {
        if(res) {
          this.props.navigation.navigate('App');
        } else {
          this.props.navigation.navigate('Auth');
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
  }
});

const mapStateToProps = (state) => ({...state});

export default connect(mapStateToProps)(AuthLoadingScreen);
