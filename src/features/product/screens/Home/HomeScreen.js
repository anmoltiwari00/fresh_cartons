import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar
} from 'react-native';

import styles from './HomeScreenStyle';

import HeaderLeft from '../../../../shared/HeaderLeft';
import HeaderRight from '../../../../shared/HeaderRight';
import ImageSlider from '../../components/ImageSlider';
import SlidePanel from '../../components/SlidePanel';
import FixedBlackContainer from '../../components/FixedBlackContainer';

export default class HomeScreen extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      sample: {
        name: 'Orange',
        price: '200/kg',
        description: 'About: Taiwan generally cultivates four kinds of oranges: sweet oranges, blood oranges, navel oranges, and sugar oranges. Oranges are rich in dietary fibre, vitamins A …It is rich in Antioxidants which protects the skin from free radicals and also protects against some cancers by suppressing cancer cell proliferation. It is good for asthma patients and orange juice added in the face packs give a new life to the skin by removing the dead cells.',
        variants: ['4kg', '7kg', '10kg', '17kg', '20kg', '27kg', '37kg', '47kg'],
        rating: '4.8'
      }
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      headerStyle: {
        marginTop: 20
      },
      headerLeft: () => <HeaderLeft back navigation onBack={() => navigation.navigate('Home')}/>,
      headerRight: () => <HeaderRight white />
    };
  };
  render() {
    return(
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} barStyle="light-content"/>
        <View style={styles.sliderContainer}>
          <ImageSlider />
        </View>
        <SlidePanel product={this.state.sample}/>
        <FixedBlackContainer variants={this.state.sample.variants}/>
      </View>
    )
  }
}
