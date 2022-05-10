export default {
  hand: {
    시술선택: {
      step: 1,
      name: "시술 선택",
      description: `시술받고 싶은 종류를 선택해 주세요.`,
      answer: [
        `케어만`,
        `영양만`,
        `케어+영양`,
        `그라데이션`,
        `남자케어`,
        `프렌치 네일`,
        `젤기본`,
      ],
      skip: true,
    },
    추가시술: {
      step: 1,
      name: "추가 시술",
      description: `어떤 시술을 추가로 받길 원하시나요`,
      answer: [`케어 추가`, `케어+영양추가`],
      skip: true,
    },
    색상갯수: {
      step: 1,
      name: "색상 갯수",
      description: `원하는 색상 갯수를 선택해주세요`,
      answer: [`원 컬러`, `투 컬러`],
      skip: false,
    },
    젤제거: {
      step: 2,
      name: "젤 제거",
      description: `현재 제거할 젤이 있으신가요?`,
      answer: [`네, 젤이 있어요`, `아니요, 없어요.`],
      skip: false,
    },
    시술위치: {
      step: 2,
      name: "시술 위치",
      description: `어디서 네일을 받으셨었나요?`,
      answer: [`자샵`, `타샵`],
      skip: false,
    },

    손톱연장: {
      step: 3,
      name: "손톱 연장",
      description: `연장 하실 건가요?`,
      answer: [`네, 연장 할 거에요`, `아니요, 연장 안할거에요.`],
      skip: false,
    },
    연장갯수: {
      step: 3,
      name: "연장 갯수",
      description: `연장 몇 개 하실건가요?`,
    },
  },
  foot: [
    {
      step: 1,
      title: [
        {
          name: `시술 선택`,
          description: `시술받고 싶은 종류를 선택해 주세요.`,
          answer: [
            `케어만`,
            `영양만`,
            `케어+영양`,
            `그라데이션`,
            `남자케어`,
            `프렌치 네일`,
            `젤기본`,
          ],
          skip: true,
        },
        {
          name: `추가 시술`,
          description: `어떤 시술을 추가로 받길 원하시나요`,
          answer: [`케어 추가`, `케어+영양추가`],
          skip: true,
        },
        {
          name: `색상 갯수`,
          description: `원하는 색상 갯수를 선택해주세요`,
          answer: [`원 컬러`, `투 컬러`],
          skip: false,
        },
      ],
    },
    {
      step: 2,
      title: [
        {
          name: `젤 제거`,
          description: `현재 제거할 젤이 있으신가요?`,
          answer: [`네, 젤이 있어요`, `아니요, 없어요.`],
          skip: false,
        },
        {
          name: `시술 위치`,
          description: `어디서 네일을 받으셨었나요?`,
          answer: [`자샵`, `타샵`],
          skip: false,
        },
      ],
    },
    {
      step: 3,
      title: [
        {
          name: `발톱 연장`,
          description: `연장 하실 건가요?`,
          answer: [`네, 연장 할 거에요`, `아니요, 연장 안할거에요.`],
          skip: false,
        },
        {
          name: `연장 갯수`,
          description: `연장 몇 개 하실건가요?`,
        },
      ],
    },
    {
      step: 4,
      title: [
        {
          name: `내성 발톱 교정`,
          description: `내성 발톱 교정받길 원하세요??`,
          answer: [`네, 교정 할거에요.`, `아니요, 안할거에요.`],
          skip: false,
        },
      ],
    },
    {
      step: 5,
      title: [
        {
          name: `발 각질관리`,
          description: `발 각질관리 받길 원하세요??`,
          answer: [`네, 각질관리 할거에요.`, `아니요, 안할거에요.`],
          skip: false,
        },
      ],
    },
  ],
};
