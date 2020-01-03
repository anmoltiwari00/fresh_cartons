import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView
} from 'react-native';

import styles from './CategoriesScreenStyle';
import Category from '../../components/Category';

export default class CategoriesScreen extends PureComponent {
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);
    this.state = {
      items: [
        {
          name: 'Food',
          image: require('../../../../assets/images/food.png')
        },
        {
          name: 'Flower',
          image: require('../../../../assets/images/flower.png')
        },
        {
          name: 'Groceries',
          image: require('../../../../assets/images/grocery.png')
        },
        {
          name: 'Medicines',
          image: require('../../../../assets/images/medicine.png')
        },
        {
          name: 'Pet Supplies',
          image: require('../../../../assets/images/pet.png')
        }
      ]
    }
  }

  render() {
    return(
          <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} barStyle="dark-content"/>
            <View style={styles.sameLine}>
              <Text style={styles.heading}>Categories</Text>
              <TouchableOpacity
                style={styles.crossContainer}
                onPress={() => this.props.navigation.navigate('Home')}
              >
                <Image source={require('../../../../assets/images/close-white.png')} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: '4%'}}>
              {
                this.state.items.map(item => <Category category={item} />)
              }
            </View>
          </View>
    )
  }
}
