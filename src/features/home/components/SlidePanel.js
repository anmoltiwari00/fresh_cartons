import React, { PureComponent } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';

import SlidingUpPanel from 'rn-sliding-up-panel';

export default class SlidePanel extends PureComponent {

  componentDidMount() {

  }

  render() {
    const h = Dimensions.get('window').height;
    const panelHeight = h - 0.2*h;
    const leastHeight = Dimensions.get('window').height/2;
    const { products } = this.props;
    return (
        <SlidingUpPanel
          ref={c => this._panel = c}
          draggableRange={{top: panelHeight, bottom: leastHeight}}
        >
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image source={require('../../../assets/images/dragger.png')} />
            </View>
            <Text style={styles.heading}>Explore</Text>
            <ScrollView>
              <View style={styles.centeringContainer}>
                {
                  products.map(item =>
                    <View style={styles.productContainer}>
                      {item}
                    </View>
                  )
                }
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
    paddingTop: 10,
    zIndex: 1
  },
  heading: {
    fontSize: 20,
    paddingLeft: '5%',
    marginBottom: '5%',
    fontWeight: '500'
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '2%'
  },
  productContainer: {
    width: '90%',
    marginBottom: '5%'
  },
  centeringContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '2%'
  }
})
