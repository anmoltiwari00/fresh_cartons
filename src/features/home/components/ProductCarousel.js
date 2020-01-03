import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native'

import Carousel from 'react-native-snap-carousel';

export default class ProductCarousel extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
        carouselItems: [
        {
          image: require('../../../assets/images/carousel1.png'),
          name: 'asafewffw'
        },
        {
          image: require('../../../assets/images/carousel2.png'),
          name: 'asafewffw'

        },
        {
          image: require('../../../assets/images/carousel2.png'),
          name: 'asafewffw'

        }
    ]}
  }

  _renderItem({item,index}){
    return (
      <View style={{width: 250, height: 250}}>
          <Text>{item.name}</Text>
      </View>
    )
  }

  render() {
    return(
      <View style={styles.carouselContainer}>
        <Carousel
          data={this.state.carouselItems}
          renderItem={this._renderItem}
          sliderWidth={100}
          itemWidth={50}
          slideStyle={{ width: 50 }}
        />
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1
  }
})
