/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

// import React, {useState, useEffect, useRef} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
//   TextInput,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import {
//   Camera,
//   useCameraDevices,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import {scanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
// import Animated, {
//   useAnimatedProps,
//   useSharedValue,
// } from 'react-native-reanimated';
// import DropDownPicker from 'react-native-dropdown-picker';
// import Video from 'react-native-video';

// const AnimatedText = Animated.createAnimatedComponent(TextInput);

// export default function App() {
//   const camera = useRef(null);
//   const [cameraPermission, setCameraPermission] = useState();
//   const [open, setOpen] = useState(false);
//   const [currentExample, setCurrentExample] = useState('take-photo');
//   const [photoPath, setPhotoPath] = useState();
//   const [snapshotPath, setSnapshotPath] = useState();
//   const [videoPath, setVideoPath] = useState();
//   const detectorResult = useSharedValue('');

//   useEffect(() => {
//     (async () => {
//       const cameraPermissionStatus = await Camera.requestCameraPermission();
//       setCameraPermission(cameraPermissionStatus);
//     })();
//   }, []);

//   const devices = useCameraDevices();
//   const cameraDevice = devices.back;

//   const frameProcessor = useFrameProcessor(frame => {
//     'worklet';
//     const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
//     const barcodesStr = detectedBarcodes
//       .map(barcode => barcode.displayValue)
//       .join('');
//     console.log('Barcodes:', barcodesStr);
//     detectorResult.value = barcodesStr;
//   }, []);

//   const animatedTextProps = useAnimatedProps(
//     () => ({text: detectorResult.value}),
//     [detectorResult.value],
//   );

//   const handleTakePhoto = async () => {
//     try {
//       const photo = await camera.current.takePhoto({
//         flash: 'on',
//       });
//       setPhotoPath(photo.path);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const renderTakingPhoto = () => {
//     return (
//       <View>
//         <Camera
//           ref={camera}
//           style={[styles.camera, styles.photoAndVideoCamera]}
//           device={cameraDevice}
//           isActive
//           photo
//         />
//         <TouchableOpacity style={styles.btn} onPress={handleTakePhoto}>
//           <Text style={styles.btnText}>Take Photo</Text>
//         </TouchableOpacity>
//         {photoPath && <Image style={styles.image} source={{uri: photoPath}} />}
//       </View>
//     );
//   };

//   const handleRecordVideo = async () => {
//     try {
//       camera.current.startRecording({
//         flash: 'on',
//         onRecordingFinished: video => setVideoPath(video.path),
//         onRecordingError: error => console.error(error),
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const handleStopVideo = async () => {
//     try {
//       await camera.current.stopRecording();
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const renderRecordingVideo = () => {
//     return (
//       <View>
//         <Camera
//           ref={camera}
//           style={[styles.camera, styles.photoAndVideoCamera]}
//           device={cameraDevice}
//           isActive
//           video
//         />
//         <View style={styles.btnGroup}>
//           <TouchableOpacity style={styles.btn} onPress={handleRecordVideo}>
//             <Text style={styles.btnText}>Record Video</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={{...styles.btn}} onPress={handleStopVideo}>
//             <Text style={styles.btnText}>Stop Video</Text>
//           </TouchableOpacity>
//         </View>
//         {videoPath && <Video source={{uri: videoPath}} style={styles.video} />}
//       </View>
//     );
//   };

//   const handleTakeSnapshot = async () => {
//     try {
//       const snapshot = await camera.current.takeSnapshot({
//         quality: 85,
//         skipMetadata: true,
//       });
//       setSnapshotPath(snapshot.path);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const renderTakingSnapshot = () => {
//     return (
//       <View>
//         <Camera
//           ref={camera}
//           style={[styles.camera, styles.photoAndVideoCamera]}
//           device={cameraDevice}
//           isActive
//           photo
//         />
//         <TouchableOpacity style={styles.btn} onPress={handleTakeSnapshot}>
//           <Text style={styles.btnText}>Take Snapshot</Text>
//         </TouchableOpacity>
//         {snapshotPath && (
//           <Image style={styles.image} source={{uri: snapshotPath}} />
//         )}
//       </View>
//     );
//   };

//   const renderCodeScanner = () => {
//     return (
//       <View>
//         <Camera
//           style={styles.camera}
//           device={cameraDevice}
//           isActive
//           frameProcessor={frameProcessor}
//           frameProcessorFps={5}
//         />
//         <AnimatedText
//           style={styles.barcodeText}
//           animatedProps={animatedTextProps}
//           editable={false}
//           multiline
//         />
//       </View>
//     );
//   };

//   const renderContent = () => {
//     if (cameraDevice == null) {
//       return <ActivityIndicator size="large" color="#1C6758" />;
//     }
//     if (cameraPermission !== 'authorized') {
//       return null;
//     }
//     switch (currentExample) {
//       case 'take-photo':
//         return renderTakingPhoto();
//       case 'record-video':
//         return renderRecordingVideo();
//       case 'take-snapshot':
//         return renderTakingSnapshot();
//       case 'code-scanner':
//         return renderCodeScanner();
//       default:
//         return null;
//     }
//   };

//   const handleChangePicketSelect = value => {
//     setPhotoPath(null);
//     setSnapshotPath(null);
//     setVideoPath(null);
//     setCurrentExample(value);
//   };

//   return (
//     <View style={styles.screen}>
//       <SafeAreaView style={styles.saveArea}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>React Native Camera Libraries</Text>
//         </View>
//       </SafeAreaView>

//       <View style={styles.caption}>
//         <Text style={styles.captionText}>
//           Welcome To React-Native-Vision-Camera Tutorial
//         </Text>
//       </View>

//       <View style={styles.dropdownPickerWrapper}>
//         <DropDownPicker
//           open={open}
//           value={currentExample}
//           items={[
//             {label: 'Take Photo', value: 'take-photo'},
//             {label: 'Record Video', value: 'record-video'},
//             {label: 'Take Snapshot', value: 'take-snapshot'},
//             {label: 'Code Scanner', value: 'code-scanner'},
//           ]}
//           setOpen={setOpen}
//           setValue={handleChangePicketSelect}
//         />
//       </View>

//       {renderContent()}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: '#EEF2E6',
//   },
//   saveArea: {
//     backgroundColor: '#3D8361',
//   },
//   header: {
//     height: 50,
//     backgroundColor: '#3D8361',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerText: {
//     color: '#ffffff',
//     fontSize: 20,
//   },
//   caption: {
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   captionText: {
//     color: '#100F0F',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   camera: {
//     height: 460,
//     width: '92%',
//     alignSelf: 'center',
//   },
//   photoAndVideoCamera: {
//     height: 360,
//   },
//   barcodeText: {
//     paddingHorizontal: 16,
//     paddingVertical: 20,
//     textAlign: 'center',
//     color: '#100F0F',
//     fontSize: 24,
//   },
//   pickerSelect: {
//     paddingVertical: 12,
//   },
//   image: {
//     marginHorizontal: 16,
//     paddingTop: 8,
//     width: 80,
//     height: 80,
//   },
//   dropdownPickerWrapper: {
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//     zIndex: 9,
//   },
//   btnGroup: {
//     margin: 16,
//     flexDirection: 'row',
//   },
//   btn: {
//     backgroundColor: '#63995f',
//     margin: 13,
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderRadius: 8,
//   },
//   btnText: {
//     color: '#ffffff',
//     fontSize: 20,
//     textAlign: 'center',
//   },
//   video: {
//     marginHorizontal: 16,
//     height: 100,
//     width: 80,
//     position: 'absolute',
//     right: 0,
//     bottom: -80,
//   },
// });
