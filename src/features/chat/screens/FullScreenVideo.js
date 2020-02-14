import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { ActionConst, Actions, Router, Scene } from "react-native-router-flux";
import Video from 'react-native-video';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class FullScreenVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
      const { current } = this.props;
      console.log(this.props);
      return(
        <View style={styles.container}>
          <View style={styles.closeContainer}>
            <Ionicons
                name="ios-close"
                size={35}
                color="white"
                style={{
                    backgroundColor: "transparent"
                }}
                onPress={() => {
                  Actions.chat({user: this.props.user})
                }}
            />
          </View>
          <Video
            ref={(r) => { this.player = r; }}
            source={{ uri: current.video}}
            style={{
              width: '100%',
              height: Dimensions.get('window').height*0.4
            }}
            resizeMode="cover"
            onBuffer={this.onBuffer}
            onLoadStart={this.onLoadStart}
            onLoad={this.onLoad}
            fullscreen={true}
            controls={true}
          />
        </View>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center"
    },
    closeContainer: {
      position: 'absolute',
      top: 20,
      right: 20
    }
});
