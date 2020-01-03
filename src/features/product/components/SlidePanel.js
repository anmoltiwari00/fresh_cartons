import React, { PureComponent } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Animated
} from 'react-native';

import SlidingUpPanel from 'rn-sliding-up-panel';

export default class SlidePanel extends PureComponent {
  constructor (props) {
     super(props);
     let height = Dimensions.get('window').height;
     this._animatedValue = new Animated.Value(height / 2.2);
  }

  componentDidMount() {

  }

  render() {
    const h = Dimensions.get('window').height;
    const panelHeight = h - 0.1*h;
    const leastHeight = Dimensions.get('window').height/2.2;
    const { product } = this.props;
    return (
      <SlidingUpPanel
        ref={c => this._panel = c}
        draggableRange={{top: panelHeight, bottom: leastHeight}}
        showBackdrop={false}
        animatedValue={this._animatedValue}
      >
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.imageContainer}>
              <Image source={require('../../../assets/images/dragger.png')} />
            </View>
            <View style={styles.centeringContainer}>
              <View style={styles.topContainer}>
                <View>
                  <Text style={styles.name}>{product.name}</Text>
                  <Text style={styles.name}>₹{product.price}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Image source={require('../../../assets/images/star.png')} />
                  <Text style={styles.rating}>{product.rating}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.descText}>{product.description}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SlidingUpPanel>
    )
  }
}

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 10
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  productContainer: {
    width: '90%',
    marginBottom: '3%'
  },
  centeringContainer: {
    flex: 1,
    marginTop: '2%',
    paddingHorizontal: '7%'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#FF8900',
    borderRadius: 15
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20
  },
  rating: {
    color: 'white',
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
  descText: {
    color: '#9F9F9F',
    lineHeight: 18,
    fontSize: 14
  }
})
