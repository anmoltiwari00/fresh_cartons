import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class FixedBlackContainer extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      fav: false,
      quant: 0
    }
    this._increaseQuant = this._increaseQuant.bind(this);
    this._decreaseQuant = this._decreaseQuant.bind(this);
  }
  _setFav() {
    this.setState({fav: !this.state.fav})
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
    const { variants } = this.props;
    return(
      <View style={styles.container}>
        <ScrollView horizontal={true} style={styles.scroll}>
            {
              variants.map(item =>
                <View style={styles.varContainer}>
                  <Text style={styles.kgText}>{item}</Text>
                </View>
              )
            }
        </ScrollView>
        <View style={styles.bottom}>
          <View style={styles.favContainer}>
            {
              this.state.fav ?
              <Icon.Button
                name="heart"
                backgroundColor="transparent"
                color="#FF2D55"
                onPress={() => this._setFav()}
              ></Icon.Button> :
              <Icon.Button
                name="heart-o"
                backgroundColor="transparent"
                onPress={() => this._setFav()}
              ></Icon.Button>
            }
          </View>
          <View>
            {
              this.state.quant === 0 ?
              <TouchableOpacity
                style={styles.addToCart}
                onPress={() => this._addToCart()}
              >
                <Text style={styles.white}>Add to cart</Text>
              </TouchableOpacity> :
              <ChangeQuantity
                quant={this.state.quant}
                increase={this._increaseQuant}
                decrease={this._decreaseQuant}
              />
            }
          </View>
        </View>
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
        <Text style={[styles.leftRightMargin, styles.white, styles.quantText]}>{quant}</Text>
        <TouchableOpacity style={styles.changeQuant} onPress={() => increase()}>
          <Text style={[styles.white, styles.largerFont]}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 10,
    height: Dimensions.get('window').height*0.2,
    width: '100%',
    position: 'absolute',
    paddingHorizontal: '7%',
    bottom: 0,
    zIndex: 10
  },
  scroll: {
    flexDirection: 'row',
  },
  varContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  kgText: {
    color: 'white',
    fontSize: 20
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  favContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingLeft: '2%',
    paddingVertical: '2%'
  },
  addToCart: {
    backgroundColor: '#FF8900',
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%'
  },
  white: {
    color: 'white',
    fontSize: 12,
    paddingVertical: '5%'
  },
  marginDown: {
    marginBottom: '5%'
  },
  largerFont: {
    fontSize: 40
  },
  changeQuant: {
    backgroundColor: '#FF8900',
    width: '25%',
    borderRadius: 15,
    maxHeight: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftRightMargin: {
    marginHorizontal: 20
  },
  quantText: {
    fontSize: 20
  },
  centering:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '10%'
  }
})
