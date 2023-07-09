import React from 'react';
import {Dimensions, View, ScrollView, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolateColor,
} from 'react-native-reanimated';

import {products} from './Model';
import Card, {CARD_HEIGHT} from './Card';
import Products from './Products';
import Cards from './components/Cards';

const {width} = Dimensions.get('window');

const snapToOffsets = [0, CARD_HEIGHT];

const styles = StyleSheet.create({
  slider: {height: CARD_HEIGHT},
});

const PhilzCoffee = () => {
  const translateX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {x}}) => {
      translateX.value = x;
    },
  });

  const styleContainer = useAnimatedStyle(() => ({
    flex: 1,
    backgroundColor: interpolateColor(
      translateX.value,
      products.map((_, index) => width * index),
      products.map(product => product.color2),
    ),
  }));

  return (
    <Animated.View style={styleContainer}>
      <ScrollView
        decelerationRate="fast"
        snapToOffsets={snapToOffsets}
        bounces={false}
        snapToEnd={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.slider}>
          <Animated.ScrollView
            onScroll={onScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={width}
            showsHorizontalScrollIndicator={false}
            horizontal>
            {products.map((product, index) => (
              <Card product={product} key={index} />
            ))}
          </Animated.ScrollView>
          <Products x={translateX} />
        </View>
        <Cards />
      </ScrollView>
    </Animated.View>
  );
};

export default PhilzCoffee;
