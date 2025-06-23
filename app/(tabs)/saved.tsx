import React from 'react'
import { Text, View } from 'react-native'

const Saved = () => {
  return (
      <View className='bg-primary flex-1 p-10'>
        <View className='flex-row items-center justify-center flex-1 flex-col gap-5'>
          <Text className='text-white'>No saved movies</Text> 
        </View>
      </View>
    )
}

export default Saved