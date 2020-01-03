import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

import { SliderBox } from "react-native-image-slider-box";

export default class ImageSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../../../assets/images/orange.png'),
        require('../../../assets/images/orange.png'),
        require('../../../assets/images/orange.png')
      ]
    };
  }
  render() {
    const h = Dimensions.get('window').height;
    return(
      <SliderBox
        images={this.state.images}
        sliderBoxHeight={h*0.5}
        dotStyle={styles.sliders}
        inactiveDotColor='white'
        dotColor='black'
      />
    )
  }
}

export const styles = StyleSheet.create({
  sliders: {
    width: Dimensions.get('window').width*0.12,
    height: 7,
    borderRadius: 5,
    marginHorizontal: -7,
    marginTop: 0,
    padding: 0
  }
})
