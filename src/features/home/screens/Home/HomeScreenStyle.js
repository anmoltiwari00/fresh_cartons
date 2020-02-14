import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    width: '100%',
    paddingTop: '20%',
    position: 'relative'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  discoverContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  discoverBold: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  seeGrey: {
    fontSize: 15,
    color: '#333A4D'
  }
})

export default styles;
