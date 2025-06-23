import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
    
  const {data: movies = [], loading, error, refetch: loadMovies, reset } = useFetch(() => fetchMovies({ query: searchQuery}), false)
  
  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  React.useEffect(() => {
    const func = async () => {
      if (searchQuery.trim()) {
        loadMovies()
      }
    }
    func();
  }, []);

  React.useEffect(() => {

    const timeoutid = setTimeout(() => {
      
      if (searchQuery.trim().length > 1) {
        loadMovies()
      } else {
        reset()
      }
    }, 500)

    return () => clearTimeout(timeoutid)
  }, [searchQuery]);

  React.useEffect(() => {
    // add delayed if user finish typing the search query
    const timeoutid = setTimeout(() => {
     
      if (movies && movies?.length > 0 && movies?.[0]) {
          updateSearchCount(searchQuery, movies[0]);
      }
      }, 2000)

    return () => clearTimeout(timeoutid)
  }, [movies]);

  return (
    <View className='flex-1 bg-primary'>
      <FlatList
        data={movies as Movie[]}
        renderItem={({item}) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5 pt-10'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
          }
        
        ListHeaderComponent={
          <>
            <View className='my-10'>
              <SearchBar
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder='Search for movies'
              /> 
              { loading && (
                <ActivityIndicator size="large" color="#0000ff" className='my-3' />
              )}
              { error && (
                <Text className='text-red-500 px-5 my-3'>Error: {error?.message}</Text>
              )}

              {!loading && !error && searchQuery.trim() && movies && movies?.length > 0 && (
                <View className='mt-5 px-5'>
                  <Text className='text-white text-xl font-semibold'>
                    Search Results for {' '}
                    <Text className='text-accent '>{searchQuery}</Text>
                  </Text>
                </View>
              )}
              
               
            </View>
          </>
        }
      />
    </View>
  )
}

export default Search