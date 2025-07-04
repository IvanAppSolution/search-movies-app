import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, Text, View } from "react-native";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import TrendingCard from "../components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const {data:trendingMovies, loading: trendingLoading, error: trendingError, refresh:refreshMovies} = useFetch(getTrendingMovies);
  const {data: movies, loading: moviesLoading, error: moviesError, refresh:refreshTrending } = useFetch(() => fetchMovies({ query: ''}))

  
  const onRefresh = useCallback(() => {
      setRefreshing(true);
      refreshMovies();
      refreshTrending();
      setRefreshing(false);  
    }, []);

  return (
    <View className="flex-1 bg-primary ">
      <Image source={images.bg} className="absolute z-0 w-full h-full" resizeMode="cover" />
      <ScrollView 
        className="flex-1 px-5 pt-10" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {moviesLoading || trendingLoading  ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError || trendingError ? (
          <Text>Error: {moviesError?.message} </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for movies"
            />

           {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}


          <>
            <Text className="text-white text-lg font-semibold mb-4">Latest Movies</Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </>

          </View>
        )
        }
 
      </ScrollView>
    </View>
  );
}
