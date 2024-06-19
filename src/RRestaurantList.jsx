import React from 'react';

const restaurants = [
    {
        name: '크레이지번 (한경대점)',
        benefits: '15,000원 이상 주문 시 치즈스틱 (2조각), 치킨너겟 (4조각) 중 택 1 제공',
        latitude: 37.01471,
        longitude: 127.2647
    },
    {
        name: '코리엔탈 깻잎 두마리 치킨 (안성점)',
        benefits: '방문 포장 시 콜라 1.25L 1개 제공',
        latitude: 37.00815,
        longitude: 127.1702
    },
    {
        name: '마포최대포 (안성점)',
        benefits: '현금 또는 계좌이체 시 10% 할인',
        latitude: 37.01423,
        longitude: 127.2648
    },
    {
        name: '다이닝원 (안성점)',
        benefits: '평일 이용 시 1인당 2,000원 할인',
        latitude: 37.00732,
        longitude: 127.2672
    },
    {
        name: '희래동',
        benefits: '홀: 현금 또는 계좌이체 시 1인당 1,000원 할인',
        latitude: 37.01160,
        longitude: 127.2697
    },
    {
        name: '95족발',
        benefits: '배달: 플랫폼 이용 배달 또는 포장 시 주먹밥 제공 (요청사항에 한경국립대학교 언급 시), (리뷰 이벤트 중복 가능) 홀: 테이블 당 음료수 500ml 1개 서비스, 주',
        latitude: 37.01160,
        longitude: 127.2697
    }
];

const RRestaurantList = () => {
    return (
        <div>
            <h1>제휴업체 리스트 - 음식점 (~2023.12.31)</h1>
            <ul>
                {restaurants.map((restaurant, index) => (
                    <li key={index} onClick={() => onStoreClick(restaurant)}>
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.benefits}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RRestaurantList;
