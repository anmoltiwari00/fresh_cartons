import React, { Component } from "react"
import { connect } from 'react-redux';
import {
  View,Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text
  } from "react-native"
const { width, height } = Dimensions.get("window")
export class Error extends Component {
  _dismissError() {
    this.props.setErrorToNull(null);
  }
  render() {
    return (
      <Modal
          animationType='fade'
        >
        <Text>{this.props.error}</Text>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.container}
          onPress={() => this._dismissError()}
        >
         {/* Your own Custom component view*/}
          <Text>OK</Text>
        </TouchableOpacity>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width,
    height: height*0.3,
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    left: 0,bottom: 0,right: 0
  },
  content: {
    width:60,height: 60,
    borderRadius: 6,
    justifyContent: "space-around" ,
    alignItems: "center",
    alignSelf: "center",
  }
})

const mapDispatchToProps = dispatch => ({
  setErrorToNull: data => {
  	dispatch(error(data));
  }
});

const mapStateToProps = (state) => ({...state});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
