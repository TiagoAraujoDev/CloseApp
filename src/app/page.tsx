import { Trending } from "@/components/Home/Trending";

// const getTrending = async (type: string, period: string) => {
//   try {
//     const response = await api.get(
//       `trending/${type}/${period}?api_key=${apiKey}`,
//     )
//     if (type === 'movie') {
//       const mappedMovies = response.data.results.map((movie: any) => {
//         return {
//           id: movie.id,
//           original_title: movie.original_title,
//           backdrop_path: movie.backdrop_path,
//           poster_path: movie.poster_path,
//           release_date: movie.release_date,
//         }
//       })
//       return mappedMovies
//     } else {
//       const mappedTVShows = response.data.results.map((tv: any) => {
//         return {
//           id: tv.id,
//           original_name: tv.original_name,
//           backdrop_path: tv.backdrop_path,
//           poster_path: tv.poster_path,
//           first_air_date: tv.first_air_date,
//         }
//       })
//       return mappedTVShows
//     }
//   } catch (error: any) {
//     if (error instanceof AxiosError && error.response?.status === 401) {
//       console.log('Status: ', error.response.status)
//       console.log('Info: ', error.response.data)
//     }
//   }
// }

// const getMovies = async (label: string) => {
//   try {
//     const response = await api.get(`movie/${label}?api_key=${apiKey}`)
//     const mappedMovies = response.data.results.map((movie: any) => {
//       return {
//         id: movie.id,
//         original_title: movie.original_title,
//         backdrop_path: movie.backdrop_path,
//         poster_path: movie.poster_path,
//         release_date: movie.release_date,
//       }
//     })

//     return mappedMovies
//   } catch (error: any) {
//     if (error instanceof AxiosError && error.response?.status === 401) {
//       console.log('Status: ', error.response.status)
//       console.log('Info: ', error.response.data)
//     }
//   }
// }

// const getTVShows = async (label: string) => {
//   try {
//     const response = await api.get(`tv/${label}?api_key=${apiKey}`)
//     const mappedTVShows = response.data.results.map((tv: any) => {
//       return {
//         id: tv.id,
//         original_name: tv.original_name,
//         backdrop_path: tv.backdrop_path,
//         poster_path: tv.poster_path,
//         first_air_date: tv.first_air_date,
//       }
//     })

//     return mappedTVShows
//   } catch (error: any) {
//     if (error instanceof AxiosError && error.response?.status === 401) {
//       console.log('Status: ', error.response.status)
//       console.log('Info: ', error.response.data)
//     }
//   }
// }

export default async function Home() {
  return (
    <main className="max-w-screen-lg mx-auto px-6 py-4">
      <Trending type="movie" />
      <Trending type="tv" />
    </main>
  );
}
