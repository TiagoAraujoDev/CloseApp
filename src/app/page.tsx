import axios from 'axios'

const getData = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/latest?api_key=*api_key*&language=en-US',
  )
  const movie = response.data
  return movie
}

export default async function Home() {
  // const movie = await getData()

  // console.log(movie)
  return (
    <div className="bg-neutral-900 h-[2000px] flex items-center justify-center">
      {/* <div className="text-neutral-50">{JSON.stringify(movie, null, 2)}</div> */}
    </div>
  )
}
