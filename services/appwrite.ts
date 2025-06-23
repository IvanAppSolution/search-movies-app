import { Client, Databases, ID, Query } from "react-native-appwrite";
//track the searches made by the user
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (searchQuery: string, movie: Movie): Promise<void> => {  
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchQuery),
    ]);

    if(result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1
        }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: searchQuery,
          title: movie.title,
          movie_id: movie.id,
          count: 1,
          rating: Math.round(movie.vote_average/2),
          
          poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
          
        }
      );
    }
    console.log("Search result:", result);

  } catch (error) {
      console.error("Error updating search count:", error);
      throw error; // Re-throw the error to handle it in the calling function
  }

}
  //check if a record for the search query already exists
  //if a document with the searchQuery exists, increment the count
  //if nodocument exists, create a new document with count 1

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(10),
      Query.greaterThan('rating', 2),
      Query.orderDesc('count'),
    ]);

    return result.documents as unknown as TrendingMovie[];

  } catch (error) {
    console.log("Error fetching trending movies:", error);
    return undefined;
  }
}