import React from 'react';

const cafes = [
    {
        name: '보스카페',
        benefits: '음료 500원 할인 (보드게임 이용하지 않아도 할인 가능)',
        latitude: 37.00948229999999,
        longitude: 127.2607708
    },
    {
        name: 'H COFFEE',
        benefits: '음료 10% 할인, 아메리카노 1,000원 추가 시 리필 (쿠폰 미제공)',
        latitude: 37.03503300000001,
        longitude: 127.3027301
    },

    {
        name: '아브아저씨',
        benefits: '케이크 주문 시 현금 20%, 카드 10% 할인 (최소 1일전 예약 필수, 레터링 가능 (추가금 o) 미니케익은 미적용)',
        latitude: 37.01385,
        longitude: 127.2651
    },
    {
        name: '설빙 (안성아양점)',
        benefits: '매장에서 빙수 주문 시 아메리카노 1잔 또는 바닐라 아이스크림 토핑 무료 제공 (키오스크 주문 후 주문서와 학생증을 카운터에 제시)',
        latitude: 37.00708,
        longitude: 127.2718
    }
];

const CafeList = () => {
    return (
        <div>
            <h1>제휴업체 리스트 - 카페 (~2023.12.31)</h1>
            <ul>
                {cafes.map((cafe, index) => (
                    <li key={index} onClick={() => onStoreClick(cafe)}>
                        <h3>{cafe.name}</h3>
                        <p>{cafe.benefits}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default CafeList;

