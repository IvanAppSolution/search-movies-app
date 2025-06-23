import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  placeholder?: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({placeholder, onPress, value, onChangeText}: Props) {

  return (
    <View className='flex-row items-center justify-between bg-dark-200 rounded-full px-5 py-4 '>
      <Image source={icons.search} className='size-5' resizeMode="contain" tintColor="white" />
      <TextInput 
        onPress={onPress}
        placeholder={placeholder || "Search for movies"}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="white"
        className='flex-1 text-white ml-2'
      />
    </View>
  )
}