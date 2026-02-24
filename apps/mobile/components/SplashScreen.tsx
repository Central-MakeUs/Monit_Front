import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Image, Text, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function CustomSplashScreen({ onFinish }: { onFinish: () => void }) {
  const opacity = useRef(new Animated.Value(1)).current;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    if (imageLoaded) return;
    setImageLoaded(true);

    SplashScreen.hideAsync().catch(() => {});

    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 1500);
  }, [imageLoaded, onFinish, opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/splash-icon.png')}
          style={styles.logoImage}
          resizeMode='contain'
          onLoad={handleImageLoad}
        />
        <View style={styles.textGroup}>
          <Text style={styles.bodyLine}>나의 감정과 지출 사이,</Text>
          <Text style={styles.highlightLine}>
            {'가장 '}
            <Text style={styles.boldPart}>나다운 소비</Text>
            {'의 균형'}
          </Text>
        </View>
      </View>

      <Text style={styles.brandText}>MONIT</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF604B',
    zIndex: 9999,
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 150,
    alignItems: 'center',
    gap: 22,
  },
  logoImage: {
    width: 84,
    height: 66,
  },
  textGroup: {
    alignItems: 'center',
  },
  bodyLine: {
    fontSize: 26,
    fontWeight: '500',
    color: 'white',
    letterSpacing: -0.288,
    lineHeight: 39.52,
  },
  highlightLine: {
    fontSize: 30,
    fontWeight: '500',
    color: 'white',
    letterSpacing: -0.288,
    lineHeight: 45.6,
  },
  boldPart: {
    fontWeight: '800',
  },
  brandText: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
    letterSpacing: 0.2,
  },
});
