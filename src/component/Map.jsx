/* eslint-disable */

import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import Paging from './Paging.jsx'
import Search from './Search.jsx'
import RestaurantList from './RestaurantList.jsx'
import Dropdown from './Dropdown.jsx'
import '../map.css'

const Map = (props) => {
  function handleChange(e) {
    setInput(e.target.value)
  }

  //드롭다운
  let [view, setView] = useState(false)
  let [dropData, setDropData] = useState(['거리순', '평점순', '리뷰순'])

  // 지도 데이터
  const [data, setData] = useState([])
  let resarr = []

  //검색어 데이터 받기
  let [input, setInput] = useState('')

  //검색어 필터링
  const filter = data.filter((data) => {
    return (
      (data.REFINE_ROADNM_ADDR &&
        data.REFINE_ROADNM_ADDR.toLowerCase().includes(input.toLowerCase())) ||
      (data.BIZPLC_NM &&
        data.BIZPLC_NM.toLowerCase().includes(input.toLowerCase())) ||
      (data.TELNO && data.TELNO.toLowerCase().includes(input.toLowerCase()))
    )
  })

  // 현재위치 데이터
  const [location, setLocation] = useState({
    latitude: null,
    longigude: null,
  })
  // 현재위치 세부조정
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }

  // 페이징 데이터
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const offset = (page - 1) * limit

  //현재 위치 받기
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options)
    }

    function success(position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    }

    function error() {
      setLocation({
        latitude: 33.450701,
        longitude: 126.570667,
      })
      console.log('위치 받기 실패')
    }
  }, [])

  // fetchData() 함수 실행
  useEffect(() => {
    if (location.latitude !== null && location.longitude !== null) {
      fetchData()
    }
  }, [location.latitude, location.longitude])

  const fetchData = async () => {
    try {
      // Promise.all을 사용하여 병렬로 여러 개의 HTTP 요청을 보냄
      const requests = Array.from({ length: 57 }, (_, i) => {
        const key = `https://openapi.gg.go.kr/SafetyRestrntInfo?KEY=29e335dfe30848a6b777a033417e9cac&pIndex=${
          i + 1
        }&pSize=1000&Type=json`

        return axios.get(key).then((res) => {
          const arr = res.data.SafetyRestrntInfo[1].row
          // 데이터를 필터링하여 resarr에 추가
          arr.forEach((a) => {
            if (
              a &&
              a.REFINE_ROADNM_ADDR !== null &&
              a.REFINE_ROADNM_ADDR.includes('경기도 안성시')
            ) {
              resarr.push(a)
            }
          })
        })
      })

      await Promise.all(requests)

      // 중복된 REFINE_ZIPNO를 저장할 Set
      const uniqueZipNos = new Set()

      // 중복을 제거한 데이터를 담을 배열
      const uniqueData = []

      // resarr 배열의 각 요소를 순회하면서 중복된 REFINE_ZIPNO를 제거
      resarr.forEach((item) => {
        // REFINE_ZIPNO를 기준으로 중복을 체크
        if (!uniqueZipNos.has(item.REFINE_ZIPNO)) {
          // 중복되지 않은 경우, Set에 추가하고 uniqueData 배열에 해당 요소를 추가
          uniqueZipNos.add(item.REFINE_ZIPNO)
          uniqueData.push(item)
        }
      })

      uniqueData.forEach((el) => {
        el.distance = getDistance(
          location.latitude,
          location.longitude,
          el.REFINE_WGS84_LAT,
          el.REFINE_WGS84_LOGT
        )
      })

      // 거리를 기준으로 데이터 정렬
      uniqueData.sort((a, b) => a.distance - b.distance)

      setData(uniqueData)

      const { kakao } = window
      // 마커를 지도 위에 표시
      const container = document.getElementById('map')
      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 3,
      }
      const map = new kakao.maps.Map(container, options)

      resarr.forEach((el) => {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(
            el.REFINE_WGS84_LAT,
            el.REFINE_WGS84_LOGT
          ),
        })

        // var content =
        //   '<div class ="label"><span class="left"></span><span class="center">카카오!</span><span class="right"></span></div>'
        //
        // var customOverlay = new kakao.maps.CustomOverlay({
        //   position: position,
        //   content: content,
        // })
        //
        // customOverlay.setMap(map)

        const content = `<div class='infowindow_content'>${el.BIZPLC_NM}<br>
${el.REFINE_ROADNM_ADDR}<br>
${el.TELNO}</div>`

        const customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(
            el.REFINE_WGS84_LAT,
            el.REFINE_WGS84_LOGT
          ),
          content: content,
          yAnchor: 1, // 말풍선의 위치를 조정할 수 있음
        })

        kakao.maps.event.addListener(marker, 'click', () => {
          customOverlay.setMap(map)
        })

        // 인포윈도우를 닫는 기능도 추가
        kakao.maps.event.addListener(map, 'click', () => {
          customOverlay.setMap(null)
        })
      })

      // 새로운 마커 이미지 생성
      const markerImage = new kakao.maps.MarkerImage(
        '/human.png', // 새로운 마커 이미지의 URL
        new kakao.maps.Size(30, 30), // 마커 이미지의 크기
        {
          // 마커 이미지의 옵션
          offset: new kakao.maps.Point(15, 30), // 마커 이미지의 기준점
          alt: 'Human', // 마커 이미지의 대체 텍스트
        }
      )

      // 현재 위치 마커 생성
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(location.latitude, location.longitude),
        image: markerImage,
      })
      marker.setMap(map)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // 두 지점 간의 거리 계산 함수
  function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371 // 지구의 반지름 (km)
    var dLat = toRad(lat2 - lat1)
    var dLon = toRad(lon2 - lon1)
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c // 거리 (km)
    return d
  }

  // 각도를 라디안으로 변환
  function toRad(deg) {
    return deg * (Math.PI / 180)
  }

  return (
    <>
      <div className={'map_box'}>
        <div id='map' style={{ width: '75%', height: '770px' }}></div>
        <div className='map_list'>
          <div className='map_list_search'>
            <div className='map_list_sort'>
              <ul
                className='map_list_dropdown'
                onClick={() => {
                  setView(!view)
                }}
              >
                <li>{view ? dropData[0] + ' ^' : dropData[0] + ' ⌄'}</li>
                {/*<span>{view ? ' ⌃' : ' ⌄'}</span>*/}
                {view && (
                  <Dropdown setDropData={setDropData} dropData={dropData} />
                )}
              </ul>
            </div>
            <div className='map_list_input'>
              <Search input={input} handleChange={handleChange} />
            </div>
          </div>
          <div className='map_list_restaurant'>
            <RestaurantList data={filter} offset={offset} limit={limit} />
          </div>
          <div className='map_list_page'>
            <Paging
              total={filter.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Map
