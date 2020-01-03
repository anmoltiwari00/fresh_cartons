import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9E2D',
    position: 'relative'
  },
  parent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '95%',
    marginTop: '20%'
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: '5%',
    marginHorizontal: '5%'
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    marginVertical: '5%'
  },
  totalText: {
    color: '#D9D9D9',
    fontSize: 25
  },
  totalPrice: {
    fontSize: 25
  },
  checkoutButton: {
    backgroundColor: '#FF8900',
    borderRadius: 10,
    paddingVertical: '3%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  white: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  orangeText: {
    color: '#FF8900',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: '5%'
  }
})

export default styles;
