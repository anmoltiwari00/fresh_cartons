import React, { Component } from "react";
import {
    View,
    Platform,
    Dimensions,
    PermissionsAndroid,
    Alert,
    Image,
    Text,
    TouchableOpacity
} from "react-native";
import { ActionConst, Actions, Router, Scene } from "react-native-router-flux";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import Ionicons from "react-native-vector-icons/Ionicons";
import { firebaseDB } from "../../../../../firebaseConfig";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import NavigationBar from "react-native-navbar";
import RNFetchBlob from 'rn-fetch-blob';
import { Audio } from 'expo-av';
import Video from 'react-native-video';
import {
  FileSystem,
  Permissions
} from 'react-native-unimodules';

const ImagePicker = require("react-native-image-picker");
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class ChatWindowScreen extends Component {
  constructor(props){
    super(props);
    this.recording = null;
    this.sound = null;
    this.state = {
      messages: [],
      startAudio: false,
      audioSettings: {
          SampleRate: 22050,
          Channels: 1,
          AudioQuality: "Low",
          AudioEncoding: "aac",
          MeteringEnabled: true,
          IncludeBase64: true,
          AudioEncodingBitRate: 32000
      },
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      audioPlaying: false
    }
    this.uploadToFirebase = this.uploadToFirebase.bind(this);
    this.uploadVideoToFirebase = this.uploadVideoToFirebase.bind(this);
    this.uploadAudioToFirebase = this.uploadAudioToFirebase.bind(this);
    this.renderVideoMessage = this.renderVideoMessage.bind(this);
    this.addToChat = this.addToChat.bind(this);
    this.addVideoToChat = this.addVideoToChat.bind(this);
    this.addAudioToChat = this.addAudioToChat.bind(this);
    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY));
  }

  componentDidMount(){
    this._askForPermissions();
    this.chatsFromFB = firebaseDB.ref(`/chat/${this.props.user.roomName}`);
    this.chatsFromFB.on("value", snapshot => {
        if (!snapshot.val()) {
            this.setState({
                fetchChats: true
            });
            return;
        }
        let { messages } = snapshot.val();
        messages = messages.map(node => {
            const message = {};
            message._id = node._id;
            message.text = node.messageType === "message" ? node.text : "";
            message.createdAt = node.createdAt;
            message.local = node.local ? node.local : "";
            message.user = {
                _id: node.user._id,
                name: node.user.name,
                avatar: node.user.avatar
            };
            message.image = node.messageType === "image" ? node.image : "";
            message.video = node.messageType === "video" ? node.video : "";
            message.audio = node.messageType === "audio" ? node.audio : "";
            message.messageType = node.messageType;
            return message;
        });
        this.setState({
            messages: [...messages]
        });
    });
  }

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  async _stopRecordingAndEnablePlayback() {
    const { user } = this.props;
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    this.uploadAudioToFirebase(info.uri)
      .then(downloadUri => this.addAudioToChat(downloadUri, info.uri))
    const message = {};
    message._id = this.messageIdGenerator();
    message.createdAt = Date.now();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  _updateScreenForSoundStatus = status => {
   if (status.isLoaded) {
     this.setState({
       soundDuration: status.durationMillis,
       soundPosition: status.positionMillis,
       shouldPlay: status.shouldPlay,
       isPlaying: status.isPlaying,
       rate: status.rate,
       muted: status.isMuted,
       volume: status.volume,
       shouldCorrectPitch: status.shouldCorrectPitch,
       isPlaybackAllowed: true,
     });
   } else {
     this.setState({
       soundDuration: null,
       soundPosition: null,
       isPlaybackAllowed: false,
     });
     if (status.error) {
       console.log(`FATAL PLAYER ERROR: ${status.error}`);
     }
   }
 };


  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  onSend(messages = []) {
    messages[0].messageType = "message";
    messages[0].local = "";
    this.chatsFromFB.update({
        messages: [messages[0], ...this.state.messages]
    });
  }

  renderAndroidMicrophone() {
    if (Platform.OS === "android") {
      return (
        <Ionicons
          name="ios-mic"
          size={35}
          hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
          color={this.state.isRecording ? "red" : "black"}
          style={{
              bottom: 50,
              right: Dimensions.get("window").width / 2,
              position: "absolute",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              zIndex: 2,
              backgroundColor: "transparent"
          }}
          onPress={this._onRecordPressed}
        />
      );
    }
  }

  messageIdGenerator() {
    // generates uuid.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
  }

  renderName = props => {
      const { user: self } = this.props; // where your user data is stored;
      const { user = {} } = props.currentMessage;
      const { user: pUser = {} } = props.previousMessage;
      const isSameUser = pUser._id === user._id;
      const isSelf = user._id === self._Id;
      const shouldNotRenderName = isSameUser;
      let firstName = user.name.split(" ")[0];
      let lastName = user.name.split(" ")[1][0];
      return shouldNotRenderName ? (
          <View />
      ) : (
              <View>
                  <Text style={{ color: "grey", padding: 2, alignSelf: "center" }}>
                      {`${firstName} ${lastName}.`}
                  </Text>
              </View>
          );
  };

  renderAudio = props => {
      return !props.currentMessage.audio ? (
          <View />
      ) : (
              <Ionicons
                  name="ios-play"
                  size={35}
                  color="blue"
                  style={{
                      left: 90,
                      position: "relative",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.5,
                      backgroundColor: "transparent"
                  }}
                  onPress={async () => {
                    console.log('Player')
                    this.sound = new Audio.Sound();
                    await this.sound.loadAsync({ uri: props.currentMessage.audio });
                    if (this.state.isPlaying) {
                      this.setState({audioPlaying: !this.state.audioPlaying}, () => this.sound.pauseAsync())
                    } else {
                      this.setState({audioPlaying: !this.state.audioPlaying}, () => this.sound.playAsync())
                    }
                  }}
              />
          );
  };

  handleAddPicture = () => {
      const options = {
          title: "Select Photo",
          mediaType: "photo",
          takePhotoButtonTitle: "Take a Photo",
          allowsEditing: true,
          noData: true,
          quality: 0.2
      };
      ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
              // do nothing
          } else if (response.error) {
              // alert error
          } else {
              const extensionIndex = response.uri.lastIndexOf(".");
              const extension = response.uri.slice(extensionIndex + 1);
              const allowedExtensions = ["jpg", "jpeg", "png"];
              const correspondingMime = ["image/jpeg", "image/jpeg", "image/png"];

              this.uploadToFirebase(response)
                .then(downloadUrl => {
                  this.addToChat(downloadUrl, response);
                })

              if (!allowedExtensions.includes(extension)) {
                  return alert("That file type is not allowed.");
              }
          }
      });
  };

  handleAddVideo = () => {
      const options = {
          title: "Select Video",
          mediaType: "video",
          takePhotoButtonTitle: "Take a Video",
          allowsEditing: true,
          noData: true,
          quality: 0.5,
          videoQuality: "low"
      };
      ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
              // do nothing
          } else if (response.error) {
              // alert error
          } else {
            console.log(response);
              this.uploadVideoToFirebase(response)
                .then(downloadUrl => {
                  this.addVideoToChat(downloadUrl, response);
                })
          }
      });
  };

  uploadVideoToFirebase(response, mime = 'application/octet-stream') {
    let videoName = this.getVideoName(response.path);
    return new Promise((resolve, reject) => {
      const uploadUri = response.path
      let uploadBlob = null

      const videoRef = firebase.storage().ref().child(videoName);

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return videoRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return videoRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  }

  uploadAudioToFirebase(uri, mime = 'application/octet-stream') {
    let audioName = this.getAudioName(uri);
    console.log(`Returned name ${audioName}`);
    return new Promise((resolve, reject) => {
      const uploadUri = uri
      let uploadBlob = null

      const videoRef = firebase.storage().ref().child(audioName);

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return videoRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return videoRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  }

  getVideoName(uri) {
    return this.messageIdGenerator()+'.'+uri.split('.')[1];
  }

  getAudioName(uri) {
    let array = uri.split('/');
    let lastPart = array[array.length - 1].split('.')[1];
    return this.messageIdGenerator()+'.'+lastPart;
  }

  uploadToFirebase(response, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri
      let uploadBlob = null

      const imageRef = firebase.storage().ref().child(response.fileName)

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  }

  addToChat(uri, response) {
    const { user } = this.props;
    const message = {};
    message._id = this.messageIdGenerator();
    message.createdAt = Date.now();
    message.user = {
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar
    };
    message.image = uri;
    message.messageType = "image";
    message.local = response.uri;

    this.chatsFromFB.update({
        messages: [message, ...this.state.messages]
    });
  }

  addVideoToChat(uri, response) {
    const { user } = this.props;
    const message = {};
    message._id = this.messageIdGenerator();
    message.createdAt = Date.now();
    message.user = {
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar
    };
    message.video = uri;
    message.messageType = "video";
    message.local = response.uri;

    this.chatsFromFB.update({
        messages: [message, ...this.state.messages]
    });
  }

  addAudioToChat(uri, response) {
    const { user } = this.props;
    let message = {};
    message.user = {
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar
    };
    message.text = "";
    message.audio = uri;
    message.local = response;
    message.messageType = "audio";

    this.chatsFromFB.update({
        messages: [message, ...this.state.messages]
    });
  }

  showFullScreen(current) {
    Actions.fullScreenVideo({current, user: this.props.user})
  }

  renderVideoMessage(props) {
    return (
      <TouchableOpacity
        onPress={() => this.showFullScreen(props.currentMessage)}
      >
       <Video
         ref={(r) => { this.player = r; }}
         source={{ uri: props.currentMessage.video}}
         style={{
           width: 120,
           height: 60,
           borderRadius: 13,
           margin: 3
         }}
         resizeMode="cover"
         onBuffer={this.onBuffer}
         onLoadStart={this.onLoadStart}
         onLoad={this.onLoad}
       />
      </TouchableOpacity>
    );
  }

  renderImageMessage(props) {
    return(
      <View>
        <Image source={props.currentMessage.local || props.currentMessage.image} />
      </View>
    )
  }

  renderBubble = props => {
    return (
        <View>
          {this.renderAudio(props)}
          <Bubble {...props} />
          {this.renderName(props)}
        </View>
    );
  };

  render() {
    const { user } = this.props; // wherever you user info is
    const rightButtonConfig = {
      title: 'Add Photo',
      handler: () => this.handleAddPicture()
    };
    const leftButtonConfig = {
      title: 'Add Video',
      handler: () => this.handleAddVideo()
    }
    return (
        <View style={{ flex: 1 }}>
          <NavigationBar
              title={{ title: "Chat" }}
              rightButton={rightButtonConfig}
              leftButton={leftButtonConfig}
          />
          {this.renderAndroidMicrophone()}
          <GiftedChat
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              showUserAvatar
              isAnimated
              showAvatarForEveryMessage
              renderBubble={this.renderBubble}
              renderMessageVideo={this.renderVideoMessage}
              messageIdGenerator={this.messageIdGenerator}
              renderActions={() => {
                  if (Platform.OS === "ios") {
                      return (
                          <Ionicons
                              name="ios-mic"
                              size={35}
                              hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                              color={this.state.isLoading ? "red" : "black"}
                              style={{
                                  bottom: 50,
                                  right: Dimensions.get("window").width / 2,
                                  position: "absolute",
                                  shadowColor: "#000",
                                  shadowOffset: { width: 0, height: 0 },
                                  shadowOpacity: 0.5,
                                  zIndex: 2,
                                  backgroundColor: "transparent"
                              }}
                              onPress={this._onRecordPressed}
                          />
                      );
                  }
              }}
              user={{
                _id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                avatar: user.avatar
              }}
          />
        </View>
    );
  }
}
