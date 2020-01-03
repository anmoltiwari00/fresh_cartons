import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import Dash from 'react-native-dash';

export default class Category extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      subCat: [
        {
          name: 'Coffee',
          image: require('../../../assets/images/coffee.png')
        },
        {
          name: 'Donut',
          image: require('../../../assets/images/donut.png')
        },
        {
          name: 'CupCake',
          image: require('../../../assets/images/cupcake.png')
        },
        {
          name: 'Chips',
          image: require('../../../assets/images/chips.png')
        },
        {
          name: 'Chocolate',
          image: require('../../../assets/images/chocolate.png')
        },
        {
          name: 'Juice',
          image: require('../../../assets/images/juice.png')
        },
      ]
    }
  }
  _showDropDown(name) {
    this.setState({show: !this.state.show});
  }

  render() {
    const { category } = this.props;
    return(
      <View style={!this.state.show ? styles.container : styles.fullWidth}>
        {
          !this.state.show ?
          <TouchableOpacity
            style={styles.sameLine}
            onPress={() => this._showDropDown()}
          >
            <Image source={category.image} style={styles.image} />
            <Text style={styles.yellowText}>{category.name}</Text>
          </TouchableOpacity> :
          <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <View style={styles.top}>
              <View style={{margin: '5%'}}>
                <Image source={category.image} resizeMode='contain' />
              </View>
              <View style={styles.contextContainer}>
                <View style={styles.discountContainer}>
                  <Text style={styles.greenText}>Up to 40% off</Text>
                </View>
                <Text style={styles.yellowTextSmall}>{category.name}</Text>
                <Text style={styles.descText} numberOfLines = { 2 }>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </Text>
              </View>
            </View>
            <Dash
              style={{width: '100%', height:0.5, flexDirection:'row'}}
              dashColor='#707070'
              dashLength={10}
              dashGap={4}
            />
            <View style={styles.bottom}>
              {
                this.state.subCat.map(item =>
                  <View style={styles.bottomItem}>
                    <Image source={item.image}/>
                    <Text style={styles.bottomText}>{item.name}</Text>
                  </View>
                )
              }
            </View>
          </View>
        }
      </View>
    )
  }
}

const styles  = StyleSheet.create({
  container: {
    padding: 15,
    width: Dimensions.get('window').width/2.7,
    borderRadius: 40,
    elevation: 20,
    height: '28%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
    backgroundColor: 'white'
  },
  fullWidth: {
    padding: 15,
    width: Dimensions.get('window').width/1.2,
    borderRadius: 40,
    elevation: 20,
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
    backgroundColor: 'white'
  },
  sameLine: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowText: {
    color: '#F5A623',
    fontSize: 18
  },
  yellowTextSmall: {
    color: '#F5A623',
    fontSize: 14,
    marginVertical: '2%'
  },
  descText: {
    opacity: 0.62,
    fontSize: 10
  },
  image: {
    marginBottom: 10
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginVertical: '7%'
  },
  discountContainer: {
    backgroundColor: '#f3faeb',
    borderRadius: 10,
    padding: 5,
    width: '50%'
  },
  greenText: {
    color: '#66C300',
    fontWeight: 'bold',
    fontSize: 10
  },
  bottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: '5%'
  },
  bottomItem: {
    alignItems: 'center',
    width: '30%',
    marginVertical: '3%'
  },
  bottomText: {
    color: '#5b5b5b',
    fontWeight: 'bold',
    fontSize: 15
  }
})
