import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, GestureResponderEvent, StyleSheet, useAnimatedValue } from 'react-native';

// Large enough to cover the whole button from any touch point
const BUBBLE_SIZE = 400;

// The pressable needs overflow: 'hidden' to clip the bubbles, and pointerEvents="box-only"
// to keep the touch location relative to itself, even when pressing its children
export function useBubbles() {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextBubbleId = useRef(0);

  const removeBubble = useCallback((id: number) => {
    setBubbles(current => current.filter(bubble => bubble.id !== id));
  }, []);

  const addBubble = useCallback(({ nativeEvent }: GestureResponderEvent) => {
    const bubble = { id: nextBubbleId.current++, x: nativeEvent.locationX, y: nativeEvent.locationY };
    setBubbles(current => [...current, bubble]);
  }, []);

  return {
    addBubble,
    bubbles: bubbles.map(bubble => (
      <Bubble key={bubble.id} {...bubble} onDone={removeBubble} />
    )),
  };
}

function Bubble({ id, x, y, onDone }: { id: number; x: number; y: number; onDone: (id: number) => void }) {
  const progress = useAnimatedValue(0);

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished) onDone(id);
    });
    return () => animation.stop();
  }, [progress, id, onDone]);

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          left: x - BUBBLE_SIZE / 2,
          top: y - BUBBLE_SIZE / 2,
          opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] }),
          transform: [{ scale: progress }],
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: 'white',
  },
})
