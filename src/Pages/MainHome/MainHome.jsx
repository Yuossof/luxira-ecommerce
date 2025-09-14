import SwiperMainHome from './SwiperMainHome/SwiperMainHome'
import Parallex from './Parallex/Parallex'
import Offers from './Offers/Offers'
import ExploreProducts from './Offers/ExploreProducts/ExploreProducts'



const MainHome = () => {
  // const { accessToken, userDetails } = useSelector((state) => state.token);
  // console.log(accessToken, userDetails);

  return (
    <>
      <SwiperMainHome/>
      <Parallex/>
      <Offers/>
      <ExploreProducts/>
    </>
  )
}

export default MainHome