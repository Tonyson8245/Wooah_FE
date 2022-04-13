export default [
  {
    name: "샵 이름",
    images: [
      "http://image.wooah.com/d/1",
      "http://image.wooah.com/d/2",
      "http://image.wooah.com/d/3",
    ],
    introduction: "샵 설명입니다",
    address: "서울시 동작구 318 3층",
    latitude: 12.38294,
    longitude: -45.002,
    contacts: [
      {
        type: "PHONE",
        content: "01012345678",
      },
      {
        type: "KAKAO_OPENCHAT",
        content: "http://openchat.kakao.com/uXciBD",
      },
    ],
    work_hours: [
      {
        day: "MON",
        hour: "08:30 ~ 21:00",
      },
      {
        day: "TUE",
        hour: "08:30 ~ 21:00",
      },
      {
        day: "WED",
        hour: "08:30 ~ 21:00",
      },
      {
        day: "THU",
        hour: "08:30 ~ 21:00",
      },
      {
        day: "FRI",
        hour: "08:30 ~ 21:00",
      },
      {
        day: "SAT",
        hour: "08:30 ~ 21:00",
      },
      {
        day: "SUN",
        hour: "08:30 ~ 21:00",
      },
    ],
    has_holiday_off: true,
    has_day_off: true,
    day_off_week: [1, 3, 5],
    day_off_day: ["SUN"],
    has_deposite: false,
    menu: {
      hand: [
        {
          name: "젤(원컬러)",
          price: 21000,
        },
        {
          name: "젤(투컬러)",
          price: 25000,
        },
      ],
    },
  },
];
