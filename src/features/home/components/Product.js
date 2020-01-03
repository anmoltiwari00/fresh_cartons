import React, { PureComponent } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'

export default class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quant: 0
    }
    this._increaseQuant = this._increaseQuant.bind(this);
    this._decreaseQuant = this._decreaseQuant.bind(this);
  }

  _addToCart() {
    this.setState({quant: 1})
  }

  _decreaseQuant() {
    if(this.state.quant > 0)
    this.setState({quant: this.state.quant - 1});
  }

  _increaseQuant() {
    this.setState({quant: this.state.quant + 1});
  }

  render() {
    const { prodImage, prodName, prodPrice, prodOrigPrice } = this.props;
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
          onPress={() => this.props.nav.navigate('Product')}
        >
          <View style={styles.imgContainer}>
            <Image source={prodImage} resizeMode="contain" />
          </View>
          <View>
            <View style={styles.marginDown}>
              <Text style={styles.name}>{prodName}</Text>
            </View>
            <View style={[styles.centering, styles.marginDown]}>
              <Text style={styles.price}>- ₹{prodPrice}</Text>
              <Text style={styles.orig}>₹{prodOrigPrice}</Text>
            </View>
            <View>
              {
                this.state.quant === 0 ?
                <TouchableOpacity
                  style={styles.addToCart}
                  onPress={() => this._addToCart()}
                >
                  <Text style={styles.white}>Add to cart</Text>
                  <Text style={styles.white}>+</Text>
                </TouchableOpacity> :
                <ChangeQuantity
                  quant={this.state.quant}
                  increase={this._increaseQuant}
                  decrease={this._decreaseQuant}
                />
              }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export class ChangeQuantity extends PureComponent {
  render() {
    const { quant, increase, decrease } = this.props;
    return(
      <View style={styles.centering}>
        <TouchableOpacity style={styles.changeQuant} onPress={() => decrease()}>
          <Text style={[styles.white, styles.largerFont]}>-</Text>
        </TouchableOpacity>
        <Text style={styles.leftRightMargin}>{quant}</Text>
        <TouchableOpacity style={styles.changeQuant} onPress={() => increase()}>
          <Text style={[styles.white, styles.largerFont]}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 20,
    padding: 10,
    backgroundColor: 'white'
  },
  imgContainer: {
    marginRight: '5%'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  centering:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: '10%'
  },
  orig: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#D9D9D9'
  },
  addToCart: {
    backgroundColor: '#FF8900',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  white: {
    color: 'white'
  },
  marginDown: {
    marginBottom: '5%'
  },
  largerFont: {
    fontSize: 25
  },
  changeQuant: {
    backgroundColor: '#FF8900',
    width: 30,
    height: 30,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftRightMargin: {
    marginHorizontal: 20
  }
})
