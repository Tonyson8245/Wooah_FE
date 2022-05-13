export default {
  hand: [
    {
      step: 1,
      substep: [
        {
          name: "시술 선택",
          description: `시술받고 싶은 종류를 선택해 주세요.`,
          answer: [
            `케어만`,
            `영양만`,
            `케어+영양`,
            `그라데이션`,
            `남자케어`,
            `프렌치`,
            `젤 기본`,
          ],
          skip: true,
          input: false,
        },
        {
          name: "추가 시술",
          description: `어떤 시술을 추가로 받길 원하시나요`,
          answer: [`케어포함`, `케어+영양포함`],
          skip: false,
          input: false,
        },
        {
          name: "색상 갯수",
          description: `원하는 색상 갯수를 선택해주세요`,
          answer: [`원컬러`, `투컬러`],
          skip: false,
          input: false,
        },
      ],
    },

    {
      step: 2,
      substep: [
        {
          name: "젤 제거",
          description: `현재 제거할 젤이 있으신가요?`,
          answer: [`네, 젤이 있어요`, `아니요, 없어요.`],
          skip: false,
          input: false,
        },
        // {
        //   name: "시술 위치",
        //   description: `어디서 네일을 받으셨었나요?`,
        //   answer: [`자샵`, `타샵`],
        //   skip: false,
        //   input: false,
        // },
      ],
    },
    {
      step: 3,
      substep: [
        {
          name: "손톱 연장",
          description: `연장 하실 건가요?`,
          answer: [`네, 연장 할 거에요`, `아니요, 연장 안할거에요.`],
          skip: false,
          input: false,
        },
        {
          name: "연장 갯수",
          description: `연장 몇 개 하실건가요?`,
          input: true,
        },
      ],
    },
  ],
  foot: [
    {
      step: 1,
      substep: [
        {
          name: "시술 선택",
          description: `시술받고 싶은 종류를 선택해 주세요.`,
          answer: [
            `케어만`,
            `영양만`,
            `케어+영양`,
            `그라데이션`,
            `남자케어`,
            `프렌치`,
            `젤 기본`,
          ],
          skip: true,
          input: false,
        },
        {
          name: "추가 시술",
          description: `어떤 시술을 추가로 받길 원하시나요`,
          answer: [`케어포함`, `케어+영양포함`],
          skip: false,
          input: false,
        },
        {
          name: "색상 갯수",
          description: `원하는 색상 갯수를 선택해주세요`,
          answer: [`원컬러`, `투컬러`],
          skip: false,
          input: false,
        },
      ],
    },

    {
      step: 2,
      substep: [
        {
          name: "젤 제거",
          description: `현재 제거할 젤이 있으신가요?`,
          answer: [`네, 젤이 있어요`, `아니요, 없어요.`],
          skip: false,
          input: false,
        },
        {
          name: "시술 위치",
          description: `어디서 네일을 받으셨었나요?`,
          answer: [`자샵`, `타샵`],
          skip: false,
          input: false,
        },
      ],
    },
    {
      step: 3,
      substep: [
        {
          name: "손톱 연장",
          description: `연장 하실 건가요?`,
          answer: [`네, 연장 할 거에요`, `아니요, 연장 안할거에요.`],
          skip: false,
          input: false,
        },
        {
          name: "연장 갯수",
          description: `연장 몇 개 하실건가요?`,
          input: true,
        },
      ],
    },
    {
      step: 4,
      substep: [
        {
          name: `내성 발톱 교정`,
          description: `내성 발톱 교정받길 원하세요??`,
          answer: [`네, 교정 할거에요.`, `아니요, 안할거에요.`],
          skip: false,
          input: false,
        },
      ],
    },
    {
      step: 5,
      substep: [
        {
          name: `발 각질관리`,
          description: `발 각질관리 받길 원하세요??`,
          answer: [`네, 각질관리 할거에요.`, `아니요, 안할거에요.`],
          skip: false,
          input: false,
        },
      ],
    },
  ],
};
